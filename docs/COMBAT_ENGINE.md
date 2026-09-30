# Combat and March Operations

## Scope

Combat-facing routes include target selection, march orders, expeditions, scouting, Nemesis encounters, equipment, and battle history. The implementation is distributed across [`CombatView.tsx`](../src/components/views/CombatView.tsx), [`NemesisSystemView.tsx`](../src/components/views/NemesisSystemView.tsx), route-specific views, shared types, data catalogs, and handlers in [`App.tsx`](../src/App.tsx).

## Current Resolution Model

The browser client owns most campaign state and action handlers. A combat or march result shown in the interface should therefore be treated as client-side prototype behavior unless a specific operation is verified to call an authenticated server service. This repository does not define one authoritative combat API or a single documented global damage formula.

For implementation details, follow the handler used by the selected route and its data model. Equipment-specific calculations may be owned by their view or utility and should not be generalized to every encounter.

## Player-Facing Flow

1. Review the selected target, march or encounter type, and available force.
2. Check the costs, requirements, and any warnings presented by the view.
3. Confirm the action and wait for the local operation or queue to resolve.
4. Review the battle, expedition, or scouting record and update the next plan.

Exact choices and results depend on the active subsystem. Do not promise opponent matchmaking, synchronized PvP, or server-verified rewards based only on the presence of route labels or battle logs.

## Related Data

- Shared combat and target contracts: [`src/types.ts`](../src/types.ts)
- Nemesis and rival fixtures: [`src/data/nemesisData.ts`](../src/data/nemesisData.ts)
- Unit catalogs: [`src/unitRoster90.ts`](../src/unitRoster90.ts) and feature-specific roster data
- Combat views: `src/components/views/`

When adding a formula, document it beside the owning calculation and link to that implementation here.
