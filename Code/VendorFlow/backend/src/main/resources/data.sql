-- =============================================================
-- VendorFlow Seed Data
-- BCrypt hash of "password123":
--   $2a$10$PLlsf.Jl3wg1ZV.6l8dxVuiIwsJxaZAxAKIEgDTNYTWXQf7oYDGPe
-- =============================================================

-- Users
INSERT INTO users (name, email, password_hash, role, phone, created_at) VALUES
  ('Admin User',        'admin@vendorflow.com',     '$2a$10$PLlsf.Jl3wg1ZV.6l8dxVuiIwsJxaZAxAKIEgDTNYTWXQf7oYDGPe', 'admin',    '9000000001', NOW()),
  ('QuickMart Owner',   'quickmart@vendorflow.com', '$2a$10$PLlsf.Jl3wg1ZV.6l8dxVuiIwsJxaZAxAKIEgDTNYTWXQf7oYDGPe', 'vendor',   '9000000002', NOW()),
  ('FreshStore Owner',  'freshstore@vendorflow.com','$2a$10$PLlsf.Jl3wg1ZV.6l8dxVuiIwsJxaZAxAKIEgDTNYTWXQf7oYDGPe', 'vendor',   '9000000003', NOW()),
  ('Test Customer',     'customer@vendorflow.com',  '$2a$10$PLlsf.Jl3wg1ZV.6l8dxVuiIwsJxaZAxAKIEgDTNYTWXQf7oYDGPe', 'customer', '9000000004', NOW());

-- Vendors
-- QuickMart: CLOSE to customer (28.6200, 77.2100), low stock, average reliability
-- FreshStore: FARTHER from customer, high stock, high reliability
-- Customer test lat/lng: 28.6200, 77.2100
INSERT INTO vendors (user_id, store_name, store_type, latitude, longitude, reliability_score, status, created_at) VALUES
  (2, 'QuickMart',   'grocery',  28.6139, 77.2090, 3.0, 'approved', NOW()),
  (3, 'FreshStore',  'grocery',  28.5355, 77.3910, 4.8, 'approved', NOW());

-- Products (vendor_id 1 = QuickMart, vendor_id 2 = FreshStore)
-- Same product in both vendors → routing demo
INSERT INTO products (vendor_id, name, category, price, stock_qty, created_at) VALUES
  (1, 'Apple',  'Fruits',      50.00, 2,   NOW()),  -- QuickMart: low stock
  (1, 'Banana', 'Fruits',      20.00, 30,  NOW()),
  (1, 'Milk',   'Dairy',       55.00, 10,  NOW()),
  (2, 'Apple',  'Fruits',      48.00, 50,  NOW()),  -- FreshStore: high stock
  (2, 'Banana', 'Fruits',      18.00, 100, NOW()),
  (2, 'Milk',   'Dairy',       52.00, 60,  NOW()),
  (2, 'Bread',  'Bakery',      35.00, 40,  NOW());
