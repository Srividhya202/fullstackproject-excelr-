package com.example.RealEstateManagement.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.RealEstateManagement.model.InterestedTenant;

public interface InterestedTenantRepository extends JpaRepository<InterestedTenant, Long> {

}