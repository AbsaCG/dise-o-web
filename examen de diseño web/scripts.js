let cart = JSON.parse(localStorage.getItem('cart')) || [];

const Function = document.getElementById('toggleMode');
const body = document.body;
Function.addEventListener('click', function () {
  body.classList.toggle('cambiar');

  // Cambiar icono dinámicamente
  if (body.classList.contains('cambiar')) {
    Function.classList.remove('fa-moon-o');
    Function.classList.add('fa-sun-o');
  } else {
    Function.classList.remove('fa-sun-o');
    Function.classList.add('fa-moon-o');
  }
});

function addToCart(name, price, image='') {
    const product = { name, price, image};
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(name + ' ha sido agregado al carrito.');
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const emptyMessage = document.getElementById('empty-cart-message');

    if (!cartItems || !cartTotal || !emptyMessage) return;

    cartItems.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';
    }

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.classList.add('cart-item');
        li.innerHTML = `
            <div class="item-info">
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <strong>${item.name}</strong><br>
                    <span>$${item.price}</span>
                </div>
            </div>

            <details class="product-change">
                <summary><i class="fa fa-pencil"></i> Cambiar producto</summary>
                <select id="product-select-${index}">
                    <option value="Smartphone,500,https://www.boxesonline.pe/wp-content/uploads/2018/05/Smartphone-X-seri-02.jpg">Smartphone - $500</option>
                    <option value="Smartphone Pro,900,https://i.blogs.es/4f8806/iphone-14-pro-analisis-01/1366_2000.jpeg">Smartphone Pro - $900</option>
                    <option value="Tablet,300,https://http2.mlstatic.com/D_Q_NP_699043-MLU76065734127_042024-O.webp">Tablet - $300</option>
                    <option value="Tablet Pro 10\\",450,https://images.samsung.com/is/image/samsung/p6pim/pe/sm-x200nzaalto/gallery/pe-galaxy-tab-a8-sm-x200-sm-x200nzaalto-thumb-530381080?$344_344_PNG$">Tablet Pro 10" - $450</option>
                    <option value="Teclado Gamer,60,https://media.falabella.com/falabellaPE/128070139_01/w=800,h=800,fit=pad">Teclado Gamer - $60</option>
                    <option value="Mouse Gamer,35,https://media.istockphoto.com/id/1182545361/es/foto/rat%C3%B3n-de-juego-inal%C3%A1mbrico-negro-con-fondo-de-color-rosa.jpg?s=612x612&w=0&k=20&c=KOrz7ZPVZ1GqBM7WyEwOaAhr9AfMHOKq54VpvKvo6jQ=">Mouse Gamer - $35</option>
                    <option value="Monitor Gaming,100,https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq0YvUzys7BrDTapxQ-N8E_uyB8vuleHX-2w&s">Monitor Gaming - $100</option>
                    <option value="Monitor UltraWide,250,https://images.unsplash.com/photo-1603791440384-56cd371ee9a7">Monitor UltraWide - $250</option>
                </select>
                <button class="btn small" onclick="changeProduct(${index})"><i class="fa fa-check"></i> Aplicar</button>
            </details>

            <button class="btn danger" onclick="removeFromCart(${index})"><i class="fa fa-times"></i> Eliminar</button>
        `;
        cartItems.appendChild(li);
        total += item.price;
    });

    cartTotal.textContent = total.toFixed(2);
}

function clearCart() {
    if (confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
        cart = [];
        localStorage.removeItem('cart');
        renderCart();
    }
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



