document.addEventListener("DOMContentLoaded", function () {
  const APIKEY = "6796ddca9cbb2707d665c482";

  document.getElementById("contact-submit").addEventListener("click", function (e) {
    e.preventDefault();

    let contactName = document.getElementById("contact-name").value;
    let contactEmail = document.getElementById("contact-email").value;
    let contactPassword = document.getElementById("contact-password").value;
    let contactBirthday = document.getElementById("contact-birthday").value;
    let contactPostal = document.getElementById("contact-postal").value;

    let contactGender = document.querySelector('input[name="gender"]:checked');
    let genderValue = contactGender ? contactGender.value : "";

    let jsondata = {
      "name": contactName,
      "email": contactEmail,
      "password": contactPassword,
      "birthday": contactBirthday,
      "postal_code": contactPostal,
      "gender": genderValue
    };

    let settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
      },
      body: JSON.stringify(jsondata),
    };

    fetch("https://fedassignment-6369.restdb.io/rest/user-account", settings)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        document.getElementById("contact-submit").disabled = false;

        // ✅ Store session data
        localStorage.setItem("user_id", data._id);
        localStorage.setItem("user_email", data.email);

        // ✅ Redirect to homepage
        window.location.href = "index.html";
      })
      .catch(error => {
        console.error("Registration failed:", error);
        alert("Registration failed. Please try again.");
      });
  });
});
