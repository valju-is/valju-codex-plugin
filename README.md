<p align="center">
  <img src="assets/valju-mark.png" alt="Valjú" width="112" />
</p>

# Valjú plugin

The official public integration package for connecting ChatGPT, GitHub Copilot, and Claude to authenticated Icelandic real-estate data through the hosted Valjú MCP service.

Valjú can search active listings and recorded sales, resolve properties, inspect property history and valuations, find comparable transactions, and calculate housing-market statistics.

## Connection details

- MCP transport: Streamable HTTP
- Endpoint: `https://api.valju.is/mcp`
- Authentication: OAuth in your browser
- Public guide: <https://valju.is/mcp>

You need a Valjú account and a supported client with remote MCP and OAuth support. You do not need to copy an API key or access token.

## ChatGPT

1. In ChatGPT, open **Settings → Security and login** and enable **Developer mode**.
2. Open <https://chatgpt.com/plugins>, select **Create app**, and name it Valjú.
3. Enter `https://api.valju.is/mcp` as the MCP server URL.
4. Select Valjú in a new conversation and complete the authorization flow.

See the [official ChatGPT developer-mode guide](https://developers.openai.com/api/docs/guides/developer-mode).

## GitHub Copilot in VS Code

Open the Command Palette and run **MCP: Add Server**. Select **HTTP**, enter the Valjú endpoint, and name the server `valju`.

You can also copy [`examples/vscode/mcp.json`](examples/vscode/mcp.json) into your workspace at `.vscode/mcp.json`:

```json
{
  "servers": {
    "valju": {
      "type": "http",
      "url": "https://api.valju.is/mcp"
    }
  }
}
```

Trust the server when prompted and complete authentication in your browser. See the [official VS Code MCP guide](https://code.visualstudio.com/docs/agent-customization/mcp-servers).

## Claude

In Claude, open **Settings → Connectors**, select **Add custom connector**, name it Valjú, and enter the MCP endpoint.

For Claude Code, run:

```sh
claude mcp add --transport http valju https://api.valju.is/mcp
```

See the official guides for [Claude custom connectors](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp) and [Claude Code MCP](https://code.claude.com/docs/en/mcp).

## Data semantics

Valjú distinguishes canonical properties, source advertisements, asking prices, recorded transactions, and estimated valuations. These values are not interchangeable. Listing search responses expose `total`; page length is not the total inventory count.

## Repository boundary

This repository contains only public connection examples and user guidance. The Valjú service implementation, data pipelines, database, and credentials are maintained privately.

## Security

Do not add API keys, OAuth tokens, `.env` files, private backend code, or production data to this repository. See [SECURITY.md](SECURITY.md) for reporting instructions.

## License

Licensed under the MIT License. See [LICENSE](LICENSE).
