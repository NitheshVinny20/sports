// AGGRESSIVE FIX: Force hard reload when navigating back to reset animations
window.addEventListener('pageshow', function(event) {
    if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
        window.location.reload(); 
    }
});

const startersMap = [
    { n: "entry.164796864", i: "entry.466232286" },
    { n: "entry.279343295", i: "entry.590979872" },
    { n: "entry.1906076037", i: "entry.96241058" },
    { n: "entry.908985867", i: "entry.1159611705" },
    { n: "entry.1988112041", i: "entry.1539910648" },
    { n: "entry.1685335114", i: "entry.1156136104" },
    { n: "entry.2103729441", i: "entry.1761177781" },
    { n: "entry.911277598", i: "entry.1938205651" },
    { n: "entry.1635033387", i: "entry.1366413584" },
    { n: "entry.1971252509", i: "entry.2125999837" }
];

const subsMap = [
    { n: "entry.357225766", i: "entry.1982817856" }, // Sub 1
    { n: "entry.1284111609", i: "entry.1497776436" }  // Sub 2
];

// Initialize Containers
const sCont = document.getElementById('starters-container');
if (sCont) {
    startersMap.forEach((p, idx) => {
        sCont.innerHTML += `
            <div class="player-box">
                <div class="jersey-num">${idx + 2}</div>
                <div style="flex:1">
                    <input type="text" name="${p.n}" class="save-local" placeholder="Player Name">
                    <input type="text" name="${p.i}" class="save-local" placeholder="AUID">
                </div>
            </div>`;
    });
}

const bCont = document.getElementById('subs-container');
if (bCont) {
    subsMap.forEach((p, idx) => {
        bCont.innerHTML += `
            <div class="player-box">
                <div class="jersey-num">R${idx + 1}</div>
                <div style="flex:1">
                    <input type="text" name="${p.n}" class="save-local" placeholder="Reserve Name">
                    <input type="text" name="${p.i}" class="save-local" placeholder="AUID">
                </div>
            </div>`;
    });
}

// Auto-Save Logic
const allInputs = document.querySelectorAll('.save-local, .floating input');
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

// Transition Logic
function toggleGender() {
    const isChecked = document.getElementById('gender-toggle').checked;
    const card = document.getElementById('main-card');
    if (card) {
        card.classList.add('slide-out');
        setTimeout(() => {
            window.location.href = isChecked ? 'female.html' : 'cricket_reg.html';
        }, 500);
    }
}

// Final Submit
document.getElementById('teamForm').addEventListener('submit', function() {
    const btn = document.getElementById('submitBtn');
    btn.innerHTML = "Submitting Squad...";
    btn.disabled = true;
    setTimeout(() => {
        localStorage.clear();
        alert("Male Squad Registered! Good luck.");
        location.reload();
    }, 2000);
});
