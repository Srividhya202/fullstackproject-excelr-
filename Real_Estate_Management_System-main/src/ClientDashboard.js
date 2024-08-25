
        // Additional property details...
        import React, { useState } from 'react';
        import { useNavigate } from 'react-router-dom';
        import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
        import { faEdit } from '@fortawesome/free-solid-svg-icons';
        import { useAuth } from './AuthContext';
        import './ClientDashboard.css';
        import img1 from './assets/img1.jpeg';
        import img2 from './assets/img2.jpeg';
        import img3 from './assets/img3.jpeg';
        import img4 from './assets/img4.jpeg';
        import img5 from './assets/img5.jpeg';
        import img6 from './assets/img6.jpeg';
        import img7 from './assets/img7.jpeg';
        import img8 from './assets/img8.jpeg';
        import img9 from './assets/img9.jpeg';
        import img10 from './assets/img10.jpeg';
        
        export default function ClientDashboard() {
            const { logout, currentUser } = useAuth();
            const navigate = useNavigate();
        
            const [properties] = useState([
                // Sample properties for demonstration
                {
                    id: 1,
                    name: 'Love palace',
                    location: 'Delhi',
                    price: 250000,
                    type: 'rent',
                    dimensions: '1500 sqft',
                    image: img7,
                    description: 'A beautiful villa with green surroundings.',
                    bedroomType: '3 BHK',
                    agentId: 1,
                },
                {
                    id: 2,
                    name: 'Ocean View',
                    location: 'Goa',
                    price: 180000,
                    type: 'rent',
                    dimensions: '1200 sqft',
                    image: img2,
                    description: 'An apartment with a stunning ocean view.',
                    bedroomType: '2BHK',
                    agentId: 2,
                },
                {
                    id: 3,
                    name: 'Urban Nest',
                    location: 'Delhi',
                    price: 300000,
                    type: 'sale',
                    dimensions: '1400 sqft',
                    image: img3,
                    description: 'Modern apartment in the heart of the city.',
                    bedroomType: '3 BHK',
                    agentId: 3,
                },
                {
                    id: 4,
                    name: 'Cozy Cottage',
                    location: 'Shimla',
                    price: 200000,
                    type: 'rent',
                    dimensions: '1300 sqft',
                    image: img4,
                    description: 'A quaint cottage with a cozy atmosphere.',
                    bedroomType: '2 BHK',
                    agentId: 4,
                },
                {
                    id: 5,
                    name: 'Luxury Loft',
                    location: 'Bangalore',
                    price: 350000,
                    type: 'sale',
                    dimensions: '1600 sqft',
                    image: img5,
                    description: 'A stylish loft with high-end finishes.',
                    bedroomType: '1 BHK',
                    agentId: 5,
                },
                {
                    id: 6,
                    name: 'Mountain Retreat',
                    location: 'Manali',
                    price: 275000,
                    type: 'sale',
                    dimensions: '1800 sqft',
                    image: img6,
                    description: 'A spacious retreat with breathtaking mountain views.',
                    bedroomType: '3 BHK',
                    agentId: 6,
                },
                {
                    id: 7,
                    name: 'City Penthouse',
                    location: 'Mumbai',
                    price: 500000,
                    type: 'sale',
                    dimensions: '2000 sqft',
                    image: img7,
                    description: 'An upscale penthouse with panoramic city views.',
                    bedroomType: '3 BHK',
                    agentId: 7,
                },
                {
                    id: 8,
                    name: 'Beachside Villa',
                    location: 'Goa',
                    price: 400000,
                    type: 'rent',
                    dimensions: '1700 sqft',
                    image: img8,
                    description: 'A luxurious villa right on the beach.',
                    bedroomType: '2 BHK',
                    agentId: 8,
                },
                {
                    id: 9,
                    name: 'Historic Mansion',
                    location: 'Delhi',
                    price: 450000,
                    type: 'sale',
                    dimensions: '2500 sqft',
                    image: img9,
                    description: 'An elegant mansion with historic charm.',
                    bedroomType: '3 BHK',
                    agentId: 9,
                },
                {
                    id: 10,
                    name: 'Urban Loft',
                    location: 'Bangalore',
                    price: 320000,
                    type: 'sale',
                    dimensions: '1550 sqft',
                    image: img10,
                    description: 'A contemporary loft with urban amenities.',
                    bedroomType: '1 BHK',
                    agentId: 10,
                },  {
                    id: 11,
                    name: 'cozy Cottage house',
                    location: 'Shimla',
                    price: 200000,
                    type: 'sale',
                    dimensions: '1300 sqft',
                    image: img5,
                    description: 'A quaint cottage with a cozy atmosphere.',
                    bedroomType: '2 BHK',
                    agentId: 6,
                },
                {
                id: 12,
                name: 'Luxury Soft',
                location: 'Bangalore',
                price: 380000,
                type: 'sale',
                dimensions: '1600 sqft',
                image: img8,
                description: 'A stylish loft with high-end finishes.',
                bedroomType: '1 BHK',
                agentId: 4,
                },
                
                {
                    id: 13,
                    name: 'Historic Mansion stream',
                    location: 'Delhi',
                    price: 450000,
                    type: 'rent',
                    dimensions: '2500 sqft',
                    image: img9,
                    description: 'An elegant mansion with historic charm.',
                    bedroomType: '3 BHK',
                    agentId: 10,
                },

                // Add more properties as needed...
            ]);
        
            const [filter, setFilter] = useState({
                propertyType: 'sale', // default to 'sale'
                priceRange: 500000, // default to 5 Lakhs
                location: '' // No location filter by default
            });
        
            const [profile, setProfile] = useState({
                name: currentUser?.name || '',
                email: currentUser?.email || '',
                phone: currentUser?.phone || '',
                newPassword: '',
                confirmPassword: '',
            });
        
            const [isEditing, setIsEditing] = useState(false);
            const [errors, setErrors] = useState({});
            const [formError, setFormError] = useState('');
        
            // Function to filter properties
            const filterProperties = () => {
                return properties.filter(property => {
                    let matches = true;
                    if (filter.propertyType) {
                        matches = matches && property.type.toLowerCase() === filter.propertyType;
                    }
                    if (filter.priceRange) {
                        matches = matches && property.price <= filter.priceRange;
                    }
                    if (filter.location) {
                        matches = matches && property.location.toLowerCase() === filter.location.toLowerCase();
                    }
                    return matches;
                });
            };
        
            // Handle changes in property type
            const handleTypeChange = (e) => {
                setFilter({ ...filter, propertyType: e.target.value });
            };
        
            // Handle changes in price range
            const handlePriceChange = (e) => {
                setFilter({ ...filter, priceRange: Number(e.target.value) });
            };
        
            // Handle changes in location filter
            const handleLocationChange = (e) => {
                setFilter({ ...filter, location: e.target.value });
            };
        
            // Handle profile input changes with real-time validation
            const handleProfileChange = (e) => {
                const { name, value } = e.target;
                setProfile({ ...profile, [name]: value });
        
                // Validate the specific field immediately
                validateField(name, value);
            };
        
            // Validate a single field
            const validateField = (fieldName, fieldValue) => {
                let newErrors = { ...errors };
        
                switch (fieldName) {
                    case 'name':
                        if (!fieldValue.trim()) {
                            newErrors.name = 'Name is required.';
                        } else if (fieldValue.length < 10 || fieldValue.length > 20) {
                            newErrors.name = 'Name must be between 10 and 20 characters.';
                        } else {
                            delete newErrors.name;
                        }
                        break;
        
                    case 'email':
                        if (!fieldValue.trim()) {
                            newErrors.email = 'Email is required.';
                        } else if (!/\S+@\S+\.\S+/.test(fieldValue)) {
                            newErrors.email = 'Email must be in a valid format (e.g., user@example.com).';
                        } else {
                            delete newErrors.email;
                        }
                        break;
        
                    case 'phone':
                        if (!fieldValue.trim()) {
                            newErrors.phone = 'Phone number is required.';
                        } else if (!/^\d{10}$/.test(fieldValue)) {
                            newErrors.phone = 'Phone number must be exactly 10 digits.';
                        } else {
                            delete newErrors.phone;
                        }
                        break;
        
                    case 'newPassword':
                        if (!fieldValue.trim()) {
                            newErrors.newPassword = 'New password is required.';
                        } else if (!/^(?=.*[A-Z])(?=.*\W)(?!.*\s).{8,15}$/.test(fieldValue)) {
                            newErrors.newPassword = 'New password must be 8-15 characters long, include at least one uppercase letter, and one special character.';
                        } else {
                            delete newErrors.newPassword;
                        }
                        break;
        
                    case 'confirmPassword':
                        if (!fieldValue.trim()) {
                            newErrors.confirmPassword = 'Confirm password is required.';
                        } else if (fieldValue !== profile.newPassword) {
                            newErrors.confirmPassword = 'Passwords must match.';
                        } else {
                            delete newErrors.confirmPassword;
                        }
                        break;
        
                    default:
                        break;
                }
        
                setErrors(newErrors);
            };
        
            // Function to save profile updates
            const handleProfileSave = () => {
                if (validateProfile()) {
                    // Update the profile in your database
                    setIsEditing(false);
                }
            };
        
            // Validate the entire profile before saving
            const validateProfile = () => {
                const newErrors = {};
        
                validateField('name', profile.name);
                validateField('email', profile.email);
                validateField('phone', profile.phone);
                validateField('newPassword', profile.newPassword);
                validateField('confirmPassword', profile.confirmPassword);
        
                setErrors(newErrors);
        
                // Check if any required field is missing
                if (!profile.name || !profile.email || !profile.phone || !profile.newPassword || !profile.confirmPassword) {
                    setFormError('Enter all required fields.');
                    return false;
                }
        
                setFormError('');
                return Object.keys(newErrors).length === 0;
            };
        
            // Navigate to Property Details page
            const handleViewDetails = (id, agentId) => {
                navigate(`/property/${id}`, { state: { agentId } });
            };
        
            return (
                <div className="client-dashboard-container">
                    <h2 className="client-dashboard-title">Client Dashboard</h2>
                    <button className="logout-button" onClick={logout}>Logout</button>
                    
                    <h3 className="section-title">Property Details</h3>
                    <div className="filter-container">
                        {/* Property Type Toggle Bar */}
                        <div className="toggle-bar">
                            <label>
                                <input
                                    type="radio"
                                    value="sale"
                                    checked={filter.propertyType === 'sale'}
                                    onChange={handleTypeChange}
                                />
                                Sale
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="rent"
                                    checked={filter.propertyType === 'rent'}
                                    onChange={handleTypeChange}
                                />
                                Rent
                            </label>
                        </div>
        
                        {/* Price Range Slider */}
                        <div className="price-slider">
                            <label>Price Range: ₹{filter.priceRange}</label>
                            <input
                                type="range"
                                min="0"
                                max="500000"
                                step="10000"
                                value={filter.priceRange}
                                onChange={handlePriceChange}
                            />
                        </div>
        
                        {/* Location Filter */}
                        <div className="location-filter">
                            <label>Location:</label>
                            <input
                                type="text"
                                placeholder="Enter location"
                                value={filter.location}
                                onChange={handleLocationChange}
                            />
                        </div>
                    </div>
                    
                    <div className="property-cards-container">
                        {filterProperties().map(property => (
                            <div key={property.id} className="property-card">
                                <img className="property-card-image" src={property.image} alt={property.name} />
                                <div className="property-card-info">
                                    <h4 className="property-card-title">{property.name}</h4>
                                    <p className="property-card-location">{property.location}</p>
                                    <p className="property-card-price">₹{property.price}</p>
                                    <button 
                                        className="view-details-button"
                                        onClick={() => handleViewDetails(property.id, property.agentId)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
        
                    <h3 className="section-title">Profile</h3>
                    <div className="profile-container">
                        {isEditing ? (
                            <div className="profile-form">
                                {formError && <p className="form-error">{formError}</p>}
                                <label>
                                    Name:
                                    <input
                                        type="text"
                                        name="name"
                                        value={profile.name}
                                        onChange={handleProfileChange}
                                        className={errors.name ? 'error' : ''}
                                    />
                                    {errors.name && <p className="error-message">{errors.name}</p>}
                                </label>
                                <label>
                                    Email:
                                    <input
                                        type="email"
                                        name="email"
                                        value={profile.email}
                                        onChange={handleProfileChange}
                                        className={errors.email ? 'error' : ''}
                                    />
                                    {errors.email && <p className="error-message">{errors.email}</p>}
                                </label>
                                <label>
                                    Phone:
                                    <input
                                        type="text"
                                        name="phone"
                                        value={profile.phone}
                                        onChange={handleProfileChange}
                                        className={errors.phone ? 'error' : ''}
                                    />
                                    {errors.phone && <p className="error-message">{errors.phone}</p>}
                                </label>
                                <label>
                                    New Password:
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={profile.newPassword}
                                        onChange={handleProfileChange}
                                        className={errors.newPassword ? 'error' : ''}
                                    />
                                    {errors.newPassword && <p className="error-message">{errors.newPassword}</p>}
                                </label>
                                <label>
                                    Confirm Password:
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={profile.confirmPassword}
                                        onChange={handleProfileChange}
                                        className={errors.confirmPassword ? 'error' : ''}
                                    />
                                    {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
                                </label>
                                <button onClick={handleProfileSave}>Save</button>
                            </div>
                        ) : (
                            <button className="edit-profile-button" onClick={() => setIsEditing(true)}>
                                <FontAwesomeIcon icon={faEdit} /> Edit Profile
                            </button>
                        )}
                    </div>
                </div>
            );
        }
        
