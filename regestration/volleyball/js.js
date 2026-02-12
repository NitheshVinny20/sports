// Mapping for Starters (P2 - P6)
const startersMap = [
    { n: "entry.164796864", i: "entry.466232286" }, // P2
    { n: "entry.279343295", i: "entry.590979872" }, // P3
    { n: "entry.1906076037", i: "entry.96241058" }, // P4
    { n: "entry.908985867", i: "entry.1159611705" }, // P5
    { n: "entry.1988112041", i: "entry.1539910648" }  // P6
];

// Mapping for Reserves (S1 - S2)
const subsMap = [
    { n: "entry.357225766", i: "entry.1982817856" }, // S1
    { n: "entry.1284111609", i: "entry.1497776436" }  // S2
];

// Generate Starters
const startersContainer = document.getElementById('starters-container');
startersMap.forEach((p, idx) => {
    startersContainer.innerHTML += `
        <div class="player-card">
            <div class="num">P${idx + 2}</div>
            <div class="inputs">
                <input type="text" name="${p.n}" class="save-local" placeholder="Name">
                <input type="text" name="${p.i}" class="save-local" placeholder="AUID">
            </div>
        </div>`;
});

// Generate Reserves
const subsContainer = document.getElementById('subs-container');
subsMap.forEach((p, idx) => {
    subsContainer.innerHTML += `
        <div class="player-card">
            <div class="num" style="color: var(--vb-orange)">S${idx + 1}</div>
            <div class="inputs">
                <input type="text" name="${p.n}" class="save-local" placeholder="Reserve Name">
                <input type="text" name="${p.i}" class="save-local" placeholder="Reserve AUID">
            </div>
        </div>`;
});

// Auto-Save Logic
const allInputs = document.querySelectorAll('.save-local');
window.onload = () => {
    allInputs.forEach(input => {
        const val = localStorage.getItem('vball_squad_' + input.name);
        if (val) input.value = val;
    });
};

allInputs.forEach(input => {
    input.addEventListener('input', () => {
        localStorage.setItem('vball_squad_' + input.name, input.value);
    });
});

// Submission Logic
const form = document.getElementById('teamForm');
form.onsubmit = function() {
    const team = document.querySelector('input[name="entry.1997065996"]').value;
    document.getElementById('submitBtn').innerText = "Registering Squad...";
    
    setTimeout(() => {
        document.getElementById('summary-team').innerText = team;
        document.getElementById('successModal').classList.add('active');
        localStorage.clear();
    }, 1500);
};

function closeAndReset() {
    location.reload();
}