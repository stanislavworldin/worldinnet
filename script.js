const canvas = document.getElementById("space-canvas");
const resetMissionButton = document.getElementById("reset-mission");
const channelStatusRoot = document.getElementById("channel-status");
const missionStatusRoot = document.getElementById("mission-status");
const infoTitle = document.getElementById("info-title");
const infoSubtitle = document.getElementById("info-subtitle");
const infoContent = document.getElementById("info-content");
const caseTitle = document.getElementById("case-title");
const caseSubtitle = document.getElementById("case-subtitle");
const caseContent = document.getElementById("case-content");

const openAuditButton = document.getElementById("open-audit");
const closeAuditButton = document.getElementById("close-audit");
const auditModal = document.getElementById("audit-modal");
const auditForm = document.getElementById("audit-form");

const channelDefinitions = [
  {
    id: "google",
    name: "Google Ads",
    color: "#64b4ff",
    colorHex: 0x64b4ff,
    accentHex: 0x2b6cd8,
    orbitRadius: 6.4,
    orbitSpeed: 0.2,
    size: 1.52,
    initialAngle: 0.1,
    pitchOffset: 0.2,
    summary: "Capture high-intent demand instantly with structured campaign architecture.",
    bullets: [
      "Search and Performance Max architecture by intent stage.",
      "Budget and bid control by margin, not vanity traffic.",
      "Negative keyword expansion and creative testing loops.",
    ],
    metrics: ["CPL down 34%", "Search CVR +39%", "ROAS up to 4.3x"],
  },
  {
    id: "meta",
    name: "Meta Ads (FB/IG)",
    color: "#ff72cb",
    colorHex: 0xff72cb,
    accentHex: 0x7f3ecb,
    orbitRadius: 6.8,
    orbitSpeed: 0.17,
    size: 1.4,
    initialAngle: 2.2,
    pitchOffset: -0.15,
    summary: "Generate and scale demand with creatives, audience loops, and retargeting.",
    bullets: [
      "Audience clustering by behavior and funnel stage.",
      "Creative matrix testing: hooks, offers, and placements.",
      "Retargeting and reactivation to improve LTV.",
    ],
    metrics: ["CTR +57%", "CAC down 29%", "Repeat orders +52%"],
  },
  {
    id: "seo",
    name: "SEO Planet",
    color: "#5af3d9",
    colorHex: 0x5af3d9,
    accentHex: 0x1c7f70,
    orbitRadius: 6.2,
    orbitSpeed: 0.15,
    size: 1.62,
    initialAngle: 4.45,
    pitchOffset: 0.12,
    summary: "Build durable organic growth with technical excellence and intent-led content.",
    bullets: [
      "Technical SEO: crawlability, indexation, Core Web Vitals.",
      "Semantic architecture mapped to commercial intent.",
      "Internal linking and authority expansion strategy.",
    ],
    metrics: ["Top-3 share +68%", "Organic leads +182%", "CTR +31%"],
  },
];

const cometDefinitions = [
  {
    id: "cafe",
    name: "Cafe Nova",
    colorHex: 0xffd06f,
    orbitRadius: 10.8,
    orbitSpeed: 0.24,
    initialAngle: 0.6,
    pitchOffset: 0.8,
    before: ["Reservations: 28/mo", "Cost per booking: $32", "Map actions: 410"],
    after: ["Reservations: 79/mo", "Cost per booking: $21", "Map actions: 1,060"],
    summary: "Local SEO + Google Search + Instagram remarketing increased booking velocity.",
  },
  {
    id: "delivery",
    name: "Swift Delivery",
    colorHex: 0xffb17b,
    orbitRadius: 11.9,
    orbitSpeed: 0.19,
    initialAngle: 2.2,
    pitchOffset: -0.5,
    before: ["Orders/week: 180", "CAC: $19", "Repeat rate: 17%"],
    after: ["Orders/week: 353", "CAC: $13.5", "Repeat rate: 26%"],
    summary: "Search intent campaigns plus Meta prospecting doubled qualified order flow.",
  },
  {
    id: "store",
    name: "Local Home Store",
    colorHex: 0xfedb8a,
    orbitRadius: 12.8,
    orbitSpeed: 0.16,
    initialAngle: 4.3,
    pitchOffset: 0.35,
    before: ["Local pack share: 18%", "Leads/mo: 120", "Blended CPL: $25"],
    after: ["Local pack share: 57%", "Leads/mo: 257", "Blended CPL: $14.7"],
    summary: "Local SEO pages + catalog campaigns grew both foot traffic and online orders.",
  },
  {
    id: "dance",
    name: "Urban Dance Lab",
    colorHex: 0xffc276,
    orbitRadius: 13.7,
    orbitSpeed: 0.14,
    initialAngle: 5.6,
    pitchOffset: -0.25,
    before: ["Trial leads: 46/mo", "CPL: $27", "Class fill rate: 42%"],
    after: ["Trial leads: 107/mo", "CPL: $17", "Class fill rate: 81%"],
    summary: "SEO landing flow with Instagram video funnel increased studio occupancy fast.",
  },
];

const state = {
  selectedChannels: new Set(),
  missionActivated: false,
  clickedPointer: { x: 0, y: 0 },
};

const setMissionStatus = (title, description) => {
  missionStatusRoot.innerHTML = `<h2>${title}</h2><p>${description}</p>`;
};

const renderChannelStatus = () => {
  const html = channelDefinitions
    .map((channel) => {
      const active = state.selectedChannels.has(channel.id) ? "active" : "";
      return `<span class="channel-chip ${active}">${channel.name}</span>`;
    })
    .join("");

  channelStatusRoot.innerHTML = html;
};

const resetInfoPanel = () => {
  infoTitle.textContent = "Select a Planet";
  infoSubtitle.textContent = "Choose SEO, Google Ads, or Meta Ads to inspect service details.";
  infoContent.innerHTML = "";
};

const renderChannelInfo = (channel) => {
  infoTitle.textContent = channel.name;
  infoSubtitle.textContent = channel.summary;

  const bullets = channel.bullets.map((item) => `<p>${item}</p>`).join("");
  const metrics = channel.metrics.map((item) => `<span>${item}</span>`).join("");

  infoContent.innerHTML = `
    <article class="info-card">
      <h3>Execution Playbook</h3>
      ${bullets}
    </article>
    <article class="info-card">
      <h3>Target Outcomes</h3>
      <div class="case-metrics">${metrics}</div>
    </article>
  `;
};

const resetCasePanel = () => {
  caseTitle.textContent = "Click Any Comet";
  caseSubtitle.textContent = "Comets are real business sectors. Tap one for monthly before/after outcomes.";
  caseContent.innerHTML = "";
};

const renderCometCase = (comet) => {
  caseTitle.textContent = comet.name;
  caseSubtitle.textContent = comet.summary;

  const before = comet.before.map((item) => `<p>${item}</p>`).join("");
  const after = comet.after.map((item) => `<p>${item}</p>`).join("");

  caseContent.innerHTML = `
    <article class="case-card">
      <h3>Before</h3>
      ${before}
    </article>
    <article class="case-card">
      <h3>After</h3>
      ${after}
    </article>
  `;
};

renderChannelStatus();
resetInfoPanel();
resetCasePanel();

if (!canvas || typeof window.THREE === "undefined") {
  setMissionStatus("Status: Rendering Blocked", "Three.js is unavailable in this browser context.");
} else {
  const scene = new window.THREE.Scene();
  scene.fog = new window.THREE.FogExp2(0x050817, 0.035);

  const renderer = new window.THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
  renderer.setSize(window.innerWidth, window.innerHeight, false);

  const camera = new window.THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 220);

  const cameraOrbit = {
    yaw: 0.38,
    pitch: 0.16,
    radius: 15.4,
    targetYaw: 0.38,
    targetPitch: 0.16,
    targetRadius: 15.4,
  };

  const ambient = new window.THREE.AmbientLight(0x7ca9ff, 0.6);
  scene.add(ambient);

  const keyLight = new window.THREE.PointLight(0x65b9ff, 1.1, 120);
  keyLight.position.set(8, 8, 9);
  scene.add(keyLight);

  const fillLight = new window.THREE.PointLight(0xff7fd7, 0.75, 90);
  fillLight.position.set(-9, -2, 7);
  scene.add(fillLight);

  const coreLight = new window.THREE.PointLight(0x4ef4dd, 1.0, 55);
  scene.add(coreLight);

  const starsGeometry = new window.THREE.BufferGeometry();
  const starCount = window.innerWidth < 820 ? 800 : 1700;
  const starPositions = new Float32Array(starCount * 3);

  for (let index = 0; index < starCount; index += 1) {
    const i = index * 3;
    starPositions[i] = (Math.random() - 0.5) * 100;
    starPositions[i + 1] = (Math.random() - 0.5) * 78;
    starPositions[i + 2] = (Math.random() - 0.5) * 100;
  }

  starsGeometry.setAttribute("position", new window.THREE.BufferAttribute(starPositions, 3));

  const stars = new window.THREE.Points(
    starsGeometry,
    new window.THREE.PointsMaterial({
      color: 0xa8dfff,
      size: window.innerWidth < 820 ? 0.05 : 0.07,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
    })
  );

  scene.add(stars);

  const coreGroup = new window.THREE.Group();

  const coreSphere = new window.THREE.Mesh(
    new window.THREE.SphereGeometry(1.08, 32, 32),
    new window.THREE.MeshStandardMaterial({
      color: 0x4ef4dd,
      emissive: 0x11756d,
      emissiveIntensity: 1,
      roughness: 0.22,
      metalness: 0.42,
    })
  );

  const coreRing = new window.THREE.Mesh(
    new window.THREE.TorusGeometry(1.65, 0.09, 18, 120),
    new window.THREE.MeshStandardMaterial({
      color: 0x72a7ff,
      emissive: 0x29477d,
      emissiveIntensity: 1,
      roughness: 0.3,
      metalness: 0.56,
    })
  );

  coreRing.rotation.x = Math.PI * 0.5;

  const coreRingB = new window.THREE.Mesh(
    new window.THREE.TorusGeometry(2.05, 0.06, 16, 96),
    new window.THREE.MeshStandardMaterial({
      color: 0xff73d1,
      emissive: 0x61295b,
      emissiveIntensity: 0.8,
      roughness: 0.4,
      metalness: 0.45,
    })
  );

  coreRingB.rotation.y = Math.PI * 0.25;

  coreGroup.add(coreSphere, coreRing, coreRingB);
  scene.add(coreGroup);

  const createTextSprite = (text, options = {}) => {
    const width = options.width || 420;
    const height = options.height || 110;
    const canvas2d = document.createElement("canvas");
    canvas2d.width = width;
    canvas2d.height = height;

    const ctx = canvas2d.getContext("2d");

    if (!ctx) {
      return null;
    }

    ctx.fillStyle = options.background || "rgba(5, 13, 28, 0.78)";
    ctx.strokeStyle = options.border || "rgba(136, 191, 255, 0.8)";
    ctx.lineWidth = 4;

    const radius = 22;
    ctx.beginPath();
    ctx.moveTo(radius, 6);
    ctx.lineTo(width - radius, 6);
    ctx.quadraticCurveTo(width - 6, 6, width - 6, radius);
    ctx.lineTo(width - 6, height - radius);
    ctx.quadraticCurveTo(width - 6, height - 6, width - radius, height - 6);
    ctx.lineTo(radius, height - 6);
    ctx.quadraticCurveTo(6, height - 6, 6, height - radius);
    ctx.lineTo(6, radius);
    ctx.quadraticCurveTo(6, 6, radius, 6);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = options.color || "#ecf6ff";
    ctx.font = `700 ${options.fontSize || 34}px Orbitron, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, width / 2, height / 2 + 2);

    const texture = new window.THREE.CanvasTexture(canvas2d);
    texture.needsUpdate = true;

    const material = new window.THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
    const sprite = new window.THREE.Sprite(material);
    sprite.scale.set(options.scaleX || 2.7, options.scaleY || 0.7, 1);
    return sprite;
  };

  const createPlanetTexture = (baseColor, accentColor) => {
    const textureCanvas = document.createElement("canvas");
    textureCanvas.width = 512;
    textureCanvas.height = 512;

    const context = textureCanvas.getContext("2d");

    if (!context) {
      return null;
    }

    const gradient = context.createRadialGradient(190, 160, 60, 260, 260, 280);
    gradient.addColorStop(0, baseColor);
    gradient.addColorStop(1, accentColor);
    context.fillStyle = gradient;
    context.fillRect(0, 0, 512, 512);

    context.globalAlpha = 0.16;
    for (let i = 0; i < 12; i += 1) {
      context.beginPath();
      context.fillStyle = i % 2 === 0 ? "#ffffff" : "#000000";
      context.arc(Math.random() * 512, Math.random() * 512, 14 + Math.random() * 36, 0, Math.PI * 2);
      context.fill();
    }

    context.globalAlpha = 0.26;
    for (let line = 0; line < 8; line += 1) {
      context.strokeStyle = "#ffffff";
      context.lineWidth = 8 + Math.random() * 10;
      context.beginPath();
      context.moveTo(0, Math.random() * 512);
      context.bezierCurveTo(160, Math.random() * 512, 340, Math.random() * 512, 512, Math.random() * 512);
      context.stroke();
    }

    const texture = new window.THREE.CanvasTexture(textureCanvas);
    texture.needsUpdate = true;
    return texture;
  };

  const clickTargets = [];
  const planets = [];
  const comets = [];
  const connectors = new Map();

  channelDefinitions.forEach((channel, index) => {
    const group = new window.THREE.Group();

    const texture = createPlanetTexture(channel.color, "#0f1e40");
    const material = new window.THREE.MeshStandardMaterial({
      color: channel.colorHex,
      map: texture,
      emissive: channel.accentHex,
      emissiveIntensity: 0.68,
      roughness: 0.34,
      metalness: 0.35,
    });

    const mesh = new window.THREE.Mesh(new window.THREE.SphereGeometry(channel.size, 42, 42), material);
    const glowMesh = new window.THREE.Mesh(
      new window.THREE.SphereGeometry(channel.size * 1.22, 28, 28),
      new window.THREE.MeshBasicMaterial({
        color: channel.colorHex,
        transparent: true,
        opacity: 0.2,
        depthWrite: false,
        blending: window.THREE.AdditiveBlending,
      })
    );

    const ring = new window.THREE.Mesh(
      new window.THREE.TorusGeometry(channel.size * 1.34, channel.size * 0.08, 12, 88),
      new window.THREE.MeshBasicMaterial({ color: channel.colorHex, transparent: true, opacity: 0.08 })
    );
    ring.rotation.x = Math.PI * 0.5;

    const label = createTextSprite(channel.name, {
      width: 450,
      height: 112,
      color: "#ecf6ff",
      border: "rgba(121,191,255,0.72)",
      scaleX: 2.7,
      scaleY: 0.66,
    });

    if (label) {
      label.position.set(0, channel.size + 1.05, 0);
      group.add(label);
    }

    mesh.userData = { type: "planet", id: channel.id };
    clickTargets.push(mesh);

    group.add(mesh, glowMesh, ring);
    scene.add(group);

    const connector = new window.THREE.Line(
      new window.THREE.BufferGeometry().setFromPoints([new window.THREE.Vector3(), new window.THREE.Vector3()]),
      new window.THREE.LineBasicMaterial({ color: channel.colorHex, transparent: true, opacity: 0 })
    );

    scene.add(connector);
    connectors.set(channel.id, connector);

    planets.push({
      channel,
      group,
      mesh,
      glowMesh,
      ring,
      label,
      angle: channel.initialAngle,
      wobblePhase: index,
    });
  });

  cometDefinitions.forEach((cometDefinition, index) => {
    const group = new window.THREE.Group();

    const mesh = new window.THREE.Mesh(
      new window.THREE.SphereGeometry(0.33, 20, 20),
      new window.THREE.MeshStandardMaterial({
        color: cometDefinition.colorHex,
        emissive: 0x583918,
        emissiveIntensity: 0.8,
        roughness: 0.35,
        metalness: 0.1,
      })
    );

    const tailGeometry = new window.THREE.ConeGeometry(0.09, 0.8, 12);
    const tailMaterial = new window.THREE.MeshBasicMaterial({ color: 0xffd98d, transparent: true, opacity: 0.62 });
    const tail = new window.THREE.Mesh(tailGeometry, tailMaterial);
    tail.position.set(-0.4, 0, 0);
    tail.rotation.z = Math.PI * 0.5;

    const label = createTextSprite(cometDefinition.name, {
      width: 420,
      height: 98,
      color: "#fff1d3",
      border: "rgba(255,210,130,0.68)",
      background: "rgba(36, 22, 10, 0.72)",
      fontSize: 28,
      scaleX: 2,
      scaleY: 0.5,
    });

    if (label) {
      label.position.set(0, 0.9, 0);
      group.add(label);
    }

    mesh.userData = { type: "comet", id: cometDefinition.id };
    clickTargets.push(mesh);

    group.add(mesh, tail);
    scene.add(group);

    comets.push({
      data: cometDefinition,
      group,
      mesh,
      tail,
      label,
      angle: cometDefinition.initialAngle,
      phase: index * 0.92,
    });
  });

  const rocket = new window.THREE.Group();
  const rocketBody = new window.THREE.Mesh(
    new window.THREE.CylinderGeometry(0.18, 0.22, 1.3, 16),
    new window.THREE.MeshStandardMaterial({
      color: 0xcbe9ff,
      emissive: 0x17345a,
      emissiveIntensity: 0.4,
      roughness: 0.36,
      metalness: 0.6,
    })
  );

  const rocketNose = new window.THREE.Mesh(
    new window.THREE.ConeGeometry(0.2, 0.42, 16),
    new window.THREE.MeshStandardMaterial({
      color: 0x73abff,
      emissive: 0x1a3f7f,
      emissiveIntensity: 0.6,
      roughness: 0.28,
      metalness: 0.5,
    })
  );
  rocketNose.position.y = 0.86;

  const rocketFinL = new window.THREE.Mesh(
    new window.THREE.BoxGeometry(0.08, 0.3, 0.24),
    new window.THREE.MeshStandardMaterial({ color: 0xff67cc, emissive: 0x5f224d, emissiveIntensity: 0.55 })
  );
  rocketFinL.position.set(0.2, -0.45, 0);

  const rocketFinR = rocketFinL.clone();
  rocketFinR.position.x = -0.2;

  const rocketFlame = new window.THREE.Mesh(
    new window.THREE.ConeGeometry(0.12, 0.46, 16),
    new window.THREE.MeshBasicMaterial({ color: 0xffc25d, transparent: true, opacity: 0.9 })
  );
  rocketFlame.position.y = -0.9;
  rocketFlame.rotation.x = Math.PI;

  rocket.add(rocketBody, rocketNose, rocketFinL, rocketFinR, rocketFlame);
  rocket.visible = false;
  scene.add(rocket);

  const rocketState = {
    phase: "idle",
    launchProgress: 0,
    orbitAngle: 0,
  };

  const activateMission = () => {
    if (state.missionActivated) {
      return;
    }

    state.missionActivated = true;
    rocketState.phase = "launch";
    rocketState.launchProgress = 0;
    rocket.visible = true;

    setMissionStatus(
      "Status: Unified Engine Activated",
      "All 3 channels connected. Rocket launched. Multi-channel growth system is now synchronized."
    );
  };

  const resetMission = () => {
    state.selectedChannels.clear();
    state.missionActivated = false;
    rocketState.phase = "idle";
    rocketState.launchProgress = 0;
    rocketState.orbitAngle = 0;
    rocket.visible = false;

    setMissionStatus("Status: Awaiting Channel Connection", "Select at least one planet to start the mission.");
    renderChannelStatus();
    resetInfoPanel();
  };

  const updateStatusBySelection = () => {
    renderChannelStatus();

    if (state.missionActivated) {
      return;
    }

    const selectedCount = state.selectedChannels.size;

    if (!selectedCount) {
      setMissionStatus("Status: Awaiting Channel Connection", "Select at least one planet to start the mission.");
      return;
    }

    if (selectedCount < 3) {
      setMissionStatus(
        `Status: ${selectedCount}/3 Channels Linked`,
        "Continue selecting planets to merge all traffic systems and launch the rocket."
      );
      return;
    }

    activateMission();
  };

  const raycaster = new window.THREE.Raycaster();
  const pointer = new window.THREE.Vector2();

  const togglePlanetSelection = (planetId) => {
    if (state.missionActivated) {
      return;
    }

    if (state.selectedChannels.has(planetId)) {
      state.selectedChannels.delete(planetId);
    } else {
      state.selectedChannels.add(planetId);
    }

    updateStatusBySelection();
  };

  const onSceneClick = (event) => {
    if (auditModal && !auditModal.classList.contains("hidden")) {
      return;
    }

    const targetElement = event.target;

    if (!(targetElement instanceof HTMLElement)) {
      return;
    }

    if (targetElement.closest(".panel") || targetElement.closest(".topbar") || targetElement.closest(".legend")) {
      return;
    }

    if (Math.abs(event.clientX - state.clickedPointer.x) > 5 || Math.abs(event.clientY - state.clickedPointer.y) > 5) {
      return;
    }

    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const intersections = raycaster.intersectObjects(clickTargets, false);

    if (!intersections.length) {
      return;
    }

    const item = intersections[0].object.userData;

    if (item.type === "planet") {
      const channel = channelDefinitions.find((entry) => entry.id === item.id);
      if (!channel) {
        return;
      }

      togglePlanetSelection(item.id);
      renderChannelInfo(channel);
      return;
    }

    if (item.type === "comet") {
      const comet = cometDefinitions.find((entry) => entry.id === item.id);
      if (!comet) {
        return;
      }

      renderCometCase(comet);
    }
  };

  let dragging = false;
  let lastPointer = { x: 0, y: 0 };

  window.addEventListener("pointerdown", (event) => {
    dragging = true;
    state.clickedPointer.x = event.clientX;
    state.clickedPointer.y = event.clientY;
    lastPointer = { x: event.clientX, y: event.clientY };
  });

  window.addEventListener("pointermove", (event) => {
    if (!dragging) {
      return;
    }

    const deltaX = event.clientX - lastPointer.x;
    const deltaY = event.clientY - lastPointer.y;

    cameraOrbit.targetYaw -= deltaX * 0.005;
    cameraOrbit.targetPitch += deltaY * 0.004;
    cameraOrbit.targetPitch = Math.max(-0.6, Math.min(0.8, cameraOrbit.targetPitch));

    lastPointer = { x: event.clientX, y: event.clientY };
  });

  window.addEventListener("pointerup", (event) => {
    dragging = false;
    onSceneClick(event);
  });

  window.addEventListener(
    "wheel",
    (event) => {
      cameraOrbit.targetRadius += event.deltaY * 0.008;
      cameraOrbit.targetRadius = Math.max(10, Math.min(24, cameraOrbit.targetRadius));
    },
    { passive: true }
  );

  const clock = new window.THREE.Clock();

  const toVector3 = (x, y, z) => new window.THREE.Vector3(x, y, z);

  const updatePlanetVisuals = (elapsedTime, deltaTime) => {
    planets.forEach((planet) => {
      planet.angle += deltaTime * planet.channel.orbitSpeed;
      const radius = planet.channel.orbitRadius;

      const x = Math.cos(planet.angle) * radius;
      const z = Math.sin(planet.angle) * radius;
      const y = Math.sin(planet.angle * 1.7 + planet.channel.pitchOffset) * 0.9;

      planet.group.position.set(x, y, z);
      planet.mesh.rotation.y += deltaTime * 0.45;
      planet.mesh.rotation.x += deltaTime * 0.24;

      const selected = state.selectedChannels.has(planet.channel.id);
      planet.glowMesh.material.opacity = selected ? 0.28 + Math.sin(elapsedTime * 5 + radius) * 0.08 : 0.18;
      planet.ring.material.opacity = selected ? 0.68 + Math.sin(elapsedTime * 4) * 0.2 : 0.08;
      planet.ring.rotation.z += deltaTime * 0.7;

      const connector = connectors.get(planet.channel.id);
      if (connector) {
        connector.geometry.setFromPoints([planet.group.position.clone(), toVector3(0, 0, 0)]);
        connector.material.opacity = selected ? 0.45 + Math.sin(elapsedTime * 3 + radius) * 0.2 : 0;
      }
    });
  };

  const updateComets = (deltaTime) => {
    comets.forEach((comet) => {
      comet.angle += deltaTime * comet.data.orbitSpeed;

      const x = Math.cos(comet.angle) * comet.data.orbitRadius;
      const z = Math.sin(comet.angle) * comet.data.orbitRadius;
      const y = Math.sin(comet.angle * 1.2 + comet.data.pitchOffset) * 2.1;

      comet.group.position.set(x, y, z);

      const tangentX = -Math.sin(comet.angle);
      const tangentZ = Math.cos(comet.angle);
      comet.tail.rotation.y = Math.atan2(tangentX, tangentZ);
      comet.mesh.rotation.y += deltaTime * 1.9;
    });
  };

  const updateRocket = (deltaTime, elapsedTime) => {
    if (rocketState.phase === "idle") {
      return;
    }

    if (rocketState.phase === "launch") {
      rocketState.launchProgress = Math.min(rocketState.launchProgress + deltaTime * 0.46, 1);
      const t = rocketState.launchProgress;

      const x = Math.sin(t * Math.PI * 1.8) * 1.1;
      const y = t * 8.2;
      const z = t * 5.4;

      rocket.position.set(x, y, z);
      rocket.rotation.z = -0.16;
      rocket.rotation.x = 0.14;
      rocket.rotation.y = Math.sin(elapsedTime * 4) * 0.1;

      rocketFlame.scale.y = 0.8 + Math.sin(elapsedTime * 22) * 0.3;
      rocketFlame.material.opacity = 0.65 + Math.sin(elapsedTime * 18) * 0.3;

      if (t >= 1) {
        rocketState.phase = "orbit";
        rocketState.orbitAngle = 0;
      }

      return;
    }

    if (rocketState.phase === "orbit") {
      rocketState.orbitAngle += deltaTime * 0.62;
      const orbitRadius = 8.8;

      rocket.position.set(
        Math.cos(rocketState.orbitAngle) * orbitRadius,
        3 + Math.sin(rocketState.orbitAngle * 1.6) * 1.6,
        Math.sin(rocketState.orbitAngle) * orbitRadius
      );

      rocket.lookAt(0, 0, 0);
      rocket.rotateY(Math.PI * 0.5);

      rocketFlame.scale.y = 0.72 + Math.sin(elapsedTime * 18) * 0.22;
      rocketFlame.material.opacity = 0.6 + Math.sin(elapsedTime * 15) * 0.25;
    }
  };

  const updateCamera = () => {
    cameraOrbit.yaw += (cameraOrbit.targetYaw - cameraOrbit.yaw) * 0.08;
    cameraOrbit.pitch += (cameraOrbit.targetPitch - cameraOrbit.pitch) * 0.08;
    cameraOrbit.radius += (cameraOrbit.targetRadius - cameraOrbit.radius) * 0.08;

    const radius = cameraOrbit.radius;

    camera.position.x = Math.cos(cameraOrbit.yaw) * Math.cos(cameraOrbit.pitch) * radius;
    camera.position.y = Math.sin(cameraOrbit.pitch) * radius;
    camera.position.z = Math.sin(cameraOrbit.yaw) * Math.cos(cameraOrbit.pitch) * radius;

    camera.lookAt(0, 0, 0);
  };

  const animate = () => {
    const deltaTime = Math.min(clock.getDelta(), 0.05);
    const elapsedTime = clock.elapsedTime;

    coreGroup.rotation.y += deltaTime * 0.32;
    coreGroup.rotation.x = Math.sin(elapsedTime * 0.5) * 0.1;

    coreLight.intensity = 0.8 + Math.sin(elapsedTime * 2.6) * 0.2;

    stars.rotation.y += deltaTime * 0.008;

    updatePlanetVisuals(elapsedTime, deltaTime);
    updateComets(deltaTime);
    updateRocket(deltaTime, elapsedTime);
    updateCamera();

    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
  };

  animate();

  const onResize = () => {
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  };

  window.addEventListener("resize", onResize);

  if (resetMissionButton) {
    resetMissionButton.addEventListener("click", () => {
      resetMission();
    });
  }
}

const toggleAuditModal = (open) => {
  if (!auditModal) {
    return;
  }

  auditModal.classList.toggle("hidden", !open);
  auditModal.setAttribute("aria-hidden", String(!open));
};

if (openAuditButton) {
  openAuditButton.addEventListener("click", () => toggleAuditModal(true));
}

if (closeAuditButton) {
  closeAuditButton.addEventListener("click", () => toggleAuditModal(false));
}

if (auditModal) {
  auditModal.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.id === "audit-modal") {
      toggleAuditModal(false);
    }
  });
}

if (auditForm) {
  const status = auditForm.querySelector(".form-status");

  auditForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!auditForm.checkValidity()) {
      if (status) {
        status.textContent = "Please complete all required fields before sending.";
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
        status.textContent = "Request sent. We will contact you with your growth strategy within 1 business day.";
        status.classList.remove("error");
        status.classList.add("success");
      }

      auditForm.reset();

      if (submitButton instanceof HTMLButtonElement) {
        submitButton.disabled = false;
        submitButton.textContent = "Send Request";
      }
    }, 900);
  });
}
