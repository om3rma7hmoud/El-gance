const firstNameInput = document.querySelector(".register  .form-first-name");
const lastNameInput = document.querySelector(".register .form-last-name");
const emailInput = document.querySelector(".register .form-email");
const passwordInput = document.querySelector(".register .form-password");
const submit = document.querySelector(".register .form-submit");

submit.addEventListener("click", function (event) {
  event.preventDefault();
  if (
    firstNameInput.value == "" ||
    lastNameInput.value == "" ||
    emailInput.value == "" ||
    passwordInput.value == ""
  ) {
    alert("Please fill data");
  } else {
    alert("Account created successfully!");
    localStorage.setItem("first-name", firstNameInput.value);
    localStorage.setItem("last-name", lastNameInput.value);
    localStorage.setItem("email", emailInput.value);
    localStorage.setItem("password", passwordInput.value);

    setTimeout(() => {
      location = "login.html";
    }, 1500);
  }
});
