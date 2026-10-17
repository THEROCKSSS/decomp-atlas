// Public source adapters. Counts are validated before any chart is drawn.
const count = value => {
  if (!(typeof value === 'number' || typeof value === 'string' && /^\d+$/.test(value))) throw new Error('Missing or invalid count');
  const number = Number(value);
  if (!Number.isSafeInteger(number) || number < 0) throw new Error('Count outside the supported range');
  return number;
};
const timestamp = value => {
  if (typeof value !== 'string' || !/^\d{4}-\d\d-\d\dT/.test(value) || !Number.isFinite(Date.parse(value))) throw new Error('Invalid report date');
  return new Date(value).toISOString();
};
const commit = value => {
  if (typeof value !== 'string' || !/^[a-f0-9]{40}$/i.test(value)) throw new Error('Invalid report commit');
  return value;
};
export function breakdown(total, matching) {
  total = count(total); matching = count(matching);
  if (matching > total) throw new Error('Matching count exceeds its total');
  return { total, matching, remaining: total - matching, percent: total ? matching / total * 100 : null };
}
export function parseObjdiff(data, context) {
  if (data?.owner?.toLowerCase() !== context.owner.toLowerCase() || data?.repo?.toLowerCase() !== context.repo.toLowerCase()) throw new Error('Unexpected project report');
  const versions = data.report_versions;
  if (!Array.isArray(versions) || !versions.includes(context.version)) throw new Error('Unreported target version');
  const sha = commit(data.commit?.sha);
  // Legacy API silently falls back to overall measures for an unknown unit.
  // Curated unit IDs are verified at a particular report commit.
  if (context.unit && sha !== context.unitCommit) throw new Error('The unit needs verification against the new report');
  const measures = data.measures;
  if (!measures || typeof measures !== 'object') throw new Error('Missing report measures');
  const code = breakdown(measures.total_code, measures.matched_code);
  const functions = measures.total_functions === undefined && measures.matched_functions === undefined ? null : breakdown(measures.total_functions, measures.matched_functions);
  const linked = measures.complete_code === undefined ? null : breakdown(code.total, measures.complete_code);
  return { code, functions, timestamp: timestamp(data.commit?.timestamp), commit: sha, version: context.version, versions: versions.filter(value => typeof value === 'string' && /^[\w.-]{1,100}$/.test(value)), supplement: linked ? { label: 'Completed / linked code', value: linked.matching, total: linked.total, percent: linked.percent, note: 'An independent upstream measure; it does not establish handwritten or functional source coverage.' } : null };
}
function csvRows(csv) {
  if (typeof csv !== 'string' || !csv.trim()) throw new Error('Empty progress feed');
  const rows = csv.trim().split(/\r?\n/).map(line => {
    const fields = line.trim().split(',');
    if (fields[0] !== '2' || fields.length < 5) throw new Error('Unsupported progress CSV');
    const time = count(fields[1]) * 1000;
    if (!Number.isSafeInteger(time) || !Number.isFinite(new Date(time).getTime())) throw new Error('Invalid progress timestamp');
    return { timestamp: new Date(time).toISOString(), commit: commit(fields[2]), code: breakdown(fields[4], fields[3]) };
  });
  return rows.sort((left, right) => Date.parse(right.timestamp) - Date.parse(left.timestamp));
}
export function parseZelda(matchingCsv, decompiledCsv) {
  const latest = csvRows(matchingCsv)[0];
  const decompiled = decompiledCsv ? csvRows(decompiledCsv).find(row => row.timestamp === latest.timestamp && row.commit === latest.commit) : null;
  if (decompiled && (decompiled.code.total !== latest.code.total || decompiled.code.matching < latest.code.matching)) throw new Error('Incompatible progress measures');
  return { ...latest, version: 'MQ Debug ROM', versions: [], functions: null, supplement: decompiled ? { label: 'Decompiled code (includes matching)', value: decompiled.code.matching, total: decompiled.code.total, percent: decompiled.code.percent, note: 'The upstream nonmatching feed includes matching code. These percentages must not be added together.' } : null };
}
async function read(url, signal) {
  const response = await fetch(url, { signal, credentials: 'omit', cache: 'no-store', referrerPolicy: 'no-referrer' });
  if (!response.ok) throw new Error(`Source returned ${response.status}`);
  const maximum = 1024 * 1024;
  if (Number(response.headers.get('content-length')) > maximum) throw new Error('Progress feed too large');
  const reader = response.body.getReader();
  const chunks = []; let length = 0;
  try {
    while (true) {
      const { value, done } = await reader.read(); if (done) break;
      length += value.byteLength;
      if (length > maximum) throw new Error('Progress feed too large');
      chunks.push(value);
    }
  } finally { await reader.cancel(); reader.releaseLock(); }
  const bytes = new Uint8Array(length); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return new TextDecoder().decode(bytes);
}
export async function fetchProgress(context, signal) {
  if (!/^[A-Za-z0-9-]+$/.test(context.owner) || !/^[A-Za-z0-9_.-]+$/.test(context.repo)) throw new Error('Invalid project source');
  if (context.provider === 'decomp-dev') {
    const url = new URL(`https://decomp.dev/${context.owner}/${context.repo}.json`);
    url.searchParams.set('version', context.version);
    if (context.unit) url.searchParams.set('unit', context.unit);
    return { ...parseObjdiff(JSON.parse(await read(url, signal)), context), sources: [{ label: 'decomp.dev report JSON', url: url.href }] };
  }
  if (context.provider === 'zelda' && context.owner === 'zeldaret' && context.repo === 'oot') {
    const matching = 'https://zelda.deco.mp/assets/csv/progress-oot-matching.csv';
    const decompiled = 'https://zelda.deco.mp/assets/csv/progress-oot-nonmatching.csv';
    const [match, complete] = await Promise.all([read(matching, signal), read(decompiled, signal).catch(error => { if (signal.aborted) throw error; return null; })]);
    return { ...parseZelda(match, complete), sources: [{ label: 'Zelda matching feed', url: matching }, ...(complete ? [{ label: 'Zelda decompiled feed', url: decompiled }] : [])] };
  }
  throw new Error('No verified progress source');
}
