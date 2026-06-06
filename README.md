# Node-RED Markdown Note

[![NPM Version](https://img.shields.io/npm/v/node-red-contrib-markdown-note.svg)](https://www.npmjs.com/package/node-red-contrib-markdown-note)
[![Downloads](https://img.shields.io/npm/dt/node-red-contrib-markdown-note.svg)](https://www.npmjs.com/package/node-red-contrib-markdown-note)
[![License](https://img.shields.io/npm/l/node-red-contrib-markdown-note.svg)](LICENSE)

A Node-RED node for adding **Markdown-formatted notes** directly on the flow canvas.  
Designed for inline documentation, design notes, and contextual explanations that remain visible while editing or reviewing flows.

![Node Preview](screenshots/hero.png)

---

## Why use Markdown Note?

The standard Comment node hides content by default. Markdown Note keeps your notes **always visible**, making it easier to:

- Document flow logic inline  
- Highlight important information  
- Include structured content with headings, lists, and code blocks  

| Feature | Comment Node | Markdown Note |
|---------|-------------|---------------|
| Visibility | Collapsed by default | Always visible |
| Formatting | Plain text | Markdown (headers, lists, code, blockquotes) |
| Colors | Fixed editor style | Custom background and text colors |
| Structure | Minimal | Suitable for detailed documentation |

---

## Features

- **Always-visible notes** – No need to click to expand.  
- **Markdown rendering** – Support for headers, lists, emphasis, code blocks, quotes.  
- **Custom colors** – Choose the note background and text color from the node properties.
- **Task lists** – Track TODOs or action items inline.  
- **Content-aware layout** – Automatically adjusts to the rendered content.
- **Developer-focused** – Document payload formats, API contracts, assumptions, or edge cases directly on the flow.  

---

## Limitations

- Links are rendered as text but are not clickable due to Node-RED editor restrictions on SVG content.

---

## Installation

Requires Node-RED 3.0 or later.

1. Open Node-RED and go to **Menu** → **Manage palette** → **Install**
2. Search for `node-red-contrib-markdown-note` and click **Install**
3. Restart Node-RED when prompted

Advanced users can also install via `npm install node-red-contrib-markdown-note` in the Node-RED user directory.

---

## Example flow

After installing and restarting Node-RED, open the built-in example from
**Menu** → **Import** → **Examples** → `node-red-contrib-markdown-note`.

> **Note:** Node-RED must be restarted after installation before importing.
> If you import first, Node-RED will report `Imported unrecognized type: note`
> and the nodes will not render.

---

## Support

Markdown Note is free and open source.  

If it helped you document your flows, please star the repository so other Node-RED users can find it.

Sponsorships are appreciated, but never expected.

[![Star Repository](https://img.shields.io/badge/%E2%AD%90%20Star%20this%20Repo-GitHub-lightgrey?logo=github&logoColor=black)](https://github.com/Backroads4Me/node-red-contrib-markdown-note)
[![GitHub Sponsors](https://img.shields.io/badge/Sponsor-GitHub-EA4AAA?logo=github-sponsors&logoColor=white)](https://github.com/sponsors/Backroads4Me)
