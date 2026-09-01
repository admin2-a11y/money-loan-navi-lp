(() => {
  const mount = document.querySelector("[data-recent-lender-card]");
  if (!mount) return;
  const allowedTrackingKeys = new Set(["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "utm_id", "utm_source_platform", "utm_creative_format", "utm_marketing_tactic", "gclid", "dclid", "wbraid", "gbraid", "fbclid", "msclkid", "yclid", "ttclid", "srsltid"]);
  const redirectHref = (key) => {
    const target = new URL("./redirect.html", window.location.href);
    target.searchParams.set("item", key);
    new URLSearchParams(window.location.search).forEach((value, name) => {
      if (allowedTrackingKeys.has(name)) target.searchParams.set(name, value);
    });
    return `./redirect.html${target.search}`;
  };
  const mobitReviewsCtaHref = () => {
    const target = new URL("https://zenvaria.xyz/red/redirect_mobit.php");
    target.searchParams.set("param5", "mobit_04");
    new URLSearchParams(window.location.search).forEach((value, name) => {
      if (allowedTrackingKeys.has(name)) target.searchParams.set(name, value);
    });
    return target.href;
  };
  const reviewsCtaHref = (lender) => lender.key === "mobit" ? mobitReviewsCtaHref() : redirectHref(lender.key);

  const lenders = [
    {
      key: "mobit", name: "SMBCモビット", group: "三井住友カード株式会社", banner: "banner_mobit-300x250.jpg", width: 300, height: 250,
      catch: "10秒簡易審査ですぐ結果がわかる！", cta: "10秒簡易審査を試す",
      specs: [["融資時間", "最短15分"], ["実質年率", "3.0％～18.0％"], ["利用限度額", "最大800万円"], ["事前審査", "10秒簡易審査"], ["利用方法", "振込・コンビニATM"]],
      points: [["お申込みから最短15分で審査完了！", "お申し込みから最短15分で審査するから急な出費にも即対応！"], ["振込は最短3分", "ご契約後、最短3分で口座へ振り込まれる！"], ["原則電話連絡・郵送物なし", "面倒な電話連絡や郵送物はないから誰にもバレなくて安心！"], ["返済でVポイントが貯まる・使える", "返済の利息分でVポイントが貯まるからお得！"]],
      reviewProfile: "職業：派遣<br>年齢：47歳", reviewIncome: "400万円", reviewRating: 5, reviewAmount: "50万未満", reviewTime: "1時間以内", review: "事前に身分証明書を準備して申し込み。審査もスムーズに進みました！すべてスマホで完結できたので、誰にもバレずにすぐ着金。もっと早く利用すれば良かったです！", reviewImage: "review-mobit-v2.png", reviewImageWidth: 172, reviewImageHeight: 185, reviewPosition: "mobit", reviewImageAlt: "口コミ利用者",
      note: "※お申込の曜日、時間帯によっては翌日以降の取扱となる場合があります。※原則電話連絡なし。（WEB完結申込の場合）※口座への入金が完了する日時は金融機関によって異なります。※サービス内容は公式サイトで最新情報をご確認ください。※一例であり、結果を保証するものではありません。"
    },
    {
      key: "acom", name: "アコム", group: "三菱UFJフィナンシャル・グループ", banner: "banner_acom2.jpg", width: 300, height: 250,
      catch: "はじめてなら30日間金利0円", cta: "はじめての方はこちらから申し込む",
      specs: [["融資時間", "最短20分"], ["実質年率", "2.4％～17.9％"], ["利用限度額", "最大800万円"], ["無利息期間", "契約日の翌日から30日間"], ["利用方法", "振込・コンビニATM"]],
      points: [["はじめてなら金利0円期間あり！", "アコムを初めて利用する人は30日間金利0円！"], ["審査結果が最短20分でわかる！", "21時までに申し込めば当日中に口座に振込！土日祝も24時間申込可能。"], ["周りにバレずに借りられる！", "面倒な電話連絡や郵送物はないから誰にもバレなくて安心！"], ["三菱UFJフィナンシャル・グループで安心！", "知名度やグループ会社による安心感があります。"]],
      reviewProfile: "職業：バイト<br>年齢：25歳", reviewIncome: "350万円", reviewRating: 5, reviewAmount: "100万～300万円未満", reviewTime: "1時間以内", review: "金利0円期間に魅力を感じ申し込みました。カードローンは初めてでしたが審査もスムーズでした。スマホで完結できるので電話連絡や郵送物もなく周りにバレずに借入でき本当に助かりました。", reviewImage: "review-acom-v2.png", reviewImageWidth: 213, reviewImageHeight: 196, reviewPosition: "acom", reviewImageAlt: "口コミ利用者",
      note: "※アコムを初めて契約する方が無利息期間の対象です。※お申込時間や審査状況によりご希望に添えない場合があります。※サービス内容は公式サイトで最新情報をご確認ください。※一例であり、結果を保証するものではありません。"
    },
    {
      key: "promise", name: "プロミス", group: "SMBCコンシューマーファイナンス株式会社",
      catch: "Webなら最短3分で融資可能", cta: "1秒パパッと診断を試す",
      specs: [["融資時間", "最短3分"], ["実質年率", "2.5％～18.0％"], ["利用限度額", "最大800万円"], ["無利息期間", "初回借入の翌日から30日間"], ["事前診断", "1秒パパッと診断"]],
      points: [["即日可能！最短3分で審査完了！", "21時までの申込みで即日融資可能！"], ["30日間無利息もありお得に借りれる！", "初回借入の翌日から30日間、条件を満たす方は無利息で利用できます。"], ["1秒パパっと診断", "借り入れ可能かすぐチェックできる！"]],
      reviewProfile: "職業：会社員<br>年齢：33歳", reviewIncome: "300万円", reviewRating: 5, reviewAmount: "50万円未満", reviewTime: "1時間以内", review: "スマホで完結できるので審査から借入までがとにかく早い。誰にもバレずに借りることが出来ました。返済も月1000円からで良いのも助かってます。", reviewImage: "review-promise-v2.png", reviewImageWidth: 194, reviewImageHeight: 190, reviewPosition: "promise", reviewImageAlt: "口コミ利用者",
      note: "※無利息期間の適用にはメールアドレス登録とWeb明細利用の登録が必要です。※お申込時間や審査状況によりご希望に添えない場合があります。※サービス内容は公式サイトで最新情報をご確認ください。※一例であり、結果を保証するものではありません。"
    },
    {
      key: "aiful", name: "アイフル", group: "アイフル株式会社", banner: "banner_aiful-9min.webp", width: 300, height: 250,
      catch: "最短9分※1融資・1秒で事前診断", cta: "1秒診断で借り入れ可能か確認する",
      specs: [["融資時間", "最短9分※1"], ["実質年率", "3.0％～18.0％"], ["利用限度額", "最大800万円"], ["無利息期間", "初めての方なら最大30日間"], ["事前診断", "1秒診断"]],
      points: [["今日借りられる！申込みから融資まで最短9分※1", "Webから24時間365日申し込み可！すぐ振り込みしてもらえる！"], ["無利息で借りられる期間あり！", "はじめてなら最大30日間利息0円。"], ["原則、勤務先への電話連絡なし", "申込みから借入・返済までWebで完結できるので家族や職場にバレない。"], ["1秒診断で借入可能性を確認", "年齢・年収・他社借入金額などから簡易的に確認できます。"]],
      reviewProfile: "職業：会社員<br>年齢：54歳", reviewIncome: "390万円", reviewRating: 5, reviewAmount: "100万～300万円未満", reviewTime: "1時間以内", review: "急な出費があり、初めてカードローンを利用しました。短期間で返済する予定だったため、30日間の無利息サービスを利用できた点に満足しています。", reviewImage: "review-aiful-v2.png", reviewImageWidth: 181, reviewImageHeight: 192, reviewPosition: "aiful", reviewImageAlt: "口コミ利用者",
      note: "※1お申込時間や審査状況によりご希望に添えない場合があります。※サービス内容は公式サイトで最新情報をご確認ください。※一例であり、結果を保証するものではありません。"
    }
  ];

  const resultOfferMap = { sm: "mobit", pr: "promise", ac: "acom", ai: "aiful" };
  const resultParams = new URLSearchParams(window.location.search);
  const selectedKey = resultOfferMap[resultParams.get("result_offer")] || "mobit";
  const isFirstTimeUser = resultParams.get("cq_usage") === "first_time" || resultParams.get("param1") === "new";
  const lendersByKey = new Map(lenders.map((lender) => [lender.key, lender]));
  const rankedLenders = [lendersByKey.get(selectedKey)].filter(Boolean);

  const usedValueByLender = {
    mobit: ["sm", "mobit", "smbc_mobit", "mobit_legacy"],
    promise: ["pr", "promise"],
    acom: ["ac", "acom"],
    aiful: ["ai", "aiful"]
  };
  const usedLenderLabel = {
    ac: "アコム",
    acom: "アコム",
    ai: "アイフル",
    aiful: "アイフル",
    pr: "プロミス",
    promise: "プロミス",
    sm: "SMBCモビット",
    mobit: "SMBCモビット",
    smbc_mobit: "SMBCモビット",
    mobit_legacy: "SMBCモビット",
    others: "その他・銀行カードローン"
  };
  const amountReason = {
    "1_10": "1〜10万円の借入を希望している",
    "10_30": "10〜30万円の借入を希望している",
    "30_50": "30〜50万円の借入を希望している",
    over_50: "50万円以上の借入を希望している"
  };
  const priorityReason = {
    speed: "借入までのスピードを重視している",
    approval_anxiety: "審査への不安を減らしたい",
    privacy: "周囲へのバレにくさを重視している",
    cost: "返済をラクにしたい"
  };
  const priorityTag = {
    speed: "借入までのスピード",
    approval_anxiety: "審査への不安軽減",
    privacy: "周囲へのバレにくさ",
    cost: "返済をラクにしたい"
  };
  const priorityParamAliases = {
    speed: "speed",
    approval: "approval_anxiety",
    privacy: "privacy",
    "low-interest": "cost"
  };
  const selectedUsedValues = () => new Set((resultParams.get("cq_used") || resultParams.get("param2") || "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter((value) => value && value !== "none"));
  const hasUsedLender = (lender, usedValues) => (usedValueByLender[lender.key] || []).some((value) => usedValues.has(value));
  const selectedUsedLenderNames = (usedValues) => {
    const names = [];
    usedValues.forEach((value) => {
      const name = usedLenderLabel[value];
      if (name && !names.includes(name)) names.push(name);
    });
    return names;
  };
  const selectedPriorityKey = () => resultParams.get("cq_priority") || priorityParamAliases[resultParams.get("param3")];

  // LOCKED COPY: Do not edit these SMBC Mobit diagnosis sentences unless the user
  // explicitly asks to change the locked diagnosis wording.
  const lockedMobitDiagnosisCopy = Object.freeze({
    usage: Object.freeze({
      firstTime: "カードローンがはじめてでSMBCモビットを申し込み･利用したことがないあなた。スマホから借入までWEB完結できるSMBCモビットがおすすめ。",
      experiencedUnused: "まだSMBCモビットを申し込み･利用をしたことがないあなた。他社借入中でもスマホから借入までWEB完結できるSMBCモビットがおすすめ。",
      experiencedUsed: "すでにSMBCモビットを利用したことがあるあなたには、これまでの利用経験を踏まえて再度検討しやすいです。"
    }),
    amount: Object.freeze({
      "1_10": "1～10万円程度の少額借入を希望しているあなたには、少額でも利用を検討しやすいSMBCモビットがおすすめです。",
      "10_30": "10～30万円程度の借入を希望しているあなたには、急な出費などの資金ニーズにも利用を検討しやすいSMBCモビットがおすすめです。",
      "30_50": "30～50万円程度の借入を希望しているあなたには、ある程度まとまった資金が必要な場合にも検討しやすいSMBCモビットがおすすめです。",
      over_50: "50万円以上の借入を希望しているあなたには、借入限度額は最大800万円のSMBCモビットがおすすめです。"
    }),
    priority: Object.freeze({
      speed: "借入までのスピードを重視しているあなたには、スマホからWEBで手続きを進められ、最短15分で審査が完了するSMBCモビットがおすすめ。",
      approval_anxiety: "審査への不安をできるだけ減らしたいあなたには、10秒簡易審査で事前確認できるSMBCモビットがおすすめです。",
      privacy: "原則、電話連絡・郵送物なしのSMBCモビットがおすすめです。",
      cost: "毎月の返済負担を抑えながら返していきたいあなたには、借入残高に応じて月々1,000円から返済できるSMBCモビットがおすすめです。"
    }),
    repaymentNote: "※返済額は最終借入後残高等により異なります。"
  });

  const diagnosisReasons = (lender) => {
    const reasons = [];
    const usedValues = selectedUsedValues();
    if (isFirstTimeUser) {
      reasons.push({ label: "利用経験", text: "カードローンの利用ははじめて", tagText: lender.key === "mobit" ? "利用経験：カードローンの利用ははじめて" : "はじめて" });
      reasons.push({ label: "利用状況", text: lender.key === "mobit" ? "SMBCモビットを申し込み・利用したことがない" : `${lender.name}を利用したことがない`, tagText: lender.key === "mobit" ? "利用状況：SMBCモビットを申し込み・利用したことがない" : `${lender.name}未利用` });
    } else {
      const usedNames = selectedUsedLenderNames(usedValues);
      reasons.push({ label: "利用経験", text: "カードローンの利用経験あり", tagText: "利用経験あり" });
      if (usedNames.length) {
        usedNames.forEach((name) => reasons.push({ label: "利用先", text: `${name}を利用したことがある`, tagText: name }));
      } else {
        reasons.push({ label: "利用状況", text: "カードローンの利用経験あり", tagText: "利用経験あり" });
      }
    }
    const amount = amountReason[resultParams.get("cq_amount")];
    if (amount) reasons.push({ label: "希望金額", text: amount, tagText: amount.replace("の借入を希望している", "") });
    const priorityKey = selectedPriorityKey();
    const priority = priorityReason[priorityKey];
    if (priority) reasons.push({ label: "重視条件", text: priority, tagText: priorityTag[priorityKey] || priority });
    return reasons;
  };
  const diagnosisComments = (lender) => {
    const usedValues = selectedUsedValues();
    const hasUsedSelectedLender = hasUsedLender(lender, usedValues);
    const amountKey = resultParams.get("cq_amount");
    const priorityKey = selectedPriorityKey();
    let usage;
    if (lender.key === "mobit") {
      if (isFirstTimeUser) {
        usage = lockedMobitDiagnosisCopy.usage.firstTime;
      } else if (!hasUsedSelectedLender) {
        usage = lockedMobitDiagnosisCopy.usage.experiencedUnused;
      } else {
        usage = lockedMobitDiagnosisCopy.usage.experiencedUsed;
      }
    } else if (isFirstTimeUser) {
      usage = `<strong>WEB</strong>で進めやすく、初めて借入を検討する方にも${lender.name}は候補になります。`;
    } else if (!hasUsedSelectedLender) {
      usage = `未利用のサービスとして比較に加えやすく、${lender.name}を新しい候補として検討できます。`;
    } else {
      usage = `これまでの利用経験を踏まえ、${lender.name}を再度比較・検討しやすい結果です。`;
    }
    const amountRange = { "1_10": "1～10万円程度の少額借入", "10_30": "10～30万円程度の借入", "30_50": "30～50万円程度の借入", over_50: "50万円以上の借入" };
    const amount = lender.key === "mobit"
      ? lockedMobitDiagnosisCopy.amount[amountKey]
      : amountRange[amountKey] ? `<strong>${amountRange[amountKey]}</strong>の希望額に合わせて、${lender.name}を比較・検討できます。` : "";
    const genericPriorityComments = {
      speed: `<strong>WEB</strong>で手続きを進められ、スピードを重視する方にも${lender.name}は候補になります。`,
      approval_anxiety: `事前診断や申込案内を確認でき、申込み前の不安を減らしたい方にも${lender.name}は候補になります。`,
      privacy: `<strong>WEB</strong>で進められ、周囲に知られにくい形を重視する方にも${lender.name}は候補になります。`,
      cost: `返済計画を確認しながら、毎月の負担を抑えたい方にも${lender.name}は候補になります。`
    };
    return {
      usage,
      amount,
      priority: (lender.key === "mobit" ? lockedMobitDiagnosisCopy.priority : genericPriorityComments)[priorityKey] || "",
      priorityNote: priorityKey === "cost" ? lockedMobitDiagnosisCopy.repaymentNote : ""
    };
  };
  const diagnosisSummaries = (lender) => {
    const usedValues = selectedUsedValues();
    const hasUsedSelectedLender = hasUsedLender(lender, usedValues);
    const amountKey = resultParams.get("cq_amount");
    const priorityKey = selectedPriorityKey();
    return {
      usage: isFirstTimeUser
        ? `はじめてでも<br><strong>WEBで進めやすい！</strong>`
        : hasUsedSelectedLender
          ? `利用経験を活かして<br><strong>再検討しやすい！</strong>`
          : `<strong>新しい候補</strong>として<br>検討しやすい！`,
      amount: ({
        "1_10": `<strong>1〜10万円</strong>の<br>借入希望にマッチ！`,
        "10_30": `<strong>10〜30万円</strong>の<br>借入希望にもマッチ！`,
        "30_50": `<strong>30〜50万円</strong>の<br>借入希望にもマッチ！`,
        over_50: `<strong>50万円以上</strong>も<br>検討候補に！`
      })[amountKey] || `希望する<strong>借入金額</strong>に<br>マッチ！`,
      priority: ({
        speed: `急ぎの借入なら<br><strong>スピード重視</strong>に！`,
        approval_anxiety: `申込み前の<strong>不安</strong>を<br>減らしたいあなたに！`,
        privacy: `<strong>バレにくさ</strong>を<br>重視するあなたに！`,
        cost: `毎月の<strong>返済負担</strong>を<br>抑えたいあなたに！`
      })[priorityKey] || `あなたの<strong>重視条件</strong>に<br>マッチ！`
    };
  };
  const diagnosisLevels = (lender) => {
    const usedValues = selectedUsedValues();
    const hasUsedSelectedLender = hasUsedLender(lender, usedValues);
    const usage = isFirstTimeUser || !hasUsedSelectedLender ? "非常に高い" : "高い";
    const amountKey = resultParams.get("cq_amount");
    const amount = amountKey ? "高い" : null;
    const priorityKey = selectedPriorityKey();
    const priority = priorityKey ? "非常に高い" : null;
    const componentLevels = [usage, amount, priority].filter(Boolean);
    const veryHighCount = componentLevels.filter((level) => level === "非常に高い").length;
    const overall = veryHighCount >= 2 ? "非常に高い" : componentLevels.includes("高い") ? "高い" : "良好";
    return { overall, usage, amount, priority };
  };
  const diagnosisSummaryMarkup = (lender) => {
    const reasons = diagnosisReasons(lender);
    const comments = diagnosisComments(lender);
    const summaries = diagnosisSummaries(lender);
    const levels = diagnosisLevels(lender);
    const answerMarkup = (labels) => {
      const answers = reasons.filter((reason) => labels.includes(reason.label));
      if (!answers.length) return "";
      return `<div class="v4-diagnosis-summary__match-answer"><span class="v4-diagnosis-summary__answer-label">あなたの回答</span><div class="v4-diagnosis-summary__answer-tags">${answers.map((answer) => `<span>${answer.tagText || answer.text}</span>`).join("")}</div></div>`;
    };
    const dimensions = [
      { kind: "usage", title: "利用状況との相性", category: "利用タイプ", level: levels.usage, labels: ["利用経験", "利用状況", "利用先"], summary: summaries.usage, comment: comments.usage }
    ];
    if (levels.amount !== null) dimensions.push({ kind: "amount", title: "希望金額との相性", category: "希望金額", level: levels.amount, labels: ["希望金額"], summary: summaries.amount, comment: comments.amount });
    if (levels.priority !== null) dimensions.push({ kind: "priority", title: "重視条件との相性", category: "重視条件", level: levels.priority, labels: ["重視条件"], summary: summaries.priority, comment: comments.priority, commentNote: comments.priorityNote });
    const matchLevel = levels.overall;
    const matchLevelClass = matchLevel === "非常に高い" ? " is-very-high" : "";
    const matchLevelIcon = matchLevel === "非常に高い" ? '<span class="v4-diagnosis-summary__match-flame" aria-hidden="true">🔥</span>' : "";
    const matchBannerMarkup = lender.key === "mobit"
      ? `<figure class="v4-diagnosis-summary__match-banner">
          <picture>
            <source type="image/webp" srcset="./assets/lenders/mobit-diagnosis-recommendation-480.webp 480w, ./assets/lenders/mobit-diagnosis-recommendation-768.webp 768w" sizes="(max-width: 600px) calc(100vw - 42px), 448px">
            <img src="./assets/lenders/mobit-diagnosis-recommendation.png" width="1448" height="1086" alt="あなたの診断結果。SMBCモビットがおすすめ。SMBCモビットとの相性は非常に高い" decoding="async" fetchpriority="high">
          </picture>
        </figure>`
      : `<div class="v4-diagnosis-summary__unified-hero" role="img" aria-label="あなたの診断結果。${lender.name}がおすすめ。${lender.name}との相性は${matchLevel}">
          <span>あなたの診断結果</span>
          <strong><b>${lender.name}</b>がおすすめ！</strong>
          <p><small>${lender.name}との相性</small><em class="${matchLevelClass.trim()}">${matchLevelIcon}${matchLevel}</em></p>
        </div>`;
    const dimensionIconMarkup = (kind) => {
      const generatedIllustrations = lender.key === "mobit" ? {
        ...(isFirstTimeUser ? { usage: "diagnosis-illustration-q1-v1.png" } : {}),
        amount: "diagnosis-illustration-q2-v1.png",
        ...(selectedPriorityKey() === "privacy" ? { priority: "diagnosis-illustration-q3-privacy-v1.png" } : {})
      } : {};
      if (generatedIllustrations[kind]) {
        return `<span class="v4-diagnosis-summary__match-visual is-${kind} is-generated" aria-hidden="true"><img src="./assets/lenders/${generatedIllustrations[kind]}" width="320" height="320" alt="" loading="lazy" decoding="async"></span>`;
      }
      const icons = {
        usage: `<svg viewBox="0 0 72 72" role="presentation" focusable="false">
          <circle class="v4-diagnosis-summary__visual-bg" cx="36" cy="36" r="33"></circle>
          <circle class="v4-diagnosis-summary__visual-fill" cx="25" cy="24" r="8"></circle>
          <path d="M18 23c1-6 4.5-9 9-8 4 .8 6 3.7 6.5 7.5M12 58c1.8-12 7.2-18 15-18 5.2 0 9.3 2.7 12 8"></path>
          <path d="M20 42.5 27 50l7-7.5M27 50v9"></path>
          <rect class="v4-diagnosis-summary__visual-fill" x="42" y="17" width="18" height="39" rx="4"></rect>
          <path d="M48 22h6M49 51h4"></path>
          <circle class="v4-diagnosis-summary__visual-badge" cx="52" cy="35" r="8"></circle>
          <path class="v4-diagnosis-summary__visual-accent" d="m48.5 35 2.5 2.5 5-6"></path>
        </svg>`,
        amount: `<svg viewBox="0 0 72 72" role="presentation" focusable="false">
          <circle class="v4-diagnosis-summary__visual-bg" cx="36" cy="36" r="33"></circle>
          <path class="v4-diagnosis-summary__visual-fill" d="M13 22h39a5 5 0 0 1 5 5v25a5 5 0 0 1-5 5H16a5 5 0 0 1-5-5V27a5 5 0 0 1 2-5Z"></path>
          <path class="v4-diagnosis-summary__visual-soft" d="M16 17h34a4 4 0 0 1 4 4v5H16a4 4 0 0 1 0-9Z"></path>
          <path d="M11 33h46M18 47h13"></path>
          <circle class="v4-diagnosis-summary__visual-badge" cx="52" cy="43" r="12"></circle>
          <path class="v4-diagnosis-summary__visual-accent" d="m46 35 6 8 6-8M52 43v8M47 46h10"></path>
          <path d="M19 38h10M19 43h7"></path>
        </svg>`,
        priority: `<svg viewBox="0 0 72 72" role="presentation" focusable="false">
          <circle class="v4-diagnosis-summary__visual-bg" cx="36" cy="36" r="33"></circle>
          <path class="v4-diagnosis-summary__visual-soft" d="M36 10 58 19v16c0 14-8.8 24-22 31-13.2-7-22-17-22-31V19Z"></path>
          <rect class="v4-diagnosis-summary__visual-fill" x="27" y="20" width="18" height="34" rx="4"></rect>
          <path d="M32 25h8M32 48h8"></path>
          <path d="M19 31h8M45 31h8M20 38l6-2M46 36l6 2"></path>
          <circle class="v4-diagnosis-summary__visual-badge" cx="47" cy="42" r="9"></circle>
          <path class="v4-diagnosis-summary__visual-accent" d="m43 42 3 3 6-7"></path>
        </svg>`
      };
      return `<span class="v4-diagnosis-summary__match-visual is-${kind}" aria-hidden="true">${icons[kind] || ""}</span>`;
    };
    const diagnosisCommentMarkup = (comment) => {
      const brandMarkup = lender.key === "mobit"
        ? comment.replaceAll("SMBCモビット", '<span class="v4-diagnosis-summary__brand-name">SMBCモビット</span>')
        : comment;
      return brandMarkup.replaceAll("スマホから", '<span class="v4-diagnosis-summary__nowrap">スマホから</span>');
    };
    const dimensionMarkup = dimensions.map((dimension, index) => `<div class="v4-diagnosis-summary__match-item is-${dimension.kind}">
      <dt><span class="v4-diagnosis-summary__match-eyebrow"><b>Q${index + 1}</b><i>${dimension.category}</i></span></dt>
      <dd class="v4-diagnosis-summary__level${dimension.level === "非常に高い" ? " is-very-high" : ""}" aria-label="${dimension.title}は${dimension.level}"><span aria-hidden="true">◎</span><strong>${dimension.level}</strong></dd>
      ${answerMarkup(dimension.labels)}
      <p class="v4-diagnosis-summary__match-summary"><span class="v4-diagnosis-summary__match-catch">${dimension.summary}</span>${dimensionIconMarkup(dimension.kind)}</p>
      <div class="v4-diagnosis-summary__match-comment"><p>${diagnosisCommentMarkup(dimension.comment)}</p>${dimension.commentNote ? `<small>${dimension.commentNote}</small>` : ""}</div>
    </div>`).join("");
    const diagnosisCtaMarkup = `<div class="v4-diagnosis-summary__hero-action">
      <a class="v4-more-reviews-dialog__cta v4-diagnosis-summary__hero-cta" href="${reviewsCtaHref(lender)}" target="_blank" rel="sponsored noopener">${lender.name}の詳細はこちら</a>
    </div>`;
    return `<section class="v4-diagnosis-summary" aria-label="あなたの診断結果">
      ${matchBannerMarkup}
      ${diagnosisCtaMarkup}
      <div class="v4-diagnosis-summary__match">
        <div class="v4-diagnosis-summary__match-panel">
          <dl>${dimensionMarkup}</dl>
          <p class="v4-diagnosis-summary__score-note">※アンケート回答と当サイトの診断条件をもとにした相性の目安です。</p>
        </div>
      </div>
    </section>`;
  };

  const ringSpecLabels = new Set(["融資時間", "実質年率", "利用限度額", "無利息期間", "事前審査", "事前診断", "利用方法"]);
  const specMarkup = (specs) => specs.map(([label, value]) => {
    const ringClass = ringSpecLabels.has(label) ? " class=\"v4-spec-ring\"" : "";
    return `<div${ringClass}><dt>${label}</dt><dd>${value}</dd></div>`;
  }).join("");
  const isFirstTimeMobit = (lender) => isFirstTimeUser && lender.key === "mobit";
  const reviewTopBannerMarkup = (lender) => {
    if (isFirstTimeMobit(lender)) return `<figure class="v4-first-time-mobit-top-banner">
      <picture>
        <source type="image/webp" srcset="./assets/lenders/mobit-reviews-banner-480.webp 480w, ./assets/lenders/mobit-reviews-banner-768.webp 768w" sizes="(max-width: 600px) calc(100vw - 16px), 488px">
        <img src="./assets/lenders/mobit-reviews-banner-768.png" width="768" height="257" alt="SMBCモビットをはじめて利用された方の口コミ" decoding="async">
      </picture>
    </figure>`;
    return `<div class="v4-review-brand-banner" aria-label="${lender.name}を利用された方の口コミ">
      <strong>${lender.name}</strong><span>を<br>利用された方の口コミ！</span>
    </div>`;
  };
  const firstTimeMobitBannerMarkup = (lender) => {
    if (!isFirstTimeMobit(lender)) return "";
    return `<figure class="v4-first-time-mobit-banner">
      <picture>
        <source type="image/jpeg" srcset="./assets/lenders/mobit-first-points-v2-480.jpg 480w, ./assets/lenders/mobit-first-points-v2-768.jpg 768w" sizes="(max-width: 600px) calc(100vw - 36px), 460px">
        <img src="./assets/lenders/mobit-first-points-v2-768.jpg" width="768" height="846" alt="SMBCモビット3つのおすすめポイント。原則電話連絡・郵送物なし、申込みから最短15分で審査完了、振込は最短3分" loading="lazy" decoding="async">
      </picture>
    </figure>`;
  };
  const recommendationMarkup = (lender) => {
    return firstTimeMobitBannerMarkup(lender);
  };
  const cardLeadMarkup = (lender) => {
    return `<div class="v4-lender-titlebar">
      <h3 class="v4-lender-name"><span class="v4-crown" aria-hidden="true">♛</span> <a href="${redirectHref(lender.key)}" target="_blank" rel="sponsored noopener">${lender.name}</a></h3>
      <p class="v4-lender-rank">診断結果 No.1</p>
    </div>
    <p class="v4-lender-catch">${lender.catch}</p>`;
  };
  const productBannerMarkup = (lender) => {
    if (lender.key === "promise") {
      const speed = lender.specs.find(([label]) => label === "融資時間")?.[1] || lender.catch;
      return `<a class="v4-lender-banner v4-lender-banner--brand" href="${redirectHref(lender.key)}" target="_blank" rel="sponsored noopener" aria-label="${lender.name}公式サイトへ">
        <span class="v4-lender-banner-card__eyebrow">スマホでWEB完結</span>
        <strong>${lender.name}</strong>
        <span class="v4-lender-banner-card__speed">お申込みから<b>${speed}</b></span>
        <em>詳しくはこちら</em>
      </a>`;
    }
    return `<a class="v4-lender-banner" href="${redirectHref(lender.key)}" target="_blank" rel="sponsored noopener">
      <img src="./assets/lenders/${lender.banner}" width="${lender.width}" height="${lender.height}" alt="${lender.name}公式サイトへ" loading="lazy">
    </a>`;
  };
  const reviewProfileMarkup = (lender) => {
    const income = lender.reviewIncome ? `<span class="v4-review-income">年収：${lender.reviewIncome}</span>` : "";
    const rating = lender.reviewRating ? `<span class="v4-review-rating" aria-label="評価5点満点中${lender.reviewRating}点"><span aria-hidden="true">★★★★★</span><b>${lender.reviewRating}</b></span>` : "";
    return `${lender.reviewProfile}${income}${rating}`;
  };
  const reviewImageMarkup = (lender) => {
    const alt = lender.reviewImageAlt || "口コミ利用者";
    if (lender.reviewImage) {
      return `<img src="./assets/lenders/${lender.reviewImage}" width="${lender.reviewImageWidth}" height="${lender.reviewImageHeight}" alt="${alt}" loading="eager" decoding="async" fetchpriority="high" data-v4-review-primary-image>`;
    }
    return `<img src="./assets/lenders/reviews/mobikuchi1-160.webp" width="160" height="160" alt="${alt}" loading="eager" decoding="async" fetchpriority="high" data-v4-review-primary-image>`;
  };
  const mobitAdditionalReviews = [
    { profile: "35歳・会社員・男性", image: "mobikuchi1-160.webp", text: "急な帰省や予定外の買い物が重なった月に、必要な分だけ借りました。申し込みから借入までがスムーズで、予定していた支払いにも十分間に合いました。返済時にVポイントを活用できるので、普段の支払いとまとめて管理しやすいです。" },
    { profile: "26歳・会社員（事務）・女性", image: "mobikuchi6-160.webp", text: "推し活のために少額利用しました。スマホ完結で電話連絡も一切なかったので、周囲にバレる心配もなくスムーズでした。初めての借り入れで不安でしたが、途中の案内も分かりやすく、助かりました。" },
    { profile: "34歳・派遣社員・男性", image: "mobikuchi5-160.webp", text: "職場に知られたくなかったので、WEB完結申込で手続きしました。原則として勤務先への電話連絡なしの案内どおり進められ、周囲に気づかれずに借入できたのが一番安心でした。" },
    { profile: "25歳・フリーター・男性", image: "mobikuchi4-160.webp", text: "賃貸の更新料の支払いのために少しだけ借りました。職場への電話連絡がないのが一番のメリットでした。誰にも知られずにピンチを切り抜けられたので、モビットを選んで正解でした。" },
    { profile: "29歳・契約社員・女性", image: "mobikuchi3-160.webp", text: "冠婚葬祭が立て続けに重なり、ご祝儀や交通費で生活費を圧迫してしまったため少しだけお世話になりました。私の場合は収入証明書が不要で、免許証のアップロードだけで簡単に申し込みでき、大変助かりました。" },
    { profile: "38歳・会社員（管理職）・男性", image: "mobikuchi2-160.webp", text: "引越し費用の不足分で利用しました。入力がシンプルで、どこで何をすればいいか分かりやすかったです。スピードだけでなく、手続きのわかりやすさで選ぶならモビットはかなり良いと思います。" },
    { profile: "51歳・自営業・男性", image: "mobikuchi10-160.webp", text: "仕事用の車の急な修理費で困り、利用しました。自営業は審査が厳しいと聞いていましたが、スマホで必要な書類を提出して無事に借入できました。SMBCの名前があるので安心感があります。" },
    { profile: "34歳・会社員（事務）・女性", image: "mobikuchi9-160.webp", text: "給料日前に急な出費が重なってしまい利用しました。申し込んでから借入までが早く、仕事の休憩中にほとんど手続きが終わったのが印象的でした。急ぎの時に頼りやすいです。" },
    { profile: "23歳・フリーター・男性", image: "mobikuchi8-160.webp", text: "アルバイトとかけ持ちでバンド活動しています。少し大きな会場でのライブが決まり、機材の新調のため利用。年収面で審査結果が不安でしたが、必要な手続きを進められました。" },
    { profile: "42歳・会社員（管理職）・男性", image: "mobikuchi7-160.webp", text: "家族や職場への連絡が心配で、事前に確認してからスマホでWEB申し込みをしました。私の場合は書類で確認が進んだので、バレずに利用することができました。他社借入れ中の方も、候補に入れる価値があると思います。" },
    { profile: "32歳・会社員（運送）・男性", image: "mobikuchi11-160.webp", text: "クレジットカードの支払いが足りなくなりそうなときに利用しています。返済ペースを管理しやすく、少額借りて次の給料で返すという使い方にしています。計画的な借り入れがしやすく、助かっています。" }
  ];
  const promiseAdditionalReviews = [
    { profile: "24歳・アルバイト・男性", image: "mobikuchi8-160.webp", text: "給料日前に急な出費が重なってしまい利用しました。申し込んでから借入までが早く、仕事の休憩中にほとんど手続きが終わったのが印象的でした。急ぎの時に頼りやすいです。" },
    { profile: "25歳・会社員（事務）・女性", image: "mobikuchi6-160.webp", text: "クレジットカードで推しのグッズを買いすぎてしまい、引き落とし日に口座の残高が足りないことに前日気づきました。延滞は避けたくて急いでプロミスに申し込み。審査結果がすぐに出て、無事に借りることができました。" },
    { profile: "28歳・派遣社員・男性", image: "mobikuchi1-160.webp", text: "夜に急にお金が必要になって申し込みました。翌日に持ち越すかと思っていたのですが、想像以上に手続きがスムーズでした。30日間無利息なので、借りた分だけすぐ返済すれば余計な負担もありません。スピードを重視して比較するなら、まず候補に入ると思います。" },
    { profile: "23歳・フリーター・男性", image: "mobikuchi4-160.webp", text: "賃貸の更新料を1カ月分の家賃だけだと勘違いしており、保険料などの支払いができずに急いで利用しました。職場連絡もなく当日中に借り入れができ、なんとかピンチを切り抜けられたので、プロミスを選んで本当によかったです。" },
    { profile: "30歳・フリーランス・女性", image: "mobikuchi9-160.webp", text: "収入が月でブレやすいため、急な出費でどうしても厳しい月に利用しています。コンビニですぐに引き落とせますし、周囲にバレずに利用できているのも大きいです。計画的に利用できるので、いざという時の心強い味方です。" },
    { profile: "36歳・会社員（管理職）・男性", image: "mobikuchi7-160.webp", text: "病院代や日用品の買い足しが続いて、月末に少し足りなくなった時に利用しました。問い合わせ時の説明が丁寧で、分からない点を確認しながら進められたので安心感がありました。手続きのしやすさを重視する人に合うと思います。" },
    { profile: "26歳・会社員（受付）・男性", image: "mobikuchi5-160.webp", text: "副業で動画制作をはじめようと思い、機材購入の初期費用のために利用しました。安定して稼げるようになるまで多少時間がかかりましたが、安物のパソコンやカメラでクオリティも損なった状態では絶対に今のようになれなかったので、借り入れをしていいアイテムを揃えて決断は正しかったと今でも思います。" },
    { profile: "24歳・アルバイト・男性", image: "mobikuchi8-160.webp", text: "舞台俳優として活動しているのですが、小劇場では稽古の期間が長いわりにはギャラがほとんどでません。今年は出演本数が多く、バイトに入れる日が減ってしまったため、一時的に利用。収入の低さで審査が不安でしたが、安定した収入自体はあったこともあり、無事に借り入れることができ感謝しています。" },
    { profile: "27歳・契約社員・女性", image: "mobikuchi3-160.webp", text: "家族と職場に知られたくなかったので、プロミスを選びました。私の場合は本当に勤務先への電話や家への郵送物もなかったので、周囲に気づかれずに借入れできたのが本当に安心でした。初回は30日間利子が0円なのでそれも大きなポイントでした。" },
    { profile: "41歳・会社員（人材派遣）・男性", image: "mobikuchi10-160.webp", text: "車検代と修理費で困り、利用しました。結果が早く、当日中に振込で借りられました。家に郵送物が来ず、周りに知られにくいのも良い点。借りる前に返済額を計算して、必要な分だけ借りました。無利息期間もあるので、一時的な利用にとくにおススメです。" },
    { profile: "31歳・自営業・男性", image: "mobikuchi11-160.webp", text: "顧客の支払いが滞り、資金がショートしそうになったので利用しました。自営業は審査が厳しいと聞いていましたが、スマホで必要な書類を提出して無事に借入できました。やはり有名なところなので安心感と安定感があり、無事に借り入れができました。" }
  ];
  const aifulAdditionalReviews = [
    { profile: "男性・29歳・会社員（営業）・年収420万", image: "mobikuchi1-160.webp", text: "通勤で車が必要なのに、車検でタイヤ交換まで必要と言われて一気に予算オーバー。カードの引き落としも近くて焦りましたが、整備工場の待ち時間にスマホから申し込めたので、その場で支払いの目処を立てられて助かりました。" },
    { profile: "女性・33歳・契約社員（総務）・年収360万", image: "mobikuchi9-160.webp", text: "引っ越したばかりで、家賃の初回引き落としと前の部屋の精算、さらに光熱費まで同じ週に来てしまいました。給料日まで数日だったので、必要な分だけ申し込み。返済額の目安を見ながら金額を決められたので、次の給料で無理なく戻せる範囲に抑えられました。" },
    { profile: "男性・54歳・自営業（内装業）・年収520万", image: "mobikuchi10-160.webp", text: "次の現場で使う材料を先に仕入れる必要がありました。取引先からの入金が週明けにずれたせいで手元が足りず、移動中にアイフルへ申し込みました。案内がわかりやすく、現場を止めずに支払いの段取りをつけられたのが助かりました。" },
    { profile: "女性・25歳・個人事業主（接客業）・年収610万", image: "mobikuchi6-160.webp", text: "夜のお店で接客をしていて、ドレス代やヘアセット代が重なったところに急な歯の治療まで入ってしまいました。実家暮らしなので封筒が届くのは絶対避けたくて、アイフルの案内をかなり見ました。原則自宅への郵送物なしって先にわかったので、そこは正直かなりホッとしたポイントですね。" },
    { profile: "男性・37歳・会社員（販売職）・年収480万", image: "mobikuchi2-160.webp", text: "朝に洗濯機が完全に動かなくなり、子どもの体操着や仕事着が洗えず本当に困りました。修理より買い替えた方が早いと言われ、足りない分だけアイフルで申し込みました。最短9分審査の案内があったので、家電量販店に向かう前に手続きの目処を立てられて助かりました。" },
    { profile: "女性・30歳・派遣社員・年収330万", image: "mobikuchi3-160.webp", text: "前に別のカードローンを使った時、急いで借りて返済額をちゃんと見ていなかったのが反省点でした。今回は派遣先の更新前で収入が少し不安定だったので、アイフルで必要額と返済額を見ながら申し込みました。スマホで途中確認しながら進められたので、前より落ち着いて決められました。" },
    { profile: "男性・23歳・アルバイト・年収220万", image: "mobikuchi8-160.webp", text: "地方のライブに当選したのですが、チケット代の支払いと夜行バス代が給料日前に重なってしまいました。どうしても行きたかったので、足りない分だけアイフルで申し込みました。次のバイト代で返す予定をしっかり立てて利用できました。" },
    { profile: "女性・39歳・パート・年収280万", image: "mobikuchi9-160.webp", text: "子どもの修学旅行の積立と部活の道具代、さらに給食費の引き落としが同じ月に重なりました。夫に言うほどの金額ではないけれど手元が足りず、夜に家事が落ち着いてからスマホで申し込みました。自宅への郵送物もなく、家族に余計な心配をかけずに済んだのも助かりました。" },
    { profile: "男性・42歳・会社員（管理職）・年収610万", image: "mobikuchi7-160.webp", text: "母の検査が続き、付き添いの交通費や薬代を立て替えることが増えました。家計からすぐ出すには少し大きく、ボーナス前までのつなぎとしてアイフルを利用しました。申し込み前に返済額の目安を見られたので、翌月から無理なく返す計画を立てられました。" },
    { profile: "男性・28歳・フリーランス（デザイナー）・年収350万", image: "mobikuchi5-160.webp", text: "デザインの納品前日にノートパソコンの画面が映らなくなり、修理では間に合わず中古の代替機を買うことにしました。入金予定は翌週だったので、つなぎとしてアイフルに申し込みました。夜の8時でもスマホから手続き、入金できたおかげで、翌朝には作業環境を用意できて納期にも間に合いました。" }
  ];
  const additionalReviewsByLender = {
    mobit: mobitAdditionalReviews,
    promise: promiseAdditionalReviews,
    aiful: aifulAdditionalReviews
  };
  const additionalReviewDetailsByLender = {
    mobit: [
      { amount: "30万円", time: "30分以内", rating: 5 },
      { amount: "10万円", time: "20分以内", rating: 4.5 },
      { amount: "20万円", time: "40分以内", rating: 5 },
      { amount: "10万円", time: "30分以内", rating: 4.5 },
      { amount: "20万円", time: "50分以内", rating: 4 },
      { amount: "40万円", time: "40分以内", rating: 5 },
      { amount: "50万円", time: "1時間以内", rating: 4.5 },
      { amount: "10万円", time: "20分以内", rating: 5 },
      { amount: "30万円", time: "50分以内", rating: 4 },
      { amount: "20万円", time: "30分以内", rating: 4.5 },
      { amount: "10万円", time: "40分以内", rating: 5 }
    ],
    promise: [
      { amount: "10万円", time: "20分以内", rating: 5 },
      { amount: "20万円", time: "20分以内", rating: 4.5 },
      { amount: "30万円", time: "30分以内", rating: 5 },
      { amount: "20万円", time: "30分以内", rating: 4.5 },
      { amount: "10万円", time: "40分以内", rating: 4 },
      { amount: "20万円", time: "50分以内", rating: 4.5 },
      { amount: "50万円", time: "1時間以内", rating: 5 },
      { amount: "10万円", time: "40分以内", rating: 4 },
      { amount: "20万円", time: "30分以内", rating: 4.5 },
      { amount: "40万円", time: "30分以内", rating: 5 },
      { amount: "50万円", time: "1時間以内", rating: 4.5 }
    ],
    aiful: [
      { amount: "40万円", time: "20分以内", rating: 5 },
      { amount: "30万円", time: "30分以内", rating: 4.5 },
      { amount: "50万円", time: "40分以内", rating: 5 },
      { amount: "30万円", time: "30分以内", rating: 4.5 },
      { amount: "20万円", time: "20分以内", rating: 5 },
      { amount: "20万円", time: "40分以内", rating: 4 },
      { amount: "10万円", time: "30分以内", rating: 4.5 },
      { amount: "20万円", time: "50分以内", rating: 4.5 },
      { amount: "40万円", time: "1時間以内", rating: 5 },
      { amount: "30万円", time: "30分以内", rating: 5 }
    ]
  };
  const additionalReviewProfileMarkup = (profile) => {
    const parts = profile.split("・").map((part) => part.trim()).filter(Boolean);
    const age = parts.find((part) => /^\d+歳$/.test(part)) || "";
    const gender = parts.find((part) => /^(男性|女性)$/.test(part)) || "";
    const income = parts.find((part) => /^年収/.test(part)) || "";
    const occupation = parts.filter((part) => part !== age && part !== gender && part !== income).join("・");
    const incomeMarkup = income ? `<span>年収：${income.replace(/^年収[:：]?/, "")}</span>` : "";
    return `<h5 class="v4-more-reviews__profile" aria-label="${profile}">
          <span>職業：${occupation}</span>
          <span>年齢：${age}</span>
          <span>性別：${gender}</span>
          ${incomeMarkup}
        </h5>`;
  };
  const additionalReviewsMarkup = (lender) => {
    const reviews = additionalReviewsByLender[lender.key];
    if (!reviews) return "";
    const reviewDetails = additionalReviewDetailsByLender[lender.key] || [];
    const dialogId = `v4-${lender.key}-reviews-dialog`;
    const titleId = `v4-${lender.key}-reviews-title`;
    const items = reviews.map((review, index) => {
      const detail = reviewDetails[index] || { amount: "10万円", time: "1時間以内", rating: 4 };
      const amountLabel = detail.amount.endsWith("未満") ? detail.amount : `${detail.amount}未満`;
      const ratingWidth = `${detail.rating / 5 * 100}%`;
      return `<article class="v4-more-reviews__item">
      <div class="v4-more-reviews__person">
        <img src="./assets/lenders/reviews/${review.image}" width="160" height="160" alt="${review.profile}のイメージイラスト" loading="lazy" decoding="async" fetchpriority="low">
        ${additionalReviewProfileMarkup(review.profile)}
        <span class="v4-more-reviews__rating" aria-label="5点満点中${detail.rating}点"><span aria-hidden="true" style="--v4-review-rating-width:${ratingWidth}">★★★★★</span><b>${detail.rating}</b></span>
        <dl class="v4-more-reviews__facts">
          <div><dt>借入額：</dt><dd>${amountLabel}</dd></div>
          <div><dt>借入までの時間：</dt><dd>${detail.time}</dd></div>
        </dl>
      </div>
      <div class="v4-more-reviews__content">
        <p>${review.text}</p>
      </div>
    </article>`;
    }).join("");
    return `<div class="v4-more-reviews-wrap">
      <button class="v4-more-reviews-trigger" type="button" aria-haspopup="dialog" aria-controls="${dialogId}"><span>もっと口コミを見る</span><i aria-hidden="true">→</i></button>
      <dialog class="v4-more-reviews-dialog" id="${dialogId}" aria-labelledby="${titleId}">
        <div class="v4-more-reviews-dialog__shell">
          <header class="v4-more-reviews-dialog__header">
            <h4 id="${titleId}">${lender.name}利用者の声</h4>
            <button type="button" data-v4-reviews-close aria-label="口コミを閉じる">×</button>
          </header>
          <div class="v4-more-reviews-dialog__body">
            <div class="v4-more-reviews__list">${items}</div>
            <p class="v4-more-reviews-dialog__note">※ 一例であり、結果を保証するものではありません。<br>※ 掲載内容は個人の感想です。申込条件・審査状況などにより異なります。</p>
          </div>
          <div class="v4-more-reviews-dialog__floating-action">
            <a class="v4-more-reviews-dialog__cta" href="${reviewsCtaHref(lender)}" target="_blank" rel="sponsored noopener">${lender.name}の詳細はこちら</a>
          </div>
        </div>
      </dialog>
      <p class="v4-more-reviews__note">※ 一例であり、結果を保証するものではありません。<br>※ 掲載内容は個人の感想です。申込条件・審査状況などにより異なります。</p>
    </div>`;
  };

  const finalPickMarkup = "";

  const countdownClockMarkup = '<svg class="v4-countdown__clock" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6.25"></circle><path d="M8 4.5V8l2.5 1.5"></path></svg>';
  const countdownMarkup = () => `<div class="v4-countdown" data-v4-countdown aria-live="polite"><span>本日中に借りるなら</span><b>${countdownClockMarkup}残り <i data-v4-hours>00</i>時間<i data-v4-minutes>00</i>分<i data-v4-seconds>00</i>秒<i data-v4-centiseconds>00</i></b></div>`;
  const officialLpAccessibleLabel = (lender) => `広告リンクを経由して${lender.name}公式サイトへ移動します`;
  const assuranceMarkup = (lender) => lender.key === "mobit" ? `<div class="v4-cta-assurance">
    <svg viewBox="0 0 40 46" aria-hidden="true" focusable="false"><path d="M20 1 37 7v13c0 11-6.7 19.7-17 25C9.7 39.7 3 31 3 20V7L20 1Z"></path><path d="m12 22 5 5 11-12"></path></svg>
    <p><strong>入力はかんたん。</strong><small>原則、電話連絡・郵送物なし</small><em>※電話連絡なしはWEB完結申込の場合</em></p>
  </div>` : "";
  const officialLpMarkup = (lender) => lender.key === "mobit"
    ? `<p class="v4-cta-official"><span>公式LP：</span><a class="v4-cta-sub-link" href="${redirectHref(lender.key)}" target="_blank" rel="sponsored noopener" aria-label="${officialLpAccessibleLabel(lender)}" title="${officialLpAccessibleLabel(lender)}">https://www.mobit.ne.jp</a></p>`
    : `<p class="v4-cta-official"><a class="v4-cta-sub-link" href="${redirectHref(lender.key)}" target="_blank" rel="sponsored noopener" aria-label="${officialLpAccessibleLabel(lender)}" title="${officialLpAccessibleLabel(lender)}">公式LPはこちら</a></p>`;

  mount.innerHTML = `
    <section class="v4-result-cards" data-v4-result-theme="${rankedLenders[0].key}" aria-label="カードローン診断結果">
      ${diagnosisSummaryMarkup(rankedLenders[0])}
      <div class="v4-lender-list">
        ${rankedLenders.map((lender, index) => `
          <article class="v4-lender-card" data-v4-lender="${lender.key}">
            ${cardLeadMarkup(lender)}
            <div class="v4-lender-head">
              ${productBannerMarkup(lender)}
              <div class="v4-lender-summary">
                <dl class="v4-specs">${specMarkup(lender.specs)}<div class="v4-conveni"><dt>利用コンビニ</dt><dd><span class="v4-conveni-logo-crop"><img src="./assets/lenders/convenience-store-logos-360.webp" width="360" height="87" alt="利用可能な提携コンビニATM：セブン-イレブン、ファミリーマート、ローソン、ミニストップ" loading="lazy" decoding="async"></span></dd></div></dl>
              </div>
            </div>
            <div class="v4-cta-wrap v4-cta-wrap--after-head">
              ${assuranceMarkup(lender)}
              ${countdownMarkup()}
              <a class="v4-cta" href="${redirectHref(lender.key)}" target="_blank" rel="sponsored noopener">${lender.cta}</a>
              ${officialLpMarkup(lender)}
            </div>
            ${recommendationMarkup(lender)}
            <section class="v4-review-box" aria-label="利用者の口コミ">
              ${reviewTopBannerMarkup(lender)}
              <div class="v4-review-layout">
                <figure class="v4-review-avatar is-${lender.reviewPosition || "default"}">${reviewImageMarkup(lender)}<figcaption>${reviewProfileMarkup(lender)}<span class="v4-review-avatar-fact"><span class="v4-review-avatar-fact__label">借入額：</span><strong class="v4-review-avatar-fact__value">${lender.reviewAmount.replace("～", "～<wbr>")}</strong></span><span class="v4-review-avatar-fact"><span class="v4-review-avatar-fact__label">借入までの時間：</span><strong class="v4-review-avatar-fact__value">${lender.reviewTime}</strong></span></figcaption></figure>
                <div class="v4-review-copy">
                  <div class="v4-review v4-review-bubble"><p class="v4-review-text">${lender.review}</p><small>※一例であり、結果を保証するものではありません。</small></div>
                </div>
              </div>
              ${additionalReviewsMarkup(lender)}
              <div class="v4-cta-wrap v4-cta-wrap--after-review">
                ${assuranceMarkup(lender)}
                ${countdownMarkup()}
                <a class="v4-cta" href="${redirectHref(lender.key)}" target="_blank" rel="sponsored noopener">${lender.cta}</a>
                ${officialLpMarkup(lender)}
              </div>
            </section>
            <p class="v4-lender-note">【PR】Sponsored by ${lender.group}<br>${lender.note}</p>
          </article>`).join("")}
      </div>
      ${finalPickMarkup}
    </section>`;

  mount.querySelectorAll("[data-v4-review-primary-image]").forEach((image) => {
    image.addEventListener("error", () => {
      if (image.dataset.v4FallbackApplied === "true") return;
      image.dataset.v4FallbackApplied = "true";
      image.removeAttribute("srcset");
      image.src = "./assets/lenders/reviews/mobikuchi1-160.webp";
      image.width = 160;
      image.height = 160;
    });
  });

  const reviewsDialog = mount.querySelector(".v4-more-reviews-dialog");
  const reviewsTrigger = mount.querySelector(".v4-more-reviews-trigger");
  if (reviewsDialog && reviewsTrigger) {
    const closeReviewsDialog = () => {
      if (typeof reviewsDialog.close === "function") reviewsDialog.close();
      else reviewsDialog.removeAttribute("open");
    };
    reviewsTrigger.addEventListener("click", () => {
      if (typeof reviewsDialog.showModal === "function") reviewsDialog.showModal();
      else reviewsDialog.setAttribute("open", "");
    });
    reviewsDialog.querySelectorAll("[data-v4-reviews-close]").forEach((button) => button.addEventListener("click", closeReviewsDialog));
    reviewsDialog.addEventListener("click", (event) => {
      if (event.target === reviewsDialog) closeReviewsDialog();
    });
    reviewsDialog.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeReviewsDialog();
      }
    });
    reviewsDialog.addEventListener("close", () => reviewsTrigger.focus());
  }

  {
    const primaryLender = rankedLenders[0];
    const summarySection = mount.querySelector(".v4-diagnosis-summary");
    const summaryMatch = mount.querySelector(".v4-diagnosis-summary__match");
    const primaryCard = mount.querySelector(`.v4-lender-card[data-v4-lender="${primaryLender.key}"]`);
    const lenderTitlebar = primaryCard?.querySelector(".v4-lender-titlebar");
    const lenderCatch = primaryCard?.querySelector(".v4-lender-catch");
    const lenderHead = primaryCard?.querySelector(".v4-lender-head");
    const ctaSet = primaryCard?.querySelector(".v4-cta-wrap");
    const pointsBanner = primaryCard?.querySelector(".v4-first-time-mobit-banner");
    if (summarySection && summaryMatch && lenderTitlebar && lenderCatch && lenderHead && ctaSet) {
      const productBlock = document.createElement("div");
      productBlock.className = "v4-diagnosis-summary__product";
      summaryMatch.after(productBlock);
      productBlock.append(lenderTitlebar, lenderCatch, lenderHead);

      const actionBlock = document.createElement("div");
      actionBlock.className = "v4-diagnosis-summary__action";
      actionBlock.append(ctaSet);
      productBlock.after(actionBlock);

      if (pointsBanner) {
        pointsBanner.classList.add("v4-diagnosis-summary__points");
        summarySection.after(pointsBanner);
      }
    }
  }

  const lenderList = mount.querySelector(".v4-lender-list");
  const finalMobitMount = mount.querySelector("[data-v4-final-mobit]");
  const primaryMobitCard = lenderList?.querySelector('[data-v4-lender="mobit"]');
  if (finalMobitMount && primaryMobitCard) {
    const finalMobitCard = primaryMobitCard.cloneNode(true);
    finalMobitCard.classList.add("v4-lender-card-final");
    finalMobitCard.querySelector(".v4-lender-rank").textContent = "当サイトおすすめ";
    finalMobitMount.appendChild(finalMobitCard);
  }
  if (primaryMobitCard) {
    document.querySelectorAll("[data-v4-top-final-mobit]").forEach((target) => {
      const repeatedMobitCard = primaryMobitCard.cloneNode(true);
      repeatedMobitCard.classList.add("v4-lender-card-final");
      repeatedMobitCard.querySelector(".v4-lender-rank").textContent = "当サイトおすすめ";
      target.appendChild(repeatedMobitCard);
    });
  }
  const pad = (value) => String(value).padStart(2, "0");
  const countdowns = Array.from(document.querySelectorAll("[data-v4-countdown]"));
  const activeCountdownMarkup = `<span>本日中に借りるなら</span><b>${countdownClockMarkup}残り <i data-v4-hours>00</i>時間<i data-v4-minutes>00</i>分<i data-v4-seconds>00</i>秒<i data-v4-centiseconds>00</i></b>`;
  const nextMorningMarkup = '<span>いま申込で</span><b><strong>最短10時</strong>に借入完了も！</b>';
  const setCountdownPart = (countdown, selector, value) => {
    const element = countdown.querySelector(selector);
    if (element && element.textContent !== value) element.textContent = value;
  };
  const updateCountdowns = (now, schedulerState = {}) => {
    const isDisplayTime = now.getHours() < 21;
    const deadline = new Date(now);
    deadline.setHours(21, 0, 0, 0);
    const remaining = deadline.getTime() - now.getTime();
    countdowns.forEach((countdown) => {
      if (!isDisplayTime || remaining <= 0) {
        if (countdown.hidden) countdown.hidden = false;
        if (!countdown.classList.contains("is-next-morning")) {
          countdown.classList.add("is-next-morning");
          countdown.innerHTML = nextMorningMarkup;
        }
        return;
      }
      if (countdown.hidden) countdown.hidden = false;
      if (countdown.classList.contains("is-next-morning")) {
        countdown.classList.remove("is-next-morning");
        countdown.innerHTML = activeCountdownMarkup;
      }
      const totalSeconds = Math.floor(remaining / 1000);
      setCountdownPart(countdown, "[data-v4-hours]", pad(Math.floor(totalSeconds / 3600)));
      setCountdownPart(countdown, "[data-v4-minutes]", pad(Math.floor((totalSeconds % 3600) / 60)));
      setCountdownPart(countdown, "[data-v4-seconds]", pad(totalSeconds % 60));
      setCountdownPart(countdown, "[data-v4-centiseconds]", schedulerState.reducedMotion ? "00" : pad(Math.floor((remaining % 1000) / 10)));
    });
    return isDisplayTime && remaining > 0 ? 50 : 1000;
  };
  if (countdowns.length && window.MoneyLoanCountdownScheduler) {
    window.MoneyLoanCountdownScheduler.add(updateCountdowns);
  } else if (countdowns.length) {
    const reducedMotionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    let fallbackCountdownTimer = 0;
    const stopFallbackCountdown = () => {
      if (!fallbackCountdownTimer) return;
      window.clearTimeout(fallbackCountdownTimer);
      fallbackCountdownTimer = 0;
    };
    const runFallbackCountdown = () => {
      stopFallbackCountdown();
      if (document.hidden) return;
      const reducedMotion = reducedMotionMedia.matches;
      const nextDelay = updateCountdowns(new Date(), { reducedMotion });
      fallbackCountdownTimer = window.setTimeout(runFallbackCountdown, reducedMotion ? 1000 : Math.min(nextDelay || 50, 50));
    };
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopFallbackCountdown();
      else runFallbackCountdown();
    });
    window.addEventListener("pagehide", stopFallbackCountdown, { once: true });
    runFallbackCountdown();
  }

  const selectedLender = lendersByKey.get(selectedKey);
  const company = document.querySelector("[data-result-company]");
  if (company && selectedLender) company.textContent = selectedLender.name;
  const catchCopy = document.querySelector("[data-result-catch]");
  if (catchCopy) catchCopy.textContent = "あなたの回答に合わせて選定しました";
  document.querySelectorAll(".cq-sticky-cta a, [data-result-cta]").forEach((link) => {
    link.href = redirectHref(selectedKey);
    link.target = "_blank";
    link.rel = "sponsored noopener";
  });
  const retryLink = document.querySelector("[data-cq-back-to-top]");
  if (retryLink) retryLink.href = "./index.html?cq_reset=1";
  document.querySelectorAll("a").forEach((link) => {
    if (link.textContent.trim() === "運営者情報") {
      link.href = "./operationinfo.html";
      link.removeAttribute("target");
    }
  });
})();
