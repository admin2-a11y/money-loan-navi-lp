(() => {
  if (window.CQConsent) return;

  const storageKey = "cq_analytics_consent";
  const pending = new Set();
  let granted = false;

  try {
    granted = window.localStorage.getItem(storageKey) === "granted";
  } catch (_) {
    granted = false;
  }

  const flush = () => {
    if (!granted) return;
    pending.forEach((callback) => {
      pending.delete(callback);
      try {
        callback();
      } catch (error) {
        window.setTimeout(() => { throw error; }, 0);
      }
    });
  };

  const setConsent = (nextValue) => {
    granted = nextValue === true;
    try {
      if (granted) window.localStorage.setItem(storageKey, "granted");
      else window.localStorage.removeItem(storageKey);
    } catch (_) {
      // Storage can be unavailable in private or restricted browsing contexts.
    }
    if (granted) flush();
  };

  window.CQConsent = {
    hasAnalyticsConsent: () => granted,
    runWhenGranted: (callback) => {
      if (typeof callback !== "function") return;
      if (granted) callback();
      else pending.add(callback);
    },
    grantAnalytics: () => setConsent(true),
    revokeAnalytics: () => setConsent(false)
  };

  window.addEventListener("cq:analytics-consent", (event) => {
    setConsent(Boolean(event.detail && event.detail.granted));
  });

  flush();
})();
