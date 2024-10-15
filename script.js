document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: "Product 1", price: 29.9 },
        { id: 2, name: "Product 2", price: 19.9 },
        { id: 3, name: "Product 3", price: 59.9 },
        { id: 4, name: "Product 4", price: 39.9 }
    ];

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productList = document.getElementById("product-list");
    const cartItems = document.getElementById("cart-items");
    const emptyCartMessage = document.getElementById("empty-cart");
    const cartTotalMessage = document.getElementById("cart-total");
    const totalPriceDisplay = document.getElementById("total-price");
    const checkOutBtn = document.getElementById("checkout-btn");

    // Display products
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <span>${product.name} - $${product.price.toFixed(2)}</span>
            <button data-id="${product.id}">Add to cart</button>
        `;
        productList.appendChild(productDiv);
    });

    // Add to cart
    productList.addEventListener('click', (e) => {
        if (e.target.tagName === "BUTTON") {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            addToCart(product);
            renderCart();
        }
    });

    // Add product to cart and update localStorage
    function addToCart(product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Remove product from cart
    function removeFromCart(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    // Render cart
    function renderCart() {
        cartItems.innerHTML = "";
        let totalPrice = 0;
        if (cart.length > 0) {
            emptyCartMessage.classList.add("hidden");
            cartTotalMessage.classList.remove("hidden");

            cart.forEach((item, index) => {
                totalPrice += item.price;
                const cartItem = document.createElement('div');
                cartItem.innerHTML = `
                    ${item.name} - $${item.price.toFixed(2)}
                    <button data-index="${index}">Remove</button>
                `;
                cartItems.appendChild(cartItem);
            });

            totalPriceDisplay.textContent = totalPrice.toFixed(2);
        } else {
            emptyCartMessage.classList.remove("hidden");
            cartTotalMessage.classList.add("hidden");
            totalPriceDisplay.textContent = "0.00";
        }
    }

    // Remove button event listener
    cartItems.addEventListener('click', (e) => {
        if (e.target.tagName === "BUTTON") {
            const index = parseInt(e.target.getAttribute('data-index'));
            removeFromCart(index);
        }
    });

    // Checkout
    checkOutBtn.addEventListener('click', () => {
        cart.length = 0;
        localStorage.setItem('cart', JSON.stringify(cart));
        alert("Checked out successfully");
        renderCart();
    });

    // Initial cart rendering
    renderCart();
});
