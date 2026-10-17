# Verification — October 17, 2026

## Build and source checks

- `npm run build`: PASS. Four project pages, four wiki guides, catalogue, submission form, and 404 page generated.
- `npm run check`: PASS. Credited records, sourced guides, URL requirements, unique slugs/repositories, JavaScript parsing, and internal links across twelve generated HTML pages.
- `git diff --check`: PASS before staging.
- Runtime dependencies: none. No type checker or separate linter is configured; their execution is not claimed.

## Browser execution

Executed against http://127.0.0.1:8798 in installed Playwright Chromium 151.0.7922.34 on Windows, with reduced motion enabled.

- Search narrows by maintainer, persists its query after reload, and updates the visible result count.
- Platform filter narrows Nintendo 64 to two listings.
- A search with no match displays the empty state; Clear filters restores all four listings.
- A native project-row click opens the Sims 2 route; reload retains its rendered page.
- The exact Sims2 decomp.dev project and targets_s2c links, plus the current upstream contributor guide, were inspected.
- Submission rejects malformed GitHub paths, non-HTTPS board URLs, and whitespace-only required text. Valid input produces a visible ticket preview and correctly encoded GitHub issue composer URL.
- Markup entered as notes remains literal text; editing the form invalidates the previous preview.
- The form was exercised on the 390-pixel viewport. No test ticket was submitted to GitHub.
- The progress-board guide loads directly and after reload. Copy command writes the documented command to the clipboard.
- All eleven normal routes returned 200 and rendered. An unknown route returned the dedicated 404 page with status 404.
- Keyboard Tab reaches the visible skip link.
- Home, Sims2 detail, progress wiki, and submission pages were checked at 1440×1000, 768×1024, and 390×844: twelve route/viewport combinations with no horizontal overflow. Desktop, tablet, and mobile screenshots were visually inspected; an awkward mobile wiki link wrap was fixed.
- Final normal-route pass collected zero page errors, console errors, request failures, or CSP errors. The earlier deliberate 404 visit produced its expected console resource error.

Local screenshots are retained under ignored `output/` as visual evidence. These are viewport emulations, not a physical-phone test. Full accessibility certification and performance benchmark scores are not claimed.

## Review and factual sources

Independent mechanical standards and requirement checks found issues with URL attribute escaping, a removed upstream tutorial, check/build ordering, stale output routes, featured-project lookup, and recorded dates. The parent fixed them. A throwaway project-local fixture then passed fresh-copy build/check, URL quote escaping, reversed catalogue order with correct Sims2 feature, distinct source dates, stale-route removal, and zero inline styles across twelve pages. The fixture was removed and its absence verified.

The staged credential-pattern scan returned zero matches; staged whitespace checks passed. This is a bounded pattern check, not a full security audit.

Project metadata was checked against the canonical natebag/Sims2DECOMP, zeldaret/oot, n64decomp/sm64, and pret/pokeemerald repositories. The progress-board guide uses decomp.wiki/tools/decomp-dev, the upstream objdiff report schema, and the decomp.dev GitHub App. No undocumented decomp.dev boards or current percentages were invented.

## Delivery boundaries

The public source change is in open GitHub PR #1. Its GitHub Actions check returned SUCCESS. No merge was performed.

Native Sites private publication returned `status: succeeded` and https://decomp-atlas.richlotus16.chatgpt.site for source commit 9031ace1c1df37a3626e21fdd5a070d8bc6a0612. The first packaging wrapper failed because it passed a Windows path to WSL bash; the same official Node static-preparation helper plus native Windows tar produced the inspected deployment archive. Publication then succeeded with the original Site ID. No plugin source or host configuration was modified.

This verifies hosting through the native service result. The full journey checks above exercised the local build; authenticated browser exercise of every private production route is not claimed. HANDOFF.md records the exact version and deployment identifiers.

## Library rollout — October 17, 2026

Owen selected A, Library and requested it on all routes. The catalogue, four project detail pages, wiki index, four guides, submission form, and 404 use one Library system. The former prototype route redirects to the catalogue while preserving query/platform filters. The original prototype branch remains available.

- `npm run build` and `npm run check` pass: four credited listings, four sourced guides, JavaScript parsing, and internal links across thirteen generated HTML files.
- Chromium 151.0.7922.34 rendered twelve page/route states at 320, 375, 768, 1000, 1280, and 1440 pixels (72 layout checks). No document overflow or visible elements beyond the viewport were observed. Expected 404 resource messages came only from the intentionally missing route.
- After the project-art margin correction, all four project pages were rechecked at 320, 375, 768, and 1440 pixels (16 checks). The mobile wiki callout was visually refined and rechecked at 320, 375, 520, 768, and 1440 pixels. Desktop remains the selected Library composition.
- Desktop browser journeys passed: slash search focus; text/platform filtering; reload persistence; empty recovery; invalid filter cleanup; legacy prototype redirect; search from an interior page; all four canonical repositories and maintainer credits; Sims board-disabled and unit links; wiki navigation and anchor reload; clipboard command copying; required/invalid URL form states; safe ticket preview and canonical repository normalization; preview invalidation after edit; keyboard skip; reduced motion.
- A 375px journey passed using actual controls: platform filter → project → wiki guide → contents anchor → submission preview. The GitHub ticket URL was inspected, not submitted.
- Normal journeys produced no observed page/console errors or failed asset requests. All three local fonts loaded. Screenshots for home, project, wiki, guide, and submission at 375/1440 are retained under ignored `output/library/`, together with the desktop submission preview and a callout detail.
- Two independent mechanical reviews passed markup/labels/IDs/ARIA targets, local and cross-route anchors, SVG symbols, asset references and MIME types, font licenses, safe interpolation, and the unchanged catalogue/wiki facts. In-memory probes covered reordered records, empty catalogues, and a new valid project with generic artwork. A legacy `/#projects` anchor was retained.
- Local preview rebuild recovery was exercised by temporarily moving and restoring its generated 404 file: it returned 503 during the gap, then served 200, and remained alive. This fixes an observed development-server crash during concurrent rebuild/review.

Native private publication succeeded for source 2cf0119e7d3a7c6c8c6f9dd199d10019abd03a8a, version 3. Version readback confirms that exact source. The published site was also exercised in the authenticated in-app browser: homepage → Sims2 project → wiki index → progress-board guide → submission page. A guide screenshot showed Library rendering; live GameCube filtering changed the result count from four to one and back. PR #3's implementation CI passed.

These checks are not an accessibility certification or an exhaustive authenticated end-to-end test of every deployed owner-private route. Deployment provenance and current delivery state are recorded in HANDOFF.md. Task-owned local test browser/server were stopped. Automatic approval review rejected both cleanup approaches with "blocked by policy"; ignored generated build/package artifacts and temporary PR text remain locally alongside retained screenshots.

## Integrated progress graphs — October 17, 2026

- Phase-zero read-only probes succeeded for Sims2 overview + targets_s2c unit, Wind Waker control, and both Zelda CSV feeds. Status, CORS, timestamps, byte lengths, and SHA-256 hashes are captured in ignored output/progress/probe.json, with source responses beside it. Only public metrics were read; no game binaries, credentials, uploads, or build execution were used.
- `npm run build`, `npm run check`, and `npm test` pass. Six adapter tests cover exact worked counts, independence from fuzzy/headline percentages, zero/missing/invalid/unsafe integers, identity/version/date/commit validation, curated-unit commit changes, Zelda whole-game columns, row ordering, aligned decompiled metrics, and contradictory records. The first adapter test run failed before the implementation existed, then passed after implementation. CI includes the tests.
- Chromium 151.0.7922.34 rendered real network data for Sims2 overall and unit scopes and Ocarina of Time. The other two projects show a useful no-report state. All five states were checked at 320, 375, 768, 1000, 1280, and 1440px: 30 layout checks, no observed overflow or progress elements beyond the viewport. Fifteen follow-up chart checks confirmed bars fully reveal at desktop/tablet/mobile widths; screenshots were taken after animation completion.
- Browser interaction checks passed exact hover/focus/tap counts, native keyboard unit selection, unit query reload, catalogue → project → unit navigation, invalid unit normalization before requesting upstream, rapid selection cancellation, and reduced-motion behavior. Actual sources returned the expected counts and timestamps. Normal journeys produced no observed page/console errors.
- Controlled local response fixtures exercised visible loading, upstream503, error without percentages, successful retry, zero totals remaining unmeasured, contradictory counts rejected, and changed unit commits prevented from displaying whole-project fallback. These fixtures were removed before final real-source screenshots and were never bundled as progress data.
- Wiki navigation to the appended graph explanation at #section-6 passed; earlier section anchors remain intact. Stale wiki/README claims about not fetching progress were corrected, together with the now-closed decomp.dev registration path.
- Independent Standards and Spec mechanical reviews verified source safety, metrics, native structure and request lifecycle. Two Spec wording gaps were corrected: stale wiki fetch wording and provider-specific missing-function text. Curated-unit commit tests were added. No standards blocker was found.
- Interface/source operations use fixed public hosts, omit credentials/referrers, cap each response at1MiB, and abort after12seconds. Public report text uses safe DOM text, with validated counts/commits. The preview CSP allows only self plus the two connected upstream hosts for requests. This is feature validation, not a repository security audit or an accessibility certification.
- Private publication succeeded as Site version4 for exact source14fa5950a38868704d4cd3196270a30709862701. Authenticated in-app browser checks confirmed real hosted Sims2 overall graphs (16.36% bytes,52.32% functions), its targets_s2c graphs (12.48% bytes,53.43% functions), and Zelda's OOT graph (100% matching bytes, historical2024 report). Scope, target, dates, sources, and historical/disabled warnings rendered. This verifies that the hosted pages permit both upstream connections. Source/version and PR details are in HANDOFF.md.

## Homepage progress and portable treemap — October 17, 2026

- Build and static checks pass; 12 tests pass. The initial four treemap tests failed before implementation and passed afterward. Tests cover protobuf omitted zero values, exact reconciliation, invalid/unsafe data, deterministic code-weighted area without overlap, bounded streamed reads and escaped portable SVG.
- Real feeds show Sims 2 at 16.36% matching / 83.64% remaining on the homepage, and Zelda at 100% / 0%; unconnected projects stay unavailable. Homepage summaries use only compact feeds. A mechanical browser pass confirmed independent card failure, search/platform URL persistence and reload, empty-result recovery and sibling links without nested anchors.
- Opening the Sims map retrieves the overview followed by the SHA-pinned full report: 691 positive-code units, 4,145,724 total bytes and 678,408 matching bytes. Closed details fetch no full report. A forced full-report 503 shows retry, then recovers the real map. No unexpected console/page errors were observed; fixture HTTP503 logs were expected.
- Actual SVG and PNG downloads passed: 1200×680 overall, 1200×600 map area, 691 tiles, visible credit/date/source/historical labels. The standalone SVG loaded offline with no parser errors and zero HTTP requests. It contains no active content or external assets. The PNG file signature/dimensions were checked and its rendered caption/map inspected. Markdown uses the downloaded relative filename and changes format with the selected download. Copy fallback selects the text if clipboard access is unavailable.
- Browser hover/click on the largest unit reports 38,972 / 312,204 bytes. Arrow and End keys move the single roving tab stop; preview SVG uses role=group while the standalone export retains role=img. Reduced motion disables reveal animation. JavaScript-disabled users get an upstream-board explanation. These are functional checks, not an accessibility certification.
- Ten real-data layouts (homepage and open map at 320,375,768,1000,1440px) had no observed horizontal overflow or out-of-viewport progress/export controls. Desktop and phone screenshots plus actual exports are retained in ignored output/treemap/. Full-page stitched captures showed displaced fixed skip-link artifacts; a fresh viewport/DOM check confirmed the link stays offscreen and the actual project button remains correct.
- Two independent mechanical source reviews found no blocking Spec/Standards issues. No provider migration, public hosting audience change, new dependencies, credentials or game code were introduced.
