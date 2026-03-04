const auditForm = document.getElementById("audit-form");
const bottomCta = document.getElementById("bottom-cta");
const auditSection = document.getElementById("audit");

if (auditForm) {
  const status = auditForm.querySelector(".form-status");

  auditForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!auditForm.checkValidity()) {
      if (status) {
        status.textContent = "Please complete all required fields.";
        status.classList.remove("success");
        status.classList.add("error");
      }

      auditForm.reportValidity();
      return;
    }

    const submitButton = auditForm.querySelector("button[type='submit']");

    if (submitButton instanceof HTMLButtonElement) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    window.setTimeout(() => {
      if (status) {
        status.textContent = "Request sent. We will contact you within 1 business day.";
        status.classList.remove("error");
        status.classList.add("success");
      }

      auditForm.reset();

      if (submitButton instanceof HTMLButtonElement) {
        submitButton.disabled = false;
        submitButton.textContent = "Order Audit";
      }
    }, 900);
  });
}

if (bottomCta && auditSection && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      bottomCta.classList.toggle("hidden", entry.isIntersecting);
    },
    {
      threshold: 0.25,
    }
  );

  observer.observe(auditSection);
}
