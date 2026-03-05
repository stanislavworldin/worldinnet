const currentYear = document.getElementById('current-year');
const auditForm = document.getElementById('audit-form');

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

if (auditForm) {
  const status = auditForm.querySelector('.form-status');
  const submitButton = auditForm.querySelector('button[type="submit"]');

  auditForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!auditForm.checkValidity()) {
      auditForm.reportValidity();
      if (status) {
        status.textContent = 'Please complete all required fields.';
      }
      return;
    }

    if (submitButton instanceof HTMLButtonElement) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }

    window.setTimeout(() => {
      auditForm.reset();

      if (status) {
        status.textContent = 'Request sent. We will contact you within 1 business day.';
      }

      if (submitButton instanceof HTMLButtonElement) {
        submitButton.disabled = false;
        submitButton.textContent = 'Request Audit';
      }
    }, 900);
  });
}
