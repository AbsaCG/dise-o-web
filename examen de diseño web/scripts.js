let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price) {
    const product = { name, price };
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(name + ' ha sido agregado al carrito.');
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    if (!cartItems || !cartTotal) return;

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = item.name + ' - $' + item.price +
            ' <button class="btn" onclick="removeFromCart(' + index + ')">Eliminar</button>';
        cartItems.appendChild(li);
        total += item.price;
    });

    cartTotal.textContent = total;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    const form = document.getElementById('checkout-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Pago realizado con éxito.');
            localStorage.removeItem('cart');
            window.location.href = 'index.html';
        });
    }
});
const toggleButton= document.getElementById ("modoOscuro");

toggleButton.addEventListener("click", ()=>{
    document.body.classList.toggle("modo-oscuro");

    if (document.body.classList.contains("modo-oscuro")){
        toggleButton.textContent="Modo Claro";
    } else{
        toggleButton.textContent="Modo Oscuro"
    }
});
