# Waystones and Leygates

Eldoria's player-facing navigation uses the names **Waystones** and **Leygates** for travel-themed systems. The route labels are defined in [`src/components/Sidebar.tsx`](../src/components/Sidebar.tsx); implementation files retain internal names such as `stargateData.ts` and `StargateNetworkView.tsx` from earlier iterations.

## Current Reference Points

- `stargate-network`: Waystones & Leygates route.
- `gate-tokens`: Waystone Charms route.
- `stargate-relics`: Relics & Elder Artifacts route.
- `stargate-system-lords`: Warlords & Dungeon Raids route.

The routes and their backing data are separate features. A route being present does not guarantee that every travel action uses a shared server or that every connected destination is available.

## Source Ownership

- [`src/stargateData.ts`](../src/stargateData.ts): travel and address data with a retained internal filename.
- [`src/gateTokensData.ts`](../src/gateTokensData.ts): token catalog.
- `src/components/views/stargate/`: themed travel and relic views.
- [`src/App.tsx`](../src/App.tsx): application routing and shared state.

Use the active view and handlers as the authority for destinations, costs, travel timing, and persistence. This guide intentionally avoids repeating old glyph counts, wormhole durations, or science-fiction materials that are not established by the current fantasy-facing design.
