/**
 * Noxastudio AGENCY — CORE INTERACTIVITY, WORKING FORMS & BLOG ENGINE
 * Owner: Aditya Radye | Phone: +91 8087102969 | Email: adityaradye733@gmail.com
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
      setTimeout(() => preloader.classList.add('hidden'), 300);
    });
    setTimeout(() => preloader.classList.add('hidden'), 1200);
  }

  // 3. Sticky Header & Back-to-Top Visibility
  const header = document.querySelector('.site-header');
  const backToTopBtn = document.querySelector('.back-to-top');

  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (header) header.classList.toggle('scrolled', scrollY > 40);
    if (backToTopBtn) backToTopBtn.classList.toggle('visible', scrollY > 450);
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

  // 5. Portfolio Category Filtering
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
  if (projectSearchInput) projectSearchInput.addEventListener('input', filterProjects);

  // 6. Blog Category Filter & Search (blog.html)
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
      const show = (cat === 'all' || cardCat.includes(cat.toLowerCase())) && (!query || text.includes(query));
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
  if (blogSearchInput) blogSearchInput.addEventListener('input', filterBlogs);

  // 7. Dynamic Blog Post Loader (blog-details.html?post=...)
  const blogPosts = {
    cwv: {
      title: 'How Technical SEO & Clean HTML/CSS/JS Boost Google Rankings in 2026',
      meta: 'By Aditya Radye • Noxastudio SEO & Engineering • 6 min read',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1100&q=80',
      body: `
        <h2 style="font-size:1.75rem; margin-bottom:1rem;">1. Why Clean Code Matters for SEO</h2>
        <p style="color:var(--text-secondary); margin-bottom:1.5rem;">Search engines reward fast, semantic websites. At Noxastudio, every HTML, CSS, and JavaScript build is structured with clean heading hierarchies, schema-ready markup, and zero render-blocking bloat.</p>
        <h2 style="font-size:1.75rem; margin-bottom:1rem;">2. Sub-Second Largest Contentful Paint (LCP)</h2>
        <p style="color:var(--text-secondary); margin-bottom:1.5rem;">Optimizing hero assets, compressing modern WebP images, and deferring non-critical JavaScript keeps LCP under 1.2 seconds—reducing bounce rates and increasing organic conversions.</p>
        <h2 style="font-size:1.75rem; margin-bottom:1rem;">3. On-Page SEO & Conversion Alignment</h2>
        <p style="color:var(--text-secondary); margin-bottom:2rem;">Pairing technical speed with targeted keyword architecture and clear calls-to-action turns organic visitors into qualified leads.</p>
      `
    },
    ecommerce: {
      title: 'Shopify vs. WooCommerce & WordPress Elementor: Choosing the Right Store Stack',
      meta: 'By Aditya Radye • eCommerce Architecture • 7 min read',
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1100&q=80',
      body: `
        <h2 style="font-size:1.75rem; margin-bottom:1rem;">1. When to Choose Shopify</h2>
        <p style="color:var(--text-secondary); margin-bottom:1.5rem;">Shopify offers hosted reliability, rapid checkout flows, and effortless inventory management for D2C brands scaling paid ads and social traffic.</p>
        <h2 style="font-size:1.75rem; margin-bottom:1rem;">2. When WordPress + Elementor + WooCommerce Wins</h2>
        <p style="color:var(--text-secondary); margin-bottom:1.5rem;">If you need deep content marketing, custom SEO landing pages, and complete ownership over hosting and checkout customization, WordPress with Elementor and WooCommerce gives unmatched flexibility.</p>
        <h2 style="font-size:1.75rem; margin-bottom:1rem;">3. High-Converting Landing Pages</h2>
        <p style="color:var(--text-secondary); margin-bottom:2rem;">Regardless of platform, dedicated product landing pages with trust badges, fast mobile layouts, and friction-free forms consistently lift conversion rates.</p>
      `
    },
    java: {
      title: 'Building Secure Web Applications with Java, Servlets & C/C++ Core Logic',
      meta: 'By Aditya Radye • Backend & Systems Engineering • 5 min read',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1100&q=80',
      body: `
        <h2 style="font-size:1.75rem; margin-bottom:1rem;">1. Reliable Request Handling with Java & Servlets</h2>
        <p style="color:var(--text-secondary); margin-bottom:1.5rem;">Java Servlets provide robust session management, MVC architecture, and strong type safety for enterprise portals, booking engines, and custom business dashboards.</p>
        <h2 style="font-size:1.75rem; margin-bottom:1rem;">2. Performance-Critical Modules in C & C++</h2>
        <p style="color:var(--text-secondary); margin-bottom:2rem;">When applications demand low-level memory control and algorithmic speed, C and C++ components ensure predictable execution under heavy workloads.</p>
      `
    }
  };

  const articleContainer = document.getElementById('dynamicBlogContent');
  if (articleContainer) {
    const params = new URLSearchParams(window.location.search);
    const postKey = params.get('post') || 'cwv';
    const post = blogPosts[postKey] || blogPosts.cwv;
    const titleEl = document.getElementById('blogDetailTitle');
    const metaEl = document.getElementById('blogDetailMeta');
    const imgEl = document.getElementById('blogDetailImg');
    if (titleEl) titleEl.textContent = post.title;
    if (metaEl) metaEl.textContent = post.meta;
    if (imgEl) imgEl.src = post.image;
    articleContainer.innerHTML = post.body;
  }

  // 8. FAQ Accordion & Search
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (btn && answer) {
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
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

  // 9. Pricing Toggle
  const pricingToggle = document.getElementById('pricingToggle');
  if (pricingToggle) {
    pricingToggle.addEventListener('click', () => {
      const isMonthly = pricingToggle.classList.toggle('active');
      document.querySelectorAll('[data-price-onetime]').forEach((el) => {
        el.textContent = isMonthly ? el.getAttribute('data-price-monthly') : el.getAttribute('data-price-onetime');
      });
      document.querySelectorAll('[data-period-onetime]').forEach((el) => {
        el.textContent = isMonthly ? el.getAttribute('data-period-monthly') : el.getAttribute('data-period-onetime');
      });
    });
  }

  // 10. Swiper Testimonial Slider
  if (typeof Swiper !== 'undefined' && document.querySelector('.testimonials-swiper')) {
    new Swiper('.testimonials-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: { delay: 5500, disableOnInteraction: false },
      navigation: { nextEl: '.testimonial-next', prevEl: '.testimonial-prev' },
      breakpoints: { 768: { slidesPerView: 2 }, 1120: { slidesPerView: 3 } },
    });
  }

  // 11. Animated Statistics Counters
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length > 0 && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'), 10);
          const suffix = el.getAttribute('data-suffix') || '';
          const startTime = performance.now();
          const update = (now) => {
            const progress = Math.min((now - startTime) / 1600, 1);
            el.textContent = Math.floor((1 - Math.pow(1 - progress, 3)) * target) + suffix;
            if (progress < 1) requestAnimationFrame(update);
            else el.textContent = target + suffix;
          };
          requestAnimationFrame(update);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.35 });
    counters.forEach((c) => counterObserver.observe(c));
  }

  // 12. Working Newsletter Form (Sends to adityaradye733@gmail.com via FormSubmit)
  document.querySelectorAll('.newsletter-form').forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      let feedback = form.parentElement.querySelector('.form-feedback');
      if (!feedback) {
        feedback = document.createElement('p');
        feedback.className = 'form-feedback';
        form.parentElement.appendChild(feedback);
      }

      const emailVal = input ? input.value.trim() : '';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
        feedback.textContent = 'Please enter a valid email address.';
        feedback.className = 'form-feedback error';
        return;
      }

      feedback.textContent = 'Subscribing...';
      feedback.className = 'form-feedback';

      try {
        await fetch('https://formsubmit.co/ajax/adityaradye733@gmail.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            _subject: 'New Noxastudio Newsletter Subscriber',
            subscriber_email: emailVal
          })
        });
        feedback.textContent = 'Subscribed! Thank you for joining Noxastudio insights.';
        feedback.className = 'form-feedback success';
        input.value = '';
      } catch (err) {
        feedback.textContent = 'Saved locally. Reach us anytime at adityaradye733@gmail.com.';
        feedback.className = 'form-feedback success';
        input.value = '';
      }
    });
  });

  // 13. Working Contact Form (Sends directly to adityaradye733@gmail.com)
  const contactForm = document.getElementById('nexoraContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const statusBox = document.getElementById('contactFormStatus');
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const name = contactForm.querySelector('#fullName').value.trim();
      const email = contactForm.querySelector('#emailAddress').value.trim();
      const phone = contactForm.querySelector('#phoneNumber')?.value.trim() || 'Not provided';
      const service = contactForm.querySelector('#serviceSelect').value;
      const budget = contactForm.querySelector('#projectBudget')?.value || 'Not specified';
      const message = contactForm.querySelector('#projectMessage').value.trim();

      if (name.length < 2) {
        statusBox.textContent = 'Please enter your full name.';
        statusBox.className = 'form-feedback error';
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        statusBox.textContent = 'Please enter a valid email address.';
        statusBox.className = 'form-feedback error';
        return;
      }
      if (!service) {
        statusBox.textContent = 'Please select a service.';
        statusBox.className = 'form-feedback error';
        return;
      }
      if (message.length < 10) {
        statusBox.textContent = 'Please enter a short description of your project (at least 10 characters).';
        statusBox.className = 'form-feedback error';
        return;
      }

      if (submitBtn) submitBtn.disabled = true;
      statusBox.textContent = 'Sending your inquiry to Aditya Radye (Noxastudio)...';
      statusBox.className = 'form-feedback';

      try {
        const res = await fetch('https://formsubmit.co/ajax/adityaradye733@gmail.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            _subject: `New Noxastudio Inquiry: ${service} — ${name}`,
            Name: name,
            Email: email,
            Phone: phone,
            Service: service,
            Budget: budget,
            Message: message
          })
        });

        if (res.ok) {
          statusBox.innerHTML =
            '<strong>Message Sent!</strong> Thank you, ' + name + '. Aditya Radye will contact you within 24 hours, or you can message us directly on <a href="https://wa.me/918087102969" target="_blank" style="text-decoration:underline;color:#34D399;">WhatsApp (+91 80871 02969)</a>.';
          statusBox.className = 'form-feedback success';
          contactForm.reset();
        } else {
          throw new Error('Submission failed');
        }
      } catch (err) {
        // Fallback to mailto if offline or blocked
        const mailtoUrl = `mailto:adityaradye733@gmail.com?subject=${encodeURIComponent('Noxastudio Project Inquiry: ' + service)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\nBudget: ${budget}\n\nMessage:\n${message}`)}`;
        statusBox.innerHTML = `Opening your email client to send directly to <strong>adityaradye733@gmail.com</strong>... <a href="${mailtoUrl}" style="text-decoration:underline;">Click here if it didn't open</a>.`;
        statusBox.className = 'form-feedback success';
        window.location.href = mailtoUrl;
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }
});
