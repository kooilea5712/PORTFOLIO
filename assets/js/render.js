/* Sinh HTML từ data/*.js cho skills, projects, life, socials, now. */

var PROJECT_TYPE_LABELS = { web: 'Website', desktop: 'Desktop app', local: 'Localhost', design: 'Design' };

var NOW_LABELS = [
  { key: 'reading', icon: '📖', label: 'Đang đọc' },
  { key: 'listening', icon: '🎧', label: 'Đang nghe' },
  { key: 'goal', icon: '🎯', label: 'Mục tiêu tháng này' },
  { key: 'place', icon: '📍', label: 'Đang ở' }
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

/* ---------- Skills ---------- */

function renderSkillIcon(skill, size) {
  if (skill.icon) {
    return '<img src="' + escapeHtml(skill.icon) + '" alt="" loading="lazy">';
  }
  return renderIconPlaceholder(size);
}

function renderSkills() {
  if (!window.SKILLS) return;

  var mastered = document.getElementById('skills-mastered');
  var learning = document.getElementById('skills-learning');
  var tools = document.getElementById('skills-tools');

  if (mastered) {
    mastered.innerHTML = (SKILLS.mastered || []).map(function renderMastered(skill) {
      return '<li class="skill">' +
        '<div class="skill__icon">' + renderSkillIcon(skill, '96×96') + '</div>' +
        '<span class="skill__name">' + escapeHtml(skill.name) + '</span></li>';
    }).join('');
  }

  if (learning) {
    learning.innerHTML = (SKILLS.learning || []).map(function renderLearning(skill) {
      var progress = Math.max(0, Math.min(100, Number(skill.progress) || 0));
      return '<li class="skill-learning">' +
        '<div class="skill-learning__icon gray-img">' + renderSkillIcon(skill, '56×56') + '</div>' +
        '<div class="skill-learning__body">' +
          '<span class="skill__name">' + escapeHtml(skill.name) + '</span>' +
          '<span class="skill-learning__since">từ ' + escapeHtml(skill.since) + '</span>' +
          '<div class="progress" role="progressbar" aria-label="Tiến độ ' + escapeHtml(skill.name) + '" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + progress + '" style="--progress:' + progress + '%"></div>' +
        '</div></li>';
    }).join('');
  }

  if (tools) {
    tools.innerHTML = (SKILLS.tools || []).map(function renderTool(name) {
      return '<li class="tag">' + escapeHtml(name) + '</li>';
    }).join('');
  }

  observeInViewColorIfReady(learning);
}

/* ---------- Projects ---------- */

function renderProjectCard(project) {
  var infoUrl = 'project.html?p=' + encodeURIComponent(project.slug);
  var links = project.links || {};
  var cover = project.cover
    ? '<img src="' + escapeHtml(project.cover) + '" alt="Ảnh bìa ' + escapeHtml(project.title) + '" loading="lazy">'
    : renderIconPlaceholder('1600×1000');

  var actions = [];
  if (links.demo) actions.push('<a class="btn-bracket" href="' + escapeHtml(links.demo) + '">Demo</a>');
  actions.push('<a class="btn-bracket" href="' + infoUrl + '">Info</a>');
  if (links.github) actions.push('<a class="btn-bracket" href="' + escapeHtml(links.github) + '" target="_blank" rel="noopener">Code</a>');
  if (links.download) actions.push('<a class="btn-bracket" href="' + escapeHtml(links.download) + '" target="_blank" rel="noopener">Tải xuống</a>');

  var tags = (project.stack || []).map(function renderTag(item) {
    return '<span class="tag">' + escapeHtml(item) + '</span>';
  }).join('');

  return '<article class="project-card">' +
    '<a class="project-card__media" href="' + infoUrl + '" tabindex="-1" aria-hidden="true">' + cover + '</a>' +
    '<p class="project-card__type label">' + escapeHtml(PROJECT_TYPE_LABELS[project.type] || project.type) + '</p>' +
    '<h3 class="project-card__title">' + escapeHtml(project.title) + '</h3>' +
    '<p class="project-card__desc">' + escapeHtml(project.summary) + '</p>' +
    '<div class="tag-list">' + tags + '</div>' +
    '<div class="project-card__actions">' + actions.join('') + '</div>' +
    '</article>';
}

/* options: { featuredOnly: bool, type: 'all'|'web'|..., stack: 'Tên công nghệ' | '' } */
function filterProjects(options) {
  var opts = options || {};
  var type = opts.type || 'all';
  return PROJECTS.filter(function isShown(project) {
    if (opts.featuredOnly && !project.featured) return false;
    if (type !== 'all' && project.type !== type) return false;
    if (opts.stack && (project.stack || []).indexOf(opts.stack) === -1) return false;
    return true;
  });
}

function renderProjectGrid(options) {
  var grid = document.getElementById('project-grid');
  if (!grid || !window.PROJECTS) return;

  var items = filterProjects(options);
  grid.innerHTML = items.length
    ? items.map(renderProjectCard).join('')
    : '<p class="projects__empty text-body">Chưa có dự án phù hợp bộ lọc.</p>';

  observeInViewColorIfReady(grid);
}

/* Trang chủ: tab lọc theo loại, chỉ dự án featured. */
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
}

/* projects.html: lọc theo loại + công nghệ, đồng bộ lên URL (?type=web&stack=...). */
function getCollectedStacks() {
  var seen = {};
  PROJECTS.forEach(function collect(project) {
    (project.stack || []).forEach(function addStack(name) { seen[name] = true; });
  });
  return Object.keys(seen).sort();
}

function readProjectsQuery() {
  var params = new URLSearchParams(window.location.search);
  var type = params.get('type') || 'all';
  var validTypes = Object.keys(PROJECT_TYPE_LABELS).concat('all');
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
        (name ? escapeHtml(name) : 'Mọi công nghệ') + '</button>';
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

function renderLife() {
  var grid = document.getElementById('life-grid');
  if (!grid || !window.LIFE) return;

  grid.innerHTML = LIFE.map(function renderLifeItem(item) {
    var media = item.img
      ? '<img src="' + escapeHtml(item.img) + '" alt="' + escapeHtml(item.caption) + '" loading="lazy">'
      : renderIconPlaceholder(escapeHtml(item.size || '800×800'));
    var ratio = String(item.size || '').split('×');
    var ratioAttr = ratio.length === 2 ? ' data-ratio="' + Number(ratio[0]) + '/' + Number(ratio[1]) + '"' : '';

    return '<figure class="life-item">' +
      '<div class="life-item__media gray-img"' + ratioAttr + '>' + media + '</div>' +
      '<figcaption class="life-item__caption"><strong>' + escapeHtml(item.caption) + '</strong>' +
      '<span>' + escapeHtml(item.note) + '</span></figcaption></figure>';
  }).join('');

  grid.querySelectorAll('[data-ratio]').forEach(function applyRatio(el) {
    el.style.aspectRatio = el.getAttribute('data-ratio');
  });

  observeInViewColorIfReady(grid);
}

/* ---------- Socials / Now ---------- */

function buildSocialLinks() {
  var profile = window.PROFILE || {};
  var links = [{ id: 'email', url: 'mailto:' + (profile.email || '') }];
  return links.concat((profile.socials || []).map(function mapSocial(item) {
    return { id: item.id, url: item.url };
  }));
}

function renderSocials() {
  if (!window.PROFILE) return;

  var iconHtml = buildSocialLinks().map(function renderIconLink(item) {
    var isMail = item.id === 'email';
    return '<a href="' + escapeHtml(item.url) + '" aria-label="' + getSocialMeta(item.id).label + '"' +
      (isMail ? '' : ' target="_blank" rel="noopener"') + '>' + renderIconSvg(item.id) + '</a>';
  }).join('');

  document.querySelectorAll('[data-socials]').forEach(function fillIcons(container) {
    container.innerHTML = iconHtml;
  });

  var cards = document.getElementById('socials');
  if (cards) {
    cards.innerHTML = (PROFILE.socials || []).map(function renderCard(item) {
      return '<a class="social-card" data-social="' + escapeHtml(item.id) + '" href="' + escapeHtml(item.url) + '" target="_blank" rel="noopener">' +
        renderIconSvg(item.id) +
        '<span class="social-card__text"><strong>' + getSocialMeta(item.id).label + '</strong>' +
        '<span>' + escapeHtml(item.handle) + '</span>' +
        '<span class="social-card__note">' + escapeHtml(item.note) + '</span></span></a>';
    }).join('');
  }
}

function renderNow() {
  var list = document.getElementById('now');
  if (!list || !window.PROFILE || !PROFILE.now) return;

  list.innerHTML = NOW_LABELS.map(function renderNowItem(item) {
    return '<div class="now__item"><dt class="label"><span aria-hidden="true">' + item.icon + '</span> ' + item.label + '</dt>' +
      '<dd>' + escapeHtml(PROFILE.now[item.key]) + '</dd></div>';
  }).join('');
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

document.addEventListener('DOMContentLoaded', function initRender() {
  renderSkills();
  initProjectFilter();
  initProjectsPage();
  renderLife();
  renderSocials();
  renderNow();
  renderOpenToWork();
});
