import { fetchProgress } from './progress-data.js';

const element = (tag, cls, text) => { const node = document.createElement(tag); node.className = cls; if (text !== undefined) node.textContent = text; return node; };
const reveal = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add('is-visible'); reveal.unobserve(entry.target); }
}, { threshold: .15 }) : null;
async function loadCard(card) {
  const context = { provider: card.dataset.cardProgressProvider, owner: card.dataset.owner, repo: card.dataset.repo, version: card.dataset.version };
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  card.setAttribute('aria-busy', 'true');
  try {
    const report = await fetchProgress(context, controller.signal);
    const code = report.code;
    const summary = element('div', 'card-metrics');
    if (!code.total) summary.append(element('p', 'card-progress-state', 'Code total not measured.'));
    else {
      for (const [label, value, cls] of [['Matching', code.percent, 'matched'], ['Remaining', 100 - code.percent, 'remaining']]) {
        const stat = element('div', cls); stat.append(element('span', '', label), element('strong', '', `${value.toFixed(2)}%`)); summary.append(stat);
      }
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.classList.add('card-progress-track'); svg.setAttribute('viewBox', '0 0 100 6'); svg.setAttribute('preserveAspectRatio', 'none'); svg.setAttribute('role', 'img');
      const exact = `${new Intl.NumberFormat('en-US').format(code.matching)} matching and ${new Intl.NumberFormat('en-US').format(code.remaining)} remaining code bytes, target ${report.version}`;
      svg.setAttribute('aria-label', exact);
      const title = document.createElementNS(svg.namespaceURI, 'title'); title.textContent = exact; svg.append(title);
      let x = 0;
      for (const portion of [{ value: code.matching, cls: 'matched' }, { value: code.remaining, cls: 'remaining' }].filter(portion => portion.value > 0).sort((left, right) => right.value - left.value)) {
        const rect = document.createElementNS(svg.namespaceURI, 'rect');
        for (const [name, value] of Object.entries({ x, y: 0, width: portion.value / code.total * 100, height: 6, class: portion.cls })) rect.setAttribute(name, value);
        svg.append(rect); x += portion.value / code.total * 100;
      }
      summary.append(svg);
    }
    const historical = card.dataset.boardDisabled === 'true' || Date.now() - Date.parse(report.timestamp) > 30 * 86400000;
    const note = element('span', 'card-report-note', `Report ${report.timestamp.slice(0, 10)} · ${historical ? 'historical' : 'latest available'}`);
    note.classList.toggle('is-historical', historical);
    const label = element('span', 'card-data-label', 'LIVE DATA · CODE BYTES');
    card.replaceChildren(summary, note, label);
    if (reveal) reveal.observe(summary);
  } catch {
    card.replaceChildren(element('p', 'card-progress-state', 'Progress unavailable.'), element('span', 'card-report-note', 'Open the project to retry or read upstream sources.'));
  } finally { clearTimeout(timeout); card.setAttribute('aria-busy', 'false'); }
}
for (const card of document.querySelectorAll('[data-card-progress-provider]')) loadCard(card);
