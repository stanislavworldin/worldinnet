const currentYear = document.getElementById('current-year');
const auditForm = document.getElementById('audit-form');

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

if (auditForm) {
  const status = auditForm.querySelector('.form-status');
  const submitButton = auditForm.querySelector('button[type="submit"]');
  const action = auditForm.getAttribute('action') || '';
  const submitEndpoint = action.includes('formsubmit.co/')
    ? action.replace('formsubmit.co/', 'formsubmit.co/ajax/')
    : action;

  auditForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!auditForm.checkValidity()) {
      auditForm.reportValidity();
      if (status) {
        status.textContent = 'Please complete all required fields.';
      }
      return;
    }

    const honeypot = auditForm.querySelector('input[name="_honey"]');
    if (honeypot instanceof HTMLInputElement && honeypot.value.trim() !== '') {
      return;
    }

    if (submitButton instanceof HTMLButtonElement) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }

    if (status) {
      status.textContent = '';
    }

    try {
      const formData = new FormData(auditForm);
      const response = await fetch(submitEndpoint, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      const result = await response.json().catch(() => ({}));
      const isSuccess = response.ok && String(result.success || 'true') !== 'false';

      if (!isSuccess) {
        throw new Error('Request failed');
      }

      auditForm.reset();

      if (status) {
        status.textContent = 'Request sent to stas.bozhko@gmail.com. We will contact you shortly.';
      }
    } catch (error) {
      if (status) {
        status.textContent =
          'Could not send automatically. Please email us directly: stas.bozhko@gmail.com.';
      }
    } finally {
      if (submitButton instanceof HTMLButtonElement) {
        submitButton.disabled = false;
        submitButton.textContent = 'Request Audit';
      }
    }
  });
}
