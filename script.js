const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const revealItems = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 40, 240)}ms`;
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

const auditForm = document.getElementById("audit-form");

if (auditForm) {
  const status = auditForm.querySelector(".form-status");

  auditForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!auditForm.checkValidity()) {
      status.textContent = "Please complete all required fields before sending.";
      status.classList.remove("success");
      status.classList.add("error");
      auditForm.reportValidity();
      return;
    }

    const submitButton = auditForm.querySelector("button[type='submit']");
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    setTimeout(() => {
      status.textContent = "Request sent. We will contact you with your audit and strategy plan within 1 business day.";
      status.classList.remove("error");
      status.classList.add("success");

      auditForm.reset();
      submitButton.disabled = false;
      submitButton.textContent = "Send My Request";
    }, 900);
  });
}
