import React, { useEffect, useState } from 'react';
import PropertyCard from './PropertyCard';

export default function Footer() {
    const [storedProperty, setStoredProperty] = useState(null);

    useEffect(() => {
        const savedProperty = JSON.parse(localStorage.getItem('addedProperty'));
        if (savedProperty) {
            setStoredProperty(savedProperty);
        }
    }, []);

    return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            {storedProperty && (
                <PropertyCard
                    title={storedProperty.title}
                    price={storedProperty.price}
                    location={storedProperty.location}
                    image={storedProperty.images.length > 0 ? storedProperty.images[0] : null}
                />
            )}
        </div>
    );
}
