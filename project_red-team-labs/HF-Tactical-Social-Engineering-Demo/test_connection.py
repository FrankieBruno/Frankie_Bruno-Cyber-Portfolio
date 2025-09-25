#!/usr/bin/env python3
"""
Test script to verify the data capture server is working
"""

import requests
import json

def test_capture_server():
    print("🧪 Testing H&F Tactical Data Capture Server")
    print("=" * 50)
    
    # Test data
    test_data = {
        'name': 'Test User',
        'email': 'test@example.com',
        'phone': '555-1234',
        'company': 'Test Company',
        'product_type': 'weapons'
    }
    
    try:
        print("📡 Sending test data to http://localhost:8081...")
        
        response = requests.post(
            'http://localhost:8081',
            data=test_data,
            headers={'Content-Type': 'application/x-www-form-urlencoded'},
            timeout=5
        )
        
        print(f"📊 Response Status: {response.status_code}")
        print(f"📋 Response Headers: {dict(response.headers)}")
        print(f"📄 Response Body: {response.text}")
        
        if response.status_code == 200:
            print("✅ SUCCESS: Data capture server is working!")
            
            # Check if files were created
            import os
            if os.path.exists('captured_data.json'):
                print("✅ captured_data.json file created")
                with open('captured_data.json', 'r') as f:
                    data = json.load(f)
                    print(f"📊 Captured {len(data)} records")
            else:
                print("❌ captured_data.json file NOT created")
                
        else:
            print(f"❌ FAILED: Server returned status {response.status_code}")
            
    except requests.exceptions.ConnectionError:
        print("❌ CONNECTION ERROR: Cannot connect to http://localhost:8081")
        print("   Make sure capture_data.py is running!")
        
    except requests.exceptions.Timeout:
        print("❌ TIMEOUT ERROR: Server took too long to respond")
        
    except Exception as e:
        print(f"❌ UNEXPECTED ERROR: {e}")

if __name__ == "__main__":
    test_capture_server()
