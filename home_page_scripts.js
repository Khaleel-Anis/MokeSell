document.addEventListener("DOMContentLoaded", function () {
    const profileIcon = document.getElementById("profile-icon");
    const userId = localStorage.getItem("user_id");

    if (profileIcon) {
        profileIcon.addEventListener("click", function (event) {
            event.preventDefault();

            if (userId) {
                // ✅ Redirect to profile page if logged in
                window.location.href = "profile-page.html";
            } else {
                // ❌ Redirect to login page if not logged in
                window.location.href = "login-page.html";
            }
        });
    }
});
