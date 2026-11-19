/* Trang chi tiết dự án: project.html?p=<slug>. Dùng escapeHtml/copyText (main.js), t/pickLang (i18n.js), projectTypeLabel/renderIconPlaceholder (render.js). */

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
    ? '<img src="' + escapeHtml(project.cover) + '" alt="' + t('card.coverAlt') + ' ' + escapeHtml(pickLang(project.title)) + '" loading="lazy">'
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
    inner = '<iframe src="https://www.youtube-nocookie.com/embed/' + youtubeId + '" title="' + t('project.videoTitle') + ' ' + escapeHtml(pickLang(project.title)) + '" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="encrypted-media; picture-in-picture" allowfullscreen></iframe>';
  } else if (url) {
    inner = '<video controls preload="metadata" src="' + escapeHtml(url) + '">' + t('project.videoUnsupported') + '</video>';
  } else {
    inner = renderIconPlaceholder(t('project.videoPlaceholder'));
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
  var openButton = '<div class="project-preview__actions">' + renderExternalButton(t('project.openFull'), demo) + '</div>';

  if (!isWide) {
    return '<div class="project-media">' + renderCover(project, '1600×1000') + '</div>' + openButton;
  }

  return '<div class="browser-frame">' +
    '<div class="browser-frame__bar"><span class="browser-frame__dots" aria-hidden="true"><i></i><i></i><i></i></span>' +
    '<span class="browser-frame__url">' + escapeHtml(absoluteUrl) + '</span></div>' +
    '<iframe class="browser-frame__view" src="' + escapeHtml(demo) + '" title="' + t('project.previewTitle') + ' ' + escapeHtml(pickLang(project.title)) + '" loading="lazy" sandbox="allow-scripts allow-same-origin allow-forms"></iframe>' +
    '</div>' + openButton;
}

function renderPreviewDesktop(project) {
  var links = project.links || {};
  var parts = [renderVideo(project)];
  if (project.requirements) {
    parts.push('<p class="project-requirements"><span class="label">' + t('project.requirements') + '</span> ' + escapeHtml(pickLang(project.requirements)) + '</p>');
  }
  if (links.download) {
    parts.push('<div class="project-preview__actions">' + renderExternalButton(t('card.download'), links.download) + '</div>');
  }
  return parts.join('');
}

function renderPreviewLocal(project) {
  var commands = project.runLocal || [];
  var parts = [renderVideo(project)];

  if (commands.length) {
    parts.push('<div class="codeblock">' +
      '<div class="codeblock__bar"><span class="label">' + t('project.runLocal') + '</span>' +
      '<button class="btn-bracket" type="button" data-copy-code>' + t('project.copy') + '</button></div>' +
      '<pre class="codeblock__pre"><code>' +
      commands.map(function renderLine(line) { return '<span class="codeblock__line">' + escapeHtml(line) + '</span>'; }).join('') +
      '</code></pre></div>');
  }
  return parts.join('');
}

function renderPreviewDesign(project) {
  var figma = (project.links || {}).figma;
  return '<div class="project-media">' + renderCover(project, '1600×1000') + '</div>' +
    (figma ? '<div class="project-preview__actions">' + renderExternalButton(t('project.openFigma'), figma) + '</div>' : '');
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
  if (links.demo) buttons.push(renderExternalButton(t('card.demo'), links.demo));
  if (links.github) buttons.push(renderExternalButton(t('card.code'), links.github));
  if (links.download) buttons.push(renderExternalButton(t('card.download'), links.download));

  return '<a class="btn-bracket project__back" href="projects.html"><span aria-hidden="true">←&nbsp;</span>' + t('common.back') + '</a>' +
    '<p class="project__type label">' + escapeHtml(projectTypeLabel(project.type)) + '</p>' +
    '<h1 class="project__title">' + escapeHtml(pickLang(project.title)) + '</h1>' +
    '<p class="project__summary">' + escapeHtml(pickLang(project.summary)) + '</p>' +
    '<p class="project__meta label">' + escapeHtml(pickLang(project.year)) + ' · ' + escapeHtml(pickLang(project.role)) + '</p>' +
    (buttons.length ? '<div class="btn-group project__actions">' + buttons.join('') + '</div>' : '');
}

function renderCaseStudy(project) {
  var study = project.caseStudy || {};
  var blocks = [
    [t('project.problem'), pickLang(study.problem)],
    [t('project.solution'), pickLang(study.solution)],
    [t('project.result'), pickLang(study.result)],
    [t('project.learned'), pickLang(study.learned)]
  ].filter(function hasText(pair) { return pair[1]; });

  return blocks.map(function renderBlock(pair) {
    return '<div class="case-block"><h3 class="label">' + pair[0] + '</h3><p class="text-body">' + escapeHtml(pair[1]) + '</p></div>';
  }).join('');
}

function renderStackAndFeatures(project) {
  var tags = pickLang(project.stack || []).map(function renderTag(name) {
    return '<li class="tag">' + escapeHtml(name) + '</li>';
  }).join('');
  var features = pickLang(project.features || []).map(function renderFeature(text) {
    return '<li>' + escapeHtml(text) + '</li>';
  }).join('');

  return '<div><h3 class="label">' + t('project.stack') + '</h3><ul class="tag-list">' + tags + '</ul></div>' +
    '<div><h3 class="label">' + t('project.features') + '</h3><ul class="feature-list">' + features + '</ul></div>';
}

function renderGallery(project) {
  var items = project.gallery || [];
  if (!items.length) return '';

  return '<ul class="gallery">' + items.map(function renderItem(src, index) {
    var media = src
      ? '<img src="' + escapeHtml(src) + '" alt="' + t('project.galleryAlt') + ' ' + (index + 1) + ' ' + t('project.of') + ' ' + escapeHtml(pickLang(project.title)) + '" loading="lazy">'
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
      '<span class="label">' + text + '</span><strong>' + escapeHtml(pickLang(target.title)) + '</strong></a>';
  }

  return renderLink(prev, 'project-nav__prev', t('project.prev')) + renderLink(next, 'project-nav__next', t('project.next'));
}

function renderNotFound() {
  return '<div class="project-missing text-center">' +
    '<h1 class="project__title">' + t('project.notFound') + '</h1>' +
    '<p class="text-body">' + t('project.notFoundText') + '</p>' +
    '<a class="btn-bracket" href="projects.html">' + t('project.backToList') + '</a></div>';
}

/* Cập nhật title, meta description, og:title/description/url, canonical theo dự án. */
function updateProjectMeta(titleText, descriptionText, slug) {
  function setMeta(selector, value) {
    var el = document.querySelector(selector);
    if (el) el.setAttribute('content', value);
  }

  document.title = titleText;
  setMeta('meta[name="description"]', descriptionText);
  setMeta('meta[property="og:title"]', titleText);
  setMeta('meta[property="og:description"]', descriptionText);

  if (slug) {
    var canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      var url = canonical.getAttribute('href').split('?')[0] + '?p=' + encodeURIComponent(slug);
      canonical.setAttribute('href', url);
      setMeta('meta[property="og:url"]', url);
    }
  }
}

function renderProjectPage() {
  var container = document.getElementById('project');
  if (!container) return;

  var ownerName = (window.PROFILE && pickLang(PROFILE.name)) || '';
  var project = findProject(getProjectSlug());

  if (!project) {
    updateProjectMeta(t('project.notFound') + ' — ' + ownerName, t('project.notFoundText'), null);
    container.innerHTML = renderNotFound();
    return;
  }

  var projectTitle = pickLang(project.title);
  updateProjectMeta(projectTitle + ' — ' + ownerName, pickLang(project.summary), project.slug);

  var wide = window.matchMedia(WIDE_QUERY);
  container.innerHTML =
    '<header class="project__header">' + renderProjectHeader(project) + '</header>' +
    '<section class="project__section" aria-labelledby="preview-title"><h2 class="label project__heading" id="preview-title">' + t('project.preview') + '</h2>' +
      '<div class="project-preview" data-preview>' + renderPreview(project, wide.matches) + '</div></section>' +
    '<section class="project__section" aria-labelledby="case-title"><h2 class="label project__heading" id="case-title">' + t('project.caseStudy') + '</h2>' +
      '<div class="case-grid">' + renderCaseStudy(project) + '</div></section>' +
    '<section class="project__section project__stack" aria-label="' + t('project.stackAndFeatures') + '">' + renderStackAndFeatures(project) + '</section>' +
    (project.gallery && project.gallery.length
      ? '<section class="project__section" aria-labelledby="gallery-title"><h2 class="label project__heading" id="gallery-title">' + t('project.gallery') + '</h2>' + renderGallery(project) + '</section>'
      : '') +
    '<nav class="project-nav" aria-label="' + t('project.otherProjects') + '">' + renderProjectNav(project) + '</nav>';

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
      button.textContent = t('project.copyDone');
    }, function showFailed() {
      button.textContent = t('project.copyFailed');
    }).then(function resetLabel() {
      window.setTimeout(function restoreText() { button.textContent = t('project.copy'); }, COPIED_RESET_MS);
    });
  });
}

document.addEventListener('DOMContentLoaded', function initProjectPage() {
  renderProjectPage();
});
