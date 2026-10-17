import { fetchProgress } from './progress-data.js';

const number = value => new Intl.NumberFormat('en-US').format(value);
const percent = value => value === null ? 'Not measured' : `${value.toFixed(2)}%`;
const date = value => `${new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'UTC' }).format(new Date(value))} UTC`;
const element = (tag, cls, text) => {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text !== undefined) node.textContent = text;
  return node;
};
const svgElement = (tag, attributes) => {
  const node = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [key, value] of Object.entries(attributes)) node.setAttribute(key, value);
  return node;
};
const reveal = 'IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches ? new IntersectionObserver(entries => {
  for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add('is-visible'); reveal.unobserve(entry.target); }
}, { threshold: .2 }) : null;
function chart(title, measure, unit) {
  const figure = element('figure', 'progress-chart');
  const heading = element('figcaption', 'chart-heading');
  heading.append(element('h4', '', title), element('strong', '', `${percent(measure.percent)} matching`));
  figure.append(heading);
  if (!measure.total) { figure.append(element('p', 'small', 'The report gives a zero total. A matching percentage cannot be measured.')); return figure; }
  const portions = [{ name: 'Matching', kind: 'matched', value: measure.matching }, { name: 'Remaining non-matching', kind: 'remaining', value: measure.remaining }].sort((left, right) => right.value - left.value);
  const track = svgElement('svg', { class: 'chart-track', viewBox: '0 0 1000 28', preserveAspectRatio: 'none', role: 'group', 'aria-label': `${title}: matching and all remaining ${unit}` });
  const readout = element('p', 'chart-tooltip');
  readout.setAttribute('aria-live', 'polite');
  readout.textContent = 'Hover, focus, or tap a segment for its exact count.';
  let offset = 0;
  for (const portion of portions.filter(part => part.value > 0)) {
    const share = portion.value / measure.total * 100;
    const label = `${portion.name}: ${number(portion.value)} of ${number(measure.total)} ${unit} (${percent(share)})`;
    const rect = svgElement('rect', { x: offset, y: 0, width: share * 10, height: 28, class: `chart-segment ${portion.kind}`, tabindex: '0', role: 'img', 'aria-label': label });
    const tooltip = svgElement('title', {}); tooltip.textContent = label; rect.append(tooltip);
    for (const event of ['mouseenter', 'focus', 'click']) rect.addEventListener(event, () => { readout.textContent = label; });
    track.append(rect); offset += share * 10;
  }
  figure.append(track);
  const legend = element('ul', 'chart-legend');
  for (const portion of portions) {
    const item = element('li', portion.kind);
    const label = element('span', 'chart-label', portion.name);
    item.append(label, element('strong', '', percent(portion.value / measure.total * 100)), element('small', '', `${number(portion.value)} ${unit}`));
    legend.append(item);
  }
  figure.append(legend, readout);
  reveal?.observe(figure);
  return figure;
}
function render(report, context) {
  const fragment = document.createDocumentFragment();
  const flags = element('div', 'report-flags');
  flags.append(element('span', 'data-label', 'LIVE DATA'));
  const historical = context.disabled || Date.now() - Date.parse(report.timestamp) > 30 * 86400000;
  if (historical) flags.append(element('span', 'report-historical', 'HISTORICAL REPORT'));
  fragment.append(flags, element('h3', 'report-scope', context.unit || 'Entire project'));
  const metadata = element('p', 'report-metadata', `Target: ${report.version} · Report: ${date(report.timestamp)}`);
  fragment.append(metadata);
  if (historical) fragment.append(element('p', 'report-warning', `${context.disabled ? 'This board is disabled. ' : ''}These graphs show an older upstream report. A successful live fetch does not establish current coverage.`));
  fragment.append(chart('Code bytes', report.code, 'bytes'));
  if (report.functions) fragment.append(chart('Functions', report.functions, 'functions'));
  else fragment.append(element('p', 'report-measure-note', `Function counts are not supplied by this source. ${context.provider === 'zelda' ? 'The code graph measures bytes across code, boot, and overlays.' : 'The code graph uses the upstream report’s byte totals.'}`));
  if (report.supplement) {
    const extra = element('div', 'report-supplement');
    extra.append(element('h4', '', report.supplement.label), element('strong', '', percent(report.supplement.percent)), element('p', 'small', `${number(report.supplement.value)} / ${number(report.supplement.total)} bytes. ${report.supplement.note}`));
    fragment.append(extra);
  }
  const definition = element('p', 'report-definition', 'Matching means fully matched bytes or functions. Remaining means the reported total minus matching; it includes code that has not been decompiled. Bytes and functions count progress differently.');
  fragment.append(definition);
  const sources = element('div', 'report-sources');
  for (const source of report.sources) {
    const anchor = element('a', '', `${source.label} ↗`); anchor.href = source.url; sources.append(anchor);
  }
  const commit = element('a', '', `Commit ${report.commit.slice(0, 7)} ↗`);
  commit.href = `https://github.com/${context.owner}/${context.repo}/commit/${report.commit}`;
  sources.append(commit); fragment.append(sources, element('p', 'report-fetched', `Fetched ${date(new Date())}. Report date is shown above.`));
  return fragment;
}
for (const widget of document.querySelectorAll('[data-progress-provider]')) {
  const status = widget.querySelector('[data-report-status]');
  const results = widget.querySelector('[data-report-results]');
  const retry = widget.querySelector('[data-report-retry]');
  const scope = widget.querySelector('#report-unit');
  const unit = new URLSearchParams(location.search).get('unit') || '';
  const supported = [...scope.options].some(option => option.value === unit);
  scope.value = supported ? unit : '';
  let notice = supported ? '' : 'Unknown unit; showing the entire project. ';
  let generation = 0; let active;
  function saveScope() {
    const url = new URL(location.href);
    if (scope.value) url.searchParams.set('unit', scope.value); else url.searchParams.delete('unit');
    history.replaceState(null, '', url.pathname + url.search + url.hash);
  }
  async function load() {
    active?.abort(); active = new AbortController();
    const controller = active;
    const request = ++generation;
    const signal = active.signal;
    const timer = setTimeout(() => controller.abort(), 12000);
    status.classList.remove('report-status-empty');
    status.textContent = `${notice}Loading the latest available upstream report…`;
    widget.setAttribute('aria-busy', 'true');
    results.querySelectorAll('.progress-chart').forEach(figure => reveal?.unobserve(figure));
    results.replaceChildren(); retry.hidden = true;
    const context = { provider: widget.dataset.progressProvider, owner: widget.dataset.progressOwner, repo: widget.dataset.progressRepo, version: widget.dataset.progressVersion, unit: scope.value, unitCommit: scope.selectedOptions[0]?.dataset.reportCommit, disabled: widget.dataset.boardDisabled === 'true' };
    try {
      const report = await fetchProgress(context, signal);
      if (request !== generation) return;
      results.replaceChildren(render(report, context));
      status.textContent = notice; status.classList.toggle('report-status-empty', !notice);
    } catch {
      if (request !== generation) return;
      status.classList.remove('report-status-empty');
      status.textContent = `${notice}The upstream report could not be loaded or verified. No percentage is shown. Retry, or use the original board and repository links below.`;
      retry.hidden = false;
    } finally {
      clearTimeout(timer);
      if (request === generation) widget.setAttribute('aria-busy', 'false');
    }
  }
  scope.addEventListener('change', () => { notice = ''; saveScope(); load(); });
  retry.addEventListener('click', load);
  window.addEventListener('popstate', () => {
    const requested = new URLSearchParams(location.search).get('unit') || '';
    const supported = [...scope.options].some(option => option.value === requested);
    scope.value = supported ? requested : '';
    notice = supported ? '' : 'Unknown unit; showing the entire project. ';
    saveScope(); load();
  });
  saveScope(); load();
}
