/* Hovercraft.band progressive enhancement — site shell v0.2 */
(() => {
  const ready = () => {
    document.body.classList.add("hc-ready");

    // Give the current-page navigation item an accessible state when the
    // active theme does not already provide one.
    const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
    document.querySelectorAll("nav a[href]").forEach((link) => {
      try {
        const url = new URL(link.href, window.location.origin);
        const path = url.pathname.replace(/\/$/, "") || "/";
        if (url.origin === window.location.origin && path === currentPath) {
          link.setAttribute("aria-current", "page");
        }
      } catch (_) {
        // Ignore malformed/external hrefs and leave theme markup untouched.
      }
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready, { once: true });
  } else {
    ready();
  }
})();
