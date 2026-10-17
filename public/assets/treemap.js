import { fetchProgress, readProgressSource } from './progress-data.js';
import { parseUnits, imageModel, treemapSvg, paintTreemap } from './treemap-data.js';

const element = (tag, cls, text) => { const node = document.createElement(tag); if (cls) node.className = cls; if (text !== undefined) node.textContent = text; return node; };
const download = (blob, name) => {
  const url = URL.createObjectURL(blob); const anchor = document.createElement('a'); anchor.href = url; anchor.download = name; document.body.append(anchor); anchor.click(); anchor.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
};
const markdownText = value => String(value).replace(/[\\\[\]_*`]/g, '\\$&');
const reveal = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add('is-visible'); reveal.unobserve(entry.target); }
}, { threshold: .15 }) : null;
for (const widget of document.querySelectorAll('[data-treemap]')) {
  const disclosure = widget.querySelector('details');
  const status = widget.querySelector('[data-map-status]');
  const result = widget.querySelector('[data-map-result]');
  const retry = widget.querySelector('[data-map-retry]');
  let loaded = false; let loading = false;
  async function load() {
    if (loading) return;
    loading = true; retry.hidden = true; result.replaceChildren(); widget.setAttribute('aria-busy', 'true');
    status.textContent = 'Loading and verifying the entire-project unit report…';
    const controller = new AbortController(); const timeout = setTimeout(() => controller.abort(), 20000);
    const context = { provider: 'decomp-dev', owner: widget.dataset.owner, repo: widget.dataset.repo, version: widget.dataset.version };
    try {
      const overview = await fetchProgress(context, controller.signal);
      const source = `https://decomp.dev/${encodeURIComponent(context.owner)}/${encodeURIComponent(context.repo)}/${encodeURIComponent(context.version)}/${overview.commit}.json?mode=report`;
      const report = parseUnits(JSON.parse(await readProgressSource(source, controller.signal, 16 * 1024 * 1024)), overview);
      if (!report.units.length) { status.textContent = 'This report has no measurable code units. No treemap can be drawn; use the original board for context.'; loaded = true; return; }
      const historical = widget.dataset.boardDisabled === 'true' || Date.now() - Date.parse(overview.timestamp) > 30 * 86400000;
      const model = imageModel(report, { ...context, title: widget.dataset.projectTitle, timestamp: overview.timestamp, commit: overview.commit, historical });
      const svgText = treemapSvg(model);
      const svg = new DOMParser().parseFromString(svgText, 'image/svg+xml').documentElement;
      svg.setAttribute('role', 'group');
      svg.classList.add('unit-treemap');
      const figure = element('figure', 'treemap-figure'); figure.append(document.importNode(svg, true));
      const readout = element('p', 'treemap-readout', 'Hover, focus, or tap a tile to inspect its exact matching count.'); readout.setAttribute('role', 'status');
      const tiles = [...figure.querySelectorAll('[data-tile]')];
      const inspect = index => {
        for (const tile of tiles) { tile.setAttribute('tabindex', tile.dataset.tile === String(index) ? '0' : '-1'); tile.classList.toggle('tile-selected', tile.dataset.tile === String(index)); }
        const tile = model.tiles[index];
        readout.textContent = `${tile.name} · ${new Intl.NumberFormat('en-US').format(tile.matching)} / ${new Intl.NumberFormat('en-US').format(tile.total)} matching code bytes · ${tile.percent.toFixed(2)}%`;
      };
      tiles.forEach((tile, index) => {
        tile.setAttribute('tabindex', index ? '-1' : '0'); tile.setAttribute('role', 'img'); tile.setAttribute('aria-label', tile.querySelector('title').textContent);
        for (const event of ['mouseenter', 'focus', 'click']) tile.addEventListener(event, () => inspect(index));
        tile.addEventListener('keydown', event => {
          const move = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
          if (!move && !['Home', 'End', 'Enter', ' '].includes(event.key)) return;
          event.preventDefault(); const next = event.key === 'Home' ? 0 : event.key === 'End' ? tiles.length - 1 : move ? (index + move + tiles.length) % tiles.length : index;
          inspect(next); tiles[next].focus();
        });
      });
      const legend = element('div', 'map-legend');
      for (const [cls, text] of [['unmatched', '0% matching'], ['partial', 'Partially matching'], ['complete', '100% matching']]) legend.append(element('span', cls, text));
      const actions = element('div', 'map-export-actions');
      const svgButton = element('button', 'button secondary', 'Download SVG'); const pngButton = element('button', 'button secondary', 'Download PNG'); const copy = element('button', 'button secondary', 'Copy Markdown');
      const label = element('label', 'map-markdown-label', 'GitHub Markdown'); const markdown = element('textarea', 'map-markdown'); markdown.readOnly = true; markdown.id = 'map-markdown'; label.htmlFor = markdown.id;
      const filename = `${widget.dataset.slug}-progress-${context.version}-${overview.commit.slice(0, 7)}`.replace(/[^a-zA-Z0-9._-]/g, '-');
      const setMarkdown = format => { markdown.value = `![${markdownText(widget.dataset.projectTitle)} matching code map](${filename}.${format})\n\nBy [${markdownText(context.owner)} & contributors](https://github.com/${context.owner}/${context.repo}) · Report ${overview.timestamp.slice(0, 10)}${historical ? ' · Historical report' : ''}. [Source](https://decomp.dev/${context.owner}/${context.repo}).`; };
      setMarkdown('svg');
      svgButton.type = pngButton.type = copy.type = 'button';
      svgButton.addEventListener('click', () => { setMarkdown('svg'); download(new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' }), `${filename}.svg`); });
      pngButton.addEventListener('click', async () => {
        pngButton.disabled = true;
        try {
          const canvas = document.createElement('canvas'); paintTreemap(canvas, model);
          const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png')); if (!blob) throw new Error('PNG export unavailable');
          setMarkdown('png'); download(blob, `${filename}.png`);
        } catch { status.textContent = 'PNG export is unavailable in this browser. Download the portable SVG instead.'; }
        finally { pngButton.disabled = false; }
      });
      copy.addEventListener('click', async () => { try { await navigator.clipboard.writeText(markdown.value); copy.textContent = 'Markdown copied'; } catch { copy.textContent = 'Select the Markdown below to copy'; markdown.focus(); markdown.select(); } });
      actions.append(svgButton, pngButton, copy);
      result.append(legend, figure, readout, actions, element('p', 'small map-export-note', 'The tile area is 1200 × 600 (2:1); the exported file adds an 80px credit caption. Exports are standalone snapshots, labeled NON-LIVE DATA. Download an image, add it beside your README or upload it to GitHub, then use the Markdown below. Adjust the path if you put it in another folder.'), label, markdown);
      if (reveal) reveal.observe(figure);
      const sourceLink = element('a', 'text-link', 'Original unit report ↗'); sourceLink.href = source; result.append(sourceLink);
      status.textContent = `LIVE DATA · ${report.units.length} code units · Entire project · ${context.version}${historical ? ' · HISTORICAL REPORT' : ''}. Unit totals verified against commit ${overview.commit.slice(0, 7)}.`;
      loaded = true;
    } catch {
      status.textContent = 'The unit report could not be loaded or verified. Retry, or use the upstream board linked above.'; retry.hidden = false;
    } finally { clearTimeout(timeout); loading = false; widget.setAttribute('aria-busy', 'false'); }
  }
  disclosure.addEventListener('toggle', () => { if (disclosure.open && !loaded) load(); });
  retry.addEventListener('click', load);
  if (new URLSearchParams(location.search).get('map') === '1') disclosure.open = true;
}
