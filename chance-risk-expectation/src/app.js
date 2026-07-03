import { RandomEngine } from "./random.js";
import { clamp, ils, median, pct, stdDev, variance } from "./math.js";
import { coinEV, rouletteEV, simulateCoin, simulateRoulette, simulateRouletteDistribution } from "./simulation.js";
import { drawHistogram, drawLineChart } from "./charts.js";
import { saveProgress } from "./state.js";
import { quizQuestions, riskQuestions } from "./content.js";

const rng = new RandomEngine(new URLSearchParams(location.search).get("seed"));
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

function stat(label, value) {
  return `<div class="stat"><strong>${label}</strong><span>${value}</span></div>`;
}

function routeTo(name) {
  $$(".view").forEach(view => view.classList.remove("active"));
  const view = $(`#view-${name}`);
  if (view) {
    view.classList.add("active");
    saveProgress({ lastView: name });
    $("#main").focus();
  }
}

function bindNavigation() {
  $$("[data-route]").forEach(button => button.addEventListener("click", () => routeTo(button.dataset.route)));
}

function getCoinRounds() {
  const value = $("#coin-rounds").value;
  return value === "custom" ? clamp(Number($("#coin-custom").value || 1), 1, 100000) : Number(value);
}

function renderCoin(result) {
  $("#coin-stats").innerHTML = [
    stat("מספר הטלות", ils.format(result.rounds)),
    stat("זכיות", ils.format(result.wins)),
    stat("הפסדים", ils.format(result.losses)),
    stat("שיעור זכיות בפועל", pct.format(result.winRate)),
    stat("רווח/הפסד מצטבר", `${ils.format(result.totalProfit)} ש"ח`),
    stat("רווח ממוצע להטלה", `${ils.format(result.averageProfit)} ש"ח`),
    stat("רצף זכיות ארוך", ils.format(result.longestWinRun)),
    stat("רצף הפסדים ארוך", ils.format(result.longestLossRun)),
    stat("יתרה גבוהה ביותר", `${ils.format(result.high)} ש"ח`),
    stat("יתרה נמוכה ביותר", `${ils.format(result.low)} ש"ח`),
  ].join("");
  drawLineChart($("#coin-profit-chart"), [{ points: result.profitPoints, color: "#0f7a72" }]);
  drawLineChart($("#coin-rate-chart"), [{ points: result.ratePoints, color: "#315ea8" }], { minY: 0, maxY: 1, referenceY: 0.5 });
  const prediction = $("input[name='coin-prediction']:checked")?.value;
  const mood = result.totalProfit > 0 ? "רווח" : result.totalProfit < 0 ? "הפסד" : "אפס";
  $("#coin-explanation").innerHTML = `
    <p><strong>התוצאה הפעם:</strong> ${mood}. הבחירה שלך לפני הסימולציה: ${predictionText(prediction)}.</p>
    <p>במשחק יחיד אי אפשר לדעת מה יקרה. גם אחרי עשרות הטלות ייתכן רווח או הפסד משמעותי.</p>
    <p>במשחק הוגן, ככל שמספר ההטלות גדל, הרווח הממוצע להטלה נוטה להתקרב לאפס. ההתקרבות לתוחלת אינה מבטיחה שהרווח המצטבר יהיה בדיוק אפס.</p>
  `;
}

function predictionText(value) {
  return ({ profit: "ארוויח", loss: "אפסיד", near: "אסיים קרוב לאפס", unknown: "אי אפשר לדעת" })[value] || "";
}

async function runCoin(event) {
  event?.preventDefault();
  const rounds = getCoinRounds();
  const display = $("#coin-display").value;
  $("#coin-progress").classList.toggle("hidden", rounds < 20000);
  $("#coin-progress").value = 30;
  if (rounds <= 10 && display !== "instant") {
    $("#coin-animation").classList.add("spin");
    await new Promise(resolve => setTimeout(resolve, 300));
    $("#coin-animation").classList.remove("spin");
  }
  const result = simulateCoin({ rounds, rng });
  $("#coin-animation").textContent = result.results.at(-1) || "עץ";
  $("#coin-progress").value = 100;
  renderCoin(result);
  setTimeout(() => $("#coin-progress").classList.add("hidden"), 250);
}

function resetCoin() {
  const result = simulateCoin({ rounds: 0, rng });
  renderCoin({ ...result, profitPoints: [{ x: 0, y: 0 }], ratePoints: [{ x: 0, y: 0 }] });
  $("#coin-explanation").innerHTML = "<p>בחרו מספר הטלות והפעילו סימולציה.</p>";
}

function updateLab() {
  const win = Number($("#lab-win").value);
  const loss = Number($("#lab-loss").value);
  const prob = Number($("#lab-prob").value) / 100;
  const ev = coinEV(win, loss, prob);
  $("#lab-prob-label").textContent = pct.format(prob);
  $("#lab-formula").textContent = `${prob.toFixed(2)} × ${win} + ${(1 - prob).toFixed(2)} × (${loss}) = ${ev.toFixed(2)}`;
  const kind = ev > 0.001 ? "משחק עם תוחלת חיובית" : ev < -0.001 ? "משחק עם תוחלת שלילית" : "משחק הוגן";
  $("#lab-kind").innerHTML = `<p><strong>${kind}.</strong> תוחלת אינה הבטחה. היא ממוצע צפוי על פני מספר רב של ניסיונות.</p>`;
}

function runLab() {
  const result = simulateCoin({
    rounds: clamp(Number($("#lab-rounds").value), 1, 100000),
    winAmount: Number($("#lab-win").value),
    lossAmount: Number($("#lab-loss").value),
    winProbability: Number($("#lab-prob").value) / 100,
    rng,
  });
  renderCoin(result);
}

const rouletteState = { balance: 1000, initial: 1000, historyBalance: [{ x: 0, y: 1000 }], historyActual: [{ x: 0, y: 0 }], historyExpected: [{ x: 0, y: 0 }], rounds: 0 };

function getRouletteBet() {
  const select = $("#roulette-bet").value;
  const amount = select === "custom" ? Number($("#roulette-custom").value) : Number(select);
  return clamp(amount, 1, rouletteState.balance);
}

function updateRouletteEV() {
  const amount = getRouletteBet();
  const type = $("#roulette-bet-type").value;
  const ev = rouletteEV(type, amount);
  $("#roulette-ev").textContent = `תוחלת = ${ev.toFixed(2)} ש"ח לסיבוב. שיעור הפסד צפוי: ${Math.abs(ev / amount * 100).toFixed(2)}%`;
  $("#single-number-wrap").classList.toggle("hidden", type !== "single");
}

function renderRoulette(result) {
  $("#roulette-stats").innerHTML = [
    stat("הון התחלתי", `${ils.format(result.startingBalance)} ש"ח`),
    stat("יתרה נוכחית", `${ils.format(result.balance)} ש"ח`),
    stat("רווח/הפסד מצטבר", `${ils.format(result.profit)} ש"ח`),
    stat("מספר סיבובים", ils.format(result.rounds)),
    stat("סך כל הסכומים שהושקעו", `${ils.format(result.totalStaked)} ש"ח`),
    stat("זכיות", ils.format(result.wins)),
    stat("הפסדים", ils.format(result.losses)),
    stat("שיעור זכייה בפועל", pct.format(result.winRate)),
    stat("תוחלת לסיבוב", `${ils.format(result.evPerBet)} ש"ח`),
    stat("הפסד צפוי מצטבר", `${ils.format(result.expectedLoss)} ש"ח`),
    stat("פער מהתוחלת", `${ils.format(result.gapFromEV)} ש"ח`),
    stat("פעמים ברווח", ils.format(result.profitTimes)),
    stat("שיא יתרה", `${ils.format(result.high)} ש"ח`),
    stat("סיכון התרוששות בסימולציה", result.ruinRiskObserved ? "התממש" : "לא התממש"),
  ].join("");
  drawLineChart($("#roulette-balance-chart"), [{ points: rouletteState.historyBalance, color: "#0f7a72" }]);
  drawLineChart($("#roulette-expected-chart"), [
    { points: rouletteState.historyActual, color: "#315ea8" },
    { points: rouletteState.historyExpected, color: "#b9364b" },
  ]);
  $("#roulette-explanation").innerHTML = `
    <p>בהימור ${result.typeLabel}, בממוצע לאורך מספר עצום של משחקים, השחקן צפוי להפסיד כ-${Math.abs(result.evPerBet).toFixed(2)} ש"ח לכל סיבוב בסכום שנבחר.</p>
    <p>ככל שמשחק בעל תוחלת שלילית חוזר פעמים רבות יותר, כך גדלה השפעת היתרון המתמטי של מפעיל המשחק.</p>
  `;
}

function runRoulette(event) {
  event?.preventDefault();
  if (rouletteState.balance <= 0) {
    $("#roulette-explanation").innerHTML = "<p>היתרה הגיעה לאפס, לכן אי אפשר להמשיך בסימולציה זו. אפשר לאפס ולהתחיל מחדש.</p>";
    return;
  }
  const betAmount = getRouletteBet();
  const rounds = Number($("#roulette-mode").value);
  const result = simulateRoulette({
    rounds,
    startingBalance: rouletteState.initial,
    balance: rouletteState.balance,
    betAmount,
    type: $("#roulette-bet-type").value,
    singleNumber: Number($("#single-number").value),
    rng,
  });
  rouletteState.balance = result.balance;
  rouletteState.rounds += result.rounds;
  rouletteState.historyBalance = rouletteState.historyBalance.concat(result.balancePoints.slice(1).map(p => ({ x: rouletteState.historyBalance.length + p.x - 1, y: p.y }))).slice(-650);
  rouletteState.historyActual = rouletteState.historyActual.concat(result.actualPoints.slice(1).map(p => ({ x: rouletteState.historyActual.length + p.x - 1, y: p.y }))).slice(-650);
  rouletteState.historyExpected = rouletteState.historyExpected.concat(result.expectedPoints.slice(1).map(p => ({ x: rouletteState.historyExpected.length + p.x - 1, y: p.y }))).slice(-650);
  renderRoulette(result);
  updateRouletteEV();
}

function resetRoulette() {
  rouletteState.balance = 1000;
  rouletteState.rounds = 0;
  rouletteState.historyBalance = [{ x: 0, y: 1000 }];
  rouletteState.historyActual = [{ x: 0, y: 0 }];
  rouletteState.historyExpected = [{ x: 0, y: 0 }];
  drawLineChart($("#roulette-balance-chart"), [{ points: rouletteState.historyBalance, color: "#0f7a72" }]);
  drawLineChart($("#roulette-expected-chart"), [{ points: rouletteState.historyActual, color: "#315ea8" }, { points: rouletteState.historyExpected, color: "#b9364b" }]);
  $("#roulette-stats").innerHTML = stat("יתרה נוכחית", "1,000 ש\"ח");
  $("#roulette-explanation").innerHTML = "<p>בחרו הימור וסובבו. אין כאן שימוש בכסף אמיתי.</p>";
  updateRouletteEV();
}

function runDistribution() {
  const betAmount = getRouletteBet();
  const rounds = Number($("#roulette-mode").value);
  const dist = simulateRouletteDistribution({
    players: 1000,
    rounds,
    startingBalance: 1000,
    betAmount,
    type: $("#roulette-bet-type").value,
    singleNumber: Number($("#single-number").value),
    rng,
  });
  drawHistogram($("#roulette-hist-chart"), dist.finals);
  const avg = dist.finals.reduce((a, b) => a + b, 0) / dist.finals.length;
  $("#distribution-summary").innerHTML = `
    <div class="stats-grid">
      ${stat("ממוצע", `${ils.format(avg)} ש"ח`)}
      ${stat("חציון", `${ils.format(median(dist.finals))} ש"ח`)}
      ${stat("הטובה ביותר", `${ils.format(Math.max(...dist.finals))} ש"ח`)}
      ${stat("הגרועה ביותר", `${ils.format(Math.min(...dist.finals))} ש"ח`)}
      ${stat("סיימו ברווח", pct.format(dist.profit / 1000))}
      ${stat("איבדו הכל", pct.format(dist.ruined / 1000))}
    </div>
    <div class="explanation"><p>ייתכן שחלק מהשחקנים יסיימו ברווח, אף שהתוצאה הממוצעת של כלל השחקנים תהיה הפסד.</p></div>
  `;
}

let riskIndex = 0;
const riskChoices = [];

function renderRisk() {
  const q = riskQuestions[riskIndex];
  if (!q) {
    const risky = riskChoices.filter(c => c === "b").length;
    const profile = risky <= 2 ? "נטייה להעדיף ודאות" : risky >= 6 ? "נטייה לבחור באפשרויות מסוכנות" : "נטייה מעורבת";
    $("#risk-card").innerHTML = `<h2>סיכום אישי</h2><p><strong>${profile}</strong></p><p>זהו משחק לימודי קטן, ולא מבחן אישיות אמיתי.</p><button id="risk-reset">התחלה מחדש</button>`;
    $("#risk-reset").addEventListener("click", () => { riskIndex = 0; riskChoices.length = 0; renderRisk(); });
    return;
  }
  $("#risk-card").innerHTML = `
    <h2>שאלה ${riskIndex + 1} מתוך ${riskQuestions.length}</h2>
    <div class="choice-buttons">
      <button data-risk="a">אפשרות א: ${q.a}</button>
      <button data-risk="b">אפשרות ב: ${q.b}</button>
      <button data-risk="n">קשה לי לבחור</button>
    </div>
    <div id="risk-feedback"></div>
  `;
  $$("[data-risk]").forEach(button => button.addEventListener("click", () => {
    riskChoices.push(button.dataset.risk);
    $("#risk-feedback").innerHTML = `
      <div class="explanation">
        <p>תוחלת אפשרות א: ${q.evA} ש"ח. תוחלת אפשרות ב: ${q.evB} ש"ח.</p>
        <p>מדוע בחרת כך? האם העדפת ביטחון? האם הסיכוי לזכות בסכום גדול משך אותך?</p>
        <p>${riskExplanation(q.theme)}</p>
      </div>
      <button id="risk-next" class="primary">המשך</button>
    `;
    $("#risk-next").addEventListener("click", () => { riskIndex += 1; renderRisk(); });
  }));
}

function riskExplanation(theme) {
  if (theme === "equal") return "כאשר התוחלת זהה, הבחירה יכולה לרמוז על שנאת סיכון, ניטרליות לסיכון או אהבת סיכון.";
  if (theme === "loss") return "היחס לסיכון יכול להשתנות כאשר מדובר ברווחים לעומת הפסדים.";
  if (theme === "big-risk") return "לתוחלת גבוהה יותר אין משמעות שהבחירה בהגרלה מתאימה לכל אדם. גם גודל הסיכון חשוב.";
  return "את איכות ההחלטה בוחנים לפי המידע שהיה לפני המשחק, ולא רק לפי מה שקרה אחריו.";
}

function runRepeat() {
  const one = simulateCoin({ rounds: 1, rng });
  const tenPlayers = Array.from({ length: 100 }, () => simulateCoin({ rounds: 10, rng }).averageProfit);
  const thousandPlayers = Array.from({ length: 100 }, () => simulateCoin({ rounds: 1000, rng }).averageProfit);
  const avg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
  const sd10 = Math.sqrt(tenPlayers.reduce((s, v) => s + (v - avg(tenPlayers)) ** 2, 0) / tenPlayers.length);
  const sd1000 = Math.sqrt(thousandPlayers.reduce((s, v) => s + (v - avg(thousandPlayers)) ** 2, 0) / thousandPlayers.length);
  $("#repeat-results").innerHTML = [
    stat("שחקן אחד, פעם אחת", `${ils.format(one.totalProfit)} ש"ח`),
    stat("100 שחקנים × 10", `ממוצע ${ils.format(avg(tenPlayers))}`),
    stat("פיזור ב-10 משחקים", `${ils.format(sd10)}`),
    stat("100 שחקנים × 1,000", `ממוצע ${ils.format(avg(thousandPlayers))}`),
    stat("פיזור ב-1,000 משחקים", `${ils.format(sd1000)}`),
  ].join("");
}

let quizIndex = 0;
let quizScore = 0;

function renderQuiz() {
  const q = quizQuestions[quizIndex];
  if (!q) {
    $("#quiz-box").innerHTML = `<h2>סיימת!</h2><p>ענית נכון על ${quizScore} מתוך ${quizQuestions.length}.</p><p>זכייה אפשרית אינה מעידה שהמשחק משתלם לאורך זמן.</p><button id="quiz-reset">התחלה מחדש</button>`;
    $("#quiz-reset").addEventListener("click", () => { quizIndex = 0; quizScore = 0; renderQuiz(); });
    return;
  }
  $("#quiz-box").innerHTML = `<h2>שאלה ${quizIndex + 1}</h2><p>${q.q}</p>${q.options.map((o, i) => `<button class="quiz-option" data-answer="${i}">${o}</button>`).join("")}<div id="quiz-feedback"></div>`;
  $$(".quiz-option").forEach(button => button.addEventListener("click", () => {
    const correct = Number(button.dataset.answer) === q.correct;
    if (correct) quizScore += 1;
    $("#quiz-feedback").innerHTML = `<div class="explanation"><p><strong>${correct ? "נכון" : "לא מדויק"}.</strong> ${q.why}</p></div><button id="quiz-next" class="primary">המשך</button>`;
    $$(".quiz-option").forEach(b => b.disabled = true);
    $("#quiz-next").addEventListener("click", () => { quizIndex += 1; renderQuiz(); });
  }));
}

function bindEvents() {
  $("#coin-rounds").addEventListener("change", () => $("#coin-custom-wrap").classList.toggle("hidden", $("#coin-rounds").value !== "custom"));
  $("#coin-form").addEventListener("submit", runCoin);
  $("#coin-reset").addEventListener("click", resetCoin);
  ["#lab-win", "#lab-loss", "#lab-prob", "#lab-rounds"].forEach(id => $(id).addEventListener("input", updateLab));
  $("#lab-run").addEventListener("click", runLab);
  $("#roulette-form").addEventListener("submit", runRoulette);
  $("#roulette-reset").addEventListener("click", resetRoulette);
  $("#distribution-run").addEventListener("click", runDistribution);
  ["#roulette-bet-type", "#roulette-bet", "#roulette-custom", "#single-number"].forEach(id => $(id).addEventListener("input", updateRouletteEV));
  $("#roulette-bet").addEventListener("change", () => $("#roulette-custom-wrap").classList.toggle("hidden", $("#roulette-bet").value !== "custom"));
  $("#repeat-run").addEventListener("click", runRepeat);
  $$(".fallacy-answer").forEach(button => button.addEventListener("click", () => {
    $("#fallacy-feedback").innerHTML = `<p><strong>${button.dataset.correct === "true" ? "נכון" : "לא."}</strong> התשובה היא בדיוק 50%, בהנחה שהמטבע הוגן וכל הטלה עצמאית. המטבע אינו זוכר את התוצאות הקודמות.</p><p>גם ברולטה: אם אדום יצא שש פעמים ברציפות, אין פירוש הדבר ששחור חייב לצאת עכשיו.</p>`;
  }));
}

function init() {
  bindNavigation();
  bindEvents();
  updateLab();
  resetCoin();
  resetRoulette();
  renderRisk();
  renderQuiz();
}

init();

window.educationalApp = { coinEV, rouletteEV, simulateCoin, simulateRoulette, variance, stdDev, rng };
