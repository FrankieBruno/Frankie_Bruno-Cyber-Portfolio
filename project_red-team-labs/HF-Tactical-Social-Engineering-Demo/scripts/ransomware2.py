#!/usr/bin/python

import subprocess
import re

#ip of this kali machine
my_ip = "192.168.50.102"

#ip ignore list
ignore_list = ['192.168.50.1', '192.168.50.6', '192.168.50.37', '192.168.50.58', '192.168.50.70', '192.168.50.78', '192.168.50.100', '192.168.50.109', '192.168.50.164', '192.168.50.181', '192.168.50.184', '192.168.50.240', '192.168.50.241', '192.168.50.9', '192.168.50.144', '192.168.50.102', '192.168.50.155','192.168.50.149', '192.168.50.234']

#ask user for subnet range
subnet_range = "/24"

#nmap scan of local network
print("\nScanning local network...")
scan_result = subprocess.run(["sudo", "nmap", "-sn", "192.168.50.0" + subnet_range], 
capture_output=True, text=True)

#make list of ip addresses and hostnames from scan result
host_info = []
for line in scan_result.stdout.splitlines():
    if "Nmap scan report for" in line:
        if '(' in line and ')' in line:
            hostname = line.split("for ")[1].split(" (")[0]
            ip = line.split('(')[1].split(')')[0]
        else:
            hostname = "Unknown"
            ip = line.split()[-1].strip("()")
        host_info.append({"ip": ip, "hostname": hostname})

print("Hosts found on network:")
for host in host_info:
    print(f"IP: {host['ip']}, Hostname: {host['hostname']}")

#remove ignored IPs
cleaned_hosts = [host for host in host_info if host['ip'].count('.') == 3
                 and host['ip'] not in ignore_list]

#detailed scan for each host
detailed_results = []
for host in cleaned_hosts:
    print(f"\nRunning detailed scan for: {host['ip']} ({host['hostname']})")
    sv_scan = subprocess.run(["sudo", "nmap", "-sV", "-O", host['ip']],
                              capture_output=True, text=True)
    
    # Extract OS information
    os_info = "Unknown"
    for line in sv_scan.stdout.splitlines():
        if "Running:" in line:
            os_info = line.split("Running: ")[1]
            break
        elif "OS details:" in line:
            os_info = line.split("OS details: ")[1]
            break

    # Extract open ports and services with detailed analysis
    ports_services = []
    vulnerabilities = []
    for line in sv_scan.stdout.splitlines():
        if "/tcp" in line and "open" in line:
            parts = line.split()
            port = parts[0]
            service = parts[2] if len(parts) > 2 else "unknown"
            version = " ".join(parts[3:]) if len(parts) > 3 else ""
            
            # Check for potentially vulnerable services
            vuln_indicators = []
            
            # Common vulnerable services and versions
            if "ssh" in service.lower():
                if any(old_ver in version.lower() for old_ver in ["openssh_7.", "openssh_6.", "openssh_5."]):
                    vuln_indicators.append("Outdated SSH version")
            
            if "ftp" in service.lower():
                if "vsftpd" in version.lower():
                    vuln_indicators.append("FTP service (potential anonymous access)")
            
            if "telnet" in service.lower():
                vuln_indicators.append("Unencrypted Telnet service")
            
            if "http" in service.lower() and "443" not in port:
                vuln_indicators.append("Unencrypted HTTP service")
            
            if "smb" in service.lower() or "microsoft-ds" in service.lower():
                vuln_indicators.append("SMB service (check for SMBv1)")
            
            if "rdp" in service.lower() or "3389" in port:
                vuln_indicators.append("RDP service exposed")
            
            if "mysql" in service.lower() or "3306" in port:
                vuln_indicators.append("Database service exposed")
            
            if "vnc" in service.lower():
                vuln_indicators.append("VNC service (often weak auth)")
            
            port_info = f"{port} ({service} {version})".strip()
            ports_services.append(port_info)
            
            if vuln_indicators:
                vulnerabilities.extend([f"{port}: {vuln}" for vuln in vuln_indicators])

    detailed_results.append({
        "ip": host['ip'],
        "hostname": host['hostname'],
        "os": os_info,
        "ports_services": ports_services,
        "vulnerabilities": vulnerabilities
    })

# Display results with vulnerability analysis
print("\n" + "="*60)
print("DETAILED SCAN RESULTS WITH VULNERABILITY ANALYSIS")
print("="*60)
for result in detailed_results:
    print(f"\nIP Address: {result['ip']}")
    print(f"Hostname: {result['hostname']}")
    print(f"OS: {result['os']}")
    print(f"Open Ports/Services:")
    if result['ports_services']:
        for port_service in result['ports_services']:
            print(f"  - {port_service}")
    else:
        print("  - No open ports detected")
    
    # Display potential vulnerabilities
    if result['vulnerabilities']:
        print(f"⚠️  POTENTIAL SECURITY ISSUES:")
        for vuln in result['vulnerabilities']:
            print(f"  🔴 {vuln}")
    else:
        print("✅ No obvious vulnerabilities detected")
    
    print("-" * 40)
