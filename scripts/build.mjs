import { readFile, writeFile, mkdir, cp, readdir, unlink, rmdir, lstat } from 'node:fs/promises';
import path from 'node:path';
import { renderSite } from './site.mjs';

const root = path.resolve(import.meta.dirname, '..');
process.chdir(root);
const projects = JSON.parse(await readFile('data/projects.json', 'utf8'));
const articles = JSON.parse(await readFile('data/wiki.json', 'utf8'));
async function writePage(route, html) {
  const destination = path.join('dist', route, 'index.html');
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, html);
}
// dist is exclusively generated output. Remove its files without following
// symlinks or accepting a caller-provided deletion path.
async function cleanGenerated(directory) {
  if (directory !== path.join(root, 'dist') && !directory.startsWith(path.join(root, 'dist') + path.sep)) throw new Error('Output path escaped dist');
  let entries;
  try {
    if ((await lstat(directory)).isSymbolicLink()) throw new Error('Generated output must not be a symlink');
    entries = await readdir(directory, { withFileTypes: true });
  }
  catch (error) { if (error.code === 'ENOENT') return; throw error; }
  for (const entry of entries) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory() && !entry.isSymbolicLink()) {
      await cleanGenerated(filename);
      await rmdir(filename);
    } else {
      await unlink(filename);
    }
  }
}
await cleanGenerated(path.join(root, 'dist'));
await mkdir('dist', { recursive: true });
await cp('public', 'dist', { recursive: true });
const { pages, notFound } = renderSite(projects, articles);
for (const [route, html] of pages) await writePage(route, html);
await writeFile('dist/404.html', notFound);
console.log(`Built ${projects.length} project pages, ${articles.length} wiki guides, catalogue, submission, legacy redirect, and 404 page.`);
