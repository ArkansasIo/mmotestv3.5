# Research and Progression Reference

This guide describes Eldoria's research surfaces. Source modules may retain identifiers from earlier prototypes; those names are implementation history, not player-facing setting.

## Player-Facing Research

The navigation presents research through the **Great Tome of Lore**, **Masterwork Blueprints**, **Arms & Battlecraft**, **Wards & Armorcraft**, **Scouting & Guile**, and **Watchers & Countersigns** routes. Their visible labels are defined in [`src/components/Sidebar.tsx`](../src/components/Sidebar.tsx).

The shared [`Technology` type](../src/types.ts) currently models an entry with an ID/key, name, category, base cost, cost growth, level, and description. Its category values are `offense`, `defense`, `covert`, and `anti-covert`.

## Implementation Map

- [`src/types.ts`](../src/types.ts): shared technology and queue contracts.
- [`src/ogameData.ts`](../src/ogameData.ts): catalog and prerequisite data; filename retained from an earlier implementation.
- [`src/blueprintSystemsData.ts`](../src/blueprintSystemsData.ts): blueprint-related catalogs.
- [`src/App.tsx`](../src/App.tsx): research state, queue handling, routing, and local persistence.
- `src/components/views/`: research library, tree, blueprint, and discipline views.

## Progression Guidance

Use the owning data and calculation code to determine prerequisites, costs, queue timing, unlock effects, and caps. The type's `costGrowth` field alone does not establish a universal cost formula. Do not copy exact multipliers, tier counts, or completion times into this document unless they are verified against the active implementation.

Research and the Arcane Codex are distinct progression systems. The player-facing [Living Grimoire](../src/components/views/MagicSystemView.tsx) supports local learning, scroll sales, Leyline Aether costs, mastery, and practice effects. The [admin Codex](../src/components/views/admin/AdminArcaneCodexTab.tsx) authors the browser-local catalog. Neither system currently links spell unlocks to research, character builds, or authoritative campaign combat.