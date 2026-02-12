const startersMap = [
    { n: "entry.164796864", i: "entry.466232286" }, // P2
    { n: "entry.279343295", i: "entry.590979872" }, // P3
    { n: "entry.1906076037", i: "entry.96241058" }, // P4
    { n: "entry.908985867", i: "entry.1159611705" }, // P5
    { n: "entry.1988112041", i: "entry.1539910648" }  // P6
];

const subsMap = [
    { n: "entry.357225766", i: "entry.1982817856" }, // Sub 1
    { n: "entry.1284111609", i: "entry.1497776436" }  // Sub 2
];

function createPlayerCards(containerId, map, prefix) {
    const container = document.getElementById(containerId);
    map.forEach((p, idx) => {
        container.innerHTML += `
            <div class="player-card">
                <div class="num">${prefix}${idx + 2}</div>
                <div class="inputs">
                    <input type="text" name="${p.n}" class="save-local" placeholder="Name">
                    <input type="text" name="${p.i}" class="save-local" placeholder="AUID">
                </div>
            </div>`;
    });
}

createPlayerCards('starters-container', startersMap, 'P');
createPlayerCards('subs-container', subsMap, 'S');

// Auto-Save Implementation
const allInputs = document.querySelectorAll('.save-local');
window.onload = () => {
    allInputs.forEach(input => {
        const val = localStorage.getItem('vball_' + input.name);
        if (val) input.value = val;
    });
};

allInputs.forEach(input => {
    input.addEventListener('input', () => {
        localStorage.setItem('vball_' + input.name, input.value);
    });
});

// Submit Feedback
document.getElementById('teamForm').onsubmit = function() {
    const team = document.querySelector('input[name="entry.1997065996"]').value;
    document.getElementById('submitBtn').innerText = "Sending...";
    
    setTimeout(() => {
        document.getElementById('summary-team').innerText = team;
        document.getElementById('successModal').classList.add('active');
        localStorage.clear();
    }, 1500);
};