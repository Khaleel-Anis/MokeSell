document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const basketContainer = document.getElementById("basket-items");
    const subtotalElement = document.getElementById("subtotal");
    const shippingElement = document.getElementById("shipping");
    const taxElement = document.getElementById("tax");
    const totalElement = document.getElementById("total");

    let subtotal = 0;
    const shippingFee = 50; // Flat shipping fee
    const taxRate = 0.07;   // 7% tax

    if (cart.length === 0) {
        basketContainer.innerHTML = "<p>Your basket is empty.</p>";
        return;
    }

    cart.forEach((item, index) => {
        subtotal += item.price;

        const itemElement = document.createElement("figure");
        itemElement.classList.add("basket-item");

        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <figcaption>
                <p><strong>${item.name}</strong></p>
                <p>Price: S$${item.price.toFixed(2)}</p>
                <p>Quantity: 1</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            </figcaption>
        `;

        basketContainer.appendChild(itemElement);
    });

    const tax = subtotal * taxRate;
    const total = subtotal + shippingFee + tax;

    subtotalElement.textContent = `S$${subtotal.toFixed(2)}`;
    shippingElement.textContent = `S$${shippingFee.toFixed(2)}`;
    taxElement.textContent = `S$${tax.toFixed(2)}`;
    totalElement.textContent = `S$${total.toFixed(2)}`;
});

function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1); // Remove item at the given index
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload(); // Refresh to reflect changes
}

// Promo Code Logic
document.querySelector(".apply-button").addEventListener("click", (e) => {
    e.preventDefault();
    const promoCode = document.querySelector(".promo-code").value.trim().toUpperCase();
    let subtotal = parseFloat(document.getElementById("subtotal").textContent.replace("S$", ""));
    const shippingFee = parseFloat(document.getElementById("shipping").textContent.replace("S$", ""));
    const tax = parseFloat(document.getElementById("tax").textContent.replace("S$", ""));

    if (promoCode === "DISCOUNT10") {
        const discount = subtotal * 0.10; // 10% Discount
        subtotal -= discount;

        const total = subtotal + shippingFee + tax; // Recalculate the total
        document.getElementById("subtotal").textContent = `S$${subtotal.toFixed(2)}`;
        document.getElementById("total").textContent = `S$${total.toFixed(2)}`;

        alert("Promo code applied! You got 10% off.");
    } else {
        alert("Invalid promo code.");
    }
});


// Checkout Button Logic
document.getElementById("checkoutBtn").addEventListener("click", () => {
    alert("Thank you for your purchase!");
    localStorage.removeItem("cart"); // Clear the cart after checkout
    window.location.href = "confirmation.html"; // Redirect to confirmation page
});