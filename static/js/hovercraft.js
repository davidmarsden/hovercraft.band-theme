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
    } catch (_) {}
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
    document.querySelectorAll("[data-hc-public]").forEach((el) => { el.hidden = release; });
    document.querySelectorAll("[data-hc-release]").forEach((el) => { el.hidden = !release; });
    document.querySelector(".hc-preview-banner")?.remove();
    if (!preview) return;
    const banner = document.createElement("aside");
    banner.className = "hc-preview-banner";
    banner.setAttribute("role", "status");
    banner.innerHTML = '<strong>Release preview</strong><span>5 December 2026</span><button type="button">Exit preview</button>';
    banner.querySelector("button").addEventListener("click", () => { setPreview(false); window.location.reload(); });
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
        if (url.origin === window.location.origin && path === currentPath) link.setAttribute("aria-current", "page");
      } catch (_) {}
    });
  };

  const initAlbumPlayers = () => {
    const formatTime = (seconds) => {
      if (!Number.isFinite(seconds)) return "00:00";
      const m = Math.floor(seconds / 60);
      const s = Math.floor(seconds % 60);
      return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
    };

    document.querySelectorAll("[data-hc-deck]").forEach((player) => {
      const audio = player.querySelector("[data-hc-audio]");
      const trackNodes = player.querySelectorAll("[data-hc-track]");
      const label = player.querySelector("[data-hc-now-playing]");
      const time = player.querySelector("[data-hc-time]");
      const toggle = player.querySelector("[data-hc-toggle]");
      const sleeve = player.querySelector("[data-hc-deck-sleeve]");
      const discArt = player.querySelector("[data-hc-disc-art]");
      const prev = player.querySelector("[data-hc-prev]");
      const next = player.querySelector("[data-hc-next]");
      const scrub = player.querySelector("[data-hc-scrub]");
      if (!audio || !label || !toggle || !trackNodes.length) return;

      const tracks = Array.from(trackNodes, (node) => ({
        title: node.dataset.title || "Untitled",
        src: node.dataset.src || "",
        artwork: node.dataset.artwork || ""
      })).filter((track) => track.src);
      if (!tracks.length) return;
      let index = 0;

      const load = (i, autoplay = false) => {
        index = (i + tracks.length) % tracks.length;
        const track = tracks[index];
        audio.src = track.src;
        label.textContent = String(index + 1).padStart(2, "0") + " / " + tracks.length + " · " + track.title;
        if (discArt && track.artwork) {
          discArt.src = track.artwork;
          discArt.alt = track.title + " track artwork";
        }
        if (scrub) scrub.value = 0;
        if (time) time.textContent = "00:00 / 00:00";
        if (autoplay) audio.play().catch(() => {});
      };
      const togglePlayback = () => audio.paused ? audio.play().catch(() => {}) : audio.pause();

      load(0);
      toggle.addEventListener("click", togglePlayback);
      sleeve?.addEventListener("click", togglePlayback);
      prev?.addEventListener("click", () => load(index - 1, true));
      next?.addEventListener("click", () => load(index + 1, true));
      scrub?.addEventListener("input", () => {
        if (Number.isFinite(audio.duration) && audio.duration > 0) audio.currentTime = (Number(scrub.value) / 1000) * audio.duration;
      });
      audio.addEventListener("ended", () => {
        if (index < tracks.length - 1) load(index + 1, true);
        else { audio.pause(); audio.currentTime = 0; }
      });
      audio.addEventListener("timeupdate", () => {
        if (time) time.textContent = formatTime(audio.currentTime) + " / " + formatTime(audio.duration);
        if (scrub && Number.isFinite(audio.duration) && audio.duration > 0) scrub.value = Math.round((audio.currentTime / audio.duration) * 1000);
      });
      const setPlaybackState = (playing) => {
        const action = playing ? "Pause" : "Play";
        toggle.textContent = action.toUpperCase();
        toggle.setAttribute("aria-label", action + " " + tracks[index].title);
        sleeve?.setAttribute("aria-label", action + " " + tracks[index].title);
        player.classList.toggle("is-playing", playing);
      };
      audio.addEventListener("play", () => setPlaybackState(true));
      audio.addEventListener("pause", () => setPlaybackState(false));
    });
  };

  const boot = () => { ready(); initAlbumPlayers(); };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
  else boot();
})();
