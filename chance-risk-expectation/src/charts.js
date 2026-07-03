export function drawLineChart(canvas, series, options = {}) {
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  const pad = { l: 52, r: 20, t: 22, b: 38 };
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, w, h);
  const all = series.flatMap(s => s.points);
  if (!all.length) return;
  const minX = Math.min(...all.map(p => p.x));
  const maxX = Math.max(...all.map(p => p.x));
  let minY = Math.min(...all.map(p => p.y), options.minY ?? Infinity);
  let maxY = Math.max(...all.map(p => p.y), options.maxY ?? -Infinity);
  if (minY === maxY) { minY -= 1; maxY += 1; }
  const xScale = x => pad.l + ((x - minX) / Math.max(1, maxX - minX)) * (w - pad.l - pad.r);
  const yScale = y => h - pad.b - ((y - minY) / (maxY - minY)) * (h - pad.t - pad.b);

  ctx.strokeStyle = "#cfe1de";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i += 1) {
    const y = pad.t + i * ((h - pad.t - pad.b) / 4);
    ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(w - pad.r, y); ctx.stroke();
  }
  if (options.referenceY != null) {
    ctx.strokeStyle = "#e4a11b";
    ctx.setLineDash([8, 6]);
    ctx.beginPath(); ctx.moveTo(pad.l, yScale(options.referenceY)); ctx.lineTo(w - pad.r, yScale(options.referenceY)); ctx.stroke();
    ctx.setLineDash([]);
  }
  series.forEach(s => {
    ctx.strokeStyle = s.color || "#0f7a72";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    s.points.forEach((p, i) => {
      const x = xScale(p.x);
      const y = yScale(p.y);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  });
  ctx.fillStyle = "#536866";
  ctx.font = "13px Segoe UI";
  ctx.fillText(String(Math.round(maxY * 100) / 100), 8, pad.t + 4);
  ctx.fillText(String(Math.round(minY * 100) / 100), 8, h - pad.b);
  ctx.fillText(String(maxX), w - pad.r - 48, h - 10);
}

export function drawHistogram(canvas, values) {
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  const pad = { l: 42, r: 20, t: 18, b: 36 };
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, w, h);
  if (!values.length) return;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const bins = 24;
  const counts = Array.from({ length: bins }, () => 0);
  values.forEach(v => {
    const idx = Math.min(bins - 1, Math.floor(((v - min) / Math.max(1, max - min)) * bins));
    counts[idx] += 1;
  });
  const maxCount = Math.max(...counts);
  const barW = (w - pad.l - pad.r) / bins;
  counts.forEach((count, i) => {
    const bh = (count / maxCount) * (h - pad.t - pad.b);
    ctx.fillStyle = i % 2 ? "#315ea8" : "#0f7a72";
    ctx.fillRect(pad.l + i * barW + 2, h - pad.b - bh, barW - 4, bh);
  });
  ctx.fillStyle = "#536866";
  ctx.font = "13px Segoe UI";
  ctx.fillText(String(Math.round(min)), pad.l, h - 10);
  ctx.fillText(String(Math.round(max)), w - pad.r - 50, h - 10);
}
