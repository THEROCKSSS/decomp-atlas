import test from 'node:test';
import assert from 'node:assert/strict';
import { parseObjdiff, parseZelda, breakdown } from '../public/assets/progress-data.js';

const context = { owner: 'natebag', repo: 'Sims2DECOMP', version: 'G4ZE69' };
const report = () => ({ owner: context.owner, repo: context.repo, default_version: 'G4ZE69', report_versions: ['G4ZE69'], commit: { sha: '72278b244e431de11a88e658fb81df8e5057a3aa', timestamp: '2026-06-10T04:02:09Z' }, measures: { total_code: '4145724', matched_code: '678408', total_functions: 18458, matched_functions: 9657, complete_code: 678408 } });

test('matching and all remaining use exact reported counts, not fuzzy or linked percentages', () => {
  const input = report(); input.measures.fuzzy_match_percent = 90; input.measures.matched_code_percent = 100;
  const output = parseObjdiff(input, context);
  assert.equal(output.code.matching, 678408); assert.equal(output.code.remaining, 3467316);
  assert.equal(output.functions.remaining, 8801);
  assert.ok(Math.abs(output.code.percent - 16.36405) < .0001);
  assert.equal(output.supplement.label, 'Completed / linked code');
});

test('zero totals stay unmeasurable; missing and invalid values cannot turn into zero', () => {
  assert.equal(breakdown(0, 0).percent, null);
  for (const [total, matched] of [[null, 0], [10, undefined], [10, -1], [10, 11], [Infinity, 1], ['12.5', 1], ['9007199254740993', '1']]) assert.throws(() => breakdown(total, matched));
  const input = report(); delete input.measures.matched_code; assert.throws(() => parseObjdiff(input, context));
});

test('identity, target version, commit and timestamp must match a usable upstream report', () => {
  for (const change of [data => data.owner = 'other', data => data.report_versions = ['PAL'], data => data.commit.timestamp = 'invalid', data => data.commit.sha = '<script>']) {
    const input = report(); change(input); assert.throws(() => parseObjdiff(input, context));
  }
  const input = report(); delete input.measures.total_functions; delete input.measures.matched_functions;
  assert.equal(parseObjdiff(input, context).functions, null);
});

test('a curated unit cannot silently receive whole-project fallback after its verified report changes', () => {
  const input = report();
  const scope = { ...context, unit: 'targets_s2c', unitCommit: input.commit.sha };
  input.measures = { total_code: 312204, matched_code: 38972, total_functions: 934, matched_functions: 499 };
  assert.equal(parseObjdiff(input, scope).code.remaining, 273232);
  assert.equal(parseObjdiff(input, scope).supplement, null);
  assert.throws(() => parseObjdiff(input, { ...scope, unitCommit: undefined }));
  input.commit.sha = '1234567890123456789012345678901234567890';
  assert.throws(() => parseObjdiff(input, scope));
});

test('Zelda uses the whole-game code columns and aligns separate decompiled counts by commit and time', () => {
  const sha = '1649bf32d64523ba79f6896d2b9c816a9cd20e77';
  const matching = `2,1723688003,${sha},60,100,20,25,10,25,30,50,0,0`;
  const decompiled = `2,1723688002,${sha},99,100\n2,1723688003,${sha},80,100`;
  const output = parseZelda(matching, decompiled);
  assert.equal(output.code.matching, 60); assert.equal(output.code.remaining, 40);
  assert.equal(output.supplement.value, 80); assert.equal(output.functions, null);
  assert.equal(output.timestamp, '2024-08-15T02:13:23.000Z');
  assert.equal(parseZelda(matching, `2,1723688002,${sha},99,100`).supplement, null);
});

test('Zelda selects the newest row independently of order and rejects contradictory data', () => {
  const sha = '1649bf32d64523ba79f6896d2b9c816a9cd20e77';
  assert.equal(parseZelda(`2,20,${sha},8,10\n2,10,${sha},4,10`, null).code.matching, 8);
  for (const csv of ['', `2,20,${sha},11,10`, `9,20,${sha},1,10`, `2,invalid,${sha},1,10`]) assert.throws(() => parseZelda(csv, null));
  assert.throws(() => parseZelda(`2,20,${sha},8,10`, `2,20,${sha},7,10`));
});
