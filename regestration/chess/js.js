const form = document.getElementById("form");
const messageDiv = document.getElementById("message");
const submitButton = document.getElementById("submit-button");

form.addEventListener("submit", function (e) {
  // Let the form submit to the hidden iframe (no navigation)
  messageDiv.style.display = "block";
  messageDiv.textContent = "Submitting...";
  messageDiv.className = "message";

  submitButton.disabled = true;

  // After a short delay assume submission succeeded (Google Forms submit occurs in hidden iframe)
  setTimeout(() => {
    messageDiv.textContent = "Thank you! Your response has been recorded.";
    messageDiv.className = "message success";
    form.reset();
    submitButton.disabled = false;
    setTimeout(() => { messageDiv.style.display = "none"; }, 3500);
  }, 1500);
});