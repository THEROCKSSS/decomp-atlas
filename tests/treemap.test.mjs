import test from 'node:test';
import assert from 'node:assert/strict';
import { parseUnits, layoutUnits, treemapSvg, imageModel } from '../public/assets/treemap-data.js';
import { readProgressSource } from '../public/assets/progress-data.js';

test('per-unit reports preserve exact code totals and protobuf omitted zero values', () => {
  const source = { version: 2, measures: { total_code: 100, matched_code: 40 }, units: [
    { name: 'large', measures: { total_code: '60', matched_code: '40' } },
    { name: 'unmatched', measures: { total_code: 40 } },
    { name: 'data-only', measures: {} }
  ] };
  const output = parseUnits(source, { code: { total: 100, matching: 40 } });
  assert.equal(output.units.length, 2); assert.equal(output.units[1].matching, 0);
  assert.equal(output.code.remaining, 60); assert.equal(output.code.percent, 40);
  assert.throws(() => parseUnits(source, { code: { total: 101, matching: 40 } }));
});

test('area-weighted layout fills a2:1 rectangle without overlap or losing code weight', () => {
  const units = [{ name: 'a', total: 60, matching: 40 }, { name: 'b', total: 30, matching: 0 }, { name: 'c', total: 10, matching: 10 }];
  const tiles = layoutUnits(units, 1200, 600);
  assert.equal(tiles.length, 3);
  for (const tile of tiles) {
    assert.ok(tile.x >= 0 && tile.y >= 0 && tile.x + tile.width <= 1200.000001 && tile.y + tile.height <= 600.000001);
    assert.ok(Math.abs(tile.width * tile.height - tile.total * 7200) < .001);
    for (const other of tiles.filter(other => other !== tile)) assert.ok(Math.min(tile.x + tile.width, other.x + other.width) - Math.max(tile.x, other.x) < .000001 || Math.min(tile.y + tile.height, other.y + other.height) - Math.max(tile.y, other.y) < .000001);
  }
  assert.deepEqual(layoutUnits([...units].reverse(), 1200, 600), tiles);
});

test('invalid units and contradictory totals fail rather than inventing a map', () => {
  for (const units of [[{ name: 'bad', measures: { total_code: 1, matched_code: 2 } }], [{ name: 'bad', measures: { total_code: null } }], [{ name: 'a', measures: { total_code: 1 } }, { name: 'a', measures: { total_code: 1 } }]]) {
    assert.throws(() => parseUnits({ version: 2, measures: { total_code: 2, matched_code: 0 }, units }, { code: { total: 2, matching: 0 } }));
  }
});

test('entirely unmatched or zero-code protobuf reports are handled without inventing matching', () => {
  const unmatched = parseUnits({ version: 2, measures: { total_code: 10 }, units: [{ name: 'asm', measures: { total_code: 10 } }] }, { code: { total: 10, matching: 0 } });
  assert.equal(unmatched.code.percent, 0); assert.equal(unmatched.code.remaining, 10);
  const empty = parseUnits({ version: 2, measures: {}, units: [] }, { code: { total: 0, matching: 0 } });
  assert.equal(empty.code.percent, null); assert.deepEqual(layoutUnits(empty.units), []);
});

test('source reader rejects unapproved origins and limits streaming bytes even without a length header', async context => {
  const original = globalThis.fetch;
  const mock = context.mock.method(globalThis, 'fetch', async () => new Response(new Uint8Array(2048)));
  try {
    await assert.rejects(readProgressSource('https://example.com/report', new AbortController().signal));
    assert.equal(mock.mock.calls.length, 0);
    await assert.rejects(readProgressSource('https://decomp.dev/report', new AbortController().signal, 1024));
    assert.equal(mock.mock.calls[0].arguments[1].credentials, 'omit');
    assert.equal(mock.mock.calls[0].arguments[1].redirect, 'error');
  } finally { globalThis.fetch = original; }
});

test('portable SVG has fixed map ratio, visible credit/date and safely escaped unit labels', () => {
  const model = imageModel({ units: [{ name: '<script>&"', total: 100, matching: 40 }], code: { total: 100, matching: 40, remaining: 60, percent: 40 } }, { title: 'Test & game', owner: 'team', repo: 'repo', version: 'US', timestamp: '2026-06-10T04:02:09Z', commit: '1234567890123456789012345678901234567890', historical: true });
  const svg = treemapSvg(model);
  assert.equal(model.width, 1200); assert.equal(model.mapHeight, 600);
  assert.match(svg, /team &amp; contributors/); assert.match(svg, /2026-06-10/); assert.match(svg, /HISTORICAL REPORT/);
  assert.match(svg, /&lt;script&gt;&amp;&quot;/);
  assert.doesNotMatch(svg, /<script|<foreignObject|<image|<style|https?:\/\/[^<]*\.(?:ttf|css)/);
});
