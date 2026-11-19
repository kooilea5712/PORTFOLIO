/* Hành vi chung mọi trang: navbar, menu mobile, reveal khi cuộn, nút lên đầu trang. */

var NAV_SOLID_OFFSET = 80;
var MOBILE_BREAKPOINT = 768;

function initNavbar() {
  var header = document.querySelector('.site-header');
  if (!header) return;

  /* Trang con không có hero: navbar luôn đặc (data-solid). */
  if (header.hasAttribute('data-solid')) {
    header.classList.add('is-solid');
    return;
  }

  function updateNavbar() {
    header.classList.toggle('is-solid', window.scrollY > NAV_SOLID_OFFSET);
  }

  updateNavbar();
  window.addEventListener('scroll', updateNavbar, { passive: true });
}

function initMobileMenu() {
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('mobile-menu');
  if (!header || !toggle || !menu) return;

  function setMenuOpen(isOpen) {
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? t('nav.closeMenu') : t('nav.openMenu'));
    menu.classList.toggle('is-open', isOpen);
    header.classList.toggle('menu-open', isOpen);
    document.body.classList.toggle('is-locked', isOpen);
    if (isOpen) {
      menu.removeAttribute('inert');
    } else {
      menu.setAttribute('inert', '');
    }
  }

  setMenuOpen(false);

  toggle.addEventListener('click', function handleToggleClick() {
    setMenuOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  menu.addEventListener('click', function handleMenuClick(event) {
    if (event.target.closest('a')) setMenuOpen(false);
  });

  document.addEventListener('keydown', function handleEscape(event) {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) {
      setMenuOpen(false);
      toggle.focus();
    }
  });

  window.addEventListener('resize', function handleResize() {
    if (window.innerWidth >= MOBILE_BREAKPOINT) setMenuOpen(false);
  });
}

function initReveal() {
  var items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach(function showItem(item) { item.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function handleIntersect(entries) {
    entries.forEach(function revealEntry(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(function observeItem(item) { observer.observe(item); });
}

function initBackToTop() {
  var button = document.querySelector('.back-to-top');
  if (!button) return;

  button.addEventListener('click', function handleBackToTop(event) {
    event.preventDefault();
    window.scrollTo({ top: 0 });
  });
}

/* Thiết bị cảm ứng (không có hover): ảnh grayscale hiện màu khi cuộn vào giữa màn hình. */
var inViewObserver = null;

function getInViewObserver() {
  if (inViewObserver) return inViewObserver;
  if (!window.matchMedia('(hover: none)').matches) return null;
  if (!('IntersectionObserver' in window)) return null;

  inViewObserver = new IntersectionObserver(function handleInView(entries) {
    entries.forEach(function toggleInView(entry) {
      entry.target.classList.toggle('is-inview', entry.isIntersecting);
    });
  }, { threshold: 0.6 });
  return inViewObserver;
}

/* Gọi lại sau khi render.js sinh phần tử mới (card dự án, ảnh life…). */
function observeInViewColor(root) {
  var observer = getInViewObserver();
  if (!observer) return;
  var scope = root || document;
  var items = scope.querySelectorAll('.gray-img, .project-card');
  items.forEach(function observeItem(item) { observer.observe(item); });
}

function initInViewColor() {
  observeInViewColor(document);
}

/* Hero: chữ vai trò tự gõ/xoá lần lượt theo PROFILE.roles. */
var HERO_TYPE_MS = 100;
var HERO_DELETE_MS = 50;
var HERO_HOLD_MS = 1600;
var HERO_SWITCH_MS = 400;

function initHeroTyping() {
  var target = document.querySelector('[data-hero-role]');
  if (!target || !window.PROFILE || !PROFILE.roles || !PROFILE.roles.length) return;

  var roles = pickLang(PROFILE.roles);
  var srText = document.querySelector('[data-hero-roles-text]');
  if (srText) srText.textContent = roles.join(', ').toLowerCase();

  target.textContent = roles[0];
  if (roles.length < 2) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var roleIndex = 0;
  var charCount = roles[0].length;
  var isDeleting = true;

  function typeStep() {
    var word = roles[roleIndex];
    charCount += isDeleting ? -1 : 1;
    target.textContent = word.slice(0, charCount);

    var delay = isDeleting ? HERO_DELETE_MS : HERO_TYPE_MS;
    if (!isDeleting && charCount === word.length) {
      isDeleting = true;
      delay = HERO_HOLD_MS;
    } else if (isDeleting && charCount === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = HERO_SWITCH_MS;
    }
    window.setTimeout(typeStep, delay);
  }

  window.setTimeout(typeStep, HERO_HOLD_MS);
}

/* ---------- Hàm dùng chung (render.js, contact.js, project.js) ---------- */

function escapeHtml(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function copyTextFallback(text) {
  return new Promise(function fallbackCopy(resolve, reject) {
    var area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (error) { ok = false; }
    document.body.removeChild(area);
    if (ok) resolve(); else reject(new Error('copy failed'));
  });
}

function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).catch(function useFallback() {
      return copyTextFallback(text);
    });
  }
  return copyTextFallback(text);
}

document.addEventListener('DOMContentLoaded', function initPage() {
  initNavbar();
  initMobileMenu();
  initReveal();
  initBackToTop();
  initInViewColor();
  initHeroTyping();
});
