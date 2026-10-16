// Jelena Glišić — Interior Designer Website Interactions

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation scroll state
  const nav = document.getElementById('nav');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mobile Hamburger Menu
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('nav__links--open');
      hamburger.classList.toggle('is-active', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('nav__links--open');
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Form Handling with Feedback
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        alert('Molimo vas popunite sva obavezna polja.');
        return;
      }

      // Visual feedback
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Šalje se...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = 'Hvala vam! Poruka je poslata ✓';
        submitBtn.style.backgroundColor = '#4A6B53';
        form.reset();

        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.backgroundColor = '';
          submitBtn.disabled = false;
        }, 4000);
      }, 900);
    });
  }

  // 4. Subtle Project Card Interactive Focus
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('.project-card__title')?.textContent;
      if (title) {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
          const messageInput = document.getElementById('message');
          if (messageInput) {
            messageInput.value = `Pozdrav Jelena, zainteresovan/a sam za projekat sličan "${title}".`;
            messageInput.focus();
          }
        }
      }
    });
  });

  // 5. Scroll Reveal Intersection Observer
  const reveals = document.querySelectorAll('.reveal, .reveal--left, .reveal--right, .reveal--fade');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if observer not supported
    reveals.forEach(el => el.classList.add('is-visible'));
  }
});

