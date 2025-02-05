document.addEventListener("DOMContentLoaded", function () {
    // Image Upload Preview
    document.getElementById("imageUpload").addEventListener("change", function (event) {
        const preview = document.getElementById("preview");
        preview.innerHTML = "";
        for (const file of event.target.files) {
            const img = document.createElement("img");
            img.src = URL.createObjectURL(file);
            img.style.width = "100px";
            img.style.margin = "5px";
            preview.appendChild(img);
        }
    });

    // Form Submission (Example)
    document.getElementById("sellForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default submission

        const formData = new FormData(this);

        fetch("submit_listing.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert("Product Listed Successfully!");
        })
        .catch(error => console.error("Error:", error));
    });
});