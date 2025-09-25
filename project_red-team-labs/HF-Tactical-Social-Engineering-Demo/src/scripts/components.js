// Component Templates
const Components = {
    // Navigation Component
    navbar: `
        <div class="nav-container">
            <div class="nav-logo" onclick="showSection('home')">
                <h2>H&F TACTICAL</h2>
                <span class="tagline">Professional Defense Solutions</span>
            </div>
            <ul class="nav-menu">
                <li><a class="nav-link active" onclick="showSection('home')">Home</a></li>
                <li><a class="nav-link" onclick="showSection('weapons')">Weapons</a></li>
                <li><a class="nav-link" onclick="showSection('defense')">Defense Gear</a></li>
                <li><a class="nav-link" onclick="showSection('emps')">EMP Systems</a></li>
                <li><a class="nav-link" onclick="showSection('nonlethals')">Non-Lethals</a></li>
                <li><a class="nav-link" onclick="showSection('contact')">Contact</a></li>
            </ul>
            <div class="hamburger">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
        </div>
    `,

    // Home Section Component
    home: `
        <div class="hero">
            <div class="hero-content">
                <h1 class="hero-title">Elite Tactical Equipment</h1>
                <p class="hero-subtitle">Professional-grade defense solutions for law enforcement, security professionals, and authorized personnel</p>
                <div class="hero-buttons">
                    <button class="btn btn-primary" onclick="showSection('weapons')">Explore Products</button>
                    <button class="btn btn-secondary" onclick="showSection('contact')">Get Quote</button>
                </div>
            </div>
        </div>

        <div class="products-section">
            <div class="container">
                <div class="section-header">
                    <h2>Product Categories</h2>
                    <p>Comprehensive tactical solutions for professional applications</p>
                </div>
                
                <div class="product-grid">
                    <div class="product-card weapons-card" onclick="triggerPayload('weapons')">
                        <div class="card-icon">
                            <img src="images/weapons/assault-rifles/Ak-47-Variant.jpg" alt="Tactical Weapons" class="card-img">
                        </div>
                        <h3>Tactical Weapons</h3>
                        <p>Professional-grade firearms and tactical weapons systems for authorized personnel</p>
                        <ul class="feature-list">
                            <li>Assault Rifles</li>
                            <li>Tactical Shotguns</li>
                            <li>Precision Rifles</li>
                            <li>Sidearms & Pistols</li>
                        </ul>
                        <button class="card-btn">View Weapons</button>
                    </div>

                    <div class="product-card defense-card" onclick="triggerPayload('defense')">
                        <div class="card-icon">
                            <img src="images/defense-gear/body-armor/Level3A-Armor-Vest.jpg" alt="Defense Gear" class="card-img">
                        </div>
                        <h3>Defense Gear</h3>
                        <p>Advanced protective equipment and defensive systems for maximum security</p>
                        <ul class="feature-list">
                            <li>Body Armor</li>
                            <li>Tactical Helmets</li>
                            <li>Riot Shields</li>
                            <li>Protective Suits</li>
                        </ul>
                        <button class="card-btn">View Defense Gear</button>
                    </div>

                    <div class="product-card emp-card" onclick="triggerPayload('emps')">
                        <div class="card-icon">
                            <img src="images/emps/portable/Portable-EMP.jpg" alt="EMP Devices" class="card-img">
                        </div>
                        <h3>EMP Devices</h3>
                        <p>Electromagnetic pulse systems for electronic warfare and tactical operations</p>
                        <ul class="feature-list">
                            <li>Portable EMP Units</li>
                            <li>Vehicle Disruptors</li>
                            <li>Communication Jammers</li>
                            <li>Electronic Countermeasures</li>
                        </ul>
                        <button class="card-btn">View EMP Systems</button>
                    </div>

                    <div class="product-card nonlethal-card" onclick="triggerPayload('nonlethals')">
                        <div class="card-icon">
                            <img src="images/non-lethals/tasers/Stun-gun.jpg" alt="Non-Lethal Systems" class="card-img">
                        </div>
                        <h3>Non-Lethal Systems</h3>
                        <p>Advanced non-lethal weapons for crowd control and subduing targets</p>
                        <ul class="feature-list">
                            <li>Tasers & Stun Guns</li>
                            <li>Pepper Spray Systems</li>
                            <li>Rubber Bullet Launchers</li>
                            <li>Sonic Weapons</li>
                        </ul>
                        <button class="card-btn">View Non-Lethals</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="features-section">
            <div class="container">
                <div class="features-grid">
                    <div class="feature-item">
                        <i class="fas fa-certificate"></i>
                        <h4>Certified Quality</h4>
                        <p>All equipment meets military and law enforcement standards</p>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-shipping-fast"></i>
                        <h4>Secure Delivery</h4>
                        <p>Discreet and secure shipping to authorized locations</p>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-headset"></i>
                        <h4>Expert Support</h4>
                        <p>24/7 technical support from tactical specialists</p>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-user-shield"></i>
                        <h4>Authorized Only</h4>
                        <p>Strict verification process for qualified personnel</p>
                    </div>
                </div>
            </div>
        </div>
    `,

    // Weapons Section Component
    weapons: `
        <div class="page-header">
            <div class="container">
                <h1><i class="fas fa-crosshairs"></i> Tactical Weapons</h1>
                <p>Professional-grade firearms and tactical weapons systems for authorized personnel</p>
                <div class="breadcrumb">
                    <a onclick="showSection('home')">Home</a> > <span>Weapons</span>
                </div>
            </div>
        </div>

        <div class="products-section">
            <div class="container">
                <div class="category-section">
                    <h2 class="category-title">Assault Rifles</h2>
                    <div class="product-grid">
                        <div class="weapon-card ar-15" onclick="triggerPayload('ar15')">
                            <div class="weapon-image">
                                <img src="images/weapons/precision-rifles/Ar-15-Tactical.jpg" alt="AR-15 Tactical Rifle" class="weapon-img">
                                <span class="image-placeholder">AR-15 Platform</span>
                            </div>
                            <div class="weapon-info">
                                <h3>AR-15 Tactical Rifle</h3>
                                <div class="weapon-specs">
                                    <span class="spec"><i class="fas fa-ruler"></i> 5.56x45mm NATO</span>
                                    <span class="spec"><i class="fas fa-weight"></i> 6.5 lbs</span>
                                    <span class="spec"><i class="fas fa-crosshairs"></i> 400m range</span>
                                </div>
                                <p>Modular tactical rifle platform with customizable accessories and proven reliability.</p>
                                <div class="weapon-features">
                                    <span class="feature">Picatinny Rails</span>
                                    <span class="feature">Adjustable Stock</span>
                                    <span class="feature">30-Round Mag</span>
                                </div>
                                <button class="weapon-btn">Request Quote</button>
                            </div>
                        </div>

                        <div class="weapon-card ak-47" onclick="triggerPayload('ak47')">
                            <div class="weapon-image">
                                <img src="images/weapons/assault-rifles/Ak-47-Variant.jpg" alt="AK-47 Tactical Variant" class="weapon-img">
                                <span class="image-placeholder">AK-47 Platform</span>
                            </div>
                            <div class="weapon-info">
                                <h3>AK-47 Tactical Variant</h3>
                                <div class="weapon-specs">
                                    <span class="spec"><i class="fas fa-ruler"></i> 7.62x39mm</span>
                                    <span class="spec"><i class="fas fa-weight"></i> 7.7 lbs</span>
                                    <span class="spec"><i class="fas fa-crosshairs"></i> 350m range</span>
                                </div>
                                <p>Rugged and reliable assault rifle with exceptional durability in harsh conditions.</p>
                                <div class="weapon-features">
                                    <span class="feature">Steel Construction</span>
                                    <span class="feature">Side-Folding Stock</span>
                                    <span class="feature">30-Round Mag</span>
                                </div>
                                <button class="weapon-btn">Request Quote</button>
                            </div>
                        </div>

                        <div class="weapon-card m4-carbine" onclick="triggerPayload('m4')">
                            <div class="weapon-image">
                                <img src="images/weapons/assault-rifles/Ak-47-Variant.jpg" alt="M4 Carbine" class="weapon-img">
                                <span class="image-placeholder">M4 Carbine</span>
                            </div>
                            <div class="weapon-info">
                                <h3>M4 Carbine</h3>
                                <div class="weapon-specs">
                                    <span class="spec"><i class="fas fa-ruler"></i> 5.56x45mm NATO</span>
                                    <span class="spec"><i class="fas fa-weight"></i> 6.9 lbs</span>
                                    <span class="spec"><i class="fas fa-crosshairs"></i> 500m range</span>
                                </div>
                                <p>Military-standard carbine with proven combat effectiveness and modular design.</p>
                                <div class="weapon-features">
                                    <span class="feature">Collapsible Stock</span>
                                    <span class="feature">RIS Handguard</span>
                                    <span class="feature">Select Fire</span>
                                </div>
                                <button class="weapon-btn">Request Quote</button>
                            </div>
                        </div>

                        <div class="weapon-card precision-rifle" onclick="triggerPayload('precision')">
                            <div class="weapon-image">
                                <img src="images/weapons/precision-rifles/Ar-15-Tactical.jpg" alt="Precision Rifle" class="weapon-img">
                                <span class="image-placeholder">Sniper Rifle</span>
                            </div>
                            <div class="weapon-info">
                                <h3>Tactical Sniper Rifle</h3>
                                <div class="weapon-specs">
                                    <span class="spec"><i class="fas fa-ruler"></i> .308 Winchester</span>
                                    <span class="spec"><i class="fas fa-weight"></i> 12.5 lbs</span>
                                    <span class="spec"><i class="fas fa-crosshairs"></i> 800m range</span>
                                </div>
                                <p>Long-range precision rifle with match-grade accuracy for specialized operations.</p>
                                <div class="weapon-features">
                                    <span class="feature">Match Barrel</span>
                                    <span class="feature">Precision Stock</span>
                                    <span class="feature">10-Round Mag</span>
                                </div>
                                <button class="weapon-btn">Request Quote</button>
                            </div>
                        </div>

                        <div class="weapon-card sidearm" onclick="triggerPayload('sidearm')">
                            <div class="weapon-image">
                                <img src="images/weapons/sidearms/Handgun.jpg" alt="SIG P320" class="weapon-img">
                                <span class="image-placeholder">SIG P320</span>
                            </div>
                            <div class="weapon-info">
                                <h3>SIG Sauer P320</h3>
                                <div class="weapon-specs">
                                    <span class="spec"><i class="fas fa-ruler"></i> 9x19mm</span>
                                    <span class="spec"><i class="fas fa-weight"></i> 1.6 lbs</span>
                                    <span class="spec"><i class="fas fa-crosshairs"></i> 50m range</span>
                                </div>
                                <p>Modular striker-fired pistol adopted by military and law enforcement agencies.</p>
                                <div class="weapon-features">
                                    <span class="feature">Modular Design</span>
                                    <span class="feature">Striker Fired</span>
                                    <span class="feature">17-Round Mag</span>
                                </div>
                                <button class="weapon-btn">Request Quote</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="category-section">
                    <h2 class="category-title">Tactical Shotguns</h2>
                    <div class="product-grid">
                        <div class="weapon-card mossberg-500" onclick="triggerPayload('shotgun')">
                            <div class="weapon-image">
                                <img src="images/weapons/shotguns/Shotgun.jpg" alt="Mossberg 500 Tactical" class="weapon-img">
                                <span class="image-placeholder">Mossberg 500</span>
                            </div>
                            <div class="weapon-info">
                                <h3>Mossberg 500 Tactical</h3>
                                <div class="weapon-specs">
                                    <span class="spec"><i class="fas fa-ruler"></i> 12 Gauge</span>
                                    <span class="spec"><i class="fas fa-weight"></i> 7.5 lbs</span>
                                    <span class="spec"><i class="fas fa-crosshairs"></i> 50m range</span>
                                </div>
                                <p>Pump-action shotgun designed for close-quarters tactical operations.</p>
                                <div class="weapon-features">
                                    <span class="feature">Ghost Ring Sights</span>
                                    <span class="feature">Tactical Stock</span>
                                    <span class="feature">8+1 Capacity</span>
                                </div>
                                <button class="weapon-btn">Request Quote</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,

    // Footer Component
    footer: `
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h4>H&F Tactical Solutions</h4>
                    <p>Professional defense equipment for authorized personnel only. All sales subject to verification and compliance with local, state, and federal regulations.</p>
                </div>
                <div class="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a onclick="showSection('home')">Home</a></li>
                        <li><a onclick="showSection('weapons')">Weapons</a></li>
                        <li><a onclick="showSection('defense')">Defense Gear</a></li>
                        <li><a onclick="showSection('emps')">EMP Systems</a></li>
                        <li><a onclick="showSection('nonlethals')">Non-Lethals</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Contact Info</h4>
                    <p><i class="fas fa-phone"></i> 1-800-TACTICAL</p>
                    <p><i class="fas fa-envelope"></i> info@hftactical.com</p>
                    <p><i class="fas fa-map-marker-alt"></i> Secure Location</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 H&F Tactical Solutions. All rights reserved. | <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
            </div>
        </div>
    `
};

// Component Loader
function loadComponent(elementId, componentName) {
    const element = document.getElementById(elementId);
    if (element && Components[componentName]) {
        element.innerHTML = Components[componentName];
        
        // Add navbar class if loading navbar
        if (componentName === 'navbar') {
            element.className = 'navbar';
        }
        
        // Add footer class if loading footer
        if (componentName === 'footer') {
            element.className = 'footer';
        }
    }
}

// Load other sections with simplified content
function loadOtherSections() {
    // Defense Gear Section
    document.getElementById('defense').innerHTML = `
        <div class="page-header">
            <div class="container">
                <h1><i class="fas fa-shield-alt"></i> Defense Gear</h1>
                <p>Advanced protective equipment and defensive systems for maximum security</p>
                <div class="breadcrumb">
                    <a onclick="showSection('home')">Home</a> > <span>Defense Gear</span>
                </div>
            </div>
        </div>
        <div class="products-section">
            <div class="container">
                <div class="category-section">
                    <h2 class="category-title">Body Armor</h2>
                    <div class="product-grid">
                        <div class="weapon-card" onclick="triggerPayload('armor')">
                            <div class="weapon-image">
                                <img src="images/defense-gear/body-armor/Level3A-Armor-Vest.jpg" alt="Level IIIA Ballistic Vest" class="weapon-img">
                                <span class="image-placeholder">Level IIIA Vest</span>
                            </div>
                            <div class="weapon-info">
                                <h3>Level IIIA Ballistic Vest</h3>
                                <div class="weapon-specs">
                                    <span class="spec"><i class="fas fa-shield-alt"></i> NIJ Level IIIA</span>
                                    <span class="spec"><i class="fas fa-weight"></i> 2.1 lbs</span>
                                    <span class="spec"><i class="fas fa-layer-group"></i> Multi-hit</span>
                                </div>
                                <p>Lightweight ballistic protection against handgun threats up to .44 Magnum.</p>
                                <div class="weapon-features">
                                    <span class="feature">Kevlar Construction</span>
                                    <span class="feature">Trauma Plates</span>
                                    <span class="feature">Adjustable Fit</span>
                                </div>
                                <button class="weapon-btn">Request Quote</button>
                            </div>
                        </div>

                        <div class="weapon-card helmet" onclick="triggerPayload('helmet')">
                            <div class="weapon-image">
                                <img src="images/defense-gear/helmets/Helmet.jpg" alt="Tactical Helmet" class="weapon-img">
                                <span class="image-placeholder">Tactical Helmet</span>
                            </div>
                            <div class="weapon-info">
                                <h3>FAST Ballistic Helmet</h3>
                                <div class="weapon-specs">
                                    <span class="spec"><i class="fas fa-shield-alt"></i> NIJ Level IIIA</span>
                                    <span class="spec"><i class="fas fa-weight"></i> 2.8 lbs</span>
                                    <span class="spec"><i class="fas fa-tools"></i> Rail System</span>
                                </div>
                                <p>Advanced ballistic helmet with integrated rail system for accessories.</p>
                                <div class="weapon-features">
                                    <span class="feature">Carbon Fiber</span>
                                    <span class="feature">NVG Mount</span>
                                    <span class="feature">Comfort Padding</span>
                                </div>
                                <button class="weapon-btn">Request Quote</button>
                            </div>
                        </div>

                        <div class="weapon-card shield" onclick="triggerPayload('shield')">
                            <div class="weapon-image">
                                <img src="images/defense-gear/shields/Shield.jpg" alt="Ballistic Shield" class="weapon-img">
                                <span class="image-placeholder">Ballistic Shield</span>
                            </div>
                            <div class="weapon-info">
                                <h3>Ballistic Shield Level IIIA</h3>
                                <div class="weapon-specs">
                                    <span class="spec"><i class="fas fa-shield-alt"></i> NIJ Level IIIA</span>
                                    <span class="spec"><i class="fas fa-weight"></i> 18 lbs</span>
                                    <span class="spec"><i class="fas fa-ruler"></i> 20"x30"</span>
                                </div>
                                <p>Portable ballistic protection for tactical entry and crowd control operations.</p>
                                <div class="weapon-features">
                                    <span class="feature">Viewing Port</span>
                                    <span class="feature">Ergonomic Handle</span>
                                    <span class="feature">Lightweight</span>
                                </div>
                                <button class="weapon-btn">Request Quote</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // EMP Systems Section
    document.getElementById('emps').innerHTML = `
        <div class="page-header">
            <div class="container">
                <h1><i class="fas fa-bolt"></i> EMP Systems</h1>
                <p>Electromagnetic pulse systems for electronic warfare and tactical operations</p>
                <div class="breadcrumb">
                    <a onclick="showSection('home')">Home</a> > <span>EMP Systems</span>
                </div>
            </div>
        </div>
        <div class="products-section">
            <div class="container">
                <div class="category-section">
                    <h2 class="category-title">Portable EMP Units</h2>
                    <div class="product-grid">
                        <div class="weapon-card" onclick="triggerPayload('emp')">
                            <div class="weapon-image">
                                <img src="images/emps/portable/Portable-EMP.jpg" alt="Portable EMP Generator" class="weapon-img">
                                <span class="image-placeholder">Handheld EMP</span>
                            </div>
                            <div class="weapon-info">
                                <h3>Portable EMP Generator</h3>
                                <div class="weapon-specs">
                                    <span class="spec"><i class="fas fa-bolt"></i> 50kV Output</span>
                                    <span class="spec"><i class="fas fa-weight"></i> 2.3 lbs</span>
                                    <span class="spec"><i class="fas fa-ruler"></i> 5m Range</span>
                                </div>
                                <p>Compact electromagnetic pulse device for disabling electronic equipment.</p>
                                <div class="weapon-features">
                                    <span class="feature">Battery Powered</span>
                                    <span class="feature">Instant Discharge</span>
                                    <span class="feature">Tactical Grip</span>
                                </div>
                                <button class="weapon-btn">Request Quote</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Non-Lethals Section
    document.getElementById('nonlethals').innerHTML = `
        <div class="page-header">
            <div class="container">
                <h1><i class="fas fa-hand-paper"></i> Non-Lethal Systems</h1>
                <p>Advanced non-lethal weapons for crowd control and subduing targets</p>
                <div class="breadcrumb">
                    <a onclick="showSection('home')">Home</a> > <span>Non-Lethals</span>
                </div>
            </div>
        </div>
        <div class="products-section">
            <div class="container">
                <div class="category-section">
                    <h2 class="category-title">Tasers & Stun Guns</h2>
                    <div class="product-grid">
                        <div class="weapon-card" onclick="triggerPayload('taser')">
                            <div class="weapon-image">
                                <img src="images/non-lethals/tasers/Stun-gun.jpg" alt="TASER X26P" class="weapon-img">
                                <span class="image-placeholder">TASER X26P</span>
                            </div>
                            <div class="weapon-info">
                                <h3>TASER X26P</h3>
                                <div class="weapon-specs">
                                    <span class="spec"><i class="fas fa-bolt"></i> 50,000V</span>
                                    <span class="spec"><i class="fas fa-weight"></i> 1.2 lbs</span>
                                    <span class="spec"><i class="fas fa-ruler"></i> 15ft Range</span>
                                </div>
                                <p>Professional-grade conducted electrical weapon for law enforcement use.</p>
                                <div class="weapon-features">
                                    <span class="feature">Dual Laser</span>
                                    <span class="feature">Data Recording</span>
                                    <span class="feature">Smart Cartridge</span>
                                </div>
                                <button class="weapon-btn">Request Quote</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Contact Section
    document.getElementById('contact').innerHTML = `
        <div class="page-header">
            <div class="container">
                <h1><i class="fas fa-envelope"></i> Contact Us</h1>
                <p>Get in touch with our tactical specialists for authorized procurement</p>
                <div class="breadcrumb">
                    <a onclick="showSection('home')">Home</a> > <span>Contact</span>
                </div>
            </div>
        </div>
        <div class="products-section">
            <div class="container">
                <div class="section-header">
                    <h2>Secure Communication Channels</h2>
                    <p>All communications are encrypted and verified for authorized personnel only</p>
                </div>
                <div class="product-grid">
                    <div class="product-card contact-card" onclick="triggerPayload('contact')">
                        <div class="card-icon">
                            <i class="fas fa-phone"></i>
                        </div>
                        <h3>Secure Phone Line</h3>
                        <p>1-800-TACTICAL</p>
                        <p>Available 24/7 for authorized personnel</p>
                        <button class="card-btn">Call Now</button>
                    </div>
                    <div class="product-card contact-card" onclick="triggerPayload('email')">
                        <div class="card-icon">
                            <i class="fas fa-envelope-open"></i>
                        </div>
                        <h3>Encrypted Email</h3>
                        <p>info@hftactical.com</p>
                        <p>PGP encrypted communications only</p>
                        <button class="card-btn">Send Email</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Load all components when DOM is ready
function loadAllComponents() {
    loadComponent('navbar', 'navbar');
    loadComponent('home', 'home');
    loadComponent('weapons', 'weapons');
    loadComponent('footer', 'footer');

    // Load other sections with simplified content
    loadOtherSections();
}
