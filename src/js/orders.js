// Load products data for order display
const products = JSON.parse(localStorage.getItem('productData') || '[]');

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    const count = Object.values(cart).reduce((a, b) => a + b, 0);
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = count > 0 ? count : '';
        cartCount.style.display = count > 0 ? 'inline-block' : 'none';
    }
}

function renderOrders() {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const ordersList = document.getElementById('ordersList');
    
    if (!ordersList) return;
    
    updateCartCount();

    if (orders.length === 0) {
        ordersList.innerHTML = '<p>No orders placed yet.</p>';
        return;
    }

    ordersList.innerHTML = '';
    orders.reverse().forEach((order, idx) => {
        const div = document.createElement('div');
        div.className = 'order-item';
        
        // Create product list with actual product names
        const productList = Object.keys(order.items).map(id => {
            const product = products.find(p => p.id == id);
            const qty = order.items[id];
            if (product) {
                return `<li>${product.title} x ${qty}</li>`;
            } else {
                return `<li>Product ID ${id} x ${qty} (Product not found)</li>`;
            }
        }).join('');
        
        div.innerHTML = `
            <h3>Order #${order.orderId || (orders.length - idx)}</h3>
            <ul class="order-products">
                ${productList}
            </ul>
            <div class="order-summary">
                <span><b>Total:</b> ₹${order.total.toLocaleString()}</span>
            </div>
            <div class="order-date">Placed on: ${order.date}</div>
        `;
        ordersList.appendChild(div);
    });
}

// Initialize orders when page loads
document.addEventListener('DOMContentLoaded', function() {
    renderOrders();
});
