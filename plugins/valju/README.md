# Valjú for Claude Cowork

This plugin connects Claude Cowork to Valjú's authenticated Icelandic real-estate MCP service and adds guidance for interpreting listings, transactions, valuations, comparable properties, and market statistics.

## Install

1. Download the current versioned Cowork plugin ZIP linked from the repository README.
2. Open the Cowork tab in Claude Desktop.
3. Open **Customize → Plugins** and choose **Add** or **Upload plugin**.
4. Select the downloaded ZIP file and approve the installation.
5. Open **Customize → Connectors** and select **+ → Add custom connector**.
6. Name it Valjú and enter `https://api.valju.is/mcp`.
7. Add and connect it, then complete Valjú OAuth authorization in the browser. No API key or client secret is required.
8. Enable Valjú under **+ → Connectors** in the Cowork task.

Cowork currently may install the plugin skill without attaching its bundled remote MCP server to a cloud session. Adding the account-level custom connector ensures the Valjú tools are available to Cowork.

Only install plugin files downloaded from the official `valju-is/valju-plugin` repository.
