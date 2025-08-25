const emailInput = document.querySelector(".login .form-email");
const passwordInput = document.querySelector(".login .form-password");
const rememberMe = document.querySelector(".login .form-check-input");
const submit = document.querySelector(".login .form-submit");

const firstName = localStorage.getItem("first-name");
const lastName = localStorage.getItem("last-name");
const email = localStorage.getItem("email");
const password = localStorage.getItem("password");
const remember = localStorage.getItem("remember");

submit.addEventListener("click", function (event) {
  event.preventDefault();
  if (emailInput.value === "" || passwordInput.value === "") {
    alert("Please fill data");
  } else {
    if (
      email &&
      email.trim() === emailInput.value.trim() &&
      password &&
      password === passwordInput.value
    ) {
      setTimeout(() => {
        window.location = "index.html";
      }, 1500);
    } else {
      alert("username or password is wrong ");
    }
  }
});
