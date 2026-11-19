/* Chỉ dành cho components-demo.html (trang tạm): bật/tắt tab demo và chặn submit. */

function initDemoTabs() {
  var tabs = document.querySelectorAll('.filter-tabs button');
  tabs.forEach(function bindTab(tab) {
    tab.addEventListener('click', function selectTab() {
      tabs.forEach(function resetTab(other) { other.setAttribute('aria-selected', 'false'); });
      tab.setAttribute('aria-selected', 'true');
    });
  });
}

function initDemoForm() {
  var form = document.querySelector('form');
  if (!form) return;
  form.addEventListener('submit', function blockSubmit(event) { event.preventDefault(); });
}

document.addEventListener('DOMContentLoaded', function initDemo() {
  initDemoTabs();
  initDemoForm();
});
