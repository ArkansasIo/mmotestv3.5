# Eldoria: Realms at War — Player Systems Manual

This guide orients players to the current browser interface. Exact actions and available systems can vary as the prototype changes.

## Begin a Saga

From the title screen, choose **Begin Your Saga** to register, **Hero Login** to return to an account, or **Enter as a Wanderer** to explore without the account flow. Follow the on-screen form; avoid entering real-world secrets into a local development build.

## Read the Realm HUD

The top bar and overview present your profile, available resources, current realm activity, and alerts. Treat displayed values as the state of the active browser campaign. The app's local save and account synchronization behavior is described in [State and Persistence](docs/STATE_MANAGEMENT_AND_ENGINE.md).

## Choose a People and Crown

Open **People & Crown** to review the available people and government choices. Their names, descriptions, and modifiers come from [`src/gameData.ts`](src/gameData.ts). A government is a strategic identity choice; check its current in-game description before committing.

## Develop Holdings

Use **Lands & Holdings**, **Keep & Holding Upgrades**, **Mines & Forgeworks**, and **Crownworks & Leylines** to inspect territory, workforce, mines, workshops, remote quarries, and leyline reserves. Upgrade works, improve oreways, craft guild goods, or collect caravan loads; review each displayed cost and requirement before confirming. Resource labels distinguish Iron, Moonstone, Aether, Crowns, and other realm stores.

## Research, Recruit, and Equip

The **Great Tome of Lore** and related research views manage progression. The **Guild Academy**, recruiting hall, warband roster, and gear views cover training and equipment. Project queues and timers are client-managed unless a system explicitly reports otherwise.

## Adventurer’s Handbook

Open **Overview → Adventurer’s Handbook** to create a local character sheet. Choose one of ten original callings and a path, spend 27 points on six ability scores (8–15), and choose up to two practiced skills from that calling. Use the once-per-Short-Rest **Path Feature** to ready its Guard, attack, focus, or healing effect. **Checks & Saves** rolls d20 checks with proficiency, advantage, or disadvantage; successful checks grant milestone experience. In the **Practice Encounter**, Steady grants advantage, Guarded adds +2 Guard against the next wisp strike, Slowed hinders Dexterity checks/saves or attacks, and Marked grants advantage on the next practice strike. A Short Rest restores vitality, clears practice conditions, and readies the path feature. This tabletop-style rules layer is browser-local and does not modify strategic warband battles or other players’ state.

## Send Warbands and Explore

Use the march orders, expeditions, scout reports, and realm map to select an objective. Review the target and expected costs before confirming. After an encounter, check the battle chronicle or mission report for its result; combat outcomes are resolved by the local application logic.

## Guilds, Trade, and Travel

The sidebar groups social and economic tools under guild, market, and realm sections. Waystone and Leygate labels are used for travel-themed features. Some of these systems are prototypes or have limited persistence; the interface and source are the authority for the current build.

## Magic and Spellcraft

Open **Research → Grimoire & Spellcraft** to browse schools, classes, subclasses, spell types, and subtypes. The starter grimoire includes a few learned spells; use **Spell Market** to learn more with Crowns and sell known scrolls. Cast learned spells in the **Casting Circle** by spending Leyline Aether. Strike, ward, healing, control, revelation, and wayfinding effects can be practiced against the Aegis Training Wisp. Learned spells, mastery, vitality, and the casting chronicle are stored locally in this browser; practice results do not change server-authoritative combat.

## Arcane Codex (Admin)

The Steward's Council includes an Arcane Codex editor with fifteen schools, thirty-five classes, one hundred subclasses, and one hundred ten spells. Ten elemental schools each contribute nine uniquely named spells. Add schools, classes, subclasses, and spells with type/subtype taxonomy; spells include target, effect, Aether cost, potency, range, duration, precision, and effect substats. The catalog is stored in that browser's local storage and is not a shared content service. See the [World Bible](docs/WORLD_BIBLE.md) for the schools' setting rules.

## Save and Account Notes

Most game state is saved locally in the browser. Firebase Authentication and Firestore are used by selected account and profile/resource paths only. Clearing browser storage can erase local campaign data. Export a save where the interface offers that option before resetting data.

For implementation and service limits, see [Project Boundaries](README.md#project-boundaries), [API and Data Specification](API_AND_DATA_SPEC.md), and [Security Specification](security_spec.md).
