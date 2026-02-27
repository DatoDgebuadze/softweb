(() => {
  const init = ({ header, menuToggle, mobileBreakpoint = 960 }) => {
    if (!header || !menuToggle) return { close: () => {} };

    const close = () => {
      header.classList.remove("nav-open");
      menuToggle.setAttribute("aria-expanded", "false");
    };

    menuToggle.addEventListener("click", () => {
      const isOpen = header.classList.toggle("nav-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    document.querySelectorAll("header nav a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= mobileBreakpoint) close();
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > mobileBreakpoint) close();
    });

    return { close };
  };

  window.SoftonMenu = { init };
})();
