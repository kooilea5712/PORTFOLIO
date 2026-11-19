/* Form liên hệ (kiểm tra phía client) + copy email. Gửi thật làm ở giai đoạn 5. */

var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var COPY_STATUS_MS = 2000;

function setFieldError(field, message) {
  var errorEl = document.getElementById(field.id + '-error');
  if (errorEl) errorEl.textContent = message;
  field.setAttribute('aria-invalid', message ? 'true' : 'false');
}

/* Trả về { valid, data, firstInvalid }. */
function validateContactForm(form) {
  var name = form.elements.name;
  var email = form.elements.email;
  var message = form.elements.message;
  var firstInvalid = null;

  function check(field, errorText) {
    setFieldError(field, errorText);
    if (errorText && !firstInvalid) firstInvalid = field;
  }

  check(name, name.value.trim() ? '' : 'Vui lòng nhập tên.');
  if (!email.value.trim()) {
    check(email, 'Vui lòng nhập email.');
  } else {
    check(email, EMAIL_PATTERN.test(email.value.trim()) ? '' : 'Email chưa đúng định dạng.');
  }
  check(message, message.value.trim() ? '' : 'Vui lòng nhập lời nhắn.');

  return {
    valid: !firstInvalid,
    firstInvalid: firstInvalid,
    data: {
      name: name.value.trim(),
      email: email.value.trim(),
      subject: form.elements.subject.value.trim(),
      message: message.value.trim()
    }
  };
}

/* Giai đoạn 5 sẽ gửi thật qua Formspree/Web3Forms. Hiện chỉ báo dữ liệu hợp lệ. */
function submitContactForm(data, messageEl) {
  messageEl.textContent = 'Dữ liệu hợp lệ. Chức năng gửi sẽ được bật ở giai đoạn sau.';
}

function initContactForm() {
  var form = document.getElementById('contact-form');
  if (!form) return;
  var messageEl = form.querySelector('[data-form-message]');

  form.addEventListener('submit', function handleSubmit(event) {
    event.preventDefault();
    messageEl.textContent = '';
    var result = validateContactForm(form);
    if (!result.valid) {
      result.firstInvalid.focus();
      return;
    }
    submitContactForm(result.data, messageEl);
  });

  form.addEventListener('input', function clearFieldError(event) {
    if (event.target.getAttribute('aria-invalid') === 'true') setFieldError(event.target, '');
  });
}

function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }
  return new Promise(function fallbackCopy(resolve, reject) {
    var area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    var ok = document.execCommand('copy');
    document.body.removeChild(area);
    if (ok) resolve(); else reject(new Error('copy failed'));
  });
}

function initCopyEmail() {
  var button = document.querySelector('[data-copy-email]');
  var status = document.querySelector('[data-copy-status]');
  if (!button) return;

  var textEl = button.querySelector('[data-email-text]');
  var email = (window.PROFILE && PROFILE.email) || (textEl ? textEl.textContent : '');
  if (textEl) textEl.textContent = email;

  button.addEventListener('click', function handleCopyClick() {
    copyText(email).then(function showCopied() {
      status.textContent = 'Đã copy ✓';
    }, function showFailed() {
      status.textContent = 'Không copy được, hãy chép thủ công.';
    }).then(function clearStatus() {
      window.setTimeout(function resetStatus() { status.textContent = ''; }, COPY_STATUS_MS);
    });
  });
}

document.addEventListener('DOMContentLoaded', function initContactPage() {
  initContactForm();
  initCopyEmail();
});
