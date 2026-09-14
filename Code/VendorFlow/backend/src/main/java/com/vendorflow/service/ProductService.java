package com.vendorflow.service;

import com.vendorflow.dto.ProductRequest;
import com.vendorflow.entity.Product;
import com.vendorflow.entity.Vendor;
import com.vendorflow.repository.ProductRepository;
import com.vendorflow.repository.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private VendorRepository vendorRepository;

    public Product addProduct(ProductRequest request, Long userId) {
        Vendor vendor = vendorRepository.findByUserUserId(userId)
                .orElseThrow(() -> new RuntimeException("Vendor profile not found for this user"));

        Product product = new Product();
        product.setVendor(vendor);
        product.setName(request.getName());
        product.setCategory(request.getCategory());
        product.setPrice(request.getPrice());
        product.setStockQty(request.getStockQty() != null ? request.getStockQty() : 0);

        return productRepository.save(product);
    }

    public Product updateProduct(Long productId, ProductRequest request, Long userId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Verify ownership
        Vendor vendor = vendorRepository.findByUserUserId(userId)
                .orElseThrow(() -> new RuntimeException("Vendor profile not found"));
        if (!product.getVendor().getVendorId().equals(vendor.getVendorId())) {
            throw new RuntimeException("Unauthorized: product does not belong to your store");
        }

        product.setName(request.getName());
        product.setCategory(request.getCategory());
        product.setPrice(request.getPrice());
        product.setStockQty(request.getStockQty() != null ? request.getStockQty() : product.getStockQty());

        return productRepository.save(product);
    }

    public List<Product> getProductsByVendor(Long vendorId) {
        return productRepository.findByVendorVendorId(vendorId);
    }

    public List<Product> getAllProductsFromApprovedVendors() {
        return productRepository.findByVendorStatus("approved");
    }
}
