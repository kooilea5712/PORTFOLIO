/* Song ngữ VI/EN. Dữ liệu: window.I18N (data/i18n.js). Chọn ngôn ngữ lưu ở localStorage, đổi xong tải lại trang. */

var DEFAULT_LANGUAGE = 'vi';
var SUPPORTED_LANGUAGES = ['vi', 'en'];
var LANGUAGE_STORAGE_KEY = 'portfolio-lang';
var warnedMissingKeys = {};
var currentLanguage = null;

function getLanguage() {
  if (currentLanguage) return currentLanguage;

  var saved = null;
  try { saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY); } catch (error) { saved = null; }
  currentLanguage = SUPPORTED_LANGUAGES.indexOf(saved) === -1 ? DEFAULT_LANGUAGE : saved;
  return currentLanguage;
}

/* Lưu lựa chọn rồi tải lại trang để mọi phần (HTML tĩnh lẫn phần JS sinh ra) đổi cùng lúc. */
function setLanguage(lang) {
  if (SUPPORTED_LANGUAGES.indexOf(lang) === -1 || lang === getLanguage()) return;
  try { window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang); } catch (error) { /* bỏ qua: chế độ riêng tư */ }
  currentLanguage = lang;
  window.location.reload();
}

/* Thay biến {name} trong chuỗi từ điển bằng PROFILE.name (đã qua pickLang). */
function fillVariables(text) {
  if (typeof text !== 'string' || text.indexOf('{name}') === -1) return text;
  var name = window.PROFILE ? pickLang(window.PROFILE.name) : '';
  return text.split('{name}').join(name);
}

/* Thiếu key ở ngôn ngữ hiện tại → dùng bản "vi"; cảnh báo 1 lần mỗi key. */
function t(key) {
  var dictionary = window.I18N || {};
  var lang = getLanguage();
  var value = dictionary[lang] && dictionary[lang][key];
  if (value !== undefined) return fillVariables(value);

  var fallback = dictionary[DEFAULT_LANGUAGE] && dictionary[DEFAULT_LANGUAGE][key];
  var warnId = lang + ':' + key;
  if (!warnedMissingKeys[warnId]) {
    warnedMissingKeys[warnId] = true;
    console.warn('[i18n] Thiếu key "' + key + '" cho "' + lang + '"' + (fallback === undefined ? ' và cả "vi"' : ', dùng bản "vi"'));
  }
  return fallback !== undefined ? fillVariables(fallback) : key;
}

/* Chuỗi → giữ nguyên; { vi, en } → đúng ngôn ngữ (thiếu thì dùng vi); mảng → áp dụng cho từng phần tử. */
function pickLang(value) {
  if (Array.isArray(value)) return value.map(pickLang);
  if (value && typeof value === 'object') {
    var lang = getLanguage();
    var picked = value[lang] !== undefined ? value[lang] : value[DEFAULT_LANGUAGE];
    return Array.isArray(picked) ? picked.map(pickLang) : picked;
  }
  return value;
}

function translatePage(root) {
  var scope = root || document;
  var rules = [
    ['[data-i18n]', 'data-i18n', null],
    ['[data-i18n-placeholder]', 'data-i18n-placeholder', 'placeholder'],
    ['[data-i18n-aria-label]', 'data-i18n-aria-label', 'aria-label'],
    ['[data-i18n-title]', 'data-i18n-title', 'title'],
    ['[data-i18n-content]', 'data-i18n-content', 'content']
  ];

  rules.forEach(function applyRule(rule) {
    scope.querySelectorAll(rule[0]).forEach(function translateElement(el) {
      var text = t(el.getAttribute(rule[1]));
      if (rule[2]) el.setAttribute(rule[2], text); else el.textContent = text;
    });
  });
}

function initLanguageSwitch() {
  var lang = getLanguage();
  document.querySelectorAll('[data-lang]').forEach(function bindButton(button) {
    button.setAttribute('aria-pressed', String(button.getAttribute('data-lang') === lang));
    button.addEventListener('click', function handleLangClick() {
      setLanguage(button.getAttribute('data-lang'));
    });
  });
}

function initI18n() {
  document.documentElement.setAttribute('lang', getLanguage());
  translatePage(document);
  initLanguageSwitch();
}

document.addEventListener('DOMContentLoaded', function initI18nPage() {
  initI18n();
});
