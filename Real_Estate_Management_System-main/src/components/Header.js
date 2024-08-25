import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import './Header.css'; // Importing a CSS file for styling

const Header = () => {
    return (
        <header className="header">
            <nav className="navbar">
                       <button><Link to="/" className="nav-item">Home</Link></button> 
                    
                        <button><Link to="/about" className="nav-item">About</Link></button>
                    
                        <button><Link to="/contact" className="nav-item">Contact</Link></button>
                        <button><Link to="/help" className="nav-item">Help</Link></button>
            </nav>
        </header>
    );
};

export default Header;
