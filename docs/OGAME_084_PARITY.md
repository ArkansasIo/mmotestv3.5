# OGame 0.84 Parity Work

## Reference and Boundary

The reference is [ogamespec/ogame-opensource](https://github.com/ogamespec/ogame-opensource), a reconstruction of canonical OGame 0.84. This work targets equivalent gameplay behavior expressed through Eldoria's fantasy setting and React/TypeScript architecture. It does not copy the reference's PHP, page markup, or proprietary art.

Eldoria is currently a browser-first prototype. Most gameplay state lives in `localStorage`; the optional PHP/MySQL scaffold is not the active game service. Fleet events can be simulated locally, but authoritative multiplayer parity requires a separately scoped server-authority change.

## Current Coverage

| OGame 0.84 area | Eldoria status |
| --- | --- |
| Economy, production, buildings, research, shipyard, and defense | Related facilities, resources, catalogs, and queues exist, but use Eldoria rules, identifiers, and balances rather than a canonical 0.84 rules registry. |
| Fleet physics | `src/utils/ogame084FleetMath.ts` implements the reference distance, flight-time, and per-ship deuterium formulas. The expedition form now previews those values and dispatch validates and spends fuel using the current universe speed settings. |
| Fleet missions and event processing | Expeditions use calculated round-trip travel time and restore ships on completion, but still resolve through Eldoria's generic simulated loot. General player fleet missions, event arrivals/returns, and mission-specific outcomes are not yet implemented. Admin fleet dossiers are not player fleets. |
| Combat | A combat view exists, but its turn-based target simulation is not the canonical six-round ship/defense combat engine. |
| Galaxy, planets, colonies, and moons | Realm and holding views, colonization, and lunar-like systems exist as fantasy adaptations; they are not the original 0.84 coordinate grid and planet/moon rules. |
| Alliances, diplomacy, messages, rankings, and espionage | Related screens exist, but their workflows and rules are not complete 0.84 equivalents. |
| Phalanx, merchant, buddy list, notes, interplanetary missiles, and empire overview | Some nearby features exist under different names; exact 0.84 workflows and rule interactions remain gaps. |

## Implementation Phases

1. **Canonical rules and object registry:** exact building, research, ship, and defense definitions; costs, prerequisites, production, planet/moon eligibility, and universe settings.
2. **Planetary economy and queues:** reconcile construction, research, and shipyard queues with the shared registry and v0.84 timing/cost rules.
3. **Galaxy and fleet movement:** extend the expedition-only physics integration into general player fleet selection, mission availability, persistent flight events, recall, arrival, return, colonization, transport, deploy, recycle, espionage, ACS, and moon-destroy missions.
4. **Combat and consequences:** six-round combat, rapid fire, ship/defense losses, debris, moon chance/creation/destruction, missile attacks, reports, and mission writeback.
5. **Account and social pages:** empire summary, search, buddy workflows, alliance ranks/applications/circular messages, mail folders, statistics, options, merchant, and lifecycle behavior.

Each phase should add behavior to the existing Eldoria routes and data model, preserve the fantasy-facing language, and include deterministic tests for its formulas and state transitions. The roadmap describes unimplemented parity; it is not a claim that these phases are complete.
