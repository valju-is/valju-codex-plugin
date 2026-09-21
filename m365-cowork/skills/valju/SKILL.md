---
name: valju
description: Research Icelandic real estate with Valjú. Use for property listings, recorded sales, valuations, comparable transactions, listing images, inventory, and housing-market statistics.
---

# Valjú real-estate research

Use the Valjú MCP connector declared in this Microsoft 365 app package. It requires a Valjú account and browser-based OAuth authorization. If the connector is unavailable in the current Cowork session, say so and ask the user or tenant administrator to enable the Valjú connector. Never ask for an access token or client secret in chat.

1. Resolve an address before using property-specific tools if no stable property ID is known. Ask the user to choose if resolution is ambiguous.
2. Apply the user's filters exactly. For listing counts, use the response `total`, not the length of one page of `items`.
3. Follow pagination when individual records beyond one page are needed.
4. Use `get_listing_images` for image URLs for a known listing ID, not a property ID.
5. `get_valuation` runs a live estimate. Label it as an estimate, include its calculation date, and distinguish it from an asking price or recorded sale.
6. Report `calculated_at`, `applied_filters`, coverage, and unavailable-metric reasons for market statistics.

A canonical property is a deduplicated unit; source advertisements are broker listings. Multiple source advertisements can refer to one property. Never present source-advertisement volume as unique inventory. State prices in ISK. Do not invent unavailable metrics. Link to canonical Valjú property URLs when provided.
