# Decomp Atlas — Handoff

## Session
- Date: October 17, 2026, America/Denver; agent Codex.
- Repo: https://github.com/THEROCKSSS/decomp-atlas
- Site: https://decomp-atlas.richlotus16.chatgpt.site — owner-private; preserve identity/audience.
- Local: http://127.0.0.1:8798; Node 22+, no package dependencies.
- Branch: codex/home-progress-exports, based on codex/progress-graphs at 1de3e045f65edf7eb64fb6da3c049bf79ac0bddc.
- Existing PR stack: #1 initial; draft #2 historical prototypes (preserve, not a merge prerequisite); #3 Library based on initial; #4 progress graphs based on Library. New feature PR must base codex/progress-graphs. Leave all merging to Owen.

## Current state
The homepage matching/remaining summaries and shareable treemap are implemented and verified locally, with source changes currently uncommitted. Previous Site version 4 serves source 14fa5950a38868704d4cd3196270a30709862701. Commit/push, review PR and private publication of this feature remain. Library and the accepted matching-versus-ALL-remaining definition stay settled. GitHub is the sole tracker; no new interview is needed.

## What was done
- Homepage cards fetch compact overview feeds independently and display exact code-byte matching/remaining percentages, dates, historical labels and useful unavailable states. Their project/export links are separate accessible targets.
- Sims project Code unit map fetches only on opening, reads a verified overview then its commit-pinned full report, and reconciles every unit to the aggregate. 691 positive-code units reconcile to 4,145,724 total / 678,408 matching bytes. Full reports allow protobuf omitted scalar zeros; malformed or contradictory data fail verification.
- Area is code bytes; color is exact matching coverage, explicitly distinct from upstream fuzzy similarity. Original balanced binary partition fills a 1200×600 (2:1) map area. The preview covers the whole project, independently of selected summary unit. Hover/tap and arrow/Home/End keyboard controls expose exact counts.
- Standalone SVG and native-canvas PNG exports are 1200×680, with an 80px visible maintainer/date/source/commit/snapshot caption. SVG has no scripts or external assets. GitHub Markdown references the downloaded local filename, changes format with download, and supports copy selection fallback. No private Site URL is advertised as an image host.
- Fixed-origin, credential-free reads retain 1 MiB summary bounds; full reports have a separate 16 MiB streaming cap, 10,000 unit limit and 20-second timeout. No new dependencies, backend, upload service, credentials or game code.
- Build/check and 12 tests pass. Actual source reports, SVG/PNG downloads, offline SVG, dimensions/caption, hover/click/keyboard, reduced motion, no-JS fallback, ten phone/tablet/desktop states, catalogue filters/reload and independent failures/retry were exercised. Two read-only Spec/Standards reviews found no blockers. See docs/VERIFICATION.md and docs/TREEMAP.md.
- Evidence and downloadable example exports are retained under ignored output/treemap/. Prior output/progress/ and Library evidence remain. Older cleanup attempts were rejected by automatic approval review with “blocked by policy”; do not bypass. No task source files are stored outside this project.

## Gap / checklist
- [x] Inspect reference image, accepted decisions, memory and real report.
- [x] Implement validated summaries, map and standalone exports.
- [x] Exercise build/tests, browsers, failure states and independent reviews.
- [ ] Commit/push, open PR and check CI.
- [ ] Publish exact source privately; verify hosted cards, map and downloads.
- [ ] Record delivery IDs/source; stop owned preview/browser and inspect artifacts.

## How to resume
1. Run npm run build, npm run check, npm test, then npm run dev.
2. Visit / and /projects/sims2/?map=1#code-map. Exercise card filters, map keyboard/readout and downloads. Wiki /wiki/progress-boards/#section-7 explains sharing; prior anchors are retained.
3. Read docs/TREEMAP.md and docs/PROGRESS.md for source invariants. design.md records Library.
4. Commit on the feature branch, push origin and open PR based on codex/progress-graphs; never self-merge.
5. Reuse .openai/hosting.json and Sites source helper. Keep short-lived credentials in memory/hidden stdin; exact pushed SHA must match packaged assets.
6. Windows shell packaging wrapper has a known WSL path failure after push. Use official prepare-site-build.cjs to a verified new project-local staging directory and native Windows tar; inspect archive, verify source SHA, then native private save/deploy. Never edit plugin files.

## Credentials / config
- GitHub keyring auth for THEROCKSSS; tracker choice in docs/agents/issue-tracker.md.
- Sites project_id appgprj_6ad31e6fc4e881918feeed6c3e474d0c, static dist output, no runtime secrets.
- Public data hosts decomp.dev and zelda.deco.mp.

## Known limits
- Both connected reports are historical: Sims June 10, 2026, Zelda August 15, 2024. LIVE DATA means current retrieval, not current measurement. Exports are NON-LIVE DATA snapshots.
- Treemap export currently supports the connected decomp.dev Sims provider. Other projects keep summary/no-report states. decomp.dev is being sunset; no unverified ByteMatch migration.
- Tests are feature validation, not an accessibility/security certification or every possible upstream response. Hosted behavior remains pending this feature's publication.
- Session retrospective explicitly declined; do not ask again.
