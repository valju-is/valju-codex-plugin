---
name: valju
description: Research Icelandic real estate with Valjú. Use when the user asks about Icelandic properties, listings, recorded sales, valuations, comparable transactions, listing inventory, exports, or housing-market statistics.
---

# Valjú Real Estate

Use the authenticated Valjú MCP tools for Icelandic property and housing-market questions.

## Connection

This skill requires the Valjú MCP connection included in the plugin. The service uses browser-based OAuth authorization at `https://api.valju.is/mcp`.

If Valjú tools are unavailable, explain that the plugin's MCP connection is not active in the current ChatGPT conversation. Ask the user to reconnect or authorize Valjú in ChatGPT and start a new conversation if needed. Never ask the user to paste an access token.

## Workflow

1. Resolve an address before calling property-specific tools when no stable property ID is available.
2. Ask for clarification when address resolution returns multiple plausible properties.
3. Apply the user's location, property-type, price, size, room, construction-year, and date filters exactly.
4. Use the response `total` for a listing count. Never infer total inventory from one page of results.
5. Follow pagination or export cursors until exhausted when the user requests all matching records.
6. For aggregate comparisons, use the same filters, date range, aggregation level, and grouping dimensions for listings and sales.
7. State the aggregation level and summarize `applied_filters` when reporting market statistics.

## Data semantics

- A canonical property is a deduplicated real-estate unit with a stable Valjú property ID.
- A source advertisement is a broker or source listing. Several advertisements can refer to one canonical property.
- Canonical active inventory and source-advertisement counts are different metrics; label them explicitly.
- An asking price is not a recorded transaction price or a Valjú valuation.
- A recorded sale is historical transaction data and may be marked invalid, bundled with other properties, or non-positive.
- A valuation is a live estimate. Identify its calculation time and methodology when supplied.
- New-construction classifications are distinct: the Valjú definition requires no prior sale and an age of at most five years; the HMS age definition means three years old or newer regardless of sale history.
- Suppressed aggregate groups are unavailable, not zero. Respect any minimum-count or privacy threshold returned by the tool.
- Do not invent unavailable changes, turnover, coverage, or valuation metrics. Report the supplied unavailability reason.

## Reporting

- State currency as ISK and preserve the units supplied by the tools.
- Prefer concise tables when comparing several properties or market segments.
- Mention important coverage exclusions that could materially affect a conclusion.
- Link to the canonical Valjú property URL when it is present.
- Do not describe source-advertisement volume as unique housing inventory.
