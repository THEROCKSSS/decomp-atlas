# Decomp Atlas — Handoff

## Session
- Date: October 17, 2026, America/Denver
- Agent: Codex
- Repo: https://github.com/THEROCKSSS/decomp-atlas
- Prior sessions: none
- Local preview: http://127.0.0.1:8798 (only while the dev process is running)
- Site: private, registered; deployment not yet performed

## Current state
Initial GitHub README commit fb6cb080214c16a3db4761c01a9ae00af1f58881; working branch codex/initial-site. The full first version is implemented and locally verified, ready for its implementation commit, GitHub PR, and private Site deployment. GitHub is the confirmed tracker. The workspace's unrelated work was left intact.

## What was done
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
- Added README, CONTRIBUTING.md, MIT license for original Atlas work, and docs/VERIFICATION.md.

## What's not done
- Commit, GitHub PR, private Site deployment, and final cleanup are pending. The source PR will remain unmerged for Owen.
- Site audience remains private; public visitor access has not been requested.

## How to resume
From this project directory:
1. Run `npm run build` then `npm run check`.
2. Run `npm run dev` and open http://127.0.0.1:8798.
3. Follow docs/SPEC.md, verify changed browser journeys, update this handoff, and open the source pull request.
4. Publish through the Sites workflow with the existing project_id, never a new Site registration.

## Credentials / config
- GitHub: existing gh keyring authentication, THEROCKSSS.
- Sites: .openai/hosting.json stores project identity, never the temporary write token.
- No runtime secrets, database, or API integrations are needed.
- The Sites source snapshot uses its connector-managed Git endpoint; GitHub remains the only issue/PR tracker.

## Known issues / blockers
- Sims2 decomp.dev dashboard says the project is disabled; no progress percentages are displayed in Atlas.
- The web extraction tool could not read decomp.dev; direct read-only HTTP inspection succeeded.

## Build order
- [x] Resolve scope, tracker, and source facts.
- [x] Implement the complete static slice.
- [x] Exercise and visually review all main journeys.
- [ ] Review, open PR, publish privately, and verify returned deployment state.
