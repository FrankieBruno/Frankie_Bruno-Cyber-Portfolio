# 🎯 H&F Tactical Social Engineering Demo - Developer Guide

## 📋 Project Overview

This is a sophisticated social engineering demonstration platform designed as a professional tactical equipment supplier website. The site captures user information through realistic quote request forms for security awareness training and authorized penetration testing.

## 🏗️ Project Structure

```
HF-Tactical-Social-Engineering-Demo/
├── index.html                    # Main website entry point
├── capture_data.py              # Backend data capture server
├── src/                         # Frontend source code
│   ├── scripts/                # JavaScript functionality
│   │   ├── components.js       # Website content and product data
│   │   ├── form-capture.js     # Form handling and data capture
│   │   ├── main.js            # Core website functionality
│   │   ├── navigation.js      # Navigation system
│   │   └── payload.js         # Payload delivery system
│   └── styles/                # CSS styling
│       ├── main.css           # Base website styling
│       ├── components.css     # Component-specific styles
│       ├── responsive.css     # Mobile responsiveness
│       ├── image-utilities.css # Image styling utilities
│       └── form-capture.css   # Quote form modal styles
└── images/                    # Tactical equipment images
    ├── weapons/              # Weapon category images
    ├── defense-gear/         # Defense equipment images
    ├── emps/                # EMP device images
    └── non-lethals/         # Non-lethal equipment images
```

## 🚀 Quick Start

### Prerequisites
- Python 3.7 or higher
- Modern web browser
- Network access for target users

### Launch the Demo

**Step 1: Start the Website Server**
```bash
cd HF-Tactical-Social-Engineering-Demo
python3 -m http.server 8080
```

**Step 2: Start the Data Capture Server (New Terminal)**
```bash
cd HF-Tactical-Social-Engineering-Demo
python3 capture_data.py
```

**Step 3: Access the Demo**
- **Website**: http://localhost:8080
- **Data Capture**: http://localhost:8081 (backend only)

## 🔧 Core Components Explained

### 1. `index.html` - Main Website
**Purpose**: The primary entry point for the social engineering demo
**Key Features**:
- Professional tactical equipment supplier layout
- Responsive design for all devices
- Integrated quote request forms
- Professional branding and imagery

**Dependencies**:
- All CSS files in `src/styles/`
- All JavaScript files in `src/scripts/`
- Tactical equipment images in `images/`

### 2. `capture_data.py` - Data Capture Backend
**Purpose**: HTTP server that captures and stores form submissions
**Key Features**:
- Receives POST requests from quote forms
- Saves data to JSON and CSV formats
- Real-time console logging of captures
- CORS support for cross-origin requests

**How it works**:
1. Listens on port 8081 for form submissions
2. Parses form data and extracts user information
3. Saves to `captured_data.json` (detailed) and `captured_data.csv` (spreadsheet)
4. Returns success response to website

**Data Captured**:
- Personal: Name, email, phone, company, position
- Professional: Department, security clearance, budget
- Technical: IP address, browser info, timestamps
- Behavioral: Time on site, interactions, form completion

**Output Files**:
- `captured_data.json` - Detailed JSON format with metadata
- `captured_data.csv` - Spreadsheet format for easy analysis

### 3. Frontend JavaScript Files

#### `src/scripts/components.js`
**Purpose**: Contains all website content and product data
**Key Features**:
- Product catalog with tactical equipment
- Category organization (weapons, defense, EMPs, non-lethals)
- Professional product descriptions and specifications
- Image paths and product details

#### `src/scripts/form-capture.js`
**Purpose**: Handles quote form creation and data submission
**Key Features**:
- Creates comprehensive quote request modal
- Captures extensive user information
- Sends data to capture_data.py backend
- Tracks user behavior and interactions

#### `src/scripts/main.js`
**Purpose**: Core website functionality and initialization
**Key Features**:
- Website initialization and setup
- Event handling and user interactions
- Security features (dev tools detection)
- Analytics and behavior tracking

#### `src/scripts/navigation.js`
**Purpose**: Navigation system and page routing
**Key Features**:
- Smooth scrolling navigation
- Section highlighting
- Mobile menu functionality
- Page state management

#### `src/scripts/payload.js`
**Purpose**: Payload delivery system for advanced testing
**Key Features**:
- Configurable payload triggers
- File delivery capabilities
- Redirect functionality
- Stealth operation modes

### 4. CSS Styling System

#### `src/styles/main.css`
**Purpose**: Base website styling and layout
**Features**: Typography, colors, layout grid, animations

#### `src/styles/components.css`
**Purpose**: Component-specific styling
**Features**: Product cards, buttons, navigation, interactive elements

#### `src/styles/responsive.css`
**Purpose**: Mobile and tablet responsiveness
**Features**: Breakpoints, mobile navigation, touch-friendly design

#### `src/styles/form-capture.css`
**Purpose**: Quote form modal styling
**Features**: Professional form design, validation states, animations

#### `src/styles/image-utilities.css`
**Purpose**: Image sizing and display utilities
**Features**: Responsive images, aspect ratios, loading states

## 📊 Data Collection Process

### Form Submission Flow:
1. **User visits website** → Sees professional tactical equipment site
2. **User clicks "Request Quote"** → Modal form opens
3. **User fills form** → Comprehensive information collected
4. **Form submitted** → Data sent to capture_data.py
5. **Data saved** → JSON and CSV files updated
6. **Success message** → User sees confirmation

### Information Collected:
- **Contact Details**: Name, email, phone, company
- **Professional Info**: Position, department, security clearance
- **Requirements**: Product type, quantity, budget, timeline
- **Technical Data**: IP address, browser, screen resolution
- **Behavioral Data**: Time on site, interactions, form completion time

## 🎯 Usage Scenarios

### 1. Security Awareness Training
- Deploy internally to test employee susceptibility
- Demonstrate social engineering techniques
- Train staff to recognize suspicious requests

### 2. Penetration Testing
- Use in authorized red team exercises
- Test organizational security awareness
- Gather intelligence for further testing phases

### 3. Phishing Simulation
- Capture credentials for security assessment
- Test email security and user training
- Measure organizational vulnerability

## 🔧 Customization Options

### Modify Company Profile
Edit `src/scripts/components.js` to change:
- Company name and branding
- Product categories and descriptions
- Contact information and locations

### Adjust Form Fields
Edit `src/scripts/form-capture.js` to:
- Add/remove form fields
- Change validation requirements
- Modify data capture endpoints

### Update Visual Design
Edit CSS files to change:
- Color schemes and branding
- Layout and typography
- Images and graphics

### Configure Payload Delivery
Edit `src/scripts/payload.js` to:
- Set payload triggers
- Configure delivery methods
- Customize stealth features

## 🛡️ Security Considerations

### Ethical Usage
- ✅ Only use with written authorization
- ✅ Follow responsible disclosure practices
- ✅ Protect captured data appropriately
- ❌ Never use for unauthorized data collection

### Data Protection
- Captured data contains sensitive information
- Store files securely with appropriate permissions
- Delete data after testing completion
- Follow applicable privacy regulations

## 🐛 Troubleshooting

### Common Issues:

**Website not loading:**
- Check if port 8080 is available
- Ensure you're in the correct directory
- Verify all files are present

**Forms not submitting:**
- Check if capture_data.py is running on port 8081
- Verify network connectivity
- Check browser console for errors

**Images not displaying:**
- Verify image files exist in images/ directory
- Check file paths in components.js
- Ensure proper file permissions

**Data not being captured:**
- Check capture_data.py console for errors
- Verify write permissions in project directory
- Check if JSON/CSV files are being created

## 📞 Support

For technical issues or questions about this social engineering demonstration platform, refer to this guide or check the console output for debugging information.

---
**⚠️ Remember: This tool is for authorized security testing and awareness training only. Use responsibly and ethically.**
