import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /.{6,}/;
        return passwordRegex.test(password);
    };

    const validateField = (name, value) => {
        let error = "";

        if (name === "email") {
            if (!value) {
                error = 'Email is required';
            } else if (!validateEmail(value)) {
                error = 'Invalid email format';
            }
        }

        if (name === "password") {
            if (!value) {
                error = 'Password is required';
            } else if (!validatePassword(value)) {
                error = 'Password must be at least 6 characters';
            }
        }

        setErrors({ ...errors, [name]: error });
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched({ ...touched, [name]: true });
        validateField(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        Object.keys(formData).forEach((name) => {
            validateField(name, formData[name]);
        });

        if (Object.keys(errors).length === 0) {
            // Retrieve stored user data from local storage
            const storedUser = JSON.parse(localStorage.getItem('user'));

            if (storedUser && storedUser.email === formData.email && storedUser.password === formData.password) {
                // Navigate to the dashboard based on the stored user's role
                navigate(`/${storedUser.role}-dashboard`);
            } else {
                alert('Invalid email or password');
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Validate the field only if it has been touched
        if (touched[name]) {
            validateField(name, value);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div>
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur} // Mark the field as touched on blur
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
                    onBlur={handleBlur} // Mark the field as touched on blur
                />
                {touched.password && errors.password && <span>{errors.password}</span>}
            </div>
            <button type="submit">Login</button>
        </form>
    );
}
