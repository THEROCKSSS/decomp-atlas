import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../dist');
const port = Number(process.env.PORT || 8798);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.ttf': 'font/ttf' };
const headers = {
  'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'",
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin'
};
createServer(async (request, response) => {
  let filename;
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname);
    filename = path.resolve(root, `.${pathname}`);
    if (filename !== root && !filename.startsWith(`${root}${path.sep}`)) throw new Error('Invalid path');
    if ((await stat(filename)).isDirectory()) filename = path.join(filename, 'index.html');
    const data = await readFile(filename);
    response.writeHead(200, { ...headers, 'Content-Type': types[path.extname(filename)] || 'application/octet-stream' });
    response.end(data);
  } catch {
    // A rebuild briefly removes generated pages. Keep preview alive while it runs.
    let fallback;
    try { fallback = await readFile(path.join(root, '404.html')); }
    catch {
      response.writeHead(503, { ...headers, 'Content-Type': 'text/plain; charset=utf-8', 'Retry-After': '1' });
      response.end('The preview is rebuilding. Reload in a moment.');
      return;
    }
    response.writeHead(404, { ...headers, 'Content-Type': 'text/html; charset=utf-8' });
    response.end(fallback);
  }
}).listen(port, '127.0.0.1', () => console.log(`Decomp Atlas: http://127.0.0.1:${port}`));
