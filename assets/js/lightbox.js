/* Lightbox tự viết cho life.html: bấm ảnh → xem lớn. Chuột, bàn phím (Esc, ←, →, Tab), vuốt trên mobile. */

var SWIPE_MIN_PX = 50;

var lightboxState = { index: 0, opener: null, root: null, touchX: null };

function getLifeItems() {
  return window.LIFE || [];
}

function buildLightbox() {
  var root = document.createElement('div');
  root.className = 'lightbox';
  root.setAttribute('role', 'dialog');
  root.setAttribute('aria-modal', 'true');
  root.setAttribute('aria-label', 'Xem ảnh');
  root.hidden = true;
  root.innerHTML =
    '<button type="button" class="lightbox__btn lightbox__close" data-lb-close aria-label="Đóng">✕</button>' +
    '<button type="button" class="lightbox__btn lightbox__prev" data-lb-prev aria-label="Ảnh trước">←</button>' +
    '<button type="button" class="lightbox__btn lightbox__next" data-lb-next aria-label="Ảnh sau">→</button>' +
    '<figure class="lightbox__figure">' +
      '<div class="lightbox__media" data-lb-media></div>' +
      '<figcaption class="lightbox__caption" data-lb-caption aria-live="polite"></figcaption>' +
    '</figure>';
  document.body.appendChild(root);
  return root;
}

function renderLightboxItem() {
  var item = getLifeItems()[lightboxState.index];
  var root = lightboxState.root;
  if (!item) return;

  var media = root.querySelector('[data-lb-media]');
  if (item.img) {
    media.innerHTML = '<img src="' + escapeHtml(item.img) + '" alt="' + escapeHtml(item.caption) + '">';
  } else {
    media.innerHTML = '<div class="img-placeholder">' + escapeHtml(item.size || '800×800') + '</div>';
    var ratio = String(item.size || '').split('×');
    if (ratio.length === 2) {
      media.firstChild.style.aspectRatio = Number(ratio[0]) + '/' + Number(ratio[1]);
      media.firstChild.style.setProperty('--ar', Number(ratio[0]) / Number(ratio[1]));
    }
  }

  root.querySelector('[data-lb-caption]').innerHTML =
    '<strong>' + escapeHtml(item.caption) + '</strong>' +
    (item.date ? '<span>' + escapeHtml(item.date) + '</span>' : '') +
    '<span>' + escapeHtml(item.note) + '</span>' +
    '<span class="lightbox__count">' + (lightboxState.index + 1) + ' / ' + getLifeItems().length + '</span>';
}

function setPageInert(isInert) {
  Array.prototype.forEach.call(document.body.children, function toggleInert(el) {
    if (el === lightboxState.root || el.tagName === 'SCRIPT') return;
    if (isInert) el.setAttribute('inert', ''); else el.removeAttribute('inert');
  });
}

function showLightboxAt(index) {
  var total = getLifeItems().length;
  lightboxState.index = (index + total) % total;
  renderLightboxItem();
}

function openLightbox(index, opener) {
  lightboxState.opener = opener;
  lightboxState.root.hidden = false;
  document.body.classList.add('is-locked');
  setPageInert(true);
  showLightboxAt(index);
  lightboxState.root.querySelector('[data-lb-close]').focus();
}

function closeLightbox() {
  var root = lightboxState.root;
  if (root.hidden) return;
  root.hidden = true;
  document.body.classList.remove('is-locked');
  setPageInert(false);
  if (lightboxState.opener) lightboxState.opener.focus();
}

/* Giữ focus trong lightbox: Tab ở nút cuối quay về nút đầu và ngược lại. */
function trapLightboxFocus(event) {
  var buttons = lightboxState.root.querySelectorAll('button');
  var first = buttons[0];
  var last = buttons[buttons.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function handleLightboxKey(event) {
  if (lightboxState.root.hidden) return;
  if (event.key === 'Escape') closeLightbox();
  else if (event.key === 'ArrowLeft') showLightboxAt(lightboxState.index - 1);
  else if (event.key === 'ArrowRight') showLightboxAt(lightboxState.index + 1);
  else if (event.key === 'Tab') trapLightboxFocus(event);
}

function initLightbox() {
  var grid = document.getElementById('life-grid');
  if (!grid || !grid.hasAttribute('data-lightbox') || !getLifeItems().length) return;

  var root = buildLightbox();
  lightboxState.root = root;

  grid.addEventListener('click', function handleGridClick(event) {
    var button = event.target.closest('[data-life-index]');
    if (button) openLightbox(Number(button.getAttribute('data-life-index')), button);
  });

  root.addEventListener('click', function handleRootClick(event) {
    if (event.target.closest('[data-lb-close]') || event.target === root) closeLightbox();
    else if (event.target.closest('[data-lb-prev]')) showLightboxAt(lightboxState.index - 1);
    else if (event.target.closest('[data-lb-next]')) showLightboxAt(lightboxState.index + 1);
  });

  root.addEventListener('touchstart', function handleTouchStart(event) {
    lightboxState.touchX = event.changedTouches[0].clientX;
  }, { passive: true });

  root.addEventListener('touchend', function handleTouchEnd(event) {
    if (lightboxState.touchX === null) return;
    var deltaX = event.changedTouches[0].clientX - lightboxState.touchX;
    lightboxState.touchX = null;
    if (Math.abs(deltaX) < SWIPE_MIN_PX) return;
    showLightboxAt(lightboxState.index + (deltaX < 0 ? 1 : -1));
  }, { passive: true });

  document.addEventListener('keydown', handleLightboxKey);
}

document.addEventListener('DOMContentLoaded', function initLightboxPage() {
  initLightbox();
});
