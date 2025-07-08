// Simple cart utilities
function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '{}');
}
function setCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}
function updateCartCount() {
  const cart = getCart();
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const el = document.getElementById('cartCount');
  if (el) {
    el.textContent = count > 0 ? count : '';
    el.style.display = count > 0 ? 'inline-block' : 'none';
  }
}
function addToCart(id) {
  const cart = getCart();
  cart[id] = (cart[id] || 0) + 1;
  setCart(cart);
  updateCartCount();
}

// Product data
const products = [
  { id: 1, title: "Wireless Headphones", price: "₹4,999", image: "images/wireless_headphones.jfif", desc: "Noise-cancelling headphones.", category: "Gadgets",
    features: [
      "Active noise cancellation for immersive sound",
      "Up to 30 hours battery life",
      "Bluetooth 5.0 connectivity",
      "Built-in microphone for calls",
      "Foldable and lightweight design"
    ],
    specs: {
      Brand: "SoundMagic",
      Model: "X100",
      Connectivity: "Bluetooth 5.0",
      "Battery Life": "30 hours",
      Weight: "220g",
      Warranty: "1 year"
    },
    rating: { stars: 4.6, count: 1234 }
  },
  { id: 2, title: "Smart Watch", price: "₹10,999", image: "images/smart_watch.jfif", desc: "Fitness tracker.", category: "Gadgets",
    features: [
      "1.4-inch AMOLED display",
      "Heart rate & SpO2 monitoring",
      "Up to 14 days battery life",
      "Water resistant (5 ATM)",
      "Multiple sports modes"
    ],
    specs: {
      Brand: "FitPro",
      Model: "S2",
      Display: "1.4-inch AMOLED",
      Sensors: "Heart Rate, SpO2, Sleep",
      "Battery Life": "14 days",
      Weight: "45g",
      Warranty: "1 year"
    },
    rating: { stars: 4.4, count: 980 }
  },
  { id: 3, title: "Bluetooth Speaker", price: "₹2,499", image: "images/bluetooth_speaker.jfif", desc: "Portable speaker.", category: "Gadgets",
    features: [
      "10W powerful sound",
      "IPX7 waterproof",
      "Up to 12 hours playtime",
      "Bluetooth 5.1",
      "Built-in mic for calls"
    ],
    specs: {
      Brand: "BoomBox",
      Model: "Mini10",
      Output: "10W",
      Waterproof: "IPX7",
      "Battery Life": "12 hours",
      Weight: "320g",
      Warranty: "1 year"
    },
    rating: { stars: 4.5, count: 850 }
  },
  { id: 4, title: "Wireless Earbuds", price: "₹3,999", image: "images/wireless_earbuds.jfif", desc: "True wireless earbuds.", category: "Gadgets",
    features: [
      "True wireless design",
      "Up to 5 hours playtime",
      "IPX5 water resistance",
      "Bluetooth 5.2",
      "Active noise cancellation"
    ],
    specs: {
      Brand: "SoundWave",
      Model: "X10",
      "Battery Life": "5 hours",
      Waterproof: "IPX5",
      "Connectivity": "Bluetooth 5.2",
      Weight: "40g",
      Warranty: "6 months"
    },
    rating: { stars: 4.7, count: 1500 }
  },
  { id: 5, title: "iPhone 14 Pro", price: "₹1,29,900", image: "images/iphone_14_pro.jfif", desc: "Apple smartphone.", category: "Mobiles",
    features: [
      "6.1-inch Super Retina XDR display",
      "A16 Bionic chip",
      "Pro camera system",
      "12MP front camera",
      "Always-On display"
    ],
    specs: {
      Brand: "Apple",
      Model: "iPhone 14 Pro",
      Display: "6.1-inch Super Retina XDR",
      "Chip": "A16 Bionic",
      "Camera": "12MP Pro + 12MP Ultra Wide + 12MP Telephoto",
      "Front Camera": "12MP",
      "Storage": "128GB/256GB/512GB",
      Warranty: "1 year"
    },
    rating: { stars: 4.8, count: 2500 }
  },
  { id: 6, title: "OnePlus 11 5G", price: "₹56,999", image: "images/oneplus_11_5g.jfif", desc: "Android phone.", category: "Mobiles",
    features: [
      "6.7-inch Fluid AMOLED display",
      "Snapdragon 8 Gen 2",
      "50MP triple camera",
      "16MP front camera",
      "100W fast charging"
    ],
    specs: {
      Brand: "OnePlus",
      Model: "11 5G",
      Display: "6.7-inch Fluid AMOLED",
      "Chip": "Snapdragon 8 Gen 2",
      "Camera": "50MP + 50MP + 8MP",
      "Front Camera": "16MP",
      "Storage": "256GB/512GB",
      "Charging": "100W fast charging"
    },
    rating: { stars: 4.6, count: 1800 }
  },
  { id: 7, title: "Samsung Galaxy S23", price: "₹74,999", image: "images/samsung_galaxy_s23.jfif", desc: "Android flagship.", category: "Mobiles",
    features: [
      "6.1-inch Dynamic AMOLED 2X display",
      "Snapdragon 8 Gen 2",
      "50MP triple camera",
      "12MP front camera",
      "50W fast charging"
    ],
    specs: {
      Brand: "Samsung",
      Model: "Galaxy S23",
      Display: "6.1-inch Dynamic AMOLED 2X",
      "Chip": "Snapdragon 8 Gen 2",
      "Camera": "50MP + 12MP + 12MP",
      "Front Camera": "12MP",
      "Storage": "256GB/512GB",
      "Charging": "50W fast charging"
    },
    rating: { stars: 4.7, count: 2200 }
  },
  { id: 8, title: "Google Pixel 8", price: "₹75,999", image: "images/google_pixel_8.jfif", desc: "Google phone.", category: "Mobiles",
    features: [
      "6.2-inch Full HD+ display",
      "Tensor G3",
      "50MP triple camera",
      "10.8MP front camera",
      "50W fast charging"
    ],
    specs: {
      Brand: "Google",
      Model: "Pixel 8",
      Display: "6.2-inch Full HD+",
      "Chip": "Tensor G3",
      "Camera": "50MP + 12MP + 12MP",
      "Front Camera": "10.8MP",
      "Storage": "256GB/512GB",
      "Charging": "50W fast charging"
    },
    rating: { stars: 4.5, count: 1900 }
  },
  { id: 9, title: "Redmi Note 12", price: "₹18,999", image: "images/redmi_note_12.jfif", desc: "Budget smartphone.", category: "Mobiles",
    features: [
      "6.7-inch AMOLED display",
      "Snapdragon 6 Gen 1",
      "50MP triple camera",
      "16MP front camera",
      "67W fast charging"
    ],
    specs: {
      Brand: "Redmi",
      Model: "Note 12",
      Display: "6.7-inch AMOLED",
      "Chip": "Snapdragon 6 Gen 1",
      "Camera": "50MP + 8MP + 2MP",
      "Front Camera": "16MP",
      "Storage": "128GB/256GB",
      "Charging": "67W fast charging"
    },
    rating: { stars: 4.4, count: 1600 }
  },
  { id: 10, title: "Laptop Backpack", price: "₹1,499", image: "images/laptop_backpack.jfif", desc: "Waterproof backpack.", category: "Home Accessories",
    features: [
      "Waterproof material",
      "Multiple pockets",
      "Laptop compartment",
      "Adjustable straps",
      "Anti-theft design"
    ],
    specs: {
      Brand: "TravelPro",
      Model: "Waterproof",
      "Material": "Waterproof",
      "Pockets": "Laptop, Main, Side, Front",
      "Laptop Compartment": "Yes",
      "Straps": "Adjustable",
      Warranty: "1 year"
    },
    rating: { stars: 4.6, count: 800 }
  },
  { id: 11, title: "Smart LED Bulb", price: "₹899", image: "images/smart_led_bulb.jfif", desc: "WiFi smart bulb.", category: "Home Accessories",
    features: [
      "WiFi connectivity",
      "Color temperature control",
      "Brightness adjustment",
      "Motion sensor",
      "Voice control"
    ],
    specs: {
      Brand: "SmartHome",
      Model: "WiFi Bulb",
      "Connectivity": "WiFi",
      "Color Control": "Yes",
      "Brightness": "Adjustable",
      "Sensor": "Motion",
      "Voice Control": "Yes"
    },
    rating: { stars: 4.5, count: 1200 }
  },
  { id: 12, title: "Smart Plug", price: "₹599", image: "images/smart_plug.jfif", desc: "Home automation plug.", category: "Home Accessories",
    features: [
      "WiFi connectivity",
      "Power monitoring",
      "Energy saving",
      "Remote control",
      "Smart scheduling"
    ],
    specs: {
      Brand: "SmartHome",
      Model: "WiFi Plug",
      "Connectivity": "WiFi",
      "Power Monitoring": "Yes",
      "Energy Saving": "Yes",
      "Remote Control": "Yes",
      "Smart Scheduling": "Yes"
    },
    rating: { stars: 4.4, count: 1000 }
  },
  { id: 13, title: "Tablet Stand", price: "₹799", image: "images/tablet_stand.jfif", desc: "Adjustable stand.", category: "Home Accessories",
    features: [
      "Adjustable height",
      "Angle adjustment",
      "Tablet holder",
      "Built-in cable management",
      "Anti-slip base"
    ],
    specs: {
      Brand: "TabletPro",
      Model: "Adjustable",
      "Height": "Adjustable",
      "Angle": "Adjustable",
      "Tablet Holder": "Yes",
      "Cable Management": "Yes",
      "Anti-Slip Base": "Yes"
    },
    rating: { stars: 4.5, count: 900 }
  },
  { id: 14, title: "Laptop Cooling Pad", price: "₹1,299", image: "images/laptop_cooling_pad.jfif", desc: "Cooling pad for laptops.", category: "Home Accessories",
    features: [
      "High-performance cooling",
      "Quiet operation",
      "Adjustable height",
      "Anti-slip base",
      "Built-in fan"
    ],
    specs: {
      Brand: "CoolPad",
      Model: "High-Performance",
      "Cooling": "High-Performance",
      "Operation": "Quiet",
      "Height": "Adjustable",
      "Anti-Slip Base": "Yes",
      "Built-in Fan": "Yes"
    },
    rating: { stars: 4.6, count: 1100 }
  },
  { id: 15, title: "USB C Charger", price: "₹1,199", image: "images/usb_c_charger.jfif", desc: "Fast charger.", category: "Home Accessories",
    features: [
      "USB C port",
      "Fast charging",
      "Multiple output ports",
      "Compact design",
      "Over-current protection"
    ],
    specs: {
      Brand: "FastCharge",
      Model: "USB C",
      "Port": "USB C",
      "Charging": "Fast",
      "Output Ports": "Multiple",
      "Design": "Compact",
      "Protection": "Over-current"
    },
    rating: { stars: 4.7, count: 1300 }
  },
  { id: 16, title: "Wireless Charger", price: "₹1,899", image: "images/wireless_charger.jfif", desc: "Wireless charging pad.", category: "Home Accessories",
    features: [
      "Wireless charging",
      "Fast charging",
      "Multiple device support",
      "Compact design",
      "Over-current protection"
    ],
    specs: {
      Brand: "WirelessPower",
      Model: "Fast",
      "Charging": "Wireless",
      "Charging": "Fast",
      "Device Support": "Multiple",
      "Design": "Compact",
      "Protection": "Over-current"
    },
    rating: { stars: 4.6, count: 1400 }
  }
];
localStorage.setItem('productData', JSON.stringify(products));

const categories = ["All", ...new Set(products.map(p => p.category))];
let currentCategory = "All";
let searchQuery = "";

function renderCategories() {
  const nav = document.getElementById('categoryNav');
  if (!nav) return;
  nav.innerHTML = '';
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.textContent = cat;
    btn.className = 'category-btn' + (cat === currentCategory ? ' active' : '');
    btn.onclick = () => {
      currentCategory = cat;
      renderProducts();
    };
    nav.appendChild(btn);
  });
}

function renderProducts() {
  const grid = document.getElementById('productGrid');
  if (!grid) return;
  let filtered = products;
  if (currentCategory !== "All") filtered = filtered.filter(p => p.category === currentCategory);
  if (searchQuery) filtered = filtered.filter(p => p.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
  grid.innerHTML = '';
  filtered.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `<img src="${p.image}" alt="${p.title}"><div class="product-title">${p.title}</div><div class="product-price">${p.price}</div><button class="add-to-cart" data-id="${p.id}">Add to Cart</button>`;
    card.onclick = e => {
      if (e.target.classList.contains('add-to-cart')) {
        addToCart(p.id);
        e.stopPropagation();
      } else {
        window.location.href = `product.html?id=${p.id}`;
      }
    };
    grid.appendChild(card);
  });
}

// Search Dropdown
function createSearchDropdown() {
  let dropdown = document.getElementById('searchDropdown');
  if (!dropdown) {
    dropdown = document.createElement('div');
    dropdown.id = 'searchDropdown';
    dropdown.className = 'search-dropdown';
    dropdown.style.position = 'absolute';
    dropdown.style.top = '100%';
    dropdown.style.left = '0';
    dropdown.style.right = '0';
    dropdown.style.background = 'white';
    dropdown.style.border = '1px solid #ddd';
    dropdown.style.borderTop = 'none';
    dropdown.style.borderRadius = '0 0 8px 8px';
    dropdown.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    dropdown.style.zIndex = '1000';
    dropdown.style.maxHeight = '300px';
    dropdown.style.overflowY = 'auto';
    dropdown.style.display = 'none';
    const searchBar = document.querySelector('.search-bar');
    if (searchBar) {
      searchBar.style.position = 'relative';
      searchBar.appendChild(dropdown);
    }
  }
  return dropdown;
}

function showSearchSuggestions(query) {
  const dropdown = createSearchDropdown();
  if (!query.trim()) {
    dropdown.style.display = 'none';
    return;
  }
  const q = query.toLowerCase();
  const suggestions = products.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.desc.toLowerCase().includes(q)
  ).slice(0, 8);
  if (suggestions.length === 0) {
    dropdown.style.display = 'none';
    return;
  }
  dropdown.innerHTML = '';
  suggestions.forEach(product => {
    const item = document.createElement('div');
    item.className = 'search-suggestion';
    item.style.display = 'flex';
    item.style.alignItems = 'center';
    item.style.gap = '12px';
    item.style.padding = '10px 16px';
    item.style.cursor = 'pointer';
    item.style.borderBottom = '1px solid #f0f0f0';
    item.innerHTML = `
      <img src="${product.image}" alt="${product.title}" style="width:40px;height:40px;object-fit:cover;border-radius:4px;">
      <div>
        <div style="font-weight:500;color:#000;">${product.title}</div>
        <div style="font-size:12px;color:#666;">${product.category} • ${product.price}</div>
      </div>
    `;
    item.onclick = () => {
      window.location.href = `product.html?id=${product.id}`;
    };
    item.onmouseenter = () => { item.style.background = '#f8f9fa'; };
    item.onmouseleave = () => { item.style.background = 'white'; };
    dropdown.appendChild(item);
  });
  dropdown.style.display = 'block';
}

// Search
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
if (searchInput && searchBtn) {
  function handleSearchSubmit() {
    searchQuery = searchInput.value.trim();
    renderProducts();
    // Scroll to product grid
    const grid = document.getElementById('productGrid');
    if (grid) grid.scrollIntoView({ behavior: 'smooth' });
  }
  searchInput.oninput = e => {
    searchQuery = e.target.value;
    renderProducts();
    // Scroll to product grid as soon as user types
    const grid = document.getElementById('productGrid');
    if (grid) grid.scrollIntoView({ behavior: 'smooth' });
  };
  searchInput.onfocus = e => {
    if (searchInput.value.trim()) showSearchSuggestions(searchInput.value);
  };
  searchInput.onblur = () => {
    setTimeout(() => {
      const dropdown = document.getElementById('searchDropdown');
      if (dropdown) dropdown.style.display = 'none';
    }, 200);
  };
  searchBtn.onclick = handleSearchSubmit;
  searchInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') handleSearchSubmit();
  });
}
document.addEventListener('click', e => {
  const searchBar = document.querySelector('.search-bar');
  const dropdown = document.getElementById('searchDropdown');
  if (dropdown && searchBar && !searchBar.contains(e.target)) {
    dropdown.style.display = 'none';
  }
});

// Init
updateCartCount();
renderCategories();
renderProducts();