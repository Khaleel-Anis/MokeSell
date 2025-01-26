const API_KEY = "YOUR_RESTDB_API_KEY";  // Replace with your RestDB.io API Key
const API_URL = "https://your-database-id.restdb.io/rest/listings"; // Replace with your RestDB.io Database URL

let listingsData = [];

document.addEventListener("DOMContentLoaded", () => {
    fetchListings();
    setupNavigationSwipe();
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
    .then(data => {
        listingsData = data;
        displayListings(data);
    })
    .catch(error => console.error("Error fetching listings:", error));
}

function displayListings(listings) {
    const listingContainer = document.getElementById("listing-container");
    listingContainer.innerHTML = "";

    listings.forEach((listing, index) => {
        const listingElement = document.createElement("div");
        listingElement.classList.add("listing", "scroll-item");
        listingElement.setAttribute("data-category", listing.category);
        listingElement.setAttribute("data-index", index);

        listingElement.innerHTML = `
            <h3>${listing.title}</h3>
            <p>${listing.description}</p>
            <p><strong>Price:</strong> S${listing.price}</p>
            <p><strong>Category:</strong> ${listing.category}</p>
        `;

        listingContainer.appendChild(listingElement);
    });
}

document.getElementById("listing-form")?.addEventListener("submit", function(event) {
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

function setupNavigationSwipe() {
    const navLinks = document.querySelectorAll(".nav-links li a");
    const scrollContainer = document.querySelector(".scroll-container");
    let currentIndex = 0;
    
    if (!scrollContainer) return;
    
    scrollContainer.style.display = "flex";
    scrollContainer.style.overflowX = "hidden";
    scrollContainer.style.whiteSpace = "nowrap";
    scrollContainer.style.transition = "transform 0.5s ease-in-out";
    
    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            const category = this.textContent.trim();
            localStorage.setItem("selectedCategory", category);
            
            const targetIndex = [...document.querySelectorAll(".scroll-item")]
                .findIndex(item => item.getAttribute("data-category") === category);
            
            if (targetIndex !== -1) {
                scrollContainer.style.transform = `translateX(-${targetIndex * 100}%)`;
                currentIndex = targetIndex;
                event.preventDefault();
            } else {
                // Allow navigation if category isn't found in the current page
                window.location.href = link.href;
            }
        });
    });

    // Restore last scrolled category
    const savedCategory = localStorage.getItem("selectedCategory");
    if (savedCategory) {
        setTimeout(() => {
            const targetIndex = [...document.querySelectorAll(".scroll-item")]
                .findIndex(item => item.getAttribute("data-category") === savedCategory);
            if (targetIndex !== -1) {
                scrollContainer.style.transform = `translateX(-${targetIndex * 100}%)`;
            }
        }, 300);
    }
}