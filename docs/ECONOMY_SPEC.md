# Economy and Resource Reference

Eldoria's economy is represented in the browser client by shared player resources, holding state, production systems, and feature-specific queues. [`src/types.ts`](../src/types.ts) defines `PlayerResources`; [`src/App.tsx`](../src/App.tsx) owns the active resource state and persistence effects.

## Resource Groups

The current shared model includes:

- **Treasury:** Naquadah and banked Naquadah; optional credits.
- **Materials:** metal, crystal, and deuterium.
- **Sustenance:** optional food and water values with capacity fields.
- **Power:** energy and maximum energy.
- **People and forces:** population/workforce, unit counts, and production counters.
- **Actions and progression:** attack turns and optional turn-cap settings.
- **Special currencies:** optional Dark Matter, gate tokens, dimensional tokens, and raid tokens.

Field availability is typed in `PlayerResources`; a field's presence does not imply that every route uses it.

## Where to Verify Behavior

- Shared resource shape and optional fields: [`src/types.ts`](../src/types.ts).
- Starting data and peoples/governments: [`src/gameData.ts`](../src/gameData.ts).
- Cost, capacity, and upgrade helpers: [`src/utils/upgradeCalculations.ts`](../src/utils/upgradeCalculations.ts).
- Production and facility interactions: resource, income, holding, facility, and crafting views under `src/components/views/`.
- Market and treasury interactions: the route handlers in [`src/components/Sidebar.tsx`](../src/components/Sidebar.tsx) and their corresponding views.

## Economy Rules for Documentation

The source implementation, not this overview, owns costs, yields, caps, and modifiers. Avoid copying fixed multipliers or maintenance formulas into prose unless they are still present in the corresponding calculation. Distinguish a displayed balance from an authenticated, server-validated balance: most game state is currently local to the browser.

When extending the economy, update the type, owning calculation or handler, view feedback, persistence path, and this reference together.
