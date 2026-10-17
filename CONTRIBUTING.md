# Contributing to Decomp Atlas

Suggest a project through the website's Submit a repo form or open a [submission ticket](https://github.com/THEROCKSSS/decomp-atlas/issues/new). Include the canonical repository, project title, platform, maintainer/team credit, contribution instructions, and optional progress board.

For a catalogue pull request:

1. Fork this repository and create a branch.
2. Add one entry to `data/projects.json`, matching the existing fields. Use a unique lowercase slug. Set `board` to `null`, `boardStatus` to `none`, and `units` to `[]` when no board is supplied.
3. Set `checkedOn` to the date the sources were actually checked. Credit the upstream owner and contributors. Link authoritative sources in the pull request.
4. Run `npm run build` and `npm run check` with Node.js 22 or later. There are no package dependencies to install.
5. Open a pull request with the sources and validation results. A maintainer reviews it before inclusion.

Wiki guides live in `data/wiki.json`. Each guide has a category, summary, sections, and original source links. Keep setup instructions attributable and distinguish comparison metrics from build success. Interface changes also need browser checks on desktop, tablet, and mobile.

Report inaccurate attribution, moved links, disabled boards, or wiki corrections with a correction ticket. Contact upstream projects about their code; Atlas maintains the catalogue and its guides. Keep game binaries, proprietary assets, credentials, and unrelated changes outside contributions.
