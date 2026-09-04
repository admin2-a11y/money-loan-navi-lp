
﻿(function() {
        'use strict';

        var DEFAULT_CONFIG = {
            schemaVersion: '1.0.0',
            projectKey: 'cashing_questionnaire_page_v2',
            storageKeys: {
                state: 'cashing_q_v2_state',
                result: 'cashing_q_v2_result',
                params: 'cashing_q_v2_params',
                labels: 'cashing_q_v2_labels',
                diagnosisId: 'cashing_q_v2_diagnosis_id'
            },
            recommendableOfferIds: ['sm', 'pr', 'ac', 'ai'],
            questionOfferIds: ['ac', 'pr', 'sm', 'ai', 'others'],
            rankOrder: ['sm', 'pr', 'ac'],
            offerAliases: {
                ac: 'ac',
                acom: 'ac',
                pr: 'pr',
                promise: 'pr',
                sm: 'sm',
                mobit: 'sm',
                mobit_legacy: 'mobit_legacy',
                smbc_mobit: 'smbc_mobit',
                ai: 'ai',
                aiful: 'ai',
                others: 'others',
                other: 'others'
            },
            priorityParams: {
                speed: 'speed',
                approval_anxiety: 'approval',
                privacy: 'privacy',
                cost: 'low-interest'
            },
            paramPriority: {
                speed: 'speed',
                approval: 'approval_anxiety',
                privacy: 'privacy',
                'low-interest': 'cost'
            },
            surfaces: {
                resultHero: {
                    offer: '$resultOffer'
                },
                resultCard: {
                    offer: '$resultOffer'
                },
                resultBanner: {
                    offer: '$resultOffer'
                },
                primaryCta: {
                    offer: '$resultOffer'
                },
                notes: {
                    offer: '$resultOffer'
                },
                conditionBar: {
                    source: '$answers'
                }
            }
        };

        var CONFIG = getPageConfig();
        var STORAGE = CONFIG.storageKeys;
        var RANK_ORDER = CONFIG.rankOrder;
        var RECOMMENDABLE = CONFIG.recommendableOfferIds;
        var COMPANY_ID_MAP = CONFIG.offerAliases;

        var LABELS = {
            usage: {
                first_time: 'はじめて',
                experienced: '利用経験あり'
            },
            amount: {
                '1_10': '1〜10万円',
                '10_30': '10〜30万円',
                '30_50': '30〜50万円',
                over_50: '50万円以上'
            },
            priority: {
                speed: 'とにかく早く借りたい',
                approval_anxiety: '審査の不安を減らしたい',
                privacy: '身近な人にバレたくない',
                cost: '返済をラクにしたい'
            }
        };

        var COMPANY_LABELS = {
            ac: 'アコム',
            ai: 'アイフル',
            pr: 'プロミス',
            sm: 'SMBCモビット',
            mobit_legacy: 'モビット',
            smbc_mobit: 'SMBCモビット',
            others: 'その他・銀行カードローン'
        };

        var QUESTION_META = {
            '1': {
                id: 'usage',
                label: 'カードローンを使うのははじめてですか？'
            },
            '2': {
                id: 'used_companies',
                label: '使ったことがあるカードローンを教えてください'
            },
            '3': {
                id: 'amount',
                label: 'いくら借りたいですか？'
            },
            '4': {
                id: 'priority',
                label: 'カードローン選びで一番重視したいことは？'
            }
        };

        var PRIORITY_PARAM = CONFIG.priorityParams;
        var PARAM_PRIORITY = CONFIG.paramPriority;
        var questionnaireInitialized = false;
        var resultPageInitialized = false;

        var OFFERS = {
            sm: {
                id: 'sm',
                name: 'SMBCモビット',
                company: 'SMBCモビット',
                url: 'https://www.mobit.ne.jp/special/speed/index.html',
                banner: './assets/page/6644707-4f8e9619-a9d1-4da3-997d-9be8d9285612.jpg',
                theme: '#00a650',
                themeDark: '#006d38',
                themeSoft: '#eaf8f0',
                themeLine: '#c9ead7',
                themeText: '#173225',
                fundingTime: '最短15分',
                fundingHtml: '最短15分<span class="note-mark">（※1）</span>',
                interestFree: 'なし',
                interestHtml: 'なし',
                apr: '3.0%〜18.0%',
                limit: '最大800万円',
                repayment: '月2,000円〜',
                ctaLabel: '公式サイトで詳細を見る',
                lead: {
                    speed: 'スマホから手続きを進めやすく、急ぎの申込先を探している方に向いています。',
                    approval_anxiety: '利用経験がある方でも、次の申込先を落ち着いて選びたい時に候補へ入れやすい1社です。',
                    privacy: 'WEB完結のしやすさを重視し、身近な人にバレたくない方が検討しやすい申込先です。',
                    cost: '返済額や金利条件を確認しながら、無理のない申込先を選びたい方に向いています。'
                },
                points: [
                    'WEB完結申込なら電話連絡なし<span class="note-mark">（※2）</span>',
                    '最短15分の審査対応で急な出費にも〇',
                    'Vポイントが貯まる・返済にも使える'
                ],
                notes: [
                    '※1 申込の曜日、時間帯によっては翌日以降の取扱となる場合があります。',
                    '※2 原則電話連絡なし。（WEB完結申込の場合）'
                ]
            },
            pr: {
                id: 'pr',
                name: 'プロミス',
                company: 'プロミス',
                url: 'https://cyber.promise.co.jp/contents/html/LP_BAA_html01_index.html',
                banner: './assets/page/6644706-7b65a89d-f9d3-4a57-961b-a69b9da182e6.jpg',
                theme: '#004098',
                themeDark: '#002f73',
                themeSoft: '#f3f7ff',
                themeLine: '#c9d8f2',
                themeText: '#1f3352',
                fundingTime: '最短3分',
                fundingHtml: '最短3分<span class="note-mark">（※1）</span>',
                interestFree: '初回借入の翌日から30日間',
                interestHtml: '初回借入の翌日から30日間<span class="note-mark">（※2）</span>',
                apr: '2.5%〜18.0%',
                limit: '最大800万円',
                repayment: '月1,000円〜',
                ctaLabel: '公式サイトで詳細を見る',
                lead: {
                    speed: '申込後の待ち時間をできるだけ抑えたい方に向く、スピード重視の候補です。',
                    approval_anxiety: 'はじめてでも利用経験ありでも、条件を確認しながら進めやすい大手の候補です。',
                    privacy: 'スマホで手続きを進めやすく、身近な人にバレたくない方も検討しやすい候補です。',
                    cost: '初回借入の翌日から30日間の無利息期間を活用し、短期返済の負担を抑えたい方に向いています。'
                },
                points: [
                    '最短3分でスピード融資',
                    '初回借入の翌日から30日間の無利息期間あり',
                    '電話による在籍確認・郵送物なし<span class="note-mark">（※3）</span>'
                ],
                notes: [
                    '※1 お申込みの時間帯によって、当日中のご融資ができない場合があります。',
                    '※2 無利息期間30日を適用する場合は、メールアドレス登録とWeb明細利用の登録が必要です。',
                    '※3 原則、お勤め先へ在籍確認の電話はございません。郵送物なしはWeb・アプリでお申込いただき、「郵送書類の受取で本人確認」を選択しない場合に限ります。'
                ]
            },
            ac: {
                id: 'ac',
                name: 'アコム',
                company: 'アコム',
                url: 'https://www.acom.co.jp/',
                banner: './assets/page/6653320-bf08f417-2aa3-411e-82a8-73e652d57562.jpg',
                theme: '#e60012',
                themeDark: '#9f2740',
                themeSoft: '#fff3f4',
                themeLine: '#f2c7cc',
                themeText: '#3d3235',
                fundingTime: '最短20分',
                fundingHtml: '最短20分<span class="note-mark">（※1）</span>',
                interestFree: '契約翌日から30日間',
                interestHtml: '契約翌日から<br>30日間<span class="note-mark">（※2）</span>',
                apr: '2.4%〜17.9%',
                limit: '最大800万円',
                repayment: '月1,000円〜',
                ctaLabel: '詳しくはこちら',
                lead: {
                    speed: '最短20分と大手の安心感を両方確認したい方に向く候補です。',
                    approval_anxiety: '申込前の不安を大手で抑えたい方にとって、条件を確認しやすい候補です。',
                    privacy: 'カードレスやスマホ手続きの条件を確認しながら、身近な人にバレたくない方が検討しやすい候補です。',
                    cost: '契約翌日から30日間の金利0円を確認しながら、利息負担を抑えたい方に向いています。'
                },
                points: [
                    '契約翌日から30日間の金利0円',
                    '最短20分で融資まで進められる可能性がある',
                    'お勤め先へ在籍確認の電話一切なし<span class="note-mark">（※3）</span>'
                ],
                notes: [
                    '※1 お申込時間や審査によりご希望に添えない場合がございます。',
                    '※2 ご契約の翌日から30日間は金利0円です。（アコムでのご契約がはじめてのお客さま）',
                    '※3 電話での在籍確認は一切せずに書面やご申告内容での確認を実施します。',
                    '※4 当日契約は21時まで。',
                    '※ 審査はアコム所定の基準にもとづき、厳正に行われます。'
                ]
            },
            ai: {
                id: 'ai',
                name: 'アイフル',
                company: 'アイフル',
                recommendable: false,
                url: 'https://www.aiful.co.jp/starter/cardloan/',
                fundingTime: '最短9分'
            }
        };

        function getPageConfig() {
            var external = window.CQ_PAGE_CONFIG || {};
            return {
                schemaVersion: external.schemaVersion || DEFAULT_CONFIG.schemaVersion,
                projectKey: external.projectKey || DEFAULT_CONFIG.projectKey,
                storageKeys: Object.assign({}, DEFAULT_CONFIG.storageKeys, external.storageKeys || {}),
                recommendableOfferIds: getStringArray(external.recommendableOfferIds, DEFAULT_CONFIG.recommendableOfferIds),
                questionOfferIds: getStringArray(external.questionOfferIds, DEFAULT_CONFIG.questionOfferIds),
                rankOrder: getStringArray(external.rankOrder, DEFAULT_CONFIG.rankOrder),
                offerAliases: Object.assign({}, DEFAULT_CONFIG.offerAliases, external.offerAliases || {}),
                priorityParams: Object.assign({}, DEFAULT_CONFIG.priorityParams, external.priorityParams || {}),
                paramPriority: Object.assign({}, DEFAULT_CONFIG.paramPriority, external.paramPriority || {}),
                surfaces: Object.assign({}, DEFAULT_CONFIG.surfaces, external.surfaces || {}),
                resultEnhancements: external.resultEnhancements || {}
            };
        }

        function getStringArray(value, fallback) {
            return Array.isArray(value) && value.length ? value.slice() : fallback.slice();
        }

        function $(selector, root) {
            return (root || document).querySelector(selector);
        }

        function $all(selector, root) {
            return Array.prototype.slice.call((root || document).querySelectorAll(selector));
        }

        function getStateFromForm(root) {
            var q1 = $('input[name="cq_q1"]:checked', root);
            var amount = $('input[name="cq_amount"]:checked', root);
            var priority = $('input[name="cq_priority"]:checked', root);
            return {
                usage: q1 ? normalizeUsage(q1.value) : '',
                usedCompanies: normalizeCompanyIds($all('input[name="cq_used"]:checked', root).map(function(input) {
                    return input.value;
                })),
                amount: amount ? amount.value : '',
                priority: priority ? priority.value : ''
            };
        }

        function getStepFlow(state) {
            return state.usage === 'first_time' ? ['1', '3', '4'] : ['1', '2', '3', '4'];
        }

        function hasRequiredSelection(step, state) {
            if (step === '1') return Boolean(state.usage);
            if (step === '2') return state.usedCompanies.length > 0;
            if (step === '3') return Boolean(state.amount);
            if (step === '4') return Boolean(state.priority);
            return false;
        }

        function buildLabels(state) {
            return [
                LABELS.usage[state.usage] || '',
                LABELS.amount[state.amount] || '',
                LABELS.priority[state.priority] || ''
            ].filter(Boolean);
        }

        function calculateRecommendation(state) {
            var used = state.usedCompanies || [];
            var hasMobit = used.indexOf('smbc_mobit') !== -1 || used.indexOf('mobit_legacy') !== -1 || used.indexOf('sm') !== -1;
            var hasPromise = used.indexOf('pr') !== -1;
            var hasAiful = used.indexOf('ai') !== -1;
            var hasAcom = used.indexOf('ac') !== -1;
            var offerId = 'sm';

            // 未利用の会社を sm -> pr -> ai -> ac の順で優先する。4社すべて利用済みの場合だけ sm へ戻し、再検討候補として扱う。
            if (state.usage !== 'first_time' && hasMobit) {
                if (!hasPromise) {
                    offerId = 'pr';
                } else if (!hasAiful) {
                    offerId = 'ai';
                } else if (!hasAcom) {
                    offerId = 'ac';
                }
            }

            return {
                offerId: offerId,
                excludeIds: [],
                rawExcludeIds: [],
                fallback: false
            };
        }

        function buildParams(state, result, diagnosisId) {
            var id = diagnosisId || createDiagnosisId();
            return {
                param1: state.usage === 'first_time' ? 'new' : 'existing',
                param2: state.usedCompanies.length ? state.usedCompanies.join(',') : 'none',
                param3: PRIORITY_PARAM[state.priority] || 'speed',
                result_offer: result.offerId,
                cq_diag_id: id,
                cq_t: id
            };
        }

        function saveDiagnosis(state) {
            var diagnosisId = createDiagnosisId();
            var result = calculateRecommendation(state);
            var params = buildParams(state, result, diagnosisId);
            var labels = buildLabels(state);
            state.diagnosisId = diagnosisId;
            result.diagnosisId = diagnosisId;
            sessionStorage.setItem(STORAGE.state, JSON.stringify(state));
            sessionStorage.setItem(STORAGE.result, JSON.stringify(result));
            sessionStorage.setItem(STORAGE.params, JSON.stringify(params));
            sessionStorage.setItem(STORAGE.labels, JSON.stringify(labels));
            sessionStorage.setItem(STORAGE.diagnosisId, diagnosisId);
            pushEvent('cashing_questionnaire_complete', {
                usage: state.usage,
                amount: state.amount,
                priority: state.priority,
                result_offer: result.offerId,
                fallback: result.fallback,
                cq_diag_id: diagnosisId
            });
            return {
                state: state,
                result: result,
                params: params,
                labels: labels
            };
        }

        function readSavedDiagnosis() {
            var fromUrl = readDiagnosisFromUrl();
            if (fromUrl) {
                persistDiagnosis(fromUrl.state, fromUrl.result, fromUrl.params, fromUrl.labels);
                return fromUrl;
            }

            var state = null;
            var result = null;
            var params = null;
            var labels = null;
            try {
                state = JSON.parse(sessionStorage.getItem(STORAGE.state) || 'null');
            } catch (e) {}
            try {
                result = JSON.parse(sessionStorage.getItem(STORAGE.result) || 'null');
            } catch (e) {}
            try {
                params = JSON.parse(sessionStorage.getItem(STORAGE.params) || 'null');
            } catch (e) {}
            try {
                labels = JSON.parse(sessionStorage.getItem(STORAGE.labels) || 'null');
            } catch (e) {}

            if (!state || !result) {
                state = {
                    usage: 'first_time',
                    usedCompanies: [],
                    amount: '10_30',
                    priority: 'speed'
                };
                result = calculateRecommendation(state);
                params = buildParams(state, result, createDiagnosisId());
                labels = buildLabels(state);
                persistDiagnosis(state, result, params, labels);
                return {
                    state: state,
                    result: result,
                    params: params,
                    labels: labels
                };
            }

            var storedDiagnosisId = getStoredDiagnosisId(state, result, params);
            state.usage = normalizeUsage(state.usage) || 'first_time';
            state.usedCompanies = state.usage === 'experienced' ? normalizeCompanyIds(state.usedCompanies || []) : [];
            state.amount = LABELS.amount[state.amount] ? state.amount : '10_30';
            state.priority = LABELS.priority[state.priority] ? state.priority : 'speed';
            state.diagnosisId = storedDiagnosisId;
            result = calculateRecommendation(state);
            result.diagnosisId = storedDiagnosisId;
            params = buildParams(state, result, storedDiagnosisId);
            labels = buildLabels(state);
            persistDiagnosis(state, result, params, labels);

            return {
                state: state,
                result: result,
                params: params,
                labels: labels
            };
        }

        function readDiagnosisFromUrl() {
            var search = new URLSearchParams(window.location.search);
            var hasDiagnosisParams = search.has('result_offer') || search.has('cq_usage') || search.has('cq_amount') || search.has('cq_priority');
            if (!hasDiagnosisParams) return null;

            var usage = normalizeUsage(search.get('cq_usage') || search.get('param1'));
            var usedRaw = search.get('cq_used') || search.get('param2') || '';
            var usedCompanies = usedRaw && usedRaw !== 'none' ?
                normalizeCompanyIds(usedRaw.split(',')) : [];
            var amount = search.get('cq_amount') || '10_30';
            var priority = search.get('cq_priority') || PARAM_PRIORITY[search.get('param3')] || 'speed';

            var state = {
                usage: usage === 'experienced' ? 'experienced' : 'first_time',
                usedCompanies: usage === 'experienced' ? usedCompanies : [],
                amount: LABELS.amount[amount] ? amount : '10_30',
                priority: LABELS.priority[priority] ? priority : 'speed',
                diagnosisId: search.get('cq_diag_id') || search.get('cq_t') || createDiagnosisId()
            };

            var result = calculateRecommendation(state);
            var hasUsedSignal = search.has('cq_used') || search.has('param2');
            var resultOffer = normalizeCompanyId(search.get('result_offer'));
            var forceOffer = search.get('force_offer') === '1';
            if ((forceOffer || !hasUsedSignal) && RECOMMENDABLE.indexOf(resultOffer) !== -1) result.offerId = resultOffer;
            if (!forceOffer && hasUsedSignal && result.offerId !== resultOffer && window.history && window.history.replaceState) {
                var normalizedUrl = new URL(window.location.href);
                normalizedUrl.searchParams.set('result_offer', result.offerId);
                window.history.replaceState(window.history.state, document.title, normalizedUrl.toString());
            }
            result.diagnosisId = state.diagnosisId;

            var params = buildParams(state, result, state.diagnosisId);
            var labels = buildLabels(state);
            return {
                state: state,
                result: result,
                params: params,
                labels: labels
            };
        }

        function persistDiagnosis(state, result, params, labels) {
            sessionStorage.setItem(STORAGE.state, JSON.stringify(state));
            sessionStorage.setItem(STORAGE.result, JSON.stringify(result));
            sessionStorage.setItem(STORAGE.params, JSON.stringify(params));
            sessionStorage.setItem(STORAGE.labels, JSON.stringify(labels));
            sessionStorage.setItem(STORAGE.diagnosisId, getStoredDiagnosisId(state, result, params));
        }

        function buildRedirectParams(diagnosis) {
            return Object.assign({}, diagnosis.params, {
                cq_usage: diagnosis.state.usage,
                cq_used: diagnosis.state.usedCompanies.length ? diagnosis.state.usedCompanies.join(',') : 'none',
                cq_amount: diagnosis.state.amount,
                cq_priority: diagnosis.state.priority,
                cq_diag_id: diagnosis.params.cq_diag_id,
                cq_t: diagnosis.params.cq_t,
                cq_return_url: window.location.href.split('#')[0]
            });
        }

        function appendParams(url, params) {
            var parsed;
            try {
                parsed = new URL(url, window.location.href);
            } catch (e) {
                return url;
            }

            Object.keys(params || {}).forEach(function(key) {
                parsed.searchParams.set(key, params[key]);
            });

            new URLSearchParams(window.location.search).forEach(function(value, key) {
                if (!parsed.searchParams.has(key)) parsed.searchParams.set(key, value);
            });

            return parsed.toString();
        }

        function clearSavedDiagnosis() {
            Object.keys(STORAGE).forEach(function(key) {
                try {
                    sessionStorage.removeItem(STORAGE[key]);
                } catch (e) {}
            });
        }

        function isQuestionnaireResetRequested() {
            var search = new URLSearchParams(window.location.search);
            var value = search.get('cq_reset');
            return value === '1' || value === 'true';
        }

        function cleanQuestionnaireResetParam() {
            if (!window.history || !window.history.replaceState) return;
            try {
                var url = new URL(window.location.href);
                if (!url.searchParams.has('cq_reset')) return;
                url.searchParams.delete('cq_reset');
                window.history.replaceState(null, document.title, url.toString());
            } catch (e) {}
        }

        function resetQuestionnaireToInitialState(modal) {
            clearSavedDiagnosis();
            if (!modal) return;
            modal.hidden = true;
            document.body.classList.remove('cq-modal-open');
            $all('input[type="radio"], input[type="checkbox"]', modal).forEach(function(input) {
                input.checked = false;
            });
            $all('.cq-option--picked', modal).forEach(function(option) {
                option.classList.remove('cq-option--picked');
            });
            $all('[data-cq-loading]', modal).forEach(function(loading) {
                loading.hidden = true;
                loading.classList.remove('is-active');
            });
            $all('[data-cq-loading-list]', modal).forEach(function(list) {
                list.innerHTML = '';
            });
        }

        function isAllowedQuestionnaireReturnUrl(url) {
            if (!url) return false;
            if (url.protocol === 'file:') return true;
            if (url.protocol !== 'http:' && url.protocol !== 'https:') return false;
            if (window.location.protocol === 'file:') return true;
            return url.origin === window.location.origin;
        }

        function buildQuestionnaireReturnUrl(rawUrl) {
            if (!rawUrl) return '';
            try {
                var url = new URL(rawUrl, window.location.href);
                if (!isAllowedQuestionnaireReturnUrl(url)) return '';
                url.searchParams.set('cq_reset', '1');
                url.hash = '';
                return url.toString();
            } catch (e) {
                return '';
            }
        }

        function getQuestionnaireReturnUrl() {
            var search = new URLSearchParams(window.location.search);
            return buildQuestionnaireReturnUrl(search.get('cq_return_url')) || buildQuestionnaireReturnUrl(document.referrer);
        }

        function initBackToQuestionnaireButton() {
            var href = getQuestionnaireReturnUrl();
            $all('[data-cq-back-to-top]').forEach(function(button) {
                var container = button.closest ? button.closest('.cq-back-to-top') : null;
                if (!href) {
                    if (container) container.hidden = true;
                    else button.hidden = true;
                    return;
                }
                if (container) container.hidden = false;
                button.hidden = false;
                button.href = href;
                button.textContent = 'アンケートに戻る';
                button.setAttribute('aria-label', 'アンケート回答画面に戻る');
                if (button.getAttribute('data-cq-return-bound') === 'true') return;
                button.setAttribute('data-cq-return-bound', 'true');
                button.addEventListener('click', function() {
                    pushEvent('cashing_questionnaire_back_to_questionnaire_click', {
                        destination: button.href || '',
                        has_return_url: href ? 'true' : 'false'
                    });
                });
            });
        }
        function createDiagnosisId() {
            return String(Date.now()) + '-' + Math.random().toString(36).slice(2, 10);
        }

        function getStoredDiagnosisId(state, result, params) {
            return (state && state.diagnosisId) ||
                (result && result.diagnosisId) ||
                (params && (params.cq_diag_id || params.cq_t)) ||
                sessionStorage.getItem(STORAGE.diagnosisId) ||
                createDiagnosisId();
        }

        function normalizeCompanyId(value) {
            var key = String(value || '').trim().toLowerCase();
            return COMPANY_ID_MAP[key] || '';
        }

        function normalizeUsage(value) {
            var key = String(value || '').trim().toLowerCase();
            if (key === 'experienced' || key === 'existing' || key === 'no') return 'experienced';
            if (key === 'first_time' || key === 'first' || key === 'new' || key === 'yes') return 'first_time';
            return '';
        }

        function normalizeCompanyIds(values) {
            var seen = {};
            return (values || []).map(normalizeCompanyId).filter(function(id) {
                if (!id || seen[id]) return false;
                seen[id] = true;
                return true;
            });
        }

        function pushEvent(name, payload) {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push(Object.assign({
                event: name
            }, payload || {}));
        }

        function getStepByInputName(name) {
            if (name === 'cq_q1') return '1';
            if (name === 'cq_used') return '2';
            if (name === 'cq_amount') return '3';
            if (name === 'cq_priority') return '4';
            return '';
        }

        function getAnswerLabel(input) {
            if (!input) return '';
            if (input.name === 'cq_q1') return LABELS.usage[input.value] || input.value;
            if (input.name === 'cq_used') return COMPANY_LABELS[input.value] || input.value;
            if (input.name === 'cq_amount') return LABELS.amount[input.value] || input.value;
            if (input.name === 'cq_priority') return LABELS.priority[input.value] || input.value;
            return input.value || '';
        }

        function getSelectionSnapshot(step, state) {
            var values = [];
            var labels = [];
            if (step === '1' && state.usage) {
                values = [state.usage];
                labels = [LABELS.usage[state.usage] || state.usage];
            } else if (step === '2') {
                values = state.usedCompanies.slice();
                labels = values.map(function(id) {
                    return COMPANY_LABELS[id] || id;
                });
            } else if (step === '3' && state.amount) {
                values = [state.amount];
                labels = [LABELS.amount[state.amount] || state.amount];
            } else if (step === '4' && state.priority) {
                values = [state.priority];
                labels = [LABELS.priority[state.priority] || state.priority];
            }
            return {
                values: values,
                labels: labels,
                count: values.length
            };
        }

        function pushAnswerSelect(input, state) {
            var step = getStepByInputName(input && input.name);
            var meta = QUESTION_META[step];
            if (!meta) return;
            var snapshot = getSelectionSnapshot(step, state);
            pushEvent('cashing_questionnaire_answer_select', {
                page_version: CONFIG.projectKey,
                question_id: meta.id,
                question_label: meta.label,
                step_id: step,
                answer_value: input.value,
                answer_label: getAnswerLabel(input),
                checked: Boolean(input.checked),
                selection_count: snapshot.count,
                selected_values: snapshot.values.join(','),
                selected_labels: snapshot.labels.join(' / ')
            });
        }

        function pushQuestionComplete(step, state) {
            var meta = QUESTION_META[step];
            if (!meta) return;
            var snapshot = getSelectionSnapshot(step, state);
            pushEvent('cashing_questionnaire_question_complete', {
                page_version: CONFIG.projectKey,
                question_id: meta.id,
                question_label: meta.label,
                step_id: step,
                selection_count: snapshot.count,
                selected_values: snapshot.values.join(','),
                selected_labels: snapshot.labels.join(' / '),
                usage: state.usage || '',
                amount: state.amount || '',
                priority: state.priority || ''
            });
        }

        function initQuestionnaire() {
            if (questionnaireInitialized) return true;
            var startButton = $('#cq-start-diagnosis');
            var modal = $('#cq-questionnaire');
            if (!startButton || !modal) return false;
            questionnaireInitialized = true;

            var currentStep = '1';
            var panels = $all('[data-cq-step]', modal);
            var nextButtons = $all('[data-cq-next]', modal);
            var backButtons = $all('[data-cq-back]', modal);
            var progressBar = $('[data-cq-progress-bar]', modal);
            var progressText = $('[data-cq-progress-text]', modal);
            var autoAdvanceTimer = null;

            if (isQuestionnaireResetRequested()) {
                resetQuestionnaireToInitialState(modal);
                currentStep = '1';
                renderStep();
                cleanQuestionnaireResetParam();
            }

            function openModal() {
                modal.hidden = false;
                document.body.classList.add('cq-modal-open');
                currentStep = '1';
                renderStep();
                pushEvent('cashing_questionnaire_start', {});
            }

            function renderStep() {
                var state = getStateFromForm(modal);
                if (state.usage === 'first_time') {
                    $all('input[name="cq_used"]', modal).forEach(function(input) {
                        input.checked = false;
                    });
                    state.usedCompanies = [];
                }
                var flow = getStepFlow(state);
                if (flow.indexOf(currentStep) === -1) currentStep = flow[0];
                var currentIndex = flow.indexOf(currentStep) + 1;

                panels.forEach(function(panel) {
                    var active = panel.getAttribute('data-cq-step') === currentStep;
                    panel.hidden = !active;
                    panel.classList.toggle('is-active', active);
                });
                $all('.cq-option--picked', modal).forEach(function(option) {
                    option.classList.remove('cq-option--picked');
                });

                if (progressBar) progressBar.style.width = String(currentIndex / flow.length * 100) + '%';
                if (progressText) progressText.textContent = currentIndex + '/' + flow.length + '問';

                var requiredOk = hasRequiredSelection(currentStep, state);
                nextButtons.forEach(function(button) {
                    var stepRoot = button.closest('[data-cq-step]');
                    var isCurrent = stepRoot && stepRoot.getAttribute('data-cq-step') === currentStep;
                    if (!isCurrent) return;
                    var isLast = currentIndex === flow.length;
                    button.disabled = !requiredOk;
                    button.textContent = isLast ? '診断結果を見る' : currentStep === '2' ? '選択を完了する' : '次の質問へ';
                    button.classList.toggle('cq-button--primary', isLast);
                });

                backButtons.forEach(function(button) {
                    var stepRoot = button.closest('[data-cq-step]');
                    var isCurrent = stepRoot && stepRoot.getAttribute('data-cq-step') === currentStep;
                    if (!isCurrent) return;
                    button.hidden = currentIndex === 1;
                });
            }

            function goNext() {
                if (autoAdvanceTimer) {
                    window.clearTimeout(autoAdvanceTimer);
                    autoAdvanceTimer = null;
                }
                var state = getStateFromForm(modal);
                var flow = getStepFlow(state);
                var currentIndex = flow.indexOf(currentStep);
                if (!hasRequiredSelection(currentStep, state)) return;
                pushQuestionComplete(currentStep, state);
                if (currentIndex < flow.length - 1) {
                    currentStep = flow[currentIndex + 1];
                    renderStep();
                    return;
                }
                showLoading(state);
            }

            function goBack() {
                var state = getStateFromForm(modal);
                var flow = getStepFlow(state);
                var currentIndex = flow.indexOf(currentStep);
                if (currentIndex > 0) {
                    currentStep = flow[currentIndex - 1];
                    renderStep();
                }
            }

            function showLoading(state) {
                panels.forEach(function(panel) {
                    panel.hidden = true;
                    panel.classList.remove('is-active');
                });

                var loading = $('[data-cq-loading]', modal);
                var list = $('[data-cq-loading-list]', modal);
                if (loading) {
                    loading.hidden = false;
                    loading.classList.add('is-active');
                }
                if (progressBar) progressBar.style.width = '100%';
                if (progressText) progressText.textContent = '診断中';

                var items = state.usage === 'first_time' ? ['回答を確認中', 'おすすめを選定中'] : ['回答を確認中', '利用経験を確認中', 'おすすめを選定中'];

                if (list) {
                    list.innerHTML = items.map(function(text) {
                        return '<li><span></span>' + text + '</li>';
                    }).join('');
                    buildLoadingSchedule(items.length, state.usage === 'first_time' ? 1450 : 1780).forEach(function(time, index) {
                        var item = $all('li', list)[index];
                        window.setTimeout(function() {
                            if (item) item.classList.add('is-done');
                        }, time);
                    });
                }

                var totalLoadingTime = state.usage === 'first_time' ? 1450 : 1780;
                window.setTimeout(function() {
                    var diagnosis = saveDiagnosis(state);
                    var configuredResultUrl = startButton.getAttribute('data-result-url') || window.CQ_RESULT_URL || './result.html';
                    window.location.href = appendParams(configuredResultUrl, buildRedirectParams(diagnosis));
                }, totalLoadingTime);
            }

            function buildLoadingSchedule(count, total) {
                var first = count === 3 ? 360 + Math.floor(Math.random() * 220) : 480 + Math.floor(Math.random() * 180);
                var last = total - 170;
                if (count <= 1) return [last];
                if (count === 2) return [first, last];
                var minSecond = first + 340;
                var maxSecond = last - 300;
                var second = minSecond + Math.floor(Math.random() * Math.max(1, maxSecond - minSecond));
                return [first, second, last];
            }

            function handleInputChange(event) {
                renderStep();
                var input = event.target;
                if (!input || (input.type !== 'radio' && input.type !== 'checkbox')) return;
                var state = getStateFromForm(modal);
                pushAnswerSelect(input, state);
                if (input.type !== 'radio') return;
                if (input.name !== 'cq_q1' && input.name !== 'cq_amount' && input.name !== 'cq_priority') return;

                var label = input.closest('.cq-option');
                if (label) label.classList.add('cq-option--picked');

                if (autoAdvanceTimer) window.clearTimeout(autoAdvanceTimer);
                autoAdvanceTimer = window.setTimeout(function() {
                    goNext();
                }, 240);
            }

            startButton.addEventListener('click', openModal);
            nextButtons.forEach(function(button) {
                button.addEventListener('click', goNext);
            });
            backButtons.forEach(function(button) {
                button.addEventListener('click', goBack);
            });
            $all('input', modal).forEach(function(input) {
                input.addEventListener('change', handleInputChange);
            });
            return true;
        }


        function reportResultEnhancementError(page, name, error) {
            var payload = {
                enhancement: name,
                result_offer: page ? page.getAttribute('data-cq-result-offer') || '' : '',
                error_name: error && error.name ? error.name : 'Error'
            };
            try {
                pushEvent('cashing_questionnaire_result_enhancement_error', payload);
            } catch (eventError) {}
        }

        function runResultEnhancement(page, name, callback) {
            try {
                callback();
            } catch (error) {
                reportResultEnhancementError(page, name, error);
            }
        }

        function initResultEnhancements(page, saved, offer, ctaUrl, priority) {
            var usage = saved && saved.state && saved.state.usage === 'experienced' ? 'experienced' : 'first_time';
            runResultEnhancement(page, 'remove_legacy_experience_guide', function() {
                $all('[data-cq-experience-guide]', page).forEach(function(section) {
                    section.remove();
                });
            });
            runResultEnhancement(page, 'accordion_controls', function() {
                prepareAccordionControls(page);
                initResultAccordions(page);
            });
            runResultEnhancement(page, 'review_module', function() {
                initReviewModule(page, usage, offer, ctaUrl, priority);
            });
        }

        function getResultEnhancements() {
            return CONFIG.resultEnhancements || {};
        }

        function readJsonTextarea(id) {
            var el = document.getElementById ? document.getElementById(id) : null;
            if (!el) return null;
            try {
                return JSON.parse(el.value || el.textContent || '{}');
            } catch (e) {
                return null;
            }
        }

        function getUsageScopedData(name, usage, offerId) {
            var enhancements = getResultEnhancements();
            var data = enhancements[name] || null;
            if (!data && name === 'reviewUsageData') data = readJsonTextarea('cq-review-usage-data-json');
            if (!data && name === 'guideVariants') data = readJsonTextarea('cq-guide-variants-json');
            return data && data[usage] && data[usage][offerId] ? data[usage][offerId] : null;
        }

        function getLegacyReviewData(offerId) {
            var enhancements = getResultEnhancements();
            var data = enhancements.reviewData || readJsonTextarea('cq-review-data-json') || {};
            return data[offerId] || null;
        }

        function renderExperienceGuide(page, usage, offer) {
            if (!page || !offer) return;
            $all('[data-cq-experience-guide]', page).forEach(function(section) {
                section.hidden = true;
                section.classList.remove('cq-experience-transfer--service-sm');
                section.classList.remove('cq-experience-transfer--service-pr');
                section.classList.remove('cq-experience-transfer--service-ac');
            });

            var active = $('[data-cq-experience-guide="' + usage + '"]', page);
            if (!active) return;
            active.hidden = false;
            active.classList.add('cq-experience-transfer--service-' + offer.id);

            var guide = getUsageScopedData('guideVariants', usage, offer.id);
            if (!guide) return;

            var title = $('.reasons__heading-title', active);
            if (title && guide.title) {
                title.innerHTML = escapeHtml(guide.title).replace(/\n/g, '<br>');
            }

            var list = $('.reasons__list', active);
            if (list && Array.isArray(guide.items) && guide.items.length) {
                list.innerHTML = guide.items.map(function(item, index) {
                    var note = item.note ? '<span class="note-mark">' + escapeHtml(item.note) + '</span>' : '';
                    return [
                        '<div class="reasons__item">',
                        '<div class="reasons__question" role="button" tabindex="0" aria-expanded="false">',
                        '<span class="reasons__num">' + (index + 1) + '.</span>',
                        '<span class="reasons__q-text">' + escapeHtml(item.title) + '</span>',
                        '<span class="reasons__toggle">＋</span>',
                        '</div>',
                        '<div class="reasons__answer">',
                        '<div class="reasons__answer-inner"><p>' + escapeHtml(item.text) + note + '</p></div>',
                        '</div>',
                        '</div>'
                    ].join('');
                }).join('');
            }

            if (Array.isArray(guide.notes) && guide.notes.length) {
                var notes = $('.reasons__notes', active);
                if (!notes && list) {
                    notes = document.createElement('div');
                    notes.className = 'reasons__notes';
                    list.insertAdjacentElement('afterend', notes);
                }
                if (notes) {
                    notes.innerHTML = '<p>' + guide.notes.map(escapeHtml).join('<br>') + '</p>';
                }
            }
        }

        function prepareAccordionControls(root) {
            $all('.reasons__question, .faq__question, .faq__group-toggle', root).forEach(function(control) {
                if (!control.hasAttribute('role')) control.setAttribute('role', 'button');
                if (!control.hasAttribute('tabindex')) control.setAttribute('tabindex', '0');
                if (!control.hasAttribute('aria-expanded')) control.setAttribute('aria-expanded', 'false');
            });
        }

        function initResultAccordions(root) {
            if (!root || root.getAttribute('data-cq-accordion-ready') === 'true') return;
            root.setAttribute('data-cq-accordion-ready', 'true');

            function toggleItem(item, selector, active) {
                if (!item) return;
                var nextActive = typeof active === 'boolean' ? active : !item.classList.contains('active');
                item.classList.toggle('active', nextActive);
                var control = selector ? item.querySelector(selector) : null;
                if (control) control.setAttribute('aria-expanded', nextActive ? 'true' : 'false');
                var toggle = item.querySelector('.reasons__toggle, .toggle, .faq__group-icon');
                if (toggle) toggle.textContent = nextActive ? '−' : '＋';
            }

            function handleToggle(target) {
                if (!target || !target.closest) return false;

                var reasonControl = target.closest('.reasons__question');
                if (reasonControl && root.contains(reasonControl)) {
                    toggleItem(reasonControl.closest('.reasons__item'), '.reasons__question');
                    return true;
                }

                var groupControl = target.closest('.faq__group-toggle');
                if (groupControl && root.contains(groupControl)) {
                    var group = groupControl.closest('.faq__group');
                    var section = groupControl.closest('[data-accordion-mode="single"]');
                    if (section && group && !group.classList.contains('active')) {
                        $all('.faq__group.active', section).forEach(function(other) {
                            if (other !== group) toggleItem(other, '.faq__group-toggle', false);
                        });
                    }
                    toggleItem(group, '.faq__group-toggle');
                    return true;
                }

                var faqControl = target.closest('.faq__question');
                if (faqControl && root.contains(faqControl)) {
                    var item = faqControl.closest('.faq__item');
                    var modeRoot = faqControl.closest('[data-accordion-mode="single"]');
                    if (modeRoot && item && !item.classList.contains('active')) {
                        $all('.faq__item.active', modeRoot).forEach(function(other) {
                            if (other !== item) toggleItem(other, '.faq__question', false);
                        });
                    }
                    toggleItem(item, '.faq__question');
                    return true;
                }
                return false;
            }

            root.addEventListener('click', function(event) {
                if (handleToggle(event.target)) event.preventDefault();
            });

            root.addEventListener('keydown', function(event) {
                if (event.key !== 'Enter' && event.key !== ' ') return;
                if (handleToggle(event.target)) event.preventDefault();
            });
        }

        function initReviewModule(page, usage, offer, ctaUrl, priority) {
            var entry = $('[data-review-entry]', page);
            var modal = $('[data-review-modal]', page);
            if (!entry || !modal || !offer) return;

            var payload = getUsageScopedData('reviewUsageData', usage, offer.id) || getLegacyReviewData(offer.id);
            var reviews = payload && Array.isArray(payload.reviews) ? payload.reviews : [];
            if (!reviews.length) {
                entry.hidden = true;
                return;
            }
            entry.hidden = false;

            renderReviewPreview($('[data-review-preview]', entry), payload, reviews[0]);

            var openButton = $('[data-review-open]', entry);
            var title = $('[data-review-title]', modal);
            var list = $('[data-review-list]', modal);
            var cta = $('[data-review-cta]', modal);

            if (title) title.textContent = payload.title || '利用者の声';
            if (list) {
                list.innerHTML = reviews.map(function(review) {
                    return [
                        '<article class="cq-review-item">',
                        '<p class="cq-review-item__user">' + escapeHtml(review.user || '') + '</p>',
                        '<p class="cq-review-item__text">' + escapeHtml(review.text || '') + '</p>',
                        '</article>'
                    ].join('');
                }).join('');
            }
            if (cta) {
                cta.href = ctaUrl || '#';
                cta.textContent = payload.cta || offer.ctaLabel || '公式サイトで詳細を見る';
            }

            function openModal() {
                modal.classList.add('is-show');
                modal.setAttribute('aria-hidden', 'false');
                document.body.classList.add('cq-review-modal-open');
                pushEvent('cashing_questionnaire_review_open', {
                    result_offer: offer.id,
                    priority: priority,
                    usage: usage
                });
            }

            function closeModal() {
                modal.classList.remove('is-show');
                modal.setAttribute('aria-hidden', 'true');
                document.body.classList.remove('cq-review-modal-open');
            }

            if (openButton && openButton.getAttribute('data-cq-review-bound') !== 'true') {
                openButton.setAttribute('data-cq-review-bound', 'true');
                openButton.addEventListener('click', openModal);
            }

            if (modal.getAttribute('data-cq-review-bound') !== 'true') {
                modal.setAttribute('data-cq-review-bound', 'true');
                $all('[data-review-close]', modal).forEach(function(control) {
                    control.addEventListener('click', closeModal);
                });
                modal.addEventListener('keydown', function(event) {
                    if (event.key === 'Escape') closeModal();
                });
            }

            if (cta && cta.getAttribute('data-cq-review-cta-bound') !== 'true') {
                cta.setAttribute('data-cq-review-cta-bound', 'true');
                cta.addEventListener('click', function() {
                    pushEvent('cashing_questionnaire_review_cta_click', {
                        result_offer: offer.id,
                        priority: priority,
                        usage: usage
                    });
                });
            }
        }

        function renderReviewPreview(container, payload, review) {
            if (!container || !review) return;
            var text = String(review.text || '');
            var shortText = text.length > 96 ? text.slice(0, 96) + '...' : text;
            container.innerHTML = [
                '<div class="cq-review-preview__meta">',
                '<span class="cq-review-preview__avatar" aria-hidden="true"></span>',
                '<div>',
                '<p class="cq-review-preview__user">' + escapeHtml(review.user || '') + '</p>',
                '<span class="cq-review-preview__badge">利用者の声</span>',
                '</div>',
                '</div>',
                '<p class="cq-review-preview__headline">' + escapeHtml(payload.title || '利用者の声') + '</p>',
                '<p class="cq-review-preview__text">' + escapeHtml(shortText) + '</p>'
            ].join('');
        }

        function initCountdownTimer(root) {
            var timer = $('#countdown-timer', root);
            if (!timer || timer.getAttribute('data-cq-timer-ready') === 'true') return;
            timer.setAttribute('data-cq-timer-ready', 'true');

            function updateTimer() {
                var now = new Date();
                var end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
                var remaining = Math.max(0, end.getTime() - now.getTime());
                var totalSeconds = Math.floor(remaining / 1000);
                var hours = Math.floor(totalSeconds / 3600);
                var minutes = Math.floor((totalSeconds % 3600) / 60);
                var seconds = totalSeconds % 60;
                timer.textContent = [hours, minutes, seconds].map(function(value) {
                    return String(value).padStart(2, '0');
                }).join(':');
            }

            updateTimer();
            if (window.setInterval) window.setInterval(updateTimer, 1000);
        }


        function initResultPage() {
            if (resultPageInitialized) return true;
            var page = $('#cq-result-page');
            if (!page) return false;
            resultPageInitialized = true;
            page.setAttribute('data-cq-pending', 'true');
            page.removeAttribute('data-cq-ready');

            var saved = readSavedDiagnosis();
            initBackToQuestionnaireButton();
            var offer = OFFERS[saved.result.offerId] || OFFERS.sm;
            var priority = saved.state.priority || 'speed';
            var ctaUrl = appendParams(offer.url || OFFERS.sm.url, saved.params);
            var pointsData = Array.isArray(offer.points) && offer.points.length ? offer.points : OFFERS.sm.points;
            var notesData = Array.isArray(offer.notes) && offer.notes.length ? offer.notes : OFFERS.sm.notes;
            applySurfaceContract(page, offer.id);

            document.documentElement.style.setProperty('--cq-offer', offer.theme);
            document.documentElement.style.setProperty('--cq-offer-dark', offer.themeDark);
            document.documentElement.style.setProperty('--cq-offer-soft', offer.themeSoft || '#eaf8ef');
            document.documentElement.style.setProperty('--cq-offer-line', offer.themeLine || '#cfead8');
            document.documentElement.style.setProperty('--cq-offer-text', offer.themeText || '#173225');

            setText('[data-result-labels]', saved.labels.join(' > '));
            setText('[data-result-company]', offer.name);
            setText('[data-result-catch]', getResultCatch(priority, offer));
            setHtml('[data-result-funding]', offer.fundingHtml || escapeHtml(offer.fundingTime));
            setHtml('[data-result-interest]', offer.interestHtml || escapeHtml(offer.interestFree));
            setText('[data-result-apr]', offer.apr);
            setText('[data-result-limit]', offer.limit);
            setText('[data-result-repayment]', offer.repayment);

            var banner = $('[data-result-banner]');
            if (banner) {
                banner.src = offer.banner || '';
                banner.alt = offer.name + '公式バナー';
            }

            var bannerLink = $('[data-result-banner-link]');
            if (bannerLink) {
                bannerLink.href = ctaUrl;
                bannerLink.setAttribute('data-result-offer', offer.id);
                bannerLink.addEventListener('click', function() {
                    pushEvent('cashing_questionnaire_banner_click', {
                        result_offer: offer.id,
                        priority: priority
                    });
                });
            }

            var points = $('[data-result-points]');
            if (points) {
                points.innerHTML = pointsData.map(function(point) {
                    return '<li>' + allowNoteMarkup(point) + '</li>';
                }).join('');
            }

            var notes = $('[data-result-notes]');
            if (notes) {
                notes.innerHTML = notesData.map(function(note) {
                    return '<li>' + escapeHtml(note) + '</li>';
                }).join('');
            }

            $all('[data-result-cta]').forEach(function(link) {
                link.href = ctaUrl;
                link.textContent = offer.ctaLabel || '公式サイトで詳細を見る';
                link.setAttribute('data-result-offer', offer.id);
                link.addEventListener('click', function() {
                    pushEvent('cashing_questionnaire_cta_click', {
                        result_offer: offer.id,
                        priority: priority
                    });
                });
            });

            initResultEnhancements(page, saved, offer, ctaUrl, priority);

            if (saved.result.fallback) {
                var fallback = $('[data-result-fallback]');
                if (fallback) fallback.hidden = false;
            }
            if ($('[data-recent-lender-card] .v4-result-cards', page)) {
                page.removeAttribute('data-cq-pending');
                page.setAttribute('data-cq-ready', 'true');
            }
            return true;
        }

        function applySurfaceContract(page, offerId) {
            if (page) {
                page.setAttribute('data-cq-project', CONFIG.projectKey);
                page.setAttribute('data-cq-schema-version', CONFIG.schemaVersion);
                page.setAttribute('data-cq-result-offer', offerId);
            }

            markOfferSurface('resultHero', ['.cq-result-hero', '[data-result-company]', '[data-result-catch]'], offerId);
            markOfferSurface('resultCard', ['.cq-result-card'], offerId);
            markOfferSurface('resultBanner', ['[data-result-banner-link]', '[data-result-banner]'], offerId);
            markOfferSurface('primaryCta', ['[data-result-cta]'], offerId);
            markOfferSurface('notes', ['[data-result-notes]'], offerId);
            markAnswerSurface('conditionBar', ['[data-result-labels]']);
        }

        function markOfferSurface(surface, selectors, offerId) {
            if (!CONFIG.surfaces[surface]) return;
            selectors.forEach(function(selector) {
                $all(selector).forEach(function(el) {
                    el.setAttribute('data-cq-surface', surface);
                    el.setAttribute('data-cq-surface-offer', offerId);
                });
            });
        }

        function markAnswerSurface(surface, selectors) {
            if (!CONFIG.surfaces[surface]) return;
            selectors.forEach(function(selector) {
                $all(selector).forEach(function(el) {
                    el.setAttribute('data-cq-surface', surface);
                    el.setAttribute('data-cq-surface-source', 'answers');
                });
            });
        }

        function getResultCatch(priority, offer) {
            if (priority === 'speed') return offer.fundingTime + 'で進めやすい申込先として選定しました';
            if (priority === 'approval_anxiety') return '審査の不安を減らしたい方の候補として選定しました';
            if (priority === 'privacy') return '身近な人にバレたくない方の候補として選定しました';
            if (priority === 'cost') return '利息や返済額を確認したい方の候補として選定しました';
            return 'あなたの回答に合わせて選定しました';
        }

        function setText(selector, text) {
            $all(selector).forEach(function(el) {
                el.textContent = text || '';
            });
        }

        function setHtml(selector, html) {
            $all(selector).forEach(function(el) {
                el.innerHTML = html || '';
            });
        }

        function allowNoteMarkup(value) {
            return escapeHtml(value).replace(/&lt;span class=&quot;note-mark&quot;&gt;(.+?)&lt;\/span&gt;/g, '<span class="note-mark">$1</span>');
        }

        function escapeHtml(value) {
            return String(value)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        }

        function revealResultPageAfterPendingError() {
            var page = $('#cq-result-page');
            if (!page || page.getAttribute('data-cq-ready') === 'true') return;
            var main = $('.cq-result-main', page);
            if (!main) return;
            page.removeAttribute('data-cq-pending');
            page.setAttribute('data-cq-ready', 'true');
        }

        window.addEventListener('error', function(event) {
            var message = String(event && event.message ? event.message : '');
            var stack = event && event.error && event.error.stack ? String(event.error.stack) : '';
            if (!$('#cq-result-page')) return;
            if (message.indexOf('reviews') === -1 && stack.indexOf('initReviewModal') === -1 && stack.indexOf('initResultPage') === -1) return;
            window.setTimeout(revealResultPageAfterPendingError, 0);
            window.setTimeout(revealResultPageAfterPendingError, 100);
        });

        window.setTimeout(function() {
            var page = $('#cq-result-page');
            if (!page || page.getAttribute('data-cq-ready') === 'true') return;
            if (page.getAttribute('data-cq-pending') === 'true' && !$('[data-recent-lender-card] .v4-result-cards', page)) {
                revealResultPageAfterPendingError();
            }
        }, 3000);
        window.CashingQuestionnaireV2 = {
            config: CONFIG,
            storageKeys: STORAGE,
            offers: OFFERS,
            calculateRecommendation: calculateRecommendation,
            normalizeCompanyId: normalizeCompanyId,
            normalizeCompanyIds: normalizeCompanyIds,
            normalizeUsage: normalizeUsage,
            buildLabels: buildLabels,
            buildParams: buildParams
        };

        function boot(attempt) {
            var questionnaireReady = initQuestionnaire();
            var resultReady = initResultPage();
            if (!questionnaireReady && !resultReady && (attempt || 0) < 40) {
                window.setTimeout(function() {
                    boot((attempt || 0) + 1);
                }, 100);
            }
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                boot(0);
            });
        } else {
            boot(0);
        }

        window.addEventListener('pageshow', function(event) {
            if (event.persisted && $('#cq-result-page')) {
                resultPageInitialized = false;
                initResultPage();
                var page = $('#cq-result-page');
                if (page && $('[data-recent-lender-card] .v4-result-cards', page)) {
                    page.removeAttribute('data-cq-pending');
                    page.setAttribute('data-cq-ready', 'true');
                }
            }
        });
    })();
