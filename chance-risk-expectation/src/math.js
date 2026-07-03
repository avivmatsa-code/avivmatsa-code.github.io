export const ils = new Intl.NumberFormat("he-IL", { maximumFractionDigits: 2 });
export const pct = new Intl.NumberFormat("he-IL", { style: "percent", maximumFractionDigits: 2 });

export function expectedValue(outcomes) {
  return outcomes.reduce((sum, item) => sum + item.probability * item.payoff, 0);
}

export function variance(outcomes) {
  const ev = expectedValue(outcomes);
  return outcomes.reduce((sum, item) => sum + item.probability * ((item.payoff - ev) ** 2), 0);
}

export function stdDev(outcomes) {
  return Math.sqrt(variance(outcomes));
}

export function sampleSeries(points, maxPoints = 650) {
  if (points.length <= maxPoints) return points;
  const sampled = [];
  const step = (points.length - 1) / (maxPoints - 1);
  for (let i = 0; i < maxPoints; i += 1) sampled.push(points[Math.round(i * step)]);
  return sampled;
}

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function median(values) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}
