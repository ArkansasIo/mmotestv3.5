# Security Specification

This document summarizes the current client and Firestore boundaries. The deployed [`firestore.rules`](firestore.rules) file is authoritative for Firestore access; this page is not a penetration-test report.

## Firestore Rule Summary

The rules use a default-deny catch-all and define narrower access for selected paths:

- **Profiles and resources:** reads and writes require the matching signed-in owner or an admin. Create/update rules validate selected fields and preserve the document owner ID. Deletes are admin-only.
- **Colonies:** reads and writes require the owner or an admin; deletes are also permitted to the owner.
- **Market orders:** signed-in users may read. Creation requires the caller's UID as seller and positive amount/price values. Owners and admins may update/delete under the listed conditions.
- **System configuration:** readable publicly. The combined create/update/delete rule requires an admin and a valid positive-speed payload; because deletes normally have no incoming payload, test admin deletion explicitly in the emulator rather than assuming it succeeds.
- **Admin directory:** signed-in reads; writes require an admin.
- **Connection test:** public read; admin write.

The `isAdmin()` rule currently accepts two verified email addresses, a specific root email without an email-verified check, or a UID present under `/admins`. Verify this policy against operational requirements before deployment.

## Important Limits

- `localStorage`, React state, and client-side admin sessions are user-controlled. They cannot secure balances, roles, rewards, or shared game outcomes.
- The Arcane Codex is browser-local and has no Firestore authorization rule.
- Rule coverage is limited to the paths present in `firestore.rules`; unlisted paths remain denied by the catch-all.
- Rules validate selected keys and numeric constraints, not every possible gameplay invariant.
- Firebase web configuration is public client configuration, not a place for service-account credentials or private secrets.
- The separate PHP/MySQL scaffold requires its own authentication, authorization, CSRF protection, input validation, secret storage, and deployment review.

## Verification Checklist

Before publishing rule or backend changes:

1. Run Firebase Emulator Suite tests for owner, other-user, unauthenticated, and admin cases.
2. Test negative and zero resource/order values, owner-ID changes, and unexpected fields against the deployed rule logic.
3. Confirm admin grants cannot be self-created by ordinary users.
4. Inspect server logs and verify secrets are not present in client bundles or checked-in configuration.
5. Review every feature that claims cloud persistence and confirm it uses an authorized server path.

No automated rules test suite is documented in this repository. Treat these checks as deployment work, not as tests that have already passed.
