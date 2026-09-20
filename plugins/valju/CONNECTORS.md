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

Valjú publishes OAuth authorization-server and protected-resource metadata from its public API. Claude discovers those endpoints from the MCP authentication challenge, registers itself as a public client, and opens the Valjú authorization page in the browser.

## Cowork setup

Cowork cloud sessions do not reliably attach a remote HTTP server bundled inside an uploaded plugin. Configure Valjú once as an account-level custom connector:

1. Open **Customize → Connectors**.
2. Select **+ → Add custom connector**.
3. Name it Valjú and enter `https://api.valju.is/mcp`.
4. Select **Add**, then **Connect**, and complete Valjú OAuth authorization.
5. In the Cowork task, open **+ → Connectors** and enable Valjú.

The bundled `.mcp.json` remains the canonical connection definition for clients and plugin runtimes that load remote MCP servers directly. Do not paste access tokens or add API keys to the plugin files.
