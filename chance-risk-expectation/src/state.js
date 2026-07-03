const KEY = "chance-risk-expectation-progress";

export function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

export function saveProgress(patch) {
  const next = { ...loadProgress(), ...patch, updatedAt: new Date().toISOString() };
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}
