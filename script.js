// Navbar scroll + hamburger
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
  backToTop.classList.toggle('show', window.scrollY > 400);
  setActiveLink();
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close menu saat klik link
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
function setActiveLink() {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}

// Back to top
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.15 });

document.querySelectorAll('.feature-card, .testi-card, .contact-form, .about-text').forEach(el => observer.observe(el));

// Form handling
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nama = document.getElementById('nama').value.trim();
  const email = document.getElementById('email').value.trim();
  const pesan = document.getElementById('pesan').value.trim();

  if (nama.length < 3) {
    note.textContent = 'Nama minimal 3 karakter.';
    note.className = 'form-note error';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    note.textContent = 'Format email tidak valid.';
    note.className = 'form-note error';
    return;
  }

  // Simulasi kirim
  const btn = form.querySelector('button[type="submit"]');
  const prev = btn.textContent;
  btn.textContent = 'Mengirim...';
  btn.disabled = true;

  setTimeout(() => {
    note.textContent = `Terima kasih ${nama}! Pesan kamu sudah terkirim. Tim Zaaa akan hubungi ke ${email} segera.`;
    note.className = 'form-note success';
    form.reset();
    btn.textContent = prev;
    btn.disabled = false;
  }, 900);
});

// Smooth demo alert
document.querySelectorAll('a[href="#fitur"]').forEach(el => {
  el.addEventListener('click', (e) => {
    // biarin scroll default, tidak perlu prevent
  });
});
