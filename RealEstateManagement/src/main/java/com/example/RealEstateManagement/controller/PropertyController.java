package com.example.RealEstateManagement.controller;

import com.example.RealEstateManagement.model.Property;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.example.RealEstateManagement.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.RealEstateManagement.exception.ResourceNotFoundException;

import java.util.List;

@RestController
@RequestMapping("/api/properties")
@CrossOrigin(origins="http://localhost:3000")
public class PropertyController {

    @Autowired
    private PropertyRepository propertyRepository;

    @GetMapping("/all")
    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    @PostMapping("/add")
    public Property addProperty(@RequestBody Property property) {
        return propertyRepository.save(property);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Property> updateProperty(@PathVariable Long id, @RequestBody Property propertyDetails) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found for this id :: " + id));
        
        property.setTitle(propertyDetails.getTitle());
        property.setType(propertyDetails.getType());
        property.setPrice(propertyDetails.getPrice());
        property.setLocation(propertyDetails.getLocation());
        property.setAvailability(propertyDetails.getAvailability());
        property.setDimensions(propertyDetails.getDimensions());
        property.setDescription(propertyDetails.getDescription());
        property.setBedroomType(propertyDetails.getBedroomType());
        property.setImages(propertyDetails.getImages());

        final Property updatedProperty = propertyRepository.save(property);
        return ResponseEntity.ok(updatedProperty);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteProperty(@PathVariable Long id) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found for this id :: " + id));

        propertyRepository.delete(property);
        return ResponseEntity.noContent().build();
    }
}
