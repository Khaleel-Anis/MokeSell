document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "67a87718f247e57112117e1a";

    document.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();

        // Get user input
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // API Request to Verify User Credentials
        fetch(`https://mokesell-cd4f.restdb.io/rest/user-account?q={"email":"${email}","password":"${password}"}`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            }
        })
        .then(response => response.json())
        .then(users => {
            if (users.length > 0) {
                const user = users[0];

                //  Store session info consistently
                localStorage.setItem("userID", user._id);
                localStorage.setItem("userEmail", user.email);
                localStorage.setItem("userName", user.name);

                // Redirect to homepage after login
                window.location.href = "index.html";
            } else {
                alert("Invalid email or password. Please try again.");
            }
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
            alert("An error occurred. Please try again later.");
        });
    });

    // ✅ Show/Hide Password Toggle
    document.getElementById("show-password").addEventListener("change", function () {
        const passwordInput = document.getElementById("password");
        passwordInput.type = this.checked ? "text" : "password";
    });
});