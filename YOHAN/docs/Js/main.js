let cart = [];
let cartVisible = false;
let favorites = [];

// Initialize cart and favorites from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }

    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
        favorites = JSON.parse(savedFavorites);
    }
});

function addToCart(productName, productPrice, quantityId) {
    const quantity = parseFloat(document.getElementById(quantityId).value); // Use parseFloat for fractional quantities

    let item = cart.find(item => item.name === productName);
    if (item) {
        item.quantity += quantity;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSubtotal = document.getElementById('cart-subtotal');
    cartItemsContainer.innerHTML = '';
    let subtotal = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        cartItemsContainer.innerHTML += `
            <p>
                ${item.name} x ${item.quantity} - Rs${itemTotal.toFixed(2)}
                <button onclick="removeFromCart(${index})">Remove</button>
            </p>`;
    });

    cartSubtotal.innerText = `Subtotal: Rs${subtotal.toFixed(2)}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function toggleCart() {
    cartVisible = !cartVisible;
    const cartContent = document.getElementById('cart-content');
    const cartToggleButton = document.getElementById('cart-toggle');

    if (cartVisible) {
        cartContent.classList.add('open');
        cartToggleButton.innerText = 'Close Cart';
    } else {
        cartContent.classList.remove('open');
        cartToggleButton.innerText = 'Open Cart';
    }
}

function addToFavorites(productElement) {
    const productName = productElement.querySelector('.product-name').innerText;
    const productPrice = productElement.querySelector('.product-price').innerText;

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    let item = favorites.find(item => item.name === productName);
    if (!item) {
        favorites.push({ name: productName, price: productPrice });
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('Product added to favorites!');
    } else {
        alert('Product is already in favorites.');
    }
}

function applyFavorites() {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.length === 0) {
        alert('No favorites to apply.');
        return;
    }

    favorites.forEach(fav => {
        let item = cart.find(cartItem => cartItem.name === fav.name);
        if (item) {
            item.quantity += 1; // Apply favorite by adding one more item to the cart
        } else {
            cart.push({ ...fav, quantity: 1 });
        }
    });

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    alert('Favorites applied to cart!');
}

document.getElementById('checkout-button').addEventListener('click', () => {
    // Redirect to the checkout page
    window.location.href = 'checkout.html';
});
