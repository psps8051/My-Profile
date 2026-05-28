/* shared.js — nav + footer injection + scroll behaviours */

const NAV_LINKS = [
  { href: 'index.html',    label: 'Home' },
  { href: 'about.html',    label: 'About Us' },
  { href: 'services.html', label: 'Services' },
  { href: 'team.html',     label: 'Our Team' },
  { href: 'events.html',   label: 'Events' },
  { href: 'gallery.html',  label: 'Gallery' },
  { href: 'contact.html',  label: 'Contact Us' },
];

function buildNav(activePage) {
  const links = NAV_LINKS.map(l =>
    `<li><a href="${l.href}" class="${l.href === activePage ? 'active' : ''}">${l.label}</a></li>`
  ).join('');
  const mobileLinks = NAV_LINKS.map(l =>
    `<a href="${l.href}" class="${l.href === activePage ? 'active' : ''}">${l.label}</a>`
  ).join('');

  return `
  <nav class="nav" id="navbar">
    <a class="nav-logo-img" href="index.html" style="display:flex;align-items:center;gap:0.6rem;text-decoration:none;">
      <img src="logo1.png" alt="Logo" style="height:42px;width:auto;object-fit:contain;flex-shrink:0;">
      <span style="display:flex;flex-direction:column;line-height:1.15;">
        <span style="font-family:'Noto Sans Devanagari','Mangal',sans-serif;font-size:0.95rem;font-weight:800;color:#1e2b1e;letter-spacing:0.01em;">स्वास्थ्यसिद्धी योग</span>
        <span style="font-family:'Noto Sans Devanagari','Mangal',sans-serif;font-size:0.62rem;font-weight:400;color:var(--warm-gray);letter-spacing:0.06em;">योगः कर्मसु कौशलम्</span>
      </span>
    </a>
    <ul class="nav-links">${links}</ul>
    <a class="nav-cta btn" href="contact.html">Join a Batch</a>
    <button class="hamburger" id="hamburger" aria-label="Open menu">
      <span></span><span></span><span></span>
    </button>
  </nav>
  <div class="mobile-menu" id="mobileMenu">${mobileLinks}</div>`;
}

function buildFooter() {
  return `
  <footer>
    <div class="footer-top">
      <div>
        <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.75rem;">
          <img src="logo1.png" alt="Logo" style="height:52px;width:auto;object-fit:contain;">
          <span style="display:flex;flex-direction:column;line-height:1.3;">
            <span style="font-family:'Noto Sans Devanagari','Mangal',sans-serif;font-size:1rem;font-weight:800;color:var(--white);letter-spacing:0.01em;">स्वास्थ्यसिद्धी योग</span>
            <span style="font-family:'Noto Sans Devanagari','Mangal',sans-serif;font-size:0.72rem;font-weight:400;color:rgba(255,255,255,0.45);letter-spacing:0.05em;">योगः कर्मसु कौशलम्</span>
          </span>
        </div>
        <p class="footer-tagline">योगः कर्मसु कौशलम्<br>Paud Road, Kothrud, Pune — since 1st November 2011.</p>
        <div class="footer-social">
          <a href="#" title="Instagram">🌿</a>
          <a href="#" title="Facebook">📘</a>
          <a href="#" title="YouTube">▶️</a>
          <a href="#" title="WhatsApp">💬</a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Explore</h4>
        <ul>
          <li><a href="about.html">About Us</a></li>
          <li><a href="services.html">Services</a></li>
          <li><a href="team.html">Our Team</a></li>
          <li><a href="events.html">Events</a></li>
          <li><a href="gallery.html">Gallery</a></li>
          <li><a href="contact.html">Contact Us</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Our Batches</h4>
        <ul>
          <li><a href="services.html">Fitness Yoga</a></li>
          <li><a href="services.html">Senior Citizens' Batch</a></li>
          <li><a href="services.html">Pregnancy Batch</a></li>
          <li><a href="services.html">Meditation Batch</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <ul>
          <li><a href="contact.html">Dengle Art Gallery, Vanaz Corner,<br>Paud Rd, Kothrud, Pune 411038</a></li>
          <li><a href="tel:+919880000000">+91 988xx xxxxx</a></li>
          <li><a href="mailto:ssyogapune@gmail.com">ssyogapune@gmail.com</a></li>
          <li><a href="services.html">Mon–Fri · 6:30 AM – 7:30 PM</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2025 स्वास्थ्यसिद्धी योग, Pune. All rights reserved.</span>
      <span>Made with 🙏 in Pune</span>
    </div>
  </footer>`;
}

function initPage(activePage) {
  // inject nav
  const navHolder = document.getElementById('nav-holder');
  if (navHolder) navHolder.innerHTML = buildNav(activePage);

  // inject footer
  const footerHolder = document.getElementById('footer-holder');
  if (footerHolder) footerHolder.innerHTML = buildFooter();

  // nav scroll shadow
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  // hamburger
  document.addEventListener('click', e => {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (!hamburger || !mobileMenu) return;
    if (hamburger.contains(e.target)) {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    } else if (!mobileMenu.contains(e.target)) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    }
  });

  // scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const ro = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('visible'); ro.unobserve(en.target); }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => ro.observe(el));

  // form submit
  document.querySelectorAll('form[data-ajax]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const success = form.querySelector('.form-success');
      if (success) { success.style.display = 'block'; }
      form.querySelectorAll('input,select,textarea').forEach(el => el.value = '');
    });
  });
}
