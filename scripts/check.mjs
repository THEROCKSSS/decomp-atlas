import assert from 'node:assert/strict';
import { readFile, readdir, access } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

process.chdir(path.resolve(import.meta.dirname, '..'));
const projects = JSON.parse(await readFile('data/projects.json', 'utf8'));
const articles = JSON.parse(await readFile('data/wiki.json', 'utf8'));
const uniqueSlugs = new Set();
for (const item of [...projects, ...articles]) {
  assert.match(item.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert(!uniqueSlugs.has(item.slug), `Duplicate slug: ${item.slug}`);
  uniqueSlugs.add(item.slug);
  assert(item.title.trim());
}
function secureUrl(value) {
  const url = new URL(value);
  assert.equal(url.protocol, 'https:');
  assert(!url.username && !url.password);
}
const repositories = new Set();
for (const project of projects) {
  assert(!repositories.has(project.repository.toLowerCase()), `Duplicate repository: ${project.repository}`);
  repositories.add(project.repository.toLowerCase());
  assert.equal(project.repository, `https://github.com/${project.owner}/${project.repositoryName}`);
  for (const key of ['summary', 'platform', 'language', 'note', 'boardNote']) assert(project[key]?.trim(), `Missing ${key}`);
  assert(['disabled', 'external', 'none'].includes(project.boardStatus));
  assert.equal(project.boardStatus === 'none', project.board === null);
  assert.match(project.checkedOn, /^\d{4}-\d{2}-\d{2}$/);
  secureUrl(project.repository);
  secureUrl(project.contributing);
  if (project.board) secureUrl(project.board);
  for (const unit of project.units) secureUrl(unit.url);
}
for (const article of articles) {
  assert(article.summary && article.category && article.sections.length && article.sources.length);
  for (const section of article.sections) assert(section.title && section.text);
  for (const source of article.sources) { assert(source.label); secureUrl(source.url); }
}
for (const file of ['public/assets/app.js', ...((await readdir('scripts')).filter(file => file.endsWith('.mjs')).map(file => `scripts/${file}`))]) {
  const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
}
let pages = 0;
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) { await walk(filename); continue; }
    if (!filename.endsWith('.html')) continue;
    pages += 1;
    const html = await readFile(filename, 'utf8');
    assert(html.includes('<html lang="en">'));
    for (const match of html.matchAll(/(?:href|src)="(\/[^"?#]*)(?:[^"\s]*)?"/g)) {
      const destination = path.join('dist', match[1]);
      await access(match[1].endsWith('/') ? path.join(destination, 'index.html') : destination);
    }
  }
}
await walk('dist');
console.log(`PASS: ${projects.length} credited listings, ${articles.length} sourced guides, JavaScript syntax, and internal links across ${pages} generated pages.`);
