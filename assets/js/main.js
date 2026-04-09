/* ============================================================
   EPORTFOLIO — main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Navbar scroll behaviour ---- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    updateActiveNav();
  }, { passive: true });

  /* ---- Hamburger menu ---- */
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');
  hamburger?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    hamburger.classList.toggle('is-open');
    if (hamburger.classList.contains('is-open')) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  /* Close menu on link click */
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger?.classList.remove('is-open');
      hamburger?.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });

  /* ---- Active nav highlight ---- */
  const sections = document.querySelectorAll('section[id]');
  function updateActiveNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const link   = document.querySelector(`.nav-links a[href="#${section.id}"]`);
      if (link) {
        link.classList.toggle('active', scrollY >= top && scrollY < top + height);
      }
    });
  }

  /* ---- Scroll reveal ---- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ---- Skill bar animation ---- */
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill[data-width]').forEach(bar => {
          setTimeout(() => {
            bar.style.width = bar.dataset.width + '%';
          }, 200);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.skill-group').forEach(group => skillObserver.observe(group));

  /* ---- Contact form (static / mailto fallback) ---- */
  const contactForm = document.getElementById('contact-form');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = document.getElementById('form-name')?.value || '';
    const email   = document.getElementById('form-email')?.value || '';
    const subject = document.getElementById('form-subject')?.value || 'Portfolio Enquiry';
    const message = document.getElementById('form-message')?.value || '';

    const mailto = `mailto:CHRMIK001@myuct.ac.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.open(mailto, '_blank');
  });

  /* ---- Typed cursor effect in hero ---- */
  const typedEl = document.getElementById('hero-typed');
  if (typedEl) {
    const phrases = [
      'Materials Science Honours',
      'Structural Characterisation',
      'Thin Film Research',
      'BSc Graduate'
    ];
    let phraseIdx = 0, charIdx = 0, isDeleting = false;

    function type() {
      const current = phrases[phraseIdx];
      typedEl.textContent = isDeleting
        ? current.slice(0, charIdx--)
        : current.slice(0, charIdx++);

      let delay = isDeleting ? 60 : 100;

      if (!isDeleting && charIdx > current.length) {
        isDeleting = true;
        delay = 1800;
      } else if (isDeleting && charIdx < 0) {
        isDeleting = false;
        phraseIdx  = (phraseIdx + 1) % phrases.length;
        charIdx    = 0;
        delay = 400;
      }
      setTimeout(type, delay);
    }
    setTimeout(type, 1600);
  }

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---- Footer: current year ---- */
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
