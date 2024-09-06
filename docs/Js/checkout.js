document.addEventListener('DOMContentLoaded', () => {
    const cartSummary = document.getElementById('cart-summary');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length > 0) {
        cartSummary.innerHTML = '<h2>Cart Summary</h2>';
        cart.forEach(item => {
            cartSummary.innerHTML += `<p>
            <img src="${item.image}" alt="${item.name}" width="50" height="50">
            ${item.name} x ${item.quantity} - Rs${(item.price * item.quantity).toFixed(2)}
            </p>`;
        });
    } else {
        cartSummary.innerHTML = '<p>No items in your cart.</p>';
    }
    
    document.getElementById('checkout-form').addEventListener('submit', (event) => {
        event.preventDefault();

        if (validateForm()) {
            showThankYouMessage();
        }
    });
});
//validate form  fields
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const zip = document.getElementById('zip').value.trim();
    const cardNumber = document.getElementById('card-number').value.trim();
    const expiryMonth = document.getElementById('expiry-month').value.trim();
    const expiryYear = document.getElementById('expiry-year').value.trim();
    const cvv = document.getElementById('cvv').value.trim();

    if (!name || !email || !address || !city || !zip || !cardNumber || !expiryMonth || !expiryYear || !cvv) {
        alert('Please fill in all fields.');
        return false;
    }

    if (!/^\d{16}$/.test(cardNumber)) {
        alert('Invalid card number.');
        return false;
    }

    if (!/^\d{2}$/.test(expiryMonth) || !/^\d{2}$/.test(expiryYear)) {
        alert('Invalid expiry date. Use MM and YY format.');
        return false;
    }

    if (parseInt(expiryMonth) < 1 || parseInt(expiryMonth) > 12) {
        alert('Invalid expiry month.');
        return false;
    }

    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1; // getMonth() returns month from 0-11

    if (parseInt(expiryYear) < currentYear || (parseInt(expiryYear) === currentYear && parseInt(expiryMonth) < currentMonth)) {
        alert('Your card is expired. Please enter a valid card.');
        return false;
    }

    if (!/^\d{3}$/.test(cvv)) {
        alert('Invalid CVV.');
        return false;
    }

    return true;
}
//thankyou message
function showThankYouMessage() {
    document.getElementById('checkout-form').classList.add('hidden');
    const thankYouMessage = document.getElementById('thank-you-message');
    thankYouMessage.classList.remove('hidden');

    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 4); // Assuming 4 days for delivery
    document.getElementById('delivery-date').innerText = `Estimated Delivery Date: ${deliveryDate.toDateString()}`;
}
