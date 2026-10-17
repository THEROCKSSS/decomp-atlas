# Decomp Atlas — Handoff

## Session
- Date: October 17, 2026, America/Denver
- Agent: Codex
- Prior work: initial site and three homepage prototypes, preserved in PRs #1 and #2
- Repo: https://github.com/THEROCKSSS/decomp-atlas
- Site: https://decomp-atlas.richlotus16.chatgpt.site — owner-private; reuse the existing Site
- Local preview: http://127.0.0.1:8798 (`npm run dev` after build)
- Branch: codex/library-design, based on prototype commit 3da2681e27d94c1039d8b259f984994e23ece9f6
- Rollout PR: https://github.com/THEROCKSSS/decomp-atlas/pull/3 (open, based on codex/initial-site; leave unmerged)

## Current state
Owen explicitly selected A, Library, and requested its application to the entire website, including wiki and project pages. That decision is settled and the rollout is published owner-private. Implementation and exact published source: 2cf0119e7d3a7c6c8c6f9dd199d10019abd03a8a. PR #3 is open with its check passing. This delivery-record update follows the published source without changing site assets. GitHub is the sole tracker; the original concepts remain on prototype/decomp-atlas-styles and draft PR #2.

## What was done
- Promoted the selected Library palette, local fonts, original house image, SVG scenes, icon rail, wordmark, header search, project collection, and footer into the production system.
- Added shared templates in scripts/site.mjs for catalogue, four project pages, wiki index, four guides, submission form, legacy redirect, and 404. Build orchestration remains in scripts/build.mjs.
- Added readable guide layouts with contents/source navigation, related project cards, prominent credits, date/status labels, and the restyled ticket composer. Catalogue facts, source links, and wiki text are unchanged.
- Kept submission validation, safe ticket preview, clipboard behavior, and filter persistence. Interior-page header search navigates to the catalogue. Old prototype URLs preserve q/platform while dropping variant; old /#projects bookmarks retain a target.
- Added generic original artwork for future listings without bespoke scenes. Removed unused prototype runtime assets from this branch; the prototype source branch remains intact.
- Applied mobile overrides, visually corrected a narrow wiki callout and project-art margins, and refreshed the favicon. PNG and TTF MIME types are explicit in preview.
- Fixed and exercised a local-preview crash when a rebuild temporarily removes generated 404.html: a 503 fallback keeps the server alive.
- Build/check passed across thirteen generated HTML files. Chromium exercised 72 route/viewport combinations, 16 follow-up project-art checks, five callout widths, desktop and mobile journeys. Two independent mechanical reviews passed. See docs/VERIFICATION.md for checks and limits.
- Accepted visual contract is design.md; docs/PROTOTYPES.md records historical exploration and the settled choice.
- Session retrospective was explicitly declined; do not ask again.
- PR #3 was created and read back with correct base/head/state. Its implementation CI passed: https://github.com/THEROCKSSS/decomp-atlas/actions/runs/39017150077/job/117351519797 . Staged whitespace and credential-pattern checks passed with zero matches.
- Sites source helper verified the exact pushed source. Native Node static preparation and Windows tar produced the inspected 42-entry archive after the known shell-wrapper failure. No plugin files were changed.
- Native private publication returned succeeded, Site version 3, deployment appgdep_6ad330b345f881918951b36b41fdb956, version appgprj_6ad31e6fc4e881918feeed6c3e474d0c~appgver_69d2ffd3dfb48191a3292027eb6ba869. Version readback confirms exact source 2cf0119e7d3a7c6c8c6f9dd199d10019abd03a8a.
- Published in-app browser exercise confirmed home → Sims2 → wiki → progress-board guide → submission page, with the selected Library design rendered. Live GameCube filtering changed four projects to one and back. The delivered browser tab remains on the homepage.
- Task-owned local Chromium and preview server were stopped. Screenshots and verification report remain under ignored output/library/ as visual evidence.

## What's not done
- The requested site rollout and private publication are complete. Automatic approval review rejected both bounded recursive cleanup and a file-by-file cleanup attempt with the stated reason "blocked by policy". Generated dist/, output/library-package/, output/library-site.tar.gz, and output/library/pr-body.md remain locally. They are ignored and not in the PR; cleanup was not bypassed.
- Merge remains with Owen. PR #1 is still the initial-site base; PR #2 preserves prototypes. The rollout PR should target codex/initial-site so its diff contains only the selected production result. Do not merge prototype PR #2 as a prerequisite.
- Public audience, task claims, hosted builds, progress uploads, and live metrics are outside the agreed scope.

## How to resume
1. From this directory run `npm run build`, `npm run check`, then `npm run dev`.
2. Open http://127.0.0.1:8798, /wiki/, /projects/sims2/, and /submit/.
3. Keep Library as the accepted design; inspect design.md and docs/VERIFICATION.md.
4. Publish through the existing Sites project in .openai/hosting.json, using the exact pushed source SHA. Never register another Site or persist short-lived tokens.
5. On Windows, the plugin packaging wrapper passes an unconverted path to WSL bash. Use the installed official prepare-site-build.cjs into a verified project-local stage, then native Windows tar when that wrapper fails. Keep credential input on stdin only.

## Credentials / config
- GitHub: existing gh keyring authentication for THEROCKSSS.
- Sites identity: .openai/hosting.json. Existing owner-private project_id is appgprj_6ad31e6fc4e881918feeed6c3e474d0c.
- Sites source uses its connector-managed Git endpoint; GitHub remains the issue/PR tracker. No application runtime secrets or backend are needed.

## Known issues / limits
- Sims2 upstream decomp.dev board reported disabled on October 17, 2026; Atlas preserves the warning and mirrors no percentages.
- The Windows shell packaging wrapper has a known path failure; the Node-preparation/native-tar fallback succeeded in prior publications without modifying plugin files.
- Local rendering and representative published routes are verified; every deployed route was not exhaustively retested. Screenshots are evidence, not an accessibility certification.
- Until source PRs are merged, GitHub's default branch contains the bootstrap README.

## Checklist
- [x] Apply accepted Library system across all normal routes.
- [x] Exercise responsive layouts and real user journeys; fix observed gaps.
- [x] Complete mechanical review and update design/verification records.
- [x] Commit, push, and open the reviewed rollout PR.
- [x] Publish exact source privately, read back the version, and check representative deployed routes.
- [x] Stop task-owned preview and Chromium; retain visual evidence.
- [ ] Remove ignored generated/package artifacts when local cleanup is permitted; automatic approval review blocked both cleanup attempts.
