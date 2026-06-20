(function () {
    'use strict';
  
    /* ---------- 1. Sticky nav shadow on scroll ---------- */
    var nav = document.querySelector('.nav');
    function handleNavScroll() {
      if (!nav) return;
      if (window.scrollY > 12) {
        nav.classList.add('is-scrolled');
      } else {
        nav.classList.remove('is-scrolled');
      }
    }
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();
  
    /* ---------- 2. Floating WhatsApp button entrance ---------- */
    var waFloat = document.querySelector('.wa-float');
    function handleWaVisibility() {
      if (!waFloat) return;
      if (window.scrollY > 220) {
        waFloat.classList.add('wa-visible');
      }
    }
    window.addEventListener('scroll', handleWaVisibility, { passive: true });
    handleWaVisibility();
  
    /* ---------- 3. Scroll-reveal: tag elements automatically ---------- */
    function tagRevealTargets() {
      var selectors = [
        '.section-header',
        '.svc-card',
        '.svc-page-card',
        '.food-card',
        '.delivery-card',
        '.event-card',
        '.testi-card',
        '.stat-box',
        '.why-card',
        '.mv-card',
        '.gallery-item',
        '.contact-info-card',
        '.wa-card',
        '.kitchen-intro',
        '.division-header'
      ];
      var nodes = document.querySelectorAll(selectors.join(','));
      nodes.forEach(function (el, i) {
        if (el.classList.contains('reveal')) return; // already tagged
        el.classList.add('reveal');
        // Stagger within the same parent (cards in a grid) by a small increment
        var siblingsTagged = el.parentElement ? el.parentElement.querySelectorAll('.reveal').length : 0;
        var delay = Math.min(siblingsTagged * 70, 420);
        el.style.setProperty('--rd', delay + 'ms');
      });
    }
  
    /* ---------- 4. Image reveal: wrap-free approach using existing img containers ---------- */
    function tagImageReveal() {
      var imgContainers = document.querySelectorAll(
        '.svc-img, .svc-page-img, .food-img, .ev-img, .delivery-img, .gallery-item, .delivery-img'
      );
      imgContainers.forEach(function (el) {
        if (el.classList.contains('img-reveal')) return;
        var img = el.querySelector('img');
        if (img) {
          el.classList.add('img-reveal');
        }
      });
    }
  
    /* ---------- 5. IntersectionObserver to flip visibility classes ---------- */
    var observer;
    function initObserver() {
      if (!('IntersectionObserver' in window)) {
        // Fallback: just show everything immediately
        document.querySelectorAll('.reveal').forEach(function (el) {
          el.classList.add('reveal-visible');
        });
        document.querySelectorAll('.img-reveal').forEach(function (el) {
          el.classList.add('img-reveal-visible');
        });
        return;
      }
  
      observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('reveal-visible');
              entry.target.classList.add('img-reveal-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );
  
      document.querySelectorAll('.reveal, .img-reveal').forEach(function (el) {
        observer.observe(el);
      });
    }
  
    /* ---------- 6. Lazy image fade-in once loaded ---------- */
    function handleLazyFade() {
      var imgs = document.querySelectorAll('img');
      imgs.forEach(function (img) {
        if (img.complete && img.naturalWidth > 0) {
          img.classList.add('img-loaded');
        } else {
          img.addEventListener('load', function () {
            img.classList.add('img-loaded');
          });
        }
      });
    }
  
    /* ---------- 7. Re-run tagging/observing whenever a page is shown ---------- */
    function refreshRevealsForActivePage() {
      tagRevealTargets();
      tagImageReveal();
      handleLazyFade();
      if (observer) {
        document.querySelectorAll('.reveal:not(.reveal-visible), .img-reveal:not(.img-reveal-visible)').forEach(function (el) {
          observer.observe(el);
        });
      }
    }
  
    // Hook into existing showPage (defined in script.js) without overwriting its behavior
    function wireShowPageHook() {
      if (typeof window.showPage !== 'function') {
        // script.js not loaded yet — retry shortly
        setTimeout(wireShowPageHook, 50);
        return;
      }
      var existingShowPage = window.showPage;
      window.showPage = function (name) {
        existingShowPage(name);
        // Allow the just-activated page's DOM to be visible before tagging
        setTimeout(refreshRevealsForActivePage, 60);
      };
    }
  
    /* ---------- 8. Init on DOM ready ---------- */
    document.addEventListener('DOMContentLoaded', function () {
      tagRevealTargets();
      tagImageReveal();
      handleLazyFade();
      initObserver();
      wireShowPageHook();
    });
  })();