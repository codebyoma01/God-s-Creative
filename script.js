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
  // remove active from all cat-sections
  document.querySelectorAll('#page-menu .cat-section').forEach(function(s) {
    s.classList.remove('active');
  });
  // add active to selected one
  var target = document.getElementById('menu-' + cat);
  if (target) {
    target.classList.add('active');
  }
  // update tab buttons
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