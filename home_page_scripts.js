document.addEventListener("DOMContentLoaded", function () {
    const productLinks = document.querySelectorAll('a[href*="clothing-products.html"], a[href*="luxury-items-products.html"], a[href*="electronics-products-page.html"], a[href*="products-all-page.html"]');

    productLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            showTransitionAndRedirect(this.href);
        });
    });
});

function showTransitionAndRedirect(url) {
    const transitionContainer = document.getElementById("page-transition");
    transitionContainer.style.display = "block";
    transitionContainer.style.opacity = "1";
    transitionContainer.style.transition = "opacity 0.5s ease-in-out";

    const animation = lottie.loadAnimation({
        container: document.getElementById('lottie-animation'),
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: 'https://lottie.host/bfe76724-f71e-428d-9d78-6697d33a32e7/jymGCv4nK7.json',
        rendererSettings: {
            progressiveLoad: true,  // Important for .lottie files
        }
    });

    animation.addEventListener('DOMLoaded', () => {
        console.log("Lottie animation loaded successfully.");
    });

    animation.addEventListener('complete', () => {
        console.log("Animation completed successfully.");
        transitionContainer.style.opacity = "0";
        setTimeout(() => {
            window.location.href = url;
        }, 700);
    });
}


document.addEventListener("DOMContentLoaded", function () {
    const profileIcon = document.getElementById("profile-icon");
    const userId = localStorage.getItem("user_id");

    if (profileIcon) {
        profileIcon.addEventListener("click", function (event) {
            event.preventDefault();

            if (userId) {
                //  Redirect to profile page if logged in
                window.location.href = "profile-page.html";
            } else {
                //  Redirect to login page if not logged in
                window.location.href = "login-page.html";
            }
        });
    }
});
