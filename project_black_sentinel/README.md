# 🛡️ Black Sentinel: Red Team Adversary Emulation & Threat Detection Framework
*By H & F Defense Corp*

**Project Type:** Purple Team & Scripting — Simulated Attack and Recovery  

---

## 🔎 Summary
Black Sentinel is a full-spectrum, purple team cybersecurity simulation designed to emulate and detect modern malware behavior in a segmented, isolated virtual environment.  
Built by **H & F Defense Corp**, this project simulates a **Python-based ransomware attack** from delivery to detection, containment, and recovery.  

The simulation integrates both offensive and defensive tools, combining **red team attack execution** with **blue team monitoring, detection, and response**.  

---

## ⚔️ Offensive Workflow
- Developed **custom Python malware** and simulated delivery to a Windows 10 VM.  
- Used **Metasploit (msfvenom)** to generate payloads and gain reverse shell access.  
- Launched a web server with Flask to host a **fake vulnerable website**, exploited via a backdoor access point.  
- Conducted reconnaissance with **Gobuster** for directory enumeration.  
- Extracted sensitive `.csv` files from the compromised endpoint and exfiltrated data to Kali Linux.  

**Skills Shown:**  
- Python scripting (malware emulation)  
- Web development & exploitation  
- Reverse shell access & payload generation  
- Adversary emulation (Red Team operations)  

---

## 🛡️ Defensive Workflow
- Configured **Sysmon** on Windows 10 to generate detailed logs.  
- Used **Winlogbeat** to forward event logs to **Splunk Enterprise** for SIEM analysis.  
- Detected anomalies and exfiltration activity in Splunk, built custom dashboards, and correlated alerts.  
- Monitored network traffic with **Suricata IDS/IPS** inside **OPNsense firewall**, blocking C2 connections during containment.  
- Applied **policy adjustments** to strengthen Windows endpoint defenses.  

**Skills Shown:**  
- SIEM log ingestion & correlation (Splunk)  
- Threat hunting & anomaly detection  
- IDS/IPS rule tuning (Suricata in OPNsense)  
- Incident containment & policy enforcement (Blue Team operations)  

---

## 🧪 Lab Infrastructure
- **Kali Linux:** Attacker VM hosting C2 server, malware scripts, and Splunk SIEM.  
- **Windows 10:** Victim endpoint where ransomware executed.  
- **OPNsense Firewall:** Segmented network, IDS/IPS logging, containment controls.  
- **VirtualBox:** Hosted and isolated all VMs to safely simulate attacks.  

---

## 🛠️ Tool Stack

| Tool            | Function |
|-----------------|----------|
| **Python 3**    | Custom malware scripting |
| **Flask**       | C2 server web framework |
| **Sysmon**      | Event tracing & monitoring on Windows |
| **Winlogbeat**  | Forwards logs to Splunk |
| **Splunk**      | SIEM log analysis & custom alerts |
| **Suricata**    | IDS/IPS detection & response |
| **OPNsense**    | Firewall & segmentation |
| **Metasploit**  | Payload generation (msfvenom), reverse shells |
| **Gobuster**    | Directory enumeration |

---

## 🚀 Results
- Successfully emulated a **full ransomware attack chain** from exploitation to exfiltration.  
- Demonstrated **cross-functional Purple Team skills**: Red Team (attack simulation) + Blue Team (detection, response, policy hardening).  
- Showcased **web development + Python scripting + SIEM analysis** in a single project.  
- Produced real-world **incident detection dashboards** in Splunk.  

---

📌 *This project demonstrates advanced capabilities across both offensive and defensive cybersecurity, with real-world SOC workflows applied in a safe, virtualized environment.*
