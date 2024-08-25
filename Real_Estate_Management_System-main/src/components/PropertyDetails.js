import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import '../components/PropertyDetails.css';
import { properties as sampleProperties, agents as sampleAgents } from '../sampleData'; // Sample data, replace with actual data source

export default function PropertyDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser } = useAuth();
    
    const [property, setProperty] = useState(null);
    const [transactionMethod, setTransactionMethod] = useState('');
    const [transactionDetails, setTransactionDetails] = useState('');
    const [selectedAgent, setSelectedAgent] = useState(null);

    useEffect(() => {
        // Fetch property details based on ID
        const propertyData = sampleProperties.find(p => p.id === Number(id));
        setProperty(propertyData);

        // Fetch agent details based on property data
        if (propertyData) {
            const agentData = sampleAgents.find(a => a.id === propertyData.agentId);
            setSelectedAgent(agentData);
        }
    }, [id]);

    const handleTransactionMethodChange = (e) => {
        setTransactionMethod(e.target.value);
    };

    const handleTransactionSubmit = () => {
        if (transactionMethod && transactionDetails) {
            alert(`Transaction details submitted via ${transactionMethod}: ${transactionDetails}`);
            // Implement transaction logic here
        } else {
            alert('Please select a transaction method and provide details.');
        }
    };

    if (!property) {
        return <div>Loading...</div>;
    }

    return (
        <div className="property-details-container">
            <button className="back-button" onClick={() => navigate(-1)}>Back</button>
            <h2 className="property-title">{property.name}</h2>
            <img className="property-image" src={property.image} alt={property.name} />
            <div className="property-info">
                <p><strong>Location:</strong> {property.location}</p>
                <p><strong>Price:</strong> ₹{property.price}</p>
                <p><strong>Type:</strong> {property.type}</p>
                <p><strong>Dimensions:</strong> {property.dimensions}</p>
                <p><strong>bedroomType: </strong>{property.bedroomType}</p>
            </div>

            <h3 className="transaction-title">Transaction Details</h3>
            <div className="transaction-methods">
                <label>
                    <input
                        type="radio"
                        value="UPI"
                        checked={transactionMethod === 'UPI'}
                        onChange={handleTransactionMethodChange}
                    />
                    UPI
                </label>
                <label>
                    <input
                        type="radio"
                        value="NetBanking"
                        checked={transactionMethod === 'NetBanking'}
                        onChange={handleTransactionMethodChange}
                    />
                    NetBanking
                </label>
                <label>
                    <input
                        type="radio"
                        value="CreditCard"
                        checked={transactionMethod === 'CreditCard'}
                        onChange={handleTransactionMethodChange}
                    />
                    Credit Card
                </label>
            </div>
            <textarea
                className="transaction-details-input"
                placeholder="Enter transaction details..."
                value={transactionDetails}
                onChange={(e) => setTransactionDetails(e.target.value)}
            ></textarea>
            <button className="submit-transaction-button" onClick={handleTransactionSubmit}>
                  Buy Now
            </button>

            <h3 className="agent-details-title">Agent Details</h3>
            {selectedAgent ? (
                <div className="agent-details">
                    <img className="agent-profile-picture" src={selectedAgent.profilePicture} alt={selectedAgent.name} />
                    <p><strong>Name:</strong> {selectedAgent.name}</p>
                    <p><strong>Email:</strong> {selectedAgent.email}</p>
                    <p><strong>Phone:</strong> {selectedAgent.phone}</p>
                    <p><strong>Bio:</strong> {selectedAgent.bio}</p>
                </div>
            ) : (
                <p>No agent information available.</p>
            )}
        </div>
    );
}