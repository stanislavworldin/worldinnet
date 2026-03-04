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

const revealElements = document.querySelectorAll("[data-reveal]");

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
    { threshold: 0.14 }
  );

  revealElements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index * 30, 180)}ms`;
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

const liveAnalyticsPanel = document.getElementById("live-analytics");

if (liveAnalyticsPanel) {
  const valueNodes = {
    impressions: liveAnalyticsPanel.querySelector("[data-live-key='impressions']"),
    clicks: liveAnalyticsPanel.querySelector("[data-live-key='clicks']"),
    leads: liveAnalyticsPanel.querySelector("[data-live-key='leads']"),
    bookings: liveAnalyticsPanel.querySelector("[data-live-key='bookings']"),
    spend: liveAnalyticsPanel.querySelector("[data-live-key='spend']"),
    pipeline: liveAnalyticsPanel.querySelector("[data-live-key='pipeline']"),
  };

  const updatedLabel = liveAnalyticsPanel.querySelector("[data-live-updated]");

  const state = {
    impressions: 182460,
    clicks: 6940,
    leads: 248,
    bookings: 41,
    spend: 4820,
    pipeline: 39640,
  };

  const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const formatMetric = (key, value) => {
    if (key === "spend" || key === "pipeline") {
      return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      });
    }

    return value.toLocaleString("en-US");
  };

  const renderMetrics = () => {
    Object.entries(valueNodes).forEach(([key, node]) => {
      if (!node) {
        return;
      }

      node.textContent = formatMetric(key, state[key]);
      node.classList.remove("tick-up");
      void node.offsetWidth;
      node.classList.add("tick-up");
    });

    if (updatedLabel) {
      updatedLabel.textContent = `Updated ${new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })}`;
    }
  };

  renderMetrics();

  window.setInterval(() => {
    state.impressions += randomInt(190, 420);
    state.clicks += randomInt(7, 17);
    state.leads += randomInt(1, 3);
    state.bookings += Math.random() < 0.42 ? 1 : 0;
    state.spend += randomInt(11, 29);
    state.pipeline += randomInt(68, 230);

    renderMetrics();
  }, 1000);
}

const casesWindow = document.getElementById("cases-window");

if (casesWindow) {
  const cards = Array.from(casesWindow.querySelectorAll(".case-card"));
  const prevBtn = document.getElementById("cases-prev");
  const nextBtn = document.getElementById("cases-next");
  const pagerButtons = Array.from(document.querySelectorAll("#cases-pagination button"));
  let activeIndex = 0;
  let syncTimer = null;

  const updateCasesUI = () => {
    if (prevBtn) {
      prevBtn.disabled = activeIndex <= 0;
    }

    if (nextBtn) {
      nextBtn.disabled = activeIndex >= cards.length - 1;
    }

    pagerButtons.forEach((button, index) => {
      const isActive = index === activeIndex;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  };

  const goToCase = (index, behavior = "smooth") => {
    if (!cards.length) {
      return;
    }

    const safeIndex = Math.max(0, Math.min(index, cards.length - 1));
    activeIndex = safeIndex;

    casesWindow.scrollTo({
      left: cards[safeIndex].offsetLeft,
      behavior,
    });

    updateCasesUI();
  };

  const syncActiveCase = () => {
    const currentLeft = casesWindow.scrollLeft;
    let nearestIndex = 0;
    let minDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const distance = Math.abs(card.offsetLeft - currentLeft);
      if (distance < minDistance) {
        minDistance = distance;
        nearestIndex = index;
      }
    });

    if (nearestIndex !== activeIndex) {
      activeIndex = nearestIndex;
      updateCasesUI();
    }
  };

  if (prevBtn) {
    prevBtn.addEventListener("click", () => goToCase(activeIndex - 1));
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => goToCase(activeIndex + 1));
  }

  pagerButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number.parseInt(button.dataset.index || "0", 10);
      goToCase(index);
    });
  });

  casesWindow.addEventListener(
    "scroll",
    () => {
      window.clearTimeout(syncTimer);
      syncTimer = window.setTimeout(syncActiveCase, 90);
    },
    { passive: true }
  );

  window.addEventListener("resize", () => {
    goToCase(activeIndex, "auto");
  });

  updateCasesUI();
}

const createSvgNode = (name, attrs = {}) => {
  const node = document.createElementNS("http://www.w3.org/2000/svg", name);
  Object.entries(attrs).forEach(([key, value]) => {
    node.setAttribute(key, String(value));
  });
  return node;
};

const parseNumericSeries = (value) =>
  String(value || "")
    .split(",")
    .map((part) => Number.parseFloat(part.trim()))
    .filter((number) => Number.isFinite(number));

const buildChart = (svg) => {
  const beforeValues = parseNumericSeries(svg.dataset.before);
  const afterValues = parseNumericSeries(svg.dataset.after);

  if (!beforeValues.length || beforeValues.length !== afterValues.length) {
    return;
  }

  const width = 620;
  const height = 230;
  const padX = 34;
  const padTop = 22;
  const padBottom = 32;

  const allValues = [...beforeValues, ...afterValues];
  const max = Math.max(...allValues);
  const min = Math.min(...allValues);
  const range = Math.max(max - min, 1);

  const pointsToPolyline = (values) =>
    values
      .map((value, index) => {
        const x = padX + (index * (width - padX * 2)) / (values.length - 1);
        const normalized = (value - min) / range;
        const y = height - padBottom - normalized * (height - padTop - padBottom);
        return { x, y };
      })
      .map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`)
      .join(" ");

  for (let step = 0; step < 4; step += 1) {
    const y = padTop + (step * (height - padTop - padBottom)) / 3;
    svg.append(createSvgNode("line", { x1: padX, y1: y, x2: width - padX, y2: y, class: "chart-axis" }));
  }

  const beforeLine = createSvgNode("polyline", {
    points: pointsToPolyline(beforeValues),
    class: "chart-line before",
  });

  const afterLine = createSvgNode("polyline", {
    points: pointsToPolyline(afterValues),
    class: "chart-line after",
  });

  svg.append(beforeLine, afterLine);

  const drawDots = (values, className) => {
    values.forEach((value, index) => {
      const x = padX + (index * (width - padX * 2)) / (values.length - 1);
      const normalized = (value - min) / range;
      const y = height - padBottom - normalized * (height - padTop - padBottom);
      const dot = createSvgNode("circle", {
        cx: x,
        cy: y,
        r: 5,
        class: `chart-dot ${className}`,
      });
      dot.style.opacity = "0";
      svg.append(dot);
    });
  };

  drawDots(beforeValues, "before");
  drawDots(afterValues, "after");
};

const animateChart = (svg) => {
  const lines = svg.querySelectorAll(".chart-line");
  const dots = svg.querySelectorAll(".chart-dot");

  lines.forEach((line, index) => {
    const length = line.getTotalLength();
    line.style.strokeDasharray = String(length);
    line.style.strokeDashoffset = String(length);

    requestAnimationFrame(() => {
      line.style.transitionDelay = `${index * 140}ms`;
      line.style.strokeDashoffset = "0";
    });
  });

  dots.forEach((dot, index) => {
    dot.style.transition = `opacity 0.28s ease ${260 + index * 28}ms`;
    requestAnimationFrame(() => {
      dot.style.opacity = "1";
    });
  });
};

const charts = Array.from(document.querySelectorAll(".growth-chart"));

charts.forEach((chart) => buildChart(chart));

if ("IntersectionObserver" in window) {
  const chartObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        animateChart(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.34 }
  );

  charts.forEach((chart) => chartObserver.observe(chart));
} else {
  charts.forEach((chart) => animateChart(chart));
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

    window.setTimeout(() => {
      status.textContent = "Request sent. We will contact you with your audit and strategy plan within 1 business day.";
      status.classList.remove("error");
      status.classList.add("success");

      auditForm.reset();
      submitButton.disabled = false;
      submitButton.textContent = "Send Strategy Request";
    }, 900);
  });
}

const initThreeBackground = () => {
  const canvas = document.getElementById("cosmos-canvas");

  if (!canvas || typeof window.THREE === "undefined") {
    return;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  try {
    const isMobile = window.innerWidth < 820;
    const renderer = new window.THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
    renderer.setSize(window.innerWidth, window.innerHeight, false);

    const scene = new window.THREE.Scene();
    const camera = new window.THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 120);
    camera.position.set(0, 0, isMobile ? 11 : 10);

    const ambientLight = new window.THREE.AmbientLight(0x73b5ff, 0.58);
    scene.add(ambientLight);

    const pointLightA = new window.THREE.PointLight(0x54f0dd, 1.1, 35);
    pointLightA.position.set(7, 4, 6);
    scene.add(pointLightA);

    const pointLightB = new window.THREE.PointLight(0xff5ac8, 0.9, 35);
    pointLightB.position.set(-7, -2, 7);
    scene.add(pointLightB);

    const starsCount = isMobile ? 360 : 920;
    const starPositions = new Float32Array(starsCount * 3);

    for (let index = 0; index < starsCount; index += 1) {
      const i = index * 3;
      starPositions[i] = (Math.random() - 0.5) * 44;
      starPositions[i + 1] = (Math.random() - 0.5) * 30;
      starPositions[i + 2] = (Math.random() - 0.5) * 34;
    }

    const starsGeometry = new window.THREE.BufferGeometry();
    starsGeometry.setAttribute("position", new window.THREE.BufferAttribute(starPositions, 3));

    const starsMaterial = new window.THREE.PointsMaterial({
      color: 0x9fe4ff,
      size: isMobile ? 0.05 : 0.06,
      transparent: true,
      opacity: 0.74,
    });

    const starField = new window.THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);

    const floatingMeshes = [];

    const addMesh = (geometry, material, x, y, z, scale) => {
      const mesh = new window.THREE.Mesh(geometry, material);
      mesh.position.set(x, y, z);
      mesh.scale.setScalar(scale);
      scene.add(mesh);
      floatingMeshes.push(mesh);
    };

    addMesh(
      new window.THREE.IcosahedronGeometry(1.05, 1),
      new window.THREE.MeshStandardMaterial({
        color: 0x66f2e0,
        metalness: 0.42,
        roughness: 0.24,
        wireframe: true,
      }),
      -3.7,
      1.9,
      -1,
      1
    );

    addMesh(
      new window.THREE.TorusKnotGeometry(0.92, 0.26, 140, 18),
      new window.THREE.MeshStandardMaterial({
        color: 0x6fa2ff,
        metalness: 0.45,
        roughness: 0.22,
        wireframe: true,
      }),
      3.7,
      0.5,
      -0.2,
      1
    );

    addMesh(
      new window.THREE.OctahedronGeometry(0.94, 0),
      new window.THREE.MeshStandardMaterial({
        color: 0xff78d4,
        metalness: 0.2,
        roughness: 0.32,
        wireframe: true,
      }),
      -1.2,
      -2.25,
      0.9,
      0.9
    );

    addMesh(
      new window.THREE.TetrahedronGeometry(0.84, 0),
      new window.THREE.MeshStandardMaterial({
        color: 0xffd17a,
        metalness: 0.25,
        roughness: 0.35,
        wireframe: true,
      }),
      2.1,
      -2,
      -1,
      0.95
    );

    let pointerX = 0;
    let pointerY = 0;

    window.addEventListener(
      "pointermove",
      (event) => {
        pointerX = (event.clientX / window.innerWidth - 0.5) * 1.25;
        pointerY = (event.clientY / window.innerHeight - 0.5) * 1.1;
      },
      { passive: true }
    );

    const clock = new window.THREE.Clock();

    const render = () => {
      const time = clock.getElapsedTime();

      floatingMeshes.forEach((mesh, index) => {
        const speed = 0.25 + index * 0.06;
        mesh.rotation.x = time * (0.2 + index * 0.03);
        mesh.rotation.y = time * (0.22 + index * 0.04);
        mesh.position.y += Math.sin(time * speed + index) * 0.0016;
      });

      starField.rotation.y = time * 0.018;
      starField.rotation.x = pointerY * 0.08;

      camera.position.x += (pointerX - camera.position.x) * 0.036;
      camera.position.y += (-pointerY - camera.position.y) * 0.036;

      renderer.render(scene, camera);

      if (!prefersReducedMotion) {
        window.requestAnimationFrame(render);
      }
    };

    render();

    if (prefersReducedMotion) {
      renderer.render(scene, camera);
    }

    window.addEventListener("resize", () => {
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });
  } catch (error) {
    console.error("3D background init failed:", error);
  }
};

initThreeBackground();
