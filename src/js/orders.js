// Orders page logic
function getOrders() {
    return JSON.parse(localStorage.getItem('orders') || '[]');
}

function updateCartCount() {
    const el = document.getElementById('cartCount');
    if (el) el.textContent = JSON.parse(localStorage.getItem('cart') || '[]').length;
}

function renderOrders() {
    updateCartCount();
    const orders = getOrders();
    const ordersList = document.getElementById('ordersList');
    if (!orders.length) {
        ordersList.innerHTML = '<p>No orders placed yet.</p>';
        return;
    }
    ordersList.innerHTML = '';
    orders.forEach((order, idx) => {
        const div = document.createElement('div');
        div.className = 'order-item';
        div.innerHTML = `
            <h3>Order #${orders.length - idx}</h3>
            <ul class="order-products">
                ${order.items.map(item => `<li>${item.title} x ${item.qty} <span>₹${item.price} each</span></li>`).join('')}
            </ul>
            <div class="order-summary">
                <span>Payment: <b>${order.payment}</b></span> |
                <span>GST: <b>₹${order.gst}</b></span> |
                <span>Total: <b>₹${order.total}</b></span>
            </div>
            <div class="order-date">Placed on: ${order.date}</div>
        `;
        ordersList.appendChild(div);
    });
}

renderOrders();
