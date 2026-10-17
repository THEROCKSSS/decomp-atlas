# Homepage summaries and shareable code map

Owen asked for matching/non-matching progress on homepage cards and a downloadable map shaped like the treemap above decomp.dev's timing footer. The accepted meaning remains matching versus **all remaining code**; preserve Library and upstream creator credit.

## Delivered shape

- Homepage cards use compact existing feeds, show matching/remaining code percentages, target-aware exact-count tooltips, report dates and historical labels. Unconnected or failed reports are unavailable rather than zero. The card's main project link and its separate Code map & export link remain keyboard/touch accessible. Never download full unit reports for homepage summaries.
- The project code map is opened explicitly or through `?map=1#code-map`. Its tile area is 1200×600, a 2:1 rectangle like the supplied reference. Each tile is a translation unit; area is total code bytes, color is exact matched/total code. Zero, partial and fully matching units have distinct colors. This is an original area-weighted layout, not a copy of upstream's fuzzy-similarity visualization.
- The preview/export always covers the entire project, independently of the selected metric unit. Hover/focus/tap gives the exact unit count; arrow keys cycle a single roving tab stop. Zero-code units are omitted from the drawing.
- SVG and PNG are standalone 1200×680 images: 600px map plus 80px visible caption for title/target, maintainer credit, matching/remaining, report date, source/commit and snapshot/historical labeling. SVG contains no scripts, external fonts/styles/images, foreignObject or website dependency. PNG draws the same geometry directly on canvas.
- Copy Markdown references the downloaded file beside a README and includes upstream credit/source. It changes to PNG after PNG download or SVG after SVG download. The UI explains uploading the file and adjusting its path. The existing Site stays private; no private image URL is advertised as a public GitHub embed.

## Real-source gate and invariants

Verified October 17, 2026: [Sims overview](https://decomp.dev/natebag/Sims2DECOMP/G4ZE69.json?mode=overview) identifies commit 72278b244e431de11a88e658fb81df8e5057a3aa, report June 10, 2026. Its [commit-pinned full report](https://decomp.dev/natebag/Sims2DECOMP/G4ZE69/72278b244e431de11a88e658fb81df8e5057a3aa.json?mode=report) is 2,969,158 bytes, 691 positive-code units, 71 fully matching, 473 partial and 147 unmatched. Unit totals reconcile exactly to 4,145,724 code bytes and 678,408 matching bytes. A Wind Waker control report also reconciled (1,683 units, 19 zero-code); both sources permit public CORS.

Full reports omit commit metadata. Fetch a verified overview and then pin the full-report URL to that version/SHA; reject mismatched overview/report/unit sums. The full report reader is separately capped at 16 MiB and 10,000 units, with a 20-second overall timeout. Summary limits remain 1 MiB. Requests omit credentials/referrers and reject redirects outside the fixed-source contract.

[Objdiff's schema](https://github.com/encounter/objdiff/blob/main/objdiff-core/protos/report.proto) uses protobuf scalar defaults: omitted zero-valued unit/report scalar counts mean zero. This applies to the full report adapter, not to missing summary data. Invalid/null/negative/unsafe counts, duplicate or invalid names and contradictory totals fail verification. Progress categories can overlap; aggregate units rather than adding category rows.

The [upstream map implementation](https://decomp.dev/static/js/report.f6a3fd22.js) colors by fuzzy_match_percent; our exact-match coloring is explicitly labeled. Successful current retrieval still shows the June historical report, not an invented current measurement. Downloaded images are NON-LIVE DATA snapshots.

## Verification boundary

Test report normalization, byte-weighted area/coverage/non-overlap/determinism, zero defaults, invalid data and safe portable SVG serialization at the data/export boundary. Exercise actual homepage feeds, lazy pinned report fetch, standalone downloads and dimensions, Markdown copying, tile hover/keyboard/touch, filter/navigation persistence, loading/failure/retry, independent card failures, and desktop/tablet/phone rendering. See docs/VERIFICATION.md and HANDOFF.md for actual results.
