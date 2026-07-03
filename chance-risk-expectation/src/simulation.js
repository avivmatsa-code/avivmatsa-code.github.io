import { expectedValue, sampleSeries } from "./math.js";

export function coinEV(winAmount = 10, lossAmount = -10, winProbability = 0.5) {
  return expectedValue([
    { probability: winProbability, payoff: winAmount },
    { probability: 1 - winProbability, payoff: lossAmount },
  ]);
}

export function simulateCoin({ rounds, winAmount = 10, lossAmount = -10, winProbability = 0.5, rng }) {
  let wins = 0;
  let losses = 0;
  let balance = 0;
  let high = 0;
  let low = 0;
  let currentWinRun = 0;
  let currentLossRun = 0;
  let longestWinRun = 0;
  let longestLossRun = 0;
  const profitPoints = [{ x: 0, y: 0 }];
  const ratePoints = [{ x: 0, y: 0 }];
  const results = [];

  for (let i = 1; i <= rounds; i += 1) {
    const win = rng.next() < winProbability;
    if (win) {
      wins += 1;
      balance += winAmount;
      currentWinRun += 1;
      currentLossRun = 0;
    } else {
      losses += 1;
      balance += lossAmount;
      currentLossRun += 1;
      currentWinRun = 0;
    }
    longestWinRun = Math.max(longestWinRun, currentWinRun);
    longestLossRun = Math.max(longestLossRun, currentLossRun);
    high = Math.max(high, balance);
    low = Math.min(low, balance);
    if (rounds <= 250) results.push(win ? "עץ" : "פלי");
    profitPoints.push({ x: i, y: balance });
    ratePoints.push({ x: i, y: wins / i });
  }

  return {
    rounds,
    wins,
    losses,
    winRate: rounds ? wins / rounds : 0,
    totalProfit: balance,
    averageProfit: rounds ? balance / rounds : 0,
    longestWinRun,
    longestLossRun,
    high,
    low,
    results,
    ev: coinEV(winAmount, lossAmount, winProbability),
    profitPoints: sampleSeries(profitPoints),
    ratePoints: sampleSeries(ratePoints),
  };
}

export const redNumbers = new Set([1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]);

export function rouletteBetSpec(type, betAmount, singleNumber = 7) {
  if (type === "single") {
    return { label: `מספר ${singleNumber}`, wins: 1, losses: 36, multiplier: 35, win: n => n === singleNumber };
  }
  if (type === "dozen1") return { label: "תריסר 1-12", wins: 12, losses: 25, multiplier: 2, win: n => n >= 1 && n <= 12 };
  if (type === "dozen2") return { label: "תריסר 13-24", wins: 12, losses: 25, multiplier: 2, win: n => n >= 13 && n <= 24 };
  if (type === "dozen3") return { label: "תריסר 25-36", wins: 12, losses: 25, multiplier: 2, win: n => n >= 25 && n <= 36 };
  if (type === "black") return { label: "שחור", wins: 18, losses: 19, multiplier: 1, win: n => n !== 0 && !redNumbers.has(n) };
  return { label: "אדום", wins: 18, losses: 19, multiplier: 1, win: n => redNumbers.has(n) };
}

export function rouletteEV(type, betAmount) {
  const spec = rouletteBetSpec(type, betAmount);
  return expectedValue([
    { probability: spec.wins / 37, payoff: betAmount * spec.multiplier },
    { probability: spec.losses / 37, payoff: -betAmount },
  ]);
}

export function simulateRoulette({ rounds, startingBalance = 1000, balance = startingBalance, betAmount, type, singleNumber = 7, rng }) {
  const spec = rouletteBetSpec(type, betAmount, singleNumber);
  if (betAmount > balance) throw new Error("לא ניתן להמר מעל גובה היתרה.");
  let current = balance;
  let wins = 0;
  let losses = 0;
  let totalStaked = 0;
  let profitTimes = 0;
  let high = current;
  let ruined = false;
  const initial = balance;
  const balancePoints = [{ x: 0, y: current }];
  const actualPoints = [{ x: 0, y: 0 }];
  const expectedPoints = [{ x: 0, y: 0 }];
  const evPerBet = rouletteEV(type, betAmount);

  for (let i = 1; i <= rounds; i += 1) {
    if (current <= 0 || betAmount > current) {
      ruined = current <= 0;
      break;
    }
    const number = rng.int(37);
    const didWin = spec.win(number);
    totalStaked += betAmount;
    if (didWin) {
      wins += 1;
      current += betAmount * spec.multiplier;
    } else {
      losses += 1;
      current -= betAmount;
    }
    if (current > initial) profitTimes += 1;
    high = Math.max(high, current);
    if (current <= 0) ruined = true;
    const played = wins + losses;
    balancePoints.push({ x: played, y: current });
    actualPoints.push({ x: played, y: current - initial });
    expectedPoints.push({ x: played, y: played * evPerBet });
  }

  const played = wins + losses;
  const expectedLoss = -evPerBet * played;
  return {
    startingBalance: initial,
    balance: Math.max(0, current),
    profit: current - initial,
    rounds: played,
    totalStaked,
    wins,
    losses,
    winRate: played ? wins / played : 0,
    evPerBet,
    expectedLoss,
    gapFromEV: (current - initial) - (played * evPerBet),
    profitTimes,
    high,
    ruinRiskObserved: ruined ? 1 : 0,
    typeLabel: spec.label,
    balancePoints: sampleSeries(balancePoints),
    actualPoints: sampleSeries(actualPoints),
    expectedPoints: sampleSeries(expectedPoints),
  };
}

export function simulateRouletteDistribution({ players = 1000, rounds, startingBalance = 1000, betAmount, type, singleNumber = 7, rng }) {
  const finals = [];
  let ruined = 0;
  let profit = 0;
  for (let i = 0; i < players; i += 1) {
    const result = simulateRoulette({ rounds, startingBalance, balance: startingBalance, betAmount, type, singleNumber, rng });
    finals.push(result.balance);
    if (result.balance <= 0) ruined += 1;
    if (result.balance > startingBalance) profit += 1;
  }
  return { finals, ruined, profit };
}
