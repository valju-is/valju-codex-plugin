# Connectors

## Valjú

The Valjú connector is required for this plugin's property and housing-market skills.

| Setting | Value |
| --- | --- |
| Transport | Streamable HTTP |
| MCP endpoint | `https://api.valju.is/mcp` |
| Authentication | OAuth 2.0 authorization code with PKCE |
| Client registration | Dynamic client registration; no client secret is required |
| Scope | `mcp:tools` |

Valjú publishes OAuth authorization-server and protected-resource metadata from its public API. Cowork discovers those endpoints from the MCP authentication challenge, registers itself as a public client, and opens the Valjú authorization page in the browser.

After installing the plugin, open its **Connectors** section and select **Connect** next to Valjú. Do not paste access tokens or add API keys to the plugin files.
