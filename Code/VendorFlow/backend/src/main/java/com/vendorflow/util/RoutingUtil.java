package com.vendorflow.util;

import com.vendorflow.dto.RouteResponse;
import com.vendorflow.entity.Vendor;

import java.util.Comparator;
import java.util.List;
import java.util.Map;

public class RoutingUtil {

    private static final double W_DISTANCE    = 0.4;
    private static final double W_STOCK       = 0.3;
    private static final double W_RELIABILITY = 0.3;

    /**
     * Score and rank vendor candidates.
     *
     * @param vendors         list of approved vendors who carry at least one ordered product
     * @param stockTotals     map of vendorId → total stock available across ordered products
     * @param customerLat     customer latitude
     * @param customerLon     customer longitude
     * @return sorted list of VendorCandidate (highest score first)
     */
    public static List<RouteResponse.VendorCandidate> rankVendors(
            List<Vendor> vendors,
            Map<Long, Integer> stockTotals,
            double customerLat,
            double customerLon) {

        return vendors.stream()
                .map(vendor -> {
                    double distance = HaversineUtil.distanceKm(
                            customerLat, customerLon,
                            vendor.getLatitude(), vendor.getLongitude());

                    int totalStock = stockTotals.getOrDefault(vendor.getVendorId(), 0);
                    boolean stockAvailable = totalStock > 0;

                    double score = (W_DISTANCE * (1.0 / (1.0 + distance)))
                            + (W_STOCK * (stockAvailable ? 1.0 : 0.0))
                            + (W_RELIABILITY * (vendor.getReliabilityScore() / 5.0));

                    // Round to 4 decimal places for readability
                    score = Math.round(score * 10000.0) / 10000.0;
                    distance = Math.round(distance * 100.0) / 100.0;

                    return new RouteResponse.VendorCandidate(
                            vendor.getVendorId(),
                            vendor.getStoreName(),
                            vendor.getStoreType(),
                            distance,
                            vendor.getReliabilityScore(),
                            totalStock,
                            stockAvailable,
                            score);
                })
                .sorted(Comparator.comparingDouble(RouteResponse.VendorCandidate::getScore).reversed())
                .toList();
    }
}
