function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
}

function toggleMenu() {
  document.getElementById('mobileNav').classList.toggle('open');
}

function closeMenu() {
  document.getElementById('mobileNav').classList.remove('open');
}

function switchMenuTab(cat, btn) {
  // hide all menu category sections
  document.querySelectorAll('#page-menu .cat-section').forEach(s => {
    s.classList.remove('active');
    s.style.display = 'none';
  });
  // show the selected one
  const target = document.getElementById('menu-' + cat);
  target.classList.add('active');
  target.style.display = 'grid';
  // update tab button states scoped to menu tab bar only
  document.querySelectorAll('#menuTabBar .tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function sendToWhatsApp() {
  const name = document.getElementById('cf-name').value.trim();
  const phone = document.getElementById('cf-phone').value.trim();
  const evt = document.getElementById('cf-event').value;
  const msg = document.getElementById('cf-message').value.trim();
  if (!name) { alert('Please enter your name.'); return; }
  const text = `Hello God's Creative Events! 👋\n\nName: ${name}\nPhone: ${phone || 'Not provided'}\nEvent Type: ${evt || 'Not specified'}\n\nMessage:\n${msg || 'I would like to enquire about your services.'}`;
  window.open('https://wa.me/2348065084101?text=' + encodeURIComponent(text), '_blank');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function (e) {
  const nav = document.getElementById('mobileNav');
  const hamburger = document.querySelector('.nav-hamburger');
  if (nav.classList.contains('open') && !nav.contains(e.target) && !hamburger.contains(e.target)) {
    closeMenu();
  }
});