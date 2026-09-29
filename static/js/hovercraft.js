/* Hovercraft.band progressive enhancement — site shell v0.3 */
(() => {
  const PREVIEW_PARAM = "preview";
  const PREVIEW_PHRASE = "ron-and-david-december-preview";
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

    if (supplied === PREVIEW_PHRASE) setPreview(true);
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
    document.addEventListener("DOMContentLoaded", ready, { once: true 

  // Continuous album players: one transport walks the canonical album sequence.
  document.querySelectorAll("[data-hc-album-player]").forEach((player) => {
    const audio = player.querySelector("[data-hc-album-audio]");
    const payload = player.querySelector("[data-hc-album-playlist]");
    const label = player.querySelector("[data-hc-now-playing]");
    const toggle = player.querySelector("[data-hc-album-toggle]");
    const prev = player.querySelector("[data-hc-album-prev]");
    const next = player.querySelector("[data-hc-album-next]");
    if (!audio || !payload || !toggle) return;
    let tracks;
    try { tracks = JSON.parse(payload.textContent); } catch (_) { return; }
    if (!Array.isArray(tracks) || !tracks.length) return;
    let index = 0;
    const load = (i, autoplay = false) => {
      index = (i + tracks.length) % tracks.length;
      audio.src = tracks[index].src;
      label.textContent = (index + 1) + " / " + tracks.length + " · " + tracks[index].title;
      if (autoplay) audio.play().catch(() => {});
    };
    load(0);
    toggle.addEventListener("click", () => audio.paused ? audio.play() : audio.pause());
    prev?.addEventListener("click", () => load(index - 1, true));
    next?.addEventListener("click", () => load(index + 1, true));
    audio.addEventListener("ended", () => { if (index < tracks.length - 1) load(index + 1, true); });
    audio.addEventListener("play", () => { toggle.textContent = "Pause"; });
    audio.addEventListener("pause", () => { toggle.textContent = "Play"; });
  });
});
  } else {
    ready();
  }
})();
