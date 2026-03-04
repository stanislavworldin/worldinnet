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

const casesViewport = document.getElementById("cases-viewport");

if (casesViewport) {
  const slides = Array.from(casesViewport.querySelectorAll(".case-slide"));
  const prevButton = document.getElementById("cases-prev");
  const nextButton = document.getElementById("cases-next");
  const dotButtons = Array.from(document.querySelectorAll("#cases-dots button"));
  let currentIndex = 0;
  let scrollSyncTimer = null;

  const updateControls = () => {
    if (prevButton) {
      prevButton.disabled = currentIndex <= 0;
    }

    if (nextButton) {
      nextButton.disabled = currentIndex >= slides.length - 1;
    }

    dotButtons.forEach((dot, index) => {
      const isActive = index === currentIndex;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-pressed", String(isActive));
    });
  };

  const goToSlide = (index, behavior = "smooth") => {
    if (!slides.length) {
      return;
    }

    const safeIndex = Math.max(0, Math.min(index, slides.length - 1));
    currentIndex = safeIndex;

    casesViewport.scrollTo({
      left: slides[safeIndex].offsetLeft,
      behavior,
    });

    updateControls();
  };

  const syncIndexFromScroll = () => {
    if (!slides.length) {
      return;
    }

    const left = casesViewport.scrollLeft;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    slides.forEach((slide, index) => {
      const distance = Math.abs(slide.offsetLeft - left);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    if (nearestIndex !== currentIndex) {
      currentIndex = nearestIndex;
      updateControls();
    }
  };

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      goToSlide(currentIndex - 1);
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      goToSlide(currentIndex + 1);
    });
  }

  dotButtons.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = Number.parseInt(dot.dataset.index || "0", 10);
      goToSlide(index);
    });
  });

  casesViewport.addEventListener(
    "scroll",
    () => {
      window.clearTimeout(scrollSyncTimer);
      scrollSyncTimer = window.setTimeout(syncIndexFromScroll, 80);
    },
    { passive: true }
  );

  window.addEventListener("resize", () => {
    goToSlide(currentIndex, "auto");
  });

  updateControls();
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
