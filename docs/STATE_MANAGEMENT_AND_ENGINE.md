# State Management and Runtime

## Application State

[`src/App.tsx`](../src/App.tsx) is the top-level state owner. It initializes many values through a `loadStored` helper that reads `localStorage` using the `uc_state_<key>` naming pattern, renders the active route, and writes selected state back through React effects.

A local save is browser-specific and user-editable. It is useful for prototype continuity, but it is not a trusted source for permissions, balances, or competitive outcomes.

## Firebase Integration

[`src/firebase.ts`](../src/firebase.ts) initializes Firebase Authentication and Firestore. `App.tsx` observes Firebase Auth changes and calls helpers for a limited profile/resource sync using:

- `users/{uid}/profile/main`
- `users/{uid}/resources/main`

Other state is not automatically cloud-synchronized. Consult [`API_AND_DATA_SPEC.md`](../API_AND_DATA_SPEC.md) and [`firestore.rules`](../firestore.rules) before describing or changing persistence guarantees.

## Runtime Work

The application uses client timers to advance selected queue and background work while the page is open. Some state also performs catch-up from saved timestamps. These timers are browser behavior; they are not a durable server scheduler and may pause when a tab or device is suspended.

## Feature-Owned Persistence

Not all views persist through the root `uc_state_` helper. The Arcane Codex uses `eldoria.arcaneCodex` plus a seed-version marker; version 2 merges missing built-in schools by ID while preserving authored entries. An intentionally emptied, current-version catalog stays empty. Player magic progress uses `uc_state_magic_progress` for learned spell IDs, mastery, practice values, and the casting chronicle. Both stores remain local to that browser and are not authoritative combat state. Feature-specific keys and export/import behavior should be documented at the owning module.

## Audio

[`src/sound.ts`](../src/sound.ts) exposes the shared sound helper. Audio is client-side feedback and may require a user gesture or be disabled by browser settings.

## When Adding State

1. Define the contract in `src/types.ts` when it is shared.
2. Choose one owner for updates and validation.
3. Decide whether it is local-only, exported, or synchronized; do not imply cloud persistence by default.
4. Add recovery behavior for missing or malformed saved data.
5. Update the relevant architecture and data references.
