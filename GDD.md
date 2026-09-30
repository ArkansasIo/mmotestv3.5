# Eldoria: Realms at War — Game Design Document

## Product Summary

**Eldoria: Realms at War** is a browser-first fantasy strategy RPG prototype. The player takes the role of a realm leader, chooses a people and political tradition, develops holdings, trains warbands, and explores a broad setting known as the **Age of Embers**.

The interface is designed in the style of a persistent online realm-management game. The checked-in client does not provide an authoritative, always-online MMO simulation: most game state is client-side, and only selected account data is synchronized through Firebase.

## Design Pillars

1. **A realm with an identity.** Peoples, crowns, leaders, and holdings should give each campaign a clear character.
2. **Stewardship with trade-offs.** Resources, workforce, construction, research, and military readiness compete for attention.
3. **Preparation before conflict.** Recruit, train, equip, scout, and plan before sending a warband into danger.
4. **A world worth charting.** Realms, marches, expeditions, relics, and notable enemies create reasons to leave the home holding.
5. **Readable command tools.** Dense management systems should remain navigable on desktop and mobile.

## Player Loop

1. Review the realm overview, available resources, alerts, and active work.
2. Improve a holding, assign people, or advance a research or crafting project.
3. Prepare a warband or expedition for a selected objective.
4. Resolve the action, review its report, and adapt the next decision.
5. Build reputation, strengthen alliances, and expand the realm over time.

## Setting and Factions

The world is the **Age of Embers**, home to the Kingdom of Valewyn, Sylvan Court, Ashen Dominion, Ironroot Clans, and Dragonborn Covenant. Nine political traditions range from the Free Cities Compact and Iron Crown War Council to the Arcane Conclave, Amber Road Merchant Houses, and Free March Clans. The [World Bible](docs/WORLD_BIBLE.md) defines their regions, history, leaders, creatures, and magic traditions.

Current faction names, starting descriptions, and numeric modifiers remain owned by [`src/gameData.ts`](src/gameData.ts). Player documentation should use the fantasy-facing labels shown in the application and should not treat historical prototype lore as a second canon.

## Major Systems

- **Realm identity:** people, government, profile, titles, and progression.
- **Holdings:** territories, population, food, water, hazards, infrastructure, and local production.
- **Crownworks and leyline industry:** mines, ore cartways, smelteries, alchemical stills, guild assembly halls, far-march quarries, and warded power reserves supply the realm's works.
- **Economy:** treasury and material resources used by buildings, research, training, and trade.
- **Lore and craft:** technology progression, facilities, blueprints, and production queues.
- **Warbands:** recruitment, roles, equipment, orders, tactical encounters, and battle records.
- **Adventurers:** a separate 5e-compatible d20 handbook with original Eldoria callings and paths, ability checks, saves, proficiency, and a local training encounter.
- **Exploration:** maps, expeditions, bosses, waystones, and relic catalogs.
- **Community:** guilds, diplomacy, messages, news, and rankings; availability and persistence vary by subsystem.
- **Magic and spellcraft:** five founder traditions and ten elemental schools organize thirty-five classes, one hundred subclasses, and one hundred ten spells by rank, type, subtype, and stats. Players can learn spells with Crowns, sell known scrolls, cast using Leyline Aether, and practice strike, ward, healing, control, revelation, and wayfinding effects. Spellbook progress and practice effects are browser-local; practice results are not server-authoritative combat outcomes.
- **Steward tools:** administrative controls and content utilities. The Arcane Codex authors schools, classes, subclasses, and spells, including spell targets, effects, costs, and potency.

## Presentation Principles

The command interface should prioritize quick scanning, clear status, predictable navigation, and useful feedback. Fantasy terminology belongs in player-facing labels. Technical terminology belongs in code references and engineering documentation. Layouts should reflow cleanly at narrow widths without hiding critical controls.

## Scope and Status

This document describes the product direction, not a guarantee that every listed system is complete or connected to a shared server. The React app is the active browser client. Firebase support is partial, and the PHP/MySQL files are a separate backend scaffold. Before describing a mechanic as implemented, verify its route and behavior in the current source.

## Source of Truth

- Game data and initial faction definitions: [`src/gameData.ts`](src/gameData.ts)
- Shared models: [`src/types.ts`](src/types.ts)
- Navigation labels and route IDs: [`src/components/Sidebar.tsx`](src/components/Sidebar.tsx)
- Application state and view routing: [`src/App.tsx`](src/App.tsx)
- Player-facing overview: [`README.md`](README.md)
- System guides: [`DOCUMENTATION.md`](DOCUMENTATION.md)
