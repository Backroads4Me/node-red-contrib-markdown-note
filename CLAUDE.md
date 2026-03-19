# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Working with External APIs and Libraries

When encountering errors or unexpected behavior related to Node-RED APIs, D3.js, or any other library/framework, **always use Context7** (`mcp__context7__resolve-library-id` → `mcp__context7__query-docs`) to look up the current documentation before guessing or relying on training knowledge. This ensures fixes are based on the latest API signatures and behavior, not outdated assumptions.

## Project Overview

A Node-RED custom node (`node-red-contrib-markdown-note`) that displays Markdown-formatted notes directly on the flow canvas. Unlike the built-in Comment node, notes are always visible without clicking to expand. Published to npm as `node-red-contrib-markdown-note`.

## Architecture

This is a minimal two-file Node-RED node (no build step, no dependencies, no tests):

- **`note.js`** — Server-side node registration. Purely a UI node with no inputs/outputs and no message processing.
- **`note.html`** — All client-side logic in a single file containing four `<script>`/`<style>` blocks:
  - **Node registration** (`<script type="text/javascript">`) — Registers the `note` type with Node-RED via `RED.nodes.registerType()`, defines defaults (`name`, `content`), and editor lifecycle hooks (`oneditprepare`, `oneditsave`, `oneditcancel`, `oneditresize`).
  - **Edit dialog template** (`<script type="text/html" data-template-name="note">`) — Hidden input for `content` plus an ACE editor container.
  - **Help text** (`<script type="text/html" data-help-name="note">`) — Sidebar help shown when node is selected.
  - **Canvas rendering** (`renderNoteNode`) — The core function. Uses D3 to inject a `foreignObject` with rendered Markdown HTML into the SVG canvas. Handles content sanitization via `RED.utils.sanitize()`, Markdown rendering via `RED.utils.renderMarkdown()`, height auto-sizing snapped to 40px grid increments, and top-edge anchoring so nodes don't drift when resized.
  - **Event wiring** — Hooks into `nodes:add`, `nodes:change`, `view:redraw`, `workspace:change`, and `flows:loaded` events (all with `setTimeout` delays) to trigger re-renders.
  - **CSS** (`<style>`) — Styles for rendered Markdown content and rules to hide Node-RED's default label/icon elements.
- **`examples/markdown-note-example.json`** — Importable example flow. Node-RED auto-discovers files in `examples/` and shows them under Import > Examples. The filename (minus `.json`) becomes the menu label.

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
- **No external dependencies** — relies entirely on Node-RED editor APIs and D3 (globally available in the editor).
- **SVG security restrictions** — Links rendered in Markdown are not clickable due to Node-RED's SVG sandboxing. This is a known limitation, not a bug.
- **Height snapping** — Node height is snapped to 40px increments for grid alignment. The top edge is anchored via `_noteTopY`/`_noteLastY` tracking to prevent visual drift on content changes.
- **Node type name is `"note"`** — Changing this would break existing flows that use the node.

---

## Node-RED Node Development Reference

This section documents the Node-RED APIs and patterns used by this project, based on the official Node-RED documentation. It serves as a quick reference when modifying the node.

### HTML File Structure (3+1 blocks)

Every Node-RED node `.html` file has three mandatory script blocks plus optional `<style>`:

1. **`<script type="text/javascript">`** — Client-side registration via `RED.nodes.registerType('type-name', { ... })`.
2. **`<script type="text/html" data-template-name="type-name">`** — Edit dialog HTML form. Input IDs must follow pattern `node-input-<property>` for `defaults` properties, or `node-input-<credential>` for credentials.
3. **`<script type="text/html" data-help-name="type-name">`** — Help sidebar content. The first `<p>` tag becomes the palette hover tooltip. Can also use `type="text/markdown"` for markdown help.
4. **`<style>`** (optional) — Custom CSS.

The `type-name` string must be identical across all three script blocks AND the server-side `RED.nodes.registerType()` call.

### Server-Side JS Pattern

```javascript
module.exports = function(RED) {
    function MyNode(config) {
        RED.nodes.createNode(this, config); // must be first call
        var node = this;
        node.on('input', function(msg, send, done) { ... });
        node.on('close', function(removed, done) { ... }); // 15s timeout
    }
    RED.nodes.registerType("my-node", MyNode);
};
```

Key server-side `RED` API: `RED.nodes.createNode`, `RED.nodes.registerType`, `RED.httpAdmin`, `RED.httpNode`, `RED.log`, `RED.settings`, `RED.auth.needsPermission()`.

Key node methods: `node.send(msg)`, `node.status({fill, shape, text})`, `node.error(err, msg)`, `node.warn()`, `node.log()`, `node.done()`.

### Registration Properties (RED.nodes.registerType)

| Property | Type | Used in this node | Description |
|---|---|---|---|
| `category` | string | `"common"` | Palette category |
| `color` | string | `"#F3E5AB"` | Background hex color |
| `defaults` | object | `{name, content}` | Editable properties. Each: `{value, required, validate, type}`. Reserved names: single chars, `id`, `type`, `wires`, `inputs`, `outputs` |
| `credentials` | object | — | Secret properties stored separately, never exported |
| `inputs` | number | `0` | `0` or `1` only |
| `outputs` | number | `0` | `0` or more |
| `icon` | string/fn | `"font-awesome/fa-file-text-o"` | Stock SVG, custom from `icons/` dir, or Font Awesome 4.7: `"font-awesome/fa-*"` |
| `label` | string/fn | fn returning content | Workspace label. `this` = node instance |
| `paletteLabel` | string/fn | — | Palette label (defaults to type name) |
| `labelStyle` | string/fn | — | `"node_label"` (default) or `"node_label_italic"` |
| `inputLabels` | string/arr/fn | — | Port hover labels |
| `outputLabels` | string/arr/fn | — | Port hover labels |
| `align` | string | — | `"left"` (default) or `"right"` |
| `button` | object | — | `{onclick, enabled, visible, toggle}` — for Inject/Debug style nodes |

Built-in validators: `RED.validators.number()`, `RED.validators.regex(re)`.

### Editor Lifecycle Callbacks

All receive `this` = node instance in the editor:

| Callback | When | Notes |
|---|---|---|
| `oneditprepare` | Before edit dialog displays | Template HTML already in DOM. Use to init ACE editors, jQuery widgets |
| `oneditsave` | User clicks Done/OK | Extract values from custom widgets. Must destroy editors. Synchronous. |
| `oneditcancel` | User cancels/Escape | Cleanup editors |
| `oneditdelete` | Config node delete button | Only for config nodes |
| `oneditresize` | Dialog resized | Receives `size` parameter. Resize custom editors |
| `onpaletteadd` | Node type added to palette | Called once |
| `onpaletteremove` | Node type removed | Called on uninstall/disable |

### Editor-Side RED APIs Used in This Node

**`RED.utils.sanitize(str)`** — Escapes `&`, `<`, `>` to HTML entities. XSS prevention.

**`RED.utils.renderMarkdown(str)`** — Parses markdown via marked.js (GFM, tables enabled), sanitizes with DOMPurify. Returns safe HTML string.

**`RED.editor.createEditor(options)`** — Creates an ACE editor instance:
- `id`: element ID (must have class `node-text-editor` and defined height)
- `mode`: ACE mode string, e.g. `"ace/mode/markdown"`, `"ace/mode/javascript"` (required in NR 3.0)
- `value`: initial content string
- Returns ACE editor instance. Must call `.destroy()` in `oneditsave`/`oneditcancel`.

**`RED.events.on(event, handler)`** — Key events:

| Event | Description |
|---|---|
| `nodes:add` | Node added to flow |
| `nodes:change` | Node properties changed |
| `nodes:remove` | Node removed |
| `view:redraw` | Canvas SVG redrawn |
| `workspace:change` | Active tab switched |
| `flows:loaded` | Flows loaded (initial load / import) |
| `editor:open` / `editor:close` | Edit tray opened/closed |
| `editor:save` | Node edit saved |
| `deploy` | Flows deployed |

**`RED.view.redraw(force)`** — Triggers visual refresh of the SVG canvas.

**`RED.nodes.eachNode(callback)`** — Iterate all nodes in the editor.

### D3.js and SVG Rendering

- Node-RED uses **D3.js v3** (not v4+). D3 v3 API: `d3.select()`, `.selectAll()`, `.append()`, `.attr()`, `.style()`, `d3.event` (global).
- Nodes are SVG `<g>` groups. Each node element has `id` = node's ID.
- The main rect has class `"node"` (select with `g.select("rect.node")`).
- **`foreignObject`** embeds HTML inside SVG — must set explicit `width`/`height` attributes. Use class selectors (not tag selectors) because Chrome lowercases the tag to `foreignobject`.
- SVG layer order: gridLayer → groupLayer → linkLayer → **nodeLayer** → dragGroupLayer.

### package.json Node-RED Section

```json
{
  "node-red": {
    "version": ">=3.0.0",
    "nodes": {
      "note": "note.js"
    }
  }
}
```

- `nodes` maps logical names to `.js` files. Node-RED auto-discovers the matching `.html` file (same base name).
- `version` specifies minimum Node-RED version (semver range).
- `keywords` must include `"node-red"` for npm discoverability.
- Historical prefix `node-red-contrib-` for community nodes. New convention: scoped packages (`@scope/node-red-*`).

### Testing (not yet set up for this project)

The official test framework is `node-red-node-test-helper` (wraps Node-RED runtime + Mocha):

```bash
npm install --save-dev node-red-node-test-helper node-red mocha
```

Test files go in `test/` with `*_spec.js` naming. Use `type: "helper"` as mock output nodes. Has built-in Sinon spies on node methods (`send`, `error`, `warn`, `status`).
