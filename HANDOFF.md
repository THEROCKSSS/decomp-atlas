# Decomp Atlas — Handoff

## Session
- Date: October 17, 2026, America/Denver
- Agent: Codex
- Repo: https://github.com/THEROCKSSS/decomp-atlas
- Site: https://decomp-atlas.richlotus16.chatgpt.site — owner-private; reuse existing identity
- Local: http://127.0.0.1:8798 (`npm run build`, `npm run check`, `npm test`, `npm run dev`)
- Branch: codex/progress-graphs; base75dab8aaf6d9560f89a927be887c40c07c5c5700
- Progress PR: https://github.com/THEROCKSSS/decomp-atlas/pull/4 — open, based on codex/library-design; leave unmerged
- Prior lineage: PR#1 initial site, draftPR#2 historical prototypes, PR#3 selected Library rollout. Leave merging to Owen.

## Current state
Owen requested integrated decompilation progress graphs and confirmed matching versus ALL remaining code. The Library design remains settled. The integration is complete and published owner-private as Site version4, exact source14fa5950a38868704d4cd3196270a30709862701. PR#4 is open and its implementation CI passed. This delivery-record commit follows publication without changing site assets. No new tracker choice or style interview is needed.

## What was done
- Public live feed adapters in public/assets/progress-data.js and browser charts in progress.js; no dependencies, backend, credentials, uploads, or build execution added.
- Project progress panels show fully matching versus remaining code bytes and function counts where reported. Completed/linked or decompiled coverage is separate and never added to matching. Exact counts support hover, focus, and tap; sorted positive portions reveal with reduced-motion support.
- Report provenance includes target version, entire-project/unit scope, commit/date, original feeds, and fetch time. LIVE DATA is distinct from HISTORICAL REPORT. Sims board-disabled warning is preserved.
- Sims2 JSON supplies overall and targets_s2c views, latest June10,2026. Unknown upstream unit IDs silently fall back to overall, so curated unit IDs are bound to a verified report commit. A changed commit fails verification rather than presenting the wrong scope.
- Zelda's two CSV feeds supply OOT MQ Debug ROM whole-game code bytes, latest August15,2024. No function counts are invented; decompiled totals are aligned by timestamp+commit and include matching. The other two projects have explicit no-report states and upstream links.
- Fixed-host requests omit credentials/referrers, cap responses at1MiB, cancel prior requests and timeout after12seconds. Preview CSP includes the two source hosts. Build remains offline.
- Added six adapter tests, CI test step, build validation and source syntax checks, plus docs/PROGRESS.md. Wiki/README explain the graph definitions and separate live retrieval from old reports. decomp.dev sunset/closed registration is reflected with a sourced migration link; no unverified host swap.
- Actual build/check/tests passed. Browser checks covered30 responsive states,15 fully revealed chart checks, real APIs, exact values, unit/reload/keyboard/cancellation, reduced motion, no-report states, failed source/retry, zero/invalid counts and changed commits. Two mechanical reviews completed; findings were fixed. See docs/VERIFICATION.md.
- Evidence: ignored output/progress/ has hashes/source probes, desktop/tablet/phone screenshots, and controlled failure screenshot. Sources and screenshots are not bundled as a fake progress feed.
- Source commit14fa5950a38868704d4cd3196270a30709862701 was pushed to GitHub and the Sites source. Staged whitespace and credential-pattern checks passed with zero matches. PR#4 readback confirmed base/head/state; CI passed: https://github.com/THEROCKSSS/decomp-atlas/actions/runs/39019814772/job/117359218016 .
- The known Windows WSL packaging-wrapper path failure recurred after source push. Official Node static preparation and native Windows tar produced the inspected44-entry archive; no plugin changes. Native private deployment succeeded: appgdep_6ad33ac094008191a95e0ab1c57c179e, version appgprj_6ad31e6fc4e881918feeed6c3e474d0c~appgver_ecf9e7292be88191937d9fb20e804e03. Version readback confirms Site version4 and exact source14fa5950a38868704d4cd3196270a30709862701.
- Authenticated in-app browser verified actual published network-fed charts for Sims2 overall, Sims2 targets_s2c, and OOT. Counts, target/version, historical dates, source links and report warnings rendered. Both upstream hosts work in the deployed page; no change to owner-private access. The browser deliverable remains open on the Sims unit view.
- Task-owned local Chromium and preview server are stopped. Deployment archive (about2.6MB), prepared build (about3.1MB), and visual/probe evidence are retained under ignored output/progress/ for exact-version reproduction and review. Prior cleanup rejection remains recorded below; no destructive workaround was attempted.

## What's not done
- The requested graphs and private publication are complete. Existing upstream limitations remain explicit: only verified reports are connected; unavailable measurements remain unavailable.
- Merge remains with Owen. Public audience, task claims, hosted builds, report uploads and contributor metrics are not requested.
- Prior automatic cleanup attempts were rejected with "blocked by policy". Older ignored dist/package/archive/PR text remains; preserve user data and do not bypass the gate. Current task-owned browser/server were closed after delivery.

## How to resume
1. Run `npm run build`, `npm run check`, `npm test`, then `npm run dev` from this directory.
2. Open /projects/sims2/, /projects/sims2/?unit=targets_s2c, and /projects/ocarina-of-time/. Check source date and historical warning.
3. Read docs/PROGRESS.md for adapters, source columns, and invariants. Read design.md for accepted Library styles.
4. Use .openai/hosting.json and existing Site source workflow; exact pushed commit must match the packaged output. Use short-lived credentials on hidden stdin only.
5. Windows shell packager has a known WSL path failure after source push. Use the official prepare-site-build.cjs to a verified project-local stage and native Windows tar, then the native private save/deploy operation. No plugin edits.

## Credentials / configuration
- Existing gh keyring auth for THEROCKSSS; GitHub is sole tracker (docs/agents/issue-tracker.md).
- Sites project_id appgprj_6ad31e6fc4e881918feeed6c3e474d0c, recorded in .openai/hosting.json. No runtime secrets.
- Public feeds use decomp.dev and zelda.deco.mp; source URLs and compatibility limitations are in docs/PROGRESS.md.

## Known limits
- Both connected reports are historical. decomp.dev is being sunset; Sims has not been found on ByteMatch. Future feed failure shows retry/upstream links rather than fake values.
- Unit verification is deliberately tied to the curated report commit. Update data/projects.json only after verifying a newer unit report.
- Charts do not measure already-decompiled-but-nonmatching functional source or prove build success. No authentication, tenancy, storage or database surface was added; existing owner-private Sites enforcement is unchanged.
- Local and representative deployed browser checks are complete; they are not an accessibility/security certification or exhaustive coverage of every possible upstream response.
- Session retrospective was explicitly declined; do not ask again.

## Checklist
- [x] Confirm metric meaning and prove actual source access.
- [x] Implement source adapters, graph states and curated unit links.
- [x] Run tests, browser journeys, responsive/motion checks, review and documentation.
- [x] Commit/push/open reviewed progress PR.
- [x] Publish exact source privately and verify actual deployed charts.
- [x] Stop task-owned local browser/server and record final state.
