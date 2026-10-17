# Homepage style prototypes

Owen rejected the first website design and requested substantially different, nicer prototype styles. He subsequently selected **A, Library**, and requested its application across the whole website, including the wiki and project pages. The following records the original exploration on `prototype/decomp-atlas-styles`, not the current production file layout. The accepted system is documented in `../design.md`.

## Compare

One route: `/prototypes/`. Shareable variants:

- `?variant=library`: image-led collection with compact icon navigation, a featured game, self-hosted Space Grotesk/Manrope type, violet accents, and a four-project collection.
- `?variant=workbench`: repository workspace with a side rail, compact table, cyan accents, and a selectable illustrative unit map. It does not show real Sims 2 build progress.
- `?variant=index`: warm charcoal index with orange accents, Barlow Condensed display type, numbered project rows, small artwork, and integrated wiki links.

The fixed comparison bar switches variants. Left/right arrows cycle; arrow keys do the same outside text inputs. `/` focuses search. Selection, search, and platform filters are URL-backed and reload-stable. Project, wiki, and submission links use the existing functional routes.

The original `/` homepage, catalogue facts, wiki content, and submission logic are preserved. Prototype source is quarantined on `prototype/decomp-atlas-styles`; a selected direction should be implemented deliberately across the real routes after Owen chooses.

## Design and motion contract

- Audience: people discovering decompilation projects and potential contributors.
- Primary action: find an upstream project and contribution route while keeping original creator credit visible.
- Library prioritizes visual browsing; Workbench prioritizes source status and unit exploration; Index prioritizes names, attribution, and direct navigation.
- Concept changes use a short opacity entrance only. Button press uses a small translation. No scroll choreography, autoplay, background animation, or added motion framework.
- Reduced motion disables both transitions and animation. Responsive changes live in max-width media overrides in the isolated prototype stylesheet.
- Tokens live in `public/prototypes/tokens.css`; the original global stylesheet is untouched.

## Applied skills

Frontend design orchestrator selected prototype/UI, frontend-design, frontend-design-craft, frontend-design-library for exploration, Hallmark for structural variety and critique, web-design-motion for restrained interactions, imagegen for original raster artwork, and browser verification. React-only component packs, paid UI generators, and 3D engines were not needed by this native static project.

Self-critique after rendered review (subjective, not user acceptance): Library P4/H5/E4/S5/R4/V5; Workbench P5/H4/E4/S5/R4/V5; Index P4/H5/E4/S4/R4/V5. The variants differ in navigation, density, type, hierarchy, artwork treatment, and the main browsing surface. A full accessibility certification or universal 58-gate compliance claim is not made for these throwaway prototypes.

## Assets and provenance

- `public/prototypes/assets/house-cutaway.png`: original built-in imagegen output, 2,424,875 bytes. Retained because the Library concept consumes it as the feature and project artwork. It is explicitly identified as an illustration, not a game screenshot.
- Image prompt: original wide 16:9 isometric miniature early-2000s suburban house cutaway, teal sofa and CRT, kitchen, stairs, garden and miniature people; detailed house on the right two thirds with quiet dark blue space on the left for HTML text; warm lamps, cool twilight, tactile miniature-model materials, no copied game screenshot, interface, logo, words, or watermark.
- `public/prototypes/assets/scenes.svg`: original geometric illustrations for the other catalogue entries, drawn for the prototype. They are not extracted game assets.
- Font files are self-hosted copies from the official Google Fonts repository, with each SIL Open Font License notice retained beside them: `google/fonts/main/ofl/manrope`, `spacegrotesk`, `barlowcondensed`, and `jetbrainsmono`.
- Custom navigation icons are original inline SVG strokes. No external icon library or runtime font CDN is used.

## Verification

- `npm run build`: passes; original pages plus one comparison page.
- `npm run check`: passes catalogue, wiki, JavaScript parsing, and local links across thirteen HTML pages.
- `node --check public/prototypes/prototypes.js`: passes.
- Chromium 151.0.7922.34, Windows: all three styles rendered at 320, 375, 414, 768, 1280, and 1440 pixels. No observed document overflow; mobile search and comparison controls are visible. Screenshots were inspected and the mobile image crop, search layout, and treemap bounds were corrected.
- Native click/keyboard checks pass: variant switching and invalid variant recovery, accessible mobile style button names, protected input arrows, slash search focus, search/platform state across styles and reload, empty-result recovery, invalid-platform recovery, unit selection by mouse and Enter, and exact unit state feedback.
- Mechanical review confirmed ten distinct linked local routes return 200, assets and font licenses load, and the root homepage has its original title/stylesheet with zero prototype regions.
- Zero observed console/page errors or failed asset requests in the tested prototype journeys.
- Images under ignored `output/prototypes/` are review evidence; they do not establish Owen's visual acceptance.

## Current delivery state

The prototype publication returned `succeeded` for source fa5040f563ffdf2a6ab726c88e04e29eff2ccf55. The site remains owner-private. After the accepted Library rollout, `/prototypes/` redirects to the catalogue; the source branch preserves the three styles and switcher for historical review.

Draft PR https://github.com/THEROCKSSS/decomp-atlas/pull/2 preserves the prototypes and has a successful GitHub Actions check. Library is the settled choice. The separate rollout branch promotes its assets and system across all routes and removes the unused prototype runtime from production. Merge remains with Owen.
