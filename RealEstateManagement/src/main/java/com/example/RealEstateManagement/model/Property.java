package com.example.RealEstateManagement.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.io.Serializable;
import java.util.List;

@Entity
public class Property implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] imageUrl;

    @Column(length = 35, nullable = false)
    @NotBlank(message = "Title is required")
    private String title;

    @Column(length = 35, nullable = false)
    @NotBlank(message = "Property type is required")
    private String type;

    @Column(nullable = false)
    @Min(value = 0, message = "Price must be a positive number")
    private double price;

    @Column(nullable = false, length = 80)
    @NotBlank(message = "Location is required")
    private String location;

    @Column(nullable = false, length = 20)
    @NotBlank(message = "Availability is required")
    private String availability;

    @Column(length = 10, nullable = false)
    @NotBlank(message = "Dimensions are required")
    private String dimensions;

    @Column(length = 100)
    private String description;

    @Column(length = 5, nullable = false)
    @NotBlank(message = "Bedroom type is required")
    private String bedroomType;

    @ElementCollection
    @CollectionTable(name = "property_images", joinColumns = @JoinColumn(name = "property_id"))
    @Column(name = "image_url")
    private List<String> images;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public byte[] getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(byte[] imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getAvailability() {
		return availability;
	}

	public void setAvailability(String availability) {
		this.availability = availability;
	}

	public String getDimensions() {
		return dimensions;
	}

	public void setDimensions(String dimensions) {
		this.dimensions = dimensions;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getBedroomType() {
		return bedroomType;
	}

	public void setBedroomType(String bedroomType) {
		this.bedroomType = bedroomType;
	}

	public List<String> getImages() {
		return images;
	}

	public void setImages(List<String> images) {
		this.images = images;
	}

    
}
