document.addEventListener("DOMContentLoaded", function () {
    // Image Upload Preview
    document.getElementById("imageUpload").addEventListener("change", function (event) {
        const preview = document.getElementById("preview");
        preview.innerHTML = ""; // Clear previous images
        for (const file of event.target.files) {
            const img = document.createElement("img");
            img.src = URL.createObjectURL(file);
            img.style.width = "100px";
            img.style.margin = "5px";
            
            // Append image inside <ul> as <li>
            const li = document.createElement("li");
            li.appendChild(img);
            preview.appendChild(li);
        }
    });

    // Form Submission to RestDB
    document.getElementById("sellForm").addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent page refresh

        const formData = new FormData(this);
        const imageFile = document.getElementById("imageUpload").files[0];

        let imageUrl = "";
        if (imageFile) {
            imageUrl = await uploadImage(imageFile); // Upload image first
        }

        // Prepare JSON payload
        const productData = {
            name: formData.get("listing_name"),
            description: formData.get("description"),
            brand: formData.get("brand"),
            price: parseFloat(formData.get("price")),
            category: formData.get("category"),
            condition: formData.get("condition"),
            "deal methods": formData.getAll("deal_method"),
            "product image": imageUrl // Store uploaded image URL
        };

        // Send Product Data to RestDB
        const API_URL = "https://fedassignment-6369.restdb.io/rest/products";
        const API_KEY = "YOUR_RESTDB_API_KEY"; // Replace with your actual API key

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-apikey": API_KEY, // Authenticate API request
                    "Cache-Control": "no-cache",
                },
                body: JSON.stringify(productData),
            });

            if (response.ok) {
                alert("Product Listed Successfully!");
                document.getElementById("sellForm").reset(); // Clear form after submission
            } else {
                alert("Failed to list product. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while submitting.");
        }
    });

    // Function to Upload Image to RestDB
    async function uploadImage(file) {
        const formData = new FormData();
        formData.append("image", file);

        const response = await fetch("https://fedassignment-6369.restdb.io/media", {
            method: "POST",
            headers: {
                "x-apikey": "YOUR_RESTDB_API_KEY"
            },
            body: formData
        });

        const data = await response.json();
        return data[0].url; // Returns image URL
    }
});