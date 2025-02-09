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
    const API_URL = "https://mokesell-cd4f.restdb.io/rest/products";
    const API_KEY = "67a87718f247e57112117e1a";

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

        //  Handle multiple images
        let productImages = product['product image'];
        let firstImage = '';

        if (Array.isArray(productImages) && productImages.length > 0) {
            firstImage = productImages[0];  // Display the first image
        } else {
            firstImage = productImages || 'images/placeholder.jpg';  // Fallback for single image or no image
        }

        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <img src="${firstImage}" alt="${product.name}" width="150">
            <p>Price: S$${product.price.toFixed(2)}</p>
            <p>Category: ${product.category}</p>
            <a href="product_page.html?id=${product._id}">View Product</a>
        `;

        resultsContainer.appendChild(productElement);
    });
}