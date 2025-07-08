// app.js - JS for homepage rendering and logic

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
}

// -----------------------------------------
// PRODUCT DATA
// -----------------------------------------
// INSTRUCTIONS:
// Download your product images and save them in the src/images/ directory.
// Use the file names below for each product image.
// Example: src/images/wireless_headphones.jpg

const products = [
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

// Save products to localStorage for other pages to use
localStorage.setItem('productData', JSON.stringify(products));

// Get unique categories
const categories = ["All", ...new Set(products.map(p => p.category))];
let currentCategory = "All";
let searchMode = false;
let searchQuery = "";

// -----------------------------------------
// SEARCH FUNCTIONALITY
// -----------------------------------------
function createSearchDropdown() {
    // Remove existing dropdown if any
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

    const suggestions = products.filter(product => 
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8); // Limit to 8 suggestions

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
    searchQuery = query.trim();
    searchMode = searchQuery.length > 0;
    
    // Update search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = searchQuery;
    }

    // Hide dropdown
    const dropdown = document.getElementById('searchDropdown');
    if (dropdown) {
        dropdown.style.display = 'none';
    }

    // Check if only one product matches
    let filtered = products;
    if (currentCategory !== "All") {
        filtered = filtered.filter(p => p.category === currentCategory);
    }
    if (searchMode && searchQuery) {
        filtered = filtered.filter(p => 
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.desc.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    
    // If only one product matches, go directly to product page
    if (filtered.length === 1) {
        window.location.href = `product.html?id=${filtered[0].id}`;
        return;
    }

    // Render filtered products
    renderProducts();
}

function clearSearch() {
    searchQuery = "";
    searchMode = false;
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = "";
    }

    const dropdown = document.getElementById('searchDropdown');
    if (dropdown) {
        dropdown.style.display = 'none';
    }

    renderProducts();
}

// -----------------------------------------
// RENDERING FUNCTIONS
// -----------------------------------------
function renderCategories() {
    const nav = document.getElementById("categoryNav");
    if (!nav) return;
    
    nav.innerHTML = '';
    
    // Add clear search button if in search mode
    if (searchMode) {
        const clearBtn = document.createElement("button");
        clearBtn.className = "category-btn clear-search";
        clearBtn.textContent = "Clear Search";
        clearBtn.onclick = clearSearch;
        nav.appendChild(clearBtn);
    }
    
    categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.className = "category-btn" + (cat === currentCategory ? " active" : "");
        btn.textContent = cat;
        btn.onclick = () => {
            currentCategory = cat;
            renderProducts();
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        };
        nav.appendChild(btn);
    });
}

function renderProducts() {
    const grid = document.getElementById("productGrid");
    if (!grid) return;
    
    let filtered = products;
    
    // Apply category filter
    if (currentCategory !== "All") {
        filtered = filtered.filter(p => p.category === currentCategory);
    }
    
    // Apply search filter
    if (searchMode && searchQuery) {
        filtered = filtered.filter(p => 
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.desc.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    
    grid.innerHTML = '';
    
    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #666;">
                <h3>No products found</h3>
                <p>${searchMode ? 'Try adjusting your search terms or browse all categories.' : 'No products in this category.'}</p>
            </div>
        `;
        return;
    }
    
    filtered.forEach(p => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <img src="${p.image}" alt="${p.title}" onerror="this.src='https://via.placeholder.com/180x180?text=Image+Not+Available'" />
            <div class="product-title">${p.title}</div>
            <div class="product-price">${p.price}</div>
            <button class="add-to-cart" data-id="${p.id}">Add to Cart</button>
        `;
        const addToCartBtn = card.querySelector(".add-to-cart");
        if (addToCartBtn) {
            addToCartBtn.onclick = e => {
                e.stopPropagation();
                addToCart(p.id);
                e.target.textContent = "Added to Cart";
                e.target.disabled = true;
                setTimeout(() => {
                    e.target.textContent = "Add to Cart";
                    e.target.disabled = false;
                }, 2000);
            };
        }
        card.onclick = e => {
            if (!e.target.classList.contains("add-to-cart")) {
                if (searchMode) {
                    // If in search mode, go to product page
                    window.location.href = `product.html?id=${p.id}`;
                } else {
                    // If not in search mode, show modal
                    showModal(p);
                }
            }
        };
        grid.appendChild(card);
    });
}

function showModal(product) {
    const modal = document.getElementById("productModal");
    const modalImg = document.getElementById("modalImg");
    const modalTitle = document.getElementById("modalTitle");
    const modalDesc = document.getElementById("modalDesc");
    const modalPrice = document.getElementById("modalPrice");
    const modalAddToCart = document.getElementById("modalAddToCart");
    
    if (!modal || !modalImg || !modalTitle || !modalDesc || !modalPrice || !modalAddToCart) return;
    
    modalImg.src = product.image;
    modalImg.onerror = function() {
        this.src = 'https://via.placeholder.com/220x220?text=Image+Not+Available';
    };
    modalTitle.textContent = product.title;
    modalDesc.textContent = product.desc;
    modalPrice.textContent = product.price;
    modal.style.display = 'block';
    modalAddToCart.onclick = () => {
        addToCart(product.id);
        modal.style.display = 'none';
    };
}

// Modal close functionality
document.addEventListener('DOMContentLoaded', function() {
    const closeModal = document.getElementById("closeModal");
    const modal = document.getElementById("productModal");
    
    if (closeModal) {
        closeModal.onclick = () => {
            if (modal) modal.style.display = 'none';
        };
    }
    
    if (modal) {
        window.onclick = e => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        };
    }
});

// -----------------------------------------
// EVENT LISTENERS
// -----------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    
    // Create search dropdown
    createSearchDropdown();
    
    // Search input events
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.trim();
            
            // Clear previous timeout
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
            
            // Show suggestions after 300ms delay
            searchTimeout = setTimeout(() => {
                showSearchSuggestions(query);
            }, 300);
        });
        
        // Handle Enter key
        searchInput.addEventListener("keypress", (e) => {
            if (e.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });
        
        // Handle focus/blur for dropdown
        searchInput.addEventListener("focus", () => {
            if (searchInput.value.trim()) {
                showSearchSuggestions(searchInput.value);
            }
        });
    }
    
    // Search button click
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

// -----------------------------------------
// INITIALIZE
// -----------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    renderCategories();
    renderProducts();
    updateCartCount();
});