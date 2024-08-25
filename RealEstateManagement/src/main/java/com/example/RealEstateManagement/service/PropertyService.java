package com.example.RealEstateManagement.service;
import com.example.RealEstateManagement.exception.ResourceNotFoundException;
import com.example.RealEstateManagement.model.Property;
import com.example.RealEstateManagement.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;

    // Get all properties
    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    // Get property by ID
    public Property getPropertyById(Long id) throws ResourceNotFoundException {
        return propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found for this id :: " + id));
    }

    // Create a new property
    public Property createProperty(Property property) {
        return propertyRepository.save(property);
    }

    // Update property
    public Property updateProperty(Long id, Property propertyDetails) throws ResourceNotFoundException {
        Property property = getPropertyById(id);

       // property.setName(propertyDetails.getName());
        property.setDescription(propertyDetails.getDescription());
        property.setPrice(propertyDetails.getPrice());
        property.setLocation(propertyDetails.getLocation());

        return propertyRepository.save(property);
    }

    // Delete property
    public void deleteProperty(Long id) throws ResourceNotFoundException {
        Property property = getPropertyById(id);
        propertyRepository.delete(property);
    }
}
