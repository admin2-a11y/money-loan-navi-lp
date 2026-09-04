(function () {
  'use strict';

  function appendScript(source, done) {
    if (typeof window.CQLoadScriptOnce === 'function') {
      window.CQLoadScriptOnce(source, 1).then(function () {
        if (done) done();
      }).catch(function () {});
      return;
    }
    var script = document.createElement('script');
    script.src = source;
    script.async = true;
    if (done) script.addEventListener('load', done, { once: true });
    document.head.appendChild(script);
  }

  var started = false;
  function loadResultRuntime() {
    if (started) return;
    started = true;
    if (window.CQ_PAGE_CONFIG) {
      appendScript('./js/questionnaire-v2.js?v=20260904-001');
      return;
    }
    appendScript('./js/result-page-config.js?v=20260904-001', function () {
      appendScript('./js/questionnaire-v2.js?v=20260904-001');
    });
  }

  window.addEventListener('cq:full-card-ready', function () {
    if ('requestIdleCallback' in window) window.requestIdleCallback(loadResultRuntime, { timeout: 1500 });
    else window.setTimeout(loadResultRuntime, 0);
  }, { once: true });
  window.setTimeout(function () {
    if (!document.querySelector('.v4-lender-card') && typeof window.CQEnsureFullCard === 'function') {
      window.CQEnsureFullCard().catch(function () {});
    }
  }, 2500);
  window.setTimeout(loadResultRuntime, 5000);
})();
