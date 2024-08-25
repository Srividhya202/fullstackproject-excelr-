package com.example.RealEstateManagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.RealEstateManagement.model.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
}
