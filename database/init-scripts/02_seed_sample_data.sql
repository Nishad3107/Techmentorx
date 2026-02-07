-- Sample data for development and testing
-- This script should only be run in development environments

-- Insert sample NGOs
INSERT INTO ngos (name, email, phone, registration_number, address, city, state, pincode, latitude, longitude, is_verified, capacity) VALUES
('Hope Foundation', 'contact@hopefoundation.org', '+1-555-0101', 'NGO-2024-001', '123 Main St', 'Mumbai', 'Maharashtra', '400001', 19.0760, 72.8777, true, 500),
('Care & Share', 'info@careandshare.org', '+1-555-0102', 'NGO-2024-002', '456 Park Ave', 'Delhi', 'Delhi', '110001', 28.7041, 77.1025, true, 300),
('Helping Hands', 'help@helpinghands.org', '+1-555-0103', 'NGO-2024-003', '789 Oak Rd', 'Bangalore', 'Karnataka', '560001', 12.9716, 77.5946, true, 400);

-- Insert sample admin user (password: admin123 - hashed with bcrypt)
INSERT INTO users (email, password, first_name, last_name, role) VALUES
('admin@ngoconnect.org', '$2a$10$YourHashedPasswordHere', 'Admin', 'User', 'admin');

-- Note: In production, do not include sample data and ensure strong passwords
