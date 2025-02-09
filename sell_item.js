// Get the logged-in user's ID
const userID = localStorage.getItem("userID") || sessionStorage.getItem("userID");

document.addEventListener("DOMContentLoaded", function () {
    if (!userID) {
        alert("Please log in to sell an item.");
        window.location.href = "login-page.html";
        return;
    }

    // Fetch and display logged-in user's info
    fetch(`https://fedassignment-6369.restdb.io/rest/user-account/${userID}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-apikey": "6796ddca9cbb2707d665c482",
        },
    })
    .then(response => response.json())
    .then(user => {
        document.getElementById("sellerName").value = user.name;
        document.getElementById("sellerEmail").value = user.email;
    })
    .catch(error => console.error("Error fetching user data:", error));
});

//  Handle Product Submission

document.getElementById("sellForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    console.log("Form Submitted!");

    const formData = new FormData(this);
    const imageFiles = document.getElementById("imageUpload").files;

    let imageUrls = [];

    if (imageFiles.length > 0) {
        console.log("Uploading images to Cloudinary...");

        for (let file of imageFiles) {
            const imageUrl = await uploadImageToCloudinary(file);
            console.log("Image Uploaded:", imageUrl);
            imageUrls.push(imageUrl);
        }
    }

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
        "product image": imageUrls,  //  Store all uploaded image URLs
        sellerId: userID,
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

//  Upload Image to Cloudinary

async function uploadImageToCloudinary(file) {
    const cloudName = "dt6xiwlhq";
    const uploadPreset = "ml_default";

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
        return data.secure_url;  //  Return Cloudinary URL
    } catch (error) {
        console.error("Image Upload Error:", error);
        return "";
    }
}