/* Sinh HTML từ data/*.js. Mọi trường đi qua liveText / liveValue / liveList (main.js):
   trên tên miền thật các phần còn {{...}} sẽ bị ẩn; trên local vẫn hiện để bạn thấy còn thiếu gì. */

var PROJECT_TYPES = ['web', 'desktop', 'local', 'design'];

/* Nhãn loại dự án theo ngôn ngữ hiện tại. */
function projectTypeLabel(type) {
  return PROJECT_TYPES.indexOf(type) === -1 ? type : t('type.' + type);
}

var NOW_ITEMS = [
  { key: 'reading', icon: '📖' },
  { key: 'listening', icon: '🎧' },
  { key: 'goal', icon: '🎯' },
  { key: 'place', icon: '📍' }
];

var SOCIAL_META = {
  email: { label: 'Email', path: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>' },
  github: { label: 'GitHub', path: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>' },
  linkedin: { label: 'LinkedIn', path: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>' },
  facebook: { label: 'Facebook', path: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>' },
  instagram: { label: 'Instagram', path: '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>' },
  tiktok: { label: 'TikTok', path: '<path d="M9 12a4 4 0 1 0 4 4V3a5 5 0 0 0 5 5"/>' },
  youtube: { label: 'YouTube', path: '<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>' }
};

function getSocialMeta(id) {
  return SOCIAL_META[id] || { label: id, path: '<circle cx="12" cy="12" r="9"/>' };
}

function renderIconSvg(id) {
  return '<svg viewBox="0 0 24 24" aria-hidden="true">' + getSocialMeta(id).path + '</svg>';
}

function renderIconPlaceholder(size) {
  return '<div class="img-placeholder">' + size + '</div>';
}

/* Ẩn một phần tử khi danh sách rỗng (chỉ trên tên miền thật). */
function hideIfEmpty(el, isEmpty) {
  if (el && isEmpty && !isDevHost()) el.hidden = true;
}

/* Chữ vào một phần tử; không có chữ thì ẩn phần tử (trên tên miền thật). */
function setTextOrHide(el, text) {
  if (!text) {
    hideIfEmpty(el, true);
    return;
  }
  el.textContent = text;
}

/* ---------- Skills ---------- */

/* Kỹ năng còn dùng được (tên không còn placeholder). */
function liveSkills(list, path) {
  var out = [];
  (list || []).forEach(function eachSkill(skill, i) {
    var base = path + '[' + i + ']';
    var name = liveText(skill.name, base + '.name');
    if (name == null) return;
    out.push({
      name: name,
      icon: liveValue(skill.icon, base + '.icon'),
      progress: skill.progress,
      since: liveText(skill.since, base + '.since')
    });
  });
  return out;
}

function renderSkillIcon(skill, size) {
  if (skill.icon) {
    return '<img src="' + escapeHtml(skill.icon) + '" alt="' + escapeHtml(skill.name) + '" loading="lazy" width="' + size.split('×')[0] + '" height="' + size.split('×')[1] + '">';
  }
  return renderIconPlaceholder(size);
}

function renderSkills() {
  if (!window.SKILLS) return;

  var mastered = liveSkills(SKILLS.mastered, 'SKILLS.mastered');
  var learning = liveSkills(SKILLS.learning, 'SKILLS.learning');
  var tools = liveList(SKILLS.tools, 'SKILLS.tools');

  var masteredEl = document.getElementById('skills-mastered');
  var learningEl = document.getElementById('skills-learning');
  var toolsEl = document.getElementById('skills-tools');

  if (masteredEl) {
    masteredEl.innerHTML = mastered.map(function renderMastered(skill) {
      return '<li class="skill">' +
        '<div class="skill__icon">' + renderSkillIcon(skill, '96×96') + '</div>' +
        '<span class="skill__name">' + escapeHtml(skill.name) + '</span></li>';
    }).join('');
    hideIfEmpty(masteredEl.closest('.skills__group'), !mastered.length);
  }

  if (learningEl) {
    learningEl.innerHTML = learning.map(function renderLearning(skill) {
      var progress = Math.max(0, Math.min(100, Number(skill.progress) || 0));
      return '<li class="skill-learning">' +
        '<div class="skill-learning__icon gray-img">' + renderSkillIcon(skill, '56×56') + '</div>' +
        '<div class="skill-learning__body">' +
          '<span class="skill__name">' + escapeHtml(skill.name) + '</span>' +
          (skill.since ? '<span class="skill-learning__since">' + t('skills.since') + ' ' + escapeHtml(skill.since) + '</span>' : '') +
          '<div class="progress" role="progressbar" aria-label="' + t('skills.progress') + ' ' + escapeHtml(skill.name) + '" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + progress + '" style="--progress:' + progress + '%"></div>' +
        '</div></li>';
    }).join('');
    hideIfEmpty(learningEl.closest('.skills__group'), !learning.length);
    observeInViewColorIfReady(learningEl);
  }

  if (toolsEl) {
    toolsEl.innerHTML = tools.map(function renderTool(name) {
      return '<li class="tag">' + escapeHtml(name) + '</li>';
    }).join('');
    hideIfEmpty(toolsEl.closest('.skills__group'), !tools.length);
  }

  if (!mastered.length && !learning.length && !tools.length) hideSection('skills');
}

/* ---------- Projects ---------- */

function projectPath(project) {
  return 'PROJECTS[' + (project.slug || '?') + ']';
}

/* Bản sao của links, mỗi link còn placeholder thành null. */
function cleanLinks(links, base) {
  var src = links || {};
  var out = {};
  Object.keys(src).forEach(function copyLink(key) {
    out[key] = liveValue(src[key], base + '.links.' + key);
  });
  return out;
}

/* Dự án còn dùng được: title và summary không còn placeholder. */
function isProjectLive(project) {
  var base = projectPath(project);
  var titleBad = shouldHide(project.title, base + '.title');
  var summaryBad = shouldHide(project.summary, base + '.summary');
  return !(titleBad || summaryBad);
}

function visibleProjects() {
  return (window.PROJECTS || []).filter(function keepProject(project) {
    return isProjectLive(project);
  });
}

function renderProjectCard(project) {
  var base = projectPath(project);
  var infoUrl = 'project.html?p=' + encodeURIComponent(project.slug);
  var links = cleanLinks(project.links, base);
  var cover = liveValue(project.cover, base + '.cover');
  var coverHtml = cover
    ? '<img src="' + escapeHtml(cover) + '" alt="' + t('card.coverAlt') + ' ' + escapeHtml(pickLang(project.title)) + '" loading="lazy" width="1600" height="1000">'
    : renderIconPlaceholder('1600×1000');

  var actions = [];
  if (links.demo) actions.push('<a class="btn-bracket" href="' + escapeHtml(links.demo) + '">' + t('card.demo') + '</a>');
  actions.push('<a class="btn-bracket" href="' + infoUrl + '">' + t('card.info') + '</a>');
  if (links.github) actions.push('<a class="btn-bracket" href="' + escapeHtml(links.github) + '" target="_blank" rel="noopener">' + t('card.code') + '</a>');
  if (links.download) actions.push('<a class="btn-bracket" href="' + escapeHtml(links.download) + '" target="_blank" rel="noopener">' + t('card.download') + '</a>');

  var tags = liveList(project.stack, base + '.stack').map(function renderTag(item) {
    return '<span class="tag">' + escapeHtml(item) + '</span>';
  }).join('');

  return '<article class="project-card">' +
    '<a class="project-card__media" href="' + infoUrl + '" tabindex="-1" aria-hidden="true">' + coverHtml + '</a>' +
    '<p class="project-card__type label">' + escapeHtml(projectTypeLabel(project.type)) + '</p>' +
    '<h3 class="project-card__title">' + escapeHtml(pickLang(project.title)) + '</h3>' +
    '<p class="project-card__desc">' + escapeHtml(pickLang(project.summary)) + '</p>' +
    '<div class="tag-list">' + tags + '</div>' +
    '<div class="project-card__actions">' + actions.join('') + '</div>' +
    '</article>';
}

/* options: { featuredOnly: bool, type: 'all'|'web'|..., stack: 'Tên công nghệ' | '' } */
function filterProjects(options) {
  var opts = options || {};
  var type = opts.type || 'all';
  return visibleProjects().filter(function isShown(project) {
    if (opts.featuredOnly && !project.featured) return false;
    if (type !== 'all' && project.type !== type) return false;
    if (opts.stack && liveList(project.stack, projectPath(project) + '.stack').indexOf(opts.stack) === -1) return false;
    return true;
  });
}

function renderProjectGrid(options) {
  var grid = document.getElementById('project-grid');
  if (!grid || !window.PROJECTS) return;

  var items = filterProjects(options);
  grid.innerHTML = items.length
    ? items.map(renderProjectCard).join('')
    : '<p class="projects__empty text-body">' + t('projects.empty') + '</p>';

  observeInViewColorIfReady(grid);
}

/* Trang chủ: tab lọc theo loại, chỉ dự án featured. Không có dự án nào → ẩn cả section. */
function initProjectFilter() {
  var tabs = document.querySelector('[data-project-filter]');
  if (!tabs) return;

  var buttons = tabs.querySelectorAll('button[data-filter]');
  tabs.addEventListener('click', function handleFilterClick(event) {
    var button = event.target.closest('button[data-filter]');
    if (!button) return;

    buttons.forEach(function updateTab(other) {
      other.setAttribute('aria-selected', String(other === button));
    });
    renderProjectGrid({ featuredOnly: true, type: button.getAttribute('data-filter') });
  });

  renderProjectGrid({ featuredOnly: true, type: 'all' });
  if (!filterProjects({ featuredOnly: true }).length) hideSection('projects');
}

/* projects.html: lọc theo loại + công nghệ, đồng bộ lên URL (?type=web&stack=...). */
function getCollectedStacks() {
  var seen = {};
  visibleProjects().forEach(function collect(project) {
    liveList(project.stack, projectPath(project) + '.stack').forEach(function addStack(name) { seen[name] = true; });
  });
  return Object.keys(seen).sort();
}

function readProjectsQuery() {
  var params = new URLSearchParams(window.location.search);
  var type = params.get('type') || 'all';
  var validTypes = PROJECT_TYPES.concat('all');
  return {
    type: validTypes.indexOf(type) === -1 ? 'all' : type,
    stack: getCollectedStacks().indexOf(params.get('stack')) === -1 ? '' : params.get('stack')
  };
}

function writeProjectsQuery(state) {
  var params = new URLSearchParams();
  if (state.type !== 'all') params.set('type', state.type);
  if (state.stack) params.set('stack', state.stack);
  var query = params.toString();
  window.history.replaceState(null, '', window.location.pathname + (query ? '?' + query : ''));
}

function initProjectsPage() {
  var typeTabs = document.querySelector('[data-type-filter]');
  var stackBar = document.querySelector('[data-stack-filter]');
  if (!typeTabs || !stackBar || !window.PROJECTS) return;

  var state = readProjectsQuery();

  stackBar.innerHTML = ['']
    .concat(getCollectedStacks())
    .map(function renderChip(name) {
      return '<button class="chip" type="button" data-stack="' + escapeHtml(name) + '">' +
        (name ? escapeHtml(name) : t('projects.allStacks')) + '</button>';
    }).join('');

  function applyFilters() {
    typeTabs.querySelectorAll('button[data-filter]').forEach(function markTab(button) {
      button.setAttribute('aria-selected', String(button.getAttribute('data-filter') === state.type));
    });
    stackBar.querySelectorAll('button[data-stack]').forEach(function markChip(chip) {
      chip.setAttribute('aria-pressed', String(chip.getAttribute('data-stack') === state.stack));
    });
    renderProjectGrid({ featuredOnly: false, type: state.type, stack: state.stack });
    writeProjectsQuery(state);
  }

  typeTabs.addEventListener('click', function handleTypeClick(event) {
    var button = event.target.closest('button[data-filter]');
    if (!button) return;
    state.type = button.getAttribute('data-filter');
    applyFilters();
  });

  stackBar.addEventListener('click', function handleStackClick(event) {
    var chip = event.target.closest('button[data-stack]');
    if (!chip) return;
    state.stack = chip.getAttribute('data-stack');
    applyFilters();
  });

  applyFilters();
}

/* ---------- Life ---------- */

/* Ảnh Life còn dùng được: caption và (nếu có) ảnh không còn placeholder. */
function liveLifeItems() {
  var out = [];
  (window.LIFE || []).forEach(function eachLife(item, i) {
    var base = 'LIFE[' + i + ']';
    var caption = liveText(item.caption, base + '.caption');
    var img = liveValue(item.img, base + '.img');
    if (caption == null || (item.img && img == null)) return;
    out.push({
      caption: caption,
      img: img,
      size: item.size,
      date: liveText(item.date, base + '.date'),
      note: liveText(item.note, base + '.note')
    });
  });
  return out;
}

/* limit: số ảnh tối đa (trang chủ 6). Danh sách đang hiện được lưu vào window.LIFE_SHOWN để lightbox dùng đúng chỉ số. */
function renderLife(limit) {
  var grid = document.getElementById('life-grid');
  if (!grid || !window.LIFE) return;

  var useLightbox = grid.hasAttribute('data-lightbox');
  var all = liveLifeItems();
  var items = limit ? all.slice(0, limit) : all;
  window.LIFE_SHOWN = items;

  grid.innerHTML = items.map(function renderLifeItem(item, index) {
    var ratio = String(item.size || '').split('×');
    var hasRatio = ratio.length === 2;
    var ratioAttr = hasRatio ? ' data-ratio="' + Number(ratio[0]) + '/' + Number(ratio[1]) + '"' : '';
    var sizeAttr = hasRatio ? ' width="' + Number(ratio[0]) + '" height="' + Number(ratio[1]) + '"' : '';
    var media = item.img
      ? '<img src="' + escapeHtml(item.img) + '" alt="' + escapeHtml(item.caption) + '" loading="lazy"' + sizeAttr + '>'
      : '<span class="img-placeholder">' + escapeHtml(item.size || '800×800') + '</span>';
    var label = escapeHtml(item.caption) + (item.date ? ', ' + escapeHtml(item.date) : '');

    var mediaTag = useLightbox
      ? '<button type="button" class="life-item__media gray-img" data-life-index="' + index + '" aria-label="' + t('life.zoom') + ': ' + label + '"' + ratioAttr + '>' + media + '</button>'
      : '<div class="life-item__media gray-img"' + ratioAttr + '>' + media + '</div>';

    return '<figure class="life-item">' + mediaTag +
      '<figcaption class="life-item__caption"><strong>' + escapeHtml(item.caption) + '</strong>' +
      (item.date ? '<span>' + escapeHtml(item.date) + '</span>' : '') +
      (item.note ? '<span>' + escapeHtml(item.note) + '</span>' : '') +
      '</figcaption></figure>';
  }).join('');

  grid.querySelectorAll('[data-ratio]').forEach(function applyRatio(el) {
    el.style.aspectRatio = el.getAttribute('data-ratio');
  });

  observeInViewColorIfReady(grid);
}

/* ---------- Socials / Now ---------- */

/* Mạng xã hội còn dùng được: url và handle không còn placeholder. */
function liveSocials() {
  var socials = (window.PROFILE && PROFILE.socials) || [];
  var out = [];
  socials.forEach(function eachSocial(item, i) {
    var base = 'PROFILE.socials[' + i + ']';
    var url = liveValue(item.url, base + '.url');
    var handle = liveText(item.handle, base + '.handle');
    if (url == null || handle == null) return;
    out.push({ id: item.id, url: url, handle: handle, note: liveText(item.note, base + '.note') });
  });
  return out;
}

function buildSocialLinks() {
  var email = liveText((window.PROFILE || {}).email, 'PROFILE.email');
  var links = email ? [{ id: 'email', url: 'mailto:' + email }] : [];
  return links.concat(liveSocials().map(function mapSocial(item) {
    return { id: item.id, url: item.url };
  }));
}

function renderSocials() {
  if (!window.PROFILE) return;

  var links = buildSocialLinks();
  var iconHtml = links.map(function renderIconLink(item) {
    var isMail = item.id === 'email';
    return '<a href="' + escapeHtml(item.url) + '" aria-label="' + getSocialMeta(item.id).label + '"' +
      (isMail ? '' : ' target="_blank" rel="noopener"') + '>' + renderIconSvg(item.id) + '</a>';
  }).join('');

  document.querySelectorAll('[data-socials]').forEach(function fillIcons(container) {
    container.innerHTML = iconHtml;
    hideIfEmpty(container, !links.length);
  });

  var cards = document.getElementById('socials');
  if (cards) {
    cards.innerHTML = liveSocials().map(function renderCard(item) {
      return '<a class="social-card" data-social="' + escapeHtml(item.id) + '" href="' + escapeHtml(item.url) + '" target="_blank" rel="noopener">' +
        renderIconSvg(item.id) +
        '<span class="social-card__text"><strong>' + getSocialMeta(item.id).label + '</strong>' +
        '<span>' + escapeHtml(item.handle) + '</span>' +
        (item.note ? '<span class="social-card__note">' + escapeHtml(item.note) + '</span>' : '') +
        '</span></a>';
    }).join('');
  }
}

/* Khối "Now": chỉ các ô còn dữ liệu. */
function liveNow() {
  var now = (window.PROFILE && PROFILE.now) || {};
  return NOW_ITEMS.map(function pickNow(item) {
    return { key: item.key, icon: item.icon, value: liveText(now[item.key], 'PROFILE.now.' + item.key) };
  }).filter(function hasValue(row) { return row.value != null; });
}

function renderNow() {
  var list = document.getElementById('now');
  if (!list || !window.PROFILE) return;

  var rows = liveNow();
  list.innerHTML = rows.map(function renderNowItem(row) {
    return '<div class="now__item"><dt class="label"><span aria-hidden="true">' + row.icon + '</span> ' + t('now.' + row.key) + '</dt>' +
      '<dd>' + escapeHtml(row.value) + '</dd></div>';
  }).join('');
  hideIfEmpty(list, !rows.length);
}

/* ---------- Khởi tạo ---------- */

function observeInViewColorIfReady(root) {
  if (typeof observeInViewColor === 'function') observeInViewColor(root);
}

function renderOpenToWork() {
  if (!window.PROFILE) return;
  document.querySelectorAll('[data-open-to-work]').forEach(function toggleStatus(el) {
    el.hidden = !PROFILE.openToWork;
  });
}

/* ---------- About ---------- */

function renderAboutBio() {
  var bio = document.getElementById('about-bio');
  var portrait = document.getElementById('about-portrait');
  if (!window.PROFILE) return;

  if (bio) {
    var paragraphs = liveList(PROFILE.bioLong || PROFILE.bio || [], 'PROFILE.bioLong');
    bio.innerHTML = paragraphs.map(function renderParagraph(text) {
      return '<p class="text-body">' + escapeHtml(text) + '</p>';
    }).join('');
  }
  if (portrait) {
    var src = liveValue(PROFILE.portrait, 'PROFILE.portrait');
    portrait.innerHTML = src
      ? '<img src="' + escapeHtml(src) + '" alt="' + t('about.portraitAlt') + ' ' + escapeHtml(pickLang(PROFILE.name)) + '" loading="lazy" width="800" height="1000">'
      : renderIconPlaceholder('800×1000');
    observeInViewColorIfReady(portrait.parentNode);
  }
}

/* Hành trình: mục nào thiếu period/title/org thì bỏ qua. */
function liveTimeline() {
  var out = [];
  (window.PROFILE && PROFILE.timeline || []).forEach(function eachItem(item, i) {
    var base = 'PROFILE.timeline[' + i + ']';
    var period = liveText(item.period, base + '.period');
    var title = liveText(item.title, base + '.title');
    var org = liveText(item.org, base + '.org');
    if (period == null || title == null || org == null) return;
    out.push({ kind: item.kind, period: period, title: title, org: org, note: liveText(item.note, base + '.note') });
  });
  return out;
}

function renderTimeline() {
  var list = document.getElementById('timeline');
  if (!list || !window.PROFILE) return;

  var items = liveTimeline();
  list.innerHTML = items.map(function renderTimelineItem(item) {
    return '<li class="timeline__item">' +
      '<p class="timeline__period">' + escapeHtml(item.period) + '</p>' +
      '<div class="timeline__body">' +
        '<p class="label timeline__kind">' + escapeHtml(t('timeline.' + item.kind)) + '</p>' +
        '<h3 class="timeline__title">' + escapeHtml(item.title) + '</h3>' +
        '<p class="timeline__org">' + escapeHtml(item.org) + '</p>' +
        (item.note ? '<p class="text-body">' + escapeHtml(item.note) + '</p>' : '') +
      '</div></li>';
  }).join('');
  hideIfEmpty(list.closest('section'), !items.length);
}

function renderLocation() {
  if (!window.PROFILE) return;
  var text = liveText(PROFILE.location, 'PROFILE.location');
  document.querySelectorAll('[data-location]').forEach(function fillLocation(el) {
    setTextOrHide(el, text);
  });
}

/* ---------- Nội dung cá nhân lấy từ data/profile.js ---------- */

var SERVICE_ICONS = {
  design: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>',
  development: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  learning: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>'
};
var SERVICE_ICON_FALLBACK = '<circle cx="12" cy="12" r="9"/>';

/* Chữ viết tắt ở logo navbar: PROFILE.shortName */
function renderBranding() {
  if (!window.PROFILE) return;
  var short = liveText(PROFILE.shortName, 'PROFILE.shortName');
  document.querySelectorAll('[data-short-name]').forEach(function fillName(el) {
    el.textContent = short || '';
  });
}

/* Chữ rời: phần tử có data-profile="tên-trường" nhận PROFILE[tên-trường] (greeting, contactLead, lifeIntro…). */
function renderProfileText() {
  if (!window.PROFILE) return;
  document.querySelectorAll('[data-profile]').forEach(function fillText(el) {
    var key = el.getAttribute('data-profile');
    setTextOrHide(el, liveText(PROFILE[key], 'PROFILE.' + key));
  });
}

/* Đoạn giới thiệu ngắn ở trang chủ: PROFILE.bio. Trả về số đoạn đang hiện. */
function renderHomeBio() {
  var box = document.getElementById('home-bio');
  if (!box || !window.PROFILE) return undefined;
  var paragraphs = liveList(PROFILE.bio || [], 'PROFILE.bio');
  box.innerHTML = paragraphs.map(function renderParagraph(text) {
    return '<p class="text-body">' + escapeHtml(text) + '</p>';
  }).join('');
  return paragraphs.length;
}

/* Section "Hiện tại": PROFILE.current { logo, title, text, link }. Thiếu title/text → ẩn cả section. */
function renderCurrent() {
  if (!window.PROFILE || !PROFILE.current) return;
  var current = PROFILE.current;
  var values = {
    logo: liveText(current.logo, 'PROFILE.current.logo'),
    title: liveText(current.title, 'PROFILE.current.title'),
    text: liveText(current.text, 'PROFILE.current.text')
  };
  document.querySelectorAll('[data-current]').forEach(function fillCurrent(el) {
    el.textContent = values[el.getAttribute('data-current')] || '';
  });
  var link = liveValue(current.link, 'PROFILE.current.link');
  document.querySelectorAll('[data-current-link]').forEach(function setLink(el) {
    el.href = link || '#';
  });
  if (values.title == null || values.text == null) hideSection('current');
}

/* 3 khối "Tôi làm gì": PROFILE.services (trang chủ + about.html). Trả về số khối đang hiện. */
function liveServices() {
  var out = [];
  ((window.PROFILE && PROFILE.services) || []).forEach(function eachService(item, i) {
    var base = 'PROFILE.services[' + i + ']';
    var title = liveText(item.title, base + '.title');
    var text = liveText(item.text, base + '.text');
    if (title == null || text == null) return;
    out.push({ key: item.key, title: title, text: text });
  });
  return out;
}

function renderServices() {
  if (!window.PROFILE) return 0;
  var items = liveServices();
  var html = items.map(function renderService(item) {
    return '<li class="about__do-item">' +
      '<svg viewBox="0 0 24 24" aria-hidden="true">' + (SERVICE_ICONS[item.key] || SERVICE_ICON_FALLBACK) + '</svg>' +
      '<h3 class="label">' + escapeHtml(item.title) + '</h3>' +
      '<p>' + escapeHtml(item.text) + '</p></li>';
  }).join('');
  document.querySelectorAll('[data-services]').forEach(function fillServices(list) {
    list.innerHTML = html;
    hideIfEmpty(list, !items.length);
  });
  return items.length;
}

/* Nút Tải CV: chỉ hiện khi PROFILE.cv có giá trị (không còn placeholder). */
function renderCvLinks() {
  if (!window.PROFILE) return;
  var cv = liveValue(PROFILE.cv, 'PROFILE.cv');
  document.querySelectorAll('[data-cv]').forEach(function toggleCv(link) {
    if (cv) {
      link.href = cv;
      link.hidden = false;
    } else {
      link.hidden = true;
    }
  });
}

document.addEventListener('DOMContentLoaded', function initRender() {
  renderBranding();
  renderProfileText();
  renderOpenToWork();
  renderLocation();
  renderCvLinks();
  renderSkills();
  initProjectFilter();
  initProjectsPage();
  var lifeGrid = document.getElementById('life-grid');
  renderLife(lifeGrid ? Number(lifeGrid.getAttribute('data-limit')) || 0 : 0);
  renderSocials();
  renderNow();
  renderAboutBio();
  renderTimeline();
  renderCurrent();
  var bioCount = renderHomeBio();
  var serviceCount = renderServices();
  if (bioCount === 0 && serviceCount === 0) hideSection('about');
  if (!liveLifeItems().length && !liveNow().length && !liveSocials().length) hideSection('life');
});
