const form = document.querySelector(".form");
const successNotification = document.getElementById("success-notification");
const errorNotification = document.getElementById("error-notification");
successNotification.style.display = "none";
errorNotification.style.display = "none";

function displaySuccessNotification() {
  successNotification.style.display = "block";
  form.reset();

  setInterval(() => {
    successNotification.style.display = "none";
  }, 3000);
}

function displayErrorNotification() {
  errorNotification.style.display = "block";
  form.reset();

  setInterval(() => {
    errorNotification.style.display = "none";
  }, 3000);
}

async function sendUserDataToEmail(userName, email, message) {
  const body = {
    userName: userName,
    email: email,
    message: message,
  };

  const response = await fetch("https://147sdn5p28.execute-api.us-east-1.amazonaws.com/sendEmailFunction", {
    method: "POST",
    body: JSON.stringify(body),
  });
  const data = await response.json();

  if (data.success) {
    displaySuccessNotification();
  } else {
    displayErrorNotification();
  }
}

function onSubmitForm(event) {
  event.preventDefault();

  const userName = document.getElementById("user-name").value;
  const email = document.getElementById("user-email").value;
  const message = document.getElementById("user-message").value;

  sendUserDataToEmail(userName, email, message);
}

form.addEventListener("submit", onSubmitForm);
