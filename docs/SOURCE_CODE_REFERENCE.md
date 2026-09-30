# Source Code Reference

This index points to the main ownership boundaries in the current repository. Use the implementation as the authority for exact fields, behavior, and route coverage.

## Application and Models

- [`src/main.tsx`](../src/main.tsx): React entry point.
- [`src/App.tsx`](../src/App.tsx): app-level state, account flow, routing, timers, persistence, and view composition.
- [`src/types.ts`](../src/types.ts): shared interfaces and unions.
- [`src/gameData.ts`](../src/gameData.ts): starting game data, peoples, governments, and related catalogs.
- [`src/data/arcaneCodexData.ts`](../src/data/arcaneCodexData.ts): starter schools, classes, subclasses, spells, and their shared types.
- [`src/data/elementalMagicData.ts`](../src/data/elementalMagicData.ts): ten elemental schools and ninety generated spells.
- [`src/data/magicSystemData.ts`](../src/data/magicSystemData.ts): spell metadata, seed migration, learning/selling, and casting practice rules.
- [`src/components/views/MagicSystemView.tsx`](../src/components/views/MagicSystemView.tsx): player Grimoire, market, Casting Circle, and chronicle.
- [`src/data/adventurerRulesData.ts`](../src/data/adventurerRulesData.ts): original callings and paths, d20 checks, derived character stats, and practice attack rules.
- [`src/components/views/AdventurerHandbookView.tsx`](../src/components/views/AdventurerHandbookView.tsx): local character sheet, checks/saves, practice encounter, and rules ledger.
- [`src/index.css`](../src/index.css): global styles and Tailwind entry.
- [`src/sound.ts`](../src/sound.ts): browser sound helper.

## Shell and Navigation

- [`src/components/Sidebar.tsx`](../src/components/Sidebar.tsx): visible groups and route IDs.
- [`src/components/Topbar.tsx`](../src/components/Topbar.tsx): persistent status and navigation controls.
- [`src/components/Footer.tsx`](../src/components/Footer.tsx): footer and utility actions.
- `src/components/HudMetrics.tsx` and `src/components/LiveSystemRouteBar.tsx`: shell-level status and route context.

## Feature Code

- `src/components/views/`: route-level game systems.
- `src/components/views/admin/`: admin-only subviews, including [`AdminArcaneCodexTab.tsx`](../src/components/views/admin/AdminArcaneCodexTab.tsx).
- `src/components/modals/`: modal workflows.
- `src/data/`: feature-specific static datasets.
- `src/utils/`: reusable calculations and helpers.
- `src/config/`: app, theme, database, and admin configuration.

Some data modules have legacy technical names, including `ogameData.ts`, `stargateData.ts`, and `mothershipData.ts`. Their filenames describe code history, not necessarily the player-facing setting.

## Services and Rules

- [`src/firebase.ts`](../src/firebase.ts): Firebase initialization and selected sign-in/profile/resource helpers.
- [`firestore.rules`](../firestore.rules): Firestore authorization rules.
- [`backend/`](../backend/README.md): separate PHP/PDO/MySQL scaffold; not automatically connected to the browser client.

## Tests and Commands

- [`src/test_all_features.ts`](../src/test_all_features.ts): repository feature checks; inspect the file for current coverage.
- `npm run lint`: TypeScript no-emit check.
- `npm run build`: production client build.

A source file existing in the tree does not guarantee that its system is complete, remotely backed, or exposed to every player.
