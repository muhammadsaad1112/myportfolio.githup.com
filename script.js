const themeButton = document.getElementById('theme');
const body = document.body;

themeButton.addEventListener('click', () => {
  const isLight = body.classList.toggle('light-theme');

  if (isLight) {
    document.documentElement.style.setProperty('--title-color', '#000000');
    document.documentElement.style.setProperty('--text-color', '#333333');
    document.documentElement.style.setProperty('--background-color', '#ffffff');
    document.documentElement.style.setProperty('--container-color', '#f0f0f0');
    document.documentElement.style.setProperty('--body-color', '#ffffff');
    document.documentElement.style.setProperty('--form-color', '#f0f0f0');

    themeButton.classList.remove('ri-sun-line');
    themeButton.classList.add('ri-moon-line');
  } else {
    document.documentElement.style.setProperty('--title-color', '#fff');
    document.documentElement.style.setProperty('--text-color', '#dbefff');
    document.documentElement.style.setProperty('--background-color', '#181c23');
    document.documentElement.style.setProperty('--container-color', '#112f41');
    document.documentElement.style.setProperty('--body-color', '#0b1d2b');
    document.documentElement.style.setProperty('--form-color', 'rgba(11, 29, 43, 0.98)');

    themeButton.classList.remove('ri-moon-line');
    themeButton.classList.add('ri-sun-line');
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById('contact-form'),
        contactName = document.getElementById('contact-name'),
        contactEmail = document.getElementById('contact-email'),
        contactMessage = document.getElementById('contact-message'),
        message = document.getElementById('message');

  emailjs.init('Sgz48evsdVWgjqX--');

  contactForm?.addEventListener('submit', function (e) {
    e.preventDefault();

    if (contactName.value === '' || contactEmail.value === '' || contactMessage.value === '') {
      message.textContent = "❗ Please fill in all input fields";
      message.style.color = "red";
      setTimeout(() => { message.textContent = ''; }, 3000);
    } else {
      emailjs.sendForm('service_z605bvt', 'template_uds0our', this)
        .then(() => {
          message.textContent = "✅ Message sent successfully!";
          message.style.color = "green";
          setTimeout(() => { message.textContent = ''; }, 3000);
          contactForm.reset();
        }, (error) => {
          alert("❌ Oops! Something went wrong.\n" + error.text);
        });
    }
  });

  var mixer = mixitup('.work-container', {
    selectors: { target: '.mix' },
    animation: { duration: 300 }
  });

  const filterBtns = document.querySelectorAll('.work-item');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.active-work')?.classList.remove('active-work');
      btn.classList.add('active-work');
      const filterValue = btn.getAttribute('data-filter');
      mixer.filter(filterValue === 'all' ? 'all' : filterValue);
    });
  });

  const countElements = document.querySelectorAll('.count');
  countElements.forEach(el => {
    const endVal = parseInt(el.getAttribute('data-val'), 10);
    const countUp = new countUp.CountUp(el, endVal, {
      duration: 2,
      separator: ','
    });
    if (!countUp.error) {
      countUp.start();
    } else {
      console.error(countUp.error);
    }
  });

  const scrollHeader = () => {
    const header = document.getElementById('header');
    window.scrollY >= 20
      ? header.classList.add('scroll-header')
      : header.classList.remove('scroll-header');
  };
  window.addEventListener('scroll', scrollHeader);

  const sections = document.querySelectorAll('section[id]');
  const scrollActive = () => {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 70;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-menu a[href*='${sectionId}']`);
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLink?.classList.add('active-link');
      } else {
        navLink?.classList.remove('active-link');
      }
    });
  };
  window.addEventListener('scroll', scrollActive);

  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      const headerOffset = 70;
      const elementPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });

  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  navToggle?.addEventListener("click", () => {
    navMenu.classList.toggle("show-menu");
  });

  // Particle animation
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.resume-item').forEach(item => {
    observer.observe(item);
  });

  document.documentElement.style.scrollBehavior = 'smooth';

  function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = '0s';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';

    document.querySelector('.floating-particles')?.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 20000);
  }

  setInterval(createParticle, 3000);

  const observer2 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate');
        }, 300);

        setTimeout(() => {
          createParticles(entry.target);
        }, 2000);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  });

  const button = document.getElementById('animatedButton');
  if (button) {
    observer2.observe(button);

    function createParticles(element) {
      const particlesContainer = element.querySelector('.particles');
      const particleInterval = setInterval(() => {
        if (!element.classList.contains('animate')) {
          clearInterval(particleInterval);
          return;
        }

        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';

        particlesContainer.appendChild(particle);

        setTimeout(() => {
          particle.remove();
        }, 3000);
      }, 200);
    }

    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * 0.15;
      const deltaY = (e.clientY - centerY) * 0.15;

      button.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.05)`;
    });

    button.addEventListener('mouseleave', () => {
      button.style.transform = '';
    });

    button.addEventListener('click', function (e) {
      e.preventDefault();
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          const ripple = document.createElement('span');
          const rect = this.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height) * (1 + i * 0.3);
          const x = e.clientX - rect.left - size / 2;
          const y = e.clientY - rect.top - size / 2;

          ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, ${0.3 - i * 0.1});
            border-radius: 50%;
            transform: scale(0);
            animation: mega-ripple 1s ease-out;
            pointer-events: none;
            z-index: 1;
          `;
          this.appendChild(ripple);
          setTimeout(() => {
            ripple.remove();
          }, 1000);
        }, i * 100);
      }
    });

    const style = document.createElement('style');
    style.textContent = `
      @keyframes mega-ripple {
        0% { transform: scale(0); opacity: 1; }
        50% { transform: scale(1.5); opacity: 0.5; }
        100% { transform: scale(3); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  window.addEventListener('scroll', () => {
    const scrollInstruction = document.querySelector('.scroll-instruction');
    if (scrollInstruction && window.scrollY > 100) {
      scrollInstruction.style.opacity = '0';
      setTimeout(() => {
        scrollInstruction.style.display = 'none';
      }, 500);
    }
  });
});
