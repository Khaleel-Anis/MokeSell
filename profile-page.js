document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "6796ddca9cbb2707d665c482";
    const userId = localStorage.getItem("user_id");

    if (!userId) {
        window.location.href = "login.html"; // Redirect to login if not logged in
        return;
    }

    const API_URL = `https://fedassignment-6369.restdb.io/rest/user-account/${userId}`;

    // Fetch user data from RestDB
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
    })
    .catch(error => console.error("Error fetching profile:", error));

    // Logout functionality
    document.getElementById("logout-btn").addEventListener("click", function () {
        localStorage.removeItem("user_id");
        window.location.href = "index.html"; // Redirect to homepage after logout
    });
});


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
