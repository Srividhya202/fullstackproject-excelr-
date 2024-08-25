import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header'; // Import Header component
import HomePage from './HomePage';
import Login from './Login';
import Register from './Register';
import AdminDashboard from './AdminDashboard';
import AgentDashboard from './AgentDashboard';
import ClientDashboard from './ClientDashboard';
import PropertyDetails from './components/PropertyDetails'; // Import PropertyDetails component
import About from './components/About'; // Import About component
import Contact from './components/Contact'; // Import Contact component
import Help from './components/Help';


import AuthProvider from './AuthContext';
function App() {
    return (
        <AuthProvider>
        <Router>
            
            <Header /> {/* Include the Header component */}
            
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/agent-dashboard" element={<AgentDashboard />} />
                <Route path="/client-dashboard" element={<ClientDashboard />} />
                <Route path="/property/:id" element={<PropertyDetails />} /> {/* Route for PropertyDetails */}
                <Route path="/about" element={<About />} /> {/* Route for About page */}
                <Route path="/contact" element={<Contact />} /> {/* Route for Contact page */}
                <Route path="/help" element={<Help />} /> {/* Route for Help page */}
                <Route path="*" element={<HomePage />} />  {/* Redirect to HomePage for unknown routes */}
            </Routes>
        </Router>
        </AuthProvider>
    );
}

export default App;
