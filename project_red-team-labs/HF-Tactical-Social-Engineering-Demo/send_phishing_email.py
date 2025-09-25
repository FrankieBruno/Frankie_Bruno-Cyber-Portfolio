#!/usr/bin/env python3
"""
Professional phishing email sender for H&F Tactical Red Team simulation
For authorized security testing only
"""

import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
import os

class TacticalPhishingEmail:
    def __init__(self, smtp_server, smtp_port, sender_email, sender_password):
        self.smtp_server = smtp_server
        self.smtp_port = smtp_port
        self.sender_email = sender_email
        self.sender_password = sender_password
        self.kali_ip = "192.168.50.102"
        
    def create_email_content(self, target_name="Security Professional"):
        """Create professional phishing email content"""
        
        subject = "🎯 URGENT: Exclusive Tactical Equipment Discount - 70% OFF (24hrs Only)"
        
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .header {{ background: linear-gradient(135deg, #1a1a1a, #2a2a2a); color: white; padding: 20px; text-align: center; }}
                .content {{ padding: 30px; background: #f9f9f9; }}
                .cta-button {{ 
                    display: inline-block; 
                    background: linear-gradient(135deg, #ff6b35, #ff8c42);
                    color: white; 
                    padding: 15px 30px; 
                    text-decoration: none; 
                    border-radius: 8px; 
                    font-weight: bold;
                    margin: 20px 0;
                }}
                .urgent {{ color: #ff6b35; font-weight: bold; }}
                .footer {{ background: #333; color: white; padding: 15px; font-size: 12px; }}
            </style>
        </head>
        <body>
            <div class="header">
                <h1>🎯 H&F TACTICAL SOLUTIONS</h1>
                <p>Professional Defense Equipment Specialists</p>
            </div>
            
            <div class="content">
                <h2>Dear {target_name},</h2>
                
                <p><span class="urgent">URGENT NOTICE:</span> You have been pre-qualified for our exclusive 
                <strong>70% discount</strong> on all tactical equipment.</p>
                
                <p>As a verified security professional, you have <strong>24 hours</strong> to access this 
                limited-time offer on:</p>
                
                <ul>
                    <li>🔫 Tactical Weapons & Accessories</li>
                    <li>🛡️ Body Armor & Protective Gear</li>
                    <li>⚡ EMP Devices & Electronic Warfare</li>
                    <li>🎯 Non-Lethal Tactical Systems</li>
                </ul>
                
                <p><strong>This offer is exclusively for law enforcement, military, and security professionals.</strong></p>
                
                <center>
                    <a href="http://{self.kali_ip}:8080" class="cta-button">
                        🎯 ACCESS EXCLUSIVE CATALOG NOW
                    </a>
                </center>
                
                <p><span class="urgent">⏰ EXPIRES IN 24 HOURS</span></p>
                
                <p>Once you access our catalog, download your verification coupon to complete 
                your qualification process.</p>
                
                <p>Best regards,<br>
                <strong>Marcus Thompson</strong><br>
                Senior Sales Director<br>
                H&F Tactical Solutions<br>
                📞 (555) 123-4567<br>
                📧 m.thompson@hftactical.com</p>
                
                <p><small><em>This offer is valid for qualified personnel only. Verification required.</em></small></p>
            </div>
            
            <div class="footer">
                <p>H&F Tactical Solutions | Professional Defense Equipment | Est. 2015</p>
                <p>This email was sent to qualified security professionals. If you received this in error, please disregard.</p>
            </div>
        </body>
        </html>
        """
        
        return subject, html_content
    
    def send_phishing_email(self, target_email, target_name="Security Professional"):
        """Send the phishing email to target"""
        
        try:
            # Create message
            message = MIMEMultipart("alternative")
            subject, html_content = self.create_email_content(target_name)
            
            message["Subject"] = subject
            message["From"] = f"Marcus Thompson <{self.sender_email}>"
            message["To"] = target_email
            
            # Add HTML content
            html_part = MIMEText(html_content, "html")
            message.attach(html_part)
            


            # Create secure connection and send email
            context = ssl.create_default_context()
            
            print(f"🎯 Sending phishing email to {target_email}...")
            print(f"📧 Subject: {subject}")
            print(f"🌐 Target site: http://{self.kali_ip}:8080")
            
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls(context=context)
                server.login(self.sender_email, self.sender_password)
                server.sendmail(self.sender_email, target_email, message.as_string())
            
            print("✅ Phishing email sent successfully!")
            print(f"🎯 Target should click link to access: http://{self.kali_ip}:8080")
            
        except Exception as e:
            print(f"❌ Error sending email: {e}")

def main():
    """Main function to send phishing email"""
    
    print("🎯 H&F TACTICAL PHISHING EMAIL SENDER")
    print("=" * 50)
    print("⚠️  FOR AUTHORIZED RED TEAM TESTING ONLY")
    print("=" * 50)
    
    # Email configuration
    SMTP_SERVER = "smtp.gmail.com"
    SMTP_PORT = 587
    SENDER_EMAIL = "frankiecyber@gmail.com"
    SENDER_PASSWORD = "Archvile@1991"  # ⚠️ WARNING: Use Gmail App Password instead!

    # Target configuration
    TARGET_EMAIL = "pelicanappsolutions@gmail.com"
    TARGET_NAME = "Security Professional"
    
    # Create and send phishing email
    phisher = TacticalPhishingEmail(SMTP_SERVER, SMTP_PORT, SENDER_EMAIL, SENDER_PASSWORD)
    phisher.send_phishing_email(TARGET_EMAIL, TARGET_NAME)

if __name__ == "__main__":
    main()
