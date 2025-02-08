//  Declare userID globally
const userID = localStorage.getItem("userID") || sessionStorage.getItem("userID");

document.addEventListener("DOMContentLoaded", function () {
    if (!userID) {
        alert("Please log in to sell an item.");
        window.location.href = "login-page.html";  // Redirect to login if not logged in
        return;
    }

    // ✅ Fetch and display logged-in user's info
    fetch(`https://fedassignment-6369.restdb.io/rest/user-account/${userID}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-apikey": "6796ddca9cbb2707d665c482",
        },
    })
    .then(response => response.json())
    .then(user => {
        document.getElementById("sellerName").value = user.name;  //  Storing seller name
        document.getElementById("sellerEmail").value = user.email;  //  Storing seller email
    })
    .catch(error => {
        console.error("Error fetching user data:", error);
    });
});

document.getElementById("sellForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    console.log("Form Submitted!");

    const formData = new FormData(this);
    const imageFile = document.getElementById("imageUpload").files[0];

    let imageUrl = "";
    if (imageFile) {
        console.log("Uploading image to Cloudinary...");
        imageUrl = await uploadImageToCloudinary(imageFile);
        console.log("Image Uploaded:", imageUrl);
    }

    // ✅ Using the global userID directly
    const productData = {
        seller_name: document.getElementById("sellerName").value,
        seller_email: document.getElementById("sellerEmail").value,
        name: formData.get("listing_name"),
        description: formData.get("description"),
        brand: formData.get("brand"),
        price: parseFloat(formData.get("price")) || 0,
        category: formData.get("category") || "Clothing",
        condition: formData.get("condition") || "Brand New",
        "deal methods": formData.getAll("deal_method").filter(Boolean),
        "product image": imageUrl,
        sellerId: userID,               //  Using the globally declared userID
        timestamp: new Date().toISOString(),
    };

    console.log("Sending Product Data:", productData);

    try {
        const response = await fetch("https://fedassignment-6369.restdb.io/rest/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": "6796ddca9cbb2707d665c482",
                "Cache-Control": "no-cache",
            },
            body: JSON.stringify(productData),
        });

        const responseData = await response.json();
        console.log("Response from API:", responseData);

        if (response.ok) {
            alert("Product Listed Successfully!");
            document.getElementById("sellForm").reset();
        } else {
            alert("Failed to list product. Check console for errors.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while submitting.");
    }
});

async function uploadImageToCloudinary(file) {
    const cloudName = "dt6xiwlhq"; // Your Cloudinary Cloud Name
    const uploadPreset = "ml_default"; // Your Cloudinary Upload Preset

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Image upload failed: ${response.statusText}`);
        }

        const data = await response.json();
        return data.secure_url; // Returns the Cloudinary Image URL
    } catch (error) {
        console.error("Image Upload Error:", error);
        return "";
    }
}