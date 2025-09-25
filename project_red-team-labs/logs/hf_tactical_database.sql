-- H&F Tactical Solutions Database
-- For SQL Injection Practice and Security Testing

CREATE DATABASE IF NOT EXISTS hf_tactical;
USE hf_tactical;

-- Drop tables if they exist (for clean setup)
DROP TABLE IF EXISTS sales_records;
DROP TABLE IF EXISTS network_logs;
DROP TABLE IF EXISTS product_inventory;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS users;

-- Users table (for login system - vulnerable to SQL injection)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    role ENUM('admin', 'sales', 'operations', 'viewer') DEFAULT 'viewer',
    security_clearance ENUM('None', 'Confidential', 'Secret', 'Top Secret', 'TS/SCI') DEFAULT 'None',
    last_login TIMESTAMP,
    failed_attempts INT DEFAULT 0,
    account_locked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Employees table
CREATE TABLE employees (
    employee_id VARCHAR(10) PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    department VARCHAR(50),
    position VARCHAR(100),
    hire_date DATE,
    security_clearance ENUM('None', 'Confidential', 'Secret', 'Top Secret', 'TS/SCI'),
    salary DECIMAL(10,2),
    manager VARCHAR(50),
    office_location VARCHAR(100),
    emergency_contact VARCHAR(100),
    emergency_phone VARCHAR(20),
    ssn_last4 VARCHAR(4),
    access_level INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Customers table
CREATE TABLE customers (
    customer_id VARCHAR(10) PRIMARY KEY,
    organization_name VARCHAR(200) NOT NULL,
    contact_person VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    address VARCHAR(200),
    city VARCHAR(50),
    state VARCHAR(2),
    zip VARCHAR(10),
    organization_type VARCHAR(50),
    security_clearance ENUM('None', 'Confidential', 'Secret', 'Top Secret', 'TS/SCI'),
    account_status ENUM('Active', 'Inactive', 'Suspended') DEFAULT 'Active',
    credit_limit DECIMAL(12,2),
    total_purchases DECIMAL(12,2) DEFAULT 0.00,
    last_order_date DATE,
    assigned_sales_rep VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Product inventory table
CREATE TABLE product_inventory (
    product_id VARCHAR(10) PRIMARY KEY,
    product_name VARCHAR(200) NOT NULL,
    category VARCHAR(50),
    manufacturer VARCHAR(100),
    model VARCHAR(100),
    price DECIMAL(10,2),
    stock_quantity INT DEFAULT 0,
    reorder_level INT DEFAULT 0,
    supplier_id VARCHAR(10),
    last_restocked DATE,
    security_clearance_required ENUM('None', 'Confidential', 'Secret', 'Top Secret', 'TS/SCI'),
    restricted_item BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sales records table
CREATE TABLE sales_records (
    order_id VARCHAR(10) PRIMARY KEY,
    order_date DATE NOT NULL,
    customer_name VARCHAR(100),
    customer_organization VARCHAR(200),
    customer_clearance ENUM('None', 'Confidential', 'Secret', 'Top Secret', 'TS/SCI'),
    sales_rep VARCHAR(100),
    product_id VARCHAR(10),
    product_name VARCHAR(200),
    quantity INT,
    unit_price DECIMAL(10,2),
    total_amount DECIMAL(12,2),
    payment_method VARCHAR(50),
    shipping_address TEXT,
    order_status ENUM('Processing', 'Shipped', 'Delivered', 'Cancelled') DEFAULT 'Processing',
    delivery_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES product_inventory(product_id)
);

-- Network access logs table
CREATE TABLE network_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    timestamp DATETIME NOT NULL,
    source_ip VARCHAR(15),
    destination_ip VARCHAR(15),
    port INT,
    protocol VARCHAR(10),
    action ENUM('ALLOW', 'DENY') DEFAULT 'DENY',
    user_id VARCHAR(50),
    department VARCHAR(50),
    resource_accessed VARCHAR(500),
    bytes_transferred INT DEFAULT 0,
    session_duration TIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance (and injection testing)
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_employees_email ON employees(email);
CREATE INDEX idx_customers_org ON customers(organization_name);
CREATE INDEX idx_products_category ON product_inventory(category);
CREATE INDEX idx_sales_customer ON sales_records(customer_organization);
CREATE INDEX idx_logs_user ON network_logs(user_id);
CREATE INDEX idx_logs_timestamp ON network_logs(timestamp);

-- =====================================================
-- DATA POPULATION
-- =====================================================

-- Insert Users (vulnerable login accounts)
INSERT INTO users (username, password, email, role, security_clearance, last_login) VALUES
('admin', 'admin123', 'admin@hftactical.com', 'admin', 'TS/SCI', '2024-07-26 09:15:00'),
('mthompson', 'Marcus2024!', 'm.thompson@hftactical.com', 'sales', 'Secret', '2024-07-26 08:45:00'),
('jrodriguez', 'Jessica@HF', 'j.rodriguez@hftactical.com', 'sales', 'Confidential', '2024-07-26 08:30:00'),
('schen', 'SecureIT99', 's.chen@hftactical.com', 'admin', 'Top Secret', '2024-07-26 09:00:00'),
('dwilson', 'Operations1', 'd.wilson@hftactical.com', 'operations', 'Secret', '2024-07-26 08:20:00'),
('guest', 'guest', 'guest@hftactical.com', 'viewer', 'None', '2024-07-25 16:30:00'),
('demo', 'demo123', 'demo@hftactical.com', 'viewer', 'None', '2024-07-25 14:15:00'),
('test', 'password', 'test@hftactical.com', 'viewer', 'None', '2024-07-24 10:00:00');

-- Insert Employees
INSERT INTO employees VALUES
('EMP001', 'Marcus', 'Thompson', 'm.thompson@hftactical.com', '555-0123', 'Sales', 'Senior Sales Director', '2018-03-15', 'Secret', 125000.00, 'CEO', 'Building A - Room 205', 'Sarah Thompson', '555-0124', '7834', 5),
('EMP002', 'Jessica', 'Rodriguez', 'j.rodriguez@hftactical.com', '555-0125', 'Sales', 'Sales Manager', '2019-07-22', 'Confidential', 95000.00, 'Marcus Thompson', 'Building A - Room 207', 'Carlos Rodriguez', '555-0126', '9156', 4),
('EMP003', 'Samuel', 'Chen', 's.chen@hftactical.com', '555-0127', 'IT', 'IT Security Manager', '2017-11-08', 'Top Secret', 110000.00, 'CTO', 'Building B - Room 301', 'Linda Chen', '555-0128', '4672', 6),
('EMP004', 'David', 'Wilson', 'd.wilson@hftactical.com', '555-0129', 'Operations', 'Operations Manager', '2020-01-12', 'Secret', 105000.00, 'COO', 'Building C - Room 150', 'Maria Wilson', '555-0130', '8293', 5),
('EMP005', 'Amanda', 'Foster', 'a.foster@hftactical.com', '555-0131', 'HR', 'HR Director', '2019-05-18', 'Confidential', 88000.00, 'CEO', 'Building A - Room 101', 'Robert Foster', '555-0132', '5417', 3);

-- Insert Customers
INSERT INTO customers VALUES
('CUST001', 'FBI Field Office', 'John Mitchell', 'j.mitchell@fbi.gov', '202-555-0101', '935 Pennsylvania Ave NW', 'Washington', 'DC', '20535', 'Federal Law Enforcement', 'Secret', 'Active', 500000.00, 156780.50, '2024-07-15', 'Marcus Thompson'),
('CUST002', 'LAPD SWAT', 'Sarah Rodriguez', 's.rodriguez@lapd.org', '213-555-0102', '100 W 1st St', 'Los Angeles', 'CA', '90012', 'Local Law Enforcement', 'Confidential', 'Active', 250000.00, 89450.75, '2024-07-16', 'Jessica Rodriguez'),
('CUST003', 'US Army Rangers', 'Michael Chen', 'm.chen@army.mil', '706-555-0103', 'Fort Benning', 'Columbus', 'GA', '31905', 'Military', 'Top Secret', 'Active', 1000000.00, 342150.00, '2024-07-17', 'Marcus Thompson'),
('CUST004', 'Blackwater Security', 'David Wilson', 'd.wilson@blackwater.com', '703-555-0104', '1750 K St NW', 'Washington', 'DC', '20006', 'Private Security', 'Secret', 'Active', 750000.00, 245680.25, '2024-07-18', 'David Wilson'),
('CUST005', 'DEA Task Force', 'Lisa Anderson', 'l.anderson@dea.gov', '202-555-0105', '8701 Morrissette Dr', 'Springfield', 'VA', '22152', 'Federal Law Enforcement', 'Secret', 'Active', 400000.00, 127890.00, '2024-07-19', 'Jessica Rodriguez');

-- Insert Products
INSERT INTO product_inventory VALUES
('WPN001', 'AR-15 Tactical Rifle', 'Weapons', 'Colt Defense', 'LE6920', 2850.00, 45, 10, 'SUP001', '2024-07-15', 'Secret', TRUE),
('WPN002', 'AK-47 Tactical Variant', 'Weapons', 'Arsenal Inc', 'SLR-107FR', 1950.00, 23, 5, 'SUP002', '2024-07-10', 'Secret', TRUE),
('WPN003', 'M4 Carbine', 'Weapons', 'FN Herstal', 'M4A1', 3200.00, 18, 8, 'SUP001', '2024-07-12', 'Top Secret', TRUE),
('DEF001', 'Level IIIA Ballistic Vest', 'Defense', 'Point Blank', 'Alpha Elite', 1250.00, 67, 25, 'SUP006', '2024-07-16', 'None', FALSE),
('EMP001', 'Portable EMP Generator', 'EMP', 'Raytheon', 'EMP-X1', 15000.00, 8, 2, 'SUP009', '2024-07-05', 'TS/SCI', TRUE),
('NLT001', 'TASER X26P', 'Non-Lethal', 'Axon', 'X26P', 1200.00, 56, 20, 'SUP011', '2024-07-19', 'None', FALSE);

-- Insert Sales Records
INSERT INTO sales_records VALUES
('ORD001', '2024-07-15', 'John Mitchell', 'FBI Field Office', 'Secret', 'Marcus Thompson', 'WPN001', 'AR-15 Tactical Rifle', 12, 2850.00, 34200.00, 'Government Purchase Order', '935 Pennsylvania Ave NW Washington DC', 'Delivered', '2024-07-22'),
('ORD002', '2024-07-16', 'Sarah Rodriguez', 'LAPD SWAT', 'Confidential', 'Jessica Rodriguez', 'DEF001', 'Level IIIA Ballistic Vest', 25, 1250.00, 31250.00, 'Credit Card', '100 W 1st St Los Angeles CA', 'Delivered', '2024-07-23'),
('ORD003', '2024-07-17', 'Michael Chen', 'US Army Rangers', 'Top Secret', 'Marcus Thompson', 'WPN003', 'M4 Carbine', 8, 3200.00, 25600.00, 'Military Contract', 'Fort Benning GA', 'Shipped', '2024-07-28'),
('ORD004', '2024-07-18', 'David Wilson', 'Blackwater Security', 'Secret', 'David Wilson', 'EMP001', 'Portable EMP Generator', 3, 15000.00, 45000.00, 'Corporate Check', '1750 K St NW Washington DC', 'Processing', '2024-07-30'),
('ORD005', '2024-07-19', 'Lisa Anderson', 'DEA Task Force', 'Secret', 'Jessica Rodriguez', 'NLT001', 'TASER X26P', 15, 1200.00, 18000.00, 'Government Purchase Order', '8701 Morrissette Dr Springfield VA', 'Delivered', '2024-07-26');

-- Insert Network Logs
INSERT INTO network_logs (timestamp, source_ip, destination_ip, port, protocol, action, user_id, department, resource_accessed, bytes_transferred, session_duration) VALUES
('2024-07-26 08:15:23', '192.168.1.45', '10.0.1.15', 443, 'HTTPS', 'ALLOW', 'mthompson', 'Sales', '/inventory/weapons', 2048, '00:15:32'),
('2024-07-26 08:16:45', '192.168.1.67', '10.0.1.15', 443, 'HTTPS', 'ALLOW', 'jrodriguez', 'Sales', '/customer/profiles', 1536, '00:08:45'),
('2024-07-26 08:18:12', '192.168.1.23', '10.0.1.15', 443, 'HTTPS', 'ALLOW', 'schen', 'IT', '/admin/users', 4096, '00:22:15'),
('2024-07-26 08:19:34', '192.168.1.89', '10.0.1.15', 443, 'HTTPS', 'ALLOW', 'dwilson', 'Operations', '/shipping/orders', 3072, '00:12:30'),
('2024-07-26 08:21:56', '203.45.67.89', '10.0.1.15', 80, 'HTTP', 'DENY', 'unknown', 'External', '/admin', 0, '00:00:00'),
('2024-07-26 08:23:18', '192.168.1.45', '10.0.1.15', 443, 'HTTPS', 'ALLOW', 'mthompson', 'Sales', '/reports/quarterly', 8192, '00:35:20'),
('2024-07-26 08:25:40', '192.168.1.67', '10.0.1.15', 443, 'HTTPS', 'ALLOW', 'jrodriguez', 'Sales', '/inventory/defense', 2560, '00:18:45'),
('2024-07-26 08:27:02', '192.168.1.23', '10.0.1.15', 22, 'SSH', 'ALLOW', 'schen', 'IT', '/var/log/system', 1024, '00:45:12'),
('2024-07-26 08:29:24', '192.168.1.89', '10.0.1.15', 443, 'HTTPS', 'ALLOW', 'dwilson', 'Operations', '/warehouse/stock', 4608, '00:28:33'),
('2024-07-26 08:31:46', '185.23.45.67', '10.0.1.15', 443, 'HTTPS', 'DENY', 'unknown', 'External', '/customer/data', 0, '00:00:00');

-- Create views for common queries (also vulnerable to injection)
CREATE VIEW high_value_customers AS
SELECT customer_id, organization_name, contact_person, total_purchases, security_clearance
FROM customers
WHERE total_purchases > 100000.00
ORDER BY total_purchases DESC;

CREATE VIEW classified_products AS
SELECT product_id, product_name, category, price, security_clearance_required
FROM product_inventory
WHERE security_clearance_required IN ('Secret', 'Top Secret', 'TS/SCI')
ORDER BY price DESC;

CREATE VIEW recent_sales AS
SELECT s.order_id, s.order_date, s.customer_organization, s.product_name, s.total_amount, s.sales_rep
FROM sales_records s
WHERE s.order_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
ORDER BY s.order_date DESC;
