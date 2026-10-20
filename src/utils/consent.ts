type ConsentChoice = 'granted' | 'denied';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const storageKey = 'consent';
const bannerId = 'consent-banner';

// Read the stored decision; localStorage may be blocked, so fail silently
const getStoredConsent = (): ConsentChoice | null => {
  try {
    const value = localStorage.getItem(storageKey);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
};

const storeConsent = (choice: ConsentChoice | null): void => {
  try {
    if (choice === null) {
      localStorage.removeItem(storageKey);
    } else {
      localStorage.setItem(storageKey, choice);
    }
  } catch {
    // Storage unavailable: decision only applies to this page view
  }
};

// Remove Google Analytics cookies (_ga, _ga_<id>) on the current host and parent domain
const deleteAnalyticsCookies = (): void => {
  const hostParts = location.hostname.split('.');
  const domains = [location.hostname, `.${hostParts.slice(-2).join('.')}`];

  document.cookie.split(';').forEach((cookie) => {
    const name = (cookie.split('=')[0] ?? '').trim();
    if (!name.startsWith('_ga')) return;
    domains.forEach((domain) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`;
    });
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  });
};

const applyConsent = (choice: ConsentChoice): void => {
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', { analytics_storage: choice });
  }
  if (choice === 'denied') {
    deleteAnalyticsCookies();
  }
  storeConsent(choice);
};

const removeBanner = (): void => {
  document.getElementById(bannerId)?.remove();
};

const createButton = (label: string, className: string, onClick: () => void): HTMLButtonElement => {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `consent-banner__button ${className}`;
  button.textContent = label;
  button.addEventListener('click', onClick);
  return button;
};

const renderBanner = (): void => {
  if (document.getElementById(bannerId)) return;

  const banner = document.createElement('div');
  banner.id = bannerId;
  banner.className = 'consent-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-labelledby', 'consent-banner-title');
  banner.setAttribute('aria-describedby', 'consent-banner-text');

  const title = document.createElement('h2');
  title.id = 'consent-banner-title';
  title.className = 'consent-banner__title';
  title.textContent = 'Cookies & Statistik';

  const text = document.createElement('p');
  text.id = 'consent-banner-text';
  text.className = 'consent-banner__text';
  text.append(
    'Wir möchten Google Analytics nutzen, um zu verstehen, wie unsere Website genutzt wird. ' +
      'Dabei werden Cookies gesetzt und Daten an Google übertragen. Ohne Ihre Zustimmung findet kein Tracking statt. Mehr dazu in der ',
  );
  const link = document.createElement('a');
  link.href = '/datenschutz.html';
  link.textContent = 'Datenschutzerklärung';
  text.append(link, '.');

  const actions = document.createElement('div');
  actions.className = 'consent-banner__actions';

  const decide = (choice: ConsentChoice) => () => {
    applyConsent(choice);
    removeBanner();
  };

  // Both buttons share the same visual weight on purpose (no dark pattern)
  actions.append(
    createButton('Ablehnen', 'consent-banner__button--decline', decide('denied')),
    createButton('Akzeptieren', 'consent-banner__button--accept', decide('granted')),
  );

  banner.append(title, text, actions);
  document.body.append(banner);
  actions.querySelector('button')?.focus();
};

export const initConsent = (): void => {
  if (getStoredConsent() === null) {
    renderBanner();
  }

  // Footer button lets visitors change their decision at any time
  document.querySelectorAll('[data-consent-settings]').forEach((element) => {
    element.addEventListener('click', () => {
      storeConsent(null);
      renderBanner();
    });
  });
};
