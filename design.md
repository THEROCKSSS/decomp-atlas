# Decomp Atlas — Library

Owen selected prototype A, Library, on October 17, 2026 and requested it across the whole website. This is the accepted visual system, not another style exploration.

## Intent

Make decompilation projects easy to discover, keep original maintainer credit visible, and give new contributors a readable path into upstream work. The catalogue is an illustrated library; project pages explain the source and status; the wiki is a practical field guide.

## Shared system

- Dark violet paper, raised charcoal surfaces, light ink, muted secondary text, and a restrained violet accent. Exact OKLCH values live in `public/assets/tokens.css`.
- Space Grotesk headings, Manrope body text, JetBrains Mono for utility labels and commands. All fonts are local, with OFL notices alongside them.
- An icon rail, compact wordmark, Discover / The wiki navigation, project search, and Add a project action appear throughout. Mobile overrides turn the rail horizontal and keep search usable.
- Original artwork belongs to the browsing and project surfaces. The wiki uses type, spacing, rules, and small outline icons. A generic original illustration covers projects without bespoke artwork.
- Project detail routes preserve prominent maintainer credit, canonical links, source-check dates, and explicit NON-LIVE DATA labels. Upstream boards remain external; no invented progress numbers.
- Integrated progress graphs use the Library palette, matching and all remaining bytes/functions, exact-count hover/focus/touch feedback, and restrained reveal motion. Live feed labels are separate from the age/status of the report. Curated unit views preserve URL state. See `docs/PROGRESS.md` for source and metric rules.
- Guide articles have readable line lengths, contents anchors, source links, and copyable commands. Submission tickets remain previewed locally and submitted by the visitor on GitHub.
- Primary actions use violet; the featured project uses a light action. Borders and surface changes provide hierarchy without decorative gradients.

## Interaction and layout

Filters are buttons with pressed state. Search and platform filters persist in the URL. Header search works from interior pages. The `/` shortcut focuses search outside editable fields. Guide anchors and dedicated project routes survive reloads.

Motion is limited to brief button feedback and anchor/preview scrolling, with reduced-motion support. No autoplay, background motion, hover-only controls, or transition-all rules.

Responsive rules live only in max-width media overrides. The approved desktop Library structure remains the base. Empty results have a clear explanation and recovery action; unknown routes use the same shell.

## Source and preservation

Shared templates: `scripts/site.mjs`. Build pipeline: `scripts/build.mjs`. Styles and behavior: `public/assets/`. Facts and wiki text remain in `data/`.

The original three concepts remain on `prototype/decomp-atlas-styles` and draft PR #2. Production does not ship the comparison controls or unused concepts. Old `/prototypes/` links redirect to the catalogue and retain search/platform state; the old `/#projects` anchor is retained.

## Review

Rendered review covered desktop, tablet, and phone layouts, all normal route families, empty results, submission validation and preview, guide anchors and command copying. See `docs/VERIFICATION.md` for actual evidence and limits.
