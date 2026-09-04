(() => {
  "use strict";

  const storageKey = "cq-exit-prevention-mobit-shown-v1";
  const isResultPage = Boolean(document.querySelector("#cq-result-page"));
  const isMobileIntent = window.matchMedia("(pointer: coarse)").matches || window.innerWidth <= 768;
  const allowedTrackingKeys = new Set(["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "utm_id", "utm_source_platform", "utm_creative_format", "utm_marketing_tactic", "gclid", "dclid", "wbraid", "gbraid", "fbclid", "msclkid", "yclid", "ttclid", "srsltid"]);
  let overlay = null;
  let lastFocused = null;
  let shown = false;
  let suppressed = false;
  let ready = false;
  let historyGuardArmed = false;

  const offerUrl = (() => {
    const target = new URL("./redirect.html", window.location.href);
    target.searchParams.set("item", "mobit");
    new URLSearchParams(window.location.search).forEach((value, name) => {
      if (allowedTrackingKeys.has(name)) target.searchParams.set(name, value);
    });
    return target.href;
  })();

  const pushEvent = (event, trigger = "") => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event,
      cq_offer: "mobit",
      cq_surface: "exit_banner",
      cq_delivery_variant: "exit_mobit",
      cq_trigger: trigger
    });
  };

  const wasShown = () => {
    try {
      return window.sessionStorage.getItem(storageKey) === "1";
    } catch (_error) {
      return false;
    }
  };

  const rememberShown = () => {
    try {
      window.sessionStorage.setItem(storageKey, "1");
    } catch (_error) {
      // In-memory state still prevents repeated display when storage is unavailable.
    }
  };

  const buildOverlay = () => {
    if (overlay) return overlay;
    const root = document.createElement("div");
    root.id = "cq-exit-prevention";
    root.className = "cq-exit-prevention";
    root.hidden = true;

    const dialog = document.createElement("section");
    dialog.className = "cq-exit-prevention__dialog";
    dialog.tabIndex = -1;
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    dialog.setAttribute("aria-labelledby", "cq-exit-prevention-title");

    const title = document.createElement("h2");
    title.id = "cq-exit-prevention-title";
    title.className = "cq-exit-prevention__sr-only";
    title.textContent = "SMBCモビットのご案内";

    const close = document.createElement("button");
    close.className = "cq-exit-prevention__close";
    close.type = "button";
    close.setAttribute("aria-label", "バナーを閉じる");
    close.textContent = "×";

    const banner = document.createElement("a");
    banner.className = "cq-exit-prevention__banner";
    banner.href = offerUrl;
    banner.target = "_blank";
    banner.rel = "sponsored noopener";
    banner.setAttribute("aria-label", "広告リンクを経由してSMBCモビット公式サイトへ移動します");
    banner.innerHTML = `<picture><source type="image/webp" srcset="./assets/lenders/banner_mobit-300x250.webp?v=20260904-001"><img src="./assets/lenders/banner_mobit-300x250.jpg?v=20260904-001" width="600" height="500" alt="SMBCモビット。スマホ完結。お申込みから最短15分で融資完了。詳細はこちら" decoding="async"></picture>`;

    dialog.append(close, title, banner);
    root.append(dialog);
    document.body.append(root);
    overlay = root;

    const closeOverlay = (reason) => {
      if (root.hidden) return;
      root.hidden = true;
      document.body.classList.remove("cq-exit-prevention-open");
      pushEvent("cq_exit_banner_close", reason);
      if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus({ preventScroll: true });
    };

    close.addEventListener("click", () => closeOverlay("close_button"));
    root.addEventListener("click", (event) => {
      if (event.target === root) closeOverlay("backdrop");
    });
    banner.addEventListener("click", () => {
      suppressed = true;
      pushEvent("cq_exit_banner_click", "image");
    });
    root.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeOverlay("escape");
        return;
      }
      if (event.key !== "Tab") return;
      const controls = [close, banner];
      if (event.shiftKey && document.activeElement === controls[0]) {
        event.preventDefault();
        controls[1].focus();
      } else if (!event.shiftKey && document.activeElement === controls[1]) {
        event.preventDefault();
        controls[0].focus();
      }
    });
    return root;
  };

  const show = (trigger) => {
    if (!ready || shown || suppressed || wasShown()) return;
    shown = true;
    rememberShown();
    lastFocused = document.activeElement;
    const root = buildOverlay();
    root.hidden = false;
    document.body.classList.add("cq-exit-prevention-open");
    root.querySelector(".cq-exit-prevention__close").focus({ preventScroll: true });
    pushEvent("cq_exit_banner_impression", trigger);
  };

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link) return;
    const href = link.getAttribute("href") || "";
    if (/redirect(?:_mobit)?\.(?:html|php)|whatsmyasp\.com|zenvaria\.xyz/i.test(href)) suppressed = true;
  }, true);
  document.addEventListener("submit", () => { suppressed = true; }, true);

  if (!isMobileIntent) {
    window.setTimeout(() => { ready = true; }, 1200);
    document.addEventListener("mouseout", (event) => {
      if (!event.relatedTarget && event.clientY <= 8) show("desktop_exit_intent");
    });
  } else if (!isResultPage && !wasShown()) {
    ready = true;
    history.pushState({ ...(history.state || {}), cqExitGuard: true }, "", window.location.href);
    historyGuardArmed = true;
    window.addEventListener("popstate", () => {
      if (!historyGuardArmed) return;
      historyGuardArmed = false;
      show("mobile_back");
    });
  }
})();
