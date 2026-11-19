/* Form liên hệ (kiểm tra phía client + gửi qua Web3Forms) và copy email. Dùng t/pickLang (i18n.js), copyText (main.js). */

var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var COPY_STATUS_MS = 2000;
var WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

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

  check(name, name.value.trim() ? '' : t('form.errName'));
  if (!email.value.trim()) {
    check(email, t('form.errEmailEmpty'));
  } else {
    check(email, EMAIL_PATTERN.test(email.value.trim()) ? '' : t('form.errEmailFormat'));
  }
  check(message, message.value.trim() ? '' : t('form.errMessage'));

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

function isWeb3formsConfigured() {
  var key = window.PROFILE && PROFILE.web3formsKey;
  return Boolean(key) && String(key).indexOf('{{') === -1;
}

/* Hiện thông báo; withMailto = true thì kèm link mailto dự phòng. */
function showFormMessage(messageEl, text, withMailto) {
  messageEl.textContent = text;
  if (!withMailto) return;

  var email = (window.PROFILE && pickLang(PROFILE.email)) || '';
  var link = document.createElement('a');
  link.href = 'mailto:' + email;
  link.textContent = email;
  messageEl.appendChild(document.createTextNode(' ' + t('form.mailtoFallback') + ' '));
  messageEl.appendChild(link);
}

function setSubmitting(button, isSubmitting) {
  button.disabled = isSubmitting;
  button.setAttribute('aria-busy', String(isSubmitting));
  button.textContent = isSubmitting ? t('form.sending') : t('form.send');
}

/* POST JSON tới Web3Forms. Key chưa cấu hình → không gửi, báo "chưa cấu hình" + mailto. */
function submitContactForm(data, form, messageEl) {
  var button = form.querySelector('button[type="submit"]');

  if (form.elements.botcheck && form.elements.botcheck.checked) return;

  if (!isWeb3formsConfigured()) {
    showFormMessage(messageEl, t('form.notConfigured'), true);
    return;
  }

  var payload = {
    access_key: PROFILE.web3formsKey,
    from_name: 'Portfolio',
    name: data.name,
    email: data.email,
    message: data.message
  };
  if (data.subject) payload.subject = data.subject;

  setSubmitting(button, true);
  window.fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload)
  }).then(function readResponse(response) {
    return response.json();
  }).then(function handleResult(result) {
    if (!result.success) throw new Error(result.message || 'Web3Forms error');
    form.reset();
    showFormMessage(messageEl, t('form.success'), false);
  }).catch(function handleError() {
    showFormMessage(messageEl, t('form.error'), true);
  }).then(function restoreButton() {
    setSubmitting(button, false);
  });
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
    submitContactForm(result.data, form, messageEl);
  });

  form.addEventListener('input', function clearFieldError(event) {
    if (event.target.getAttribute('aria-invalid') === 'true') setFieldError(event.target, '');
  });
}

function initCopyEmail() {
  var button = document.querySelector('[data-copy-email]');
  var status = document.querySelector('[data-copy-status]');
  if (!button) return;

  var textEl = button.querySelector('[data-email-text]');
  var email = (window.PROFILE && pickLang(PROFILE.email)) || (textEl ? textEl.textContent : '');
  if (textEl) textEl.textContent = email;

  button.addEventListener('click', function handleCopyClick() {
    copyText(email).then(function showCopied() {
      status.textContent = t('contact.copied');
    }, function showFailed() {
      status.textContent = t('contact.copyFailed');
    }).then(function clearStatus() {
      window.setTimeout(function resetStatus() { status.textContent = ''; }, COPY_STATUS_MS);
    });
  });
}

document.addEventListener('DOMContentLoaded', function initContactPage() {
  initContactForm();
  initCopyEmail();
});
