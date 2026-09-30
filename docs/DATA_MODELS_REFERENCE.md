# Data Models Reference

[`src/types.ts`](../src/types.ts) is the canonical home for shared TypeScript interfaces and union types. Feature-specific catalogs and records are defined beside their data owners in `src/`, `src/data/`, and `src/components/`.

## Core Models

- **`PlayerProfile`** stores player identity and realm progression fields, including people, government ID, rank, reputation, glory, and readiness state.
- **`PlayerResources`** tracks the core treasury/material balances, energy, workforce and unit counts, turn state, and optional realm-specific resources.
- **`Race` and `Government`** describe people and political choices. Their static starting definitions live in [`src/gameData.ts`](../src/gameData.ts).
- **`Technology`** describes research entries and their levels; inspect the owning data and research view for requirements and costs.
- **Combat, colony, workforce, guild, and administration types** are declared in `src/types.ts` and their feature data modules.

The model names and optional fields are part of the code contract. This reference intentionally summarizes rather than copying complete interfaces, so it remains useful when types evolve.

## Data Ownership

| Data | Primary source |
| --- | --- |
| Peoples, governments, initial game catalogs | [`src/gameData.ts`](../src/gameData.ts) |
| Shared app contracts | [`src/types.ts`](../src/types.ts) |
| Player, resource, route and queue state | [`src/App.tsx`](../src/App.tsx) |
| Workforce and academy catalogs | [`src/data/workforceAcademyData.ts`](../src/data/workforceAcademyData.ts) |
| Admin seed data | [`src/data/ogameAdminData.ts`](../src/data/ogameAdminData.ts) |
| Arcane Codex starter model and records | [`src/data/arcaneCodexData.ts`](../src/data/arcaneCodexData.ts) |
| Ten elemental schools and ninety generated spells | [`src/data/elementalMagicData.ts`](../src/data/elementalMagicData.ts) |
| Playable spell metadata, migration, and practice rules | [`src/data/magicSystemData.ts`](../src/data/magicSystemData.ts) |
| Player Grimoire, spell market, and practice circle | [`MagicSystemView.tsx`](../src/components/views/MagicSystemView.tsx) |
| Arcane Codex editor and browser persistence | [`AdminArcaneCodexTab.tsx`](../src/components/views/admin/AdminArcaneCodexTab.tsx) |

## Persistence Notes

A TypeScript interface describes client data; it does not define a database schema by itself. The application persists most state locally, syncs a limited profile/resource subset through Firestore, and contains a separate PHP/MySQL schema. Keep those contracts distinct and update [`API_AND_DATA_SPEC.md`](../API_AND_DATA_SPEC.md) when a service boundary changes.
