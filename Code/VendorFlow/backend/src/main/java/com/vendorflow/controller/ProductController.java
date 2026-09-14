package com.vendorflow.controller;

import com.vendorflow.dto.ProductRequest;
import com.vendorflow.entity.Product;
import com.vendorflow.service.ProductService;
import com.vendorflow.util.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired private ProductService productService;
    @Autowired private SecurityUtils security;

    /** GET /api/products?vendor_id=X or GET /api/products — public */
    @GetMapping
    public ResponseEntity<List<Product>> getProducts(
            @RequestParam(name = "vendor_id", required = false) Long vendorId) {
        if (vendorId != null) {
            return ResponseEntity.ok(productService.getProductsByVendor(vendorId));
        }
        return ResponseEntity.ok(productService.getAllProductsFromApprovedVendors());
    }

    /** POST /api/products — vendor only */
    @PostMapping
    public ResponseEntity<?> addProduct(@RequestBody ProductRequest request) {
        try {
            if (!security.hasRole("vendor")) {
                return ResponseEntity.status(403).body(Map.of("error", "Vendor access required"));
            }
            Long userId = security.getCurrentUserId();
            Product product = productService.addProduct(request, userId);
            return ResponseEntity.ok(product);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /** PUT /api/products/{id} — vendor only */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id,
                                           @RequestBody ProductRequest request) {
        try {
            if (!security.hasRole("vendor")) {
                return ResponseEntity.status(403).body(Map.of("error", "Vendor access required"));
            }
            Long userId = security.getCurrentUserId();
            Product product = productService.updateProduct(id, request, userId);
            return ResponseEntity.ok(product);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
