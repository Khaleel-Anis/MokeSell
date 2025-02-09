document.addEventListener("DOMContentLoaded", function () {
  const APIKEY = "67a87718f247e57112117e1a";

  document.getElementById("contact-submit").addEventListener("click", function (e) {
      e.preventDefault();

      const contactName = document.getElementById("contact-name").value;
      const contactEmail = document.getElementById("contact-email").value;
      const contactPassword = document.getElementById("contact-password").value;
      const contactBirthday = document.getElementById("contact-birthday").value;
      const contactPostal = document.getElementById("contact-postal").value;

      const contactGender = document.querySelector('input[name="gender"]:checked');
      const genderValue = contactGender ? contactGender.value : "";

      const jsondata = {
          "name": contactName,
          "email": contactEmail,
          "password": contactPassword,
          "birthday": contactBirthday,
          "postal_code": contactPostal,
          "gender": genderValue
      };

      const settings = {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "x-apikey": APIKEY,
              "Cache-Control": "no-cache"
          },
          body: JSON.stringify(jsondata),
      };

      fetch("https://mokesell-cd4f.restdb.io/rest/user-account", settings)
          .then(response => response.json())
          .then(data => {
              console.log("Registration Successful:", data);
              document.getElementById("contact-submit").disabled = false;

              // ✅ Store User Info
              localStorage.setItem("userID", data._id);
              localStorage.setItem("userEmail", data.email);

              // ✅ Redirect to Homepage (index.html) after Account Creation
              window.location.href = "index.html";
          })
          .catch(error => {
              console.error("Registration failed:", error);
              alert("Registration failed. Please try again.");
          });
  });
});
