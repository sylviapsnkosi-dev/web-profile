// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle && navToggle.addEventListener('click', () => {
  const open = navLinks.style.display === 'flex';
  navLinks.style.display = open ? 'none' : 'flex';
});

// Projects data
const projects = [
  { title: 'Student Management System', desc: 'Spring Boot + Thymeleaf app to manage students (CRUD, security).', link: '#' },
  { title: 'Grocery Price Comparator', desc: 'Java backend that compares prices across stores and suggests cheapest options.', link: '#' },
  { title: 'FEN Viewer (Chess)', desc: 'Python script that parses FEN strings and renders the board into a text file.', link: '#' }
];

function renderProjects(){
  const grid = document.getElementById('projectsGrid');
  if(!grid) return;
  grid.innerHTML = '';
  projects.forEach(p => {
    const card = document.createElement('div');
    card.className = 'project';
    card.innerHTML = `
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <a href="${p.link}" target="_blank" rel="noopener">View</a>
    `;
    grid.appendChild(card);
  });
}
renderProjects();

// Typing effect: line-by-line typewriter
const lines = [
  "Hi — I'm Sylvia Nkosi.",
  'A Software Development Graduate.',
  'I build web apps using Java, Spring Boot, Python, and modern JavaScript.',
  'I love clean code, solving problems, and continuous learning.'
];
const typingEl = document.getElementById('typing');
let lineIndex = 0;
let charIndex = 0;
let currentTimeout = null;
let finishedTyping = false;

function updateTypingDisplay(currentLinePartial = ''){
  const completed = lines.slice(0, lineIndex).join('\n');
  const out = completed ? (completed + '\n' + currentLinePartial) : currentLinePartial;
  typingEl.textContent = out;
}

function typeNextChar(){
  if(lineIndex >= lines.length){
    finishedTyping = true;
    updateTypingDisplay(lines.join('\n'));
    return;
  }
  const line = lines[lineIndex];
  if(charIndex <= line.length){
    const partial = line.slice(0, charIndex) + (charIndex <= line.length ? '▌' : '');
    updateTypingDisplay(partial);
    charIndex++;
    currentTimeout = setTimeout(typeNextChar, 45 + Math.random() * 60);
  } else {
    updateTypingDisplay(line);
    lineIndex++;
    charIndex = 0;
    currentTimeout = setTimeout(typeNextChar, 450);
  }
}

const homeSection = document.getElementById('home');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry =>{
    if(entry.isIntersecting && !currentTimeout && !finishedTyping){
      typeNextChar();
    }
  });
},{threshold:0.5});
if(homeSection) observer.observe(homeSection);

// Highlight nav link for visible section
const sections = document.querySelectorAll('.section');
const navAnchors = document.querySelectorAll('.nav-links a');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry =>{
    const id = entry.target.id;
    const anchor = document.querySelector(`.nav-links a[href="#${id}"]`);
    if(entry.isIntersecting){
      navAnchors.forEach(a=>a.classList.remove('active'));
      anchor && anchor.classList.add('active');
    }
  });
},{threshold:0.55});
sections.forEach(s => sectionObserver.observe(s));

// Smooth scroll to section
navAnchors.forEach(a=>{
  a.addEventListener('click', (e)=>{
    e.preventDefault();
    const id = a.getAttribute('href').replace('#','');
    const el = document.getElementById(id);
    el && el.scrollIntoView({behavior:'smooth'});
    if(window.innerWidth < 980) navLinks.style.display = 'none';
  });
});

// Contact form demo
const contactForm = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
contactForm && contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  if(!name || !email || !message){
    formMsg.textContent = 'Please complete all fields.';
    return;
  }
  formMsg.textContent = 'Thanks! Your message has been received (demo).';
  contactForm.reset();
});
