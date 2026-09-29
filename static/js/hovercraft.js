/* Hovercraft.band progressive enhancement — site shell v0.3 */
(() => {
  const PREVIEW_PARAM = "preview";
  const PREVIEW_TOKEN = "hc-5dec-7Qm4N8v2Kp9R";
  const PREVIEW_KEY = "hovercraftReleasePreview";

  const releaseIsLive = () =>
    document.documentElement.dataset.hovercraftReleaseLive === "true";

  const previewIsActive = () => {
    try {
      return window.localStorage.getItem(PREVIEW_KEY) === "true";
    } catch (_) {
      return false;
    }
  };

  const setPreview = (enabled) => {
    try {
      if (enabled) window.localStorage.setItem(PREVIEW_KEY, "true");
      else window.localStorage.removeItem(PREVIEW_KEY);
    } catch (_) {
      // localStorage can be unavailable in restrictive/private contexts.
    }
  };

  const consumePreviewToken = () => {
    const url = new URL(window.location.href);
    const supplied = url.searchParams.get(PREVIEW_PARAM);
    if (!supplied) return;

    if (supplied === PREVIEW_TOKEN) setPreview(true);
    url.searchParams.delete(PREVIEW_PARAM);
    window.history.replaceState({}, "", url.pathname + url.search + url.hash);
  };

  const applyReleaseState = () => {
    const preview = previewIsActive() && !releaseIsLive();
    const release = releaseIsLive() || preview;

    document.documentElement.classList.toggle("hc-release-state", release);
    document.documentElement.classList.toggle("hc-release-preview", preview);

    document.querySelectorAll("[data-hc-public]").forEach((el) => {
      el.hidden = release;
    });
    document.querySelectorAll("[data-hc-release]").forEach((el) => {
      el.hidden = !release;
    });

    document.querySelector(".hc-preview-banner")?.remove();
    if (!preview) return;

    const banner = document.createElement("aside");
    banner.className = "hc-preview-banner";
    banner.setAttribute("role", "status");
    banner.innerHTML =
      '<strong>Release preview</strong><span>5 December 2026</span><button type="button">Exit preview</button>';
    banner.querySelector("button").addEventListener("click", () => {
      setPreview(false);
      window.location.reload();
    });
    document.body.prepend(banner);
  };

  const ready = () => {
    consumePreviewToken();
    applyReleaseState();
    document.body.classList.add("hc-ready");

    const legacyHeader = document.querySelector("body > header, .site-header");
    const legacyNav = document.querySelector("body > nav.site-nav, body > nav");
    const legacyFooter = document.querySelector("body > footer, .site-footer");
    const hcHeader = document.querySelector(".hc-header");
    const hcFooter = document.querySelector(".hc-footer");
    if (hcHeader && legacyHeader && legacyHeader !== hcHeader) legacyHeader.hidden = true;
    if (hcHeader && legacyNav && !hcHeader.contains(legacyNav)) legacyNav.hidden = true;
    if (hcFooter && legacyFooter && legacyFooter !== hcFooter) legacyFooter.hidden = true;

    const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
    document.querySelectorAll("nav a[href]").forEach((link) => {
      try {
        const url = new URL(link.href, window.location.origin);
        const path = url.pathname.replace(/\/$/, "") || "/";
        if (url.origin === window.location.origin && path === currentPath) {
          link.setAttribute("aria-current", "page");
        }
      } catch (_) {}
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready, { once: true });
  } else {
    ready();
  }
})();
