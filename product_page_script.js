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

        loadSimilarListings(product.category, product._id);

    } catch (error) {
        console.error("Error fetching product or seller details:", error);
        document.querySelector('main').innerHTML = "<p>Error loading product details.</p>";
    }

    let currentSlide = 0;
    document.querySelector('.prev').addEventListener('click', () => {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlider();
    }
});
    document.querySelector('.next').addEventListener('click', () => {
    if (currentSlide < images.length - 1) {
        currentSlide++;
        updateSlider();
    }
});

    function updateSlider() {
    const slider = document.getElementById('image-slider');
    const slideWidth = document.querySelector('.main-image').offsetWidth;
    slider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

    document.getElementById("makeOfferButton").addEventListener("click", () => {
        const buyerId = localStorage.getItem("userID");
        const sellerId = product.sellerId;

        if (!buyerId) {
            alert("Please log in to make an offer.");
            window.location.href = "login-page.html";
            return;
        }

        window.location.href = `chat_page.html?buyerId=${buyerId}&sellerId=${sellerId}`;
    });

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

        const existingItem = cart.find(item => item.id === product._id);
        if (!existingItem) {
            cart.push(productToAdd);
        } else {
            alert('Item already in cart!');
        }
    });

    document.getElementById("addToWishlistButton").addEventListener("click", () => {
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

        const productToAdd = {
            id: product._id,
            name: product.name,
            price: product.price,
            image: product["product image"] || 'images/placeholder-product.png'
        };

        // Check if the product already exists in the wishlist
        const exists = wishlist.some(item => item.id === productToAdd.id);

        if (!exists) {
            wishlist.push(productToAdd);
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
            alert(`${product.name} has been added to your wishlist! ❤️`);
        } else {
            alert(`${product.name} is already in your wishlist.`);
        }
    });

    async function loadSimilarListings(category, currentProductId) {
        try {
            const response = await fetch(`${API_URL}?q={"category":"${category}"}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-apikey": API_KEY,
                },
            });

            const products = await response.json();
            const similarListingsContainer = document.querySelector("#similar-listings-container");

            products.filter(item => item._id !== currentProductId).forEach(item => {
                const listing = document.createElement("article");
                listing.classList.add("listing");

                listing.innerHTML = `
                    <figure class="listing-image">
                        <img src="${Array.isArray(item['product image']) ? item['product image'][0] : item['product image'] || 'images/placeholder-product.png'}" alt="${item.name}">
                    </figure>
                    <p class="product-name">${item.name}</p>
                    <p class="product-price">S$${item.price.toFixed(2)}</p>
                    <p class="product-condition">Condition: ${item.condition || 'N/A'}</p>
                `;

                similarListingsContainer.appendChild(listing);
            });

        } catch (error) {
            console.error("Error loading similar listings:", error);
        }
    }
});