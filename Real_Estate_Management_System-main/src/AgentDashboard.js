// import React, { useState } from 'react';
// import { useAuth } from './AuthContext';
// import './AgentDashboard.css';
// import img1 from './assets/img1.jpeg';
// import img2 from './assets/img2.jpeg';
// import img3 from './assets/img3.jpeg';
// import img4 from './assets/img4.jpeg';
// import img5 from './assets/img5.jpeg';
// export default function AgentDashboard() {
//     const { logout } = useAuth();
//     const [properties, setProperties] = useState([
//         {
//             id: 1,
//             title: 'Luxurious Apartment',
//             type: 'Apartment',
//             price: 200000,
//             location: 'Downtown',
//             availability: 'For Sale',
//             dimensions: '1200 sqft',
//             description: 'A luxurious 3BHK apartment in the heart of the city.',
//             bedroomType: '3BHK',
//             images: [img1],
//         },
//         {
//             id: 2,
//             title: 'Cozy Cottage',
//             type: 'Cottage',
//             price: 150000,
//             location: 'Countryside',
//             availability: 'For Rent',
//             dimensions: '800 sqft',
//             description: 'A cozy 2BHK cottage with a beautiful garden.',
//             bedroomType: '2BHK',
//             images: [img2],
//         },
//         {
//             id: 3,
//             title: 'Modern Villa',
//             type: 'Villa',
//             price: 500000,
//             location: 'Suburbs',
//             availability: 'For Sale',
//             dimensions: '2500 sqft',
//             description: 'A modern 4BHK villa with a private pool.',
//             bedroomType: '4BHK',
//             images: [img3],
//         },
//         {
//             id: 4,
//             title: 'Beachside Bungalow',
//             type: 'Bungalow',
//             price: 350000,
//             location: 'Beachside',
//             availability: 'For Sale',
//             dimensions: '1800 sqft',
//             description: 'A beautiful 3BHK bungalow with sea view.',
//             bedroomType: '3BHK',
//             images: [img4],
//         },
//         {
//             id: 5,
//             title: 'Urban Studio',
//             type: 'Studio',
//             price: 100000,
//             location: 'City Center',
//             availability: 'For Rent',
//             dimensions: '500 sqft',
//             description: 'A chic 1BHK studio apartment in the city center.',
//             bedroomType: '1BHK',
//             images: [img5],
//         },
       
     
//     ]);
//     const [clients, setClients] = useState([]);
//     const [filter, setFilter] = useState("");
//     const [formType, setFormType] = useState("");
//     const [currentProperty, setCurrentProperty] = useState({
//         id: null,
//         title: '',
//         type: '',
//         price: '',
//         location: '',
//         availability: '',
//         dimensions: '',
//         description: '',
//         bedroomType: '',
//         images: [],
//     });

//     const [currentClient, setCurrentClient] = useState({
//         id: null,
//         name: '',
//         email: '',
//         mobile: ''
//     });

//     const [newClient, setNewClient] = useState("");
//     const [newClientEmail, setNewClientEmail] = useState("");
//     const [newClientMobile, setNewClientMobile] = useState("");
//     const [clientErrors, setClientErrors] = useState({});
//     const [propertyErrors, setPropertyErrors] = useState({});

//     // Validation functions for client
//     const validateClient = () => {
//         const errors = {};
//         if (!newClient) errors.name = "Name is required.";
//         if (!newClientEmail || !/\S+@\S+\.\S+/.test(newClientEmail)) errors.email = "Valid email is required.";
//         if (!newClientMobile || !/^\d{10}$/.test(newClientMobile)) errors.mobile = "Phone number must be 10 digits.";
//         return errors;
//     };

//     // Validation functions for property
//     const validateProperty = (name, value) => {
//         const errors = { ...propertyErrors };
//         switch (name) {
//             case 'title':
//                 if (!value) errors.title = "Title is required.";
//                 else delete errors.title;
//                 break;
//             case 'price':
//                 if (!value || isNaN(value)) errors.price = "Valid price is required.";
//                 else delete errors.price;
//                 break;
//             // Add more validations as needed
//             default:
//                 break;
//         }
//         setPropertyErrors(errors);
//     };

//     // Function to add a new client with validation
//     const addClient = () => {
//         const errors = validateClient();
//         if (Object.keys(errors).length === 0) {
//             setClients([...clients, { id: clients.length + 1, name: newClient, email: newClientEmail, mobile: newClientMobile }]);
//             setNewClient("");
//             setNewClientEmail("");
//             setNewClientMobile("");
//             setClientErrors({});
//         } else {
//             setClientErrors(errors);
//         }
//     };

//     // Function to open the form for adding/editing/deleting properties
//     const openForm = (type, item = null, itemType = 'property') => {
//         setFormType(type);
//         if (itemType === 'property') {
//             setCurrentProperty(item || {
//                 id: null,
//                 title: '',
//                 type: '',
//                 price: '',
//                 location: '',
//                 availability: '',
//                 dimensions: '',
//                 description: '',
//                 bedroomType: '',
//                 images: [],
//             });
//         } else if (itemType === 'client') {
//             setCurrentClient(item || {
//                 id: null,
//                 name: '',
//                 email: '',
//                 mobile: ''
//             });
//         }
//     };

//     // Function to handle form input changes
//     const handleFormChange = (e) => {
//         const { name, value } = e.target;
//         if (formType === "edit-client") {
//             setCurrentClient({ ...currentClient, [name]: value });
//         } else if (formType === "edit" || formType === "add") {
//             setCurrentProperty({ ...currentProperty, [name]: value });
//             validateProperty(name, value); // Validate on change
//         }
//     };

//     // Function to handle image input changes
//     const handleImageChange = (e) => {
//         const files = Array.from(e.target.files);
//         setCurrentProperty({ ...currentProperty, images: files.map(file => URL.createObjectURL(file)) });
//     };

//     // Function to handle form submission for adding/editing/deleting properties and clients
//     const handleFormSubmit = (e) => {
//         e.preventDefault();
//         if (formType === "add") {
//             setProperties([...properties, { ...currentProperty, id: properties.length + 1 }]);
//         } else if (formType === "edit") {
//             setProperties(properties.map(property => (
//                 property.id === currentProperty.id ? currentProperty : property
//             )));
//         } else if (formType === "delete") {
//             setProperties(properties.filter(property => property.id !== currentProperty.id));
//         } else if (formType === "edit-client") {
//             setClients(clients.map(client => (
//                 client.id === currentClient.id ? currentClient : client
//             )));
//         } else if (formType === "delete-client") {
//             setClients(clients.filter(client => client.id !== currentClient.id));
//         }
//         setFormType(""); // Close form after action
//     };

//     // Function to filter properties based on user input
//     const filterProperties = () => {
//         return properties.filter(property => 
//             property.title.toLowerCase().includes(filter.toLowerCase()) ||
//             property.location.toLowerCase().includes(filter.toLowerCase())
//         );
//     };

//     return (
//         <div className="dashboard-container">
//             <h3 className="dashboard-title">Agent Dashboard</h3>
//             <button className='logout-button' onClick={logout}>Logout</button>

//             {/* Property Management Section */}
//             <div className="property-management">
//                 <h4 className="section-title">Property Management</h4>
                
//                 <input 
//                     type="text" 
//                     className="filter-input"
//                     placeholder="Filter properties" 
//                     value={filter} 
//                     onChange={(e) => setFilter(e.target.value)} 
//                 />
                
//                 <button className='add-property-button' onClick={() => openForm("add")}>Add Property</button>
                
//                 {/* Form for adding/editing properties */}
//                 {formType === "add" || formType === "edit" ? (
//                     <form className="property-form" onSubmit={handleFormSubmit}>
//                         <h5 className="form-title">{formType === "add" ? "Add Property" : "Edit Property"}</h5>
//                         <input 
//                             type="text" 
//                             name="title" 
//                             className="form-input"
//                             placeholder="Property Title" 
//                             value={currentProperty.title} 
//                             onChange={handleFormChange} 
//                         />
//                         {propertyErrors.title && <p className="error-text">{propertyErrors.title}</p>}
                        
//                         <input 
//                             type="text" 
//                             name="type" 
//                             className="form-input"
//                             placeholder="Property Type" 
//                             value={currentProperty.type} 
//                             onChange={handleFormChange} 
//                         />
//                         <input 
//                             type="number" 
//                             name="price" 
//                             className="form-input"
//                             placeholder="Price" 
//                             value={currentProperty.price} 
//                             onChange={handleFormChange} 
//                         />
//                         {propertyErrors.price && <p className="error-text">{propertyErrors.price}</p>}
                        
//                         <input 
//                             type="text" 
//                             name="location" 
//                             className="form-input"
//                             placeholder="Location" 
//                             value={currentProperty.location} 
//                             onChange={handleFormChange} 
//                         />
//                         <input 
//                             type="text" 
//                             name="availability" 
//                             className="form-input"
//                             placeholder="Availability (For Sale, Rent, Lease)" 
//                             value={currentProperty.availability} 
//                             onChange={handleFormChange} 
//                         />
//                         <input 
//                             type="text" 
//                             name="dimensions" 
//                             className="form-input"
//                             placeholder="Dimensions (Square Feet)" 
//                             value={currentProperty.dimensions} 
//                             onChange={handleFormChange} 
//                         />
//                         <textarea 
//                             name="description" 
//                             className="form-input"
//                             placeholder="Property Description" 
//                             value={currentProperty.description} 
//                             onChange={handleFormChange} 
//                         />
//                         <select 
//                             name="bedroomType" 
//                             className="form-input"
//                             value={currentProperty.bedroomType} 
//                             onChange={handleFormChange}
//                         >
//                             <option value="">Select Bedroom Type</option>
//                             <option value="1BHK">1BHK</option>
//                             <option value="2BHK">2BHK</option>
//                             <option value="3BHK">3BHK</option>
//                         </select>
//                         <input 
//                             type="file" 
//                             className="image-input"
//                             multiple 
//                             accept="image/*" 
//                             onChange={handleImageChange} 
//                         />
//                         <div className="image-preview">
//                             {currentProperty.images.map((image, index) => (
//                                 <img key={index} src={image} alt={`Preview ${index}`} className="property-image" />
//                             ))}
//                         </div>
//                         <button className="submit-button" type="submit">{formType === "add" ? "Save" : "Update"}</button>
//                     </form>
//                 ) : null}

//                 {/* Form for deleting properties */}
//                 {formType === "delete" && (
//                     <form className="delete-form" onSubmit={handleFormSubmit}>
//                         <h5 className="form-title">Delete Property</h5>
//                         <p>Are you sure you want to delete this property?</p>
//                         <button className="submit-button" type="submit">Delete</button>
//                     </form>
//                 )}

//                 {/* Properties Table */}
//                 <table className="properties-table">
//                     <thead>
//                         <tr>
//                             <th>Image</th>
//                             <th>Title</th>
//                             <th>Type</th>
//                             <th>Price</th>
//                             <th>Location</th>
//                             <th>Availability</th>
//                             <th>Dimensions</th>
//                             <th>Description</th>
//                             <th>Bedroom Type</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filterProperties().map(property => (
//                             <tr key={property.id}>
//                                 <td>
//                                     {property.images.length > 0 ? (
//                                         <img src={property.images[0]} alt={property.title} className="property-image" />
//                                     ) : (
//                                         <div className="no-image">No Image</div>
//                                     )}
//                                 </td>
//                                 <td>{property.title}</td>
//                                 <td>{property.type}</td>
//                                 <td>{property.price}</td>
//                                 <td>{property.location}</td>
//                                 <td>{property.availability}</td>
//                                 <td>{property.dimensions}</td>
//                                 <td>{property.description}</td>
//                                 <td>{property.bedroomType}</td>
                                
//                                 <td>
//                                     <button onClick={() => openForm("edit", property)}>Edit</button>
//                                     <button onClick={() => openForm("delete", property)}>Delete</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Client Management Section */}
//             <div className="client-management">
//                 <h4 className="section-title">Client Management</h4>
                
//                 {/* Form for adding clients */}
//                 {formType === "" && (
//                     <div className="client-form">
//                         <input 
//                             type="text" 
//                             placeholder="Client Name" 
//                             value={newClient} 
//                             onChange={(e) => setNewClient(e.target.value)} 
//                         />
//                         {clientErrors.name && <p className="error-text">{clientErrors.name}</p>}
                        
//                         <input 
//                             type="email" 
//                             placeholder="Client Email" 
//                             value={newClientEmail} 
//                             onChange={(e) => setNewClientEmail(e.target.value)} 
//                         />
//                         {clientErrors.email && <p className="error-text">{clientErrors.email}</p>}
                        
//                         <input 
//                             type="tel" 
//                             placeholder="Client Mobile" 
//                             value={newClientMobile} 
//                             onChange={(e) => setNewClientMobile(e.target.value)} 
//                         />
//                         {clientErrors.mobile && <p className="error-text">{clientErrors.mobile}</p>}
//                         <div>
//                         <button className="add-client-button" onClick={addClient}>Add New Client</button>
//                         </div>
//                     </div>
//                 )}

//                 {/* Form for editing clients */}
//                 {formType === "edit-client" && (
//                     <form className="client-form" onSubmit={handleFormSubmit}>
//                         <h5 className="form-title">Edit Client</h5>
//                         <input 
//                             type="text" 
//                             name="name" 
//                             placeholder="Client Name" 
//                             value={currentClient.name} 
//                             onChange={handleFormChange} 
//                         />
//                         <input 
//                             type="email" 
//                             name="email" 
//                             placeholder="Client Email" 
//                             value={currentClient.email} 
//                             onChange={handleFormChange} 
//                         />
//                         <input 
//                             type="tel" 
//                             name="mobile" 
//                             placeholder="Client Mobile" 
//                             value={currentClient.mobile} 
//                             onChange={handleFormChange} 
//                         />
//                         <button className="submit-button" type="submit">Update</button>
//                     </form>
//                 )}

//                 {/* Form for deleting clients */}
//                 {formType === "delete-client" && (
//                     <form className="delete-form" onSubmit={handleFormSubmit}>
//                         <h5 className="form-title">Delete Client</h5>
//                         <p>Are you sure you want to delete this client?</p>
//                         <button className="submit-button" type="submit">Delete</button>
//                     </form>
//                 )}

//                 {/* Clients Table */}
//                 <table className="clients-table">
//                     <thead>
//                         <tr>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Mobile</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {clients.map(client => (
//                             <tr key={client.id}>
//                                 <td>{client.name}</td>
//                                 <td>{client.email}</td>
//                                 <td>{client.mobile}</td>
//                                 <td>
//                                     <button onClick={() => openForm("edit-client", client, 'client')}>Edit</button>
//                                     <button onClick={() => openForm("delete-client", client, 'client')}>Delete</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }

import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';
import './AgentDashboard.css';
import PropertyCard from './PropertyCard'; // Import the PropertyCard component
import { FaUserPlus, FaClipboardList } from 'react-icons/fa'; // Import icons

export default function AgentDashboard(props) {
    const { logout } = useAuth();
    const [properties, setProperties] = useState([]);
    const [clients, setClients] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', mobile: '1234567890' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', mobile: '0987654321' },
        { id: 3, name: 'Michael Johnson', email: 'michael@example.com', mobile: '1122334455' },
        { id: 4, name: 'Emily Davis', email: 'emily@example.com', mobile: '2233445566' },
    ]);
    const [filter, setFilter] = useState("");
    const [formType, setFormType] = useState("");
    const [showClientForm, setShowClientForm] = useState(false); // Control visibility of the add client form
    const [showTransactionTable, setShowTransactionTable] = useState(false); // Control visibility of the transaction table
    const [transactions, setTransactions] = useState([]); // Store transactions data

    const [currentProperty, setCurrentProperty] = useState({
        id: null,
        title: '',
        type: '',
        price: '',
        location: '',
        availability: '',
        dimensions: '',
        description: '',
        bedroomType: '',
        images: [],
    });

    const [currentClient, setCurrentClient] = useState({
        id: null,
        name: '',
        email: '',
        mobile: ''
    });

    const [newClient, setNewClient] = useState("");
    const [newClientEmail, setNewClientEmail] = useState("");
    const [newClientMobile, setNewClientMobile] = useState("");
    const [clientErrors, setClientErrors] = useState({});
    const [propertyErrors, setPropertyErrors] = useState({});

    useEffect(() => {
        // Fetch all properties
        axios.get('http://localhost:8080/api/properties/all')
            .then(response => {
                setProperties(response.data);
            })
            .catch(error => console.error('Error fetching properties:', error));

        // Initialize transaction data (placeholder for real transaction data)
        setTransactions([
            {
                id: 1, clientName: 'John Doe', agentName: 'Agent A', date: '2024-08-24', 
                location: 'New York', bedroomType: '2BHK', paymentMode: 'Credit Card', 
                price: '200000', clientEmail: 'john@example.com'
            },
            {
                id: 2, clientName: 'Jane Smith', agentName: 'Agent B', date: '2024-08-23', 
                location: 'Los Angeles', bedroomType: '3BHK', paymentMode: 'Bank Transfer', 
                price: '350000', clientEmail: 'jane@example.com'
            },
        ]);
    }, []);

    const validateClient = () => {
        const errors = {};
        if (!newClient) errors.name = "Name is required.";
        if (!newClientEmail || !/\S+@\S+\.\S+/.test(newClientEmail)) errors.email = "Valid email is required.";
        if (!newClientMobile || !/^\d{10}$/.test(newClientMobile)) errors.mobile = "Phone number must be 10 digits.";
        return errors;
    };

    const validateProperty = (name, value) => {
        const errors = { ...propertyErrors };
        switch (name) {
            case 'title':
                if (!value) errors.title = "Title is required.";
                else delete errors.title;
                break;
            case 'price':
                if (!value || isNaN(value)) errors.price = "Valid price is required.";
                else delete errors.price;
                break;
            default:
                break;
        }
        setPropertyErrors(errors);
    };

    const addClient = () => {
        const errors = validateClient();
        if (Object.keys(errors).length === 0) {
            setClients([...clients, { id: clients.length + 1, name: newClient, email: newClientEmail, mobile: newClientMobile }]);
            setNewClient("");
            setNewClientEmail("");
            setNewClientMobile("");
            setClientErrors({});
            setShowClientForm(false); // Hide the form after adding a client
        } else {
            setClientErrors(errors);
        }
    };

    const openForm = (type, item = null, itemType = 'property') => {
        setFormType(type);
        if (itemType === 'property') {
            setCurrentProperty(item || {
                id: null,
                title: '',
                type: '',
                price: '',
                location: '',
                availability: '',
                dimensions: '',
                description: '',
                bedroomType: '',
                images: [],
            });
        } else if (itemType === 'client') {
            setCurrentClient(item || {
                id: null,
                name: '',
                email: '',
                mobile: ''
            });
        }
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        if (formType === "edit-client") {
            setCurrentClient({ ...currentClient, [name]: value });
        } else if (formType === "edit" || formType === "add") {
            setCurrentProperty({ ...currentProperty, [name]: value });
            validateProperty(name, value); // Validate on change
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setCurrentProperty({ ...currentProperty, images: files.map(file => URL.createObjectURL(file)) });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (formType === "add") {
            axios.post('http://localhost:8080/api/properties/add', currentProperty)
                .then(response => {
                    setProperties([...properties, response.data]);
                    localStorage.setItem('addedProperty', JSON.stringify(response.data)); // Store in local storage
                    props.onPropertyAdded(response.data); // Use props to pass added property
                    setFormType("");
                })
                .catch(error => console.error('Error adding property:', error));
        } else if (formType === "edit") {
            axios.put(`http://localhost:8080/api/properties/update/${currentProperty.id}`, currentProperty)
                .then(response => {
                    setProperties(properties.map(property => (
                        property.id === response.data.id ? response.data : property
                    )));
                    setFormType("");
                })
                .catch(error => console.error('Error updating property:', error));
        } else if (formType === "delete") {
            axios.delete(`http://localhost:8080/api/properties/delete/${currentProperty.id}`)
                .then(() => {
                    setProperties(properties.filter(property => property.id !== currentProperty.id));
                    setFormType("");
                })
                .catch(error => console.error('Error deleting property:', error));
        } else if (formType === "edit-client") {
            setClients(clients.map(client => (
                client.id === currentClient.id ? currentClient : client
            )));
            setFormType("");
        } else if (formType === "delete-client") {
            setClients(clients.filter(client => client.id !== currentClient.id));
            setFormType("");
        }
    };

    const filterProperties = () => {
        return properties.filter(property =>
            property.title.toLowerCase().includes(filter.toLowerCase()) ||
            property.location.toLowerCase().includes(filter.toLowerCase())
        );
    };

    return (
        <div className="dashboard-container">
            <h3 className="dashboard-title">Agent Dashboard</h3>
            <button className='logout-button' onClick={logout}>Logout</button>

            {/* Property Management Section */}
            <div className="property-management">
                <h4 className="section-title">Property Management</h4>

                <input
                    type="text"
                    className="filter-input"
                    placeholder="Filter properties"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />

                <button className='add-property-button' onClick={() => openForm("add")}>Add Property</button>

                {/* Form for adding/editing properties */}
                {(formType === "add" || formType === "edit") && (
                    <form className="property-form" onSubmit={handleFormSubmit}>
                        <h5 className="form-title">{formType === "add" ? "Add Property" : "Edit Property"}</h5>
                        <input
                            type="text"
                            name="title"
                            className="form-input"
                            placeholder="Property Title"
                            value={currentProperty.title}
                            onChange={handleFormChange}
                        />
                        {propertyErrors.title && <p className="error-text">{propertyErrors.title}</p>}

                        <input
                            type="text"
                            name="type"
                            className="form-input"
                            placeholder="Property Type"
                            value={currentProperty.type}
                            onChange={handleFormChange}
                        />
                        <input
                            type="number"
                            name="price"
                            className="form-input"
                            placeholder="Price"
                            value={currentProperty.price}
                            onChange={handleFormChange}
                        />
                        {propertyErrors.price && <p className="error-text">{propertyErrors.price}</p>}

                        <input
                            type="text"
                            name="location"
                            className="form-input"
                            placeholder="Location"
                            value={currentProperty.location}
                            onChange={handleFormChange}
                        />
                        <input
                            type="text"
                            name="availability"
                            className="form-input"
                            placeholder="Availability (For Sale, Rent, Lease)"
                            value={currentProperty.availability}
                            onChange={handleFormChange}
                        />
                        <input
                            type="text"
                            name="dimensions"
                            className="form-input"
                            placeholder="Dimensions (Square Feet)"
                            value={currentProperty.dimensions}
                            onChange={handleFormChange}
                        />
                        <textarea
                            name="description"
                            className="form-input"
                            placeholder="Property Description"
                            value={currentProperty.description}
                            onChange={handleFormChange}
                        />
                        <select
                            name="bedroomType"
                            className="form-input"
                            value={currentProperty.bedroomType}
                            onChange={handleFormChange}
                        >
                            <option value="">Select Bedroom Type</option>
                            <option value="1BHK">1BHK</option>
                            <option value="2BHK">2BHK</option>
                            <option value="3BHK">3BHK</option>
                        </select>
                        <input
                            type="file"
                            className="image-input"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <div className="image-preview">
                            {currentProperty.images.map((image, index) => (
                                <img key={index} src={image} alt={`Preview ${index}`} className="property-image" />
                            ))}
                        </div>
                        <button className="submit-button" type="submit">
                            {formType === "add" ? "Save" : "Update"}
                        </button>
                    </form>
                )}

                {/* Form for deleting properties */}
                {formType === "delete" && (
                    <form className="delete-form" onSubmit={handleFormSubmit}>
                        <h5 className="form-title">Delete Property</h5>
                        <p>Are you sure you want to delete this property?</p>
                        <button className="submit-button" type="submit">Delete</button>
                    </form>
                )}

                {/* Properties Table */}
                <table className="properties-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Location</th>
                            <th>Availability</th>
                            <th>Dimensions</th>
                            <th>Description</th>
                            <th>Bedroom Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterProperties().map(property => (
                            <tr key={property.id}>
                                <td>
                                    {property.images.length > 0 ? (
                                        <img src={property.images[0]} alt={property.title} className="property-image" />
                                    ) : (
                                        <div className="no-image">No Image</div>
                                    )}
                                </td>
                                <td>{property.title}</td>
                                <td>{property.type}</td>
                                <td>{property.price}</td>
                                <td>{property.location}</td>
                                <td>{property.availability}</td>
                                <td>{property.dimensions}</td>
                                <td>{property.description}</td>
                                <td>{property.bedroomType}</td>

                                <td>
                                    <button onClick={() => openForm("edit", property)}>Edit</button>
                                    <button onClick={() => openForm("delete", property)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Client Management Section */}
            <div className="client-management">
                <h4 className="section-title">Client Management</h4>

                <button className="add-client-button" onClick={() => setShowClientForm(!showClientForm)}>
                    <FaUserPlus /> Add New Client
                </button>

                {/* Form for adding clients */}
                {showClientForm && (
                    <div className="client-form">
                        <input
                            type="text"
                            placeholder="Client Name"
                            value={newClient}
                            onChange={(e) => setNewClient(e.target.value)}
                        />
                        {clientErrors.name && <p className="error-text">{clientErrors.name}</p>}

                        <input
                            type="email"
                            placeholder="Client Email"
                            value={newClientEmail}
                            onChange={(e) => setNewClientEmail(e.target.value)}
                        />
                        {clientErrors.email && <p className="error-text">{clientErrors.email}</p>}

                        <input
                            type="tel"
                            placeholder="Client Mobile"
                            value={newClientMobile}
                            onChange={(e) => setNewClientMobile(e.target.value)}
                        />
                        {clientErrors.mobile && <p className="error-text">{clientErrors.mobile}</p>}
                        <div>
                            <button className="add-client-button" onClick={addClient}>Add New Client</button>
                        </div>
                    </div>
                )}

                {/* Form for editing clients */}
                {formType === "edit-client" && (
                    <form className="client-form" onSubmit={handleFormSubmit}>
                        <h5 className="form-title">Edit Client</h5>
                        <input
                            type="text"
                            name="name"
                            placeholder="Client Name"
                            value={currentClient.name}
                            onChange={handleFormChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Client Email"
                            value={currentClient.email}
                            onChange={handleFormChange}
                        />
                        <input
                            type="tel"
                            name="mobile"
                            placeholder="Client Mobile"
                            value={currentClient.mobile}
                            onChange={handleFormChange}
                        />
                        <button className="submit-button" type="submit">Update</button>
                    </form>
                )}

                {/* Form for deleting clients */}
                {formType === "delete-client" && (
                    <form className="delete-form" onSubmit={handleFormSubmit}>
                        <h5 className="form-title">Delete Client</h5>
                        <p>Are you sure you want to delete this client?</p>
                        <button className="submit-button" type="submit">Delete</button>
                    </form>
                )}

                {/* Clients Table */}
                <table className="clients-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map(client => (
                            <tr key={client.id}>
                                <td>{client.name}</td>
                                <td>{client.email}</td>
                                <td>{client.mobile}</td>
                                <td>
                                    <button onClick={() => openForm("edit-client", client, 'client')}>Edit</button>
                                    <button onClick={() => openForm("delete-client", client, 'client')}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Transaction Management Section */}
            <div className="transaction-management">
                <h4 className="section-title">Transaction Management</h4>
                <button className="transaction-details-button" onClick={() => setShowTransactionTable(!showTransactionTable)}>
                    <FaClipboardList /> Transaction Details
                </button>
                {showTransactionTable && (
                    <table className="transactions-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Client Name</th>
                                <th>Agent Name</th>
                                <th>Date</th>
                                <th>Location</th>
                                <th>Bedroom Type</th>
                                <th>Payment Mode</th>
                                <th>Price</th>
                                <th>Client Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(transaction => (
                                <tr key={transaction.id}>
                                    <td>{transaction.id}</td>
                                    <td>{transaction.clientName}</td>
                                    <td>{transaction.agentName}</td>
                                    <td>{transaction.date}</td>
                                    <td>{transaction.location}</td>
                                    <td>{transaction.bedroomType}</td>
                                    <td>{transaction.paymentMode}</td>
                                    <td>{transaction.price}</td>
                                    <td>{transaction.clientEmail}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
