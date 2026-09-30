# Eldoria Documentation

This index separates player guidance from implementation notes. The code is authoritative when behavior and prose disagree.

## Start Here

- [README](README.md): project overview, setup, boundaries, and document map.
- [Game Design Document](GDD.md): setting, product pillars, player loop, and scope.
- [World Bible](docs/WORLD_BIBLE.md): canonical fantasy peoples, regions, history, and magic.
- [Systems Manual](SYSTEMS_MANUAL.md): practical orientation to the current game interface.

## Engineering References

| Document | Use it for |
| --- | --- |
| [Architecture and UML](ARCHITECTURE_UML.md) | Application layers, routing, and data flow |
| [Components Architecture](docs/COMPONENTS_ARCHITECTURE.md) | Shell, sidebar, view, and responsive layout |
| [Data Models](docs/DATA_MODELS_REFERENCE.md) | Finding the canonical TypeScript types and data catalogs |
| [State and Persistence](docs/STATE_MANAGEMENT_AND_ENGINE.md) | Browser state, Firebase sync, and timing behavior |
| [API and Data Specification](API_AND_DATA_SPEC.md) | Current Firestore paths and the absence of a general game API |
| [Security Specification](security_spec.md) | What Firestore rules enforce and what they do not |
| [Source Code Reference](docs/SOURCE_CODE_REFERENCE.md) | High-value files grouped by responsibility |
| [OGame 0.84 Parity Work](docs/OGAME_084_PARITY.md) | Reference boundaries, current coverage, and implementation phases |
| [UML Diagrams](docs/UML_DIAGRAMS.md) | Compact system diagrams |

## Gameplay Subsystems

- [Economy](docs/ECONOMY_SPEC.md)
- [Combat](docs/COMBAT_ENGINE.md)
- [Adventurer Rules](docs/ADVENTURER_RULES_SPEC.md)
- [Magic and Spellcraft](docs/MAGIC_SYSTEM_SPEC.md)
- [Research and Progression](docs/REALM_RESEARCH_SPEC.md)
- [Waystones and Leygates](docs/STARGATE_NETWORK.md)
- [War Council and Retinue Systems](docs/MOTHERSHIP_SYSTEM.md)

## Supporting Material

- [Changelog](CHANGELOG.md): project changes recorded for Eldoria.
- [Optional PHP/MySQL backend](backend/README.md): separate scaffold; not the default data service for the React client.
- [Image assets](public/images/README.md) and [UI image assets](public/images/ui/README.md).

## Documentation Conventions

- **Implemented** means the behavior can be found in the current client or configured service.
- **Prototype** means a local or partial implementation that may not persist across accounts or devices.
- **Planned** means a design direction that is not represented as completed behavior.
- Internal identifiers may retain legacy names. Player-facing documentation should prefer the labels used in Eldoria's interface.

Avoid inventing balance formulas, multiplayer guarantees, or security properties. Link those claims to the source that enforces them.
