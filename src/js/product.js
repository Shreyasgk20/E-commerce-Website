// product.js - JavaScript for product details page

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
  const btn = document.querySelector('.add-to-cart-btn');
  if (btn) {
    btn.textContent = 'Added to Cart!';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Add to Cart';
      btn.disabled = false;
    }, 1500);
  }
}
function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}
const products = JSON.parse(localStorage.getItem('productData') || '[]');
function displayProduct(product) {
  const productDetails = document.getElementById('productDetails');
  if (!productDetails || !product) return;
  document.title = `${product.title} - MyShop`;
  productDetails.innerHTML = `
    <div class="product-image-section">
      <img src="${product.image}" alt="${product.title}" class="product-image">
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
    </div>
  `;
}
function showError(message) {
  const productDetails = document.getElementById('productDetails');
  if (productDetails) {
    productDetails.innerHTML = `<div style="text-align:center;padding:60px 20px;"><h2 style="color:#ff6b6b;">${message}</h2><a href="index.html" class="back-btn">Back to Home</a></div>`;
  }
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
let searchQuery = '';
if (searchInput && searchBtn) {
  searchInput.oninput = e => {
    searchQuery = e.target.value;
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
document.addEventListener('DOMContentLoaded', function() {
  updateCartCount();
  const id = getUrlParameter('id');
  const product = products.find(p => p.id == id);
  if (product) displayProduct(product);
  else showError('Product not found');
}); 