document.addEventListener('DOMContentLoaded', async () => {
    const API_URL = "https://fedassignment-6369.restdb.io/rest/products";
    const USER_API_URL = "https://fedassignment-6369.restdb.io/rest/user-account";
    const API_KEY = "6796ddca9cbb2707d665c482";
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    let product = {};

    if (!productId) {
        document.querySelector('main').innerHTML = "<p>Product not found.</p>";
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${productId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": API_KEY,
            },
        });

        product = await response.json();

        document.getElementById('product-name').textContent = product.name || 'No Name Available';
        document.getElementById('product-price').textContent = `S$${product.price.toFixed(2)}` || 'Price Unavailable';

        document.getElementById('product-details').innerHTML = `
            <p><strong>Brand:</strong> ${product.brand || 'N/A'}</p>
            <p><strong>Condition:</strong> ${product.condition || 'N/A'}</p>
            <p><strong>Category:</strong> ${product.category || 'N/A'}</p>
        `;

        document.getElementById('product-description').innerHTML = `
            <h2>Description</h2>
            <p>${product.description || 'No description provided.'}</p>
        `;

        const dealMethods = Array.isArray(product['deal methods']) 
            ? product['deal methods'].join(', ') 
            : product['deal methods'] || 'Meet-up';

        document.getElementById('deal-methods').innerHTML = `
            <h2>Deal Methods</h2>
            <p>${dealMethods}</p>
        `;

        // ✅ Fetch Seller Details Using sellerId
        if (product.sellerId) {
            const sellerResponse = await fetch(`${USER_API_URL}/${product.sellerId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-apikey": API_KEY,
                },
            });

            if (sellerResponse.ok) {
                const seller = await sellerResponse.json();
                document.getElementById('seller-name').textContent = seller.name || 'Unknown Seller';
                document.getElementById('seller-pic').src = seller.profileImage || 'images/seller-profile.png';
            } else {
                document.getElementById('seller-name').textContent = 'Unknown Seller';
            }
        } else {
            document.getElementById('seller-name').textContent = 'Unknown Seller';
        }

        const imageSlider = document.getElementById('image-slider');
        imageSlider.innerHTML = '';

        const images = Array.isArray(product['product image'])
            ? product['product image']
            : [product['product image']];

        images.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.src = image || 'images/placeholder-product.png';
            imgElement.alt = product.name;
            imgElement.classList.add('main-image');
            imageSlider.appendChild(imgElement);
        });

    } catch (error) {
        console.error("Error fetching product or seller details:", error);
        document.querySelector('main').innerHTML = "<p>Error loading product details.</p>";
    }

    document.getElementById("buyButton").addEventListener("click", () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        const productToAdd = {
            id: product._id,
            name: product.name,
            price: product.price,
            image: product["product image"] || 'images/placeholder-product.png'
        };

        cart.push(productToAdd);
        localStorage.setItem("cart", JSON.stringify(cart));

        alert(`${product.name} has been added to your cart!`);
        window.location.href = "cart-page.html";
    });
});