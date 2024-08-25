package com.example.RealEstateManagement.model;



import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50, nullable = false)
    @NotBlank(message = "Name is required")
    private String name;

    @Column(length = 50, nullable = false, unique = true)
    @Email(message = "Email should be valid")
    private String email;

    @Column(length = 10, nullable = false, unique = true)
    @Pattern(regexp = "^\\d{10}$", message = "Phone number must be 10 digits")
    private String mobile;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

    
	
    
    // Getters and Setters
}
