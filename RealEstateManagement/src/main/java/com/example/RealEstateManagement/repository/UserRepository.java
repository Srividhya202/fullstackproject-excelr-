package com.example.RealEstateManagement.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.RealEstateManagement.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByName(String email);

}