const currentYear = document.getElementById('current-year');
const auditForm = document.getElementById('audit-form');
const serviceCards = document.querySelectorAll('.service-card[data-service]');
const servicePreviewButtons = document.querySelectorAll('.card-open-btn');
const serviceModal = document.getElementById('service-modal');
const serviceModalClose = document.getElementById('service-modal-close');
const serviceModalKicker = document.getElementById('service-modal-kicker');
const serviceModalTitle = document.getElementById('service-modal-title');
const serviceModalWhat = document.getElementById('service-modal-what');
const serviceModalHow = document.getElementById('service-modal-how');
const serviceModalFit = document.getElementById('service-modal-fit');

const casesGrid = document.getElementById('cases-grid');

const caseModal = document.getElementById('case-modal');
const caseModalClose = document.getElementById('case-modal-close');
const caseModalKicker = document.getElementById('case-modal-kicker');
const caseModalTitle = document.getElementById('case-modal-title');
const caseModalBefore = document.getElementById('case-modal-before');
const caseModalAfter = document.getElementById('case-modal-after');
const caseModalTools = document.getElementById('case-modal-tools');
const caseModalImpact = document.getElementById('case-modal-impact');

const serviceDetails = {
  'google-ads': {
    kicker: 'PPC',
    title: 'Google Ads',
    what:
      'Google Ads is an intent-driven acquisition channel that captures demand from users actively searching for solutions. It covers Search, Performance Max, Display, YouTube, and remarketing.',
    how:
      'We map your funnel into campaign tiers, cluster keywords by business intent, define bid and budget rules by margin, and run weekly creative plus landing-page tests. Tracking is tied to real pipeline and revenue events, not vanity clicks.',
    fit:
      'Best for businesses with clear offers and measurable conversions: e-commerce brands, lead generation projects, local services, and B2B companies with defined sales funnels.',
  },
  'meta-ads': {
    kicker: 'Social Media',
    title: 'Meta (FB & IG) Ads',
    what:
      'Meta Ads combines audience targeting, creative testing, and retargeting across Facebook and Instagram to generate demand and recover users who did not convert on first visit.',
    how:
      'We build full-funnel campaigns by audience temperature, run a creative matrix of hooks and offers, and optimize around downstream metrics such as qualified leads, purchases, and retained customers.',
    fit:
      'Best for brands with visual products, recurring purchases, or educational funnels. Works especially well for e-commerce, info products, consumer apps, and local brands with repeat demand.',
  },
  seo: {
    kicker: 'Organic Growth',
    title: 'Search Engine Optimization',
    what:
      'SEO is a long-term growth channel that builds sustainable visibility in search through technical site health, semantic content architecture, and authority signals.',
    how:
      'We prioritize technical fixes by impact, map keyword intent to landing pages, create topic clusters, and improve internal linking so search engines understand your site structure and rank the right pages.',
    fit:
      'Best for businesses that want compounding traffic and lower dependency on paid media: SaaS, marketplaces, content-driven brands, service companies, and multi-location businesses.',
  },
};

const CASES = [
  {
    id: 'draughts-io',
    client: 'Draughts.io',
    niche: 'Casual Gaming',
    businessType: 'Browser Game',
    year: 2026,
    dateLabel: 'Jul 2026',
    category: '2026 / Casual Gaming / SEO + CRO + Analytics',
    title: 'Organic growth and retention redesign for a browser game',
    summary:
      'SEO-led acquisition, faster first load, deeper event tracking, and UX testing turned a heavy browser game into a much stronger growth system.',
    before:
      'The project was growing, but organic traffic remained at roughly 200 to 300 visits per day, search CTR was about 3%, the full game loaded on first visit, and in-product analytics were too shallow to explain where players were dropping off.',
    after:
      'We ran a technical and product audit, replaced the heavy first-load experience with a lightweight landing page, improved site speed and Lighthouse scores, instrumented button clicks, screen transitions, and key gameplay events, and launched A/B tests to improve CTR, conversion, and session flow.',
    tools: [
      'Technical SEO and product audit',
      'Lightweight landing page replacing the full first-load game experience',
      'Performance optimization and Lighthouse maximization',
      'Event tracking for buttons, screens, and key gameplay actions',
      'Conversion and retention analysis',
      'A/B tests for CTR and user-flow improvements',
    ],
    impact:
      'Core results were achieved within 3 months. Player acquisition cost dropped around 3x from 0.03 to 0.01, organic traffic increased from 200 to 300 visits per day to roughly 3,000 per day, search CTR rose from 3% to 5%, and average session length grew from 3 minutes to about 15 minutes. The deeper event-tracking layer revealed real player behavior, which made it possible to fix weak points in the funnel and improve retention. After the results, the client extended the engagement and handed over a second game, mahjong.rocks.',
    image: 'assets/draughts-io-icon.png',
    imageAlt: 'Draughts.io app icon with black and natural wooden checkers on a wooden surface',
    featured: true,
    metrics: [
      { label: 'CAC', value: '0.03 -> 0.01' },
      { label: 'Organic Traffic', value: '300/day -> 3,000/day' },
      { label: 'Avg. Session', value: '3 min -> 15 min' },
    ],
  },
  {
    id: 'ecommerce-margin',
    client: 'Ecom Growth Brand',
    niche: 'E-commerce',
    businessType: 'DTC Retail',
    year: 2026,
    dateLabel: 'May 2026',
    category: '2026 / E-commerce / Paid Search',
    title: 'Margin-based performance scaling for catalog products',
    summary:
      'High-intent search and product segmentation were rebuilt around contribution margin instead of top-line volume.',
    before:
      'Campaigns were optimized around volume. Best-selling products were taking budget regardless of margin, generic search terms were overfunded, and ROAS looked acceptable on paper while contribution profit stayed weak.',
    after:
      'We split campaigns by product profitability, introduced margin-based bidding rules, reduced generic overlap, rebuilt the feed structure, and matched landing pages to high-intent query clusters.',
    tools: [
      'Google Merchant Center feed rules',
      'Performance Max asset-group segmentation',
      'Search term mining and negative keyword governance',
      'Meta Dynamic Product Ads and catalog retargeting',
      'GA4 ecommerce event validation',
      'Server-side conversion tagging',
    ],
    impact:
      'Budget shifted toward high-value inventory, wasted spend dropped, and the account scaled with stronger unit economics instead of just higher gross revenue. ROAS moved from 1.9x to 4.8x, CPA fell from $72 to $39, and conversion rate increased from 1.7% to 3.6%.',
    metrics: [
      { label: 'ROAS', value: '1.9x -> 4.8x' },
      { label: 'CPA', value: '$72 -> $39' },
      { label: 'Conversion Rate', value: '1.7% -> 3.6%' },
    ],
  },
  {
    id: 'b2b-saas',
    client: 'SaaS Pipeline Co',
    niche: 'B2B SaaS',
    businessType: 'B2B Software',
    year: 2026,
    dateLabel: 'Apr 2026',
    category: '2026 / B2B SaaS / Lead Generation',
    title: 'Qualified demo growth with intent-tier campaigns',
    summary:
      'Lead generation was restructured around pipeline quality rather than cheap form submissions.',
    before:
      'Campaigns were generating surface-level lead volume, but most submissions were low-fit. CPL looked efficient, yet the sales team was filtering out too many contacts before demo stage.',
    after:
      'We separated intent levels by keyword set, tightened geo and job-title filters, rewrote ad copy around fit, rebuilt landing page messaging, and optimized to qualified demo events instead of raw form fills.',
    tools: [
      'Google Ads Search campaign intent tiers',
      'HubSpot and CRM offline conversion import',
      'Meta lead form audience qualification filters',
      'Landing-page message-match testing',
      'Callrail and form attribution mapping',
      'Revenue-stage bid automation rules',
    ],
    impact:
      'Lead volume became cleaner, sales accepted a higher share of inbound demand, and budget efficiency improved because optimization finally tracked revenue potential. Qualified demo rate increased from 24% to 46%, CPL dropped from $118 to $71, and SQL volume rose from 18 to 43 per month.',
    metrics: [
      { label: 'Qualified Demo Rate', value: '24% -> 46%' },
      { label: 'CPL', value: '$118 -> $71' },
      { label: 'SQLs / Month', value: '18 -> 43' },
    ],
  },
  {
    id: 'local-services',
    client: 'Home Service Group',
    niche: 'Local Services',
    businessType: 'Multi-city Lead Gen',
    year: 2026,
    dateLabel: 'Feb 2026',
    category: '2026 / Local Services / Multi-city Acquisition',
    title: 'Multi-city lead efficiency and booking quality',
    summary:
      'A fragmented local services setup was consolidated into a cleaner acquisition system with stronger routing and lower lead waste.',
    before:
      'The account had overlapping campaigns across cities, uneven call handling, and rising CPL. Several locations were competing against each other while booked jobs stayed inconsistent.',
    after:
      'We rebuilt the structure by city cluster, cleaned up match types, improved negative keyword control, aligned ad copy with service intent, and connected routing logic to actual booking capacity.',
    tools: [
      'Shared negative keyword architecture',
      'City-level landing-page template system',
      'Local SEO internal-linking framework',
      'Call quality scoring integrations',
      'Meta local awareness and lead ads',
      'Automated budget reallocation scripts',
    ],
    impact:
      'The new structure reduced overlap, improved lead quality, and turned more inbound calls into booked jobs without increasing overall budget pressure. Booked jobs per month grew from 41 to 96, CPL dropped from $63 to $34, and call-to-booking rate improved from 17% to 31%.',
    metrics: [
      { label: 'Booked Jobs / Month', value: '41 -> 96' },
      { label: 'CPL', value: '$63 -> $34' },
      { label: 'Call-to-Booking', value: '17% -> 31%' },
    ],
  },
];

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

const openServiceModal = (serviceKey) => {
  if (!serviceModal) {
    return;
  }

  const details = serviceDetails[serviceKey];
  if (!details) {
    return;
  }

  if (serviceModalKicker) {
    serviceModalKicker.textContent = details.kicker;
  }
  if (serviceModalTitle) {
    serviceModalTitle.textContent = details.title;
  }
  if (serviceModalWhat) {
    serviceModalWhat.textContent = details.what;
  }
  if (serviceModalHow) {
    serviceModalHow.textContent = details.how;
  }
  if (serviceModalFit) {
    serviceModalFit.textContent = details.fit;
  }

  serviceModal.classList.remove('hidden');
  serviceModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

const closeServiceModal = () => {
  if (!serviceModal) {
    return;
  }

  serviceModal.classList.add('hidden');
  serviceModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

const openCaseModal = (caseItem) => {
  if (!caseModal || !caseItem) {
    return;
  }

  if (caseModalKicker) {
    caseModalKicker.textContent = `${caseItem.niche} | ${caseItem.dateLabel}`;
  }
  if (caseModalTitle) {
    caseModalTitle.textContent = `${caseItem.client}: ${caseItem.title}`;
  }
  if (caseModalBefore) {
    caseModalBefore.textContent = caseItem.before;
  }
  if (caseModalAfter) {
    caseModalAfter.textContent = caseItem.after;
  }
  if (caseModalImpact) {
    caseModalImpact.textContent = caseItem.impact;
  }

  if (caseModalTools) {
    caseModalTools.innerHTML = '';
    caseItem.tools.forEach((tool) => {
      const li = document.createElement('li');
      li.textContent = tool;
      caseModalTools.appendChild(li);
    });
  }

  caseModal.classList.remove('hidden');
  caseModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

const closeCaseModal = () => {
  if (!caseModal) {
    return;
  }

  caseModal.classList.add('hidden');
  caseModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

const renderCaseMetrics = (metrics) =>
  metrics
    .map(
      (metric) => `
        <div class="case-item-card__metric">
          <small>${metric.label}</small>
          <strong>${metric.value}</strong>
        </div>
      `,
    )
    .join('');

const renderCaseCard = (item) => `
  ${
    item.featured
      ? `
        <div class="case-item-card__media">
          <img src="${item.image}" alt="${item.imageAlt}" loading="lazy" />
        </div>
      `
      : ''
  }
  <div class="case-item-card__body">
    ${
      item.featured
        ? '<span class="case-item-card__badge">1st place</span>'
        : ''
    }
    <div class="card-meta">
      <span>${item.client}</span>
      <span>${item.dateLabel}</span>
    </div>
    <p class="card-type">${item.category}</p>
    <h3 class="card-title">${item.title}</h3>
    <p class="card-desc">${item.summary}</p>
    <div class="case-item-card__metrics">
      ${renderCaseMetrics(item.metrics)}
    </div>
    <button class="case-details-btn" type="button" data-case-id="${item.id}">View details</button>
  </div>
`;

const renderCases = () => {
  if (!casesGrid) {
    return;
  }

  casesGrid.innerHTML = '';

  CASES.forEach((item) => {
    const card = document.createElement('article');
    card.className = item.featured ? 'card case-item-card case-item-card--featured' : 'card case-item-card';
    card.innerHTML = renderCaseCard(item);
    casesGrid.appendChild(card);
  });
};

serviceCards.forEach((card) => {
  card.addEventListener('click', () => {
    const serviceKey = card.getAttribute('data-service') || '';
    openServiceModal(serviceKey);
  });

  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const serviceKey = card.getAttribute('data-service') || '';
      openServiceModal(serviceKey);
    }
  });
});

servicePreviewButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    const card = button.closest('.service-card[data-service]');
    if (!card) {
      return;
    }

    const serviceKey = card.getAttribute('data-service') || '';
    openServiceModal(serviceKey);
  });
});

if (casesGrid) {
  casesGrid.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const detailsButton = target.closest('.case-details-btn');
    if (!(detailsButton instanceof HTMLButtonElement)) {
      return;
    }

    const caseId = detailsButton.getAttribute('data-case-id') || '';
    const caseItem = CASES.find((item) => item.id === caseId);
    openCaseModal(caseItem);
  });
}
renderCases();

if (serviceModal) {
  serviceModal.addEventListener('click', (event) => {
    const target = event.target;

    if (target instanceof HTMLElement && target.hasAttribute('data-close-modal')) {
      closeServiceModal();
    }
  });
}

if (caseModal) {
  caseModal.addEventListener('click', (event) => {
    const target = event.target;

    if (target instanceof HTMLElement && target.hasAttribute('data-close-case-modal')) {
      closeCaseModal();
    }
  });
}

if (serviceModalClose) {
  serviceModalClose.addEventListener('click', closeServiceModal);
}

if (caseModalClose) {
  caseModalClose.addEventListener('click', closeCaseModal);
}

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') {
    return;
  }

  if (caseModal && !caseModal.classList.contains('hidden')) {
    closeCaseModal();
    return;
  }

  if (serviceModal && !serviceModal.classList.contains('hidden')) {
    closeServiceModal();
  }
});

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
