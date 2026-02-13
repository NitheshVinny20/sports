const sports = [

  { 
    title: "Chess",
    desc: "The ultimate battle of minds. Sharpen your strategy and challenge your intellect.",
    date: "Will be announced soon",
    location: "-",
    team: "Solo",
    img: "img/sports/landscape/chess_1.avif",
    imgPortrait: "img/sports/landscape/chess_1.avif",
    link: "regestration/chess/chess_reg.html"
  },

  { 
    title: "Badminton",
    desc: "Speed and precision define champions.",
    date: "Will be announced soon",
    location: "-",
    team: "Singles / Doubles",
    img: "img/sports/landscape/badminton_1.avif",
    imgPortrait: "img/sports/portrait/badminton_2.avif",
    link: "regestration/badminton/badminton_reg.html"
  },

  { 
    title: "Carrom",
    desc: "Precision and focus in this classic indoor game.",
    date: "Will be announced soon",
    location: "-",
    team: "Solo / 2 per team",
    img: "img/sports/landscape/carrom_1.avif",
    imgPortrait: "img/sports/portrait/carrom_2.avif",
    link: "regestration/carrom/carrom_reg.html"
  },

  { 
    title: "Cricket",
    desc: "Teamwork and strategy on the field.",
    date: "Will be announced soon",
    location: "-",
    team: "11 per team",
    img: "img/sports/landscape/cricket_1.avif",
    imgPortrait: "img/sports/portrait/cricket_2.avif",
    link: "regestration/cricket/cricket_reg.html"
  },

{ 
    title: "Throw Ball",
    desc: "Fast reflexes and teamwork define the game. Aim for the win with every throw.",
    date: "Will be announced soon",
    location: "-",
    team: "7 Starters + 1 Reserve", // Updated to match your registration logic
    img: "img/sports/landscape/throwball_1.avif",
    imgPortrait: "img/sports/landscape/throwball_1.avif",
    link: "regestration/throwball/throwball_reg.html" // Ensure folder name spelling matches your directory
  },

  { 
    title: "Volleyball",
    desc: "Energy and powerful spikes define this sport.",
    date: "Will be announced soon",
    location: "-",
    team: "6 per team",
    img: "img/sports/landscape/volleyball_1.avif",
    imgPortrait: "https://image2url.com/r2/default/images/1770218562512-0a3acaaa-abe6-4790-948e-5b47795f5e17.png",
    link: "regestration/volleyball/volleyball_reg.html"
  },

  { 
    title: "Football",
    desc: "Feel the thrill of every goal and play.",
    date: "Will be announced soon",
    location: "-",
    team: "11 per team",
    img: "img/sports/landscape/football_1.avif",
    imgPortrait: "img/sports/portrait/football_2.avif",
    link: "regestration/football/football_reg.html"
  }

];

const track = document.getElementById('track');
const bg = document.getElementById('bg-overlay');
const dotsContainer = document.getElementById('dots');

let currentIndex = 0;
let isLocked = false;

// Preload images
sports.forEach(s => { 
  new Image().src = s.img;
  new Image().src = s.imgPortrait;
});

// Initialize cards and dots
sports.forEach((sport, i) => {
  const card = document.createElement('div');
  card.className = 'glass-card';
  card.innerHTML = `
    <h2>${sport.title}</h2>
    <p>${sport.desc}</p>
    <div class="extra-info">
      <span>📅 ${sport.date}</span>
      <span>📍 ${sport.location}</span>
      <span>👥 ${sport.team}</span>
    </div>
    <a href="${sport.link}" class="register-btn">Register Now</a>
  `;
  track.appendChild(card);

  const dot = document.createElement('button');
  dot.className = `dot ${i===0?'active':''}`;
  dot.setAttribute('aria-label', `${sport.title} slide`);
  dot.addEventListener('click', () => updateGallery(i));
  dotsContainer.appendChild(dot);
});

function updateGallery(index) {
  if(index < 0 || index >= sports.length) return;

  currentIndex = index;

  track.style.transform = `translateX(-${currentIndex*100}%)`;

  const imgUrl = window.innerWidth > 768 
                 ? sports[currentIndex].img       // landscape
                 : sports[currentIndex].imgPortrait; // portrait
  bg.style.backgroundImage = `url('${imgUrl}')`;

  document.querySelectorAll('.dot').forEach((d,i) => {
    d.classList.toggle('active', i===currentIndex);
  });

  const card = document.querySelectorAll('.glass-card')[currentIndex];
  card.style.animation = 'none';
  requestAnimationFrame(() => card.style.animation = '');

  isLocked = true;
  setTimeout(() => isLocked = false, 800);
}

// Scroll, keyboard, swipe
window.addEventListener('wheel', e => {
  if(isLocked) return;
  if(e.deltaY > 0) updateGallery(currentIndex+1);
  else if(e.deltaY < 0) updateGallery(currentIndex-1);
});

window.addEventListener('keydown', e => {
  if(isLocked) return;
  if(e.key==='ArrowRight') updateGallery(currentIndex+1);
  if(e.key==='ArrowLeft') updateGallery(currentIndex-1);
});

let touchStartX = 0;
window.addEventListener('touchstart', e => touchStartX = e.touches[0].clientX);
window.addEventListener('touchend', e => {
  if(isLocked) return;
  const diff = touchStartX - e.changedTouches[0].clientX;
  if(diff>50) updateGallery(currentIndex+1);
  else if(diff<-50) updateGallery(currentIndex-1);
});

// Update background on resize for responsive image
window.addEventListener('resize', () => updateGallery(currentIndex));

// Initial background
updateGallery(0);






