# Valjú for ChatGPT

This directory is the source for the portable Valjú plugin uploaded to ChatGPT. The package contains the plugin metadata, Valjú usage instructions, and the authenticated remote MCP connection.

## Install

1. Build or download `dist/valju-chatgpt-plugin-0.2.0.zip`.
2. In the ChatGPT plugin upload flow, choose the option that includes MCP (shown as **With MCP** where that choice is available).
3. Upload the ZIP without extracting it.
4. Review the Valjú connection to `https://api.valju.is/mcp` and complete OAuth authorization.
5. Enable Valjú in a new conversation.

Do not choose a skills-only upload: that mode omits the MCP connection and cannot access Valjú data.

See OpenAI's [ChatGPT plugin connection guide](https://developers.openai.com/plugins/deploy/connect-chatgpt) and [plugin packaging guide](https://developers.openai.com/plugins/build/plugins).

## Build

From the repository root:

```sh
node chatgpt/build.mjs
```

The builder validates the package layout and creates a ZIP with `plugin.json` and `mcp.json` at the archive root.
