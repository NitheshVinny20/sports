const form = document.getElementById("form");
const messageDiv = document.getElementById("message");
const submitButton = document.getElementById("submit-button");

form.addEventListener("submit", function (e) {
    // UI Update
    messageDiv.style.display = "block";
    messageDiv.textContent = "Processing Registration...";
    messageDiv.className = "message";
    submitButton.disabled = true;

    // We use a small delay for simulation before showing the success message
    // Note: The data is actually being sent to the hidden iframe
    setTimeout(() => {
        messageDiv.textContent = "Success! See you on the court.";
        messageDiv.className = "message success";
        
        form.reset();
        submitButton.disabled = false;
        
        // Hide message after 5 seconds
        setTimeout(() => { 
            messageDiv.style.display = "none"; 
        }, 5000);
    }, 1500);
});