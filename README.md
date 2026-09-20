# Valjú for Codex

The official Valjú Codex plugin connects Codex to authenticated Icelandic real-estate data through the hosted Valjú MCP service.

It can search active listings and recorded sales, resolve properties, inspect property history and valuations, find comparable transactions, and calculate housing-market statistics.

## Requirements

- A Valjú account
- A Codex client with plugin and Streamable HTTP MCP support
- Browser access for OAuth authorization

## Install from a local clone

Clone this repository, register it as a local marketplace, and install the plugin:

```sh
codex plugin marketplace add /absolute/path/to/valju-codex-plugin
codex plugin add valju@valju
```

Start a new Codex thread after installation so the Valjú skill and MCP tools are loaded. Codex will open Valjú's authorization flow when authentication is required.

## Data semantics

Valjú distinguishes canonical properties, source advertisements, asking prices, recorded transactions, and estimated valuations. These values are not interchangeable. Listing search responses expose `total`; page length is not the total inventory count.

The public connection guide is available at <https://valju.is/mcp>. The hosted MCP endpoint is `https://api.valju.is/mcp`.

## Repository boundary

This repository contains only public plugin metadata, user guidance, and MCP connection configuration. The Valjú service implementation, data pipelines, database, and credentials are maintained privately.

## Security

Do not add API keys, OAuth tokens, `.env` files, private backend code, or production data to this repository. See [SECURITY.md](SECURITY.md) for reporting instructions.

## License

Licensed under the MIT License. See [LICENSE](LICENSE).
