// Navigation with Logo Flip
function flipAndNavigate(targetUrl) {
    const logo = document.getElementById('nav-logo');
    const card = document.getElementById('reg-card');

    if (logo && card) {
        logo.classList.add('flipping');
        
        setTimeout(() => {
            card.classList.add('slide-out');
        }, 300);

        setTimeout(() => {
            window.location.href = targetUrl;
        }, 800);
    }
}

// FIX: Force reset when navigating back (Mobile Browser Bug)
window.addEventListener('pageshow', function(event) {
    const card = document.getElementById('reg-card');
    const logo = document.getElementById('nav-logo');
    
    // If persisted is true, the page was loaded from cache (back button)
    if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
        if (card) card.classList.remove('slide-out');
        if (logo) logo.classList.remove('flipping');
        // Optional: Uncomment below if you want the form cleared on back button
        // document.getElementById("form").reset(); 
    }
});

// Form Submission Logic
const form = document.getElementById("form");
const messageDiv = document.getElementById("message");
const submitButton = document.getElementById("submit-button");

if (form) {
    form.addEventListener("submit", function (e) {
        messageDiv.style.display = "block";
        messageDiv.textContent = "Registering Duo...";
        messageDiv.className = "message";
        submitButton.disabled = true;

        setTimeout(() => {
            messageDiv.textContent = "Success! Duo Registered.";
            messageDiv.className = "message success";
            
            form.reset();
            submitButton.disabled = false;
            
            setTimeout(() => { 
                messageDiv.style.display = "none"; 
            }, 5000);
        }, 1500);
    });
}
