package com.vendorflow.controller;

import com.vendorflow.dto.VendorRequest;
import com.vendorflow.entity.Vendor;
import com.vendorflow.service.VendorService;
import com.vendorflow.util.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/vendors")
public class VendorController {

    @Autowired private VendorService vendorService;
    @Autowired private SecurityUtils security;

    /** GET /api/vendors/approved — public */
    @GetMapping("/approved")
    public ResponseEntity<List<Vendor>> getApprovedVendors() {
        return ResponseEntity.ok(vendorService.getApprovedVendors());
    }

    /** GET /api/vendors/my — current vendor's own profile */
    @GetMapping("/my")
    public ResponseEntity<?> getMyVendor() {
        try {
            Long userId = security.getCurrentUserId();
            Vendor vendor = vendorService.getVendorByUserId(userId);
            return ResponseEntity.ok(vendor);
        } catch (Exception e) {
            return ResponseEntity.status(404).body(Map.of("error", e.getMessage()));
        }
    }

    /** GET /api/vendors?status=X — admin only */
    @GetMapping
    public ResponseEntity<?> getAllVendors(@RequestParam(required = false) String status) {
        try {
            if (!security.hasRole("admin")) {
                return ResponseEntity.status(403).body(Map.of("error", "Admin access required"));
            }
            return ResponseEntity.ok(vendorService.getAllVendors(status));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /** POST /api/vendors — vendor creates store profile */
    @PostMapping
    public ResponseEntity<?> createVendor(@RequestBody VendorRequest request) {
        try {
            if (!security.hasRole("vendor")) {
                return ResponseEntity.status(403).body(Map.of("error", "Vendor access required"));
            }
            Long userId = security.getCurrentUserId();
            Vendor vendor = vendorService.createVendor(request, userId);
            return ResponseEntity.ok(vendor);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /** PATCH /api/vendors/{id}/approve — admin only */
    @PatchMapping("/{id}/approve")
    public ResponseEntity<?> approveVendor(@PathVariable Long id) {
        try {
            if (!security.hasRole("admin")) {
                return ResponseEntity.status(403).body(Map.of("error", "Admin access required"));
            }
            return ResponseEntity.ok(vendorService.approveVendor(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /** PATCH /api/vendors/{id}/reject — admin only */
    @PatchMapping("/{id}/reject")
    public ResponseEntity<?> rejectVendor(@PathVariable Long id) {
        try {
            if (!security.hasRole("admin")) {
                return ResponseEntity.status(403).body(Map.of("error", "Admin access required"));
            }
            return ResponseEntity.ok(vendorService.rejectVendor(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
