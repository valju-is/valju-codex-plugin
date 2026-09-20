---
name: valju-real-estate
description: Research Icelandic real estate with Valjú. Use when the user asks about Icelandic properties, listings, recorded sales, valuations, comparable transactions, listing inventory, or housing-market statistics.
---

# Valjú Real Estate

Use the Valjú MCP tools for Icelandic property and housing-market questions.

## Workflow

1. Resolve an address before calling property-specific tools when no stable property ID is available.
2. Ask for clarification when address resolution returns multiple plausible properties.
3. Apply the user's location, property-type, price, size, room, construction-year, and date filters exactly.
4. Use the response `total` for a listing count. Never infer the total from the number of items on one page.
5. Follow pagination when the user requests individual records beyond the first page.
6. Include `calculated_at` and summarize `applied_filters` when reporting market statistics.

## Data semantics

- A canonical property is a deduplicated real-estate unit with a stable Valjú property ID.
- A source advertisement is a broker or source listing. Several advertisements can refer to one canonical property.
- Canonical active inventory and source-advertisement counts are different metrics; label them explicitly.
- An asking price is not a recorded transaction price or a Valjú valuation.
- A recorded sale is historical transaction data and may be excluded from statistics when invalid, bundled with other properties, or non-positive.
- A valuation is an estimate. Identify its date and methodology when the tool provides them.
- Do not invent unavailable changes, turnover, coverage, or valuation metrics. Report the supplied unavailability reason.

## Reporting

- State currency as ISK and preserve the units supplied by the tools.
- Prefer concise tables when comparing several properties or market segments.
- Mention important coverage exclusions that could materially affect a conclusion.
- Link to the canonical Valjú property URL when it is present.
- Do not describe source-advertisement volume as unique housing inventory.

The service requires a Valjú account and uses browser-based OAuth authorization. Never request or expose access tokens in conversation.
