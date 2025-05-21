document.addEventListener("DOMContentLoaded", () => {
    let cart = [];
    const cartWindow = document.querySelector('.cart-window');
    const cartItemsList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const closeCartBtn = document.getElementById('close-cart');

    document.querySelectorAll(".addToCart").forEach(button => {
        button.addEventListener("click", function () {
            let itemName = this.closest('.menu-item').querySelector('h3').textContent;
            let priceText = this.closest('.menu-item').querySelector('.price').textContent.trim();
            let itemPrice = parseFloat(priceText.replace('₹', '').split(" ")[0]);

            if (!isNaN(itemPrice)) {
                addToCart(itemName, itemPrice);
            } else {
                console.error("Error: Price is NaN for item:", itemName);
            }
        });
    });

    function addToCart(name, price) {
        let existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        updateCart();
    }

    function updateCart() {
        cartItemsList.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            total += item.price * item.quantity;
            let listItem = document.createElement("li");
            listItem.innerHTML = `${item.name} - ₹${item.price.toFixed(2)} x ${item.quantity}`;
            cartItemsList.appendChild(listItem);
        });

        cartTotal.textContent = `Total: ₹${total.toFixed(2)}`;
        cartWindow.style.display = "block";
    }

    closeCartBtn.addEventListener("click", () => {
        cartWindow.style.display = "none";
    });
});
