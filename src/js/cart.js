// Load products and cart data
const products = JSON.parse(localStorage.getItem('productData') || '[]');
const cart = JSON.parse(localStorage.getItem('cart') || '{}');

function setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (!cartCount) return;
    
    const count = Object.values(cart).reduce((a, b) => a + b, 0);
    cartCount.textContent = count > 0 ? count : '';
    cartCount.style.display = count > 0 ? 'inline-block' : 'none';
}

// Helper function to parse price string to number
function parsePrice(priceString) {
    if (!priceString) return 0;
    // Remove ₹ symbol and commas, then convert to number
    return parseInt(priceString.replace(/[₹,\s]/g, '')) || 0;
}

function renderCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    const cartTotalDiv = document.getElementById('cartTotal');
    
    if (!cartItemsDiv || !cartTotalDiv) return;
    
    updateCartCount();
    const ids = Object.keys(cart);
    
    if (ids.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
        cartTotalDiv.innerHTML = '';
        return;
    }

    let total = 0;
    cartItemsDiv.innerHTML = '';
    
    ids.forEach(id => {
        const product = products.find(p => p.id == id);
        if (!product) {
            // Remove invalid product from cart
            delete cart[id];
            setCart(cart);
            return;
        }
        
        const qty = cart[id];
        const price = parsePrice(product.price);
        const subtotal = qty * price;
        total += subtotal;
        
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <span>${product.title}</span>
            <span>₹${product.price} x </span>
            <button class="qty-btn" data-id="${id}" data-action="dec">-</button>
            <span class="qty">${qty}</span>
            <button class="qty-btn" data-id="${id}" data-action="inc">+</button>
            <span>= ₹${subtotal.toLocaleString()}</span>
            <button class="remove-btn" data-id="${id}">Remove</button>
        `;
        cartItemsDiv.appendChild(itemDiv);
    });

    const gst = Math.round(total * 0.18);
    const grandTotal = total + gst;
    cartTotalDiv.innerHTML = `
        <div class="cart-summary">
            <div>Subtotal: ₹${total.toLocaleString()}</div>
            <div>GST (18%): ₹${gst.toLocaleString()}</div>
            <div class="total-amount"><b>Total: ₹${grandTotal.toLocaleString()}</b></div>
            <button id="orderBtn" class="add-to-cart">Place Order</button>
        </div>
    `;

    // Add event listeners for quantity buttons
    document.querySelectorAll('.qty-btn').forEach(btn => {
        btn.onclick = () => {
            const id = btn.dataset.id;
            const action = btn.dataset.action;
            
            if (action === 'inc') {
                cart[id]++;
            } else if (action === 'dec' && cart[id] > 1) {
                cart[id]--;
            }
            
            setCart(cart);
            renderCart();
        };
    });

    // Add event listeners for remove buttons
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.onclick = () => {
            delete cart[btn.dataset.id];
            setCart(cart);
            renderCart();
        };
    });

    // Add event listener for order button
    const orderBtn = document.getElementById('orderBtn');
    if (orderBtn) {
        orderBtn.onclick = () => {
            const orders = JSON.parse(localStorage.getItem('orders') || '[]');
            const orderData = {
                items: { ...cart },
                total: grandTotal,
                date: new Date().toLocaleString(),
                orderId: Date.now()
            };
            orders.push(orderData);
            localStorage.setItem('orders', JSON.stringify(orders));
            localStorage.removeItem('cart');
            alert('Order placed successfully!');
            window.location.href = 'orders.html';
        };
    }
}

// Initialize cart when page loads
document.addEventListener('DOMContentLoaded', function() {
    renderCart();
});
