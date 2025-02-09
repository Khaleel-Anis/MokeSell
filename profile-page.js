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

        displayPromoCodes(); // ✅ Display promo codes after fetching user data
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
    
        promoCodeList.innerHTML = "";  // Clear existing codes
    
        if (storedPromoCodes.length === 0) {
            promoCodeList.innerHTML = "<li>No promo codes available right now.</li>";
        } else {
            storedPromoCodes.forEach(code => {
                const listItem = document.createElement("li");
                listItem.textContent = `🎁 ${code}`;
                promoCodeList.appendChild(listItem);
            });
        }
    }
    
    displayPromoCodes();  // Load promo codes on page load
    
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
