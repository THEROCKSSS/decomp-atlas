# Decomp Atlas — Handoff

## Session
- Date: October 17, 2026, America/Denver
- Agent: Codex
- Repo: https://github.com/THEROCKSSS/decomp-atlas
- Prior sessions: none
- Local preview: http://127.0.0.1:8798 (start with npm run dev; the task-owned preview is stopped during cleanup)
- Site: https://decomp-atlas.richlotus16.chatgpt.site — owner-private, deployment succeeded
- Source PR: https://github.com/THEROCKSSS/decomp-atlas/pull/1 (open; do not self-merge)

## Current state
Owen rejected the first visual design and requested substantially different prototype styles. Three locally verified homepage concepts now live on prototype/decomp-atlas-styles, based on source branch commit 66d9891f6bec3ceddbd1e1c35f90e43501e7da05. The current task is to publish the comparison route and preserve it for Owen to choose a direction. No winner has been selected. The existing homepage and functional routes remain unchanged. The previous owner-private Site publication was source commit 9031ace1c1df37a3626e21fdd5a070d8bc6a0612. GitHub remains the sole contribution tracker.

## What was done
- Current request: added `/prototypes/` with Library, Workbench, and Index concepts, URL-backed comparison controls, working search/filter, and an interactive illustrative unit map.
- Added original imagegen house artwork, original SVG scenes, four self-hosted font families and their OFL notices, isolated prototype tokens/CSS/JS, and a two-line build hook.
- Applied frontend design/orchestration, style exploration, craft, Hallmark, motion, imagegen, and prototype skills. Details and asset provenance are in docs/PROTOTYPES.md.
- Mechanically reviewed prototype controls and base-site preservation; fixed mobile accessible style labels and unsupported query filters. Reviewed screenshots on desktop, tablet, and phones.
- The session-retrospective request was explicitly declined; do not ask again for this completed build.
- Confirmed first-version scope and GitHub choice with Owen.
- Created the public GitHub repository with an initial README.
- Registered the owner-private Decomp Atlas Site and persisted its identity in .openai/hosting.json.
- Added four attributed listings, four sourced wiki guides, real static project routes, search/filter, and a GitHub ticket composer.
- Added issue/PR templates, CI checks, a dependency-free build/server, and project vocabulary.
- Verified source facts through upstream repositories, decomp.dev HTML, objdiff schema, and integration documentation.
- Passed build and catalogue/link/syntax checks across twelve HTML pages; exercised eleven normal routes plus 404 in Chromium.
- Exercised search/filter/empty recovery, reload persistence, source links, form failures and ticket preparation, clipboard copying, keyboard skip link, and twelve route/viewport combinations at desktop/tablet/mobile sizes.
- Completed two independent mechanical reviews and fixed their findings, including an upstream OOT tutorial that was removed, safe URL attributes, explicit featured-project lookup, source dates, and stale generated routes.
- Mechanically verified those fixes using a disposable project-local copy: fresh build/check, escaping, reordered feature, distinct dates, stale-route removal, and absence of inline styles all passed. Fixture cleanup was verified.
- Staged whitespace and credential-pattern checks passed with zero credential-pattern matches.
- GitHub CI check completed SUCCESS: https://github.com/THEROCKSSS/decomp-atlas/actions/runs/39013216715/job/117339934766 .
- Sites native owner-private publication returned status succeeded and the deployed URL, deployment appgdep_6ad321e46b1081919ee536014590f9c7.
- Published Site version: appgprj_6ad31e6fc4e881918feeed6c3e474d0c~appgver_eae7a379d5588191a03182d3feac2458.
- Resolved a Windows packaging-wrapper path failure using the same official Node static-preparation helper and native Windows tar. The original source helper verified the pushed Site source commit, and the archive was inspected before publication.
- Added README, CONTRIBUTING.md, MIT license for original Atlas work, and docs/VERIFICATION.md.

## What's not done
- Prototype publication and its review PR are pending. Choosing a direction belongs to Owen; do not turn a prototype into the permanent site without that choice.
- The source PR remains unmerged for Owen. Until merged, the default GitHub branch contains only the bootstrap README; full contribution templates and source are on the PR branch.
- Site audience remains private; public visitor access has not been requested.
- Task claims, hosted builds, progress uploads, and a live metrics feed are outside the agreed first version.

## How to resume
From this project directory:
1. Run `npm run build` then `npm run check`.
2. Run `npm run dev` and open http://127.0.0.1:8798.
3. Review the existing PR and docs/SPEC.md; keep its scope and accepted tracker choice.
   For the new style work, use http://127.0.0.1:8798/prototypes/?variant=library and docs/PROTOTYPES.md; the comparison bar also exposes Workbench and Index.
4. For website edits, rebuild and publish through the Sites workflow with the existing project_id, never a new Site registration. On Windows the packaged shell wrapper needs path handling; call the installed official prepare-site-build.cjs into a verified project-local stage, then native tar if the wrapper fails. Keep temporary source tokens on stdin only.

## Credentials / config
- GitHub: existing gh keyring authentication, THEROCKSSS.
- Sites: .openai/hosting.json stores project identity, never the temporary write token.
- No runtime secrets, database, or API integrations are needed.
- The Sites source snapshot uses its connector-managed Git endpoint; GitHub remains the only issue/PR tracker.
- The GitHub feature branch was published and its remote SHA matched implementation commit 42884f1.

## Known issues / blockers
- Sims2 decomp.dev dashboard says the project is disabled; no progress percentages are displayed in Atlas.
- The web extraction tool could not read decomp.dev; direct read-only HTTP inspection succeeded.
- Standard package-site.mjs calls WSL bash with an unconverted Windows path, which failed. The bounded Node-preparation/native-tar fallback completed publication. No plugin files were edited.
- Local screenshots are under ignored output/; docs/VERIFICATION.md records the browser evidence. Native publication confirms hosting, not authenticated browser exercise of every deployed private route.

## Build order
- [x] Resolve scope, tracker, and source facts.
- [x] Implement the complete static slice.
- [x] Exercise and visually review all main journeys.
- [x] Review, open PR, publish privately, and verify returned deployment state.

## Current prototype checklist
- [x] Inspect the existing site and relevant design skills.
- [x] Build three distinct visual structures and comparison controls.
- [x] Exercise controls and review desktop/mobile rendering.
- [ ] Capture the prototype branch and open its review PR.
- [ ] Publish the comparison route privately and remove unused artifacts.
- [ ] Owen chooses a direction; integrate it only after that choice.
