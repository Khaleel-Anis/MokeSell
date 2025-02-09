document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "67a87718f247e57112117e1a";
    const userId = localStorage.getItem("user_id");

    if (!userId) {
        window.location.href = "login-page.html";
        return;
    }

    const API_URL = `https://mokesell-cd4f.restdb.io/rest/user-account/${userId}`;

    // ✅ Fetch User Data
    fetch(API_URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-apikey": APIKEY,
            "Cache-Control": "no-cache"
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("email").textContent = data.email || "Not Provided";
        document.getElementById("contact-number").textContent = data.contact_number || "Not Provided";
        document.getElementById("name").textContent = data.name || "Not Provided";
        document.getElementById("birthday").textContent = data.birthday || "Not Provided";
        document.getElementById("address").textContent = data.address || "Not Provided";
        document.getElementById("gender").textContent = data.gender || "Not Provided";
        document.getElementById("postal-code").textContent = data.postal_code || "Not Provided";

        displayPromoCodes();
    })
    .catch(error => console.error("Error fetching profile:", error));

    // ✅ Logout Functionality
    document.getElementById("logout-btn").addEventListener("click", function () {
        localStorage.removeItem("user_id");
        window.location.href = "index.html";
    });

    // ✅ Display Promo Codes
    function displayPromoCodes() {
        const userId = localStorage.getItem("user_id");
        const promoCodeList = document.getElementById("promo-code-list");
        const storedPromoCodes = JSON.parse(localStorage.getItem(`promoCodes_${userId}`)) || [];

        promoCodeList.innerHTML = ""; // Clear existing codes

        if (storedPromoCodes.length === 0) {
            promoCodeList.innerHTML = "<li>No promo codes available right now.</li>";
        } else {
            storedPromoCodes.forEach(item => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `🎁 <strong>${item.code}</strong> - <em>${item.discount}</em>`;
                promoCodeList.appendChild(listItem);
            });
        }
    }

    document.addEventListener("DOMContentLoaded", displayPromoCodes);

    // ✅ Change Password Functionality
    document.getElementById("change-password-btn").addEventListener("click", function () {
        const newPassword = document.getElementById("new-password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (newPassword.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const requestBody = {
            password: newPassword  // ✅ Make sure this matches the password field name in RestDB
        };

        fetch(API_URL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to change password. Status: ${response.status}`);
            }
            return response.json();
        })
        .then(() => {
            alert("✅ Password successfully changed.");
            document.getElementById("new-password").value = "";
            document.getElementById("confirm-password").value = "";
        })
        .catch(error => {
            console.error("Error changing password:", error);
            alert("❌ Error changing password. Please try again later.");
        });
    });

    // ✅ Delete Account Functionality
    document.getElementById("delete-account-btn").addEventListener("click", function () {
        const confirmation = confirm("⚠️ Are you sure you want to delete your account? This action cannot be undone.");

        if (confirmation) {
            fetch(API_URL, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "x-apikey": APIKEY,
                    "Cache-Control": "no-cache"
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to delete account. Status: ${response.status}`);
                }
                alert("✅ Your account has been deleted.");
                localStorage.removeItem("user_id");
                window.location.href = "index.html";
            })
            .catch(error => {
                console.error("Error deleting account:", error);
                alert("❌ Error deleting account. Please try again later.");
            });
        }
    });
});

// ✅ Tab Navigation Logic
document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".tab-link");
    const contents = document.querySelectorAll(".tab-content");

    tabs.forEach(tab => {
        tab.addEventListener("click", function () {
            tabs.forEach(item => item.classList.remove("active"));
            contents.forEach(content => content.classList.remove("active"));

            this.classList.add("active");
            document.getElementById(this.getAttribute("data-tab")).classList.add("active");
        });
    });
});
