# Decomp Atlas

A community field guide to decompilation projects, by [Owen](https://github.com/THEROCKSSS). Discover the original repositories, see who maintains them, and learn how to contribute or set up progress boards.

[Website — owner-private review](https://decomp-atlas.richlotus16.chatgpt.site) · [Suggest a repository](https://github.com/THEROCKSSS/decomp-atlas/issues/new) · [Contribution guide](CONTRIBUTING.md)

The first version includes searchable and platform-filtered listings, dedicated project pages, a ticket composer that opens GitHub for review, and four wiki guides. Tickets are submitted by the visitor on GitHub and reviewed before a listing is added.

Owen selected the **Library** design. Its dark violet palette, self-hosted typography, artwork, navigation, and controls now run across the catalogue, project pages, wiki, submission flow, and 404 page. See [design.md](design.md). The original three concepts remain on `prototype/decomp-atlas-styles`; old `/prototypes/` URLs continue to the catalogue with search and platform filters retained.

## Featured projects and original credit

| Project | Upstream maintainer / team | Canonical repository |
| --- | --- | --- |
| The Sims 2 for GameCube | natebag & contributors | [Sims2DECOMP](https://github.com/natebag/Sims2DECOMP) |
| Ocarina of Time | zeldaret & contributors | [oot](https://github.com/zeldaret/oot) |
| Super Mario 64 | n64decomp & contributors | [sm64](https://github.com/n64decomp/sm64) |
| Pokémon Emerald | pret & contributors | [pokeemerald](https://github.com/pret/pokeemerald) |

Atlas showcases these projects. Their original teams retain credit, ownership, and their own licensing terms; a listing does not imply endorsement. Site artwork includes an original generated house illustration and original SVG scenes; this repository contains no game binaries or extracted game assets. Font license notices are included beside the self-hosted files.

## Run locally

Use Node.js 22 or later. The site has no package dependencies.

```sh
npm run build
npm run check
npm run dev
```

Open http://127.0.0.1:8798. Set `PORT` to change the preview port. The server listens on loopback and returns the generated 404 page for unknown paths. The build recreates `dist/`, which contains generated files only.

## Contribute

Open a submission or correction issue, or fork this repository and send a focused pull request. Project records live in `data/projects.json`; sourced wiki guides live in `data/wiki.json`. See [CONTRIBUTING.md](CONTRIBUTING.md) for the fields and validation workflow. Interface source lives in `public/assets/` and `scripts/site.mjs`; `scripts/build.mjs` generates dedicated static routes.

GitHub is this project's contribution tracker. Source changes go through pull requests. The existing Site deployment stays private until Owen chooses a public audience.

## Sources and progress

Bundled catalogue entries are labeled **NON-LIVE DATA**, with a source-check date on each project page. This version does not fetch progress percentages or contributor counts.

The Sims 2 listing links to both [its decomp.dev board](https://decomp.dev/natebag/Sims2DECOMP) and [the targets_s2c unit](https://decomp.dev/natebag/Sims2DECOMP?unit=targets_s2c). The board reported that the project was disabled when checked on October 17, 2026; Atlas discloses that state rather than presenting potentially stale numbers as current.

The progress-board wiki uses the [official integration guide](https://decomp.wiki/tools/decomp-dev), [objdiff measurement schema](https://github.com/encounter/objdiff/blob/main/objdiff-core/protos/report.proto), and [decomp.dev GitHub App](https://github.com/apps/decomp-dev). A board describes code comparisons; available contribution tasks and claims remain with each upstream project.

## Deployment and next steps

`.openai/hosting.json` identifies the existing Site and its static `dist/` output. Use the Sites source and packaging workflow to publish that exact committed source. Keep temporary hosting credentials out of files and history.

The next useful upgrades are more reviewed listings, link-status maintenance, and—if needed—an explicitly sourced, dated progress feed. Authentication, task claims, build execution, and report uploads are outside this version.

See [HANDOFF.md](HANDOFF.md) for the verified delivery state and [docs/SPEC.md](docs/SPEC.md) for the agreed scope.
