(() => {
  const gallery = document.querySelector("#result-gallery");
  const loader = document.querySelector("#result-gallery-loader");
  const status = document.querySelector("#result-gallery-status");
  if (!gallery || !loader || !status) return;

  const lenders = [
    { key: "mobit", offer: "sm", used: "sm", name: "SMBCモビット", main: "#007a4d", dark: "#005d3d", soft: "#e5f2ec", line: "#3a936f", text: "#064a35" },
    { key: "promise", offer: "pr", used: "pr", name: "プロミス", main: "#004098", dark: "#002f73", soft: "#f3f7ff", line: "#b8cbea", text: "#17345f" },
    { key: "aiful", offer: "ai", used: "ai", name: "アイフル", main: "#d71920", dark: "#971217", soft: "#fff1f1", line: "#eaa6a9", text: "#5b171a" },
    { key: "acom", offer: "ac", used: "ac", name: "アコム", main: "#e60012", dark: "#a5000d", soft: "#fff3f4", line: "#efb5ba", text: "#5a171c" }
  ];
  const groups = [
    {
      key: "usage",
      title: "Q1 利用状況",
      note: "3パターン",
      cases: [
        { label: "はじめて", usage: "first_time", used: "none" },
        { label: "利用経験あり・この会社は未利用", usage: "experienced", used: "none" },
        { label: "利用経験あり・この会社を利用済み", usage: "experienced", used: "selected" }
      ]
    },
    {
      key: "amount",
      title: "Q2 希望金額",
      note: "4パターン",
      cases: [
        { label: "1〜10万円", amount: "1_10" },
        { label: "10〜30万円", amount: "10_30" },
        { label: "30〜50万円", amount: "30_50" },
        { label: "50万円以上", amount: "over_50" }
      ]
    },
    {
      key: "priority",
      title: "Q3 重視条件",
      note: "4パターン",
      cases: [
        { label: "とにかく早く借りたい", priority: "speed" },
        { label: "審査の不安を減らしたい", priority: "approval_anxiety" },
        { label: "身近な人にバレたくない", priority: "privacy" },
        { label: "返済をラクにしたい", priority: "cost" }
      ]
    }
  ];

  const themeStyle = (lender) => [
    `--gallery-main:${lender.main}`,
    `--gallery-dark:${lender.dark}`,
    `--gallery-soft:${lender.soft}`,
    `--gallery-line:${lender.line}`,
    `--v4-brand:${lender.main}`,
    `--v4-brand-dark:${lender.dark}`,
    `--v4-brand-soft:${lender.soft}`,
    `--v4-brand-line:${lender.line}`,
    `--v4-brand-text:${lender.text}`
  ].join(";");

  const paramsFor = (lender, group, item) => {
    const params = new URLSearchParams({
      result_offer: lender.offer,
      // カタログは result_offer と cq_used を意図的に組み合わせるため、回答からの再計算を無効化する。
      force_offer: "1",
      cq_usage: "first_time",
      cq_used: "none",
      cq_amount: "30_50",
      cq_priority: "privacy",
      v: "153"
    });
    if (group.key === "usage") {
      params.set("cq_usage", item.usage);
      params.set("cq_used", item.used === "selected" ? lender.used : item.used);
    }
    if (group.key === "amount") params.set("cq_amount", item.amount);
    if (group.key === "priority") params.set("cq_priority", item.priority);
    return params;
  };

  const jobs = [];
  lenders.forEach((lender) => {
    const section = document.createElement("section");
    section.id = `gallery-${lender.key}`;
    section.className = "result-gallery-lender";
    section.setAttribute("style", themeStyle(lender));
    section.innerHTML = `<header class="result-gallery-lender__header"><h2>${lender.name}</h2><span>全11パターン</span></header>`;

    groups.forEach((group) => {
      const groupSection = document.createElement("section");
      groupSection.className = `result-gallery-group is-${group.key}`;
      groupSection.innerHTML = `<header class="result-gallery-group__heading"><h3>${group.title}</h3><p>${group.note}</p></header><div class="result-gallery-grid"></div>`;
      const grid = groupSection.querySelector(".result-gallery-grid");

      group.cases.forEach((item) => {
        const params = paramsFor(lender, group, item);
        const url = `./result.html?${params}#v4-diagnosis-${group.key}`;
        const card = document.createElement("article");
        card.className = "result-gallery-card";
        card.innerHTML = `<header class="result-gallery-card__label"><strong>${item.label}</strong><a href="${url}" target="_blank" rel="noopener">実画面 ↗</a></header><div class="result-gallery-card__preview"><p class="result-gallery-card__loading">読み込み中…</p></div>`;
        grid.append(card);
        jobs.push({ lender, group, url, preview: card.querySelector(".result-gallery-card__preview") });
      });
      section.append(groupSection);
    });
    gallery.append(section);
  });

  const waitForCard = (frame, kind) => new Promise((resolve, reject) => {
    let attempts = 0;
    const inspect = () => {
      try {
        const item = frame.contentDocument?.querySelector(`.v4-diagnosis-summary__match-item.is-${kind}`);
        if (item) return resolve(item);
      } catch (error) {
        return reject(error);
      }
      attempts += 1;
      if (attempts > 180) return reject(new Error("回答カードの読み込みがタイムアウトしました"));
      window.setTimeout(inspect, 50);
    };
    inspect();
  });

  const scopeClonedIds = (root, prefix) => {
    const idMap = new Map();
    const elementsWithIds = [root, ...root.querySelectorAll("[id]")].filter((element) => element.id);
    elementsWithIds.forEach((element) => {
      const previousId = element.id;
      const scopedId = `${prefix}-${previousId}`;
      idMap.set(previousId, scopedId);
      element.id = scopedId;
    });

    const tokenAttributes = ["aria-labelledby", "aria-describedby", "aria-controls", "aria-owns"];
    [root, ...root.querySelectorAll("*")].forEach((element) => {
      tokenAttributes.forEach((attribute) => {
        if (!element.hasAttribute(attribute)) return;
        const mapped = element.getAttribute(attribute).split(/\s+/).map((token) => idMap.get(token) || token).join(" ");
        element.setAttribute(attribute, mapped);
      });
      if (element.hasAttribute("for") && idMap.has(element.getAttribute("for"))) {
        element.setAttribute("for", idMap.get(element.getAttribute("for")));
      }
      const href = element.getAttribute("href");
      if (href && href.startsWith("#") && idMap.has(href.slice(1))) {
        element.setAttribute("href", `#${idMap.get(href.slice(1))}`);
      }
    });
  };

  let requestSerial = 0;
  const loadJob = (frame, job) => new Promise((resolve) => {
    let finished = false;
    const finish = () => {
      if (finished) return false;
      finished = true;
      window.clearTimeout(timeoutId);
      resolve();
      return true;
    };
    const fail = () => {
      if (!finished) job.preview.innerHTML = `<p class="result-gallery-card__error">読み込みに失敗しました。<br>「実画面」から確認してください。</p>`;
      finish();
    };
    const timeoutId = window.setTimeout(fail, 12000);
    frame.onload = async () => {
      if (finished) return;
      try {
        const source = await waitForCard(frame, job.group.key);
        const shell = document.createElement("section");
        shell.className = "v4-result-cards";
        shell.dataset.v4ResultTheme = job.lender.key;
        shell.setAttribute("style", themeStyle(job.lender));
        shell.innerHTML = '<div class="v4-diagnosis-summary__match"><div class="v4-diagnosis-summary__match-panel"><dl></dl></div></div>';
        const clonedCard = source.cloneNode(true);
        scopeClonedIds(clonedCard, `gallery-preview-${job.previewId}`);
        clonedCard.querySelectorAll("img").forEach((image) => { image.loading = "eager"; });
        shell.querySelector("dl").append(clonedCard);
        job.preview.replaceChildren(shell);
      } catch (error) {
        fail();
        return;
      }
      finish();
    };
    frame.onerror = fail;
    const sourceUrl = new URL(job.url, window.location.href);
    sourceUrl.pathname = sourceUrl.pathname.replace(/result\.html$/, "result-gallery-source.html");
    sourceUrl.hash = "";
    requestSerial += 1;
    job.previewId = requestSerial;
    sourceUrl.searchParams.set("gallery_preview", String(requestSerial));
    frame.src = sourceUrl.href;
  });

  (async () => {
    const loaders = [loader];
    for (let index = 1; index < 4; index += 1) {
      const frame = loader.cloneNode(false);
      frame.removeAttribute("id");
      document.body.append(frame);
      loaders.push(frame);
    }
    let cursor = 0;
    let completed = 0;
    const worker = async (frame) => {
      while (cursor < jobs.length) {
        const job = jobs[cursor];
        cursor += 1;
        await loadJob(frame, job);
        completed += 1;
        status.textContent = `回答結果を読み込んでいます… ${completed}/${jobs.length}`;
      }
    };
    await Promise.all(loaders.map(worker));
    gallery.setAttribute("aria-busy", "false");
    status.textContent = "全44パターンを表示しました";
    window.setTimeout(() => { status.hidden = true; }, 2400);
  })();
})();
