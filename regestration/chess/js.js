const form = document.getElementById("form");
const messageDiv = document.getElementById("message");
const submitButton = document.getElementById("submit-button");

form.addEventListener("submit", function (e) {
  // Show submitting message
  messageDiv.style.display = "block";
  messageDiv.textContent = "Submitting...";
  messageDiv.className = "message";

  submitButton.disabled = true;

  // Simulate success
  setTimeout(() => {
    messageDiv.textContent = "Thank you! Your registration has been recorded.";
    messageDiv.className = "message success";
    form.reset();
    submitButton.disabled = false;
    setTimeout(() => { messageDiv.style.display = "none"; }, 3500);
  }, 1500);
});