const variants = ['library', 'workbench', 'index'];
const params = new URLSearchParams(location.search);
let current = variants.includes(params.get('variant')) ? params.get('variant') : 'library';
let query = params.get('q') || '';
const validPlatforms = new Set([...document.querySelectorAll('[data-platform]')].map(button => button.dataset.platform));
let platform = validPlatforms.has(params.get('platform')) ? params.get('platform') : '';

function updateUrl() {
  const next = new URL(location.href);
  next.searchParams.set('variant', current);
  if (query) next.searchParams.set('q', query); else next.searchParams.delete('q');
  if (platform) next.searchParams.set('platform', platform); else next.searchParams.delete('platform');
  history.replaceState(null, '', next);
}
function applyFilters() {
  for (const prototype of document.querySelectorAll('[data-prototype]')) {
    let found = 0;
    for (const item of prototype.querySelectorAll('[data-item]')) {
      item.hidden = !item.dataset.search.includes(query.toLowerCase().trim()) || (platform !== '' && item.dataset.itemPlatform !== platform);
      if (!item.hidden) found += 1;
    }
    prototype.querySelector('[data-results]').textContent = `${found} ${found === 1 ? 'project' : 'projects'}`;
    prototype.querySelector('[data-empty]').hidden = found !== 0;
    prototype.querySelector('[data-search-input]').value = query;
    for (const button of prototype.querySelectorAll('[data-platform]')) button.setAttribute('aria-pressed', String(button.dataset.platform === platform));
  }
  updateUrl();
}
function showVariant(key, resetScroll = false) {
  current = key;
  document.body.dataset.variant = key;
  document.querySelector('.switcher-intro').dataset.current = key[0].toUpperCase() + key.slice(1);
  for (const prototype of document.querySelectorAll('[data-prototype]')) prototype.hidden = prototype.dataset.prototype !== key;
  for (const button of document.querySelectorAll('.variant-buttons button')) button.setAttribute('aria-pressed', String(button.dataset.variant === key));
  document.querySelector('[data-variant-announcement]').textContent = `${key[0].toUpperCase() + key.slice(1)} concept selected`;
  document.querySelector('.prototype-skip').href = `#main-${key}`;
  if (resetScroll && location.hash) history.replaceState(null, '', location.pathname + location.search);
  updateUrl();
  if (resetScroll) window.scrollTo({top:0,behavior:'instant'});
}
function cycle(direction) { showVariant(variants[(variants.indexOf(current) + direction + variants.length) % variants.length], true); }
document.querySelector('[data-next]').addEventListener('click', () => cycle(1));
document.querySelector('[data-previous]').addEventListener('click', () => cycle(-1));
for (const button of document.querySelectorAll('.variant-buttons button')) button.addEventListener('click', () => showVariant(button.dataset.variant, true));
for (const input of document.querySelectorAll('[data-search-input]')) input.addEventListener('input', () => { query = input.value; applyFilters(); });
for (const button of document.querySelectorAll('[data-platform]')) button.addEventListener('click', () => { platform = button.dataset.platform; applyFilters(); });
for (const button of document.querySelectorAll('[data-clear]')) button.addEventListener('click', () => { query = ''; platform = ''; applyFilters(); document.querySelector(`[data-prototype="${current}"] [data-search-input]`).focus(); });
document.addEventListener('keydown', event => {
  const editing = event.target.closest('input,textarea,select,[contenteditable]:not([contenteditable="false"])');
  if (editing || event.altKey || event.metaKey || event.ctrlKey) return;
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); cycle(event.key === 'ArrowRight' ? 1 : -1); }
  if (event.key === '/') { event.preventDefault(); document.querySelector(`[data-prototype="${current}"] [data-search-input]`).focus(); }
});
for (const button of document.querySelectorAll('[data-unit]')) button.addEventListener('click', () => {
  for (const tile of document.querySelectorAll('[data-unit]')) tile.setAttribute('aria-pressed', String(tile === button));
  document.querySelector('[data-unit-name]').textContent = button.dataset.unit;
  document.querySelector('[data-unit-description]').textContent = button.dataset.unitState;
});
applyFilters();
showVariant(current);
