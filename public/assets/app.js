const search = document.querySelector('#project-search');
const platform = document.querySelector('#platform-filter');
const rows = [...document.querySelectorAll('[data-project]')];
function filterProjects() {
  const query = search.value.trim().toLocaleLowerCase();
  let count = 0;
  for (const row of rows) {
    row.hidden = !(row.dataset.search.includes(query) && (!platform.value || row.dataset.platform === platform.value));
    if (!row.hidden) count += 1;
  }
  document.querySelector('#result-count').textContent = `${count} ${count === 1 ? 'project' : 'projects'}`;
  document.querySelector('#no-results').hidden = count !== 0;
  const params = new URLSearchParams();
  if (query) params.set('q', search.value.trim());
  if (platform.value) params.set('platform', platform.value);
  history.replaceState(null, '', `${location.pathname}${params.size ? `?${params}` : ''}${location.hash}`);
}
if (search) {
  const params = new URLSearchParams(location.search);
  search.value = params.get('q') || '';
  const selection = params.get('platform');
  if ([...platform.options].some(option => option.value === selection)) platform.value = selection;
  search.addEventListener('input', filterProjects);
  platform.addEventListener('change', filterProjects);
  document.querySelector('#clear-filters').addEventListener('click', () => {
    search.value = ''; platform.value = ''; filterProjects(); search.focus();
  });
  filterProjects();
}

const form = document.querySelector('#submission-form');
if (form) {
  const preview = document.querySelector('#ticket-preview');
  function resetPreview() {
    preview.hidden = true;
    document.querySelector('#submission-error').textContent = '';
  }
  form.addEventListener('input', resetPreview);
  form.addEventListener('submit', event => {
    event.preventDefault();
    resetPreview();
    if (!form.reportValidity()) return;
    const fields = Object.fromEntries([...new FormData(form)].map(([key, value]) => [key, value.trim()]));
    for (const name of ['title', 'repository', 'credit', 'platform']) {
      if (!fields[name]) {
        document.querySelector('#submission-error').textContent = 'Add a project title, repository, maintainer credit, and target platform.';
        form.elements[name].focus(); return;
      }
    }
    let repository;
    try {
      const url = new URL(fields.repository);
      if (url.protocol !== 'https:' || url.hostname !== 'github.com' || url.username || url.password || url.search || url.hash || !/^\/[A-Za-z0-9-]+\/[A-Za-z0-9_.-]+\/?$/.test(url.pathname)) throw new Error();
      repository = `https://github.com${url.pathname.replace(/\/$/, '').replace(/\.git$/, '')}`;
    } catch {
      document.querySelector('#submission-error').textContent = 'Use the canonical HTTPS GitHub repository URL, such as https://github.com/natebag/Sims2DECOMP.';
      form.elements.repository.focus();
      return;
    }
    for (const name of ['guide', 'board']) {
      if (!fields[name]) continue;
      try {
        const url = new URL(fields[name]);
        if (url.protocol !== 'https:' || url.username || url.password) throw new Error();
      } catch {
        document.querySelector('#submission-error').textContent = `${name === 'board' ? 'Progress board' : 'Contribution guide'} must be an HTTPS URL without login details.`;
        form.elements[name].focus(); return;
      }
    }
    const body = `## Repository submission\n\nProject: ${fields.title}\nRepository: ${repository}\nMaintainer / team credit: ${fields.credit}\nPlatform: ${fields.platform}\nContribution guide: ${fields.guide || 'See repository README'}\nProgress board: ${fields.board || 'None supplied'}\n\n## Why list this project?\n\n${fields.notes || 'Please review the canonical source and contribution instructions.'}\n\n## Review checklist\n\n- [ ] Canonical repository verified\n- [ ] Maintainer / team credit verified\n- [ ] Duplicate listings checked\n- [ ] Contribution link checked\n- [ ] Board status checked, if supplied\n- [ ] Source and license terms reviewed\n`;
    const issue = new URL('https://github.com/THEROCKSSS/decomp-atlas/issues/new');
    issue.searchParams.set('title', `[Submission] ${fields.title}`);
    issue.searchParams.set('body', body);
    document.querySelector('#ticket-body').textContent = body;
    document.querySelector('#open-ticket').href = issue.href;
    preview.hidden = false;
    preview.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
    document.querySelector('#preview-heading').focus({ preventScroll: true });
  });
}

document.querySelectorAll('[data-copy-code]').forEach(button => button.addEventListener('click', async () => {
  const code = button.closest('.code-block').querySelector('code').textContent;
  try {
    await navigator.clipboard.writeText(code);
    button.textContent = 'Copied';
  } catch {
    button.textContent = 'Select the command to copy';
  }
}));
