# Eldoria: Realms at War

**Eldoria: Realms at War** is a medieval-fantasy browser strategy RPG about leading a people, swearing to a crown, developing holdings, and sending warbands into a changing realm.

The repository contains a large client-side game prototype built around a fantasy interface. Some subsystems retain technical names and concepts from earlier space-strategy experiments. The app should be treated as a browser-first prototype, not as a deployed, authoritative MMO service. See [Project Boundaries](#project-boundaries) before relying on cloud or multiplayer behavior.

## The Game

The title screen frames the setting as the **Age of Embers**. Players can enter as a wanderer or use the account flows, then explore a command interface for:

- **Peoples and crowns:** choose a people and government, review their traits, and develop a realm identity.
- **Holdings and resources:** manage lands, population, food, water, treasury, production, and infrastructure.
- **Lore and craft:** research technologies, improve facilities, survey nine fantasy ore veins tied to the shared resource ledger, and train 14 gathering and crafting callings from Apprentice to Grandmaster, with recipes, a satchel, and equipment slots.
- **Warbands:** recruit and train adventurers, equip them, assign orders, and review battle reports.
- **Adventurer rules:** build a local character sheet, make d20 skill checks and saves, advance through ten original callings and thirty paths, and spar with a practice wisp.
- **Magic and spellcraft:** study five founder traditions and ten elemental schools through the Living Grimoire, learn and sell scrolls, spend Leyline Aether to cast, and practice spell effects.
- **Realms and exploration:** travel through realm maps, expeditions, boss encounters, waystones, relic systems, and a 90-creature field bestiary.
- **Guild and social systems:** review alliances, diplomacy, messages, rankings, and realm news.
- **Steward tools:** authenticated admin panels include configuration, moderation, operations, and an Arcane Codex editor for schools, classes, subclasses, and spells.

The Arcane Codex starts with fifteen schools, thirty-five classes, one hundred subclasses, and one hundred ten spells. Ten elemental schools each add three classes, nine subclasses, and nine uniquely named spells with targets, effects, ranks, titles, primary stats, and substats. Players can learn spells with Crowns, sell learned scrolls, and practice effects using Leyline Aether. Spellbook progress and practice results are browser-local and are not server-authoritative combat outcomes. Admin Codex edits remain local to the browser. Read the [World Bible](docs/WORLD_BIBLE.md) for the setting, peoples, crowns, regions, and magic canon.

## Run Locally

Requirements: Node.js and npm.

```bash
npm ci
npm run dev
```

Vite serves the app at [http://localhost:3000](http://localhost:3000). In Windows PowerShell, use `npm.cmd` in place of `npm` if the execution policy blocks the PowerShell wrapper.

```bash
npm run lint
npm run build
```

`lint` runs TypeScript without emitting files. `src/test_all_features.ts` checks catalog integrity and gameplay rules, including the elemental spell system and 90-entry monster bestiary.

## Technology

- React 19, TypeScript, and Vite 8
- Tailwind CSS 4 and Lucide icons
- Firebase Authentication and Firestore client helpers
- Browser `localStorage` for most client-side game state
- An optional PHP/PDO/MySQL backend scaffold under [`backend/`](backend/README.md)

## Project Boundaries

Most gameplay state is managed in the browser and saved to `localStorage`. Firebase helpers support sign-in and a limited profile/resource sync; they do not make every game subsystem server-authoritative. The PHP/MySQL backend is a separate scaffold and is not automatically used by the React app.

Do not put secrets in frontend configuration. Review [`firestore.rules`](firestore.rules) and [`security_spec.md`](security_spec.md) before deploying or expanding access. Admin screens and local saves are not a substitute for server-side authorization.

## Documentation

| Document | Purpose |
| --- | --- |
| [Game Design Document](GDD.md) | Setting, design pillars, player loop, and feature boundaries |
| [World Bible](docs/WORLD_BIBLE.md) | Peoples, crowns, regions, history, creatures, and magic canon |
| [Player Systems Manual](SYSTEMS_MANUAL.md) | A practical guide to the game interface and systems |
| [Documentation Index](DOCUMENTATION.md) | Map to architecture and subsystem references |
| [API and Data Specification](API_AND_DATA_SPEC.md) | Firebase paths, browser persistence, and service boundaries |
| [Architecture and UML](ARCHITECTURE_UML.md) | Current application structure and data flow |
| [Security Specification](security_spec.md) | Firestore rule behavior and deployment cautions |
| [Research and Progression](docs/REALM_RESEARCH_SPEC.md) | Current research surfaces and source references |
| [Magic System](docs/MAGIC_SYSTEM_SPEC.md) | Elemental schools, spell taxonomy, player casting, Codex migration, and persistence limits |
| [Adventurer Rules](docs/ADVENTURER_RULES_SPEC.md) | Character sheet, d20 checks, callings and paths, practice encounter, and local persistence limits |
| [Economy Specification](docs/ECONOMY_SPEC.md) | Resource groups and economy ownership in code |
| [Combat Engine](docs/COMBAT_ENGINE.md) | Combat entry points and implementation limits |
| [Components Architecture](docs/COMPONENTS_ARCHITECTURE.md) | Shell, route navigation, views, and responsive layout |
| [Data Models Reference](docs/DATA_MODELS_REFERENCE.md) | Canonical TypeScript model locations |
| [State and Persistence](docs/STATE_MANAGEMENT_AND_ENGINE.md) | Local state, Firestore synchronization, and timing |
| [Source Code Reference](docs/SOURCE_CODE_REFERENCE.md) | High-value source files by responsibility |
| [Waystones and Leygates](docs/STARGATE_NETWORK.md) | Fantasy-facing travel subsystem reference |
| [War Council and Retinue Systems](docs/MOTHERSHIP_SYSTEM.md) | Flagship and companion subsystem notes |
| [UML Diagrams](docs/UML_DIAGRAMS.md) | Compact diagrams of the client architecture |
| [Backend Notes](backend/README.md) | Optional PHP/MySQL scaffold |
| [Changelog](CHANGELOG.md) | Verified project changes |

## Project Layout

```text
src/
  App.tsx                 Application state, authentication, and view routing
  types.ts                Shared TypeScript interfaces and unions
  gameData.ts             Fantasy peoples, governments, and starting data
  components/
    Sidebar.tsx           Main navigation groups and route IDs
    Topbar.tsx            Global status and page header
    views/
      MagicSystemView.tsx Player Grimoire, spell market, and casting circle
      AdventurerHandbookView.tsx Character sheet, d20 checks, and practice encounter
      FactoryView.tsx     Mine, forge, and facility upgrades
      AICSystemView.tsx   Crownworks, quarries, guild crafting, and leylines
      admin/
        AdminArcaneCodexTab.tsx  School and spell authoring tools
  data/
    arcaneCodexData.ts    Shared magic contracts and founder traditions
    elementalMagicData.ts Ten elemental schools and ninety generated spells
    magicSystemData.ts   Spell stats, migration, learning, sale, and practice rules
    aicData.ts            Crownworks production, quarries, goods, and power sources
    workforceAcademyData.ts  Ninety workforce roles and academy rules
    ogameData.ts          Facility and research catalogs with retained internal naming
  test_all_features.ts   Catalog and gameplay regression assertions
  utils/                  Reusable calculations and helpers
docs/                     Architecture and subsystem documentation
backend/                  Separate PHP/PDO/MySQL scaffold
public/                   Static assets
```

## Contributing

Keep player-facing language within Eldoria's fantasy setting. When documenting a feature, distinguish implemented behavior from prototypes and planned work, and link formulas or data claims to the code that owns them.
