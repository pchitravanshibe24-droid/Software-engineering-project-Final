package com.vendorflow.service;

import com.vendorflow.dto.OrderRequest;
import com.vendorflow.dto.RouteResponse;
import com.vendorflow.entity.*;
import com.vendorflow.repository.*;
import com.vendorflow.util.RoutingUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired private OrderRepository orderRepository;
    @Autowired private OrderItemRepository orderItemRepository;
    @Autowired private ProductRepository productRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private VendorRepository vendorRepository;

    @Transactional
    public Order placeOrder(OrderRequest request, Long customerId) {
        User customer = userRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        BigDecimal total = BigDecimal.ZERO;

        // Validate products and compute total
        List<OrderItem> items = new ArrayList<>();
        for (OrderRequest.OrderItemRequest itemReq : request.getItems()) {
            Product product = productRepository.findById(itemReq.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found: " + itemReq.getProductId()));

            if (product.getStockQty() < itemReq.getQuantity()) {
                throw new RuntimeException("Insufficient stock for: " + product.getName());
            }

            BigDecimal lineTotal = product.getPrice().multiply(BigDecimal.valueOf(itemReq.getQuantity()));
            total = total.add(lineTotal);

            OrderItem oi = new OrderItem();
            oi.setProduct(product);
            oi.setQuantity(itemReq.getQuantity());
            oi.setPrice(product.getPrice());
            items.add(oi);
        }

        // Create order
        Order order = new Order();
        order.setCustomer(customer);
        order.setStatus("placed");
        order.setTotalAmount(total);
        order.setCustomerLatitude(request.getCustomerLatitude());
        order.setCustomerLongitude(request.getCustomerLongitude());
        Order savedOrder = orderRepository.save(order);

        // Save items
        for (OrderItem oi : items) {
            oi.setOrder(savedOrder);
            orderItemRepository.save(oi);
        }

        return savedOrder;
    }

    @Transactional
    public RouteResponse routeOrder(Long orderId, Long customerId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!order.getCustomer().getUserId().equals(customerId)) {
            throw new RuntimeException("Unauthorized: order does not belong to you");
        }

        if (!"placed".equals(order.getStatus())) {
            throw new RuntimeException("Order already routed or cancelled");
        }

        // Get ordered product IDs
        List<OrderItem> orderItems = orderItemRepository.findByOrderOrderId(orderId);
        Set<String> orderedProductNames = orderItems.stream()
                .map(oi -> oi.getProduct().getName().toLowerCase())
                .collect(Collectors.toSet());

        // Find all approved vendors
        List<Vendor> approvedVendors = vendorRepository.findByStatus("approved");

        // For each approved vendor, check if they have any of the ordered products in stock
        // We match by product name (since same product can be listed by multiple vendors)
        Map<Long, Integer> vendorStockMap = new HashMap<>();
        Map<Long, Vendor> candidateVendors = new HashMap<>();

        for (Vendor vendor : approvedVendors) {
            List<Product> vendorProducts = productRepository.findByVendorVendorId(vendor.getVendorId());
            int totalMatchingStock = 0;

            for (Product vp : vendorProducts) {
                if (orderedProductNames.contains(vp.getName().toLowerCase()) && vp.getStockQty() > 0) {
                    totalMatchingStock += vp.getStockQty();
                }
            }

            if (totalMatchingStock > 0) {
                vendorStockMap.put(vendor.getVendorId(), totalMatchingStock);
                candidateVendors.put(vendor.getVendorId(), vendor);
            }
        }

        if (candidateVendors.isEmpty()) {
            throw new RuntimeException("No vendors available with the requested products in stock");
        }

        // Score and rank vendors
        List<RouteResponse.VendorCandidate> ranked = RoutingUtil.rankVendors(
                new ArrayList<>(candidateVendors.values()),
                vendorStockMap,
                order.getCustomerLatitude(),
                order.getCustomerLongitude());

        // Pick winner
        RouteResponse.VendorCandidate winner = ranked.get(0);
        Vendor assignedVendor = candidateVendors.get(winner.getVendorId());

        // Update order
        order.setVendor(assignedVendor);
        order.setStatus("confirmed");
        orderRepository.save(order);

        return new RouteResponse(orderId, "confirmed", winner, ranked);
    }

    public Order getOrder(Long orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public List<Order> getOrdersByCustomer(Long customerId) {
        return orderRepository.findByCustomerUserId(customerId);
    }
}
