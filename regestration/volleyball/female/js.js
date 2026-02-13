// FORCE RELOAD ON BACK BUTTON: Resets animations stuck in mobile cache
window.addEventListener('pageshow', function(event) {
    if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
        window.location.reload(); 
    }
});

// ROSTER MAPPING - Synced with your updated Google Form IDs
const startersMap = [
    { n: "entry.164796864", i: "entry.466232286" }, // Player 2
    { n: "entry.279343295", i: "entry.590979872" }, // Player 3
    { n: "entry.1906076037", i: "entry.96241058" }, // Player 4
    { n: "entry.908985867", i: "entry.1159611705" },// Player 5
    { n: "entry.1988112041", i: "entry.1539910648" } // Player 6
];

const subsMap = [
    { n: "entry.357225766", i: "entry.1982817856" }, // Substitute 1
];

// INJECT STARTERS
const sCont = document.getElementById('starters-container');
if (sCont) {
    startersMap.forEach((p, idx) => {
        sCont.innerHTML += `
            <div class="field" style="border: 1px solid #fce7f3; padding: 10px; border-radius: 8px; background: #fff;">
                <label style="color: #db2777; font-weight: bold;">Player ${idx + 2}</label>
                <input type="text" name="${p.n}" class="save-local" placeholder="Name" style="margin-bottom:5px;">
                <input type="text" name="${p.i}" class="save-local" placeholder="AUID">
            </div>`;
    });
}

// INJECT RESERVES
const bCont = document.getElementById('subs-container');
if (bCont) {
    subsMap.forEach((p, idx) => {
        bCont.innerHTML += `
            <div class="field" style="border: 1px solid #fce7f3; padding: 10px; border-radius: 8px; background: #fff;">
                <label style="color: #7c3aed; font-weight: bold;">Reserve ${idx + 1}</label>
                <input type="text" name="${p.n}" class="save-local" placeholder="Name" style="margin-bottom:5px;">
                <input type="text" name="${p.i}" class="save-local" placeholder="AUID">
            </div>`;
    });
}

// LOGO FLIP NAVIGATION
function flipAndNavigate(targetUrl) {
    const logo = document.getElementById('nav-logo');
    const card = document.getElementById('reg-card');
    if (logo && card) {
        logo.classList.add('flipping');
        setTimeout(() => { card.classList.add('slide-out'); }, 300);
        setTimeout(() => { window.location.href = targetUrl; }, 800);
    }
}

// AUTO-SAVE LOGIC
const inputs = document.querySelectorAll('.save-local');
window.onload = () => {
    inputs.forEach(input => {
        const val = localStorage.getItem('vb_female_squad_' + input.name);
        if (val) input.value = val;
    });
};

inputs.forEach(input => {
    input.addEventListener('input', () => {
        localStorage.setItem('vb_female_squad_' + input.name, input.value);
    });
});

// FORM SUBMISSION
const form = document.getElementById("teamForm");
if (form) {
    form.addEventListener("submit", function (e) {
        const btn = document.getElementById('submit-button');
        const msg = document.getElementById('message');
        btn.innerHTML = "Submitting Squad...";
        btn.disabled = true;

        setTimeout(() => {
            localStorage.clear();
            msg.style.display = "block";
            msg.textContent = "Success! Female Volleyball Team Registered.";
            msg.className = "message success";
            
            setTimeout(() => { location.reload(); }, 3000);
        }, 1500);
    });
}