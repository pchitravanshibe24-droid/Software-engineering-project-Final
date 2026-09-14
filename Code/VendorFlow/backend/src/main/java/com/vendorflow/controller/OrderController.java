package com.vendorflow.controller;

import com.vendorflow.dto.OrderRequest;
import com.vendorflow.dto.RouteResponse;
import com.vendorflow.entity.Order;
import com.vendorflow.service.OrderService;
import com.vendorflow.util.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired private OrderService orderService;
    @Autowired private SecurityUtils security;

    /** POST /api/orders — customer places order */
    @PostMapping
    public ResponseEntity<?> placeOrder(@RequestBody OrderRequest request) {
        try {
            if (!security.hasRole("customer")) {
                return ResponseEntity.status(403).body(Map.of("error", "Customer access required"));
            }
            Long userId = security.getCurrentUserId();
            Order order = orderService.placeOrder(request, userId);
            return ResponseEntity.ok(order);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /** POST /api/orders/{id}/route — smart vendor routing */
    @PostMapping("/{id}/route")
    public ResponseEntity<?> routeOrder(@PathVariable Long id) {
        try {
            Long userId = security.getCurrentUserId();
            RouteResponse response = orderService.routeOrder(id, userId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /** GET /api/orders/{id} */
    @GetMapping("/{id}")
    public ResponseEntity<?> getOrder(@PathVariable Long id) {
        try {
            Order order = orderService.getOrder(id);
            return ResponseEntity.ok(order);
        } catch (Exception e) {
            return ResponseEntity.status(404).body(Map.of("error", e.getMessage()));
        }
    }

    /** GET /api/orders?customer_id=X */
    @GetMapping
    public ResponseEntity<?> getOrders(
            @RequestParam(name = "customer_id", required = false) Long customerId) {
        try {
            if (customerId == null) {
                customerId = security.getCurrentUserId();
            }
            List<Order> orders = orderService.getOrdersByCustomer(customerId);
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
