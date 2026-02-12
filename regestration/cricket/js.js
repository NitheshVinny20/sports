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
    { n: "entry.357225766", i: "entry.1982817856" },
    { n: "entry.1284111609", i: "entry.1497776436" },
    { n: "entry.1563974988", i: "entry.342922246" },
    { n: "entry.458879777", i: "entry.376119018" }
];

/* ------------------------------
   Dynamic Player Creation
------------------------------ */

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
            <div class="player-box">
                <div class="jersey-num">R${idx + 1}</div>
                <div style="flex:1">
                    <input type="text" name="${p.n}" class="save-local" placeholder="Reserve Name">
                    <input type="text" name="${p.i}" class="save-local" placeholder="AUID">
                </div>
            </div>`;
    });
}

/* ------------------------------
   Local Storage Auto Save
------------------------------ */

function restoreInputs() {
    const inputs = document.querySelectorAll('.save-local, .floating input');
    inputs.forEach(input => {
        const val = localStorage.getItem('cricketSquad_' + input.name);
        if (val) input.value = val;
    });
}

function enableAutoSave() {
    const inputs = document.querySelectorAll('.save-local, .floating input');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            localStorage.setItem('cricketSquad_' + input.name, input.value);
        });
    });
}

window.addEventListener("DOMContentLoaded", () => {
    restoreInputs();
    enableAutoSave();
});

/* ------------------------------
   🔥 Mobile Back Button Fix
   Fixes animation + button state
------------------------------ */

window.addEventListener("pageshow", function (event) {

    const isBFCache =
        event.persisted ||
        performance.getEntriesByType("navigation")[0]?.type === "back_forward";

    if (isBFCache) {

        // Reset slide animation
        const card = document.querySelector(".card");
        if (card) card.classList.remove("slide-out");

        // Reset gender toggle animation if exists
        const toggle = document.getElementById("gender-toggle");
        if (toggle) toggle.checked = false;

        // Reset submit button state
        const btn = document.getElementById("submitBtn");
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = "Register Team";
        }
    }
});

/* ------------------------------
   Gender Toggle Navigation
------------------------------ */

function toggleGender() {
    const toggle = document.getElementById('gender-toggle');
    const card = document.querySelector('.card');

    if (!toggle || !card) return;

    card.classList.add('slide-out');

    setTimeout(() => {
        window.location.href = toggle.checked
            ? 'female.html'
            : 'cricket_reg.html';
    }, 400);
}

/* ------------------------------
   Submission Handling
------------------------------ */

const form = document.getElementById('teamForm');

if (form) {
    form.addEventListener('submit', function () {

        const btn = document.getElementById('submitBtn');
        if (btn) {
            btn.innerHTML = "Sending to Pavilion...";
            btn.disabled = true;
        }

        setTimeout(() => {
            localStorage.clear();
            alert("Squad Registered! Good luck for the match.");
            location.reload();
        }, 1500);
    });
}
