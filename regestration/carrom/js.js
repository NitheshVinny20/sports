// FORCE RELOAD ON BACK BUTTON: Resets animations stuck in mobile cache
window.addEventListener('pageshow', function(event) {
    if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
        window.location.reload(); 
    }
});

// Form Submission & Auto-Save Logic
const carromForm = document.getElementById("form");
const messageDiv = document.getElementById("message");
const submitButton = document.getElementById("submit-button");
const inputs = document.querySelectorAll('.save-local');

// Save data to localStorage as the user types
inputs.forEach(input => {
    input.addEventListener('input', () => {
        localStorage.setItem('carrom_squad_data_' + input.name, input.value);
    });
});

// Load saved data on page load
window.onload = () => {
    inputs.forEach(input => {
        const val = localStorage.getItem('carrom_squad_data_' + input.name);
        if (val) input.value = val;
    });
};

if (carromForm) {
    carromForm.addEventListener("submit", function (e) {
        // Show submitting status
        messageDiv.style.display = "block";
        messageDiv.textContent = "Registering...";
        messageDiv.className = "message";
        submitButton.disabled = true;

        // Provide success feedback after data is sent
        setTimeout(() => {
            messageDiv.textContent = "Registration Successful! See you at the Carrom board.";
            messageDiv.className = "message success";
            
            localStorage.clear(); // Clear storage on success
            carromForm.reset();
            submitButton.disabled = false;
            
            setTimeout(() => { 
                messageDiv.style.display = "none"; 
            }, 5000);
        }, 1500);
    });
}