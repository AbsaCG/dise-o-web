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
        li.innerHTML = `
            ${item.name} - $${item.price}
            <button class="btn" onclick="showChangeOptions(${index})">Cambiar</button>
            <button class="btn" onclick="removeFromCart(${index})">Eliminar</button>
            <div id="change-options-${index}" class="change-options" style="display:none; margin-top:5px;">
                <select id="product-select-${index}">
                    <option value="Smartphone,500">Smartphone - $500</option>
                    <option value="Tablet,300">Tablet - $300</option>
                    <option value="Teclado Gamer,60">Teclado Gamer - $60</option>
                    <option value="Monitor Gaming,100">Monitor Gaming - $100</option>
                </select>
                <button class="btn" onclick="changeProduct(${index})">Aplicar cambio</button>
            </div>
        `;
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

function showChangeOptions(index) {
    const optionsDiv = document.getElementById(`change-options-${index}`);
    if (optionsDiv) {
        optionsDiv.style.display = optionsDiv.style.display === 'none' ? 'block' : 'none';
    }
}

function changeProduct(index) {
    const select = document.getElementById(`product-select-${index}`);
    if (!select) return;

    const [newName, newPrice] = select.value.split(',');
    cart[index].name = newName;
    cart[index].price = parseFloat(newPrice);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

document.addEventListener('DOMContentLoaded', () => {
    renderCart();

    const form = document.getElementById('checkout-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Pago realizado con éxito.');
            localStorage.removeItem('cart');
            window.location.href = 'index.html';
        });
    }
});