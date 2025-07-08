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
  { id: 1, title: "Wireless Headphones", price: "₹4,999", image: "images/wireless_headphones.jfif", desc: "Noise-cancelling headphones.", category: "Gadgets" },
  { id: 2, title: "Smart Watch", price: "₹10,999", image: "images/smart_watch.jfif", desc: "Fitness tracker.", category: "Gadgets" },
  { id: 3, title: "Bluetooth Speaker", price: "₹2,499", image: "images/bluetooth_speaker.jfif", desc: "Portable speaker.", category: "Gadgets" },
  { id: 4, title: "Wireless Earbuds", price: "₹3,999", image: "images/wireless_earbuds.jfif", desc: "True wireless earbuds.", category: "Gadgets" },
  { id: 5, title: "iPhone 14 Pro", price: "₹1,29,900", image: "images/iphone_14_pro.jfif", desc: "Apple smartphone.", category: "Mobiles" },
  { id: 6, title: "OnePlus 11 5G", price: "₹56,999", image: "images/oneplus_11_5g.jfif", desc: "Android phone.", category: "Mobiles" },
  { id: 7, title: "Samsung Galaxy S23", price: "₹74,999", image: "images/samsung_galaxy_s23.jfif", desc: "Android flagship.", category: "Mobiles" },
  { id: 8, title: "Google Pixel 8", price: "₹75,999", image: "images/google_pixel_8.jfif", desc: "Google phone.", category: "Mobiles" },
  { id: 9, title: "Redmi Note 12", price: "₹18,999", image: "images/redmi_note_12.jfif", desc: "Budget smartphone.", category: "Mobiles" },
  { id: 10, title: "Laptop Backpack", price: "₹1,499", image: "images/laptop_backpack.jfif", desc: "Waterproof backpack.", category: "Home Accessories" },
  { id: 11, title: "Smart LED Bulb", price: "₹899", image: "images/smart_led_bulb.jfif", desc: "WiFi smart bulb.", category: "Home Accessories" },
  { id: 12, title: "Smart Plug", price: "₹599", image: "images/smart_plug.jfif", desc: "Home automation plug.", category: "Home Accessories" },
  { id: 13, title: "Tablet Stand", price: "₹799", image: "images/tablet_stand.jfif", desc: "Adjustable stand.", category: "Home Accessories" },
  { id: 14, title: "Laptop Cooling Pad", price: "₹1,299", image: "images/laptop_cooling_pad.jfif", desc: "Cooling pad for laptops.", category: "Home Accessories" },
  { id: 15, title: "USB C Charger", price: "₹1,199", image: "images/usb_c_charger.jfif", desc: "Fast charger.", category: "Home Accessories" },
  { id: 16, title: "Wireless Charger", price: "₹1,899", image: "images/wireless_charger.jfif", desc: "Wireless charging pad.", category: "Home Accessories" }
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
  if (searchQuery) filtered = filtered.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
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
        showModal(p);
      }
    };
    grid.appendChild(card);
  });
}

function showModal(product) {
  const modal = document.getElementById('productModal');
  if (!modal) return;
  document.getElementById('modalImg').src = product.image;
  document.getElementById('modalTitle').textContent = product.title;
  document.getElementById('modalDesc').textContent = product.desc;
  document.getElementById('modalPrice').textContent = product.price;
  modal.style.display = 'block';
  document.getElementById('modalAddToCart').onclick = () => addToCart(product.id);
}
document.getElementById('closeModal').onclick = () => {
  document.getElementById('productModal').style.display = 'none';
};

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
  searchInput.oninput = e => {
    searchQuery = e.target.value;
    renderProducts();
    showSearchSuggestions(searchQuery);
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
  searchBtn.onclick = () => {
    searchQuery = searchInput.value;
    renderProducts();
    showSearchSuggestions(searchQuery);
  };
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