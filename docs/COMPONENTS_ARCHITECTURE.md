# Components Architecture

## Application Shell

`src/main.tsx` mounts `App.tsx`. The root component selects between the title/account screen and the game shell, owns the active route and shared game state, and renders the selected view.

The authenticated shell is composed from:

- [`Sidebar.tsx`](../src/components/Sidebar.tsx): grouped route navigation, collapsed rail, and mobile drawer.
- [`Topbar.tsx`](../src/components/Topbar.tsx): profile/resource summary and global actions.
- [`LiveSystemRouteBar.tsx`](../src/components/LiveSystemRouteBar.tsx): current location and route context.
- [`HudMetrics.tsx`](../src/components/HudMetrics.tsx): compact status metrics.
- [`Footer.tsx`](../src/components/Footer.tsx): persistent status and utility actions.
- A route-level view from `src/components/views/`.

## Navigation and Views

Visible group names and route IDs are defined by `OGAME_NAV_SECTIONS` in `src/components/Sidebar.tsx`. The name is a retained internal identifier; the labels are the player-facing Eldoria vocabulary. `App.tsx` maps route IDs to view components.

Views are feature-focused React components. Shared state and mutation callbacks generally come from `App.tsx`; local presentation state stays inside the view. Supporting admin views are grouped under `src/components/views/admin/`, while reusable dialogs live under `src/components/modals/`.

## Responsive Behavior

The shell uses a persistent sidebar on wide screens and a slide-over drawer on smaller screens. View components use responsive Tailwind layout utilities. When adding a route or control, verify keyboard access, narrow-screen fit, and drawer dismissal behavior.

## Admin Content Tools

`AdminControlPanelView.tsx` groups protected tools. `AdminArcaneCodexTab.tsx` manages a nested school/class/subclass/spell catalog. Its persistence is local to the current browser and should not be presented as shared server content.

## Maintenance Rules

- Add routes to the sidebar and the route switch together.
- Reuse shared models from `src/types.ts` rather than defining conflicting app-wide shapes.
- Keep visual wording in the fantasy setting; retain legacy naming only where required by existing code contracts.
- Describe actual persistence boundaries in the view's documentation.
