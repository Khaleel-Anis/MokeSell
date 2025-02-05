document.addEventListener("DOMContentLoaded", async function () {
    console.log("Fetching 'Clothing' products...");

    const API_URL = "https://fedassignment-6369.restdb.io/rest/products";
    const API_KEY = "6796ddca9cbb2707d665c482"; // Your RestDB API key

    // Define the query to filter products by category "Clothing"
    const query = encodeURIComponent(JSON.stringify({ category: "Clothing" }));
    const requestUrl = `${API_URL}?q=${query}`;

    try {
        const response = await fetch(requestUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": API_KEY,
            },
        });

        const products = await response.json();
        console.log("Fetched 'Clothing' Products:", products);

        // Insert products into different sections
        displayProducts(products, "trending-products");
        displayProducts(products, "sale-products");
        displayProducts(products, "recent-products");

    } catch (error) {
        console.error("Error fetching 'Clothing' products:", error);
    }
});

function displayProducts(products, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = ""; // Clear existing products

    products.forEach(product => {
        const productElement = document.createElement("article");
        productElement.classList.add("product");

        productElement.innerHTML = `
            <p>Seller: Unknown</p>
            <p>Listed: Just now</p>
            <a href="product_page.html">
                <figure class="product-image">
                    <img src="${product['product image']}" alt="${product.name}" width="150" height="150">
                </figure>
            </a>
            <figcaption>
                <p><strong>${product.name}</strong></p>
                <p>Price: $${product.price}</p>
                <p>Condition: ${product.condition}</p>
            </figcaption>
        `;

        container.appendChild(productElement);
    });
}