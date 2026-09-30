# Magic and Spellcraft System

## Scope

The player-facing **Living Grimoire** supports fifteen schools: five founder traditions and ten elemental schools. The ten elemental schools are Aether, Nether Ether, Ethereal, Light, Dark, Earth, Fire, Water, Wind, and Null. Each elemental school contributes three classes, nine subclasses, and nine uniquely identified spells. Across the complete Codex this is fifteen schools, thirty-five classes, one hundred subclasses, and one hundred ten spells.

Elemental schools, class paths, subclasses, and spell definitions are generated from [`src/data/elementalMagicData.ts`](../src/data/elementalMagicData.ts) and combined with the founder traditions in [`src/data/arcaneCodexData.ts`](../src/data/arcaneCodexData.ts). The player experience is [`src/components/views/MagicSystemView.tsx`](../src/components/views/MagicSystemView.tsx); admin authoring is [`src/components/views/admin/AdminArcaneCodexTab.tsx`](../src/components/views/admin/AdminArcaneCodexTab.tsx).

## Taxonomy and Spell Record

The Codex hierarchy is:

`School → Class → Subclass → Spell`

Every level has a name, rank/title, details, and type/subtype labels. Spell records additionally carry a target, effect, Aether cost, Crown learning cost, potency, and structured stats:

- **Primary stats:** potency, range, duration in turns, and precision percentage.
- **Effect substats:** damage, ward, healing, control, and utility.
- **Effects:** strike, ward, mend, control, reveal, journey, and insight.

The seeded elemental catalog assigns one signature spell to each subclass and gives each school nine differently named spell workings. `src/data/magicSystemData.ts` supplies safe defaults for older/custom Codex records that do not have newer mechanics fields.

## Player Loop

1. Browse the Grimoire by school, class, subclass, or spell type.
2. Learn an unowned spell from the market by spending its listed Crown cost.
3. Cast a learned spell from the Casting Circle by spending Leyline Aether.
4. Practice against the Aegis Training Wisp. Strike/control effects lower practice-target vitality; ward and mend effects adjust the local ward/vitality values; reveal, journey, and insight effects record arcane insight.
5. Sell a learned scroll for half of its listed learning cost, rounded down. Selling removes that spell from the player's learned list.

Casting awards 10 mastery XP for the spell and adds an entry to the local casting chronicle. This is currently a single-player practice loop: it does not alter campaign battles, enemy units, research unlocks, or other players' state.

## Resources and Persistence

- Casting spends `PlayerResources.energy`, labeled **Aether** in the Grimoire. Normal realm turn production remains the source of energy regeneration.
- Learning spends `PlayerResources.naquadah`, labeled **Crowns** in the fantasy-facing view.
- Player spellbook state uses `uc_state_magic_progress` and is browser-local.
- The editable Codex uses `eldoria.arcaneCodex` with `eldoria.arcaneCodexSeedVersion`.
- Seed version 2 merges missing built-in schools into version-1 saved Codices by ID. Existing authored entries with matching IDs are preserved, and custom entries remain in the catalog.

Browser storage is editable and is not an authorization boundary or trusted competitive state. The optional Firebase profile/resource sync does not make spellbook progress cloud-synchronized.

## Verification

`src/test_all_features.ts` checks school/class/subclass/spell counts, unique spell IDs and elemental names, taxonomy/stat completeness, practice effects, learning and sale transitions, save recovery, and non-destructive Codex migration.
