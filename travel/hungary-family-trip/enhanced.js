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
    "טיהאני, Echo & פארק מים": [
      link("מנזר טיהאני", "https://tihanyiapatsag.hu/en/"),
      link("Bebo Aquapark", "https://beboaquapark.hu/en/"),
      link("Echo במפה", maps("Echo Restaurant & Cafe Tihany")),
    ],
    "Annagora Aquapark": [
      link("האתר הרשמי", "https://annagora.com/en/"),
      link("כרטיסי ALL IN", "https://ticket.annagora.com/en/shopping/category/all-in-tickets"),
    ],
    "Sobri Jóska Adventure Park": [
      link("האתר הרשמי", "https://sobrielmenypark.hu/"),
      link("ניווט לפארק", maps("Sobri Jóska Bakonyi Kalandpark Kislőd")),
    ],
    "Zalakaros & Keszthely": [
      link("פארק המים Zalakaros", "https://zalakarosfurdo.hu/en/"),
      link("ארמון Festetics", "https://festeticskastely.hu/en"),
    ],
    "מעבר לבודפשט": [
      link("7Seasons Apartments", "https://www.7seasonsapartments.com/"),
      link("ניווט למלון", maps("7Seasons Apartments Budapest")),
    ],
    "שוק, גשרים, קרקס ושייט לילי": [
      link("הקרקס של בודפשט", "https://fnc.hu/en/"),
      link("השוק המרכזי במפה", maps("Central Market Hall Budapest")),
      link("שייט בדנובה", maps("Budapest Danube cruise")),
    ],
    "יום חופשי בבודפשט": [
      link("רעיונות למשפחות", "https://www.budapestinfo.hu/"),
      link("אטרקציות במפה", maps("family attractions Budapest")),
    ],
    "Arena Mall & טיסה חזרה": [
      link("Arena Mall", "https://arenamall.hu/en/"),
      link("נמל התעופה בודפשט", "https://www.bud.hu/en"),
    ],
    "נחיתה בישראל": [
      link("מידע על נחיתות", "https://www.iaa.gov.il/airports/ben-gurion/flight-board/"),
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
    "Annagora Aquapark (Balatonfüred)": [
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
    "טיהאני, Echo ו‑Bebo Aquapark": [
      link("מנזר טיהאני", "https://tihanyiapatsag.hu/en/"),
      link("Bebo Aquapark", "https://beboaquapark.hu/en/"),
    ],
    "Tapolca, Sümeg & Keszthely": [
      link("מערת טפולצה", "https://www.bfnp.hu/en/latogatohely-1/tapolca-lake-cave-visitor-centre-tapolca-tapolca"),
      link("טירת שומג", "https://sumegvar.hu/en/"),
      link("ארמון Festetics", "https://festeticskastely.hu/en"),
    ],
    "Sobri Jóska Bakonyi Kalandpark": [
      link("האתר הרשמי", "https://sobrielmenypark.hu/"),
      link("ניווט", maps("Sobri Jóska Bakonyi Kalandpark Kislőd")),
    ],
    "Zalakaros Thermal Bath": [
      link("האתר הרשמי", "https://zalakarosfurdo.hu/en/"),
      link("ניווט", maps("Zalakaros Thermal Bath")),
    ],
    "יום בודפשט המרכזי": [
      link("הקרקס של בודפשט", "https://fnc.hu/en/"),
      link("השוק המרכזי", maps("Central Market Hall Budapest")),
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
    "Tigris Bisztró & Pizza Pazza": [
      link("Tigris במפות", maps("Tigris Reggeliző és Bisztró Balatonfüred")),
      link("Pizza Pazza במפות", maps("Pizza Pazza Zamárdi Hungary")),
    ],
    "Várpalota Múzeumkert Étterem": [
      link("פתיחה במפות", maps("Múzeumkert Étterem Várpalota")),
    ],
    "VITEZ & Echo Restaurant & Café": [
      link("VITEZ במפות", maps("Vitéz Kürtős Tihany gluten free")),
      link("Echo במפות", maps("Echo Restaurant & Cafe Tihany")),
    ],
    "Green Magic Café & Snack": [
      link("פתיחה במפות", maps("Green Magic Café Snack Hungary")),
    ],
    "Anna Café – Zalakaros": [
      link("פתיחה במפות", maps("Anna Café Zalakaros")),
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

  const weatherLocations = {
    balaton: {
      label: "אגם בלטון",
      detail: "Balatonalmádi",
      latitude: 47.032,
      longitude: 18.022,
    },
    budapest: {
      label: "בודפשט",
      detail: "Budapest",
      latitude: 47.4979,
      longitude: 19.0402,
    },
  };

  const weatherDescriptions = {
    0: ["שמים בהירים", "☀️"],
    1: ["בהיר לרוב", "🌤️"],
    2: ["מעונן חלקית", "⛅"],
    3: ["מעונן", "☁️"],
    45: ["ערפל", "🌫️"],
    48: ["ערפל קפוא", "🌫️"],
    51: ["טפטוף קל", "🌦️"],
    53: ["טפטוף", "🌦️"],
    55: ["טפטוף חזק", "🌧️"],
    56: ["טפטוף קפוא", "🌧️"],
    57: ["טפטוף קפוא חזק", "🌧️"],
    61: ["גשם קל", "🌦️"],
    63: ["גשם", "🌧️"],
    65: ["גשם חזק", "🌧️"],
    66: ["גשם קפוא", "🌧️"],
    67: ["גשם קפוא חזק", "🌧️"],
    71: ["שלג קל", "🌨️"],
    73: ["שלג", "❄️"],
    75: ["שלג כבד", "❄️"],
    77: ["גרגירי שלג", "🌨️"],
    80: ["ממטרים קלים", "🌦️"],
    81: ["ממטרים", "🌧️"],
    82: ["ממטרים חזקים", "⛈️"],
    85: ["ממטרי שלג", "🌨️"],
    86: ["ממטרי שלג חזקים", "❄️"],
    95: ["סופת רעמים", "⛈️"],
    96: ["סופת רעמים וברד", "⛈️"],
    99: ["סופה חזקה וברד", "⛈️"],
  };

  const weatherStatus = document.querySelector("#weather-status");
  const weatherCurrent = document.querySelector("#weather-current");
  const weatherDays = document.querySelector("#weather-days");
  const weatherUpdated = document.querySelector("#weather-updated");
  const weatherButtons = [...document.querySelectorAll("[data-weather-location]")];

  const describeWeather = (code) =>
    weatherDescriptions[code] || ["מזג אוויר משתנה", "🌡️"];

  const formatWeatherDay = (isoDate, index) => {
    if (index === 0) return "היום";
    if (index === 1) return "מחר";
    return new Intl.DateTimeFormat("he-IL", { weekday: "short" }).format(
      new Date(`${isoDate}T12:00:00`)
    );
  };

  const requestForecast = async (url, attempts = 2) => {
    let lastError;
    for (let attempt = 1; attempt <= attempts; attempt += 1) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Weather request failed: ${response.status}`);
        }
        return response.json();
      } catch (error) {
        lastError = error;
        if (attempt < attempts) {
          await new Promise((resolve) => window.setTimeout(resolve, 700));
        }
      }
    }
    throw lastError;
  };

  const renderWeatherError = (locationKey) => {
    const location = weatherLocations[locationKey];
    weatherStatus.textContent = "לא הצלחנו לטעון כרגע את התחזית.";
    weatherCurrent.className = "weather-current weather-error";
    weatherCurrent.innerHTML = `
      <span class="weather-error-icon">🌦️</span>
      <div>
        <strong>התחזית ל${location.label} לא זמינה</strong>
        <p>בדקו את החיבור ונסו שוב בעוד רגע.</p>
      </div>
      <button type="button" class="weather-retry">נסו שוב</button>
    `;
    weatherDays.replaceChildren();
    weatherCurrent
      .querySelector(".weather-retry")
      ?.addEventListener("click", () => loadWeather(locationKey));
  };

  const loadWeather = async (locationKey) => {
    const location = weatherLocations[locationKey] || weatherLocations.balaton;
    weatherButtons.forEach((button) => {
      const active = button.dataset.weatherLocation === locationKey;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    weatherStatus.textContent = `טוען תחזית עדכנית עבור ${location.label}…`;
    weatherCurrent.className = "weather-current weather-loading";
    weatherCurrent.setAttribute("aria-busy", "true");
    weatherCurrent.innerHTML = '<span class="weather-loader" aria-hidden="true"></span>';
    weatherDays.replaceChildren();

    const params = new URLSearchParams({
      latitude: location.latitude,
      longitude: location.longitude,
      current:
        "temperature_2m,apparent_temperature,weather_code,wind_speed_10m",
      daily:
        "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
      timezone: "Europe/Budapest",
      forecast_days: "7",
    });

    try {
      const forecast = await requestForecast(
        `https://api.open-meteo.com/v1/forecast?${params}`
      );
      const [description, icon] = describeWeather(forecast.current.weather_code);

      weatherStatus.textContent = `תחזית חיה — ${location.label} (${location.detail})`;
      weatherCurrent.className = "weather-current";
      weatherCurrent.removeAttribute("aria-busy");
      weatherCurrent.innerHTML = `
        <div class="weather-now-icon" aria-hidden="true">${icon}</div>
        <div class="weather-now-main">
          <span class="weather-now-label">עכשיו</span>
          <strong>${Math.round(forecast.current.temperature_2m)}°</strong>
          <span>${description}</span>
        </div>
        <div class="weather-now-facts">
          <span>מרגיש כמו <b>${Math.round(forecast.current.apparent_temperature)}°</b></span>
          <span>רוח <b>${Math.round(forecast.current.wind_speed_10m)} קמ״ש</b></span>
        </div>
      `;

      const fragment = document.createDocumentFragment();
      forecast.daily.time.forEach((date, index) => {
        const [dayDescription, dayIcon] = describeWeather(
          forecast.daily.weather_code[index]
        );
        const day = document.createElement("article");
        day.className = "weather-day";
        day.innerHTML = `
          <strong>${formatWeatherDay(date, index)}</strong>
          <span class="weather-day-date">${new Intl.DateTimeFormat("he-IL", {
            day: "numeric",
            month: "numeric",
          }).format(new Date(`${date}T12:00:00`))}</span>
          <span class="weather-day-icon" title="${dayDescription}">${dayIcon}</span>
          <span class="weather-day-temp">${Math.round(
            forecast.daily.temperature_2m_max[index]
          )}° <small>${Math.round(forecast.daily.temperature_2m_min[index])}°</small></span>
          <span class="weather-day-rain">💧 ${Math.round(
            forecast.daily.precipitation_probability_max[index] || 0
          )}%</span>
        `;
        fragment.append(day);
      });
      weatherDays.append(fragment);
      weatherUpdated.textContent = `עודכן ${new Intl.DateTimeFormat("he-IL", {
        dateStyle: "short",
        timeStyle: "short",
      }).format(new Date())} · התחזית היא ל־7 הימים הקרובים.`;
    } catch (error) {
      console.error(error);
      renderWeatherError(locationKey);
    }
  };

  weatherButtons.forEach((button) =>
    button.addEventListener("click", () =>
      loadWeather(button.dataset.weatherLocation)
    )
  );

  if (weatherCurrent && weatherDays && weatherStatus) loadWeather("balaton");

  const footer = document.querySelector("footer");
  if (footer) {
    footer.append(
      document.createElement("br"),
      "התמונות נטענות ממקורות רשת ציבוריים; זמינות ושעות פעילות עשויות להשתנות."
    );
  }
})();

