# 🎥 Black Sentinel Video Walkthroughs

This folder contains video demonstrations and walkthroughs of the Black Sentinel red team tools and techniques.

## 📹 Available Videos

### 🔍 Black Sentinel Demo Video
**File:** `Black Sentinel Demo Video [Hunter M. & Frankie B.].mp4`
**Authors:** Hunter McShan & Frankie Bruno
**Duration:** ~5:30 minutes
**Description:** Complete demonstration of the Black Sentinel framework showcasing a full attack chain from reconnaissance to data exfiltration and SIEM analysis

**What's Covered:**
- **Network Discovery:** SentinelScan.py automated scanning with Nmap integration
- **Target Identification:** Windows machine with Apache web server detection
- **Web Enumeration:** HNF Tactical website exploration and GoBuster directory discovery
- **Vulnerability Exploitation:** Command injection via diagnostics.php page
- **Payload Delivery:** Reverse TCP shell generation and deployment
- **Data Exfiltration:** CSV file extraction from victim machine
- **SIEM Analysis:** Splunk data visualization and threat intelligence

**Attack Chain Timeline:**
- **[0:00-0:30]** Hunter introduces SentinelScan.py and demonstrates network scanning
- **[0:30-1:03]** Target identification and HNF Tactical website exploration
- **[1:03-1:29]** GoBuster directory enumeration and diagnostics.php discovery
- **[1:29-2:19]** Command injection setup and reverse shell payload generation
- **[2:19-2:44]** Payload delivery and execution via Python server and Netcat
- **[2:44-3:46]** Frankie takes over, demonstrates reverse shell access and data discovery
- **[3:46-5:23]** Data exfiltration to Kali Linux and Splunk SIEM analysis with visualizations

**Prerequisites:**
- Basic understanding of network scanning and penetration testing
- Familiarity with Python scripting and command injection
- Knowledge of reverse shells and data exfiltration techniques
- Understanding of SIEM tools and log analysis

**Related Files:**
- [`../ransomware/SentinelScan.py`](../ransomware/SentinelScan.py) - Main script demonstrated
- [`../HF-Tactical-Social-Engineering-Demo/diagnostics.php`](../HF-Tactical-Social-Engineering-Demo/diagnostics.php) - Vulnerable page exploited
- [`../logs/product_inventory.csv`](../logs/product_inventory.csv) - Data exfiltrated and analyzed
- [`../setup.sh`](../setup.sh) - Environment setup script
- [`transcripts/Black_Sentinel_Demo_Transcript.txt`](transcripts/Black_Sentinel_Demo_Transcript.txt) - Full video transcript

---

## 🎯 Video Guidelines

### **For Viewers:**
- Ensure you have proper authorization before attempting any techniques shown
- Use only in controlled lab environments or authorized penetration tests
- Follow responsible disclosure practices for any vulnerabilities discovered

### **Technical Requirements:**
- **Resolution:** 1080p recommended for code visibility
- **Audio:** Clear narration explaining each step
- **Captions:** Available for accessibility

---

## 📂 Video Organization

```
videos/
├── README.md                                           # This file
├── Black Sentinel Demo Video [Hunter M. & Frankie B.].mp4  # Main Black Sentinel demonstration
└── transcripts/                                        # Video transcripts
    └── Black_Sentinel_Demo_Transcript.txt             # Full transcript
```

---

## 🔗 Related Documentation

- [Black Sentinel Main README](../README.md)
- [SentinelScan Source Code](../ransomware/SentinelScan.py)
- [Setup Instructions](../setup.sh)
- [SQL Injection Testing](../logs/SQL_INJECTION_SETUP.md)
- [Splunk SIEM Setup](../logs/SPLUNK_GEO_SETUP.md)

---

**⚠️ Ethical Use Only:** These videos are for educational and authorized security testing purposes only. Always ensure you have proper permission before testing any security tools or techniques.
