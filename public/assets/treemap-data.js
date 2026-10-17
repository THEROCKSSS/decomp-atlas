import { breakdown } from './progress-data.js';

const escape = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[character]);
const number = value => new Intl.NumberFormat('en-US').format(value);
const percent = value => value === null ? 'Not measured' : `${value.toFixed(2)}%`;
export function parseUnits(report, overview) {
  if (report?.version !== 2 || !Array.isArray(report.units) || report.units.length > 10000) throw new Error('Unsupported unit report');
  if (!report.measures || typeof report.measures !== 'object') throw new Error('Missing report totals');
  const code = breakdown(report.measures.total_code === undefined ? 0 : report.measures.total_code, report.measures.matched_code === undefined ? 0 : report.measures.matched_code);
  if (code.total !== overview.code.total || code.matching !== overview.code.matching) throw new Error('Unit report differs from the selected overview');
  const names = new Set(); let total = 0; let matching = 0;
  const units = report.units.map(unit => {
    if (typeof unit.name !== 'string' || !unit.name.trim() || unit.name.length > 512 || /[\u0000-\u001f\u007f]/.test(unit.name) || names.has(unit.name) || !unit.measures || typeof unit.measures !== 'object') throw new Error('Invalid or duplicate unit');
    names.add(unit.name);
    // Objdiff protobuf JSON omits zero scalar fields in full unit reports.
    const measure = breakdown(unit.measures.total_code === undefined ? 0 : unit.measures.total_code, unit.measures.matched_code === undefined ? 0 : unit.measures.matched_code);
    total += measure.total; matching += measure.matching;
    if (!Number.isSafeInteger(total) || !Number.isSafeInteger(matching)) throw new Error('Unit totals outside supported range');
    return { name: unit.name, ...measure };
  }).filter(unit => unit.total > 0).sort((left, right) => right.total - left.total || (left.name < right.name ? -1 : left.name > right.name ? 1 : 0));
  if (total !== code.total || matching !== code.matching) throw new Error('Unit totals do not reconcile');
  return { units, code };
}
export function layoutUnits(units, width = 1200, height = 600) {
  if (![width, height].every(value => Number.isFinite(value) && value > 0 && value <= 10000)) throw new Error('Invalid map dimensions');
  const ordered = units.map(unit => ({ ...unit, ...breakdown(unit.total, unit.matching) })).filter(unit => unit.total > 0).sort((left, right) => right.total - left.total || (left.name < right.name ? -1 : left.name > right.name ? 1 : 0));
  const tiles = [];
  function partition(items, x, y, w, h) {
    if (items.length === 1) { tiles.push({ ...items[0], x, y, width: w, height: h }); return; }
    const weight = items.reduce((sum, item) => sum + item.total, 0);
    let sum = 0; let cut = 1; let leftWeight = items[0].total; let difference = Infinity;
    for (let index = 0; index < items.length - 1; index++) {
      sum += items[index].total;
      if (Math.abs(weight / 2 - sum) < difference) { difference = Math.abs(weight / 2 - sum); cut = index + 1; leftWeight = sum; }
    }
    const share = leftWeight / weight;
    if (w >= h) {
      partition(items.slice(0, cut), x, y, w * share, h);
      partition(items.slice(cut), x + w * share, y, w * (1 - share), h);
    } else {
      partition(items.slice(0, cut), x, y, w, h * share);
      partition(items.slice(cut), x, y + h * share, w, h * (1 - share));
    }
  }
  if (ordered.length) partition(ordered, 0, 0, width, height);
  return tiles;
}
export function unitColor(unit) {
  if (!unit.matching) return '#303a3e';
  if (unit.matching === unit.total) return '#65d27b';
  const share = unit.matching / unit.total;
  const start = [40, 67, 77], end = [8, 127, 172];
  return `#${start.map((value, index) => Math.round(value + (end[index] - value) * share).toString(16).padStart(2, '0')).join('')}`;
}
export function imageModel(report, metadata) {
  const width = 1200, mapHeight = 600, height = 680;
  const short = (value, limit) => String(value).length > limit ? `${String(value).slice(0, limit - 1)}…` : String(value);
  const reportDate = new Date(metadata.timestamp).toISOString().slice(0, 10);
  const lines = [
    { text: short(`${metadata.title} · ${metadata.version}`, 70), x: 14, y: 624, size: 17, color: '#eef0f7', anchor: 'start' },
    { text: `${metadata.owner} & contributors`, x: 1186, y: 624, size: 14, color: '#b8becd', anchor: 'end' },
    { text: `${percent(report.code.percent)} matching · ${percent(report.code.percent === null ? null : 100 - report.code.percent)} remaining · Report ${reportDate} · NON-LIVE DATA${metadata.historical ? ' · HISTORICAL REPORT' : ''}`, x: 14, y: 647, size: 13, color: '#b8becd', anchor: 'start' },
    { text: `Area: code bytes · Color: exact matching · ${short(`decomp.dev/${metadata.owner}/${metadata.repo}`, 90)} · ${metadata.commit.slice(0, 7)}`, x: 14, y: 669, size: 12, color: '#a7adbf', anchor: 'start' }
  ];
  return { width, height, mapHeight, tiles: layoutUnits(report.units, width, mapHeight).map(unit => ({ ...unit, color: unitColor(unit) })), lines, metadata, code: report.code };
}
export function treemapSvg(model) {
  const precision = value => Number(value.toFixed(6));
  const title = `${model.metadata.title} matching code treemap`;
  const description = `By ${model.metadata.owner} & contributors. Target ${model.metadata.version}. Report ${model.metadata.timestamp}, commit ${model.metadata.commit}. Each tile is a unit; area measures code bytes, color fully matching bytes divided by total. This exported image is NON-LIVE DATA.`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${model.width}" height="${model.height}" viewBox="0 0 ${model.width} ${model.height}" role="img" aria-labelledby="map-title map-description"><title id="map-title">${escape(title)}</title><desc id="map-description">${escape(description)}</desc><rect width="${model.width}" height="${model.height}" fill="#171c24"/>${model.tiles.map((unit, index) => `<rect data-tile="${index}" x="${precision(unit.x)}" y="${precision(unit.y)}" width="${precision(unit.width)}" height="${precision(unit.height)}" fill="${unit.color}" stroke="#111820" stroke-width="0.75"><title>${escape(unit.name)}: ${number(unit.matching)} / ${number(unit.total)} matching bytes (${percent(unit.percent)})</title></rect>`).join('')}<g font-family="Arial,sans-serif">${model.lines.map(line => `<text x="${line.x}" y="${line.y}" fill="${line.color}" font-size="${line.size}" text-anchor="${line.anchor}">${escape(line.text)}</text>`).join('')}</g></svg>`;
}
export function paintTreemap(canvas, model) {
  canvas.width = model.width; canvas.height = model.height;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('PNG export is not supported by this browser');
  context.fillStyle = '#171c24'; context.fillRect(0, 0, model.width, model.height);
  context.strokeStyle = '#111820'; context.lineWidth = .75;
  for (const tile of model.tiles) { context.fillStyle = tile.color; context.fillRect(tile.x, tile.y, tile.width, tile.height); context.strokeRect(tile.x, tile.y, tile.width, tile.height); }
  for (const line of model.lines) { context.font = `${line.size}px Arial,sans-serif`; context.fillStyle = line.color; context.textAlign = line.anchor === 'end' ? 'right' : 'left'; context.fillText(line.text, line.x, line.y); }
}
