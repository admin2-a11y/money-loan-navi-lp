(() => {
  'use strict';

  const mount = document.querySelector('[data-recent-lender-card]');
  if (!mount) return;

  const resultParams = new URLSearchParams(window.location.search);
  const resultOfferMap = { sm: 'mobit', pr: 'promise', ac: 'acom', ai: 'aiful' };
  const usedAliases = {
    sm: ['sm', 'mobit', 'smbc_mobit', 'mobit_legacy'],
    pr: ['pr', 'promise'],
    ai: ['ai', 'aiful'],
    ac: ['ac', 'acom']
  };
  const usage = String(resultParams.get('cq_usage') || resultParams.get('param1') || '').trim().toLowerCase();
  const isFirstTime = !['experienced', 'existing', 'no'].includes(usage);
  const hasUsedSignal = resultParams.has('cq_used') || resultParams.has('param2');
  let answerOffer = '';
  if (resultParams.get('force_offer') !== '1' && hasUsedSignal) {
    if (isFirstTime) {
      answerOffer = 'sm';
    } else {
      const used = new Set(String(resultParams.get('cq_used') || resultParams.get('param2') || '').split(',').map(value => value.trim().toLowerCase()).filter(value => value && value !== 'none'));
      const hasAny = aliases => aliases.some(value => used.has(value));
      answerOffer = !hasAny(usedAliases.sm) ? 'sm' : !hasAny(usedAliases.pr) ? 'pr' : !hasAny(usedAliases.ai) ? 'ai' : !hasAny(usedAliases.ac) ? 'ac' : 'sm';
    }
  }
  const requestedOffer = resultOfferMap[resultParams.get('result_offer')] ? resultParams.get('result_offer') : 'sm';
  const selectedOffer = answerOffer || requestedOffer;
  if (answerOffer && resultParams.get('result_offer') !== answerOffer && history.replaceState) {
    const normalizedUrl = new URL(window.location.href);
    normalizedUrl.searchParams.set('result_offer', answerOffer);
    history.replaceState(history.state, document.title, normalizedUrl.toString());
  }

  const selectedKey = resultOfferMap[selectedOffer] || 'mobit';
  const lenders = {
    mobit: { name: 'SMBCモビット', image: 'mobit-diagnosis-recommendation.png', srcset: 'mobit-diagnosis-recommendation-480.webp 480w, ./assets/lenders/mobit-diagnosis-recommendation-768.webp 768w', main: '#007a4d', dark: '#005d3d', soft: '#e5f2ec', line: '#3a936f', text: '#064a35' },
    promise: { name: 'プロミス', image: 'promise-diagnosis-recommendation.png', srcset: 'promise-diagnosis-recommendation-480.webp 480w, ./assets/lenders/promise-diagnosis-recommendation-768.webp 768w', main: '#004098', dark: '#002f73', soft: '#f3f7ff', line: '#b8cbea', text: '#17345f' },
    aiful: { name: 'アイフル', image: 'aiful-diagnosis-recommendation.png', srcset: 'aiful-diagnosis-recommendation-480.webp 480w, ./assets/lenders/aiful-diagnosis-recommendation-768.webp 768w', main: '#d71920', dark: '#971217', soft: '#fff1f1', line: '#eaa6a9', text: '#5b171a' },
    acom: { name: 'アコム', image: 'acom-diagnosis-recommendation.png', srcset: 'acom-diagnosis-recommendation-480.webp 480w, ./assets/lenders/acom-diagnosis-recommendation-768.webp 768w', main: '#e60012', dark: '#a5000d', soft: '#fff3f4', line: '#efb5ba', text: '#5a171c' }
  };
  const lender = lenders[selectedKey];
  const root = document.documentElement;
  root.style.setProperty('--cq-offer', lender.main);
  root.style.setProperty('--cq-offer-dark', lender.dark);
  root.style.setProperty('--cq-offer-soft', lender.soft);
  root.style.setProperty('--cq-offer-line', lender.line);
  root.style.setProperty('--cq-offer-text', lender.text);

  const allowedTrackingKeys = new Set(['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id', 'utm_source_platform', 'utm_creative_format', 'utm_marketing_tactic', 'gclid', 'dclid', 'wbraid', 'gbraid', 'fbclid', 'msclkid', 'yclid', 'ttclid', 'srsltid']);
  const appendTracking = target => {
    new URLSearchParams(window.location.search).forEach((value, name) => {
      if (allowedTrackingKeys.has(name)) target.searchParams.set(name, value);
    });
    return target;
  };
  const ctaHref = selectedKey === 'mobit'
    ? appendTracking(new URL('https://zenvaria.xyz/red/redirect_mobit.php?param5=mobit_04')).href
    : (() => {
        const target = appendTracking(new URL('./redirect.html', window.location.href));
        target.searchParams.set('item', selectedKey);
        return `./redirect.html${target.search}`;
      })();

  mount.innerHTML = `<section class="v4-result-cards" data-v4-result-theme="${selectedKey}" data-v4-critical aria-label="カードローン診断結果">
    <section class="v4-diagnosis-summary" aria-label="あなたの診断結果">
      <figure class="v4-diagnosis-summary__match-banner">
        <picture>
          <source type="image/webp" srcset="./assets/lenders/${lender.srcset}" sizes="(max-width: 600px) calc(100vw - 42px), 448px">
          <img src="./assets/lenders/${lender.image}" width="1448" height="1086" alt="あなたの診断結果。${lender.name}がおすすめ。${lender.name}との相性は非常に高い" decoding="async" fetchpriority="high">
        </picture>
      </figure>
      <div class="v4-diagnosis-summary__hero-action v4-diagnosis-summary__hero-action--compact">
        <div class="v4-diagnosis-summary__compact-cta">
          <div class="v4-diagnosis-summary__compact-cue">
            <svg class="v4-diagnosis-summary__compact-icon" viewBox="0 0 72 72" aria-hidden="true" focusable="false"><rect x="10" y="8" width="36" height="50" rx="5"></rect><path d="M22 8V5h12v3M19 20l3 3 5-6M19 32l3 3 5-6M19 44l3 3 5-6M31 20h8M31 32h8M31 44h5"></path><circle cx="48" cy="47" r="13"></circle><path class="v4-diagnosis-summary__compact-icon-handle" d="m57 57 9 9"></path><path class="v4-diagnosis-summary__compact-icon-spark" d="m58 7 1.6 4.5 4.4 1.6-4.4 1.6-1.6 4.5-1.6-4.5-4.4-1.6 4.4-1.6Z"></path><circle class="v4-diagnosis-summary__compact-icon-spark" cx="66" cy="24" r="1.7"></circle></svg>
            <strong><span>診断結果から</span><span>あなたにおすすめ</span></strong>
          </div>
          <div class="v4-diagnosis-summary__compact-action">
            <a class="v4-diagnosis-summary__compact-link" href="${ctaHref}" target="_blank" rel="sponsored noopener" aria-label="広告リンクを経由して${lender.name}公式サイトへ移動します"><span>${lender.name}を</span><span>チェック <b aria-hidden="true">›</b></span></a>
            <small>公式サイトで詳細を確認</small>
          </div>
        </div>
        <a class="v4-diagnosis-summary__details-jump" href="#v4-diagnosis-details" data-scroll-ignore data-v4-jump-bound="true"><b class="v4-diagnosis-summary__details-rays is-left" aria-hidden="true"><span></span><span></span><span></span></b><span class="v4-diagnosis-summary__details-main"><i aria-hidden="true"></i><strong>診断結果の詳細を見る</strong><i aria-hidden="true"></i></span><small>あなたの回答に基づいた詳細な結果をご確認いただけます</small><b class="v4-diagnosis-summary__details-rays is-right" aria-hidden="true"><span></span><span></span><span></span></b></a>
      </div>
      <div class="v4-diagnosis-summary__match" id="v4-diagnosis-details" data-v4-critical-details>
        <div class="v4-first-view-skeleton" aria-hidden="true">
          <div class="v4-first-view-skeleton__card"><div class="v4-first-view-skeleton__line is-title"></div><div class="v4-first-view-skeleton__line"></div><div class="v4-first-view-skeleton__line is-short"></div></div>
          <div class="v4-first-view-skeleton__card"><div class="v4-first-view-skeleton__line is-title"></div><div class="v4-first-view-skeleton__line"></div><div class="v4-first-view-skeleton__line is-short"></div></div>
          <div class="v4-first-view-skeleton__card"><div class="v4-first-view-skeleton__line is-title"></div><div class="v4-first-view-skeleton__line"></div><div class="v4-first-view-skeleton__line is-short"></div></div>
        </div>
      </div>
    </section>
  </section>`;

  const resultShell = mount.closest('#cq-result-page');
  if (resultShell) {
    resultShell.removeAttribute('data-cq-pending');
    resultShell.setAttribute('data-cq-ready', 'true');
    resultShell.setAttribute('data-cq-result-offer', selectedOffer);
  }

  const detailsJump = mount.querySelector('.v4-diagnosis-summary__details-jump');
  detailsJump.addEventListener('click', event => {
    const target = mount.querySelector(detailsJump.hash);
    if (!target) return;
    event.preventDefault();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    history.pushState(null, '', detailsJump.hash);
  });

  const loadFullCard = () => {
    if (typeof window.CQEnsureFullCard === 'function') {
      window.CQEnsureFullCard().catch(() => {});
    }
  };
  if (document.readyState === 'complete') window.setTimeout(loadFullCard, 0);
  else window.addEventListener('load', () => window.setTimeout(loadFullCard, 0), { once: true });
})();
