    // FORCE RELOAD ON BACK BUTTON
    window.addEventListener('pageshow', function(event) {
        if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
            window.location.reload(); 
        }
    });

    // ROSTER MAPPING
    const startersMap = [
        { n: "entry.P2_NAME", i: "entry.P2_ID" },
        { n: "entry.P3_NAME", i: "entry.P3_ID" },
        { n: "entry.P4_NAME", i: "entry.P4_ID" },
        { n: "entry.P5_NAME", i: "entry.P5_ID" },
        { n: "entry.P6_NAME", i: "entry.P6_ID" }
    ];

    const subsMap = [
        { n: "entry.R1_NAME", i: "entry.R1_ID" }
    ];

    // INJECT PLAYERS
    const sCont = document.getElementById('starters-container');
    startersMap.forEach((p, idx) => {
        sCont.innerHTML += `
            <div class="field" style="border: 1px solid #fce7f3; padding: 10px; border-radius: 8px; background: #fff;">
                <label style="color: #db2777; font-weight: bold;">Player ${idx + 2}</label>
                <input type="text" name="${p.n}" class="save-local" placeholder="Name" style="margin-bottom:5px;">
                <input type="text" name="${p.i}" class="save-local" placeholder="AUID">
            </div>`;
    });

    const bCont = document.getElementById('subs-container');
    subsMap.forEach((p) => {
        bCont.innerHTML += `
            <div class="field" style="border: 1px solid #fce7f3; padding: 10px; border-radius: 8px; background: #fff; width: 100%;">
                <label style="color: #7c3aed; font-weight: bold;">Reserve 1</label>
                <input type="text" name="${p.n}" class="save-local" placeholder="Name" style="margin-bottom:5px;">
                <input type="text" name="${p.i}" class="save-local" placeholder="AUID">
            </div>`;
    });

    // LOGO FLIP NAVIGATION
    function flipAndNavigate(targetUrl) {
        const logo = document.getElementById('nav-logo');
        const card = document.getElementById('reg-card');
        logo.classList.add('flipping');
        setTimeout(() => { card.classList.add('slide-out'); }, 300);
        setTimeout(() => { window.location.href = targetUrl; }, 800);
    }

    // AUTO-SAVE LOGIC
    const inputs = document.querySelectorAll('.save-local');
    window.onload = () => {
        inputs.forEach(input => {
            const val = localStorage.getItem('vb_female_' + input.name);
            if (val) input.value = val;
        });
    };
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            localStorage.setItem('vb_female_' + input.name, input.value);
        });
    });

    // FORM SUBMISSION
    document.getElementById('teamForm').addEventListener('submit', function() {
        const btn = document.getElementById('submit-button');
        const msg = document.getElementById('message');
        btn.innerHTML = "Submitting Squad...";
        btn.disabled = true;
        setTimeout(() => {
            localStorage.clear();
            msg.style.display = "block";
            msg.innerHTML = "Registration Successful! Good Luck.";
            msg.className = "message success";
            setTimeout(() => { location.reload(); }, 2000);
        }, 1500);
    });