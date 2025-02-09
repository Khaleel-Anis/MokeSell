// ✅ Page Transition Logic
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
            progressiveLoad: true,
        }
    });

    animation.addEventListener('complete', () => {
        transitionContainer.style.opacity = "0";
        setTimeout(() => {
            window.location.href = url;
        }, 700);
    });
};

// ✅ Profile Icon Logic
document.addEventListener("DOMContentLoaded", function () {
    const profileIcon = document.getElementById("profile-icon");
    const userId = localStorage.getItem("user_id");

    if (profileIcon) {
        profileIcon.addEventListener("click", function (event) {
            event.preventDefault();

            if (userId && userId !== "null") {
                window.location.href = "profile-page.html";
            } else {
                window.location.href = "login-page.html";
            }
        });
    }
});

// ✅ Spin-the-Wheel Logic
document.addEventListener("DOMContentLoaded", () => {
    const spinButton = document.getElementById("spin-button");
    const wheel = document.getElementById("wheel");
    const resultMessage = document.getElementById("result-message");
    const promoCodeElement = document.getElementById("promo-code");
    const closeWheelButton = document.querySelector(".close-wheel");
    const spinWheelIcon = document.getElementById("spin-wheel-icon");
    const spinWheelContainer = document.getElementById("spin-wheel-container");
    const userId = localStorage.getItem("user_id"); // ✅ Check login status

    // ✅ Allow Access Only When Logged In
    spinWheelIcon.addEventListener("click", () => {
        if (userId) {
            spinWheelContainer.style.display = "flex";
        } else {
            alert("Please log in to access the Spin Wheel.");
        }
    });

    // ✅ Close the Spin Wheel
    closeWheelButton.addEventListener("click", () => {
        spinWheelContainer.style.display = "none";
    });

    // ✅ Spin Logic
    spinButton.addEventListener("click", () => {
        const degrees = Math.floor(3600 + Math.random() * 360);
        wheel.style.transform = `rotate(${degrees}deg)`;

        setTimeout(() => {
            const normalizedDegrees = (360 - (degrees % 360)) % 360;
            const prizeIndex = Math.floor((normalizedDegrees / 360) * 6);
            const prizes = ["5% OFF", "10% OFF", "Free Shipping", "Try Again", "15% OFF", "20% OFF"];
            const prize = prizes[prizeIndex];

            resultMessage.textContent = `🎉 Congrats! You've won: ${prize}`;

            if (prize !== "Try Again") {
                const promoCode = generatePromoCode();
                promoCodeElement.textContent = `🎁 Promo Code: ${promoCode}`;
                promoCodeElement.style.display = "block";
                savePromoCodeForUser(userId, promoCode); // ✅ Save promo code for the user
            } else {
                promoCodeElement.style.display = "none";
            }
        }, 4000);
    });

    // ✅ Promo Code Generator
    function generatePromoCode() {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let code = "";
        for (let i = 0; i < 8; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return code;
    }

    // ✅ Save Promo Code to User's LocalStorage
    function savePromoCodeForUser(userId, promoCode) {
        let userPromoCodes = JSON.parse(localStorage.getItem(`promoCodes_${userId}`)) || [];
        userPromoCodes.push(promoCode);
        localStorage.setItem(`promoCodes_${userId}`, JSON.stringify(userPromoCodes));
    }
});
