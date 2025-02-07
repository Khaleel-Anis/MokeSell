document.getElementById("searchButton").addEventListener("click", () => {
    const query = document.getElementById("searchInput").value.trim().toLowerCase();
    searchProducts(query);
});

document.getElementById("searchInput").addEventListener("input", (e) => {
    const query = e.target.value.trim().toLowerCase();
    if (query.length > 2) {
        searchProducts(query);
    } else {
        document.getElementById("searchResults").innerHTML = "";
    }
});

async function searchProducts(query) {
    const API_URL = "https://fedassignment-6369.restdb.io/rest/products";
    const API_KEY = "6796ddca9cbb2707d665c482";

    try {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": API_KEY,
            }
        });

        const products = await response.json();
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );

        displayResults(filteredProducts);
    } catch (error) {
        console.error("Error fetching products:", error);
        document.getElementById("searchResults").innerHTML = "<p>Error loading search results.</p>";
    }
}

function displayResults(products) {
    const resultsContainer = document.getElementById("searchResults");
    resultsContainer.innerHTML = ""; // Clear previous results

    if (products.length === 0) {
        resultsContainer.innerHTML = "<p>No products found.</p>";
        return;
    }

    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");

        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <img src="${product['product image'] || 'images/placeholder.jpg'}" alt="${product.name}" width="150">
            <p>Price: S$${product.price.toFixed(2)}</p>
            <p>Category: ${product.category}</p>
            <a href="product_page.html?id=${product._id}">View Product</a>
        `;

        resultsContainer.appendChild(productElement);
    });
}