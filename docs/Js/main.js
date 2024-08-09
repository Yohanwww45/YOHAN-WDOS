let cart = [];
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

function addToCart(productName, productPrice, quantityId, productImage) {
    const quantity = parseFloat(document.getElementById(quantityId).value);

    if (quantity <= 0) {
        alert('Please enter a valid quantity');
        return;
    }

    let item = cart.find(item => item.name === productName);
    if (item) {
        item.quantity += quantity;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: quantity, image: productImage });
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
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" width="50" height="50">
                <p>${item.name} x ${item.quantity} - Rs${itemTotal.toFixed(2)}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>`;
    });

    cartSubtotal.innerText = `Subtotal: Rs${subtotal.toFixed(2)}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function addToFavorites() {
    if (cart.length === 0) {
        alert('Your cart is empty.');
        return;
    }

    cart.forEach(cartItem => {
        let favoriteItem = favorites.find(favItem => favItem.name === cartItem.name);
        if (!favoriteItem) {
            favorites.push({ name: cartItem.name, price: cartItem.price, image: cartItem.image });
        }
    });

    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert('Products in your cart have been added to favorites!');
}

function applyFavorites() {
    if (favorites.length === 0) {
        alert('You have no favorites saved.');
        return;
    }

    favorites.forEach(favItem => {
        let cartItem = cart.find(item => item.name === favItem.name);
        if (cartItem) {
            alert(`Product "${favItem.name}" is already in the cart.`);
        } else {
            cart.push({ ...favItem, quantity: 1 });
        }
    });

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    alert('Favorites applied to cart!');
}

function toggleCart() {
    const cartContent = document.getElementById('cart-content');
    const cartToggleButton = document.getElementById('cart-toggle');
    cartContent.classList.toggle('open');
    cartToggleButton.innerText = cartContent.classList.contains('open') ? 'Close Cart' : 'Open Cart';
}

document.getElementById('checkout-button').addEventListener('click', () => {
    window.location.href = 'checkout.html';
});
