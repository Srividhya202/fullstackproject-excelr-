import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Import the CSS

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        password: '',
        role: '',
    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const navigate = useNavigate();

    const validateField = (name, value) => {
        let error = '';
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordPattern = /.{6,}/; // Minimum 6 characters for simplicity

        switch (name) {
            case 'name':
                if (!value) error = 'name is required';
                break;
            case 'mobile':
                if (!value) error = 'mobile is required';
                break;
            case 'email':
                if (!value) {
                    error = 'Email is required';
                } else if (!emailPattern.test(value)) {
                    error = 'Invalid email format';
                }
                break;
            case 'password':
                if (!value) {
                    error = 'Password is required';
                } else if (!passwordPattern.test(value)) {
                    error = 'Password must be at least 6 characters';
                }
                break;
            case 'role':
                if (!value) error = 'Role is required';
                break;
            default:
                break;
        }

        setErrors({ ...errors, [name]: error });
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched({ ...touched, [name]: true });
        validateField(name, value);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validateField(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields before submitting
        Object.keys(formData).forEach((name) => {
            validateField(name, formData[name]);
        });

        // Check if there are any errors
        const hasErrors = Object.values(errors).some(error => error);

        if (!hasErrors) {
            try {
                const response = await fetch('http://localhost:8080/api/users/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Registration successful:', data);

                    // Store user details in local storage
                    localStorage.setItem('user', JSON.stringify({
                        email: formData.email,
                        password: formData.password,
                        role: formData.role,
                    }));

                    // Navigate to the dashboard based on the user's role
                    navigate(`/${formData.role}-dashboard`);
                } else {
                    console.error('Registration failed:', response.statusText);
                    // Handle registration failure (e.g., show an error message)
                }
            } catch (error) {
                console.error('Error during registration:', error);
                // Handle network or other errors
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <div>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {touched.name && errors.name && <span>{errors.name}</span>}
            </div>
            <div>
                <input
                    type="text"
                    name="mobile"
                    placeholder="Mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {touched.mobile && errors.mobile && <span>{errors.mobile}</span>}
            </div>
            <div>
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {touched.email && errors.email && <span>{errors.email}</span>}
            </div>
            <div>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {touched.password && errors.password && <span>{errors.password}</span>}
            </div>
            <div>
                <label>Role</label>
                <div>
                    <input
                        type="radio"
                        name="role"
                        value="admin"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    /> Admin
                    <input
                        type="radio"
                        name="role"
                        value="agent"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    /> Agent
                    <input
                        type="radio"
                        name="role"
                        value="client"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    /> Client
                </div>
                {touched.role && errors.role && <span>{errors.role}</span>}
            </div>
            <button type="submit">Register</button>
        </form>
    );
}
