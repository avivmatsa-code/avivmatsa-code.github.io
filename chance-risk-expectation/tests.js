import { RandomEngine } from "./src/random.js";
import { coinEV, rouletteEV, simulateCoin, simulateRoulette } from "./src/simulation.js";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function close(actual, expected, epsilon = 1e-9) {
  return Math.abs(actual - expected) <= epsilon;
}

export function runTests() {
  assert(close(coinEV(10, -10, 0.5), 0), "תוחלת משחק המטבע ההוגן צריכה להיות 0.");
  assert(close(rouletteEV("red", 10), -10 / 37), "תוחלת אדום ברולטה צריכה להיות -1/37 מסכום ההימור.");
  assert(close(rouletteEV("single", 10), -10 / 37), "תוחלת מספר יחיד ברולטה צריכה להיות -1/37 מסכום ההימור.");
  let threw = false;
  try {
    simulateRoulette({ rounds: 1, balance: 5, betAmount: 10, type: "red", rng: new RandomEngine("a") });
  } catch {
    threw = true;
  }
  assert(threw, "לא ניתן להמר מעל גובה היתרה.");
  const low = simulateRoulette({ rounds: 10, balance: 10, betAmount: 10, type: "single", rng: new RandomEngine("lose") });
  assert(low.balance >= 0, "היתרה אינה יכולה לרדת מתחת לאפס.");
  const coin = simulateCoin({ rounds: 100, rng: new RandomEngine("net") });
  assert(coin.totalProfit === (coin.wins * 10 - coin.losses * 10), "סכומי הרווח וההפסד צריכים להיות רווח נטו.");
  assert(coin.wins + coin.losses === coin.rounds, "סכום מספר הזכיות וההפסדים שווה למספר הסיבובים.");
  const a = simulateCoin({ rounds: 1000, rng: new RandomEngine("same-seed") });
  const b = simulateCoin({ rounds: 1000, rng: new RandomEngine("same-seed") });
  assert(JSON.stringify(a.profitPoints) === JSON.stringify(b.profitPoints), "תוצאות עם seed זהה צריכות להשתחזר.");
  [1, 10, 100, 1000, 100000].forEach(rounds => {
    const result = simulateCoin({ rounds, rng: new RandomEngine(`rounds-${rounds}`) });
    assert(result.wins + result.losses === rounds, `בדיקת ${rounds} סיבובים נכשלה.`);
  });
  return "כל הבדיקות עברו בהצלחה.";
}

if (typeof window !== "undefined") {
  window.runEducationalAppTests = runTests;
}

if (typeof process !== "undefined" && process.argv[1]?.endsWith("tests.js")) {
  console.log(runTests());
}
