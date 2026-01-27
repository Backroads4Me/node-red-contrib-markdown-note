# Node-RED Markdown Note

[![NPM Version](https://img.shields.io/npm/v/node-red-contrib-markdown-note.svg)](https://www.npmjs.com/package/node-red-contrib-markdown-note)
[![Downloads](https://img.shields.io/npm/dt/node-red-contrib-markdown-note.svg)](https://www.npmjs.com/package/node-red-contrib-markdown-note)
[![License](https://img.shields.io/npm/l/node-red-contrib-markdown-note.svg)](https://github.com/Backroads4Me/node-red-contrib-markdown-note/blob/master/LICENSE)

A Node-RED node for displaying **Markdown-formatted notes** directly on the flow canvas.

This node is intended for inline documentation, design notes, and contextual explanations that should remain visible while editing or reviewing flows.

![Node Preview](screenshots/hero.png)

## Why use this?

The built-in Comment node is useful for annotations that are hidden by default. Markdown Note is designed for documentation that should be **persistently visible** and formatted for readability.

| Standard Comment | Markdown Note |
| :--- | :--- |
| Collapsed by default | Always visible |
| Plain text | Markdown formatting |
| Minimal structure | Headings, lists, code blocks |
| Intended for short notes | Suitable for detailed documentation |

## Features

- **Always-visible notes**  
  Notes remain expanded on the canvas, making flow documentation immediately visible.

- **Markdown rendering**  
  Supports standard Markdown syntax including headings, lists, emphasis, code blocks, and blockquotes.

- **Task lists**  
  Markdown task lists can be used to track TODOs or implementation notes directly on the flow.

- **Readable layout**  
  Automatic sizing and layout help keep notes readable without overlapping surrounding nodes.

- **Developer-focused use cases**  
  Useful for documenting payload formats, API contracts, assumptions, edge cases, or non-obvious logic.

## Installation

Run the following command in your Node-RED user directory (typically `~/.node-red`):

```bash
npm install node-red-contrib-markdown-note