const API_KEY = "YOUR_RESTDB_API_KEY";  // Replace with your RestDB.io API Key
const API_URL = "https://your-database-id.restdb.io/rest/listings"; // Replace with your RestDB.io Database URL

document.addEventListener("DOMContentLoaded", () => {
    fetchListings();
});

function fetchListings() {
    fetch(API_URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-apikey": API_KEY
        }
    })
    .then(response => response.json())
    .then(data => displayListings(data))
    .catch(error => console.error("Error fetching listings:", error));
}

function displayListings(listings) {
    const listingContainer = document.getElementById("listing-container");
    listingContainer.innerHTML = "";

    listings.forEach(listing => {
        const listingElement = document.createElement("div");
        listingElement.classList.add("listing");

        listingElement.innerHTML = `
            <h3>${listing.title}</h3>
            <p>${listing.description}</p>
            <p><strong>Price:</strong> S${listing.price}</p>
            <p><strong>Category:</strong> ${listing.category}</p>
        `;

        listingContainer.appendChild(listingElement);
    });
}

document.getElementById("listing-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const newListing = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        category: document.getElementById("category").value
    };

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-apikey": API_KEY
        },
        body: JSON.stringify(newListing)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Listing added:", data);
        fetchListings();
    })
    .catch(error => console.error("Error adding listing:", error));

    this.reset();
});
