package com.vendorflow.dto;

import java.util.List;

public class RouteResponse {
    private Long orderId;
    private String status;
    private VendorCandidate assignedVendor;
    private List<VendorCandidate> allCandidates;

    public RouteResponse() {}

    public RouteResponse(Long orderId, String status,
                         VendorCandidate assignedVendor,
                         List<VendorCandidate> allCandidates) {
        this.orderId = orderId;
        this.status = status;
        this.assignedVendor = assignedVendor;
        this.allCandidates = allCandidates;
    }

    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public VendorCandidate getAssignedVendor() { return assignedVendor; }
    public void setAssignedVendor(VendorCandidate assignedVendor) { this.assignedVendor = assignedVendor; }
    public List<VendorCandidate> getAllCandidates() { return allCandidates; }
    public void setAllCandidates(List<VendorCandidate> allCandidates) { this.allCandidates = allCandidates; }

    public static class VendorCandidate {
        private Long vendorId;
        private String storeName;
        private String storeType;
        private Double distance;
        private Double reliabilityScore;
        private Integer totalStock;
        private Boolean stockAvailable;
        private Double score;

        public VendorCandidate() {}

        public VendorCandidate(Long vendorId, String storeName, String storeType,
                               Double distance, Double reliabilityScore,
                               Integer totalStock, Boolean stockAvailable, Double score) {
            this.vendorId = vendorId;
            this.storeName = storeName;
            this.storeType = storeType;
            this.distance = distance;
            this.reliabilityScore = reliabilityScore;
            this.totalStock = totalStock;
            this.stockAvailable = stockAvailable;
            this.score = score;
        }

        public Long getVendorId() { return vendorId; }
        public void setVendorId(Long vendorId) { this.vendorId = vendorId; }
        public String getStoreName() { return storeName; }
        public void setStoreName(String storeName) { this.storeName = storeName; }
        public String getStoreType() { return storeType; }
        public void setStoreType(String storeType) { this.storeType = storeType; }
        public Double getDistance() { return distance; }
        public void setDistance(Double distance) { this.distance = distance; }
        public Double getReliabilityScore() { return reliabilityScore; }
        public void setReliabilityScore(Double reliabilityScore) { this.reliabilityScore = reliabilityScore; }
        public Integer getTotalStock() { return totalStock; }
        public void setTotalStock(Integer totalStock) { this.totalStock = totalStock; }
        public Boolean getStockAvailable() { return stockAvailable; }
        public void setStockAvailable(Boolean stockAvailable) { this.stockAvailable = stockAvailable; }
        public Double getScore() { return score; }
        public void setScore(Double score) { this.score = score; }
    }
}
