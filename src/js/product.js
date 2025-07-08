// product.js - JavaScript for product details page

// -----------------------------------------
// CART UTILITIES
// -----------------------------------------
function getCart() {
    let cart = JSON.parse(localStorage.getItem("cart") || '{}');
    return cart;
}

function setCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
    const cart = getCart();
    let count = Object.values(cart).reduce((a, b) => a + b, 0);
    const el = document.getElementById('cartCount');
    if (el) {
        el.textContent = count > 0 ? count : '';
        el.style.display = count > 0 ? 'inline-block' : 'none';
    }
}

function addToCart(productId) {
    const cart = getCart();
    cart[productId] = (cart[productId] || 0) + 1;
    setCart(cart);
    updateCartCount();
    
    // Show success message
    const btn = document.querySelector('.add-to-cart-btn');
    if (btn) {
        const originalText = btn.textContent;
        btn.textContent = 'Added to Cart!';
        btn.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            btn.disabled = false;
        }, 2000);
    }
}

// -----------------------------------------
// URL PARAMETER UTILITIES
// -----------------------------------------
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// -----------------------------------------
// PRODUCT DATA
// -----------------------------------------
function getProducts() {
    const productData = localStorage.getItem('productData');
    if (productData) {
        return JSON.parse(productData);
    }
    
    // Fallback product data if not found in localStorage
    return [
        { id: 1, title: "Wireless Headphones", price: "₹4,999", image: "images/wireless_headphones.jpg", desc: "Noise-cancelling headphones with premium sound quality.", category: "Gadgets" },
        { id: 2, title: "Smart Watch", price: "₹10,999", image: "images/smart_watch.jpg", desc: "Fitness and notification tracker with heart rate monitor.", category: "Gadgets" },
        { id: 3, title: "Bluetooth Speaker", price: "₹2,499", image: "images/bluetooth_speaker.jpg", desc: "Portable wireless speaker with 20W output and deep bass.", category: "Gadgets" },
        { id: 4, title: "Wireless Earbuds", price: "₹3,999", image: "images/wireless_earbuds.jpg", desc: "True wireless earbuds with active noise cancellation.", category: "Gadgets" },
        { id: 5, title: "iPhone 14 Pro", price: "₹1,29,900", image: "images/iphone_14_pro.jpg", desc: "Flagship Apple smartphone with A16 Bionic chip.", category: "Mobiles" },
        { id: 6, title: "OnePlus 11 5G", price: "₹56,999", image: "images/oneplus_11_5g.jpg", desc: "Smooth and powerful Android with Hasselblad camera.", category: "Mobiles" },
        { id: 7, title: "Samsung Galaxy S23", price: "₹74,999", image: "images/samsung_galaxy_s23.jpg", desc: "Premium Android flagship with S Pen support.", category: "Mobiles" },
        { id: 8, title: "Google Pixel 8", price: "₹75,999", image: "images/google_pixel_8.jpg", desc: "Google's latest with advanced AI camera features.", category: "Mobiles" },
        { id: 9, title: "Redmi Note 12", price: "₹18,999", image: "images/redmi_note_12.jpg", desc: "Budget-friendly smartphone with great performance.", category: "Mobiles" },
        { id: 10, title: "Laptop Backpack", price: "₹1,499", image: "images/laptop_backpack.jpg", desc: "Waterproof backpack for laptops with multiple compartments.", category: "Home Accessories" },
        { id: 11, title: "Smart LED Bulb", price: "₹899", image: "images/smart_led_bulb.jpg", desc: "WiFi-enabled smart bulb with voice control.", category: "Home Accessories" },
        { id: 12, title: "Smart Plug", price: "₹599", image: "images/smart_plug.jpg", desc: "Smart plug for home automation and energy monitoring.", category: "Home Accessories" },
        { id: 13, title: "Tablet Stand", price: "₹799", image: "images/tablet_stand.jpg", desc: "Adjustable tablet stand for comfortable viewing.", category: "Home Accessories" },
        { id: 14, title: "Laptop Cooling Pad", price: "₹1,299", image: "images/laptop_cooling_pad.jpg", desc: "USB-powered cooling pad for laptops with LED fans.", category: "Home Accessories" },
        { id: 15, title: "USB C Charger", price: "₹1,199", image: "images/usb_c_charger.jpg", desc: "Fast charging USB-C adapter with multiple ports.", category: "Home Accessories" },
        { id: 16, title: "Wireless Charger", price: "₹1,899", image: "images/wireless_charger.jpg", desc: "15W fast wireless charging pad for smartphones.", category: "Home Accessories" }
    ];
}

// -----------------------------------------
// PRODUCT DISPLAY FUNCTIONS
// -----------------------------------------
function displayProduct(product) {
    const productDetails = document.getElementById('productDetails');
    const breadcrumb = document.getElementById('productBreadcrumb');
    
    if (!productDetails || !product) {
        showError("Product not found");
        return;
    }
    
    // Update page title
    document.title = `${product.title} - MyShop`;
    
    // Update breadcrumb
    if (breadcrumb) {
        breadcrumb.textContent = product.title;
    }
    
    // Generate features based on category
    const features = generateFeatures(product);
    
    productDetails.innerHTML = `
        <div class="product-image-section">
            <img src="${product.image}" alt="${product.title}" class="product-image" 
                 onerror="this.src='https://via.placeholder.com/400x400?text=Image+Not+Available'">
        </div>
        <div class="product-info-section">
            <h1 class="product-title">${product.title}</h1>
            <div class="product-category">${product.category}</div>
            <div class="product-price">${product.price}</div>
            <p class="product-description">${product.desc}</p>
            <div class="product-actions">
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
                <a href="index.html" class="back-btn">Back to Home</a>
            </div>
            <div class="product-features">
                <h3>Key Features</h3>
                <ul class="features-list">
                    ${features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

function generateFeatures(product) {
    const features = {
        "Gadgets": [
            "High-quality audio output",
            "Long battery life",
            "Wireless connectivity",
            "Premium build quality",
            "Advanced features"
        ],
        "Mobiles": [
            "High-performance processor",
            "Advanced camera system",
            "Long battery life",
            "Fast charging support",
            "Latest operating system"
        ],
        "Home Accessories": [
            "Durable construction",
            "Easy to use",
            "Energy efficient",
            "Smart connectivity",
            "Modern design"
        ]
    };
    
    return features[product.category] || [
        "Premium quality",
        "Reliable performance",
        "Great value for money",
        "Customer favorite",
        "Warranty included"
    ];
}

function showError(message) {
    const productDetails = document.getElementById('productDetails');
    if (productDetails) {
        productDetails.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <h2 style="color: #ff6b6b; margin-bottom: 20px;">${message}</h2>
                <p style="color: #666; margin-bottom: 30px;">The product you're looking for could not be found.</p>
                <a href="index.html" class="back-btn">Back to Home</a>
            </div>
        `;
    }
}

// -----------------------------------------
// SEARCH FUNCTIONALITY
// -----------------------------------------
function createSearchDropdown() {
    const existingDropdown = document.getElementById('searchDropdown');
    if (existingDropdown) {
        existingDropdown.remove();
    }

    const searchContainer = document.querySelector('.search-bar');
    if (!searchContainer) return;

    const dropdown = document.createElement('div');
    dropdown.id = 'searchDropdown';
    dropdown.className = 'search-dropdown';
    dropdown.style.cssText = `
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border: 1px solid #ddd;
        border-top: none;
        border-radius: 0 0 8px 8px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        z-index: 1000;
        max-height: 300px;
        overflow-y: auto;
        display: none;
    `;

    searchContainer.style.position = 'relative';
    searchContainer.appendChild(dropdown);
}

function showSearchSuggestions(query) {
    const dropdown = document.getElementById('searchDropdown');
    if (!dropdown) return;

    if (!query.trim()) {
        dropdown.style.display = 'none';
        return;
    }

    const products = getProducts();
    const suggestions = products.filter(product => 
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8);

    if (suggestions.length === 0) {
        dropdown.style.display = 'none';
        return;
    }

    dropdown.innerHTML = '';
    suggestions.forEach(product => {
        const item = document.createElement('div');
        item.className = 'search-suggestion';
        item.style.cssText = `
            padding: 12px 16px;
            cursor: pointer;
            border-bottom: 1px solid #f0f0f0;
            display: flex;
            align-items: center;
            gap: 12px;
        `;
        item.innerHTML = `
            <img src="${product.image}" alt="${product.title}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px;" onerror="this.src='https://via.placeholder.com/40x40?text=Image'">
            <div>
                <div style="font-weight: 500; color: #333;">${product.title}</div>
                <div style="font-size: 12px; color: #666;">${product.category} • ${product.price}</div>
            </div>
        `;
        
        item.addEventListener('click', () => {
            window.location.href = `product.html?id=${product.id}`;
        });

        item.addEventListener('mouseenter', () => {
            item.style.backgroundColor = '#f8f9fa';
        });

        item.addEventListener('mouseleave', () => {
            item.style.backgroundColor = 'white';
        });

        dropdown.appendChild(item);
    });

    dropdown.style.display = 'block';
}

function performSearch(query) {
    const products = getProducts();
    const filtered = products.filter(p => 
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.desc.toLowerCase().includes(query.toLowerCase())
    );
    
    if (filtered.length === 1) {
        // If only one product matches, go directly to that product
        window.location.href = `product.html?id=${filtered[0].id}`;
    } else {
        // If multiple products match, go to home page with search
        window.location.href = `index.html?search=${encodeURIComponent(query)}`;
    }
}

// -----------------------------------------
// INITIALIZATION
// -----------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    // Get product ID from URL
    const productId = getUrlParameter('id');
    
    if (productId) {
        const products = getProducts();
        const product = products.find(p => p.id == productId);
        
        if (product) {
            displayProduct(product);
        } else {
            showError("Product not found");
        }
    } else {
        showError("No product specified");
    }
    
    // Initialize cart count
    updateCartCount();
    
    // Initialize search functionality
    createSearchDropdown();
    
    // Search event listeners
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.trim();
            
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
            
            searchTimeout = setTimeout(() => {
                showSearchSuggestions(query);
            }, 300);
        });
        
        searchInput.addEventListener("keypress", (e) => {
            if (e.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });
        
        searchInput.addEventListener("focus", () => {
            if (searchInput.value.trim()) {
                showSearchSuggestions(searchInput.value);
            }
        });
    }
    
    if (searchBtn) {
        searchBtn.onclick = () => {
            performSearch(searchInput ? searchInput.value : "");
        };
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        const searchContainer = document.querySelector('.search-bar');
        const dropdown = document.getElementById('searchDropdown');
        
        if (dropdown && searchContainer && !searchContainer.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });
}); 