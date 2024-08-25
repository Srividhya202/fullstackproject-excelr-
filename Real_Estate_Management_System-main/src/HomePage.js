import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
// import './App.css'; // Ensure this is where your CSS file is located
import img1 from './assets/img1.jpeg';
import img2 from './assets/img2.jpeg';
import img3 from './assets/img3.jpeg';
import img4 from './assets/img4.jpeg';
import './HomePage.css';

export default function HomePage() {
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const featuredProperties = [
        {
            id: 1,
            image: img1,
            location: 'New York, NY',
            price: '$1,200,000',
        },
        {
            id: 2,
            image: img2,
            location: 'Los Angeles, CA',
            price: '$950,000',
        },
        {
            id: 3,
            image: img3,
            location: 'Chicago, IL',
            price: '$750,000',
        },
        {
            id: 4,
            image: img4,
            location: 'San Francisco, CA',
            price: '$2,200,000',
        },
    ];

    return (
        <div className="wrapper">

            {/* Main Content */}
            <div className="content">
                <h2>Welcome to Real Estate Management System</h2>
                {!currentUser ? (
                    <div className="auth-buttons">
                        <button onClick={() => navigate('/login')}>Login</button>
                        <button onClick={() => navigate('/register')}>Register</button>
                    </div>
                ) : (
                    <h4>You are already logged in</h4>
                )}
            </div>

            {/* Featured Properties Section */}
            <div className="featured-properties">
                <h2>Featured Properties</h2>
                <div className="cards">
                    {featuredProperties.map(property => (
                        <div key={property.id} className="card">
                            <img src={property.image} alt={`House in ${property.location}`} />
                            <div className="card-details">
                                <h3>{property.location}</h3>
                                <p>{property.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
