export const ABILITY_KEYS = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'] as const;
export type AbilityKey = (typeof ABILITY_KEYS)[number];
export type RollMode = 'normal' | 'advantage' | 'disadvantage';
export type PracticeCondition = 'steady' | 'guarded' | 'slowed' | 'marked';
export type PracticePathEffect = 'steady' | 'guarded' | 'marked' | 'mend';

export const ABILITY_POINT_BUY_BUDGET = 27;
const ABILITY_POINT_COST: Record<number, number> = { 8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9 };

export interface AbilityScores {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface SkillRule {
  name: string;
  ability: AbilityKey;
  detail: string;
}

export interface AdventurerPath {
  id: string;
  name: string;
  title: string;
  description: string;
  feature: string;
}

export interface AdventurerClass {
  id: string;
  name: string;
  title: string;
  description: string;
  hitDie: 6 | 8 | 10 | 12;
  armorBase: number;
  shieldBonus: number;
  primaryAbilities: AbilityKey[];
  savingThrows: [AbilityKey, AbilityKey];
  skillChoices: string[];
  paths: AdventurerPath[];
  features: Array<{ level: number; name: string; detail: string }>;
}

export interface AdventurerSheet {
  name: string;
  classId: string;
  pathId: string;
  level: number;
  experience: number;
  abilities: AbilityScores;
  proficientSkills: string[];
  currentHp: number;
  practiceTargetHp: number;
  conditions: PracticeCondition[];
  pathFeatureUsed: boolean;
}

export interface D20CheckResult {
  rolls: number[];
  die: number;
  modifier: number;
  proficiency: number;
  total: number;
  targetNumber: number;
  success: boolean;
  naturalOne: boolean;
  naturalTwenty: boolean;
  mode: RollMode;
}

export interface PracticeAttackResult {
  check: D20CheckResult;
  damage: number;
  targetHp: number;
  outcome: string;
}

export const SKILL_RULES: SkillRule[] = [
  { name: 'Athletics', ability: 'strength', detail: 'Climb, leap, lift, or hold a difficult line.' },
  { name: 'Acrobatics', ability: 'dexterity', detail: 'Keep balance, tumble, or slip a restraint.' },
  { name: 'Sleight of Hand', ability: 'dexterity', detail: 'Palm a small object or work a delicate mechanism.' },
  { name: 'Stealth', ability: 'dexterity', detail: 'Move quietly and use cover.' },
  { name: 'Endurance', ability: 'constitution', detail: 'Withstand a harsh march, poison, or exposure.' },
  { name: 'Arcana', ability: 'intelligence', detail: 'Recall magic traditions, runes, and spell theory.' },
  { name: 'History', ability: 'intelligence', detail: 'Recall the crowns, old roads, and turning points.' },
  { name: 'Investigation', ability: 'intelligence', detail: 'Study clues, mechanisms, and hidden patterns.' },
  { name: 'Nature', ability: 'intelligence', detail: 'Read weather, beasts, plants, and the wild.' },
  { name: 'Religion', ability: 'intelligence', detail: 'Recall vows, rites, saints, and temple customs.' },
  { name: 'Animal Handling', ability: 'wisdom', detail: 'Soothe, guide, or read a creature.' },
  { name: 'Insight', ability: 'wisdom', detail: 'Notice motives, fear, or a strained explanation.' },
  { name: 'Medicine', ability: 'wisdom', detail: 'Stabilize the hurt and recognize illness.' },
  { name: 'Perception', ability: 'wisdom', detail: 'Notice movement, sound, or a subtle change.' },
  { name: 'Survival', ability: 'wisdom', detail: 'Track, forage, navigate, and choose a safe camp.' },
  { name: 'Deception', ability: 'charisma', detail: 'Maintain a convincing falsehood.' },
  { name: 'Intimidation', ability: 'charisma', detail: 'Project a credible threat or command.' },
  { name: 'Performance', ability: 'charisma', detail: 'Hold attention with voice, story, or craft.' },
  { name: 'Persuasion', ability: 'charisma', detail: 'Find a clear appeal and speak with purpose.' },
];

export const ADVENTURER_CLASSES: AdventurerClass[] = [
  {
    id: 'vanguard', name: 'Vanguard', title: 'Shield of the March', description: 'A trained protector who holds a line, reads an opening, and keeps companions standing.',
    hitDie: 10, armorBase: 14, shieldBonus: 2, primaryAbilities: ['strength', 'constitution'], savingThrows: ['strength', 'constitution'], skillChoices: ['Athletics', 'Animal Handling', 'History', 'Insight', 'Intimidation', 'Perception', 'Survival'],
    paths: [
      { id: 'bastion', name: 'Bastion Oath', title: 'The Unbroken Gate', description: 'A defender who turns preparation into shelter.', feature: 'Once per practice encounter, brace to gain +2 Guard until your next round.' },
      { id: 'stormblade', name: 'Stormblade', title: 'The Answering Edge', description: 'A mobile duelist who presses a safe opening.', feature: 'A natural 20 adds one extra weapon die to a practice strike.' },
      { id: 'banner-captain', name: 'Banner Captain', title: 'Voice of the Muster', description: 'A field leader who steadies allies with clear orders.', feature: 'Once per rest, grant one ally a d4 to their next check.' },
    ],
    features: [{ level: 1, name: 'Fighting Discipline', detail: 'Choose a weapon style and make each movement deliberate.' }, { level: 2, name: 'Breath of the March', detail: 'Recover a small measure of vitality after a short rest.' }, { level: 3, name: 'March Path', detail: 'Choose Bastion Oath, Stormblade, or Banner Captain.' }],
  },
  {
    id: 'wayfarer', name: 'Wayfarer', title: 'Guide of the Old Roads', description: 'A scout and pathfinder who knows how to read tracks, weather, and the temper of a road.',
    hitDie: 8, armorBase: 12, shieldBonus: 0, primaryAbilities: ['dexterity', 'wisdom'], savingThrows: ['strength', 'dexterity'], skillChoices: ['Animal Handling', 'Athletics', 'Insight', 'Investigation', 'Nature', 'Perception', 'Stealth', 'Survival'],
    paths: [
      { id: 'trail-warden', name: 'Trail Warden', title: 'Keeper of the Safe Path', description: 'A protector of travelers and the people who live beside the road.', feature: 'Gain advantage on the first travel or tracking check in a scene.' },
      { id: 'beast-friend', name: 'Beast Friend', title: 'Listener at the Hedge', description: 'A patient companion to creatures of the Marches.', feature: 'Gain advantage when calming a familiar wild creature.' },
      { id: 'relic-runner', name: 'Relic Runner', title: 'Swift Hand of the Archive', description: 'A nimble explorer trained to retrieve and protect old knowledge.', feature: 'Once per encounter, add proficiency to an initiative check.' },
    ],
    features: [{ level: 1, name: 'Keen Trail', detail: 'Read signs of passage and choose a fitting field skill.' }, { level: 2, name: 'Quick Step', detail: 'Withdraw or reposition without losing awareness.' }, { level: 3, name: 'Road Calling', detail: 'Choose Trail Warden, Beast Friend, or Relic Runner.' }],
  },
  {
    id: 'arcanist', name: 'Arcanist', title: 'Reader of the Living Grimoire', description: 'A scholar of spell forms who learns that precision and restraint matter as much as power.',
    hitDie: 6, armorBase: 10, shieldBonus: 0, primaryAbilities: ['intelligence', 'constitution'], savingThrows: ['intelligence', 'wisdom'], skillChoices: ['Arcana', 'History', 'Insight', 'Investigation', 'Medicine', 'Religion'],
    paths: [
      { id: 'ember-scholar', name: 'Ember Scholar', title: 'The Measured Flame', description: 'A student of heat, light, and forge-bound workings.', feature: 'Your spell save DC increases by 1 for practice spells.' },
      { id: 'sigil-weaver', name: 'Sigil Weaver', title: 'The Certain Mark', description: 'A careful scribe who anchors magic to a surface and a promise.', feature: 'Wards you practice gain +2 ward strength.' },
      { id: 'null-cantor', name: 'Null Cantor', title: 'The Quiet Measure', description: 'A listener who studies pauses between workings and how to safely unbind them.', feature: 'Gain advantage on checks to identify or interrupt a spell.' },
    ],
    features: [{ level: 1, name: 'Spell Study', detail: 'Choose a school and learn two workings from your Grimoire.' }, { level: 2, name: 'Careful Casting', detail: 'Recover a modest Aether reserve after a short rest.' }, { level: 3, name: 'Arcane Calling', detail: 'Choose Ember Scholar, Sigil Weaver, or Null Cantor.' }],
  },
  {
    id: 'greenwarden', name: 'Greenwarden', title: 'Keeper of Root and Rain', description: 'A guardian of living places who uses growth and careful restoration without commanding nature.',
    hitDie: 8, armorBase: 12, shieldBonus: 1, primaryAbilities: ['wisdom', 'constitution'], savingThrows: ['intelligence', 'wisdom'], skillChoices: ['Animal Handling', 'Arcana', 'Insight', 'Medicine', 'Nature', 'Perception', 'Survival'],
    paths: [
      { id: 'thornkeeper', name: 'Thornkeeper', title: 'The Hedgeward Vow', description: 'A defender who protects a grove, village, or traveling company.', feature: 'Your first ward each encounter gains +2 potency.' },
      { id: 'rain-tender', name: 'Rain Tender', title: 'The Gentle Return', description: 'A healer who combines practical care with restorative workings.', feature: 'Healing practice restores 2 additional vitality.' },
      { id: 'beast-listener', name: 'Beast Listener', title: 'The Quiet Paw', description: 'A companion to the creatures who share the old wilds.', feature: 'Gain advantage on Animal Handling checks.' },
    ],
    features: [{ level: 1, name: 'Green Lore', detail: 'Recognize plants, habitats, and signs of blight.' }, { level: 2, name: 'Field Mending', detail: 'Tend wounds during a short rest.' }, { level: 3, name: 'Living Path', detail: 'Choose Thornkeeper, Rain Tender, or Beast Listener.' }],
  },
  {
    id: 'dawn-cantor', name: 'Dawn Cantor', title: 'Voice of the First Bell', description: 'A vow-keeper who uses song and lantern light to protect travelers and tend the weary.',
    hitDie: 8, armorBase: 11, shieldBonus: 1, primaryAbilities: ['charisma', 'wisdom'], savingThrows: ['wisdom', 'charisma'], skillChoices: ['History', 'Insight', 'Medicine', 'Persuasion', 'Performance', 'Religion'],
    paths: [
      { id: 'sun-votary', name: 'Sun Votary', title: 'The Unclouded Promise', description: 'A public guardian whose word and lantern offer refuge.', feature: 'Your first reveal or ward spell each encounter costs 2 less Aether.' },
      { id: 'bell-healer', name: 'Bell Healer', title: 'The Measured Chime', description: 'A practitioner of steadying songs and first aid.', feature: 'Gain proficiency in Medicine and add +2 to healing checks.' },
      { id: 'truth-singer', name: 'Truth Singer', title: 'Witness in the Hall', description: 'An envoy who values testimony, consent, and plain speech.', feature: 'Gain advantage on Persuasion checks made to mediate a dispute.' },
    ],
    features: [{ level: 1, name: 'Cantor’s Verse', detail: 'Encourage a companion with a short, clear refrain.' }, { level: 2, name: 'Shared Vigil', detail: 'Help an ally recover during a safe rest.' }, { level: 3, name: 'Dawn Path', detail: 'Choose Sun Votary, Bell Healer, or Truth Singer.' }],
  },
  {
    id: 'shadowbinder', name: 'Shadowbinder', title: 'Warden of the Gloam', description: 'A careful practitioner of concealment and shadow who avoids coercing another mind.',
    hitDie: 8, armorBase: 12, shieldBonus: 0, primaryAbilities: ['dexterity', 'intelligence'], savingThrows: ['dexterity', 'intelligence'], skillChoices: ['Acrobatics', 'Deception', 'Investigation', 'Perception', 'Sleight of Hand', 'Stealth'],
    paths: [
      { id: 'gloamstep', name: 'Gloamstep', title: 'The Lantern Between', description: 'A traveler who uses shadow to cross watched ground.', feature: 'Once per encounter, gain advantage on a Stealth check.' },
      { id: 'quiet-knife', name: 'Quiet Knife', title: 'The Lasting Mercy', description: 'A duelist who prefers to end conflict with minimal harm.', feature: 'A successful strike against an unaware target adds one weapon die.' },
      { id: 'dream-scribe', name: 'Dream Scribe', title: 'The Waking Margin', description: 'A recorder of dreams, memories, and uncertain signs.', feature: 'Gain proficiency in Insight and Arcana.' },
    ],
    features: [{ level: 1, name: 'Soft Footfall', detail: 'Move quietly and choose one subtle field skill.' }, { level: 2, name: 'Shade Feint', detail: 'Create an opening through misdirection.' }, { level: 3, name: 'Gloam Path', detail: 'Choose Gloamstep, Quiet Knife, or Dream Scribe.' }],
  },
  {
    id: 'runekeeper', name: 'Runekeeper', title: 'Reader of Stone and Sigil', description: 'A craft-mage who inscribes wards, records provenance, and respects the surface bearing each mark.',
    hitDie: 8, armorBase: 13, shieldBonus: 1, primaryAbilities: ['intelligence', 'constitution'], savingThrows: ['constitution', 'intelligence'], skillChoices: ['Arcana', 'Athletics', 'History', 'Investigation', 'Nature', 'Perception'],
    paths: [
      { id: 'wardwright', name: 'Wardwright', title: 'The Certain Wall', description: 'An artisan of protective marks for doors, shields, and shared rooms.', feature: 'Your prepared ward lasts one additional practice round.' },
      { id: 'stone-listener', name: 'Stone Listener', title: 'The Measured Fault', description: 'A surveyor who can hear strain in old walls and mountain paths.', feature: 'Gain advantage on Investigation checks involving masonry.' },
      { id: 'forge-scribe', name: 'Forge Scribe', title: 'The Patient Spark', description: 'A recorder of craft marks and the promises built into useful things.', feature: 'Gain proficiency with artisan tools and smithing lore.' },
    ],
    features: [{ level: 1, name: 'Rune Reading', detail: 'Identify a mark, ward, or crafted sigil.' }, { level: 2, name: 'Prepared Mark', detail: 'Prepare one simple ward before a known challenge.' }, { level: 3, name: 'Stone Path', detail: 'Choose Wardwright, Stone Listener, or Forge Scribe.' }],
  },
  {
    id: 'beastcaller', name: 'Beastcaller', title: 'Friend of the Marches', description: 'A patient guide who builds trust with beasts and keeps their welfare in view.',
    hitDie: 8, armorBase: 12, shieldBonus: 0, primaryAbilities: ['wisdom', 'dexterity'], savingThrows: ['dexterity', 'wisdom'], skillChoices: ['Animal Handling', 'Nature', 'Perception', 'Stealth', 'Survival'],
    paths: [
      { id: 'packkeeper', name: 'Packkeeper', title: 'The Shared Trail', description: 'A keeper of loyal working animals and careful marching order.', feature: 'A willing companion grants +1 to your travel defense.' },
      { id: 'sky-familiar', name: 'Sky Familiar', title: 'The Far Glance', description: 'A bonded bird or small sky-creature shares signs at a distance.', feature: 'Gain advantage on one distant Perception check each scene.' },
      { id: 'marsh-guide', name: 'Marsh Guide', title: 'The Safe Crossing', description: 'An expert in wetlands, river edges, and unstable ground.', feature: 'Difficult natural terrain does not hinder your first move each encounter.' },
    ],
    features: [{ level: 1, name: 'Creature Tongue', detail: 'Read signs and calm a familiar kind of beast.' }, { level: 2, name: 'March Companion', detail: 'Choose a trained animal companion for field scenes.' }, { level: 3, name: 'Wild Path', detail: 'Choose Packkeeper, Sky Familiar, or Marsh Guide.' }],
  },
  {
    id: 'lorekeeper', name: 'Lorekeeper', title: 'Keeper of the Open Ledger', description: 'A scholar who gathers reliable records, compares testimony, and marks uncertainty honestly.',
    hitDie: 6, armorBase: 10, shieldBonus: 0, primaryAbilities: ['intelligence', 'wisdom'], savingThrows: ['intelligence', 'charisma'], skillChoices: ['Arcana', 'History', 'Insight', 'Investigation', 'Nature', 'Religion'],
    paths: [
      { id: 'archive-sage', name: 'Archive Sage', title: 'The Remembered Word', description: 'A researcher who cross-references old records and local knowledge.', feature: 'Once per rest, add double proficiency to a lore check.' },
      { id: 'omen-reader', name: 'Omen Reader', title: 'The Uncertain Sign', description: 'A diviner who weighs omens without claiming certainty.', feature: 'After a failed check, reroll once per rest and keep the new result.' },
      { id: 'crown-scribe', name: 'Crown Scribe', title: 'The Living Record', description: 'A clerk and diplomat who keeps the agreements of many peoples.', feature: 'Gain proficiency in History and Persuasion.' },
    ],
    features: [{ level: 1, name: 'Field Notes', detail: 'Record one clue and add it to the party’s shared notes.' }, { level: 2, name: 'Recall Study', detail: 'Ask one focused question about a recorded subject.' }, { level: 3, name: 'Lore Path', detail: 'Choose Archive Sage, Omen Reader, or Crown Scribe.' }],
  },
  {
    id: 'skald', name: 'Skald', title: 'Bearer of the Roadsong', description: 'A storyteller whose voice keeps courage, memory, and hard-earned warnings alive.',
    hitDie: 8, armorBase: 11, shieldBonus: 0, primaryAbilities: ['charisma', 'dexterity'], savingThrows: ['dexterity', 'charisma'], skillChoices: ['Deception', 'History', 'Insight', 'Intimidation', 'Performance', 'Persuasion'],
    paths: [
      { id: 'hearth-voice', name: 'Hearth Voice', title: 'The Welcome Fire', description: 'A host and singer who helps travelers feel safe enough to speak.', feature: 'After a short rest, grant an ally temporary vitality equal to your proficiency.' },
      { id: 'war-drummer', name: 'War Drummer', title: 'The Muster Beat', description: 'A rhythm-keeper who helps a group move with purpose.', feature: 'Once per encounter, add a d4 to an ally’s initiative.' },
      { id: 'tale-weaver', name: 'Tale Weaver', title: 'The True Thread', description: 'A keeper of stories who finds the useful lesson without erasing the truth.', feature: 'Gain proficiency in one additional skill of your choice.' },
    ],
    features: [{ level: 1, name: 'Roadsong', detail: 'Give one companion a brief inspiration die.' }, { level: 2, name: 'Restful Tale', detail: 'Help the company recover during a safe rest.' }, { level: 3, name: 'Song Path', detail: 'Choose Hearth Voice, War Drummer, or Tale Weaver.' }],
  },
];

export const MAX_ADVENTURER_LEVEL = 20;
export const ADVENTURER_SHEET_STORAGE_KEY = 'uc_state_adventurer_sheet';
export const PRACTICE_ENCOUNTER = { name: 'Cinderfold Training Wisp', armorClass: 13, maxHp: 30, attackBonus: 3, damageDie: 6, damageBonus: 1 } as const;

export const DEFAULT_ADVENTURER_SHEET: AdventurerSheet = {
  name: 'March Warden',
  classId: 'vanguard',
  pathId: 'bastion',
  level: 1,
  experience: 0,
  abilities: { strength: 15, dexterity: 12, constitution: 14, intelligence: 10, wisdom: 13, charisma: 8 },
  proficientSkills: ['Athletics', 'Perception'],
  currentHp: 12,
  practiceTargetHp: PRACTICE_ENCOUNTER.maxHp,
  conditions: [],
  pathFeatureUsed: false,
};

export function abilityModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

export function proficiencyBonus(level: number): number {
  const safeLevel = Math.max(1, Math.min(MAX_ADVENTURER_LEVEL, Math.floor(level)));
  return 2 + Math.floor((safeLevel - 1) / 4);
}

export function experienceForNextLevel(level: number): number {
  const safeLevel = Math.max(1, Math.min(MAX_ADVENTURER_LEVEL, Math.floor(level)));
  return safeLevel >= MAX_ADVENTURER_LEVEL ? 0 : safeLevel * 1000;
}

export function abilityPointBuySpent(abilities: AbilityScores): number {
  return ABILITY_KEYS.reduce((total, ability) => total + (ABILITY_POINT_COST[abilities[ability]] ?? Infinity), 0);
}

export function canSpendAbilityPointBuy(abilities: AbilityScores): boolean {
  return ABILITY_KEYS.every((ability) => abilities[ability] >= 8 && abilities[ability] <= 15) && abilityPointBuySpent(abilities) <= ABILITY_POINT_BUY_BUDGET;
}

export function practiceRollMode(mode: RollMode, conditions: PracticeCondition[], ability: AbilityKey, action: 'check' | 'save' | 'attack'): RollMode {
  const advantage = mode === 'advantage' || conditions.includes('steady') || (action === 'attack' && conditions.includes('marked'));
  const disadvantage = mode === 'disadvantage' || (conditions.includes('slowed') && (ability === 'dexterity' || action === 'attack'));
  if (advantage === disadvantage) return 'normal';
  return advantage ? 'advantage' : 'disadvantage';
}

export const PATH_PRACTICE_EFFECTS: Record<string, PracticePathEffect> = {
  bastion: 'guarded', stormblade: 'marked', 'banner-captain': 'steady',
  'trail-warden': 'steady', 'beast-friend': 'steady', 'relic-runner': 'marked',
  'ember-scholar': 'steady', 'sigil-weaver': 'guarded', 'null-cantor': 'marked',
  thornkeeper: 'guarded', 'rain-tender': 'mend', 'beast-listener': 'steady',
  'sun-votary': 'guarded', 'bell-healer': 'mend', 'truth-singer': 'steady',
  gloamstep: 'marked', 'quiet-knife': 'marked', 'dream-scribe': 'steady',
  wardwright: 'guarded', 'stone-listener': 'steady', 'forge-scribe': 'steady',
  packkeeper: 'guarded', 'sky-familiar': 'steady', 'marsh-guide': 'steady',
  'archive-sage': 'steady', 'omen-reader': 'marked', 'crown-scribe': 'steady',
  'hearth-voice': 'mend', 'war-drummer': 'steady', 'tale-weaver': 'steady',
};

export function describePracticePathFeature(pathId: string, level: number): string {
  const effect = PATH_PRACTICE_EFFECTS[pathId] || 'steady';
  if (effect === 'guarded') return 'Once per Short Rest, brace to gain +2 Guard against the training wisp’s next attack.';
  if (effect === 'marked') return 'Once per Short Rest, mark the training wisp; your next practice attack has advantage.';
  if (effect === 'mend') return `Once per Short Rest, restore up to ${Math.max(3, proficiencyBonus(level) * 3)} vitality.`;
  return 'Once per Short Rest, steady your focus; your next d20 check or saving throw has advantage.';
}

export function usePracticePathFeature(sheet: AdventurerSheet): { sheet: AdventurerSheet; result: string } | null {
  if (sheet.pathFeatureUsed) return null;
  const effect = PATH_PRACTICE_EFFECTS[sheet.pathId] || 'steady';
  if (effect === 'mend') {
    const healing = Math.max(3, proficiencyBonus(sheet.level) * 3);
    const maxHp = calculateAdventurerStats(sheet).maxHp;
    const restored = Math.min(healing, maxHp - sheet.currentHp);
    return {
      sheet: { ...sheet, currentHp: Math.min(maxHp, sheet.currentHp + healing), pathFeatureUsed: true },
      result: `Path feature restores ${restored} vitality.`,
    };
  }
  const condition: PracticeCondition = effect;
  return {
    sheet: { ...sheet, conditions: [...new Set([...sheet.conditions, condition])], pathFeatureUsed: true },
    result: `Path feature readied: ${condition}. It will affect the next fitting roll or defense.`,
  };
}

export function getAdventurerClass(classId: string): AdventurerClass {
  return ADVENTURER_CLASSES.find((entry) => entry.id === classId) || ADVENTURER_CLASSES[0];
}

export function getAdventurerPath(classId: string, pathId: string): AdventurerPath {
  const adventurerClass = getAdventurerClass(classId);
  return adventurerClass.paths.find((entry) => entry.id === pathId) || adventurerClass.paths[0];
}

export function calculateAdventurerStats(sheet: AdventurerSheet) {
  const adventurerClass = getAdventurerClass(sheet.classId);
  const level = Math.max(1, Math.min(MAX_ADVENTURER_LEVEL, Math.floor(sheet.level)));
  const constitutionModifier = abilityModifier(sheet.abilities.constitution);
  const hitDieAverage = Math.floor(adventurerClass.hitDie / 2) + 1;
  const maxHp = Math.max(1, adventurerClass.hitDie + constitutionModifier + (level - 1) * Math.max(1, hitDieAverage + constitutionModifier));
  const dexterityModifier = abilityModifier(sheet.abilities.dexterity);
  const armorClass = Math.max(10, adventurerClass.armorBase + dexterityModifier + adventurerClass.shieldBonus);
  const proficiency = proficiencyBonus(level);
  const spellcastingAbility = adventurerClass.primaryAbilities[0];
  const spellSaveDc = 8 + proficiency + abilityModifier(sheet.abilities[spellcastingAbility]);
  return { level, maxHp, armorClass, proficiency, initiative: dexterityModifier, spellSaveDc, hitDie: adventurerClass.hitDie };
}

export function normalizeAdventurerSheet(value: unknown): AdventurerSheet {
  if (!value || typeof value !== 'object') return DEFAULT_ADVENTURER_SHEET;
  const saved = value as Partial<AdventurerSheet>;
  const adventurerClass = getAdventurerClass(typeof saved.classId === 'string' ? saved.classId : DEFAULT_ADVENTURER_SHEET.classId);
  const level = Math.max(1, Math.min(MAX_ADVENTURER_LEVEL, Math.floor(Number(saved.level) || 1)));
  const abilities = { ...DEFAULT_ADVENTURER_SHEET.abilities, ...(saved.abilities || {}) };
  const normalizeScore = (score: number) => Math.max(1, Math.min(20, Math.floor(Number(score) || 10)));
  let validAbilities: AbilityScores = {
    strength: Math.max(8, Math.min(15, normalizeScore(abilities.strength))),
    dexterity: Math.max(8, Math.min(15, normalizeScore(abilities.dexterity))),
    constitution: Math.max(8, Math.min(15, normalizeScore(abilities.constitution))),
    intelligence: Math.max(8, Math.min(15, normalizeScore(abilities.intelligence))),
    wisdom: Math.max(8, Math.min(15, normalizeScore(abilities.wisdom))),
    charisma: Math.max(8, Math.min(15, normalizeScore(abilities.charisma))),
  };
  if (!canSpendAbilityPointBuy(validAbilities)) validAbilities = DEFAULT_ADVENTURER_SHEET.abilities;
  const pathId = adventurerClass.paths.some((path) => path.id === saved.pathId) ? saved.pathId! : adventurerClass.paths[0].id;
  const proficientSkills = Array.isArray(saved.proficientSkills)
    ? [...new Set(saved.proficientSkills.filter((skill): skill is string => typeof skill === 'string' && adventurerClass.skillChoices.includes(skill)))].slice(0, 2)
    : DEFAULT_ADVENTURER_SHEET.proficientSkills.filter((skill) => adventurerClass.skillChoices.includes(skill)).slice(0, 2);
  const normalized: AdventurerSheet = {
    ...DEFAULT_ADVENTURER_SHEET,
    name: typeof saved.name === 'string' && saved.name.trim() ? saved.name.trim().slice(0, 32) : DEFAULT_ADVENTURER_SHEET.name,
    classId: adventurerClass.id,
    pathId,
    level,
    experience: Math.max(0, Math.floor(Number(saved.experience) || 0)),
    abilities: validAbilities,
    proficientSkills,
    currentHp: Math.max(0, Math.floor(Number(saved.currentHp) || 0)),
    practiceTargetHp: Math.max(0, Math.min(PRACTICE_ENCOUNTER.maxHp, Math.floor(Number(saved.practiceTargetHp ?? PRACTICE_ENCOUNTER.maxHp)))),
    conditions: Array.isArray(saved.conditions) ? saved.conditions.filter((condition): condition is PracticeCondition => ['steady', 'guarded', 'slowed', 'marked'].includes(condition)) : [],
    pathFeatureUsed: saved.pathFeatureUsed === true,
  };
  return { ...normalized, currentHp: Math.min(normalized.currentHp, calculateAdventurerStats(normalized).maxHp) };
}

export function resolveD20Check(input: {
  abilityScore: number;
  level: number;
  proficient: boolean;
  dc: number;
  mode?: RollMode;
  bonus?: number;
  random?: () => number;
}): D20CheckResult {
  const random = input.random || Math.random;
  const mode = input.mode || 'normal';
  const rolls = [1 + Math.floor(random() * 20)];
  if (mode !== 'normal') rolls.push(1 + Math.floor(random() * 20));
  const die = mode === 'advantage' ? Math.max(...rolls) : mode === 'disadvantage' ? Math.min(...rolls) : rolls[0];
  const proficiency = input.proficient ? proficiencyBonus(input.level) : 0;
  const modifier = abilityModifier(input.abilityScore) + proficiency + (input.bonus || 0);
  const total = die + modifier;
  return {
    rolls,
    die,
    modifier,
    proficiency,
    total,
    targetNumber: input.dc,
    success: total >= input.dc,
    naturalOne: die === 1,
    naturalTwenty: die === 20,
    mode,
  };
}

export function resolvePracticeAttack(input: {
  sheet: AdventurerSheet;
  targetAc?: number;
  targetHp?: number;
  mode?: RollMode;
  random?: () => number;
}): PracticeAttackResult {
  const stats = calculateAdventurerStats(input.sheet);
  const check = resolveD20Check({
    abilityScore: input.sheet.abilities.strength,
    level: stats.level,
    proficient: true,
    dc: input.targetAc ?? PRACTICE_ENCOUNTER.armorClass,
    mode: input.mode,
    random: input.random,
  });
  const hit = check.naturalTwenty || (!check.naturalOne && check.success);
  const random = input.random || Math.random;
  const damageDie = hit ? 1 + Math.floor(random() * 8) : 0;
  const criticalDie = hit && check.naturalTwenty ? 1 + Math.floor(random() * 8) : 0;
  const damage = hit ? Math.max(1, damageDie + criticalDie + abilityModifier(input.sheet.abilities.strength)) : 0;
  const targetHp = Math.max(0, (input.targetHp ?? PRACTICE_ENCOUNTER.maxHp) - damage);
  const outcome = hit
    ? `${check.naturalTwenty ? 'Critical hit' : 'Hit'} for ${damage} practice damage.`
    : `${check.naturalOne ? 'Natural 1' : 'Miss'}; no practice damage.`;
  return { check, damage, targetHp, outcome };
}

export function applyPracticeDamage(sheet: AdventurerSheet, damage: number): AdventurerSheet {
  const stats = calculateAdventurerStats(sheet);
  return { ...sheet, currentHp: Math.max(0, Math.min(stats.maxHp, sheet.currentHp - Math.max(0, Math.floor(damage)))) };
}
