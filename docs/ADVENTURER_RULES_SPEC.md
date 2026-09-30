# Adventurer Rules and Handbook

## Scope

The Adventurer’s Handbook adds a separate, browser-local tabletop-style rules layer alongside Eldoria’s strategic warband combat. It uses familiar fifth-edition-compatible d20 procedures, but all classes, paths, encounter lore, and descriptions here are original Eldoria material. This reference does not reproduce proprietary rulebook text or claim to implement every published option.

The player view is [`src/components/views/AdventurerHandbookView.tsx`](../src/components/views/AdventurerHandbookView.tsx), its pure rules and setting catalog are [`src/data/adventurerRulesData.ts`](../src/data/adventurerRulesData.ts), and its navigation/route are registered in [`src/components/Sidebar.tsx`](../src/components/Sidebar.tsx) and [`src/App.tsx`](../src/App.tsx).

## Character Sheet

A saved adventurer has a name, one of ten original callings, one of three paths for that calling, level, experience, six ability scores, skill proficiencies, current vitality, practice-target vitality, practice conditions, and whether the path feature has been spent since resting.

- **Abilities:** Strength, Dexterity, Constitution, Intelligence, Wisdom, and Charisma. New scores use a 27-point buy, with scores between 8 and 15; ability modifier is `floor((score - 10) / 2)`. The score costs are 8:0, 9:1, 10:2, 11:3, 12:4, 13:5, 14:7, 15:9.
- **Proficiency:** starts at +2 and increases at levels 5, 9, 13, and 17; maximum character level is 20.
- **Skill list:** nineteen checks mapped to their governing abilities. A character can mark up to two skills as practiced.
- **Derived values:** hit points use the calling's hit die and Constitution modifier; Guard uses the calling's armor base, Dexterity modifier, and shield bonus; initiative uses Dexterity; spell save DC uses proficiency and the calling's primary ability.
- **Advancement:** this prototype uses milestone experience, with the next threshold `current level × 1,000 XP`.
- **Path feature:** each calling path has a distinct, once-per-Short-Rest practice effect: a Guard bonus, a marked attack, a steadying advantage, or limited healing.

Callings and paths are original setting content. Each calling defines a hit die, armor baseline, primary abilities, saving-throw proficiencies, skill choices, path descriptions, and class features.

## Resolution

An ability check or saving throw rolls a d20, adds the governing ability modifier and proficiency when trained, then compares the total with a difficulty number. Advantage rolls two d20s and keeps the higher; disadvantage keeps the lower. A natural 20 is critical on an attack; attack checks also treat a natural 1 as a miss. Practice attacks use a d8 weapon die and the Strength modifier. These mechanics are implemented in the pure helpers in `adventurerRulesData.ts` so they can be tested without rendering React.

## Practice Encounter

The Cinderfold Training Wisp is a harmless, local sparring target with its own Guard, vitality, attack bonus, and damage die. Player attacks and the wisp’s response use the d20 resolver. Steady grants advantage on the next d20 roll; Marked grants advantage on the next practice strike; Slowed imposes disadvantage on the next Dexterity check/save or practice strike; Guarded adds +2 Guard against the wisp’s next retaliation. A Short Rest restores vitality, clears these conditions, resets the wisp, and readies the path feature. These actions do not alter the strategic battle engine, campaign enemies, or other players.

## Persistence and Limits

The character sheet is stored under `uc_state_adventurer_sheet` in this browser. The save is user-editable, does not sync through Firebase, and is not an authorization or competitive-play boundary. The Handbook does not implement multiplayer sessions, a full dungeon master workflow, or imported proprietary book content.

## Verification

`src/test_all_features.ts` checks ability modifiers and point-buy, proficiency scaling, advantage/disadvantage, check totals, level-derived vitality, critical practice damage, path-feature use, and malformed-save normalization.
