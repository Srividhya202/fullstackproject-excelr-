package com.example.RealEstateManagement.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.RealEstateManagement.model.User;
import com.example.RealEstateManagement.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    

    public Optional<User> findByName(String name) {
        return userRepository.findByName(name);
    }
    
    public List<User> findAll() {
        return userRepository.findAll();
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }
   
	
}
