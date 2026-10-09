/**
 * Artisanshop.ch Reproduction - Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initFaqAccordion();
  initStickyBanner();
  initContactModal();
  initCasinoFilter();
  initLiveSearch();
  initTocSmoothScroll();
});

/* Mobile Menu Drawer Toggle */
function initMobileMenu() {
  const burger = document.querySelector('.burger-box');
  const topNav = document.querySelector('.top-navbar');

  if (burger && topNav) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      topNav.classList.toggle('mobile-active');
    });
  }
}

/* FAQ Accordion Toggle */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-list .item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all accordion items
        faqItems.forEach(i => i.classList.remove('active'));

        // Toggle clicked item
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

/* Sticky Bottom Banner Close & Persistence */
function initStickyBanner() {
  const banner = document.getElementById('sticky-banner');
  const closeBtn = document.querySelector('.banner-close');

  if (banner && closeBtn) {
    // Check if user dismissed banner previously in session
    if (sessionStorage.getItem('artisanshop_banner_closed') === 'true') {
      banner.classList.add('hidden');
    }

    closeBtn.addEventListener('click', () => {
      banner.classList.add('hidden');
      sessionStorage.setItem('artisanshop_banner_closed', 'true');
    });
  }
}

/* Contact Us Modal Overlay */
function initContactModal() {
  const contactLinks = document.querySelectorAll('a[href="/#"], a[href="#contact"], .contact-trigger');
  const modal = document.getElementById('contact-modal');
  const modalClose = document.querySelector('.modal-close');
  const contactForm = document.getElementById('contact-form-element');

  if (modal) {
    contactLinks.forEach(link => {
      if (link.textContent.toLowerCase().includes('kontakt')) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          modal.classList.add('active');
        });
      }
    });

    if (modalClose) {
      modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });

    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.');
        modal.classList.remove('active');
        contactForm.reset();
      });
    }
  }
}

/* Casino Brand Table Filter */
function initCasinoFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const brandCards = document.querySelectorAll('.brand-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      brandCards.forEach(card => {
        if (filter === 'all') {
          card.style.display = 'grid';
        } else if (filter === 'high-bonus') {
          const value = card.querySelector('.dynamic-field-box .value').textContent;
          if (value.includes('3.500') || value.includes('3.000') || value.includes('5 500')) {
            card.style.display = 'grid';
          } else {
            card.style.display = 'none';
          }
        } else if (filter === 'fast-pay') {
          const text = card.textContent;
          if (text.includes('Needforspin') || text.includes('Spinlander')) {
            card.style.display = 'grid';
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  });
}

/* Live Search Filter */
function initLiveSearch() {
  const searchInput = document.getElementById('search-box');
  const brandCards = document.querySelectorAll('.brand-card');
  const textSections = document.querySelectorAll('.grw-text-box p, table tbody tr');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();

      if (term === '') {
        brandCards.forEach(card => card.style.display = 'grid');
        return;
      }

      brandCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(term)) {
          card.style.display = 'grid';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }
}

/* Table of Contents Smooth Scroll & Active Highlight */
function initTocSmoothScroll() {
  const tocLinks = document.querySelectorAll('.toc');

  tocLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}
