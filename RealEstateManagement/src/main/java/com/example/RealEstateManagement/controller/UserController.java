package com.example.RealEstateManagement.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.RealEstateManagement.model.User;
import com.example.RealEstateManagement.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins="http://localhost:3000")
public class UserController {
    @Autowired
    private UserService userService;
    

	 
   
	  @PostMapping("/login")
	  public ResponseEntity<?> login(@Valid @RequestBody User user) {
	      Optional<User> existingUser = userService.findByName(user.getName());
	      if (existingUser.isPresent() && existingUser.get().getPassword().equals(user.getPassword()) && existingUser.get().getRole().equals(user.getRole())) {
	          Map<String, Object> response = new HashMap<>();
	          response.put("email", existingUser.get().getName());
	          response.put("role", existingUser.get().getRole());
	          return ResponseEntity.ok(response);
	      }
	      return ResponseEntity.status(401).body("Invalid email or password");
	  }

    
    
    
    
    @PostMapping("/register")
    
    public ResponseEntity<User> register(@Valid @RequestBody User user) {
        return ResponseEntity.ok(userService.saveUser(user));
    }
    
    
}