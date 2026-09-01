# Node-RED Markdown Note

[![NPM Version](https://img.shields.io/npm/v/node-red-contrib-markdown-note.svg)](https://www.npmjs.com/package/node-red-contrib-markdown-note)
[![Downloads](https://img.shields.io/npm/dt/node-red-contrib-markdown-note.svg)](https://www.npmjs.com/package/node-red-contrib-markdown-note)
[![License](https://img.shields.io/npm/l/node-red-contrib-markdown-note.svg)](LICENSE)

**Keep rich, always-visible documentation directly on your Node-RED flow
canvas.**

[Install](#installation) · [Try the example](#example-flow) ·
[Report a problem](https://github.com/Backroads4Me/node-red-contrib-markdown-note/issues/new) ·
[Contribute](#contributing)

Markdown Note renders headings, lists, task lists, code, quotes, and custom
colors without making reviewers open each node to read its contents.

![Markdown Note displayed on a Node-RED flow canvas](screenshots/hero.png)

## Why use Markdown Note?

The standard Comment node hides content by default. Markdown Note keeps your
notes visible while you build or review a flow.

| Feature | Comment node | Markdown Note |
| --- | --- | --- |
| Visibility | Collapsed by default | Always visible |
| Formatting | Plain text | Markdown headings, lists, code, and quotes |
| Colors | Fixed editor style | Custom background and text colors |
| Best suited for | Short comments | Structured inline documentation |

## Features

- **Always-visible notes** keep important context on the canvas.
- **Markdown rendering** supports headings, lists, emphasis, code, quotes, and
  task lists.
- **Custom colors** distinguish warnings, decisions, examples, or sections.
- **Content-aware layout** adjusts the node to its rendered content.
- **Developer-focused documentation** records payload formats, API contracts,
  assumptions, and edge cases beside the flow they describe.

## Installation

Markdown Note requires Node-RED 3.0 or later.

In Node-RED, open **Menu → Manage palette → Install**, search for
`node-red-contrib-markdown-note`, and select **Install**. Restart Node-RED when
prompted.

To install from the Node-RED user directory instead:

```bash
npm install node-red-contrib-markdown-note
```

## Example flow

After restarting Node-RED, open **Menu → Import → Examples →
node-red-contrib-markdown-note** to load the included example.

> Import the example after restarting. Otherwise Node-RED reports
> `Imported unrecognized type: note` and cannot render the nodes.

## Limitations

Links render as text but are not clickable because of Node-RED editor
restrictions on SVG content.

## Contributing

Bug reports, feature ideas, and pull requests are welcome. Use
[GitHub Issues](https://github.com/Backroads4Me/node-red-contrib-markdown-note/issues)
to describe the problem or proposed behavior before starting a substantial
change.

## Support the project

Markdown Note is free and open source. If it helps you document your flows,
starring the repository helps other Node-RED users find it. Sponsorships are
appreciated, but never expected.

[![Star Repository](https://img.shields.io/badge/%E2%AD%90%20Star%20this%20Repo-GitHub-lightgrey?logo=github&logoColor=black)](https://github.com/Backroads4Me/node-red-contrib-markdown-note)
[![GitHub Sponsors](https://img.shields.io/badge/Sponsor-GitHub-EA4AAA?logo=github-sponsors&logoColor=white)](https://github.com/sponsors/Backroads4Me)
