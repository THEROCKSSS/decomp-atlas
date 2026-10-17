const escape = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const repo = 'https://github.com/THEROCKSSS/decomp-atlas';
const arrow = '<span class="arrow" aria-hidden="true">↗</span>';
const date = value => new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${value}T12:00:00Z`));
const paths = {
  cube: '<path d="m12 2 9 5v10l-9 5-9-5V7Zm0 0v10m9-5-9 5-9-5m9 5v10"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  book: '<path d="M12 5C8 2 4 3 2 4v15c3-2 7-2 10 1 3-3 7-3 10-1V4c-2-1-6-2-10 1Zm0 0v15"/>',
  plus: '<path d="M12 4v16M4 12h16"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  github: '<path d="M9 20c-4 1-4-2-6-2m12 4v-4c0-1 0-2-1-2 4 0 7-2 7-6 0-1-1-3-2-4 0-1 0-2-1-3-2 0-3 1-4 1h-4C8 3 7 3 5 3 4 4 4 5 4 6 3 7 3 9 3 10c0 4 3 6 7 6-1 0-1 1-1 2v4"/>',
  right: '<path d="m9 5 7 7-7 7"/>',
  alert: '<circle cx="12" cy="12" r="9"/><path d="M12 7v6m0 4h.01"/>'
};
const icon = name => `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;
const link = (url, text, cls = '') => `<a href="${escape(url)}"${cls ? ` class="${cls}"` : ''}>${escape(text)}</a>`;
function status(project) {
  const states = { disabled: ['warning', 'Board disabled'], external: ['accent', 'External board'], none: ['', 'Repository docs'] };
  const [cls, text] = states[project.boardStatus];
  return `<span class="status ${cls}">${project.boardStatus === 'disabled' ? icon('alert') : '<span class="status-dot" aria-hidden="true"></span>'}${text}</span>`;
}
function cover(project, { eager = false } = {}) {
  if (project.slug === 'sims2') return `<img class="project-cover" src="/assets/house-cutaway.png" alt="Original isometric house illustration, not a game screenshot" width="1672" height="941" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'}>`;
  if (!['ocarina-of-time', 'super-mario-64', 'pokemon-emerald'].includes(project.slug)) return `<svg class="project-cover project-cover-fallback" viewBox="0 0 480 280" role="img" aria-label="Generic original repository illustration"><path d="m240 48 106 60v112l-106 60-106-60V108Z" transform="translate(0 -24)" fill="none" stroke="currentColor" stroke-width="2"/><path d="m134 84 106 60 106-60m-106 60v112" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="240" cy="140" r="126" fill="none" stroke="currentColor" opacity=".2"/></svg>`;
  return `<svg class="project-cover" viewBox="0 0 480 280" role="img" aria-label="Original geometric illustration for ${escape(project.title)}"><use href="/assets/scenes.svg#${escape(project.slug)}"></use></svg>`;
}
function breadcrumb(parent, current) {
  return `<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Atlas</a>${parent ? `${icon('right')}${link(parent.url, parent.label)}` : ''}${current ? `${icon('right')}<span aria-current="page">${escape(current)}</span>` : ''}</nav>`;
}
function shell(title, content, { active = 'projects', kind = '', description = 'Discover decompilation projects, credit their maintainers, and learn how to contribute.', redirect = false } = {}) {
  const nav = (url, name, label) => `<a class="rail-link${active === name ? ' selected' : ''}" href="${url}" aria-label="${label}" title="${label}"${active === name ? ' aria-current="page"' : ''}>${icon(name === 'projects' ? 'grid' : name === 'wiki' ? 'book' : 'plus')}</a>`;
  return `<!doctype html>
<html lang="en"><head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <meta name="description" content="${escape(description)}"><meta name="theme-color" content="#0d0c15">
  <title>${escape(title)} · Decomp Atlas</title>
  <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
  <link rel="stylesheet" href="/assets/tokens.css"><link rel="stylesheet" href="/assets/style.css">
  <script src="/assets/app.js" defer></script>
  ${kind === 'project' ? '<script type="module" src="/assets/progress.js"></script>' : ''}
</head><body class="page-${kind}"${redirect ? ' data-legacy-prototype' : ''}>
  <a class="skip" href="#main">Skip to content</a>
  <aside class="site-rail" aria-label="Site navigation">
    <a class="rail-logo" href="/" aria-label="Decomp Atlas home">${icon('cube')}</a>
    ${nav('/', 'projects', 'Browse projects')}${nav('/wiki/', 'wiki', 'Read the wiki')}${nav('/submit/', 'submit', 'Submit a repository')}
    <a class="rail-link rail-bottom" href="${repo}" aria-label="GitHub repository" title="GitHub repository">${icon('github')}</a>
  </aside>
  <div class="site-main">
    <header class="site-header">
      <a class="wordmark" href="/" aria-label="Decomp Atlas">decomp<span>atlas</span><span class="wordmark-dot">.</span></a>
      <nav class="header-nav" aria-label="Main navigation"><a href="/"${active === 'projects' ? ' aria-current="page"' : ''}>Discover</a><a href="/wiki/"${active === 'wiki' ? ' aria-current="page"' : ''}>The wiki</a></nav>
      <div class="header-actions">
        <form class="search-box" role="search" action="/" method="get" id="catalogue-search-form">
          ${icon('search')}<label class="sr-only" for="project-search">Search projects, maintainers, or languages</label>
          <input id="project-search" name="q" type="search" placeholder="Search projects…" maxlength="200" autocomplete="off">
          <input type="hidden" name="platform" id="platform-value" value=""><button class="search-submit" type="submit" aria-label="Search projects">${icon('right')}</button><kbd aria-hidden="true">/</kbd>
        </form>
        <a class="primary-link" href="/submit/"${active === 'submit' ? ' aria-current="page"' : ''}>${icon('plus')}<span>Add a project</span></a>
      </div>
    </header>
    <main id="main">${content}</main>
    <footer class="site-footer"><span>A community catalogue by ${link('https://github.com/THEROCKSSS', 'Owen')}.</span><div>${link('/wiki/credits-and-metrics/', 'Credits & data policy')}<a href="${repo}">Contribute on GitHub ${arrow}</a></div></footer>
  </div>
</body></html>`;
}
function projectCard(project, { filter = false } = {}) {
  const fields = filter ? ` data-project="${escape(project.slug)}" data-search="${escape(`${project.title} ${project.repositoryName} ${project.owner} ${project.platform} ${project.language}`.toLowerCase())}" data-platform="${escape(project.platform)}"` : '';
  return `<a class="game-card" href="/projects/${escape(project.slug)}/"${fields}>
    <div class="game-art">${cover(project)}<span class="game-platform">${escape(project.platform)}</span></div>
    <div class="game-card-title"><h3>${escape(project.title)}</h3>${arrow}</div>
    <p>by ${escape(project.owner)} & contributors</p><span class="game-repo">${escape(project.owner)}/${escape(project.repositoryName)}</span>
  </a>`;
}
function guideCard(article, index) {
  return `<a class="guide-card" href="/wiki/${escape(article.slug)}/">
    <div class="guide-card-top"><span class="guide-icon">${icon(index === 1 ? 'grid' : index === 2 ? 'plus' : 'book')}</span><span class="guide-category">${escape(article.category)}</span>${arrow}</div>
    <h2>${escape(article.title)}</h2><p>${escape(article.summary)}</p><span class="guide-read">Read guide ${icon('right')}</span>
  </a>`;
}
function home(projects) {
  const feature = projects.find(project => project.slug === 'sims2') ?? projects[0];
  const platforms = [...new Set(projects.map(project => project.platform))];
  const featured = feature ? `<section class="library-hero" aria-labelledby="featured-title">
    ${feature.slug === 'sims2' ? '<img class="library-hero-image" src="/assets/house-cutaway.png" alt="Original miniature house cutaway at dusk, not a game screenshot" width="1672" height="941" fetchpriority="high">' : `<div class="library-hero-image">${cover(feature, { eager: true })}</div>`}
    <div class="library-hero-content"><p class="feature-kicker">In the collection</p><h2 id="featured-title">${escape(feature.title)}</h2>
      <p>${feature.slug === 'sims2' ? 'The GameCube classic,<br>one piece of source at a time.' : escape(feature.summary)}</p>
      <a class="creator" href="https://github.com/${escape(feature.owner)}"><span class="creator-avatar">${escape(feature.owner[0])}</span><span>${escape(feature.owner)} <small>& contributors</small></span></a>
      <a class="button hero-button" href="/projects/${escape(feature.slug)}/">Explore project ${arrow}</a>
    </div><div class="library-hero-caption"><span>${escape(feature.platform)} <span aria-hidden="true">/</span> ${escape(feature.language)}</span><span>Original illustration</span></div>
  </section>` : '';
  return shell('Discover the collection', `
    <div class="home-intro"><div><h1>Your next deep dive.</h1><p>Great games. Open repositories. The people bringing them back to source.</p></div><span class="data-label">NON-LIVE DATA</span></div>
    ${featured}
    <section class="collection" id="collection" aria-labelledby="collection-heading" data-catalogue><span id="projects" class="sr-only" aria-hidden="true"></span>
      <div class="section-heading"><h2 id="collection-heading">Explore the collection</h2><span id="result-count" role="status">${projects.length} projects</span></div>
      <div class="platform-pills" role="group" aria-label="Filter projects by platform"><button type="button" data-platform-filter="" aria-pressed="true">All projects</button>${platforms.map(platform => `<button type="button" data-platform-filter="${escape(platform)}" aria-pressed="false">${escape(platform)}</button>`).join('')}</div>
      <div class="project-grid">${projects.map(project => projectCard(project, { filter: true })).join('')}</div>
      <div class="empty-state" id="no-results"${projects.length ? ' hidden' : ''}><h3>No projects match these filters.</h3><p>Try another game, maintainer, language, or platform.</p><button class="button secondary" id="clear-filters" type="button">Clear filters</button><a class="text-link" href="/submit/">Suggest a project ${arrow}</a></div>
      <noscript><p class="small">Search and filters need JavaScript. All listed projects remain available below.</p></noscript>
    </section>
    <section class="home-bottom"><div class="library-guide"><span class="outline-icon">${icon('book')}</span><div><h2>Curiosity is a good starting point.</h2><p>Set up a build, read a progress board, or make your first contribution.</p></div><a class="text-link" href="/wiki/">Open the wiki ${arrow}</a></div><div class="collection-note"><span>Independent projects. Original creators. Always credited.</span><a href="/wiki/credits-and-metrics/">How we credit projects ${arrow}</a></div></section>
  `, { kind: 'home' });
}
function progressPanel(project) {
  if (!project.progress) return '<div class="progress-unavailable"><h3>No structured report connected.</h3><p>This project’s current progress is in its upstream documentation. Unavailable measurements are not zero progress.</p></div>';
  return `<div class="progress-report" data-progress-provider="${escape(project.progress.provider)}" data-progress-owner="${escape(project.owner)}" data-progress-repo="${escape(project.repositoryName)}" data-progress-version="${escape(project.progress.version)}" data-board-disabled="${project.boardStatus === 'disabled'}">
    <div class="report-controls"${project.units.length ? '' : ' hidden'}><label for="report-unit">Report scope</label><select id="report-unit"><option value="">Entire project</option>${project.units.filter(unit => unit.reportCommit).map(unit => `<option value="${escape(unit.name)}" data-report-commit="${escape(unit.reportCommit)}">${escape(unit.name)}</option>`).join('')}</select></div>
    <p class="report-status" data-report-status role="status">Loading the latest available upstream report…</p><div data-report-results></div><button type="button" class="button secondary report-retry" data-report-retry hidden>Retry report</button><noscript><p class="small">Enable JavaScript to load graphs directly from the upstream source, or use the board link below.</p></noscript>
  </div>`;
}
function projectPage(project, projects) {
  const correction = new URL(`${repo}/issues/new`);
  correction.searchParams.set('title', `[Correction] ${project.title}`);
  correction.searchParams.set('body', `Listing: /projects/${project.slug}/\n\nCorrection:\n\nAuthoritative source:\n`);
  const related = projects.filter(other => other.slug !== project.slug).slice(0, 3);
  return shell(project.title, `
    ${breadcrumb({ url: '/#collection', label: 'Collection' }, project.title)}
    <section class="project-heading"><div class="project-heading-copy"><div class="metadata-line"><span class="platform-tag">${escape(project.platform)}</span><span>${escape(project.language)}</span></div><h1>${escape(project.title)}</h1><p class="lead">${escape(project.summary)}</p>
      <a class="creator" href="https://github.com/${escape(project.owner)}"><span class="creator-avatar">${escape(project.owner[0])}</span><span>A project by ${escape(project.owner)} <small>& contributors</small></span></a>
      <div class="actions"><a class="button" href="${escape(project.repository)}">${icon('github')}Open repository ${arrow}</a><a class="button secondary" href="${escape(project.contributing)}">Contribution instructions ${arrow}</a></div>
    </div><figure class="project-heading-art">${cover(project, { eager: true })}<figcaption>Original illustration · not a game screenshot</figcaption></figure></section>
    <div class="project-layout"><div class="project-details"><section class="panel"><div class="panel-heading"><h2>Decompilation progress</h2>${status(project)}</div>${progressPanel(project)}<p>${escape(project.boardNote)}</p>
      ${project.board ? `<a class="button secondary" href="${escape(project.board)}">Open upstream progress board ${arrow}</a>` : `<a class="text-link" href="${escape(project.contributing)}">Find work in the project docs ${arrow}</a>`}
      ${project.units.length ? `<div class="unit-list"><h3>Unit drill-down</h3>${project.units.map(unit => `<a class="unit-link" href="${escape(unit.reportCommit ? `/projects/${project.slug}/?unit=${encodeURIComponent(unit.name)}` : unit.url)}"><span>${escape(unit.name)}</span>${arrow}</a>`).join('')}</div>` : ''}
      <p class="small">Board tiles measure code progress. Check upstream issues and contribution instructions for tasks you can take.</p>
    </section><section class="panel"><h2>Before you contribute</h2><p>${escape(project.note)}</p><div class="notice">${icon('alert')}<p>${project.slug === 'sims2' ? 'A byte-identical executable and handwritten source coverage are different claims. The graphs count matching bytes and functions reported upstream.' : 'Read the upstream project’s current guidance and check existing work before choosing a task.'}</p></div><a class="text-link" href="/wiki/first-contribution/">Read the first-contribution guide ${arrow}</a></section></div>
    <aside class="project-credit"><section class="panel credit-panel"><span class="guide-icon">${icon('cube')}</span><h2>Credit where it belongs.</h2><dl class="credit-list"><div><dt>Upstream maintainer / team</dt><dd>${link(`https://github.com/${project.owner}`, project.owner)} & contributors</dd></div><div><dt>Canonical repository</dt><dd>${link(project.repository, `${project.owner}/${project.repositoryName}`)}</dd></div><div><dt>Target platform</dt><dd>${escape(project.platform)}</dd></div><div><dt>Listing sources checked</dt><dd>${escape(date(project.checkedOn))}</dd></div></dl><p class="small">Showcased by Decomp Atlas. Ownership and credit stay with the original team. Listing does not imply endorsement.</p><span class="data-label">NON-LIVE DATA</span></section><a class="text-link correction-link" href="${escape(correction.href)}">Suggest a correction ${arrow}</a></aside></div>
    ${related.length ? `<section class="related-projects"><div class="section-heading"><h2>More in the collection</h2><a class="text-link" href="/#collection">All projects ${arrow}</a></div><div class="project-grid related-grid">${related.map(project => projectCard(project)).join('')}</div></section>` : ''}
  `, { kind: 'project', description: project.summary });
}
function wikiIndex(articles) {
  return shell('The wiki', `
    ${breadcrumb(null, 'The wiki')}
    <div class="page-heading wiki-heading"><span class="heading-icon">${icon('book')}</span><div><h1>From curious to contributing.</h1><p class="lead">Practical starting points for contributors, project maintainers, and the people keeping this catalogue useful.</p></div></div>
    <div class="wiki-grid">${articles.map(guideCard).join('') || `<div class="empty-state"><h2>The guide collection is growing.</h2><p>Browse the project repositories for their current contribution instructions.</p><a class="button" href="/">Browse projects</a></div>`}</div>
    <section class="wiki-contribute"><div><h2>Good documentation is a contribution.</h2><p>Found an outdated instruction or a missing credit? Help keep the field guide useful.</p></div><a class="button secondary" href="${repo}/issues/new">Suggest a correction ${arrow}</a></section>
  `, { active: 'wiki', kind: 'wiki' });
}
function articlePage(article, articles) {
  const next = articles[(articles.indexOf(article) + 1) % articles.length];
  return shell(article.title, `
    ${breadcrumb({ url: '/wiki/', label: 'The wiki' }, null)}
    <header class="page-heading article-heading"><span class="guide-category">${escape(article.category)}</span><h1>${escape(article.title)}</h1><p class="lead">${escape(article.summary)}</p><div class="article-meta">${icon('book')}<span>Source-checked ${escape(date(article.checkedOn))}</span></div></header>
    <div class="article-layout"><article class="article-body">${article.sections.map((section, index) => `<section id="section-${index + 1}"><h2>${escape(section.title)}</h2><p>${escape(section.text)}</p>${section.code ? `<div class="code-block"><pre><code>${escape(section.code)}</code></pre><button class="copy-button" data-copy-code type="button">Copy command</button></div>` : ''}</section>`).join('')}
      ${article.slug === 'submit-a-project' ? '<a class="button" href="/submit/">Prepare a submission ticket ↗</a>' : ''}
    </article><aside class="article-aside"><nav class="contents-nav" aria-label="On this page"><h2>On this page</h2>${article.sections.map((section, index) => link(`#section-${index + 1}`, section.title)).join('')}</nav><details class="source-details" open><summary>Original sources</summary><div>${article.sources.map(source => `<a href="${escape(source.url)}"><span>${escape(source.label)}</span>${arrow}</a>`).join('')}</div></details><p class="small">Follow upstream documentation when requirements change.</p></aside></div>
    <div class="article-bottom"><a class="text-link" href="/wiki/">← All guides</a>${next && next !== article ? `<a class="next-guide" href="/wiki/${escape(next.slug)}/"><span>Next guide</span><strong>${escape(next.title)}</strong>${arrow}</a>` : ''}</div>
  `, { active: 'wiki', kind: 'guide', description: article.summary });
}
function submitPage() {
  const field = (name, label, { placeholder = '', required = false, type = 'text', limit = 250, hint = '', full = true, autocomplete = '' } = {}) => `<div class="field${full ? ' full' : ''}"><label for="${name}">${label}${required ? ' <span aria-hidden="true">*</span>' : ''}</label><input id="${name}" name="${name}" type="${type}"${required ? ' required' : ''} maxlength="${limit}" placeholder="${escape(placeholder)}"${hint ? ` aria-describedby="${name}-hint"` : ''}${autocomplete ? ` autocomplete="${autocomplete}"` : ''}>${hint ? `<p class="hint" id="${name}-hint">${hint}</p>` : ''}</div>`;
  return shell('Submit a repository', `
    ${breadcrumb(null, 'Submit a repo')}
    <div class="page-heading"><h1>Put good work on the map.</h1><p class="lead">Suggest a decompilation repository for the collection. Credit its maintainers, point us to the original sources, and we’ll review the listing on GitHub.</p></div>
    <div class="submission-layout"><div><form id="submission-form" class="submission-form"><div class="form-heading"><span class="guide-icon">${icon('plus')}</span><div><h2>Suggest a repository</h2><p>Fields marked * are required.</p></div></div><div class="form-grid">
      ${field('title', 'Project or game title', { required: true, limit: 120, placeholder: 'e.g. The Sims 2' })}
      ${field('repository', 'Canonical GitHub repository', { required: true, type: 'url', placeholder: 'https://github.com/owner/repository', hint: 'Link the original project rather than an unrelated fork.', autocomplete: 'url' })}
      ${field('credit', 'Maintainer or team credit', { required: true, limit: 120, placeholder: 'e.g. natebag & contributors', full: false })}
      ${field('platform', 'Target platform', { required: true, limit: 100, placeholder: 'e.g. GameCube', full: false })}
      ${field('guide', 'Contribution or setup guide', { type: 'url', limit: 350, placeholder: 'https://…', hint: 'Optional. The README is a useful fallback.' })}
      ${field('board', 'Progress board', { type: 'url', limit: 350, placeholder: 'https://decomp.dev/owner/repository', hint: 'Optional. A project does not need a dashboard to be listed.' })}
      <div class="field full"><label for="notes">What should contributors know?</label><textarea id="notes" name="notes" maxlength="1200" placeholder="Useful context, board status, or the kind of help the project welcomes."></textarea></div>
    </div><p class="form-error" id="submission-error" role="alert"></p><button class="button" type="submit">Preview submission ticket <span aria-hidden="true">→</span></button><p class="form-note">This prepares a draft. You review and submit it on GitHub. A GitHub account is required to open a ticket.</p><noscript><p>JavaScript is disabled. <a href="${repo}/issues/new">Open a ticket directly on GitHub</a> and include the repository, title, platform, and maintainer credit.</p></noscript></form>
    <section class="ticket-preview" id="ticket-preview" hidden aria-labelledby="preview-heading"><span class="guide-icon">${icon('book')}</span><h2 id="preview-heading" tabindex="-1">Your ticket is ready to review.</h2><p class="small">Nothing has been submitted yet. GitHub opens with these details filled in; review them there and choose Create.</p><pre id="ticket-body"></pre><a class="button" id="open-ticket" href="${repo}/issues/new" target="_blank" rel="noopener noreferrer">Open ticket on GitHub ↗</a></section></div>
    <aside class="submission-aside"><section class="panel"><h2>How a listing gets here</h2><ol class="steps"><li><span>01</span><div><strong>You suggest a project.</strong>Share its original repository and maintainer credit.</div></li><li><span>02</span><div><strong>We check the sources.</strong>Review the links, ownership, contribution guide, and any board.</div></li><li><span>03</span><div><strong>A reviewed change adds it.</strong>The collection is updated through a pull request.</div></li></ol></section><section class="contribution-note"><span class="outline-icon">${icon('github')}</span><h2>Prefer a pull request?</h2><p>Add a listing to <code>data/projects.json</code> and send your change for review. Wiki corrections are welcome too.</p><a class="text-link" href="/wiki/submit-a-project/">Read the contribution guide ${arrow}</a></section><p class="small">Questions about a listed game’s code belong with its upstream project. Atlas tickets are for this catalogue and wiki.</p></aside></div>
  `, { active: 'submit', kind: 'submit' });
}
export function renderSite(projects, articles) {
  const pages = new Map([['', home(projects)], ['wiki', wikiIndex(articles)], ['submit', submitPage()]]);
  for (const project of projects) pages.set(`projects/${project.slug}`, projectPage(project, projects));
  for (const article of articles) pages.set(`wiki/${article.slug}`, articlePage(article, articles));
  pages.set('prototypes', shell('Decomp Atlas', '<section class="empty-state redirect-state"><h1>The collection is ready.</h1><p>Continue to Decomp Atlas to explore the projects and guides.</p><a class="button" href="/">Open Decomp Atlas ↗</a></section>', { kind: 'redirect', redirect: true }));
  const notFound = shell('Page not found', `<section class="not-found"><span class="heading-icon">${icon('search')}</span><span class="data-label">404 · PAGE NOT FOUND</span><h1>This page isn’t in the collection.</h1><p>The link may have moved. Browse the projects or open the wiki to find your way.</p><div class="actions"><a class="button" href="/">Browse projects ${arrow}</a><a class="button secondary" href="/wiki/">Read the wiki ${arrow}</a></div></section>`, { kind: 'not-found' });
  return { pages, notFound };
}
