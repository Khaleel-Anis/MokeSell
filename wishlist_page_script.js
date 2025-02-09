document.addEventListener("DOMContentLoaded", () => {
    const wishlistContainer = document.getElementById("wishlist-items");
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    function displayWishlist() {
        wishlistContainer.innerHTML = ""; // Clear existing content

        if (wishlist.length === 0) {
            wishlistContainer.innerHTML = "<p>Your wishlist is empty.</p>";
            return;
        }

        wishlist.forEach(item => {
            const itemCard = document.createElement("div");
            itemCard.classList.add("wishlist-item");

            itemCard.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="wishlist-image">
                <h3>${item.name}</h3>
                <p>Price: S$${item.price.toFixed(2)}</p>
                <button class="remove-btn" data-id="${item.id}">Remove</button>
            `;

            wishlistContainer.appendChild(itemCard);
        });

        attachRemoveListeners();
    }

    function attachRemoveListeners() {
        const removeButtons = document.querySelectorAll(".remove-btn");

        removeButtons.forEach(button => {
            button.addEventListener("click", function () {
                const productId = this.getAttribute("data-id");
                removeFromWishlist(productId);
            });
        });
    }

    function removeFromWishlist(productId) {
        const updatedWishlist = wishlist.filter(item => item.id !== productId);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        displayWishlist();
    }

    displayWishlist();
});