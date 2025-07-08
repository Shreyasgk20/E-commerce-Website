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

const products = JSON.parse(localStorage.getItem('productData') || '[]');

function renderCart() {
  const cart = getCart();
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
    if (!product) return;
    const qty = cart[id];
    const price = parseInt(product.price.replace(/[^\d]/g, ''));
    const subtotal = qty * price;
    total += subtotal;
    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';
    itemDiv.innerHTML = `<img src="${product.image}" alt="${product.title}"><span>${product.title}</span><span>₹${product.price} x </span><button class="qty-btn" data-id="${id}" data-action="dec">-</button><span class="qty">${qty}</span><button class="qty-btn" data-id="${id}" data-action="inc">+</button><span>= ₹${subtotal.toLocaleString()}</span><button class="remove-btn" data-id="${id}">Remove</button>`;
    cartItemsDiv.appendChild(itemDiv);
  });
  const gst = Math.round(total * 0.18);
  const grandTotal = total + gst;
  cartTotalDiv.innerHTML = `<div class="cart-summary"><div>Subtotal: ₹${total.toLocaleString()}</div><div>GST (18%): ₹${gst.toLocaleString()}</div><div class="total-amount"><b>Total: ₹${grandTotal.toLocaleString()}</b></div><button id="orderBtn" class="add-to-cart">Place Order</button></div>`;
  document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.onclick = () => {
      const id = btn.dataset.id;
      const action = btn.dataset.action;
      const cart = getCart();
      if (action === 'inc') cart[id]++;
      else if (action === 'dec' && cart[id] > 1) cart[id]--;
      setCart(cart);
      renderCart();
    };
  });
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.onclick = () => {
      const cart = getCart();
      delete cart[btn.dataset.id];
      setCart(cart);
      renderCart();
    };
  });
  const orderBtn = document.getElementById('orderBtn');
  if (orderBtn) {
    orderBtn.onclick = () => {
      const cart = getCart();
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push({ items: { ...cart }, total: grandTotal, date: new Date().toLocaleString(), orderId: Date.now() });
      localStorage.setItem('orders', JSON.stringify(orders));
      localStorage.removeItem('cart');
      alert('Order placed successfully!');
      window.location.href = 'orders.html';
    };
  }
}
document.addEventListener('DOMContentLoaded', renderCart);
