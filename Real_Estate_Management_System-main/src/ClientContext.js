import React, { createContext, useState, useContext } from 'react';

const ClientContext = createContext();

export function useClient() {
    return useContext(ClientContext);
}

export function ClientProvider({ children }) {
    const [clients, setClients] = useState([]);

    const getClientDetails = async () => {
        // Fetch client details from your API or data source
        // Here, you should replace this with actual fetching logic
        return clients;
    };

    const updateClientDetails = async (clientId, details) => {
        // Update client details logic
        // Here, you should replace this with actual updating logic
        setClients(clients.map(client =>
            client.id === clientId ? { ...client, ...details } : client
        ));
    };

    const value = {
        getClientDetails,
        updateClientDetails,
    };

    return <ClientContext.Provider value={value}>{children}</ClientContext.Provider>;
}
