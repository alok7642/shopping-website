let cart = [];

document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function () {
        const item = {
            id: this.dataset.id,
            name: this.dataset.name,
            price: this.dataset.price
        };
        
        // Load existing cart from localStorage (if any)
        cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Add the new item
        cart.push(item);

        // Save back to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Redirect to cart page
        window.location.href = 'cart.html';
    });
});
