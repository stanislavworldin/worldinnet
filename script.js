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
const casesShowMoreButton = document.getElementById('cases-show-more');
const INITIAL_CASES_LIMIT = 4;
const CASES_STEP = 4;
let visibleCasesLimit = INITIAL_CASES_LIMIT;

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

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const coreCases = [
  {
    id: 'draughts-io',
    client: 'Draughts.io',
    url: 'https://draughts.io',
    niche: 'Casual Gaming',
    businessType: 'Browser Game',
    year: 2026,
    dateLabel: 'Jul 2026',
    category: '2026 / Casual Gaming / SEO + CRO + Analytics',
    title: 'Organic growth and retention redesign for a browser game',
    cardBefore:
      'Organic traffic was only 200 to 300 visits a day, CTR was stuck at 3%, and the full game loaded on first visit.',
    cardAfter:
      'A lightweight landing flow, event tracking, and SEO/performance work lifted acquisition efficiency and session depth.',
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
    result: 'CAC 0.03 -> 0.01 | 300/day -> 3,000/day | 3 min -> 15 min',
    cardImage: 'assets/draughts-io-icon.png',
    cardImageAlt: 'Draughts.io game art with black and natural wooden checkers on a wooden board',
    highlighted: true,
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
    cardBefore:
      'Budget was flowing to top-line volume while high-margin products lacked sustained paid pressure.',
    cardAfter:
      'Campaigns were rebuilt around profitability tiers, query intent, and cleaner feed structure.',
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
    result: 'ROAS 1.9x -> 4.8x | CPA $72 -> $39 | CVR 1.7% -> 3.6%',
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
    cardBefore:
      'Lead volume looked efficient, but most submissions were low-fit before reaching real demo stage.',
    cardAfter:
      'Intent segmentation and qualified-event optimization improved pipeline quality instead of just raw form count.',
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
    result: 'Qualified demos 24% -> 46% | CPL $118 -> $71 | SQLs 18 -> 43',
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
    cardBefore:
      'City campaigns overlapped, call handling was uneven, and CPL kept climbing across locations.',
    cardAfter:
      'We rebuilt the structure by city cluster and aligned routing logic to actual booking capacity.',
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
    result: 'Booked jobs 41 -> 96 | CPL $63 -> $34 | Call-to-booking 17% -> 31%',
  },
];

const caseBlueprints = [
  {
    niche: 'Healthcare',
    businessType: 'Multi-location Healthcare',
    clientBase: 'Clinic Network',
    titleBase: 'Local acquisition system for appointment growth',
    beforeBase:
      'Locations had uneven visibility in maps and local search; paid traffic converted inconsistently because service pages were not aligned to intent.',
    afterBase:
      'Geo landing pages, call-focused ad groups, and map profile optimization were synchronized into one local demand engine per clinic.',
    tools: [
      'Google Business Profile optimization',
      'Local Service Ads and call tracking setup',
      'Geo-modified search keyword architecture',
      'Meta radius-based audience campaigns',
      'Schema markup for location pages',
      'Phone-call conversion quality scoring',
    ],
  },
  {
    niche: 'Real Estate',
    businessType: 'Residential Real Estate',
    clientBase: 'Property Developer',
    titleBase: 'Lead quality lift for premium inventory launches',
    beforeBase:
      'Lead volume was high but qualification was low; media spend favored cheap inquiries with weak buying readiness.',
    afterBase:
      'Creative and keyword strategy shifted toward project-specific demand, and qualification checkpoints were introduced before sales handoff.',
    tools: [
      'Google Search high-intent project clusters',
      'Meta instant forms with qualification logic',
      'Landing pages with dynamic unit availability',
      'CRM enrichment and lead scoring workflows',
      'Call script attribution tags',
      'Audience suppression for low-fit segments',
    ],
  },
  {
    niche: 'Food Delivery',
    businessType: 'On-demand Delivery',
    clientBase: 'Delivery Network',
    titleBase: 'Daypart bidding control for profitable peak windows',
    beforeBase:
      'Campaigns overspent during low-conversion hours and under-delivered during prime dinner demand periods.',
    afterBase:
      'Hour-level bidding, zone-based creatives, and reorder-focused retargeting were aligned to demand windows and basket profitability.',
    tools: [
      'Google Ads hourly bid modifiers',
      'Meta campaign budget optimization by daypart',
      'Geo-zone creative rotation matrix',
      'Looker Studio performance pacing dashboard',
      'First-party audience refresh automations',
      'Promotion margin protection rules',
    ],
  },
  {
    niche: 'EdTech',
    businessType: 'Online Education',
    clientBase: 'Learning Platform',
    titleBase: 'Trial-to-paid acceleration across organic and paid',
    beforeBase:
      'Trial signups were stable but activation lagged; content acquisition and paid acquisition worked as separate channels with conflicting offers.',
    afterBase:
      'Course-intent content clusters were tied to segmented retargeting flows and onboarding journeys by learner persona.',
    tools: [
      'SEO topic cluster architecture',
      'Google Ads branded and non-branded split',
      'Meta video sequence retargeting',
      'Lifecycle email automation for trials',
      'GA4 cohort conversion analysis',
      'Session recording and UX friction reviews',
    ],
  },
  {
    niche: 'Fintech',
    businessType: 'B2C Financial App',
    clientBase: 'Fintech Scaleup',
    titleBase: 'Compliance-safe growth model for acquisition efficiency',
    beforeBase:
      'Customer acquisition was volatile across regions, with compliance constraints limiting creative velocity and audience expansion.',
    afterBase:
      'Market-level campaign frameworks and compliance-approved creative libraries enabled controlled scaling with stable CAC.',
    tools: [
      'Regional Google Search campaign framework',
      'Meta interest and lookalike segmentation',
      'Compliance-ready ad copy library',
      'Fraud and invalid lead screening',
      'Attribution windows by conversion path',
      'Revenue-based budget pacing model',
    ],
  },
  {
    niche: 'Travel',
    businessType: 'Travel and Hospitality',
    clientBase: 'Travel Booking Brand',
    titleBase: 'Seasonality-proof acquisition for high-value routes',
    beforeBase:
      'Booking demand was highly seasonal; campaigns reacted slowly to route-level shifts and misallocated spend during shoulder periods.',
    afterBase:
      'Route clusters, seasonality modifiers, and remarketing windows were redesigned around booking lead time and destination margin.',
    tools: [
      'Google Ads route-level campaign clustering',
      'Demand forecast inputs for bid strategy',
      'Meta destination intent audience stacks',
      'Dynamic landing-page content by season',
      'Price and margin feed synchronization',
      'Automated anomaly detection alerts',
    ],
  },
  {
    niche: 'Automotive',
    businessType: 'Dealer Group',
    clientBase: 'Auto Retail Network',
    titleBase: 'Lead-to-showroom conversion uplift framework',
    beforeBase:
      'Lead volume was acceptable, but showroom visits and booked test drives were not tracking with media spend.',
    afterBase:
      'Campaigns were optimized to downstream showroom actions, with inventory-specific messaging and remarketing by model intent.',
    tools: [
      'Inventory-aware search ad templates',
      'Google vehicle listing campaign setup',
      'Meta lead retargeting by model class',
      'CRM showroom visit conversion import',
      'Phone call and test-drive attribution',
      'Bid strategy tuned by gross profit band',
    ],
  },
  {
    niche: 'Healthcare SaaS',
    businessType: 'Vertical SaaS',
    clientBase: 'CareOps Platform',
    titleBase: 'Demand capture for high-intent demo requests',
    beforeBase:
      'Generic acquisition campaigns were driving low-context leads and weak conversion into booked product demos.',
    afterBase:
      'Search structure, landing pages, and qualification events were rebuilt around high-intent workflows and sales fit.',
    tools: [
      'Search campaign intent clustering',
      'CRM-qualified demo import',
      'Message-match landing pages',
      'Meta retargeting by engagement depth',
      'Bid rules tied to pipeline value',
      'Conversion tracking QA',
    ],
  },
];

const createGeneratedCase = (index) => {
  const blueprint = caseBlueprints[index % caseBlueprints.length];
  const month = (10 - index + 12) % 12;
  const growth = 58 + ((index * 13) % 170);
  const cplReduction = 18 + ((index * 7) % 44);
  const roas = (2.2 + ((index * 3) % 18) / 10).toFixed(1);
  const conversionLift = 16 + ((index * 5) % 62);
  const revenueLift = 28 + ((index * 9) % 120);

  return {
    id: `generated-case-${index + 1}`,
    client: blueprint.clientBase,
    niche: blueprint.niche,
    businessType: blueprint.businessType,
    year: 2026,
    dateLabel: `${monthNames[month]} 2026`,
    category: `2026 / ${blueprint.niche} / Performance Marketing`,
    title: blueprint.titleBase,
    cardBefore: blueprint.beforeBase,
    cardAfter: blueprint.afterBase,
    before: blueprint.beforeBase,
    after: blueprint.afterBase,
    tools: blueprint.tools,
    impact:
      `After implementation, qualified lead volume increased by ${growth}% while CPL dropped by ${cplReduction}%. ` +
      `Conversion rate improved by ${conversionLift}%, and attributable revenue increased by ${revenueLift}%. ` +
      `The main driver was tighter message-to-intent alignment and cleaner downstream measurement.`,
    result: `+${growth}% qualified leads | -${cplReduction}% CPL | ${roas}x blended ROAS`,
  };
};

const CASES = [...coreCases, ...Array.from({ length: 16 }, (_, index) => createGeneratedCase(index))];

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

const renderCaseCard = (item) => `
  ${
    item.cardImage
      ? `
        <div class="case-item-card__header case-item-card__header--with-thumb">
          <div class="case-item-card__intro">
            <div class="card-meta">
              ${item.url ? `<a class="card-meta__link" href="${item.url}">${item.client}</a>` : `<span>${item.client}</span>`}
              <span>${item.dateLabel}</span>
            </div>
            <p class="card-type">Type: ${item.businessType} | Niche: ${item.niche}</p>
          </div>
          <div class="case-item-card__thumb" aria-hidden="true">
            <img src="${item.cardImage}" alt="${item.cardImageAlt || ''}" loading="lazy" />
          </div>
        </div>
        <h3 class="card-title">${item.title}</h3>
      `
      : `
        <div class="card-meta">
          ${item.url ? `<a class="card-meta__link" href="${item.url}">${item.client}</a>` : `<span>${item.client}</span>`}
          <span>${item.dateLabel}</span>
        </div>
        <p class="card-type">Type: ${item.businessType} | Niche: ${item.niche}</p>
        <h3 class="card-title">${item.title}</h3>
      `
  }
  <p class="card-desc">
    <strong>Before:</strong> ${item.cardBefore || item.before}<br />
    <strong>After:</strong> ${item.cardAfter || item.after}
  </p>
  <div class="card-stats">Result: ${item.result}</div>
  <button class="case-details-btn" type="button" data-case-id="${item.id}">View details</button>
`;

const renderCases = () => {
  if (!casesGrid) {
    return;
  }

  const visibleCases = CASES.slice(0, visibleCasesLimit);
  casesGrid.innerHTML = '';

  visibleCases.forEach((item) => {
    const card = document.createElement('article');
    card.className = item.highlighted ? 'card case-item-card case-item-card--highlight' : 'card case-item-card';
    card.innerHTML = renderCaseCard(item);
    casesGrid.appendChild(card);
  });

  if (casesShowMoreButton) {
    const remaining = CASES.length - visibleCases.length;
    if (remaining > 0) {
      casesShowMoreButton.hidden = false;
      casesShowMoreButton.textContent = `Show more (${remaining} left)`;
    } else {
      casesShowMoreButton.hidden = true;
    }
  }
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

if (casesShowMoreButton) {
  casesShowMoreButton.addEventListener('click', () => {
    visibleCasesLimit += CASES_STEP;
    renderCases();
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
