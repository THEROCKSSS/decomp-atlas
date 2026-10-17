# Decomp Atlas — Handoff

## Session
- Date: October 17, 2026, America/Denver
- Agent: Codex
- Repo: https://github.com/THEROCKSSS/decomp-atlas
- Site: https://decomp-atlas.richlotus16.chatgpt.site — owner-private; reuse existing identity
- Local: http://127.0.0.1:8798 (`npm run build`, `npm run check`, `npm test`, `npm run dev`)
- Branch: codex/progress-graphs; base75dab8aaf6d9560f89a927be887c40c07c5c5700
- Prior lineage: PR#1 initial site, draftPR#2 historical prototypes, PR#3 selected Library rollout. Leave merging to Owen.

## Current state
Owen requested integrated decompilation progress graphs and confirmed matching versus ALL remaining code. The Library design remains settled. The integration is implemented and locally verified, awaiting commit/PR/private publication. Existing published Library source is2cf0119e7d3a7c6c8c6f9dd199d10019abd03a8a, Site version3. No new tracker choice or style interview is needed.

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

## What's not done
- Commit, open stacked PR against codex/library-design, publish exact source owner-private, then verify deployed cross-origin requests and record returned IDs.
- Merge remains with Owen. Public audience, task claims, hosted builds, report uploads and contributor metrics are not requested.
- Prior automatic cleanup attempts were rejected with "blocked by policy". Older ignored dist/package/archive/PR text remains; preserve user data and do not bypass the gate. Current task-owned browser/server still need closing after delivery.

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
- Local browser checks are not exhaustive deployed checks or an accessibility/security certification.
- Session retrospective was explicitly declined; do not ask again.

## Checklist
- [x] Confirm metric meaning and prove actual source access.
- [x] Implement source adapters, graph states and curated unit links.
- [x] Run tests, browser journeys, responsive/motion checks, review and documentation.
- [ ] Commit/push/open reviewed progress PR.
- [ ] Publish exact source privately and verify actual deployed charts.
- [ ] Stop task-owned local browser/server and record final state.
