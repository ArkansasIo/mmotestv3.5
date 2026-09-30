# War Council and Retinue Systems

The sidebar presents this area through fantasy-facing labels such as **War Council Overview** and **Retinue Upgrades**. Some implementation modules still use the historical mothership/flagship terminology.

## Source Map

- [`src/components/views/MothershipView.tsx`](../src/components/views/MothershipView.tsx): route-level interface for the flagship and its related systems.
- [`src/mothershipData.ts`](../src/mothershipData.ts): flagship, module, and related static data.
- [`src/components/Sidebar.tsx`](../src/components/Sidebar.tsx): current player-facing route names.
- [`src/types.ts`](../src/types.ts): shared contracts used by connected views.

## Behavior and Scope

The view and its data catalog own the available hulls, upgrades, configuration options, and actions. Verify exact costs, caps, names, and effects in those sources before documenting a balance change. Do not assume every module is synchronized to a remote service or participates in every combat mode.

This is a client-side subsystem within Eldoria's broader fantasy interface. Internal mothership terminology is a code-history detail, not a requirement to introduce spaceships into the setting's player-facing prose.
