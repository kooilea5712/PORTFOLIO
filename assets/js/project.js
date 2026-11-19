/* Trang chi tiết dự án: project.html?p=<slug>. Dùng escapeHtml/copyText (main.js), PROJECT_TYPE_LABELS/renderIconPlaceholder (render.js). */

var WIDE_QUERY = '(min-width: 768px)';
var COPIED_RESET_MS = 2000;

function getProjectSlug() {
  return new URLSearchParams(window.location.search).get('p');
}

function findProject(slug) {
  if (!slug || !window.PROJECTS) return null;
  return PROJECTS.filter(function matchSlug(project) { return project.slug === slug; })[0] || null;
}

/* ---------- Tiện ích nhỏ ---------- */

function renderExternalButton(label, url) {
  return '<a class="btn-bracket" href="' + escapeHtml(url) + '" target="_blank" rel="noopener">' + label + '</a>';
}

function renderCover(project, size) {
  return project.cover
    ? '<img src="' + escapeHtml(project.cover) + '" alt="Ảnh bìa ' + escapeHtml(project.title) + '" loading="lazy">'
    : renderIconPlaceholder(size);
}

/* Trả về id YouTube nếu url là link YouTube, ngược lại null. */
function getYoutubeId(url) {
  var match = String(url || '').match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  return match ? match[1] : null;
}

function renderVideo(project) {
  var url = (project.links || {}).video;
  var youtubeId = getYoutubeId(url);
  var inner;

  if (youtubeId) {
    inner = '<iframe src="https://www.youtube-nocookie.com/embed/' + youtubeId + '" title="Video demo ' + escapeHtml(project.title) + '" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="encrypted-media; picture-in-picture" allowfullscreen></iframe>';
  } else if (url) {
    inner = '<video controls preload="metadata" src="' + escapeHtml(url) + '">Trình duyệt không hỗ trợ video.</video>';
  } else {
    inner = renderIconPlaceholder('Video demo 1280×720');
  }
  return '<div class="project-video">' + inner + '</div>';
}

/* ---------- Khối "Xem thử" theo loại ---------- */

function renderPreviewWeb(project, isWide) {
  var demo = (project.links || {}).demo;
  if (!demo) {
    return '<div class="project-media">' + renderCover(project, '1600×1000') + '</div>';
  }

  var absoluteUrl = new URL(demo, window.location.href).href;
  var openButton = '<div class="project-preview__actions">' + renderExternalButton('Mở toàn màn hình', demo) + '</div>';

  if (!isWide) {
    return '<div class="project-media">' + renderCover(project, '1600×1000') + '</div>' + openButton;
  }

  return '<div class="browser-frame">' +
    '<div class="browser-frame__bar"><span class="browser-frame__dots" aria-hidden="true"><i></i><i></i><i></i></span>' +
    '<span class="browser-frame__url">' + escapeHtml(absoluteUrl) + '</span></div>' +
    '<iframe class="browser-frame__view" src="' + escapeHtml(demo) + '" title="Xem thử ' + escapeHtml(project.title) + '" loading="lazy" sandbox="allow-scripts allow-same-origin allow-forms"></iframe>' +
    '</div>' + openButton;
}

function renderPreviewDesktop(project) {
  var links = project.links || {};
  var parts = [renderVideo(project)];
  if (project.requirements) {
    parts.push('<p class="project-requirements"><span class="label">Yêu cầu hệ thống</span> ' + escapeHtml(project.requirements) + '</p>');
  }
  if (links.download) {
    parts.push('<div class="project-preview__actions">' + renderExternalButton('Tải xuống', links.download) + '</div>');
  }
  return parts.join('');
}

function renderPreviewLocal(project) {
  var commands = project.runLocal || [];
  var parts = [renderVideo(project)];

  if (commands.length) {
    parts.push('<div class="codeblock">' +
      '<div class="codeblock__bar"><span class="label">Cách chạy local</span>' +
      '<button class="btn-bracket" type="button" data-copy-code>Copy</button></div>' +
      '<pre class="codeblock__pre"><code>' +
      commands.map(function renderLine(line) { return '<span class="codeblock__line">' + escapeHtml(line) + '</span>'; }).join('') +
      '</code></pre></div>');
  }
  return parts.join('');
}

function renderPreviewDesign(project) {
  var figma = (project.links || {}).figma;
  return '<div class="project-media">' + renderCover(project, '1600×1000') + '</div>' +
    (figma ? '<div class="project-preview__actions">' + renderExternalButton('Mở Figma', figma) + '</div>' : '');
}

function renderPreview(project, isWide) {
  if (project.type === 'web') return renderPreviewWeb(project, isWide);
  if (project.type === 'desktop') return renderPreviewDesktop(project);
  if (project.type === 'local') return renderPreviewLocal(project);
  if (project.type === 'design') return renderPreviewDesign(project);
  return '';
}

/* ---------- Các phần còn lại ---------- */

function renderProjectHeader(project) {
  var links = project.links || {};
  var buttons = [];
  if (links.demo) buttons.push(renderExternalButton('Demo', links.demo));
  if (links.github) buttons.push(renderExternalButton('Code', links.github));
  if (links.download) buttons.push(renderExternalButton('Tải xuống', links.download));

  return '<a class="btn-bracket project__back" href="projects.html"><span aria-hidden="true">←&nbsp;</span>Quay lại</a>' +
    '<p class="project__type label">' + escapeHtml(PROJECT_TYPE_LABELS[project.type] || project.type) + '</p>' +
    '<h1 class="project__title">' + escapeHtml(project.title) + '</h1>' +
    '<p class="project__summary">' + escapeHtml(project.summary) + '</p>' +
    '<p class="project__meta label">' + escapeHtml(project.year) + ' · ' + escapeHtml(project.role) + '</p>' +
    (buttons.length ? '<div class="btn-group project__actions">' + buttons.join('') + '</div>' : '');
}

function renderCaseStudy(project) {
  var study = project.caseStudy || {};
  var blocks = [
    ['Vấn đề', study.problem],
    ['Giải pháp', study.solution],
    ['Kết quả', study.result],
    ['Điều học được', study.learned]
  ].filter(function hasText(pair) { return pair[1]; });

  return blocks.map(function renderBlock(pair) {
    return '<div class="case-block"><h3 class="label">' + pair[0] + '</h3><p class="text-body">' + escapeHtml(pair[1]) + '</p></div>';
  }).join('');
}

function renderStackAndFeatures(project) {
  var tags = (project.stack || []).map(function renderTag(name) {
    return '<li class="tag">' + escapeHtml(name) + '</li>';
  }).join('');
  var features = (project.features || []).map(function renderFeature(text) {
    return '<li>' + escapeHtml(text) + '</li>';
  }).join('');

  return '<div><h3 class="label">Công nghệ đã dùng</h3><ul class="tag-list">' + tags + '</ul></div>' +
    '<div><h3 class="label">Tính năng chính</h3><ul class="feature-list">' + features + '</ul></div>';
}

function renderGallery(project) {
  var items = project.gallery || [];
  if (!items.length) return '';

  return '<ul class="gallery">' + items.map(function renderItem(src, index) {
    var media = src
      ? '<img src="' + escapeHtml(src) + '" alt="Ảnh ' + (index + 1) + ' của ' + escapeHtml(project.title) + '" loading="lazy">'
      : renderIconPlaceholder('1600×1000');
    return '<li class="gallery__item gray-img">' + media + '</li>';
  }).join('') + '</ul>';
}

function renderProjectNav(project) {
  var list = window.PROJECTS || [];
  var index = list.indexOf(project);
  var prev = index > 0 ? list[index - 1] : null;
  var next = index < list.length - 1 ? list[index + 1] : null;

  function renderLink(target, className, text) {
    if (!target) return '<span></span>';
    return '<a class="project-nav__link ' + className + '" href="project.html?p=' + encodeURIComponent(target.slug) + '">' +
      '<span class="label">' + text + '</span><strong>' + escapeHtml(target.title) + '</strong></a>';
  }

  return renderLink(prev, 'project-nav__prev', '← Dự án trước') + renderLink(next, 'project-nav__next', 'Dự án sau →');
}

function renderNotFound() {
  return '<div class="project-missing text-center">' +
    '<h1 class="project__title">Không tìm thấy dự án</h1>' +
    '<p class="text-body">Đường dẫn dự án không đúng hoặc dự án đã bị gỡ.</p>' +
    '<a class="btn-bracket" href="projects.html">Về danh sách dự án</a></div>';
}

function renderProjectPage() {
  var container = document.getElementById('project');
  if (!container) return;

  var ownerName = (window.PROFILE && PROFILE.name) || '';
  var project = findProject(getProjectSlug());

  if (!project) {
    document.title = 'Không tìm thấy dự án — ' + ownerName;
    container.innerHTML = renderNotFound();
    return;
  }

  document.title = project.title + ' — ' + ownerName;

  var wide = window.matchMedia(WIDE_QUERY);
  container.innerHTML =
    '<header class="project__header">' + renderProjectHeader(project) + '</header>' +
    '<section class="project__section" aria-labelledby="preview-title"><h2 class="label project__heading" id="preview-title">Xem thử</h2>' +
      '<div class="project-preview" data-preview>' + renderPreview(project, wide.matches) + '</div></section>' +
    '<section class="project__section" aria-labelledby="case-title"><h2 class="label project__heading" id="case-title">Case study</h2>' +
      '<div class="case-grid">' + renderCaseStudy(project) + '</div></section>' +
    '<section class="project__section project__stack" aria-label="Công nghệ và tính năng">' + renderStackAndFeatures(project) + '</section>' +
    (project.gallery && project.gallery.length
      ? '<section class="project__section" aria-labelledby="gallery-title"><h2 class="label project__heading" id="gallery-title">Gallery</h2>' + renderGallery(project) + '</section>'
      : '') +
    '<nav class="project-nav" aria-label="Dự án khác">' + renderProjectNav(project) + '</nav>';

  /* Web con: iframe chỉ dựng ở màn rộng, dựng lại khi đổi kích thước. */
  if (project.type === 'web') {
    wide.addEventListener('change', function rerenderPreview(event) {
      container.querySelector('[data-preview]').innerHTML = renderPreview(project, event.matches);
    });
  }

  initCopyCode(container);
  observeInViewColor(container);
}

function initCopyCode(container) {
  container.addEventListener('click', function handleCopyCode(event) {
    var button = event.target.closest('[data-copy-code]');
    if (!button) return;

    var lines = [].map.call(container.querySelectorAll('.codeblock__line'), function readLine(el) { return el.textContent; });
    copyText(lines.join('\n')).then(function showCopied() {
      button.textContent = 'Đã copy ✓';
    }, function showFailed() {
      button.textContent = 'Không copy được';
    }).then(function resetLabel() {
      window.setTimeout(function restoreText() { button.textContent = 'Copy'; }, COPIED_RESET_MS);
    });
  });
}

document.addEventListener('DOMContentLoaded', function initProjectPage() {
  renderProjectPage();
});
