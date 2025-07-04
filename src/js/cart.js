// Use the same product list as app.js, with INR prices
const products = [
    { id: 1, title: "Wireless Headphones", price: 4999, image: "https://m.media-amazon.com/images/I/61CGHv6kmWL._AC_UL320_.jpg" },
    { id: 2, title: "Smart Watch", price: 10999, image: "https://m.media-amazon.com/images/I/61nPiOO2wqL._AC_UL320_.jpg" },
    { id: 3, title: "Bluetooth Speaker", price: 2999, image: "https://m.media-amazon.com/images/I/71z3kpMAYsL._AC_UL320_.jpg" },
    { id: 4, title: "Laptop Backpack", price: 1499, image: "https://m.media-amazon.com/images/I/81vpsIs58WL._AC_UL320_.jpg" },
    { id: 5, title: "Gaming Mouse", price: 1299, image: "https://m.media-amazon.com/images/I/61mpMH5TzkL._AC_UL320_.jpg" },
    { id: 6, title: "4K Action Camera", price: 6999, image: "https://m.media-amazon.com/images/I/71Q9d6N7xkL._AC_UL320_.jpg" },
    { id: 7, title: "USB-C Charger", price: 799, image: "https://m.media-amazon.com/images/I/51qFQd6lRHL._AC_UL320_.jpg" },
    { id: 8, title: "Noise Cancelling Earbuds", price: 3999, image: "https://m.media-amazon.com/images/I/51+Q6Rh3OQL._AC_UL320_.jpg" },
    { id: 9, title: "Fitness Tracker", price: 2499, image: "https://m.media-amazon.com/images/I/61YVqHdFRxL._AC_UL320_.jpg" },
    { id: 10, title: "Portable SSD", price: 7999, image: "https://m.media-amazon.com/images/I/61UxfXTUyvL._AC_UL320_.jpg" },
    { id: 11, title: "Mechanical Keyboard", price: 5499, image: "https://m.media-amazon.com/images/I/81PLqxtrJ3L._AC_UL320_.jpg" },
    { id: 12, title: "Wireless Mouse", price: 899, image: "https://m.media-amazon.com/images/I/61LtuGzXeaL._AC_UL320_.jpg" },
    { id: 13, title: "Smartphone Gimbal", price: 5999, image: "https://m.media-amazon.com/images/I/61n6Ovq6EdL._AC_UL320_.jpg" },
    { id: 14, title: "Tablet Stand", price: 1199, image: "https://m.media-amazon.com/images/I/61kGDXeFZDL._AC_UL320_.jpg" },
    { id: 15, title: "Bluetooth Headset", price: 1799, image: "https://m.media-amazon.com/images/I/61vXz6xg6LL._AC_UL320_.jpg" },
    { id: 16, title: "Smart LED Bulb", price: 499, image: "https://m.media-amazon.com/images/I/61p2hKQbQ+L._AC_UL320_.jpg" },
    { id: 17, title: "Wireless Charger", price: 1599, image: "https://m.media-amazon.com/images/I/61u48FEsQKL._AC_UL320_.jpg" },
    { id: 18, title: "Laptop Cooling Pad", price: 1899, image: "https://m.media-amazon.com/images/I/71pWStiFQBL._AC_UL320_.jpg" },
    { id: 19, title: "Action Camera Mount Kit", price: 1299, image: "https://m.media-amazon.com/images/I/71Q9d6N7xkL._AC_UL320_.jpg" },
    { id: 20, title: "Smart Plug", price: 699, image: "https://m.media-amazon.com/images/I/61lKQWyQ4xL._AC_UL320_.jpg" },
    { id: 21, title: "iPhone 14 Pro", price: 129900, image: "https://m.media-amazon.com/images/I/61bK6PMOC3L._AC_UL320_.jpg" },
    { id: 22, title: "Samsung Galaxy S23", price: 74999, image: "https://m.media-amazon.com/images/I/71qZyM4jR-L._AC_UL320_.jpg" },
    { id: 23, title: "OnePlus 11 5G", price: 56999, image: "https://m.media-amazon.com/images/I/61amb0CfMGL._AC_UL320_.jpg" },
    { id: 24, title: "Google Pixel 8", price: 61999, image: "https://m.media-amazon.com/images/I/71Q8gm97H8L._AC_UL320_.jpg" },
    { id: 25, title: "Xiaomi Redmi Note 12", price: 16999, image: "https://m.media-amazon.com/images/I/71V--WZVUIL._AC_UL320_.jpg" }
];

function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '{}');
}
function setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}
function updateCartCount() {
    document.getElementById('cartCount').textContent = Object.values(getCart()).reduce((a,b)=>a+b,0);
}

function renderCart() {
    const cart = getCart();
    const cartItemsDiv = document.getElementById('cartItems');
    const cartTotalDiv = document.getElementById('cartTotal');
    updateCartCount();
    const ids = Object.keys(cart);
    // Only show cart UI if there is at least one item with quantity > 0
    if (ids.length === 0) {
        if (cartItemsDiv) cartItemsDiv.innerHTML = '';
        if (cartTotalDiv) cartTotalDiv.innerHTML = '';
        return;
    }
    let total = 0;
    cartItemsDiv.innerHTML = '';
    ids.forEach(id => {
        const product = products.find(p => p.id == id);
        if (product && cart[id] > 0) {
            const qty = cart[id];
            const subtotal = qty * product.price;
            total += subtotal;
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <img src="${product.image}" alt="${product.title}" style="width:60px;height:60px;object-fit:contain;">
                <span>${product.title}</span>
                <span>₹${product.price.toLocaleString()} x </span>
                <button class="qty-btn" data-id="${product.id}" data-action="dec">-</button>
                <span class="qty">${qty}</span>
                <button class="qty-btn" data-id="${product.id}" data-action="inc">+</button>
                <span>= ₹${subtotal.toLocaleString()}</span>
                <button class="remove-btn" data-id="${product.id}">Remove</button>
            `;
            cartItemsDiv.appendChild(itemDiv);
        }
    });
    // If after filtering, total is 0, clear totals section
    if (total === 0) {
        if (cartTotalDiv) cartTotalDiv.innerHTML = '';
        return;
    }
    // GST 18%
    const gst = Math.round(total * 0.18);
    const grandTotal = total + gst;
    cartTotalDiv.innerHTML = `Subtotal: ₹${total.toLocaleString()}<br>GST (18%): ₹${gst.toLocaleString()}<br><b>Total: ₹${grandTotal.toLocaleString()}</b><br><button id="orderBtn" class="add-to-cart" style="margin-top:12px;">Order</button>`;

    // Remove functionality
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.onclick = function() {
            const id = this.getAttribute('data-id');
            delete cart[id];
            setCart(cart);
            renderCart();
        };
    });
    // Quantity controls
    document.querySelectorAll('.qty-btn').forEach(btn => {
        btn.onclick = function() {
            const id = this.getAttribute('data-id');
            const action = this.getAttribute('data-action');
            if (action === 'inc') cart[id]++;
            if (action === 'dec' && cart[id] > 1) cart[id]--;
            setCart(cart);
            renderCart();
        };
    });
    // Order button
    const orderBtn = document.getElementById('orderBtn');
    if (orderBtn) {
        orderBtn.onclick = function() {
            showOrderModal(total, gst, grandTotal, cart);
        };
    }
}

function showOrderModal(total, gst, grandTotal, cart) {
    const payment = prompt('Enter payment method (e.g. UPI, Card, COD):', 'UPI');
    if (!payment) return;
    // Prepare order
    const items = Object.keys(cart).map(id => {
        const p = products.find(x => x.id == id);
        return { id, title: p.title, price: p.price.toLocaleString(), qty: cart[id] };
    });
    const order = {
        items,
        payment,
        gst: gst.toLocaleString(),
        total: grandTotal.toLocaleString(),
        date: new Date().toLocaleString()
    };
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    setCart({});
    alert('Order placed successfully!');
    window.location.href = 'orders.html';
}

// Add to Cart logic for product page (index.html)
// This should be in app.js, but for cart.js reference:
window.addToCart = function(productId) {
    const cart = getCart();
    if (cart[productId]) {
        cart[productId]++;
    } else {
        cart[productId] = 1;
    }
    setCart(cart);
    updateCartCount();
    // Update button UI if on product page
    const btn = document.querySelector(`.add-to-cart[data-id='${productId}']`);
    if (btn) {
        btn.textContent = 'Added to Cart';
        btn.disabled = true;
        btn.style.background = '#ccc';
        btn.style.color = '#555';
        btn.style.cursor = 'not-allowed';
    }
};

renderCart();