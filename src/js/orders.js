function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '{}');
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

const products = JSON.parse(localStorage.getItem('productData') || '[]');

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
  orders.reverse().forEach(order => {
    const div = document.createElement('div');
    div.className = 'order-item';
    const productList = Object.keys(order.items).map(id => {
      const product = products.find(p => p.id == id);
      const qty = order.items[id];
      return product ? `<li>${product.title} x ${qty}</li>` : `<li>Product ID ${id} x ${qty}</li>`;
    }).join('');
    div.innerHTML = `<h3>Order #${order.orderId}</h3><ul class="order-products">${productList}</ul><div class="order-summary"><span><b>Total:</b> ₹${order.total.toLocaleString()}</span></div><div class="order-date">Placed on: ${order.date}</div>`;
    ordersList.appendChild(div);
  });
}
document.addEventListener('DOMContentLoaded', renderOrders);
