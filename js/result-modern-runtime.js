(function () {
  'use strict';

  function ResultUri(value) {
    this.url = new URL(value || window.location.href, document.baseURI);
  }

  ResultUri.prototype.setSearch = function (name, value) {
    this.url.searchParams.set(name, value == null ? '' : String(value));
    return this;
  };

  ResultUri.prototype.addQuery = function (name, value) {
    if (name && typeof name === 'object') {
      Object.keys(name).forEach(function (key) {
        var item = name[key];
        if (Array.isArray(item)) {
          item.forEach(function (entry) { this.url.searchParams.append(key, entry); }, this);
        } else if (item != null) {
          this.url.searchParams.append(key, item);
        }
      }, this);
      return this;
    }
    this.url.searchParams.append(name, value == null ? '' : String(value));
    return this;
  };

  ResultUri.prototype.removeQuery = function (name) {
    this.url.searchParams.delete(name);
    return this;
  };

  ResultUri.prototype.query = function (asObject) {
    if (!asObject) return this.url.search.replace(/^\?/, '');
    var result = {};
    this.url.searchParams.forEach(function (value, key) {
      if (Object.prototype.hasOwnProperty.call(result, key)) {
        result[key] = Array.isArray(result[key]) ? result[key].concat(value) : [result[key], value];
      } else {
        result[key] = value;
      }
    });
    return result;
  };

  ResultUri.prototype.toString = function () {
    return this.url.toString();
  };

  ResultUri.prototype.protocol = function () {
    return this.url.protocol.replace(/:$/, '');
  };

  ResultUri.prototype.path = function () {
    return this.url.pathname;
  };

  function ResultLazyLoad(options) {
    this.options = options || {};
    this.update();
  }

  ResultLazyLoad.prototype.load = function (element) {
    if (!element || element.dataset.resultLazyLoaded === 'true') return;
    element.dataset.resultLazyLoaded = 'true';
    var source = element.getAttribute('data-src');
    var sourceSet = element.getAttribute('data-srcset');
    var sizes = element.getAttribute('data-sizes');
    if (sourceSet) element.setAttribute('srcset', sourceSet);
    if (sizes) element.setAttribute('sizes', sizes);
    if (source) element.setAttribute('src', source);
    var callback = this.options.callback_loaded;
    if (typeof callback === 'function') {
      if (element.complete) callback(element);
      else element.addEventListener('load', function () { callback(element); }, { once: true });
    }
  };

  ResultLazyLoad.prototype.update = function (elements) {
    var selector = this.options.elements_selector || '.lazy';
    var targets = elements ? Array.prototype.slice.call(elements) : Array.prototype.slice.call(document.querySelectorAll(selector));
    var self = this;
    targets.forEach(function (element) {
      if ('loading' in HTMLImageElement.prototype && element.tagName === 'IMG') {
        element.loading = 'lazy';
      }
      self.load(element);
    });
  };

  function ResultSmoothScroll(selector, options) {
    this.selector = selector;
    this.options = options || {};
    document.addEventListener('click', function (event) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
      var link = event.target.closest(selector);
      if (!link || !link.hash || link.origin !== window.location.origin || link.pathname !== window.location.pathname) return;
      var target;
      try { target = document.querySelector(decodeURIComponent(link.hash)); } catch (error) { target = null; }
      if (!target) return;
      event.preventDefault();
      var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
      if (this.options.updateURL !== false && history.pushState) history.pushState(null, '', link.hash);
    }.bind(this));
  }

  var resultScriptLoads = Object.create(null);
  function loadScriptOnce(source, retries) {
    var absoluteSource = new URL(source, document.baseURI).href;
    if (resultScriptLoads[absoluteSource]) return resultScriptLoads[absoluteSource];
    resultScriptLoads[absoluteSource] = new Promise(function (resolve, reject) {
      function attempt(remaining) {
        var script = document.createElement('script');
        script.src = absoluteSource;
        script.async = true;
        script.dataset.cqManagedScript = 'true';
        script.addEventListener('load', function () { resolve(script); }, { once: true });
        script.addEventListener('error', function () {
          script.remove();
          if (remaining > 0) {
            window.setTimeout(function () { attempt(remaining - 1); }, 350);
          } else {
            delete resultScriptLoads[absoluteSource];
            reject(new Error('Failed to load ' + absoluteSource));
          }
        }, { once: true });
        document.head.appendChild(script);
      }
      attempt(typeof retries === 'number' ? retries : 1);
    });
    return resultScriptLoads[absoluteSource];
  }

  function ensureFullCard() {
    if (document.querySelector('.v4-lender-card')) return Promise.resolve();
    return loadScriptOnce('./js/result-page-config.js?v=20260904-001', 1)
      .then(function () { return loadScriptOnce('./js/lender-card.js?v=20260904-009', 1); })
      .then(function () {
        if (window.__cqFullCardReadyDispatched) return;
        window.__cqFullCardReadyDispatched = true;
        window.dispatchEvent(new Event('cq:full-card-ready'));
      });
  }

  window.URI = window.URI || ResultUri;
  window.LazyLoad = window.LazyLoad || ResultLazyLoad;
  window.SmoothScroll = window.SmoothScroll || ResultSmoothScroll;
  window.CQLoadScriptOnce = window.CQLoadScriptOnce || loadScriptOnce;
  window.CQEnsureFullCard = window.CQEnsureFullCard || ensureFullCard;
})();
