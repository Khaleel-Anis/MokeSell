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

// ✅ Remove Item from Cart
function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}

// ✅ Apply Promo or Voucher Code
document.querySelector(".apply-button").addEventListener("click", (e) => {
    e.preventDefault();
    const promoCode = document.querySelector(".promo-code").value.trim().toUpperCase();
    let subtotal = parseFloat(document.getElementById("subtotal").textContent.replace("S$", ""));
    const shippingFee = parseFloat(document.getElementById("shipping").textContent.replace("S$", ""));
    const tax = parseFloat(document.getElementById("tax").textContent.replace("S$", ""));

    const storedVoucher = localStorage.getItem("voucherCode"); // ✅ Get stored voucher code

    let discount = 0;

    if (promoCode === "DISCOUNT10") {
        discount = subtotal * 0.10; // 10% Discount
        alert("Promo code applied! You got 10% off.");
    } 
    else if (promoCode === storedVoucher) {
        const discountPercentage = parseInt(promoCode.match(/\d+/)) || 5; // Extract % from voucher
        discount = subtotal * (discountPercentage / 100); 

        alert(`Voucher applied! You got ${discountPercentage}% off.`);
    } 
    else {
        alert("Invalid promo code.");
        return;
    }

    subtotal -= discount;
    const total = subtotal + shippingFee + tax;

    document.getElementById("subtotal").textContent = `S$${subtotal.toFixed(2)}`;
    document.getElementById("total").textContent = `S$${total.toFixed(2)}`;
});

// ✅ Checkout Logic
document.getElementById("checkoutBtn").addEventListener("click", () => {
    alert("Thank you for your purchase!");
    localStorage.removeItem("cart");        // Clear the cart
    localStorage.removeItem("voucherCode"); // Clear voucher after use
    window.location.href = "confirmation.html";
});
const voucherCode = localStorage.getItem("voucher_code");

if (voucherCode) {
    alert(`You have an active voucher: ${voucherCode}`);
    // Apply discount logic here if needed
}

