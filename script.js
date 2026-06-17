function showPage(name) {
  document.querySelectorAll('.page').forEach(function(p) {
    p.classList.remove('active');
  });
  document.getElementById('page-' + name).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.querySelectorAll('.nav-links button').forEach(function(b) {
    b.classList.remove('active');
  });
}

function toggleMenu() {
  document.getElementById('mobileNav').classList.toggle('open');
}

function closeMenu() {
  document.getElementById('mobileNav').classList.remove('open');
}

function switchMenuTab(cat, btn) {
  document.querySelectorAll('#page-menu .cat-section').forEach(function(s) {
    s.classList.remove('active');
  });
  var target = document.getElementById('menu-' + cat);
  if (target) {
    target.classList.add('active');
  }
  document.querySelectorAll('#menuTabBar .tab-btn').forEach(function(b) {
    b.classList.remove('active');
  });
  btn.classList.add('active');
}

function filterGallery(cat, btn) {
  document.querySelectorAll('#galleryGrid .gallery-item').forEach(function(item) {
    if (cat === 'all' || item.getAttribute('data-cat') === cat) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
  document.querySelectorAll('#galleryTabBar .tab-btn').forEach(function(b) {
    b.classList.remove('active');
  });
  btn.classList.add('active');
}

function sendToWhatsApp() {
  var name = document.getElementById('cf-name').value.trim();
  var phone = document.getElementById('cf-phone').value.trim();
  var evt = document.getElementById('cf-event').value;
  var msg = document.getElementById('cf-message').value.trim();
  if (!name) { alert('Please enter your name.'); return; }
  var text = "Hello God's Creative Events!\n\nName: " + name + "\nPhone: " + (phone || 'Not provided') + "\nEvent Type: " + (evt || 'Not specified') + "\n\nMessage:\n" + (msg || 'I would like to enquire about your services.');
  window.open('https://wa.me/2348065084101?text=' + encodeURIComponent(text), '_blank');
}

document.addEventListener('click', function(e) {
  var nav = document.getElementById('mobileNav');
  var hamburger = document.querySelector('.nav-hamburger');
  if (nav && nav.classList.contains('open') && !nav.contains(e.target) && !hamburger.contains(e.target)) {
    closeMenu();
  }
});

/* ===== TESTIMONIALS CAROUSEL ===== */
(function() {
  var track, slides, current, total, autoTimer, slidesPerView;

  function getSlidesPerView() {
    if (window.innerWidth >= 900) return 3;
    if (window.innerWidth >= 600) return 2;
    return 1;
  }

  function buildDots() {
    var dotsContainer = document.getElementById('carouselDots');
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    var numDots = total - slidesPerView + 1;
    if (numDots < 1) numDots = 1;
    for (var i = 0; i < numDots; i++) {
      (function(idx) {
        var dot = document.createElement('button');
        dot.className = 'carousel-dot' + (idx === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to review ' + (idx + 1));
        dot.addEventListener('click', function() { goTo(idx); startAuto(); });
        dotsContainer.appendChild(dot);
      })(i);
    }
  }

  function applySlideWidths() {
    slidesPerView = getSlidesPerView();
    var pct = 100 / slidesPerView;
    slides.forEach(function(s) { s.style.minWidth = pct + '%'; });
  }

  function goTo(idx, instant) {
    slidesPerView = getSlidesPerView();
    var maxIdx = total - slidesPerView;
    if (maxIdx < 0) maxIdx = 0;
    if (idx < 0) idx = maxIdx;
    if (idx > maxIdx) idx = 0;
    current = idx;

    var offset = -(100 / slidesPerView) * current;
    track.style.transition = instant ? 'none' : 'transform .5s cubic-bezier(.4,0,.2,1)';
    track.style.transform = 'translateX(' + offset + '%)';

    var dotsContainer = document.getElementById('carouselDots');
    if (dotsContainer) {
      dotsContainer.querySelectorAll('.carousel-dot').forEach(function(d, i) {
        d.classList.toggle('active', i === current);
      });
    }
  }

  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(function() { goTo(current + 1); }, 4500);
  }

  function initCarousel() {
    track = document.getElementById('reviewsTrack');
    if (!track) return;
    slides = track.querySelectorAll('.review-slide');
    total = slides.length;
    current = 0;
    slidesPerView = getSlidesPerView();
    applySlideWidths();
    buildDots();
    goTo(0, true);
    startAuto();
  }

  window.carouselMove = function(dir) {
    goTo(current + dir);
    startAuto();
  };

  // Re-init on resize
  var resizeTimer, lastSpv;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      var newSpv = getSlidesPerView();
      if (newSpv !== lastSpv) {
        lastSpv = newSpv;
        applySlideWidths();
        buildDots();
        goTo(current, true);
      }
    }, 200);
  });

  // Carousel lives on the homepage — init on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function() {
    lastSpv = getSlidesPerView();
    initCarousel();
  });
})();