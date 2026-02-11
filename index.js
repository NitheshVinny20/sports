const sports = [

  { 
    title: "Chess", 
    desc: "The ultimate battle of minds. Sharpen your strategy and challenge your intellect.",
    date: "Will be announced soon",
    location: "-",
    team: "Solo",
    img: "https://image2url.com/r2/default/images/1770216497200-9dab2257-f9f0-46fd-82cf-5d05777bd8f7.jpg",
    imgPortrait: "https://image2url.com/r2/default/images/1770216497200-9dab2257-f9f0-46fd-82cf-5d05777bd8f7.jpg",
    link: "regestration/chess/chess_reg.html"   // NOT touched
  },

  { 
    title: "Badminton", 
    desc: "Speed and precision define champions.",
    date: "Will be announced soon",
    location: "-",
    team: "Singles / Doubles",
    img: "https://img.sanishtech.com/u/abce7230b7b12203c6211a8523673574.png",
    imgPortrait: "https://image2url.com/r2/default/images/1770806818380-eb632d20-c260-42f4-916e-861e4db98645.png",
    link: "registration/badminton/reg.html"
  },

  { 
    title: "Carrom", 
    desc: "Precision and focus in this classic indoor game.",
    date: "Will be announced soon",
    location: "-",
    team: "Solo / 2 per team",
    img: "https://image2url.com/r2/default/images/1770218939437-8143fb2e-0ab0-4a9e-8038-8e07a2cc081b.jpeg",
    imgPortrait: "https://image2url.com/r2/default/images/1770218774659-a22f9d93-2794-4e88-aede-6fb13be7bb87.jpeg",
    link: "regestration/carrom/carrom_reg.html"
  },

  { 
    title: "Cricket", 
    desc: "Teamwork and strategy on the field.",
    date: "Will be announced soon",
    location: "-",
    team: "11 per team",
    img: "https://image2url.com/r2/default/images/1770216942908-1dfc0066-a247-4525-8398-e4d39129c840.jpg",
    imgPortrait: "https://image2url.com/r2/default/images/1770216917046-bfe17688-cbbf-458d-85d3-84558293c7ae.jpg",
    link: "registration/cricket/reg.html"
  },

  { 
    title: "Throw Ball", 
    desc: "Fast reflexes and teamwork define the game.",
    date: "Will be announced soon",
    location: "-",
    team: "7 per team",
    img: "https://image2url.com/r2/default/images/1770806733991-ab7ed690-4eb7-4878-ae78-0b7383d19b3b.png",
    imgPortrait: "https://image2url.com/r2/default/images/1770806733991-ab7ed690-4eb7-4878-ae78-0b7383d19b3b.png",
    link: "registration/throwball/reg.html"
  },

  { 
    title: "Volleyball", 
    desc: "Energy and powerful spikes define this sport.",
    date: "Will be announced soon",
    location: "-",
    team: "6 per team",
    img: "https://image2url.com/r2/default/images/1770218588979-774aba95-f91e-4043-bf79-0091cc3e0c98.png",
    imgPortrait: "https://image2url.com/r2/default/images/1770218562512-0a3acaaa-abe6-4790-948e-5b47795f5e17.png",
    link: "registration/volleyball/reg.html"
  },

  { 
    title: "Football", 
    desc: "Feel the thrill of every goal and play.",
    date: "Will be announced soon",
    location: "-",
    team: "11 per team",
    img: "https://image2url.com/r2/default/images/1770216813175-e3d93620-bfde-472c-8111-13f81a7045bd.jpg",
    imgPortrait: "https://image2url.com/r2/default/images/1770216752866-5280a394-f105-4238-8fee-d7ccce23cc69.jpg",
    link: "registration/football/reg.html"
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



