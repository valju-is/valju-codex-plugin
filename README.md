<p align="center">
  <img src="assets/valju-mark.png" alt="Valjú" width="112" />
</p>

# Valjú plugin

The official public integration package for connecting ChatGPT, Microsoft 365 Copilot, and Claude Cowork to authenticated Icelandic real-estate data through the hosted Valjú MCP service.

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

## Microsoft 365 Copilot

Microsoft 365 Copilot uses a custom federated connector. Setup requires a Microsoft 365 Global Administrator or AI Administrator and an OAuth registration created through the Teams Developer Portal.

1. Open the Microsoft 365 admin center and select **Copilot → Connectors**.
2. Open **Gallery**, find **Create a new connector**, and select **Add**.
3. Under **Connect to MCP server**, select **Add**.
4. Set the display name to Valjú and the base URL to `https://api.valju.is/mcp`.
5. Enter the OAuth registration ID prepared for Valjú, then save the connector.

See the [official Microsoft 365 custom federated connector guide](https://learn.microsoft.com/en-us/microsoft-365/copilot/connectors/set-up-custom-federated-connectors).

For a broadly distributed connector, Valjú must also complete Microsoft's connector certification process.

## Claude Cowork

The easiest setup is the packaged Valjú Cowork plugin:

1. Download [`valju-cowork-plugin-0.1.1.zip`](dist/valju-cowork-plugin-0.1.1.zip).
2. Open the **Cowork** tab in Claude Desktop.
3. Open **Customize → Plugins** and choose **Add** or **Upload plugin**.
4. Select the ZIP file, review it, and approve the installation.
5. Open the installed Valjú plugin, find **Connectors**, and select **Connect** next to Valjú.
6. Complete the Valjú OAuth authorization in the browser. No API key or client secret is required.

The plugin packages the Valjú remote MCP connection, OAuth discovery configuration, and real-estate research instructions. Plugins added directly in Cowork are stored locally on your computer.

For Team and Enterprise distribution, an Owner can open **Organization settings → Plugins**, select **Add plugins → Upload a file**, and upload the same ZIP to a manual marketplace. Anthropic requires a valid ZIP under 50 MB.

See Anthropic's official guides for [using plugins in Claude](https://support.claude.com/en/articles/13837440-use-plugins-in-claude) and [managing organization plugins](https://support.claude.com/en/articles/13837433-manage-plugins-for-your-organization).

## Data semantics

Valjú distinguishes canonical properties, source advertisements, asking prices, recorded transactions, and estimated valuations. These values are not interchangeable. Listing search responses expose `total`; page length is not the total inventory count.

## Repository boundary

This repository contains only public connection examples and user guidance. The Valjú service implementation, data pipelines, database, and credentials are maintained privately.

## Security

Do not add API keys, OAuth tokens, `.env` files, private backend code, or production data to this repository. See [SECURITY.md](SECURITY.md) for reporting instructions.

## License

Licensed under the MIT License. See [LICENSE](LICENSE).
