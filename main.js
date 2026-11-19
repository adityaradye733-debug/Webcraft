/**
 * NEXORA AGENCY — CORE INTERACTIVITY & FUNCTIONALITY
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Preloader dismissal
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => preloader.classList.add('hidden'), 350);
    });
    // Fallback safeguard
    setTimeout(() => preloader.classList.add('hidden'), 1500);
  }

  // 3. Sticky Header & Back-to-Top Visibility
  const header = document.querySelector('.site-header');
  const backToTopBtn = document.querySelector('.back-to-top');

  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (header) {
      header.classList.toggle('scrolled', scrollY > 40);
    }
    if (backToTopBtn) {
      backToTopBtn.classList.toggle('visible', scrollY > 450);
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 4. Mobile Navigation & Dropdown Accordions
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const dropdownParents = document.querySelectorAll('.nav-item.has-dropdown');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  dropdownParents.forEach((item) => {
    const trigger = item.querySelector('.nav-link');
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        if (window.innerWidth <= 960) {
          e.preventDefault();
          item.classList.toggle('open');
        }
      });
    }
  });

  // 5. Portfolio Category Filtering (Home & Projects Page)
  const filterButtons = document.querySelectorAll('[data-filter]');
  const projectCards = document.querySelectorAll('[data-category]');
  const projectSearchInput = document.getElementById('projectSearch');

  const filterProjects = () => {
    const activeBtn = document.querySelector('[data-filter].active');
    const selectedCategory = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
    const searchTerm = projectSearchInput ? projectSearchInput.value.trim().toLowerCase() : '';

    projectCards.forEach((card) => {
      const categories = (card.getAttribute('data-category') || '').toLowerCase();
      const text = card.textContent.toLowerCase();
      const matchesCategory = selectedCategory === 'all' || categories.includes(selectedCategory.toLowerCase());
      const matchesSearch = !searchTerm || text.includes(searchTerm);

      card.classList.toggle('hidden-item', !(matchesCategory && matchesSearch));
    });
  };

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      filterProjects();
    });
  });

  if (projectSearchInput) {
    projectSearchInput.addEventListener('input', filterProjects);
  }

  // 6. Blog Category Filter & Search (Blog Page)
  const blogFilterBtns = document.querySelectorAll('[data-blog-filter]');
  const blogCards = document.querySelectorAll('[data-blog-category]');
  const blogSearchInput = document.getElementById('blogSearch');

  const filterBlogs = () => {
    const activeBtn = document.querySelector('[data-blog-filter].active');
    const cat = activeBtn ? activeBtn.getAttribute('data-blog-filter') : 'all';
    const query = blogSearchInput ? blogSearchInput.value.trim().toLowerCase() : '';

    blogCards.forEach((card) => {
      const cardCat = (card.getAttribute('data-blog-category') || '').toLowerCase();
      const text = card.textContent.toLowerCase();
      const show = (cat === 'all' || cardCat === cat.toLowerCase()) && (!query || text.includes(query));
      card.style.display = show ? '' : 'none';
    });
  };

  blogFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      blogFilterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      filterBlogs();
    });
  });

  if (blogSearchInput) {
    blogSearchInput.addEventListener('input', filterBlogs);
  }

  // 7. FAQ Accordion & Searchable FAQ Page
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (btn && answer) {
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Close siblings in same list
        item.parentElement.querySelectorAll('.faq-item.open').forEach((openItem) => {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-answer').style.maxHeight = null;
        });
        if (!isOpen) {
          item.classList.add('open');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });

  const faqSearchInput = document.getElementById('faqSearch');
  const faqCatBtns = document.querySelectorAll('[data-faq-cat]');

  const filterFaqs = () => {
    const activeCatBtn = document.querySelector('[data-faq-cat].active');
    const activeCat = activeCatBtn ? activeCatBtn.getAttribute('data-faq-cat') : 'all';
    const term = faqSearchInput ? faqSearchInput.value.trim().toLowerCase() : '';

    faqItems.forEach((item) => {
      const itemCat = (item.getAttribute('data-faq-category') || 'all').toLowerCase();
      const text = item.textContent.toLowerCase();
      const visible = (activeCat === 'all' || itemCat === activeCat.toLowerCase()) && (!term || text.includes(term));
      item.style.display = visible ? '' : 'none';
    });
  };

  faqCatBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      faqCatBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      filterFaqs();
    });
  });

  if (faqSearchInput) {
    faqSearchInput.addEventListener('input', filterFaqs);
  }

  // 8. Pricing Toggle (Project-Based vs Retainer / Monthly)
  const pricingToggle = document.getElementById('pricingToggle');
  if (pricingToggle) {
    pricingToggle.addEventListener('click', () => {
      const isMonthly = pricingToggle.classList.toggle('active');
      document.querySelectorAll('[data-price-onetime]').forEach((el) => {
        el.textContent = isMonthly
          ? el.getAttribute('data-price-monthly')
          : el.getAttribute('data-price-onetime');
      });
      document.querySelectorAll('[data-period-onetime]').forEach((el) => {
        el.textContent = isMonthly
          ? el.getAttribute('data-period-monthly')
          : el.getAttribute('data-period-onetime');
      });
    });
  }

  // 9. Swiper Testimonial Slider Initialization
  if (typeof Swiper !== 'undefined' && document.querySelector('.testimonials-swiper')) {
    new Swiper('.testimonials-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: {
        delay: 5500,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.testimonial-next',
        prevEl: '.testimonial-prev',
      },
      breakpoints: {
        768: { slidesPerView: 2 },
        1120: { slidesPerView: 3 },
      },
    });
  }

  // 10. Animated Statistics Counters
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length > 0 && 'IntersectionObserver' in window) {
    const animateCounter = (el) => {
      const target = parseInt(el.getAttribute('data-count'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 1800;
      const startTime = performance.now();

      const update = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target) + suffix;
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = target + suffix;
        }
      };
      requestAnimationFrame(update);
    };

    const counterObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );

    counters.forEach((c) => counterObserver.observe(c));
  }

  // 11. Newsletter Form Validation (All Pages)
  document.querySelectorAll('.newsletter-form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      let feedback = form.parentElement.querySelector('.form-feedback');
      if (!feedback) {
        feedback = document.createElement('p');
        feedback.className = 'form-feedback';
        form.parentElement.appendChild(feedback);
      }

      const emailVal = input ? input.value.trim() : '';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(emailVal)) {
        feedback.textContent = 'Please enter a valid work or personal email address.';
        feedback.className = 'form-feedback error';
        return;
      }

      // Frontend validation complete — ready for API endpoint integration (e.g., Mailchimp/ConvertKit/Webhook)
      feedback.textContent = 'Validated! Connect your newsletter API endpoint in main.js to store subscribers.';
      feedback.className = 'form-feedback success';
      input.value = '';
    });
  });

  // 12. Contact Form Validation (Contact Page)
  const contactForm = document.getElementById('nexoraContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const statusBox = document.getElementById('contactFormStatus');
      const name = contactForm.querySelector('#fullName').value.trim();
      const email = contactForm.querySelector('#emailAddress').value.trim();
      const service = contactForm.querySelector('#serviceSelect').value;
      const message = contactForm.querySelector('#projectMessage').value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (name.length < 2) {
        statusBox.textContent = 'Please enter your full name (at least 2 characters).';
        statusBox.className = 'form-feedback error';
        return;
      }
      if (!emailRegex.test(email)) {
        statusBox.textContent = 'Please enter a valid email address.';
        statusBox.className = 'form-feedback error';
        return;
      }
      if (!service) {
        statusBox.textContent = 'Please select the service you are interested in.';
        statusBox.className = 'form-feedback error';
        return;
      }
      if (message.length < 15) {
        statusBox.textContent = 'Please provide a brief overview of your project (at least 15 characters).';
        statusBox.className = 'form-feedback error';
        return;
      }

      // Client-side validation succeeded. Ready to POST payload to Formspree, Resend, or custom backend API.
      statusBox.innerHTML =
        '<strong>Validation Passed:</strong> Your inquiry payload is ready. To send live emails, connect this form action to Formspree, EmailJS, or your backend REST API (see README.md).';
      statusBox.className = 'form-feedback success';
      contactForm.reset();
    });
  }
});
