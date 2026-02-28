(() => {
  const CONSENT_COOKIE_KEY = "cookie_consent";
  const COOKIE_PREFIX = "cookie_";
  const canUseBrowserCookies =
    window.location.protocol === "http:" || window.location.protocol === "https:";

  const setCookie = (name, value, days = 180) => {
    if (!canUseBrowserCookies) {
      localStorage.setItem(`${COOKIE_PREFIX}${name}`, value);
      return;
    }

    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
      value
    )}; expires=${expires}; path=/; SameSite=Lax`;
  };

  const getCookie = (name) => {
    if (!canUseBrowserCookies) {
      return localStorage.getItem(`${COOKIE_PREFIX}${name}`);
    }

    const key = `${encodeURIComponent(name)}=`;
    const row = document.cookie
      .split("; ")
      .find((item) => item.startsWith(key));
    return row ? decodeURIComponent(row.slice(key.length)) : null;
  };

  const deleteCookie = (name) => {
    if (!canUseBrowserCookies) {
      localStorage.removeItem(`${COOKIE_PREFIX}${name}`);
      return;
    }

    document.cookie = `${encodeURIComponent(
      name
    )}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
  };

  const hasConsent = () => getCookie(CONSENT_COOKIE_KEY) === "accepted";

  const initConsentBanner = ({
    banner,
    acceptButton,
    rejectButton,
    languageStorageKey
  }) => {
    if (!banner) return null;

    const accept = () => {
      setCookie(CONSENT_COOKIE_KEY, "accepted", 365);
      banner.hidden = true;
    };

    const reject = () => {
      setCookie(CONSENT_COOKIE_KEY, "rejected", 365);
      if (languageStorageKey) deleteCookie(languageStorageKey);
      banner.hidden = true;
    };

    window.SoftonCookieConsent = { accept, reject };

    if (!getCookie(CONSENT_COOKIE_KEY)) banner.hidden = false;

    if (acceptButton) acceptButton.addEventListener("click", accept);
    if (rejectButton) rejectButton.addEventListener("click", reject);

    return {};
  };

  window.SoftonCookies = {
    setCookie,
    getCookie,
    deleteCookie,
    hasConsent,
    consentKey: CONSENT_COOKIE_KEY,
    initConsentBanner
  };
})();
