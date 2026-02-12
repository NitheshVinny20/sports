// Navigation with Logo Flip
function flipAndNavigate(targetUrl) {
    const logo = document.getElementById('nav-logo');
    const card = document.getElementById('reg-card');

    // Start animations
    logo.classList.add('flipping');
    
    setTimeout(() => {
        card.classList.add('slide-out');
    }, 300);

    // Redirect after animations finish
    setTimeout(() => {
        window.location.href = targetUrl;
    }, 800);
}

// Form Submission Logic
const form = document.getElementById("form");
const messageDiv = document.getElementById("message");
const submitButton = document.getElementById("submit-button");

form.addEventListener("submit", function (e) {
    // UI Update
    messageDiv.style.display = "block";
    messageDiv.textContent = "Registering Duo...";
    messageDiv.className = "message";
    submitButton.disabled = true;

    // Simulation delay before showing success message
    setTimeout(() => {
        messageDiv.textContent = "Success! Duo Registered.";
        messageDiv.className = "message success";
        
        form.reset();
        submitButton.disabled = false;
        
        // Hide message after 5 seconds
        setTimeout(() => { 
            messageDiv.style.display = "none"; 
        }, 5000);
    }, 1500);
});