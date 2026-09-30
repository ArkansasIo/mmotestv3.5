import {
  ARCANE_CODEX_SEED_VERSION,
  INITIAL_MAGIC_SCHOOLS,
  type MagicEffectType,
  type MagicClass,
  type MagicSchool,
  mergeMagicSchoolCatalog,
  type MagicSpell,
  type MagicSpellStats,
  type MagicSpellSubStats,
  type MagicSubclass,
} from './arcaneCodexData';

export const MAGIC_PROGRESS_STORAGE_KEY = 'uc_state_magic_progress';
export const MAGIC_CAST_LOG_LIMIT = 24;

export interface PlayableSpell {
  id: string;
  name: string;
  rank: string;
  title: string;
  details: string;
  schoolId: string;
  schoolName: string;
  schoolType: string;
  schoolSubtype: string;
  magicClass: string;
  classType: string;
  classSubtype: string;
  subclass: string;
  subclassType: string;
  subclassSubtype: string;
  type: string;
  subtype: string;
  target: string;
  effect: MagicEffectType;
  manaCost: number;
  power: number;
  stats: MagicSpellStats;
  subStats: MagicSpellSubStats;
  crownCost: number;
  sellValue: number;
}

export interface MagicCastRecord {
  id: string;
  spellId: string;
  spellName: string;
  outcome: string;
  createdAt: string;
}

export interface PlayerMagicProgress {
  learnedSpellIds: string[];
  masteryXp: Record<string, number>;
  vitality: number;
  wardStrength: number;
  practiceTargetHealth: number;
  arcaneInsight: number;
  castLog: MagicCastRecord[];
}

interface SpellRule {
  type: string;
  subtype: string;
  target: string;
  effect: MagicEffectType;
  manaCost: number;
  power: number;
  crownCost: number;
}

const SEEDED_SPELL_RULES: Record<string, SpellRule> = {
  'spell-coalheart-ward': { type: 'Warding', subtype: 'Hearthguard', target: 'Self and nearby allies', effect: 'ward', manaCost: 24, power: 22, crownCost: 900 },
  'spell-hearthflare': { type: 'Evocation', subtype: 'Signal flare', target: 'A visible area', effect: 'reveal', manaCost: 18, power: 14, crownCost: 700 },
  'spell-emberbrand': { type: 'Evocation', subtype: 'Cinder strike', target: 'One practice target', effect: 'strike', manaCost: 26, power: 24, crownCost: 1000 },
  'spell-ashcloak': { type: 'Veiling', subtype: 'Ash veil', target: 'Self', effect: 'journey', manaCost: 20, power: 16, crownCost: 800 },
  'spell-thornsnare': { type: 'Binding', subtype: 'Briar restraint', target: 'One practice target', effect: 'control', manaCost: 28, power: 20, crownCost: 1000 },
  'spell-rootfast': { type: 'Warding', subtype: 'Grounding roots', target: 'Self and nearby allies', effect: 'ward', manaCost: 24, power: 20, crownCost: 900 },
  'spell-mending-rain': { type: 'Restoration', subtype: 'Field healing', target: 'Self or one ally', effect: 'mend', manaCost: 22, power: 26, crownCost: 900 },
  'spell-pollen-calm': { type: 'Restoration', subtype: 'Composure', target: 'A willing group', effect: 'mend', manaCost: 18, power: 16, crownCost: 700 },
  'spell-anchor-sigil': { type: 'Runecraft', subtype: 'Binding mark', target: 'One object or doorway', effect: 'ward', manaCost: 20, power: 18, crownCost: 800 },
  'spell-hearthwall': { type: 'Runecraft', subtype: 'Barrier glyph', target: 'A nearby defense', effect: 'ward', manaCost: 34, power: 34, crownCost: 1500 },
  'spell-mirror-rune': { type: 'Runecraft', subtype: 'Scrying mirror', target: 'A visible surface', effect: 'reveal', manaCost: 22, power: 18, crownCost: 900 },
  'spell-faultline-script': { type: 'Divination', subtype: 'Stone reading', target: 'Nearby ground or masonry', effect: 'insight', manaCost: 24, power: 20, crownCost: 1000 },
  'spell-morning-benediction': { type: 'Restoration', subtype: 'Courage blessing', target: 'A willing group', effect: 'mend', manaCost: 18, power: 18, crownCost: 800 },
  'spell-sunlance': { type: 'Evocation', subtype: 'Revealing beam', target: 'One practice target or darkened area', effect: 'strike', manaCost: 26, power: 26, crownCost: 1100 },
  'spell-quieting-chime': { type: 'Restoration', subtype: 'Pain easing', target: 'Self or one willing ally', effect: 'mend', manaCost: 20, power: 22, crownCost: 850 },
  'spell-mercy-thread': { type: 'Wayfinding', subtype: 'Companion beacon', target: 'A marked companion', effect: 'reveal', manaCost: 18, power: 14, crownCost: 700 },
  'spell-veilstep': { type: 'Veiling', subtype: 'Concealed movement', target: 'Self', effect: 'journey', manaCost: 22, power: 18, crownCost: 900 },
  'spell-wayfinders-spark': { type: 'Wayfinding', subtype: 'Return light', target: 'A known path', effect: 'journey', manaCost: 16, power: 14, crownCost: 650 },
  'spell-hush-of-moths': { type: 'Veiling', subtype: 'Softened footfall', target: 'A small traveling group', effect: 'journey', manaCost: 18, power: 15, crownCost: 700 },
  'spell-dream-recall': { type: 'Divination', subtype: 'Memory reading', target: 'A willing subject', effect: 'insight', manaCost: 26, power: 22, crownCost: 1100 },
};

const FALLBACK_RULE: SpellRule = {
  type: 'Spellcraft',
  subtype: 'General working',
  target: 'Self or a willing ally',
  effect: 'insight',
  manaCost: 20,
  power: 12,
  crownCost: 750,
};

function resolveSpell(spell: MagicSpell, school: MagicSchool, magicClass: MagicClass, subclass: MagicSubclass): PlayableSpell {
  const seeded = SEEDED_SPELL_RULES[spell.id] || FALLBACK_RULE;
  const manaCost = Math.max(1, Math.floor(spell.manaCost ?? seeded.manaCost));
  const crownCost = Math.max(0, Math.floor(spell.crownCost ?? seeded.crownCost));
  const effect = spell.effect || seeded.effect;
  const power = Math.max(1, Math.floor(spell.power ?? seeded.power));
  const stats = spell.stats || {
    potency: power,
    range: ['strike', 'control', 'reveal'].includes(effect) ? 2 : 0,
    durationTurns: 1,
    precision: 75,
  };
  const subStats = spell.subStats || {
    damage: effect === 'strike' ? power : 0,
    ward: effect === 'ward' ? power : 0,
    healing: effect === 'mend' ? power : 0,
    control: effect === 'control' ? power : 0,
    utility: ['reveal', 'journey', 'insight'].includes(effect) ? power : 0,
  };

  return {
    id: spell.id,
    name: spell.name,
    rank: spell.rank || 'Novice',
    title: spell.title || 'Unclassified working',
    details: spell.details || 'A newly recorded arcane working awaiting a fuller description.',
    schoolId: school.id,
    schoolName: school.name,
    schoolType: school.type || 'Magic tradition',
    schoolSubtype: school.subtype || school.title || 'Arcane school',
    magicClass: magicClass.name,
    classType: magicClass.type || 'Spellcasting class',
    classSubtype: magicClass.subtype || magicClass.title || 'Class path',
    subclass: subclass.name,
    subclassType: subclass.type || 'Specialization',
    subclassSubtype: subclass.subtype || subclass.title || 'Specialized path',
    type: spell.type?.trim() || seeded.type,
    subtype: spell.subtype?.trim() || seeded.subtype,
    target: spell.target?.trim() || seeded.target,
    effect,
    manaCost,
    power,
    stats,
    subStats,
    crownCost,
    sellValue: Math.floor(crownCost * 0.5),
  };
}

export function getPlayableSpells(schools: MagicSchool[]): PlayableSpell[] {
  return schools.flatMap((school) => school.classes.flatMap((magicClass) =>
    magicClass.subclasses.flatMap((subclass) =>
      subclass.spells.map((spell) => resolveSpell(spell, school, magicClass, subclass)),
    ),
  ));
}

export function parseMagicSchools(raw: string | null, seedVersion: string | null): MagicSchool[] {
  if (!raw) return INITIAL_MAGIC_SCHOOLS;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return INITIAL_MAGIC_SCHOOLS;
    if (parsed.length === 0) return seedVersion === ARCANE_CODEX_SEED_VERSION ? [] : INITIAL_MAGIC_SCHOOLS;
    return seedVersion === ARCANE_CODEX_SEED_VERSION
      ? parsed as MagicSchool[]
      : mergeMagicSchoolCatalog(parsed as MagicSchool[]);
  } catch {
    return INITIAL_MAGIC_SCHOOLS;
  }
}

export function createInitialMagicProgress(spells: PlayableSpell[]): PlayerMagicProgress {
  const starterSpellIds = ['spell-coalheart-ward', 'spell-emberbrand', 'spell-mending-rain'];
  return {
    learnedSpellIds: starterSpellIds.filter((id) => spells.some((spell) => spell.id === id)),
    masteryXp: {},
    vitality: 72,
    wardStrength: 0,
    practiceTargetHealth: 100,
    arcaneInsight: 0,
    castLog: [],
  };
}

export function parseMagicProgress(raw: string | null, spells: PlayableSpell[]): PlayerMagicProgress {
  if (!raw) return createInitialMagicProgress(spells);
  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== 'object') return createInitialMagicProgress(spells);
    const saved = value as Partial<PlayerMagicProgress>;
    const validSpellIds = new Set(spells.map((spell) => spell.id));
    return {
      learnedSpellIds: Array.isArray(saved.learnedSpellIds)
        ? [...new Set(saved.learnedSpellIds.filter((id): id is string => typeof id === 'string' && validSpellIds.has(id)))]
        : createInitialMagicProgress(spells).learnedSpellIds,
      masteryXp: saved.masteryXp && typeof saved.masteryXp === 'object' ? saved.masteryXp : {},
      vitality: Number.isFinite(saved.vitality) ? Math.max(0, Math.min(100, saved.vitality!)) : 72,
      wardStrength: Number.isFinite(saved.wardStrength) ? Math.max(0, Math.min(100, saved.wardStrength!)) : 0,
      practiceTargetHealth: Number.isFinite(saved.practiceTargetHealth) ? Math.max(0, Math.min(100, saved.practiceTargetHealth!)) : 100,
      arcaneInsight: Number.isFinite(saved.arcaneInsight) ? Math.max(0, saved.arcaneInsight!) : 0,
      castLog: Array.isArray(saved.castLog)
        ? saved.castLog.filter((entry): entry is MagicCastRecord =>
            Boolean(entry) && typeof entry.id === 'string' && typeof entry.spellId === 'string' &&
            typeof entry.spellName === 'string' && typeof entry.outcome === 'string' && typeof entry.createdAt === 'string',
          ).slice(0, MAGIC_CAST_LOG_LIMIT)
        : [],
    };
  } catch {
    return createInitialMagicProgress(spells);
  }
}

export function learnMagicSpell(progress: PlayerMagicProgress, spellId: string): PlayerMagicProgress | null {
  if (progress.learnedSpellIds.includes(spellId)) return null;
  return { ...progress, learnedSpellIds: [...progress.learnedSpellIds, spellId] };
}

export function sellMagicSpell(progress: PlayerMagicProgress, spellId: string): PlayerMagicProgress | null {
  if (!progress.learnedSpellIds.includes(spellId)) return null;
  return { ...progress, learnedSpellIds: progress.learnedSpellIds.filter((id) => id !== spellId) };
}

export function castMagicSpell(progress: PlayerMagicProgress, spell: PlayableSpell): PlayerMagicProgress | null {
  if (!progress.learnedSpellIds.includes(spell.id)) return null;
  let outcome = '';
  const next: PlayerMagicProgress = {
    ...progress,
    masteryXp: { ...progress.masteryXp, [spell.id]: (progress.masteryXp[spell.id] || 0) + 10 },
  };

  if (spell.effect === 'strike') {
    const dealt = Math.min(next.practiceTargetHealth, spell.power);
    next.practiceTargetHealth = Math.max(0, next.practiceTargetHealth - spell.power);
    outcome = `The practice wisp absorbs ${dealt} force. ${next.practiceTargetHealth} vitality remains.`;
  } else if (spell.effect === 'control') {
    const bound = Math.min(next.practiceTargetHealth, Math.max(1, Math.floor(spell.power / 2)));
    next.practiceTargetHealth = Math.max(0, next.practiceTargetHealth - bound);
    outcome = `The practice wisp is bound; the working deals ${bound} force.`;
  } else if (spell.effect === 'ward') {
    next.wardStrength = Math.min(100, next.wardStrength + spell.power);
    outcome = `A ward of strength ${spell.power} settles around the caster.`;
  } else if (spell.effect === 'mend') {
    const restored = Math.min(100 - next.vitality, spell.power);
    next.vitality = Math.min(100, next.vitality + spell.power);
    outcome = `The working restores ${restored} vitality.`;
  } else if (spell.effect === 'reveal') {
    next.arcaneInsight += 1;
    outcome = `The spell reveals a clear sign. Arcane insight rises to ${next.arcaneInsight}.`;
  } else if (spell.effect === 'journey') {
    next.arcaneInsight += 1;
    outcome = `The path magic takes hold. Arcane insight rises to ${next.arcaneInsight}.`;
  } else {
    next.arcaneInsight += 1;
    outcome = `The spell resolves and yields one point of arcane insight.`;
  }

  next.castLog = [{
    id: `cast-${Date.now()}`,
    spellId: spell.id,
    spellName: spell.name,
    outcome,
    createdAt: new Date().toISOString(),
  }, ...progress.castLog].slice(0, MAGIC_CAST_LOG_LIMIT);
  return next;
}