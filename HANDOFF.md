# Decomp Atlas — Handoff

## Session
- Date: October 17, 2026, America/Denver
- Agent: Codex
- Prior work: initial site and three homepage prototypes, preserved in PRs #1 and #2
- Repo: https://github.com/THEROCKSSS/decomp-atlas
- Site: https://decomp-atlas.richlotus16.chatgpt.site — owner-private; reuse the existing Site
- Local preview: http://127.0.0.1:8798 (`npm run dev` after build)
- Branch: codex/library-design, based on prototype commit 3da2681e27d94c1039d8b259f984994e23ece9f6

## Current state
Owen explicitly selected A, Library, and requested its application to the entire website, including wiki and project pages. That decision is settled. The rollout is implemented and locally verified; source commit, PR, and publication are the remaining delivery steps. GitHub is the sole tracker. The original concepts remain on prototype/decomp-atlas-styles and draft PR #2. The working tree contains the intended rollout and updated records.

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

## What's not done
- Commit and push the verified rollout, open its stacked PR, publish the existing private Site, and record returned identifiers.
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
- Local rendering is verified; native publication must be checked separately. Screenshots are evidence, not an accessibility certification.
- Until source PRs are merged, GitHub's default branch contains the bootstrap README.

## Checklist
- [x] Apply accepted Library system across all normal routes.
- [x] Exercise responsive layouts and real user journeys; fix observed gaps.
- [x] Complete mechanical review and update design/verification records.
- [ ] Commit, push, and open the reviewed rollout PR.
- [ ] Publish exact source privately and record terminal deployment status.
- [ ] Clean task-owned preview, staging, archives, and generated output; retain visual evidence.
