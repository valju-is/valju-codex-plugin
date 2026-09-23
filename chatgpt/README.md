# Valjú for ChatGPT

This directory is the source for the Valjú plugin uploaded to ChatGPT. The package contains the plugin metadata, Valjú usage instructions, the portable remote MCP connection, and a mapping to the registered Valjú ChatGPT app for web sessions.

## Install

1. Build or download `dist/valju-chatgpt-plugin-0.2.1.zip`.
2. Upload the ZIP from the ChatGPT plugin installation flow without extracting it.
3. Confirm that your account or workspace can access the registered Valjú app.
4. Complete Valjú OAuth authorization when prompted.
5. Enable Valjú in a new conversation.

The `.app.json` mapping makes the registered Valjú MCP app available to ChatGPT web sessions. The portable `mcp.json` remains in the package for compatible clients. For publication in the universal Plugins Directory, create a **With MCP** submission and submit `https://api.valju.is/mcp` directly; OpenAI does not publish an existing app reference from this ZIP.

See OpenAI's [ChatGPT plugin connection guide](https://developers.openai.com/plugins/deploy/connect-chatgpt) and [plugin packaging guide](https://developers.openai.com/plugins/build/plugins).

## Build

From the repository root:

```sh
node chatgpt/build.mjs
```

The builder validates the package layout and creates a ZIP with `plugin.json`, `mcp.json`, and `.app.json` at the archive root.
