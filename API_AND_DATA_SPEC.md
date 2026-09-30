# API and Data Specification

## Service Model

The React application does not define a general-purpose REST or GraphQL game API. The browser client owns most game state, persists it locally, and uses Firebase SDK helpers for selected account and profile/resource operations.

| Concern | Current implementation | Source |
| --- | --- | --- |
| Client state | React state initialized from browser `localStorage` | [`src/App.tsx`](src/App.tsx) |
| Storage namespace | Most app keys use the `uc_state_` prefix; individual modules may use their own key | [`src/App.tsx`](src/App.tsx) |
| Arcane Codex | `eldoria.arcaneCodex` in the current browser | [`src/components/views/admin/AdminArcaneCodexTab.tsx`](src/components/views/admin/AdminArcaneCodexTab.tsx) |
| Player magic progress | `uc_state_magic_progress` in the current browser | [`src/data/magicSystemData.ts`](src/data/magicSystemData.ts) |
| Authentication | Firebase Authentication, including Google sign-in helper | [`src/firebase.ts`](src/firebase.ts) |
| Cloud profile/resources | `users/{uid}/profile/main` and `users/{uid}/resources/main` | [`src/firebase.ts`](src/firebase.ts), [`firestore.rules`](firestore.rules) |
| PHP/MySQL | Separate scaffold; not the default React data service | [`backend/README.md`](backend/README.md) |

## Firestore Documents

`src/firebase.ts` reads and writes these documents:

- `users/{uid}/profile/main`: profile fields such as username, race, realm name, title, rank, and update time.
- `users/{uid}/resources/main`: selected resource and turn values.

The helper writes only when a Firebase user is authenticated. A successful client-side save is not proof that every gameplay system is synchronized. The exact access and validation conditions are defined by [`firestore.rules`](firestore.rules); review them before changing document shapes.

Additional rule paths include user colonies, public market orders, system configuration, admin records, and a public connection-test document. Their presence in the rules does not mean every path is used by the current UI.

## TypeScript Contracts

Shared interfaces and unions are maintained in [`src/types.ts`](src/types.ts). Data catalogs live in `src/gameData.ts`, `src/*Data.ts`, and `src/data/`. Treat those files as canonical; this document intentionally does not duplicate interfaces that would drift.

## Persistence Limits

- Browser storage is editable by the user and must not be trusted for authorization, currency validation, or competitive outcomes.
- Local-only data does not automatically follow an account to another browser.
- Firestore synchronization is partial and should not be described as a complete cloud save.
- The Arcane Codex is local to one browser profile and is not a shared spell catalog.
- Learned spells, mastery, practice values, and the casting chronicle are local to one browser profile; practice effects are not authoritative campaign combat.

There is no documented contract for an external game API. Do not build clients against an endpoint unless one is added and versioned explicitly.
