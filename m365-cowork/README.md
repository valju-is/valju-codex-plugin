# Valjú for Microsoft 365 Copilot Cowork

This is the Microsoft 365 app-package source. It is separate from the Claude Cowork ZIP in `dist/`. The package includes a v1.28 manifest, a Valjú agent skill, icons, and a static description of all nine MCP tools. Its connector points to `https://api.valju.is/mcp` and uses Valjú OAuth dynamic client registration.

## Build

The manifest points to the Valjú MCP [privacy notice](https://valju.is/mcp/privacy) and [terms](https://valju.is/mcp/terms) in the Valjú frontend. Build a package for testing with:

```sh
node m365-cowork/build.mjs
```

This produces `dist/valju-m365-cowork-0.1.0.zip`. The resulting ZIP has `manifest.json`, `color.png`, `outline.png`, `tools/valju.json`, and `skills/valju/SKILL.md` at its root. Building the ZIP does not mean it is ready to distribute; the frontend pages must be live and the privacy and terms text reviewed by the service owner first.

## Before publishing

1. Deploy the core-service OAuth migration and code supporting confidential DCR clients and refresh tokens.
2. Confirm the privacy and terms pages are deployed, publicly reachable, and legally reviewed.
3. Validate the package with Microsoft 365 Agents Toolkit or Developer Portal and install in a test tenant. Microsoft documentation about whether omission of `authorization` alone triggers DCR is inconsistent across guides; if the tenant requires an auth configuration, create one with Agents Toolkit and add its real `referenceId` to the connector. Never commit client secrets.
4. Complete a browser OAuth sign-in, confirm all nine tools appear, call `search_listings`, `get_valuation`, and `get_listing_images`, and verify refresh after an hour.
5. Replace the compact icon with a white-outline rendition of the Valjú mark if Microsoft Developer Portal flags the current icon. The bundled 32×32 PNG is a scaled brand mark, not yet a dedicated white-outline design.

The static tool file was exported from `services/core/src/routes/agent/tools.rs`. Refresh it whenever MCP tool definitions change. Do not publish a package whose tool descriptions differ from the deployed MCP server.

Microsoft references: [Cowork plugin development](https://learn.microsoft.com/en-us/microsoft-365/copilot/cowork/cowork-plugin-development), [DCR requirements](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/plugin-authentication-dynamic-client-registration).
