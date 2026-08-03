(() => {
  "use strict";

  const maps = (query) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

  const link = (label, url) => ({ label, url });

  const imageSources = {
    "images/day1.jpg": {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/HUNGARY-Lake_Balaton_Region.jpg/1920px-HUNGARY-Lake_Balaton_Region.jpg",
      credit: "Wikimedia Commons",
      creditUrl:
        "https://commons.wikimedia.org/wiki/File:HUNGARY-Lake_Balaton_Region.jpg",
    },
    "images/annagora.jpg": {
      src: "https://annagora.com/wp-content/uploads/2020/02/medencek_side.png",
      credit: "Annagora Aquapark",
      creditUrl: "https://annagora.com/en/",
    },
    "images/tihany.jpg": {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Tihany%2C_Hungary_-_September_2022.jpg/1920px-Tihany%2C_Hungary_-_September_2022.jpg",
      credit: "Wikimedia Commons",
      creditUrl:
        "https://commons.wikimedia.org/wiki/File:Tihany,_Hungary_-_September_2022.jpg",
    },
    "images/tapolca.jpg": {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Lake_Cave%2CTapolca_2.jpg/1920px-Lake_Cave%2CTapolca_2.jpg",
      credit: "Wikimedia Commons",
      creditUrl:
        "https://commons.wikimedia.org/wiki/File:Lake_Cave,Tapolca_2.jpg",
    },
    "images/sherpa.jpg": {
      src: "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1600&q=84",
      credit: "Unsplash",
      creditUrl: "https://unsplash.com/s/photos/rock-climbing",
    },
    "images/budapest_eye.jpg": {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Budapest_Eye.jpg/1920px-Budapest_Eye.jpg",
      credit: "Wikimedia Commons",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Budapest_Eye.jpg",
    },
    "images/visegrad.jpg": {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Visegr%C3%A1d_Castle%2C_2006_%2802%29.jpg/1920px-Visegr%C3%A1d_Castle%2C_2006_%2802%29.jpg",
      credit: "Wikimedia Commons",
      creditUrl:
        "https://commons.wikimedia.org/wiki/File:Visegr%C3%A1d_Castle,_2006_(02).jpg",
    },
    "images/tropicarium.jpg": {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Paracanthurus_hepatus_in_Tropicarium-Oceanarium_Budapest.jpg/1920px-Paracanthurus_hepatus_in_Tropicarium-Oceanarium_Budapest.jpg",
      credit: "Wikimedia Commons",
      creditUrl:
        "https://commons.wikimedia.org/wiki/File:Paracanthurus_hepatus_in_Tropicarium-Oceanarium_Budapest.jpg",
    },
    "images/fishermans.jpg": {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Fisherman%27s_Bastion_2014.jpg/1920px-Fisherman%27s_Bastion_2014.jpg",
      credit: "Wikimedia Commons",
      creditUrl:
        "https://commons.wikimedia.org/wiki/File:Fisherman%27s_Bastion_2014.jpg",
    },
    "images/arena.jpg": {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Arena_Mall%2C_Pusk%C3%A1s_Ar%C3%A9na%2C_von_Pr%C3%A1terstrasse_56%2C_2024_J%C3%B3zsefv%C3%A1ros.jpg/1920px-Arena_Mall%2C_Pusk%C3%A1s_Ar%C3%A9na%2C_von_Pr%C3%A1terstrasse_56%2C_2024_J%C3%B3zsefv%C3%A1ros.jpg",
      credit: "Wikimedia Commons",
      creditUrl:
        "https://commons.wikimedia.org/wiki/File:Arena_Mall,_Pusk%C3%A1s_Ar%C3%A9na,_von_Pr%C3%A1terstrasse_56,_2024_J%C3%B3zsefv%C3%A1ros.jpg",
    },
    "images/flight_home.jpg": {
      src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=84",
      credit: "Unsplash",
      creditUrl: "https://unsplash.com/s/photos/airplane",
    },
  };

  const actionsByTitle = {
    "נחיתה ונסיעה לאגם בלטון": [
      link("BalatoniBob", "https://balatonibob.hu/en/"),
      link("SkyLine Resort במפה", maps("SkyLine Resort Balatonalmádi")),
    ],
    "Annagora Aquapark & בלטונפורד": [
      link("האתר הרשמי", "https://annagora.com/en/"),
      link("Tigris Bisztró במפה", maps("Tigris Reggeliző és Bisztró Balatonfüred")),
    ],
    "חצי האי טיהאני & זמארדי": [
      link("מנזר טיהאני", "https://tihanyiapatsag.hu/en/"),
      link("Pizza Pazza במפה", maps("Pizza Pazza Zamárdi Hungary")),
    ],
    "מערת טפולצה & טירת שומג": [
      link(
        "מערת טפולצה",
        "https://www.bfnp.hu/en/latogatohely-1/tapolca-lake-cave-visitor-centre-tapolca-tapolca"
      ),
      link("טירת שומג", "https://sumegvar.hu/en/"),
    ],
    "פארק אקסטרים בלטונפיוזפיה": [
      link(
        "פארק Sherpa",
        "https://balatonibob.hu/en/experiences/sherpa-adventure-park"
      ),
      link("ניווט לפארק", maps("BalatoniBob Leisure Park Balatonfűzfő")),
    ],
    "מעבר לבודפשט, קרקס & גלגל ענק": [
      link("הקרקס של בודפשט", "https://fnc.hu/en/"),
      link("Budapest Eye במפה", maps("Budapest Eye Erzsébet tér")),
    ],
    "יום טיול לוויזגראד & סגווי": [
      link("מזחלות ויזגראד", "https://www.visegrad.bobozas.hu/"),
      link("מצודת ויזגראד במפה", maps("Visegrád Citadel Hungary")),
    ],
    "Tropicarium, שוק וחדר בריחה": [
      link("Tropicarium", "https://tropicarium.hu/en/home/"),
      link("Neverland", "https://neverland.hu/en/"),
    ],
    "ארמון בודה, מצודת הדייגים והטיילת": [
      link("מצודת הדייגים", "https://fishermansbastion.com/"),
      link("ארמון בודה במפה", maps("Buda Castle Budapest")),
    ],
    "קניות ב-Arena Mall והחזרת רכב": [
      link("Arena Mall", "https://arenamall.hu/en/"),
      link("ניווט לקניון", maps("Arena Mall Budapest")),
    ],
    "טיסה חזרה לישראל": [
      link("נמל התעופה בודפשט", "https://www.bud.hu/en"),
      link("Arkia", "https://www.arkia.co.il/"),
    ],
    "Annagora Aquapark (בלטונפורד)": [
      link("מידע רשמי", "https://annagora.com/en/"),
      link("כרטיסי ALL IN", "https://ticket.annagora.com/en/shopping/category/all-in-tickets"),
    ],
    "BalatoniBob & Sherpa Adventure Park": [
      link("פרטים ושעות", "https://balatonibob.hu/en/"),
      link("ניווט", maps("BalatoniBob Leisure Park Balatonfűzfő")),
    ],
    "מערת טפולצה (Tapolca Cave) & טירת שומג": [
      link(
        "מרכז המבקרים",
        "https://www.bfnp.hu/en/latogatohely-1/tapolca-lake-cave-visitor-centre-tapolca-tapolca"
      ),
      link("טירת שומג", "https://sumegvar.hu/en/"),
    ],
    "מזחלות ויזגראד (Visegrád Bob) & טירה": [
      link("אתר המזחלות", "https://www.visegrad.bobozas.hu/"),
      link("המצודה במפה", maps("Visegrád Citadel Hungary")),
    ],
    "הקרקס הגדול של בודפשט (Capital Circus)": [
      link("האתר הרשמי", "https://fnc.hu/en/"),
      link("ניווט לקרקס", maps("Capital Circus of Budapest")),
    ],
    "Tropicarium & חדרי בריחה": [
      link("Tropicarium", "https://tropicarium.hu/en/home/"),
      link("Neverland", "https://neverland.hu/en/"),
    ],
    "Tigris Reggeliző és Bisztró": [
      link("פתיחה במפות", maps("Tigris Reggeliző és Bisztró Balatonfüred")),
    ],
    "Pizza Pazza": [
      link("פתיחה במפות", maps("Pizza Pazza Zamárdi Hungary")),
    ],
    "דוכן VITEZ (קיורטוש GF)": [
      link("חיפוש במפות", maps("Vitéz Kürtős Tihany gluten free")),
    ],
    "Tópart Bisztró": [
      link("פתיחה במפות", maps("Tópart Bisztró Tapolca")),
    ],
    "Kék Öböl Étterem & M71 Bistro": [
      link("Kék Öböl במפות", maps("Kék Öböl Étterem Balatonfűzfő")),
      link("M71 Bistro במפות", maps("M71 Bistro Hungary")),
    ],
    "מסעדת הפארק (BalatoniBob)": [
      link("המסעדה באתר הפארק", "https://balatonibob.hu/en/"),
      link("ניווט", maps("BalatoniBob restaurant Balatonfűzfő")),
    ],
    "Kata Restaurant / Monkey’s GF": [
      link("Kata במפות", maps("Kata Restaurant Budapest gluten free")),
      link("Monkey’s במפות", maps("Monkey's gluten free Budapest")),
    ],
    "Non-Solo Gluten Free Pizzeria": [
      link("פתיחה במפות", maps("Non-Solo Gluten Free Pizzeria Budapest")),
    ],
    "לנגוש וקיורטוש GF בבודפשט": [
      link("לנגוש ללא גלוטן", maps("gluten free lángos Budapest")),
      link("קיורטוש ללא גלוטן", maps("gluten free kürtőskalács Budapest")),
    ],
  };

  const hero = document.querySelector(".hero");
  if (hero) {
    const inner = document.createElement("div");
    inner.className = "hero-inner";
    const existing = [...hero.childNodes];
    hero.append(inner);
    inner.append(...existing);

    const eyebrow = document.createElement("div");
    eyebrow.className = "hero-eyebrow";
    eyebrow.textContent = "מסע משפחתי בין אגם לעיר";
    inner.prepend(eyebrow);

    const meta = document.createElement("div");
    meta.className = "hero-meta";
    meta.innerHTML = `
      <div class="hero-pill"><span>◷</span> 11 ימים</div>
      <div class="hero-pill"><span>⌖</span> בלטון + בודפשט</div>
      <div class="hero-pill"><span>🌾</span> אפשרויות ללא גלוטן</div>
    `;
    inner.append(meta);
  }

  document.querySelectorAll(".card-img").forEach((img) => {
    const originalSrc = img.dataset.imageKey || img.getAttribute("src");
    const source = imageSources[originalSrc];
    if (!source) return;

    img.removeAttribute("onerror");
    img.src = source.src;
    img.loading = "lazy";
    img.decoding = "async";
    img.referrerPolicy = "no-referrer";
    img.addEventListener(
      "error",
      () => {
        if (img.dataset.fallbackApplied) return;
        img.dataset.fallbackApplied = "true";
        img.src = imageSources["images/day1.jpg"].src;
      },
      { once: true }
    );

    const credit = document.createElement("a");
    credit.className = "photo-credit";
    credit.href = source.creditUrl;
    credit.target = "_blank";
    credit.rel = "noopener noreferrer";
    credit.textContent = `צילום: ${source.credit}`;
    img.closest(".card-img-container")?.append(credit);
  });

  const appendActions = (host, actions) => {
    if (!host || !actions?.length) return;
    const actionArea = document.createElement("div");
    actionArea.className = "card-actions";

    actions.forEach(({ label, url }) => {
      const anchor = document.createElement("a");
      anchor.className = "card-action";
      anchor.href = url;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
      anchor.textContent = label;
      actionArea.append(anchor);
    });

    host.append(actionArea);
  };

  document.querySelectorAll(".card").forEach((card) => {
    const title = card.querySelector(".card-title")?.textContent.trim();
    appendActions(card.querySelector(".card-body"), actionsByTitle[title]);
  });

  document.querySelectorAll(".flight-box").forEach((box, index) => {
    appendActions(
      box,
      index === 0
        ? [
            link("Arkia", "https://www.arkia.co.il/"),
            link("נמל התעופה בודפשט", "https://www.bud.hu/en"),
          ]
        : [
            link("נמל התעופה בודפשט", "https://www.bud.hu/en"),
            link("נתב״ג", "https://www.iaa.gov.il/airports/ben-gurion/"),
          ]
    );
  });

  const progress = document.createElement("div");
  progress.className = "scroll-progress";
  progress.setAttribute("aria-hidden", "true");
  document.body.prepend(progress);

  const backToTop = document.createElement("button");
  backToTop.className = "back-to-top";
  backToTop.type = "button";
  backToTop.setAttribute("aria-label", "חזרה לראש העמוד");
  backToTop.textContent = "↑";
  backToTop.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );
  document.body.append(backToTop);

  const updateScrollUi = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
    progress.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio))})`;
    backToTop.classList.toggle("is-visible", window.scrollY > 700);
  };

  updateScrollUi();
  window.addEventListener("scroll", updateScrollUi, { passive: true });
  window.addEventListener("resize", updateScrollUi, { passive: true });

  const navLinks = [...document.querySelectorAll(".nav-btn")];
  const sections = [...document.querySelectorAll(".section-block[id]")];
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        navLinks.forEach((item) =>
          item.classList.toggle(
            "is-active",
            item.getAttribute("href") === `#${visible.target.id}`
          )
        );
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.1, 0.3] }
    );
    sections.forEach((section) => observer.observe(section));
  }

  const footer = document.querySelector("footer");
  if (footer) {
    footer.append(
      document.createElement("br"),
      "התמונות נטענות ממקורות רשת ציבוריים; זמינות ושעות פעילות עשויות להשתנות."
    );
  }
})();

