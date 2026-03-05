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
const casesYearFilter = document.getElementById('cases-year-filter');
const casesNicheFilter = document.getElementById('cases-niche-filter');
const casesSort = document.getElementById('cases-sort');
const casesCount = document.getElementById('cases-count');
const casesShowMoreButton = document.getElementById('cases-show-more');
const INITIAL_CASES_LIMIT = 8;
const CASES_STEP = 8;
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

const caseBlueprints = [
  {
    niche: 'E-commerce',
    businessType: 'DTC Retail',
    clientBase: 'Ecom Growth Brand',
    titleBase: 'Margin-based performance scaling for catalog products',
    beforeBase:
      'Campaigns were optimized for top-line volume only; broad placements consumed budget while high-margin categories lacked consistent reach.',
    afterBase:
      'Account structure was rebuilt by margin tiers, inventory labels, and high-intent product taxonomy across paid search and social retargeting.',
    tools: [
      'Google Merchant Center feed rules',
      'Performance Max asset-group segmentation',
      'Search term mining and negative keyword governance',
      'Meta Dynamic Product Ads and catalog retargeting',
      'GA4 ecommerce event validation',
      'Server-side conversion tagging',
    ],
  },
  {
    niche: 'B2B SaaS',
    businessType: 'B2B Software',
    clientBase: 'SaaS Pipeline Co',
    titleBase: 'Qualified demo growth with intent-tier campaigns',
    beforeBase:
      'High form volume did not translate into sales-qualified pipeline; generic messaging attracted low-fit traffic and inflated CPL.',
    afterBase:
      'Demand capture was split by intent stage, ad copy aligned to use cases, and qualification signals were pushed into bidding and audience exclusions.',
    tools: [
      'Google Ads Search campaign intent tiers',
      'HubSpot and CRM offline conversion import',
      'Meta lead form audience qualification filters',
      'Landing-page message-match testing',
      'Callrail and form attribution mapping',
      'Revenue-stage bid automation rules',
    ],
  },
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
    niche: 'Home Services',
    businessType: 'Local Services Franchise',
    clientBase: 'Home Service Group',
    titleBase: 'Multi-city lead engine consolidation',
    beforeBase:
      'City campaigns competed against each other, duplicated keyword sets, and produced uneven lead quality across service regions.',
    afterBase:
      'A unified account model with city-level ad groups and service-line SEO pages removed overlap and improved lead routing quality.',
    tools: [
      'Shared negative keyword architecture',
      'City-level landing-page template system',
      'Local SEO internal-linking framework',
      'Call quality scoring integrations',
      'Meta local awareness and lead ads',
      'Automated budget reallocation scripts',
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
];

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const createCase = (index) => {
  const blueprint = caseBlueprints[index % caseBlueprints.length];
  const year = 2021 + (index % 6);
  const month = (index * 5 + 2) % 12;
  const day = ((index * 7) % 27) + 1;
  const growth = 52 + ((index * 11) % 230);
  const cplReduction = 14 + ((index * 5) % 52);
  const roas = (1.9 + ((index * 9) % 41) / 10).toFixed(1);
  const conversionLift = 18 + ((index * 4) % 85);
  const revenueLift = 24 + ((index * 6) % 190);
  const dateValue = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  return {
    id: `case-${index + 1}`,
    client: `${blueprint.clientBase} ${Math.floor(index / caseBlueprints.length) + 1}`,
    niche: blueprint.niche,
    businessType: blueprint.businessType,
    year,
    dateLabel: `${monthNames[month]} ${year}`,
    dateValue,
    title: blueprint.titleBase,
    before: blueprint.beforeBase,
    after: blueprint.afterBase,
    tools: blueprint.tools,
    growth,
    cplReduction,
    roas,
    conversionLift,
    revenueLift,
    result: `+${growth}% qualified leads | -${cplReduction}% CPL | ${roas}x blended ROAS`,
    impact:
      `After implementation, qualified lead volume increased by ${growth}% while CPL dropped by ${cplReduction}%. ` +
      `Conversion rate improved by ${conversionLift}%, and attributable revenue increased by ${revenueLift}% with tighter budget efficiency. ` +
      `The main driver was connecting channel-level optimization to downstream business events instead of optimizing only for top-of-funnel signals.`,
  };
};

const CASES = Array.from({ length: 50 }, (_, index) => createCase(index));

const caseFiltersState = {
  year: 'all',
  niche: 'all',
  sort: 'date_desc',
};

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

const getFilteredCases = () => {
  const filtered = CASES.filter((item) => {
    const byYear = caseFiltersState.year === 'all' || String(item.year) === caseFiltersState.year;
    const byNiche = caseFiltersState.niche === 'all' || item.niche === caseFiltersState.niche;
    return byYear && byNiche;
  });

  filtered.sort((a, b) => {
    if (caseFiltersState.sort === 'date_asc') {
      return a.dateValue.localeCompare(b.dateValue);
    }

    if (caseFiltersState.sort === 'growth_desc') {
      return b.growth - a.growth;
    }

    if (caseFiltersState.sort === 'cpl_desc') {
      return b.cplReduction - a.cplReduction;
    }

    return b.dateValue.localeCompare(a.dateValue);
  });

  return filtered;
};

const renderCases = () => {
  if (!casesGrid) {
    return;
  }

  const filteredCases = getFilteredCases();
  const visibleCases = filteredCases.slice(0, visibleCasesLimit);

  casesGrid.innerHTML = '';

  if (casesCount) {
    casesCount.textContent = `Showing ${visibleCases.length} of ${filteredCases.length} filtered cases`;
  }

  if (casesShowMoreButton) {
    const remaining = filteredCases.length - visibleCases.length;
    if (remaining > 0) {
      casesShowMoreButton.hidden = false;
      casesShowMoreButton.textContent = `Show more (${remaining} left)`;
    } else {
      casesShowMoreButton.hidden = true;
    }
  }

  if (filteredCases.length === 0) {
    const empty = document.createElement('article');
    empty.className = 'card case-item-card';
    empty.innerHTML =
      '<h3 class="card-title">No cases found</h3><p class="card-desc">Try a different year or niche filter.</p>';
    casesGrid.appendChild(empty);
    return;
  }

  visibleCases.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'card case-item-card';

    card.innerHTML = `
      <div class="card-meta">
        <span>${item.client}</span>
        <span>${item.dateLabel}</span>
      </div>
      <p class="card-type">Type: ${item.businessType} | Niche: ${item.niche}</p>
      <h3 class="card-title">${item.title}</h3>
      <p class="card-desc">
        <strong>Before:</strong> ${item.before}<br />
        <strong>After:</strong> ${item.after}
      </p>
      <div class="card-stats">Result: ${item.result}</div>
      <button class="case-details-btn" type="button" data-case-id="${item.id}">View details</button>
    `;

    casesGrid.appendChild(card);
  });
};

const populateCaseFilters = () => {
  if (!casesYearFilter || !casesNicheFilter) {
    return;
  }

  const years = [...new Set(CASES.map((item) => item.year))].sort((a, b) => b - a);
  const niches = [...new Set(CASES.map((item) => item.niche))].sort();

  years.forEach((year) => {
    const option = document.createElement('option');
    option.value = String(year);
    option.textContent = String(year);
    casesYearFilter.appendChild(option);
  });

  niches.forEach((niche) => {
    const option = document.createElement('option');
    option.value = niche;
    option.textContent = niche;
    casesNicheFilter.appendChild(option);
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

if (casesYearFilter) {
  casesYearFilter.addEventListener('change', () => {
    caseFiltersState.year = casesYearFilter.value;
    visibleCasesLimit = INITIAL_CASES_LIMIT;
    renderCases();
  });
}

if (casesNicheFilter) {
  casesNicheFilter.addEventListener('change', () => {
    caseFiltersState.niche = casesNicheFilter.value;
    visibleCasesLimit = INITIAL_CASES_LIMIT;
    renderCases();
  });
}

if (casesSort) {
  casesSort.addEventListener('change', () => {
    caseFiltersState.sort = casesSort.value;
    visibleCasesLimit = INITIAL_CASES_LIMIT;
    renderCases();
  });
}

if (casesShowMoreButton) {
  casesShowMoreButton.addEventListener('click', () => {
    visibleCasesLimit += CASES_STEP;
    renderCases();
  });
}

populateCaseFilters();
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
