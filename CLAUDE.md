# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Node-RED custom node (`node-red-contrib-markdown-note`) that displays Markdown-formatted notes directly on the flow canvas. Unlike the built-in Comment node, notes are always visible without clicking to expand. Published to npm as `node-red-contrib-markdown-note`.

## Architecture

This is a minimal two-file Node-RED node (no build step, no dependencies, no tests):

- **`note.js`** — Server-side node registration. Purely a UI node with no inputs/outputs and no message processing.
- **`note.html`** — All client-side logic in a single file containing four `<script>`/`<style>` blocks:
  - **Node registration** — Registers the `note` type with Node-RED, defines defaults (`name`, `content`), and editor lifecycle hooks (`oneditprepare`, `oneditsave`, `oneditcancel`, `oneditresize`).
  - **Canvas rendering** (`renderNoteNode`) — The core function. Uses D3 to inject a `foreignObject` with rendered Markdown HTML into the SVG canvas. Handles content sanitization via `RED.utils.sanitize()`, Markdown rendering via `RED.utils.renderMarkdown()`, height auto-sizing snapped to 40px grid increments, and top-edge anchoring so nodes don't drift when resized.
  - **Event wiring** — Hooks into `nodes:add`, `nodes:change`, `view:redraw`, `workspace:change`, and `flows:loaded` events (all with `setTimeout` delays) to trigger re-renders.
  - **CSS** — Styles for rendered Markdown content and rules to hide Node-RED's default label/icon elements.
- **`examples/markdown-note-example.json`** — Importable example flow shown in Node-RED's Import menu.

## Development

No build, lint, or test commands exist. The project has zero runtime dependencies.

### Local testing

Install the node into a local Node-RED instance for development:

```bash
cd ~/.node-red
npm install /path/to/node-red-contrib-markdown-note
# restart Node-RED
```

### Publishing

```bash
npm publish
```

The `files` array in `package.json` controls what gets published: `note.js`, `note.html`, `README.md`, `LICENSE`, `examples/`.

## Key Constraints

- **Node-RED >= 3.0.0** required (declared in `package.json` under `node-red.version`).
- **No external dependencies** — relies entirely on Node-RED editor APIs (`RED.utils.sanitize`, `RED.utils.renderMarkdown`, `RED.editor.createEditor`) and D3 (globally available in the editor).
- **SVG security restrictions** — Links rendered in Markdown are not clickable due to Node-RED's SVG sandboxing. This is a known limitation, not a bug.
- **Height snapping** — Node height is snapped to 40px increments for grid alignment. The top edge is anchored via `_noteTopY`/`_noteLastY` tracking to prevent visual drift on content changes.
- **Node type name is `"note"`** — Changing this would break existing flows that use the node.
