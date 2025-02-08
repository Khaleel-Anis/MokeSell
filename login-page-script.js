document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "6796ddca9cbb2707d665c482";

    document.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();

        // Get user input
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // API Request to Get All Users
        fetch("https://fedassignment-6369.restdb.io/rest/user-account", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            }
        })
        .then(response => response.json())
        .then(users => {
            // Check if user exists with the provided credentials
            const user = users.find(user => user.email === email && user.password === password);

            if (user) {
                // ✅ Store session info
                localStorage.setItem("user_id", user._id);
                localStorage.setItem("user_email", user.email);

                // ✅ Redirect to homepage after login
                window.location.href = "index.html";
            } else {
                // ❌ Invalid credentials
                alert("Invalid email or password. Please try again.");
            }
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
            alert("An error occurred. Please try again later.");
        });
    });

    // Show/Hide Password
    document.getElementById("show-password").addEventListener("change", function () {
        const passwordInput = document.getElementById("password");
        passwordInput.type = this.checked ? "text" : "password";
    });
});
