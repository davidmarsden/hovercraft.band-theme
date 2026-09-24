/* Hovercraft.band progressive enhancement — site shell v0.2 */
(() => {
  const ready = () => {
    document.body.classList.add("hc-ready");

    // Replace the legacy theme chrome with the GitHub-managed Hovercraft
    // header/footer while leaving Micro.blog's content rendering intact.
    const legacyHeader = document.querySelector("body > header, .site-header");
    const legacyNav = document.querySelector("body > nav.site-nav, body > nav");
    const legacyFooter = document.querySelector("body > footer, .site-footer");
    const hcHeader = document.querySelector(".hc-header");
    const hcFooter = document.querySelector(".hc-footer");
    if (hcHeader && legacyHeader && legacyHeader !== hcHeader) legacyHeader.hidden = true;
    if (hcHeader && legacyNav && !hcHeader.contains(legacyNav)) legacyNav.hidden = true;
    if (hcFooter && legacyFooter && legacyFooter !== hcFooter) legacyFooter.hidden = true;

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
