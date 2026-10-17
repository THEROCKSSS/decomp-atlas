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

The public source change is reviewed through a GitHub pull request. The website starts owner-private. Native Sites results determine deployment success; local browser evidence alone does not establish a deployed URL. HANDOFF.md records the final PR and hosting state.
