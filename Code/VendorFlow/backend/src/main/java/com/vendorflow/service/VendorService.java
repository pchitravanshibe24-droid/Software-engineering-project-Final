package com.vendorflow.service;

import com.vendorflow.dto.VendorRequest;
import com.vendorflow.entity.User;
import com.vendorflow.entity.Vendor;
import com.vendorflow.repository.UserRepository;
import com.vendorflow.repository.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VendorService {

    @Autowired
    private VendorRepository vendorRepository;

    @Autowired
    private UserRepository userRepository;

    public Vendor createVendor(VendorRequest request, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (vendorRepository.findByUserUserId(userId).isPresent()) {
            throw new RuntimeException("Vendor profile already exists for this user");
        }

        Vendor vendor = new Vendor();
        vendor.setUser(user);
        vendor.setStoreName(request.getStoreName());
        vendor.setStoreType(request.getStoreType());
        vendor.setLatitude(request.getLatitude());
        vendor.setLongitude(request.getLongitude());
        vendor.setStatus("pending");
        vendor.setReliabilityScore(3.0);

        return vendorRepository.save(vendor);
    }

    public List<Vendor> getAllVendors(String status) {
        if (status != null && !status.isBlank()) {
            return vendorRepository.findByStatus(status);
        }
        return vendorRepository.findAll();
    }

    public Vendor approveVendor(Long vendorId) {
        Vendor vendor = vendorRepository.findById(vendorId)
                .orElseThrow(() -> new RuntimeException("Vendor not found"));
        vendor.setStatus("approved");
        return vendorRepository.save(vendor);
    }

    public Vendor rejectVendor(Long vendorId) {
        Vendor vendor = vendorRepository.findById(vendorId)
                .orElseThrow(() -> new RuntimeException("Vendor not found"));
        vendor.setStatus("rejected");
        return vendorRepository.save(vendor);
    }

    public List<Vendor> getApprovedVendors() {
        return vendorRepository.findByStatus("approved");
    }

    public Vendor getVendorByUserId(Long userId) {
        return vendorRepository.findByUserUserId(userId)
                .orElseThrow(() -> new RuntimeException("Vendor profile not found"));
    }
}
