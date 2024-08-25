import React from 'react';
import './PropertyCard.css'; // Assuming you're using CSS for styling

export default function PropertyCard({ title, price, location, image }) {
    return (
        <div className="property-card">
            <img src={image} alt={title} className="property-image" />
            <h4>{title}</h4>
            <p>{location}</p>
            <p>₹{price}</p>
            <button className="view-details-button">View Details</button>
        </div>
    );
}
