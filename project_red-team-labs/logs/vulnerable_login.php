<?php
/*
H&F Tactical Solutions - Vulnerable Login System
FOR SQL INJECTION TESTING ONLY
*/

// Database connection
$host = 'localhost';
$dbname = 'hf_tactical';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

// Vulnerable login function (NO INPUT SANITIZATION)
function vulnerableLogin($user, $pass) {
    global $pdo;
    
    // VULNERABLE: Direct string concatenation - SQL injection possible
    $query = "SELECT * FROM users WHERE username = '$user' AND password = '$pass'";
    
    echo "<div style='background: #f0f0f0; padding: 10px; margin: 10px 0; border: 1px solid #ccc;'>";
    echo "<strong>Executed Query:</strong><br>";
    echo "<code style='color: red;'>$query</code>";
    echo "</div>";
    
    try {
        $stmt = $pdo->query($query);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($result) {
            return $result;
        } else {
            return false;
        }
    } catch(PDOException $e) {
        echo "<div style='color: red; background: #ffe6e6; padding: 10px; margin: 10px 0;'>";
        echo "<strong>SQL Error:</strong> " . $e->getMessage();
        echo "</div>";
        return false;
    }
}

// Vulnerable search function
function vulnerableSearch($searchTerm) {
    global $pdo;
    
    // VULNERABLE: Direct string concatenation
    $query = "SELECT * FROM customers WHERE organization_name LIKE '%$searchTerm%' OR contact_person LIKE '%$searchTerm%'";
    
    echo "<div style='background: #f0f0f0; padding: 10px; margin: 10px 0; border: 1px solid #ccc;'>";
    echo "<strong>Search Query:</strong><br>";
    echo "<code style='color: red;'>$query</code>";
    echo "</div>";
    
    try {
        $stmt = $pdo->query($query);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch(PDOException $e) {
        echo "<div style='color: red; background: #ffe6e6; padding: 10px; margin: 10px 0;'>";
        echo "<strong>SQL Error:</strong> " . $e->getMessage();
        echo "</div>";
        return [];
    }
}

// Handle login attempt
$loginResult = null;
$searchResults = [];

if ($_POST['action'] == 'login' && isset($_POST['username']) && isset($_POST['password'])) {
    $loginResult = vulnerableLogin($_POST['username'], $_POST['password']);
}

if ($_POST['action'] == 'search' && isset($_POST['search'])) {
    $searchResults = vulnerableSearch($_POST['search']);
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>H&F Tactical - Admin Portal</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #1a1a1a, #2a2a2a); color: white; padding: 20px; margin: -20px -20px 20px -20px; border-radius: 8px 8px 0 0; }
        .form-group { margin: 15px 0; }
        label { display: block; margin-bottom: 5px; font-weight: bold; }
        input[type="text"], input[type="password"] { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
        button { background: #ff6b35; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; margin: 5px; }
        button:hover { background: #ff8c42; }
        .success { background: #d4edda; color: #155724; padding: 10px; border: 1px solid #c3e6cb; border-radius: 4px; margin: 10px 0; }
        .error { background: #f8d7da; color: #721c24; padding: 10px; border: 1px solid #f5c6cb; border-radius: 4px; margin: 10px 0; }
        .results { background: #e7f3ff; padding: 15px; border: 1px solid #b3d9ff; border-radius: 4px; margin: 10px 0; }
        table { width: 100%; border-collapse: collapse; margin: 10px 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background: #f2f2f2; }
        .injection-examples { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; margin: 20px 0; border-radius: 4px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎯 H&F Tactical Solutions</h1>
            <p>Admin Portal - SQL Injection Testing Environment</p>
        </div>

        <!-- Login Form -->
        <h2>Login System</h2>
        <form method="POST">
            <input type="hidden" name="action" value="login">
            <div class="form-group">
                <label>Username:</label>
                <input type="text" name="username" value="<?php echo htmlspecialchars($_POST['username'] ?? ''); ?>">
            </div>
            <div class="form-group">
                <label>Password:</label>
                <input type="password" name="password">
            </div>
            <button type="submit">Login</button>
        </form>

        <?php if ($loginResult): ?>
            <div class="success">
                <h3>✅ Login Successful!</h3>
                <p><strong>Welcome:</strong> <?php echo htmlspecialchars($loginResult['username']); ?></p>
                <p><strong>Role:</strong> <?php echo htmlspecialchars($loginResult['role']); ?></p>
                <p><strong>Clearance:</strong> <?php echo htmlspecialchars($loginResult['security_clearance']); ?></p>
                <p><strong>Email:</strong> <?php echo htmlspecialchars($loginResult['email']); ?></p>
            </div>
        <?php elseif ($_POST['action'] == 'login'): ?>
            <div class="error">❌ Login failed! Invalid credentials.</div>
        <?php endif; ?>

        <!-- Search Form -->
        <h2>Customer Search</h2>
        <form method="POST">
            <input type="hidden" name="action" value="search">
            <div class="form-group">
                <label>Search Customers:</label>
                <input type="text" name="search" value="<?php echo htmlspecialchars($_POST['search'] ?? ''); ?>" placeholder="Enter organization name or contact person">
            </div>
            <button type="submit">Search</button>
        </form>

        <?php if (!empty($searchResults)): ?>
            <div class="results">
                <h3>Search Results:</h3>
                <table>
                    <tr>
                        <th>Customer ID</th>
                        <th>Organization</th>
                        <th>Contact Person</th>
                        <th>Email</th>
                        <th>Security Clearance</th>
                        <th>Total Purchases</th>
                    </tr>
                    <?php foreach ($searchResults as $customer): ?>
                    <tr>
                        <td><?php echo htmlspecialchars($customer['customer_id']); ?></td>
                        <td><?php echo htmlspecialchars($customer['organization_name']); ?></td>
                        <td><?php echo htmlspecialchars($customer['contact_person']); ?></td>
                        <td><?php echo htmlspecialchars($customer['email']); ?></td>
                        <td><?php echo htmlspecialchars($customer['security_clearance']); ?></td>
                        <td>$<?php echo number_format($customer['total_purchases'], 2); ?></td>
                    </tr>
                    <?php endforeach; ?>
                </table>
            </div>
        <?php elseif ($_POST['action'] == 'search'): ?>
            <div class="error">No results found.</div>
        <?php endif; ?>

        <!-- SQL Injection Examples -->
        <div class="injection-examples">
            <h3>🔓 SQL Injection Testing Examples</h3>
            <p><strong>Login Bypass Attempts:</strong></p>
            <ul>
                <li><code>admin' OR '1'='1</code> (username field)</li>
                <li><code>admin' OR '1'='1' --</code> (username field)</li>
                <li><code>admin' OR '1'='1' #</code> (username field)</li>
                <li><code>' OR 1=1 --</code> (username field)</li>
            </ul>
            
            <p><strong>Data Extraction Attempts:</strong></p>
            <ul>
                <li><code>admin' UNION SELECT username,password,email,role,security_clearance,null,null,null,null,null FROM users --</code></li>
                <li><code>' UNION SELECT customer_id,organization_name,contact_person,email,security_clearance,null,null,null,null,null FROM customers --</code></li>
            </ul>
            
            <p><strong>Search Injection Attempts:</strong></p>
            <ul>
                <li><code>FBI' UNION SELECT customer_id,organization_name,contact_person,email,security_clearance,total_purchases,null,null,null,null,null,null,null FROM customers --</code></li>
                <li><code>' OR 1=1 --</code> (search field)</li>
            </ul>
        </div>

        <div style="margin-top: 30px; padding: 15px; background: #f8f9fa; border-radius: 4px;">
            <h4>Valid Test Credentials:</h4>
            <p><strong>Admin:</strong> admin / admin123</p>
            <p><strong>Sales:</strong> mthompson / Marcus2024!</p>
            <p><strong>Guest:</strong> guest / guest</p>
        </div>
    </div>
</body>
</html>
