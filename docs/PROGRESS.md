# Progress graph contract

Owen requested integrated decompilation graphs and selected **matching versus all remaining code**. Preserve Library and the existing project/source credits. The first slice places graphs in each project's progress panel, with unit selection where a verified unit is curated. The progress feed is read live; catalogue metadata remains NON-LIVE DATA.

## Meaning

Matching is fully matched code bytes or functions from the upstream report. Remaining is the reported total minus matching, not a claim that the remainder has been decompiled. Bytes and function counts have different denominators. Zero totals are unknown/unmeasurable rather than 0% progress. Missing, invalid, negative, or contradictory counts cannot become fabricated zeroes or silently clamped percentages.

Completed/linked code is a separate upstream measurement. Do not subtract matching from it or label it handwritten/functional source coverage. Fuzzy similarity is not matching coverage. Source: [objdiff report schema](https://github.com/encounter/objdiff/blob/main/objdiff-core/protos/report.proto).

## Verified sources — October 17, 2026

- [Sims2 overview](https://decomp.dev/natebag/Sims2DECOMP.json) and [curated unit overview](https://decomp.dev/natebag/Sims2DECOMP.json?unit=targets_s2c): HTTP 200, JSON, CORS `*`. Metadata includes commit SHA/date, target versions, measures. Latest overall is 678,408 / 4,145,724 matching code bytes and 9,657 / 18,458 matching functions, commit 72278b244e431de11a88e658fb81df8e5057a3aa dated June 10, 2026. Unit targets_s2c is 38,972 / 312,204 bytes and 499 / 934 functions. The board is disabled; label the report historical even when fetched live. The API omits disabled status, so preserve the curated board warning.
- Unknown Sims unit IDs silently produce whole-project measures. Restrict unit requests to the curated list in `data/projects.json`. Metadata categories remain whole-project aggregates even with a unit filter, so do not mix them into a unit graph. Target version G4ZE69 differs from the report's schema-version field.
- [Zelda matching feed](https://zelda.deco.mp/assets/csv/progress-oot-matching.csv) and [decompiled feed](https://zelda.deco.mp/assets/csv/progress-oot-nonmatching.csv): HTTP 200, CORS `*`, four-hour caching. [Metadata](https://zelda.deco.mp/assets/json/games.json) identifies Ocarina of Time MQ Debug Rom. Headerless schema-2 rows contain timestamp at index 1, commit at 2, and whole-game code numerator/denominator at 3/4. Indices 5/6 are only the Code subdivision. Latest row is August 15, 2024, commit 1649bf32d64523ba79f6896d2b9c816a9cd20e77, 3,843,392 / 3,843,392 matching bytes. No function counts are supplied. Decompiled includes matching; align its row by timestamp and SHA and keep it a separate metric.
- Wind Waker's public decomp.dev JSON served as a working control for the Sims probe. decomp.dev's zeldaret/oot endpoint returns 404. ByteMatch's Sims endpoint returns 404; do not substitute hosts automatically. [Migration documentation](https://bytematch.dev/docs/migrating-from-decomp-dev) explains the sunset and compatible API, but compatibility does not establish project registration.
- Projects without a verified report retain useful repository links and an explicit no-report state. Do not infer 100% from a README or show an unknown metric as zero.

## Acceptance and verification

- Real source requests precede implementation. Build remains offline and dependency-free; no API credentials, upload endpoints, proxy, or backend are introduced.
- Graphs identify metric, target version/unit, source, report timestamp/commit, and fetch time. Old/disabled reports stay historical. Failures show a useful message, retry action, and upstream links.
- Matching/remaining segments exclude zero-size portions, sort by size, expose exact values on hover/focus/touch, and animate once on reveal with reduced-motion support. Counts remain visible as text.
- Test the source-adapter boundary using worked examples and malformed data. Exercise real browser live requests, controls, query reload, unavailable/empty/error states, keyboard, and desktop/tablet/mobile rendering. Review against this contract and repository standards before delivery.
