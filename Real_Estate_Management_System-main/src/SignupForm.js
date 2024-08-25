// src/components/SignupForm.js

import React from 'react';
import { useForm } from 'react-hook-form';
import './AuthForm.css'; // Import the CSS file

const SignupForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    console.log('Signup data:', data);
    // Here, you'd make an API call to sign up the user
    // Example: axios.post('/api/signup', data)
  };

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && <span className="error">{errors.name.message}</span>}
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>

      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && <span className="error">{errors.password.message}</span>}
      </div>

      <div className="form-group">
      <label>Role</label>
                    <div className="radio-group">
                        <label>
                            <input type="radio" value="admin" {...register("role", { required: true })} />
                            Admin
    
                            <input type="radio" value="agent" {...register("role", { required: true })} />
                            Agent
                    
                
                            <input type="radio" value="client" {...register("role", { required: true })} />
                            Client
                        </label>
                    </div>
        {errors.role && <span className="error">{errors.role.message}</span>}
      </div>

      <button type="submit" className="submit-button">Sign Up</button>
    </form>
  );
};

export default SignupForm;
