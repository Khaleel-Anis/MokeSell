document.addEventListener("DOMContentLoaded", async function () {
    let category = "";
    if (document.title.includes("Clothing")) {
        category = "Clothing";
    } else if (document.title.includes("Electronics")) {
        category = "Electronics";
    } else if (document.title.includes("Luxury")) {
        category = "Luxury Items";
    } else if (document.title.includes("All Products")) {
        category = "";
    }

    console.log(`Fetching '${category || "All"}' products...`);

    const API_URL = "https://mokesell-cd4f.restdb.io/rest/products";
    const API_KEY = "67a87718f247e57112117e1a";

    const query = category ? `?q=${encodeURIComponent(JSON.stringify({ category }))}` : "";
    const requestUrl = `${API_URL}${query}`;

    try {
        const response = await fetch(requestUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": API_KEY,
            },
        });

        const products = await response.json();
        console.log(`Fetched '${category || "All"}' Products:`, products);

        displayProducts(products, "trending-products");
        displayProducts(products, "sale-products");
        displayProducts(products, "recent-products");

    } catch (error) {
        console.error(`Error fetching '${category || "All"}' products:`, error);
    }
});

async function getSellerName(sellerId) {
    const API_KEY = "67a87718f247e57112117e1a";
    const USER_API_URL = `https://mokesell-cd4f.restdb.io/rest/user-account/${sellerId}`;

    try {
        const response = await fetch(USER_API_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": API_KEY,
            },
        });

        if (response.ok) {
            const user = await response.json();
            return user.name || "Unknown Seller";
        } else {
            return "Unknown Seller";
        }
    } catch (error) {
        console.error("Error fetching seller data:", error);
        return "Unknown Seller";
    }
}

async function displayProducts(products, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = ""; // Clear existing products

    for (const product of products) {
        const sellerName = await getSellerName(product.sellerId);  //  Fetch seller name

        //  Handle multiple images (display the first one)
        const productImages = Array.isArray(product['product image']) 
            ? product['product image'] 
            : [product['product image']];
        const mainImage = productImages[0] || "images/placeholder-product.png";  //  Fallback if no image

        const productElement = document.createElement("article");
        productElement.classList.add("product");

        productElement.innerHTML = `
            <p>Seller: ${sellerName}</p>  <!--  Display seller name -->
            <p>Listed: Just now</p>
            <a href="product_page.html?id=${product._id}">
                <figure class="product-image">
                    <img src="${mainImage}" alt="${product.name}" width="150" height="150">  <!--  Display first image -->
                </figure>
            </a>
            <figcaption>
                <p><strong>${product.name}</strong></p>
                <p>Price: $${product.price}</p>
                <p>Condition: ${product.condition}</p>
            </figcaption>
        `;

        container.appendChild(productElement);
    }
}
