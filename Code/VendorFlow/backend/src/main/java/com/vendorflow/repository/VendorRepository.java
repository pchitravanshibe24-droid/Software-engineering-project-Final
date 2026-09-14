package com.vendorflow.repository;

import com.vendorflow.entity.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VendorRepository extends JpaRepository<Vendor, Long> {
    List<Vendor> findByStatus(String status);
    Optional<Vendor> findByUserUserId(Long userId);
}
