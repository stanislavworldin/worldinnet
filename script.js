const currentYear = document.getElementById('current-year');
const auditForm = document.getElementById('audit-form');
const serviceCards = document.querySelectorAll('.service-card[data-service]');
const serviceModal = document.getElementById('service-modal');
const serviceModalClose = document.getElementById('service-modal-close');
const serviceModalKicker = document.getElementById('service-modal-kicker');
const serviceModalTitle = document.getElementById('service-modal-title');
const serviceModalWhat = document.getElementById('service-modal-what');
const serviceModalHow = document.getElementById('service-modal-how');
const serviceModalFit = document.getElementById('service-modal-fit');

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

if (serviceModal) {
  serviceModal.addEventListener('click', (event) => {
    const target = event.target;

    if (target instanceof HTMLElement && target.hasAttribute('data-close-modal')) {
      closeServiceModal();
    }
  });
}

if (serviceModalClose) {
  serviceModalClose.addEventListener('click', closeServiceModal);
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && serviceModal && !serviceModal.classList.contains('hidden')) {
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
