// One-time cart cleanup on page load (MUST be at the very top before any UI logic)
(function cleanCartOnLoad() {
    let cart = JSON.parse(localStorage.getItem('cart') || '{}');
    let changed = false;
    Object.keys(cart).forEach(id => {
        if (!cart[id] || cart[id] <= 0) {
            delete cart[id];
            changed = true;
        }
    });
    if (Object.keys(cart).length === 0 && localStorage.getItem('cart')) {
        localStorage.removeItem('cart');
        changed = true;
    } else if (changed) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
})();

// --- FORCE CART CLEANUP ON EVERY LOAD ---
(function forceCleanCartOnLoad() {
    let cart = JSON.parse(localStorage.getItem('cart') || '{}');
    let changed = false;
    // Remove any items with quantity <= 0 or not in products list
    const validIds = new Set((Array.isArray(window.products) ? window.products : []).map(p => p.id));
    Object.keys(cart).forEach(id => {
        if (!cart[id] || cart[id] <= 0 || !validIds.has(Number(id))) {
            delete cart[id];
            changed = true;
        }
    });
    if (Object.keys(cart).length === 0 && localStorage.getItem('cart')) {
        localStorage.removeItem('cart');
        changed = true;
    } else if (changed) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
})();

// Sample product data with categories
const products = [
    { id: 1, title: "Wireless Headphones", price: "₹4,999", image: "images/wireless_headphones.jpg", desc: "High-quality wireless headphones with noise cancellation and 20 hours battery life.", category: "Gadgets" },
    { id: 2, title: "Smart Watch", price: "₹10,999", image: "https://via.placeholder.com/140?text=Smart+Watch", desc: "Track your fitness, heart rate, and notifications with this stylish smart watch.", category: "Gadgets" },
    { id: 3, title: "Bluetooth Speaker", price: "₹2,999", image: "images/bluetooth_speaker.jpg", desc: "Portable Bluetooth speaker with deep bass and 12 hours playtime.", category: "Gadgets" },
    { id: 4, title: "Laptop Backpack", price: "₹1,499", image: "images/laptop_backpack.jpg", desc: "Water-resistant backpack with padded compartment for 15.6-inch laptops.", category: "Home Accessories" },
    { id: 5, title: "Gaming Mouse", price: "₹1,299", image: "images/gaming_mouse.jpg", desc: "Ergonomic gaming mouse with 6 programmable buttons and RGB lighting.", category: "Gadgets" },
    { id: 6, title: "Fire TV Stick 4K", price: "₹3,999", image: "images/fire_tv_stick_4k.jpg", desc: "Fire TV Stick 4K with Alexa Voice Remote for streaming.", category: "Gadgets" },
    { id: 7, title: "USB-C Charger", price: "₹799", image: "https://via.placeholder.com/140?text=USB-C+Charger", desc: "Fast charging USB-C wall charger for smartphones and tablets.", category: "Gadgets" },
    { id: 8, title: "Noise Cancelling Earbuds", price: "₹3,999", image: "https://via.placeholder.com/140?text=Earbuds", desc: "Wireless earbuds with active noise cancellation and long battery life.", category: "Gadgets" },
    { id: 9, title: "Fitness Tracker", price: "₹2,499", image: "images/fitness_tracker.jpg", desc: "Track your steps, calories, and sleep with this waterproof fitness tracker.", category: "Gadgets" },
    { id: 10, title: "Portable SSD", price: "₹7,999", image: "images/portable_ssd.jpg", desc: "High-speed portable SSD for fast data transfer and backup.", category: "Gadgets" },
    { id: 11, title: "Mechanical Keyboard", price: "₹5,499", image: "images/mechanical_keyboard.jpg", desc: "RGB mechanical keyboard with blue switches for gaming and typing.", category: "Gadgets" },
    { id: 12, title: "Wireless Mouse", price: "₹899", image: "images/wireless_mouse.jpg", desc: "Compact wireless mouse with adjustable DPI and ergonomic design.", category: "Gadgets" },
    { id: 13, title: "Smartphone Gimbal", price: "₹5,999", image: "images/smartphone_gimbal.jpg", desc: "3-axis handheld gimbal stabilizer for smooth smartphone videos.", category: "Gadgets" },
    { id: 14, title: "Tablet Stand", price: "₹1,199", image: "https://via.placeholder.com/140?text=Tablet+Stand", desc: "Adjustable tablet stand for desk, compatible with all tablets.", category: "Home Accessories" },
    { id: 15, title: "Bluetooth Headset", price: "₹1,799", image: "https://via.placeholder.com/140?text=Headset", desc: "Lightweight Bluetooth headset with microphone for calls and music.", category: "Gadgets" },
    { id: 16, title: "Smart LED Bulb", price: "₹499", image: "https://via.placeholder.com/140?text=LED+Bulb", desc: "WiFi-enabled LED bulb with app and voice control.", category: "Home Accessories" },
    { id: 17, title: "Wireless Charger", price: "₹1,599", image: "https://via.placeholder.com/140?text=Charger", desc: "Fast wireless charging pad for Qi-enabled devices.", category: "Gadgets" },
    { id: 18, title: "Laptop Cooling Pad", price: "₹1,899", image: "https://via.placeholder.com/140?text=Cooling+Pad", desc: "Cooling pad with adjustable fans for laptops up to 17 inches.", category: "Home Accessories" },
    { id: 19, title: "Echo Dot (4th Gen)", price: "₹3,499", image: "images/echo_dot_4th_gen.jpg", desc: "Smart speaker with Alexa (4th Gen)", category: "Gadgets" },
    { id: 20, title: "Smart Plug", price: "₹699", image: "https://via.placeholder.com/140?text=Smart+Plug", desc: "WiFi smart plug with timer and remote control via app.", category: "Home Accessories" },
    { id: 21, title: "iPhone 14 Pro", price: "₹1,29,900", image: "images/iphone_14_pro.jpg", desc: "Apple iPhone 14 Pro with A16 Bionic chip and ProMotion display.", category: "Mobiles" },
    { id: 22, title: "Samsung Galaxy S23", price: "₹74,999", image: "https://via.placeholder.com/140?text=Galaxy+S23", desc: "Samsung Galaxy S23 with Dynamic AMOLED display and triple camera.", category: "Mobiles" },
    { id: 23, title: "OnePlus 11 5G", price: "₹56,999", image: "images/oneplus_11_5g.jpg", desc: "OnePlus 11 5G with Snapdragon 8 Gen 2 and 120Hz display.", category: "Mobiles" },
    { id: 24, title: "Google Pixel 8", price: "₹61,999", image: "images/google_pixel_8.jpg", desc: "Google Pixel 8 with Tensor G3 chip and advanced camera features.", category: "Mobiles" },
    { id: 25, title: "Xiaomi Redmi Note 12", price: "₹16,999", image: "images/redmi_note_12.jpg", desc: "Redmi Note 12 with AMOLED display and 108MP camera.", category: "Mobiles" }
];

// Category list
defineCategories();

function defineCategories() {
    window.categories = [
        "All",
        ...Array.from(new Set(products.map(p => p.category)))
    ];
}

// Cart helpers
function getCart() {
    // Use object for cart: { productId: quantity }
    let cart = JSON.parse(localStorage.getItem('cart') || '{}');
    // Remove any items with quantity <= 0
    let changed = false;
    Object.keys(cart).forEach(id => {
        if (!cart[id] || cart[id] <= 0) {
            delete cart[id];
            changed = true;
        }
    });
    if (changed) localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
}
function setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}
function addToCart(productId) {
    const cart = getCart();
    if (cart[productId]) {
        cart[productId]++;
    } else {
        cart[productId] = 1;
    }
    setCart(cart);
    updateCartCount();
}
function updateCartCount() {
    const cart = getCart();
    let count = 0;
    if (cart && typeof cart === 'object') {
        count = Object.values(cart).reduce((a, b) => a + b, 0);
    }
    const el = document.getElementById('cartCount');
    if (el) {
        el.textContent = count > 0 ? count : '';
        // Hide badge if cart is empty
        el.style.display = count > 0 ? 'inline-block' : 'none';
    }
}

// Remove from cart utility for use in cart page
window.removeFromCart = function(productId) {
    const cart = getCart();
    delete cart[productId];
    setCart(cart);
    updateCartCount();
    // If on cart page, re-render cart
    if (typeof renderCart === 'function') renderCart();
    // UI updates (button state, totals) are now handled by render functions only
};

// Render products
function renderProducts(productList) {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';
    const cart = getCart();
    productList.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        const inCart = cart[product.id];
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <div class="product-title">${product.title}</div>
            <div class="product-price">${product.price}</div>
            <button class="add-to-cart" data-id="${product.id}" ${inCart ? 'disabled' : ''} style="${inCart ? 'background:#ccc;color:#555;cursor:not-allowed;' : ''}">${inCart ? 'Added to Cart' : 'Add to Cart'}</button>
        `;
        // Show modal on card click (except button)
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('add-to-cart')) {
                showModal(product);
            }
        });
        // Add to cart button
        card.querySelector('.add-to-cart').addEventListener('click', (e) => {
            e.stopPropagation();
            addToCart(product.id);
            // Update button immediately
            const btn = e.target;
            btn.textContent = 'Added to Cart';
            btn.disabled = true;
            btn.style.background = '#ccc';
            btn.style.color = '#555';
            btn.style.cursor = 'not-allowed';
        });
        productGrid.appendChild(card);
    });
}

// Modal logic
function showModal(product) {
    document.getElementById('modalImg').src = product.image;
    document.getElementById('modalTitle').textContent = product.title;
    document.getElementById('modalDesc').textContent = product.desc;
    document.getElementById('modalPrice').textContent = product.price;
    document.getElementById('productModal').style.display = 'block';
    document.getElementById('modalAddToCart').onclick = function() {
        addToCart(product.id);
        document.getElementById('productModal').style.display = 'none';
    };
}
document.getElementById('closeModal').onclick = function() {
    document.getElementById('productModal').style.display = 'none';
};
window.onclick = function(event) {
    if (event.target === document.getElementById('productModal')) {
        document.getElementById('productModal').style.display = 'none';
    }
};

// Render category navigation
function renderCategories() {
    const nav = document.getElementById('categoryNav');
    nav.innerHTML = '';
    window.categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'category-btn' + (cat === currentCategory ? ' active' : '');
        btn.textContent = cat;
        btn.onclick = () => {
            currentCategory = cat;
            updateCategoryUI();
        };
        nav.appendChild(btn);
    });
}

function updateCategoryUI() {
    // Update active button
    const nav = document.getElementById('categoryNav');
    Array.from(nav.children).forEach(btn => {
        btn.classList.toggle('active', btn.textContent === currentCategory);
    });
    // Clear search
    document.getElementById('searchInput').value = '';
    // Filter products
    filterProductsByCategory(currentCategory);
}

// Filter products by category
function filterProductsByCategory(category) {
    let filtered;
    if (category === "All") {
        filtered = products;
    } else {
        filtered = products.filter(p => p.category === category);
    }
    renderProducts(filtered);
}

// Update search to respect category filter
let currentCategory = "All";
function filterProductsLive() {
    const query = document.getElementById('searchInput').value.trim().toLowerCase();
    let filtered = products;
    if (currentCategory !== "All") {
        filtered = filtered.filter(p => p.category === currentCategory);
    }
    if (query !== "") {
        filtered = filtered.filter(p => p.title.toLowerCase().startsWith(query));
    }
    renderProducts(filtered);
}

document.getElementById('searchInput').addEventListener('input', filterProductsLive);

// Optional: keep the search button for accessibility
document.getElementById('searchBtn').onclick = filterProductsLive;

// Initial render
renderCategories();
filterProductsByCategory(currentCategory);
updateCartCount();

// Update category on click
window.renderCategories = function(cat) {
    currentCategory = cat;
    renderCategories(cat);
    filterProductsByCategory(cat);
    document.getElementById('searchInput').value = '';
};

// Remove 'Deals' from navigation
window.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav a').forEach(a => {
        if (a.textContent.trim() === 'Deals') {
            a.parentElement.removeChild(a);
        }
        if (a.textContent.trim() === 'Account') {
            a.setAttribute('href', 'login.html');
        }
    });
});