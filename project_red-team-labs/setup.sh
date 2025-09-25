#!/bin/bash

# BlackSentinel Setup Script
# Automated setup for the penetration testing framework

echo "🛡️  BlackSentinel Setup Script"
echo "================================"
echo ""

# Check if running as root for some operations
if [[ $EUID -eq 0 ]]; then
   echo "⚠️  Please run this script as a regular user (not root)"
   echo "   Some operations will prompt for sudo when needed"
   exit 1
fi

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to install packages
install_packages() {
    echo "📦 Installing required packages..."
    
    # Update package list
    sudo apt update
    
    # Install core packages
    sudo apt install -y python3 python3-pip mariadb-server apache2 php php-mysql nmap gobuster curl
    
    # Install Python packages
    pip3 install requests
    
    echo "✅ Packages installed successfully"
}

# Function to setup database
setup_database() {
    echo "🗄️  Setting up MySQL database..."
    
    # Start MySQL service
    sudo systemctl start mariadb
    sudo systemctl enable mariadb
    
    # Import database
    if [ -f "logs/hf_tactical_database.sql" ]; then
        echo "📊 Importing H&F Tactical database..."
        sudo mysql -u root < logs/hf_tactical_database.sql
        echo "✅ Database imported successfully"
    else
        echo "❌ Database file not found: logs/hf_tactical_database.sql"
    fi
    
    # Copy vulnerable PHP files
    if [ -f "logs/vulnerable_login.php" ]; then
        sudo cp logs/vulnerable_login.php /var/www/html/
        sudo chown www-data:www-data /var/www/html/vulnerable_login.php
        echo "✅ Vulnerable login page deployed"
    fi
    
    # Start Apache
    sudo systemctl start apache2
    sudo systemctl enable apache2
}

# Function to configure IP address
configure_ip() {
    echo "🌐 Configuring IP address..."
    
    # Get current IP address
    LOCAL_IP=$(hostname -I | awk '{print $1}')
    echo "   Detected IP address: $LOCAL_IP"
    
    # Update form-capture.js
    if [ -f "HF-Tactical-Social-Engineering-Demo/src/scripts/form-capture.js" ]; then
        sed -i "s/192\.168\.50\.102/$LOCAL_IP/g" HF-Tactical-Social-Engineering-Demo/src/scripts/form-capture.js
        echo "✅ Updated form-capture.js with IP: $LOCAL_IP"
    else
        echo "❌ form-capture.js not found"
    fi
    
    # Update SentinelScan.py
    if [ -f "ransomware/SentinelScan.py" ]; then
        sed -i "s/192\.168\.50\.102/$LOCAL_IP/g" ransomware/SentinelScan.py
        echo "✅ Updated SentinelScan.py with IP: $LOCAL_IP"
    fi
}

# Function to set permissions
set_permissions() {
    echo "🔐 Setting file permissions..."
    
    chmod +x ransomware/SentinelScan.py
    chmod +x capturedData/capture_data.py
    chmod +x HF-Tactical-Social-Engineering-Demo/send_phishing_email.py
    chmod +x HF-Tactical-Social-Engineering-Demo/test_connection.py
    
    echo "✅ Permissions set successfully"
}

# Function to test setup
test_setup() {
    echo "🧪 Testing setup..."
    
    # Test Python scripts
    echo "   Testing Python syntax..."
    python3 -m py_compile capturedData/capture_data.py
    python3 -m py_compile ransomware/SentinelScan.py
    
    # Test database connection
    echo "   Testing database connection..."
    if mysql -u root -e "USE hf_tactical; SHOW TABLES;" >/dev/null 2>&1; then
        echo "✅ Database connection successful"
    else
        echo "❌ Database connection failed"
    fi
    
    # Test web server
    echo "   Testing web server..."
    if curl -s http://localhost >/dev/null; then
        echo "✅ Apache web server is running"
    else
        echo "❌ Apache web server is not responding"
    fi
    
    echo "✅ Setup testing completed"
}

# Function to display usage instructions
show_usage() {
    echo ""
    echo "🚀 Setup Complete! Usage Instructions:"
    echo "======================================"
    echo ""
    echo "1. Start Social Engineering Demo:"
    echo "   Terminal 1: cd HF-Tactical-Social-Engineering-Demo && python3 -m http.server 8080"
    echo "   Terminal 2: cd capturedData && python3 capture_data.py"
    echo "   Browser: http://localhost:8080"
    echo ""
    echo "2. Test SQL Injection:"
    echo "   Browser: http://localhost/vulnerable_login.php"
    echo "   Try: admin' OR '1'='1' --"
    echo ""
    echo "3. Run Network Reconnaissance:"
    echo "   cd ransomware && python3 SentinelScan.py"
    echo ""
    echo "4. Test Data Capture:"
    echo "   cd HF-Tactical-Social-Engineering-Demo && python3 test_connection.py"
    echo ""
    echo "📚 For detailed documentation, see README.md"
    echo ""
}

# Main setup process
main() {
    echo "Starting BlackSentinel setup..."
    echo ""
    
    # Check if we're in the right directory
    if [ ! -f "README.md" ] || [ ! -d "HF-Tactical-Social-Engineering-Demo" ]; then
        echo "❌ Please run this script from the BlackSentinel root directory"
        exit 1
    fi
    
    # Install packages
    read -p "📦 Install required packages? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        install_packages
    fi
    
    # Setup database
    read -p "🗄️  Setup MySQL database? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        setup_database
    fi
    
    # Configure IP
    read -p "🌐 Configure IP address automatically? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        configure_ip
    fi
    
    # Set permissions
    set_permissions
    
    # Test setup
    read -p "🧪 Run setup tests? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        test_setup
    fi
    
    # Show usage
    show_usage
}

# Run main function
main "$@"
