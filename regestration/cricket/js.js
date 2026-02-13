const startersMap = [
    { n: "entry.164796864", i: "entry.466232286" }, // P2
    { n: "entry.279343295", i: "entry.590979872" }, // P3
    { n: "entry.1906076037", i: "entry.96241058" }, // P4
    { n: "entry.908985867", i: "entry.1159611705" }, // P5
    { n: "entry.1988112041", i: "entry.1539910648" }, // P6
    { n: "entry.1685335114", i: "entry.1156136104" }, // P7
    { n: "entry.2103729441", i: "entry.1761177781" }, // P8
    { n: "entry.911277598", i: "entry.1938205651" }, // P9
    { n: "entry.1635033387", i: "entry.1366413584" }, // P10
    { n: "entry.1971252509", i: "entry.2125999837" }  // P11
];

const subsMap = [
    { n: "entry.357225766", i: "entry.1982817856" }, // Sub 1
    { n: "entry.1284111609", i: "entry.1497776436" }, // Sub 2
    { n: "entry.1563974988", i: "entry.342922246" }, // Sub 3
    { n: "entry.458879777", i: "entry.376119018" }   // Sub 4
];

// Dynamically create fields
const startersContainer = document.getElementById('starters-container');
if (startersContainer) {
    startersMap.forEach((p, idx) => {
        startersContainer.innerHTML += `
            <div class="player-box">
                <div class="jersey-num">${idx + 2}</div>
                <div style="flex:1">
                    <input type="text" name="${p.n}" class="save-local" placeholder="Player Name">
                    <input type="text" name="${p.i}" class="save-local" placeholder="AUID">
                </div>
            </div>`;
    });
}

const subsContainer = document.getElementById('subs-container');
if (subsContainer) {
    subsMap.forEach((p, idx) => {
        subsContainer.innerHTML += `
            <div class="player-box sub-card">
                <div class="jersey-num">R${idx + 1}</div>
                <div style="flex:1">
                    <input type="text" name="${p.n}" class="save-local" placeholder="Reserve Name">
                    <input type="text" name="${p.i}" class="save-local" placeholder="AUID">
                </div>
            </div>`;
    });
}

// Auto-Save Logic
const allInputs = document.querySelectorAll('.save-local');
window.onload = () => {
    allInputs.forEach(input => {
        const val = localStorage.getItem('cricketSquad_' + input.name);
        if (val) input.value = val;
    });
};

allInputs.forEach(input => {
    input.addEventListener('input', () => {
        localStorage.setItem('cricketSquad_' + input.name, input.value);
    });
});

// Submission Logic
const teamForm = document.getElementById('teamForm');
if (teamForm) {
    teamForm.addEventListener('submit', function() {
        const btn = document.getElementById('submitBtn');
        btn.innerHTML = "Sending to Pavilion...";
        btn.style.opacity = "0.7";
        
        setTimeout(() => {
            localStorage.clear();
            alert("Squad Registered! Good luck for the match.");
            location.reload();
        }, 2000);
    });
}

// Navigation Logic
function toggleGender() {
    const isChecked = document.getElementById('gender-toggle').checked;
    const card = document.querySelector('.card');
    
    // Add slide-out animation to the card
    card.classList.add('slide-out');

    // Wait for animation (500ms), then redirect
    setTimeout(() => {
        if (isChecked) {
            window.location.href = 'female.html';
        } else {
            // For male version, we assume this file is cricket_reg.html or index.html
            window.location.href = 'cricket_reg.html'; 
        }
    }, 500);
}