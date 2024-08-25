// import React, { useState, useEffect } from 'react';
// import { useAuth } from './AuthContext';
// import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome
// import './AdminDashboard.css'; // Import CSS file

// export default function AdminDashboard() {
//     const { logout } = useAuth();
//     const [users, setUsers] = useState([]);
//     const [formType, setFormType] = useState(""); // 'add' or 'edit'
//     const [currentUser, setCurrentUser] = useState({ id: null, name: "", email: "", phone: "", role: "", password: "" });
//     const [searchName, setSearchName] = useState("");
//     const [errors, setErrors] = useState({});
//     const [agentCount, setAgentCount] = useState(0);
//     const [clientCount, setClientCount] = useState(0);
//     const [touchedFields, setTouchedFields] = useState({}); // Track which fields have been touched

//     useEffect(() => {
//         // Function to update agent and client counts
//         const updateCounts = () => {
//             setAgentCount(users.filter(user => user.role === 'agent').length);
//             setClientCount(users.filter(user => user.role === 'client').length);
//         };
//         updateCounts();
//     }, [users]);

//     // Validation rules for individual fields
//     const validateField = (name, value) => {
//         const errors = {};
//         const nameRegex = /^[a-zA-Z\s]{10,25}$/;
//         const phoneRegex = /^[0-9]{10}$/;
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;

//         switch (name) {
//             case 'name':
//                 if (!value.trim()) {
//                     errors.name = 'Name is required.';
//                 } else if (!nameRegex.test(value)) {
//                     errors.name = 'Name must be between 10 and 25 characters.';
//                 }
//                 break;
//             case 'email':
//                 if (!value.trim()) {
//                     errors.email = 'Email is required.';
//                 } else if (!emailRegex.test(value)) {
//                     errors.email = 'Invalid email format.';
//                 }
//                 break;
//             case 'phone':
//                 if (!value.trim()) {
//                     errors.phone = 'Phone number is required.';
//                 } else if (!phoneRegex.test(value)) {
//                     errors.phone = 'Phone number must be 10 digits.';
//                 }
//                 break;
//             case 'password':
//                 if (!value.trim()) {
//                     errors.password = 'Password is required.';
//                 } else if (!passwordRegex.test(value)) {
//                     errors.password = 'Password must be 8-15 characters, with at least 1 uppercase and 1 special character.';
//                 }
//                 break;
//             case 'role':
//                 if (!value) {
//                     errors.role = 'Role is required.';
//                 }
//                 break;
//             default:
//                 break;
//         }

//         return errors;
//     };

//     const checkForDuplicate = () => {
//         return users.some(user =>
//             user.name === currentUser.name ||
//             user.email === currentUser.email ||
//             user.phone === currentUser.phone
//         );
//     };

//     const addUser = (newUser) => {
//         if (checkForDuplicate()) {
//             setErrors({ ...errors, duplicate: 'User with these details already exists. Please provide different details.' });
//             return;
//         }
//         setUsers([...users, { ...newUser, id: users.length + 1 }]);
//         setFormType(""); // Close form after adding
//         setCurrentUser({ id: null, name: "", email: "", phone: "", role: "", password: "" }); // Reset form
//     };

//     const editUser = (userId, updatedUser) => {
//         if (checkForDuplicate()) {
//             setErrors({ ...errors, duplicate: 'User with these details already exists. Please provide different details.' });
//             return;
//         }
//         setUsers(users.map(user => (user.id === userId ? updatedUser : user)));
//         setFormType(""); // Close form after editing
//         setCurrentUser({ id: null, name: "", email: "", phone: "", role: "", password: "" }); // Reset form
//     };

//     const deleteUser = (userId) => {
//         setUsers(users.filter(user => user.id !== userId));
//     };

//     const handleFormSubmit = (e) => {
//         e.preventDefault();
//         const validationErrors = {};
//         // Validate all fields on form submission
//         validateField('name', currentUser.name);
//         validateField('email', currentUser.email);
//         validateField('phone', currentUser.phone);
//         validateField('password', currentUser.password);
//         validateField('role', currentUser.role);

//         if (Object.keys(validationErrors).length === 0) {
//             if (formType === "add") {
//                 addUser(currentUser);
//             } else if (formType === "edit") {
//                 editUser(currentUser.id, currentUser);
//             }
//         }
//     };

//     const handleFormChange = (e) => {
//         const { name, value } = e.target;
//         setCurrentUser({ ...currentUser, [name]: value });

//         // Mark the field as touched
//         setTouchedFields(prevTouched => ({ ...prevTouched, [name]: true }));

//         // Validate the specific field
//         const fieldErrors = validateField(name, value);
        
//         // Update the error state
//         setErrors(prevErrors => ({
//             ...prevErrors,
//             ...fieldErrors,
//             [name]: fieldErrors[name] ? fieldErrors[name] : undefined // Remove error if validation passes
//         }));
//     };

//     const handleSearch = () => {
//         return users.filter(user => user.name.toLowerCase().includes(searchName.toLowerCase()));
//     };

//     return (
//         <div className="admin-dashboard">
//             <h2>Admin Dashboard</h2>
//             <button className="logout-button" onClick={logout}>Logout</button>

//             <div className="counts">
//                 <h4>Counts:</h4>
//                 <p>Agents: {agentCount}</p>
//                 <p>Clients: {clientCount}</p>
//             </div>

//             <div className="search-container">
//                 <i className="fas fa-search search-icon"></i>
//                 <input
//                     type="text"
//                     placeholder="Search by name"
//                     value={searchName}
//                     onChange={(e) => setSearchName(e.target.value)}
//                     className="search-input"
//                 />
//             </div>

//             <table className="user-table">
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Phone</th>
//                         <th>Role</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {handleSearch().map(user => (
//                         <tr key={user.id}>
//                             <td>{user.name}</td>
//                             <td>{user.email}</td>
//                             <td>{user.phone}</td>
//                             <td>{user.role}</td>
//                             <td>
//                                 <button
//                                     className="edit-button"
//                                     onClick={() => {
//                                         setFormType("edit");
//                                         setCurrentUser(user);
//                                         setErrors({});
//                                         setTouchedFields({});
//                                     }}
//                                 >
//                                     Edit
//                                 </button>
//                                 <button
//                                     className="delete-button"
//                                     onClick={() => deleteUser(user.id)}
//                                 >
//                                     Delete
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             <button className="add-user-button" onClick={() => {
//                 setFormType("add");
//                 setCurrentUser({ id: null, name: "", email: "", phone: "", role: "", password: "" });
//                 setErrors({});
//                 setTouchedFields({});
//             }}>Add User</button>

//             {formType && (
//                 <form onSubmit={handleFormSubmit} className="user-form">
//                     <h4>{formType === "add" ? "Add User" : "Edit User"}</h4>
//                     {errors.duplicate && <div className="error-message">{errors.duplicate}</div>}
//                     <div className="form-group">
//                         <input
//                             type="text"
//                             name="name"
//                             placeholder="Name"
//                             value={currentUser.name}
//                             onChange={handleFormChange}
//                             className="form-input"
//                         />
//                         {touchedFields.name && errors.name && <span className="error">{errors.name}</span>}
//                     </div>
//                     <div className="form-group">
//                         <input
//                             type="email"
//                             name="email"
//                             placeholder="Email"
//                             value={currentUser.email}
//                             onChange={handleFormChange}
//                             className="form-input"
//                         />
//                         {touchedFields.email && errors.email && <span className="error">{errors.email}</span>}
//                     </div>
//                     <div className="form-group">
//                         <input
//                             type="text"
//                             name="phone"
//                             placeholder="Phone Number"
//                             value={currentUser.phone}
//                             onChange={handleFormChange}
//                             className="form-input"
//                         />
//                         {touchedFields.phone && errors.phone && <span className="error">{errors.phone}</span>}
//                     </div>
//                     <div className="form-group">
//                         <select
//                             name="role"
//                             value={currentUser.role}
//                             onChange={handleFormChange}
//                             className="form-input"
//                         >
//                             <option value="">Select Role</option>
//                             <option value="admin">Admin</option>
//                             <option value="agent">Agent</option>
//                             <option value="client">Client</option>
//                         </select>
//                         {touchedFields.role && errors.role && <span className="error">{errors.role}</span>}
//                     </div>
//                     <div className="form-group">
//                         <input
//                             type="password"
//                             name="password"
//                             placeholder="Password"
//                             value={currentUser.password}
//                             onChange={handleFormChange}
//                             className="form-input"
//                         />
//                         {touchedFields.password && errors.password && <span className="error">{errors.password}</span>}
//                     </div>
//                     <button type="submit" className="form-submit-button">Submit</button>
//                     <button type="button" onClick={() => setFormType("")} className="form-cancel-button">Cancel</button>
//                 </form>
//             )}
//         </div>
//     );
// }
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome
import './AdminDashboard.css'; // Import CSS file

export default function AdminDashboard() {
    const { logout } = useAuth();
    const [users, setUsers] = useState([]);
    const [formType, setFormType] = useState(""); // 'add' or 'edit'
    const [currentUser, setCurrentUser] = useState({ id: null, name: "", email: "", mobile: "", role: "", password: "" });
    const [searchName, setSearchName] = useState("");
    const [errors, setErrors] = useState({});
    const [agentCount, setAgentCount] = useState(0);
    const [clientCount, setClientCount] = useState(0);
    const [touchedFields, setTouchedFields] = useState({}); // Track which fields have been touched

    useEffect(() => {
        // Function to update agent and client counts
        const updateCounts = () => {
            setAgentCount(users.filter(user => user.role === 'agent').length);
            setClientCount(users.filter(user => user.role === 'client').length);
        };
        updateCounts();
    }, [users]);

    useEffect(() => {
        // Fetch users from the API
        axios.get('http://localhost:8080/api/admin/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const validateFields = () => {
        const errors = {};
        const nameRegex = /^[a-zA-Z\s]{10,25}$/;
        const mobileRegex = /^[0-9]{10}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;

        if (!currentUser.email.trim()) {
            errors.email = 'Email is required.';
        } else if (!emailRegex.test(currentUser.email)) {
            errors.email = 'Invalid email format.';
        }

        if (!currentUser.mobile.trim()) {
            errors.mobile = 'Mobile number is required.';
        } else if (!mobileRegex.test(currentUser.mobile)) {
            errors.mobile = 'Mobile number must be 10 digits.';
        }

        if (!currentUser.role) {
            errors.role = 'Role is required.';
        }

        // Update errors state with all errors
        setErrors(errors);
        return Object.keys(errors).length === 0; // Return true if no errors
    };

    const checkForDuplicate = () => {
        return users.some(user =>
            (formType === "add" && (
                user.name === currentUser.name ||
                user.email === currentUser.email ||
                user.mobile === currentUser.mobile
            )) ||
            (formType === "edit" && (
                (user.name === currentUser.name && user.id !== currentUser.id) ||
                (user.email === currentUser.email && user.id !== currentUser.id) ||
                (user.mobile === currentUser.mobile && user.id !== currentUser.id)
            ))
        );
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (validateFields()) {
            if (checkForDuplicate()) {
                setErrors({ ...errors, duplicate: 'User with these details already exists. Please provide different details.' });
                return;
            }

            if (formType === "add") {
                addUser(currentUser);
            } else if (formType === "edit") {
                editUser(currentUser.id, currentUser);
            }
        }
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setCurrentUser({ ...currentUser, [name]: value });
        
        // Mark the field as touched and validate
        setTouchedFields(prevTouched => ({ ...prevTouched, [name]: true }));
        validateFields();
    };

    const addUser = (newUser) => {
        axios.post('http://localhost:8080/api/admin/users', newUser)
            .then(response => {
                setUsers([...users, response.data]);
                setFormType(""); // Close form after adding
                setCurrentUser({ id: null, name: "", email: "", mobile: "", role: "", password: "" }); // Reset form
            })
            .catch(error => console.error('Error adding user:', error));
    };

    const editUser = (userId, updatedUser) => {
        axios.put(`http://localhost:8080/api/admin/users/${userId}`, updatedUser)
            .then(response => {
                setUsers(users.map(user => (user.id === userId ? response.data : user)));
                setFormType(""); // Close form after editing
                setCurrentUser({ id: null, name: "", email: "", mobile: "", role: "", password: "" }); // Reset form
            })
            .catch(error => console.error('Error updating user:', error));
    };

    const deleteUser = (userId) => {
        axios.delete(`http://localhost:8080/api/admin/users/${userId}`)
            .then(() => setUsers(users.filter(user => user.id !== userId)))
            .catch(error => console.error('Error deleting user:', error));
    };

    const handleSearch = () => {
        return users.filter(user => user.name.toLowerCase().includes(searchName.toLowerCase()));
    };

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            <button className="logout-button" onClick={logout}>Logout</button>

            <div className="counts">
                <h4>Counts:</h4>
                <p>Agents: {agentCount}</p>
                <p>Clients: {clientCount}</p>
            </div>

            <div className="search-container">
                <i className="fas fa-search search-icon"></i>
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="search-input"
                />
            </div>

            <table className="user-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {handleSearch().map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                            <td>{user.role}</td>
                            <td>
                                <button
                                    className="edit-button"
                                    onClick={() => {
                                        setFormType("edit");
                                        setCurrentUser(user);
                                        setErrors({});
                                        setTouchedFields({});
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    className="delete-button"
                                    onClick={() => deleteUser(user.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button className="add-user-button" onClick={() => {
                setFormType("add");
                setCurrentUser({ id: null, name: "", email: "", mobile: "", role: "", password: "" });
                setErrors({});
                setTouchedFields({});
            }}>Add User</button>

            {formType && (
                <form onSubmit={handleFormSubmit} className="user-form">
                    <h4>{formType === "add" ? "Add User" : "Edit User"}</h4>
                    {errors.duplicate && <div className="error-message">{errors.duplicate}</div>}
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={currentUser.name}
                            onChange={handleFormChange}
                            className="form-input"
                        />
                        {/* No validation error display for name */}
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="mobile"
                            placeholder="Mobile"
                            value={currentUser.mobile}
                            onChange={handleFormChange}
                            className="form-input"
                        />
                        {touchedFields.mobile && errors.mobile && <span className="error">{errors.mobile}</span>}
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={currentUser.email}
                            onChange={handleFormChange}
                            className="form-input"
                        />
                        {touchedFields.email && errors.email && <span className="error">{errors.email}</span>}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={currentUser.password}
                            onChange={handleFormChange}
                            className="form-input"
                        />
                        {/* No validation error display for password */}
                    </div>
                    <div className="form-group">
                        <label>Role</label>
                        <div className="role-options">
                            <input
                                type="radio"
                                name="role"
                                value="agent"
                                checked={currentUser.role === 'agent'}
                                onChange={handleFormChange}
                                className="role-radio"
                            /> Agent
                            <input
                                type="radio"
                                name="role"
                                value="client"
                                checked={currentUser.role === 'client'}
                                onChange={handleFormChange}
                                className="role-radio"
                            /> Client
                        </div>
                        {touchedFields.role && errors.role && <span className="error">{errors.role}</span>}
                    </div>
                    <button type="submit" className="submit-button">{formType === "add" ? "Add User" : "Update User"}</button>
                </form>
            )}
        </div>
    );
}
