# Eldoria Architecture Diagrams

These diagrams show the current client boundaries at a high level. They intentionally omit internal route details that change frequently.

## Application Composition

```mermaid
graph TD
    HTML[index.html] --> Entry[src/main.tsx]
    Entry --> App[src/App.tsx]
    App --> Title[Title and account flow]
    App --> Shell[Realm interface]
    Shell --> Sidebar[Sidebar routes]
    Shell --> Topbar[Topbar and status]
    Shell --> View[Active feature view]
    Shell --> Footer[Footer]
    App --> Local[(localStorage)]
    App --> Firebase[Firebase Auth and selected Firestore data]
    View --> Types[src/types.ts and feature data]
    Grimoire[Player Living Grimoire] --> CodexLocal[(eldoria.arcaneCodex)]
    Grimoire --> MagicProgress[(uc_state_magic_progress)]
    StewardCodex[Admin Arcane Codex] --> CodexLocal
```

## Persistence Flow

```mermaid
sequenceDiagram
    actor Player
    participant View as Route view
    participant App as App state
    participant Browser as localStorage
    participant Cloud as Firestore helper

    Player->>View: Perform a game action
    View->>App: Invoke an action callback
    App->>App: Update React state
    App->>Browser: Save selected state
    opt Authenticated profile or resource update
        App->>Cloud: Save selected account data
        Cloud-->>App: Complete or log a deferred sync error
    end
    App-->>View: Render updated state
```

## Trust Boundaries

```mermaid
flowchart LR
    Browser[Browser state and UI] -->|Authenticated SDK request| Rules[Firestore security rules]
    Rules --> Cloud[(Selected Firestore documents)]
    Legacy[Optional PHP/MySQL scaffold] -. not wired by default .- Browser
```

For route ownership and contract details, see [Architecture](../ARCHITECTURE_UML.md) and [API and Data](../API_AND_DATA_SPEC.md).
