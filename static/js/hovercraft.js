(() => {
  const params = new URLSearchParams(window.location.search);
  const storageKey = "hovercraft-release-preview";
  const releaseAt = Date.parse(document.documentElement.dataset.releaseAt || "2026-12-05T00:00:00Z");
  const releaseLive = Number.isFinite(releaseAt) && Date.now() >= releaseAt;
  const releasePath = /^(\/music\/?|\/press\/?|\/lyrics\/[^/]+\/?|\/story\/?|\/archive\/?|\/contact\/?)$/i.test(window.location.pathname);
  const wantsPreview = params.get("preview") === "secret";
  const exitPreview = params.get("preview") === "off";

  try {
    if (wantsPreview) sessionStorage.setItem(storageKey, "1");
    if (exitPreview) sessionStorage.removeItem(storageKey);
  } catch (_) {}

  let preview = wantsPreview;
  try { preview = preview || sessionStorage.getItem(storageKey) === "1"; } catch (_) {}
  const showRelease = releaseLive || preview;

  document.documentElement.classList.toggle("hc-release-visible", showRelease);
  document.documentElement.classList.toggle("hc-previewing", preview && !releaseLive);

  const ready = () => {
    if (preview && !releaseLive) {
      const bar = document.createElement("div");
      bar.className = "hc-preview-bar";
      bar.innerHTML = '<strong>RELEASE PREVIEW</strong><span>Only this browser session can see the 5 December site.</span><a href="?preview=off">Exit preview</a>';
      document.body.prepend(bar);
    }

    if (!showRelease && releasePath) {
      document.querySelectorAll("[data-hc-release-only]").forEach((node) => { node.hidden = true; });
    }
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
        artwork: node.dataset.artwork || "",
        artworkAlt: node.dataset.artworkAlt || ""
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
          discArt.alt = track.artworkAlt || track.title + " track artwork";
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
