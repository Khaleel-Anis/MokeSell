document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const basketContainer = document.getElementById("basket-items");
    const subtotalElement = document.getElementById("subtotal");
    const shippingElement = document.getElementById("shipping");
    const taxElement = document.getElementById("tax");
    const totalElement = document.getElementById("total");

    const API_KEY = "67a87718f247e57112117e1a"; // Replace with your actual API key
    const API_URL = "https://mokesell-cd4f.restdb.io/rest/products";

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
    
        // Check if item.image is an array, otherwise treat it as a single image
        const images = Array.isArray(item.image) ? item.image : [item.image];
        const mainImage = images[0] || "images/placeholder-product.png";  // Default placeholder if no image
    
        itemElement.innerHTML = `
            <img src="${mainImage}" alt="${item.name}">
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

        const images = item.image.split(","); // Split multiple images
        const mainImage = images[0]; // Display the first image

        itemElement.innerHTML = `
            <img src="${mainImage}" alt="${item.name}">
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

//  Remove Item from Cart
function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}

//  Apply Promo or Voucher Code
document.querySelector(".apply-button").addEventListener("click", (e) => {
    e.preventDefault();
    const promoCode = document.querySelector(".promo-code").value.trim().toUpperCase();
    let subtotal = parseFloat(document.getElementById("subtotal").textContent.replace("S$", ""));
    const shippingFee = parseFloat(document.getElementById("shipping").textContent.replace("S$", ""));
    const tax = parseFloat(document.getElementById("tax").textContent.replace("S$", ""));

    const storedVoucher = localStorage.getItem("voucherCode"); //  Get stored voucher code

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

//  Loader Functions
function showLoader() {
    const loader = document.createElement("div");
    loader.id = "loader";
    loader.textContent = "Processing your order...";
    loader.style.position = "fixed";
    loader.style.top = "50%";
    loader.style.left = "50%";
    loader.style.transform = "translate(-50%, -50%)";
    loader.style.padding = "20px";
    loader.style.backgroundColor = "#fff";
    loader.style.border = "2px solid black";
    loader.style.zIndex = "9999";
    document.body.appendChild(loader);
}

function hideLoader() {
    const loader = document.getElementById("loader");
    if (loader) loader.remove();
}

//  Checkout Logic
document.getElementById("checkoutBtn").addEventListener("click", async () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const API_KEY = "67a87718f247e57112117e1a";
    const API_URL = "https://mokesell-cd4f.restdb.io/rest/products";

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    showLoader();

    try {
        for (const item of cart) {
            const response = await fetch(`${API_URL}/${item.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "x-apikey": API_KEY,
                }
            });

            if (response.ok) {
                console.log(`Product ${item.name} removed from RestDB.`);
            } else {
                console.error(`Failed to remove product ${item.name}. Status: ${response.status}`);
            }
        }

        hideLoader();

        alert("Thank you for your purchase!");
        localStorage.removeItem("cart");
        window.location.href = "index.html"; //  Redirect should work now
    } catch (error) {
        console.error("Checkout Error:", error);
        alert("Something went wrong during checkout. Please try again.");
        hideLoader();
    }
});