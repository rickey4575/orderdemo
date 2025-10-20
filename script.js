let cart = [];

function addToCart(itemName, price) {
  const existing = cart.find(i => i.name === itemName);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name: itemName, price, qty: 1 });
  }
  renderCart();
}

function renderCart() {
  const cartList = document.getElementById('cart');
  cartList.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    const li = document.createElement('li');
    li.textContent = `${item.qty} x ${item.name} – £${item.price * item.qty}`;
    cartList.appendChild(li);
  });

  document.getElementById('total').textContent = `Total: £${total}`;
}

// When user submits the order
document.getElementById('orderForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const time = document.getElementById('time').value;

  const orderData = {
    name,
    phone,
    time,
    cart,
    timestamp: new Date().toISOString()
  };

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwguwqBsFuD2X0MVBHefQNnLnhQUzLrN8G9OcTQcfaa9meBeODD_HayOF39RfGgb3eu/exec",   // <-- paste your Google Script web app URL here
      {
        method: "POST",
        mode: "no-cors", // simplifies CORS handling
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
      }
    );

    alert('✅ Order submitted successfully!');
  } catch (error) {
    console.error('Error submitting order:', error);
    alert('❌ Error sending order. Please try again.');
  }

  // Reset
  cart = [];
  renderCart();
  e.target.reset();
});
