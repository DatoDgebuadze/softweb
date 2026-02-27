(() => {
  const create = ({
    translations,
    flags,
    langToggle,
    storageKey = "softon_language",
    defaultLanguage = "en"
  }) => {
    let currentLanguage = localStorage.getItem(storageKey) || defaultLanguage;

    const applyLanguage = (language) => {
      const selectedLanguage = translations[language] ? language : defaultLanguage;
      const nextLanguage = selectedLanguage === "en" ? "ka" : "en";

      document.documentElement.lang = selectedLanguage;

      document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.getAttribute("data-i18n");
        const translatedValue = translations[selectedLanguage][key];
        if (translatedValue) element.textContent = translatedValue;
      });

      document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
        const entries = element.getAttribute("data-i18n-attr").split("|");
        entries.forEach((entry) => {
          const [attribute, key] = entry.split(":");
          const translatedValue = translations[selectedLanguage][key];
          if (attribute && translatedValue) element.setAttribute(attribute, translatedValue);
        });
      });

      if (langToggle) {
        const flagImg = langToggle.querySelector("img");
        if (flagImg && flags[nextLanguage]) {
          flagImg.src = flags[nextLanguage].src;
          flagImg.alt = flags[nextLanguage].alt;
        }
      }

      localStorage.setItem(storageKey, selectedLanguage);
      currentLanguage = selectedLanguage;
    };

    const toggleLanguage = () => {
      const next = currentLanguage === "en" ? "ka" : "en";
      applyLanguage(next);
    };

    return {
      init: () => applyLanguage(currentLanguage),
      applyLanguage,
      toggleLanguage,
      getLanguage: () => currentLanguage
    };
  };

  window.SoftonI18n = { create };
})();
