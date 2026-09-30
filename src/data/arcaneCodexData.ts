import { ELEMENTAL_MAGIC_SCHOOLS } from './elementalMagicData';

export type MagicEffectType = 'strike' | 'ward' | 'mend' | 'control' | 'reveal' | 'journey' | 'insight';

export interface MagicSpellStats {
  potency: number;
  range: number;
  durationTurns: number;
  precision: number;
}

export interface MagicSpellSubStats {
  damage: number;
  ward: number;
  healing: number;
  control: number;
  utility: number;
}

export interface CodexEntry {
  id: string;
  name: string;
  rank: string;
  title: string;
  details: string;
  type?: string;
  subtype?: string;
  target?: string;
  effect?: MagicEffectType;
  manaCost?: number;
  power?: number;
  crownCost?: number;
  stats?: MagicSpellStats;
  subStats?: MagicSpellSubStats;
}

export type MagicSpell = CodexEntry;
export type MagicSubclass = CodexEntry & { spells: MagicSpell[] };
export type MagicClass = CodexEntry & { subclasses: MagicSubclass[] };
export type MagicSchool = CodexEntry & { classes: MagicClass[] };

export const ARCANE_CODEX_SEED_VERSION = '2';
export const ARCANE_CODEX_STORAGE_KEY = 'eldoria.arcaneCodex';
export const ARCANE_CODEX_SEED_VERSION_KEY = 'eldoria.arcaneCodexSeedVersion';

const FOUNDER_MAGIC_SCHOOLS: MagicSchool[] = [
  {
    id: 'school-emberweaving',
    name: 'Emberweaving',
    rank: 'First Circle',
    title: 'The Kindled Art',
    details: 'The craft of coaxing heat from hearth, forge, and living flame. Emberweavers prize restraint: fire can guard a home or consume it, and every lesson begins with knowing what must not burn.',
    classes: [
      {
        id: 'class-ember-warden',
        name: 'Ember Warden',
        rank: 'Adept',
        title: 'Keeper of the Hearthline',
        details: 'A battle-trained practitioner who turns warmth into wards, warning lights, and measured bursts of force.',
        subclasses: [
          {
            id: 'sub-coalheart-sentinel',
            name: 'Coalheart Sentinel',
            rank: 'Shield Path',
            title: 'The Unspent Flame',
            details: 'Defensive emberweavers who bank heat in etched buckles and release it only when a companion is threatened.',
            spells: [
              { id: 'spell-coalheart-ward', name: 'Coalheart Ward', rank: 'Novice', title: 'Guarding Charm', details: 'A low red ring warms shields and steadies frightened allies. It cannot stop a determined blow, but it can turn a panic into a held line.' },
              { id: 'spell-hearthflare', name: 'Hearthflare', rank: 'Adept', title: 'Signal and Rebuke', details: 'A bright, short-lived flare that marks a position, reveals nearby movement, and stings an aggressor who presses too close.' },
            ],
          },
          {
            id: 'sub-ashen-duelist',
            name: 'Ashen Duelist',
            rank: 'Edge Path',
            title: 'The Dancing Cinder',
            details: 'Mobile practitioners who shape small tongues of flame around a blade or staff, favoring precision over spectacle.',
            spells: [
              { id: 'spell-emberbrand', name: 'Emberbrand', rank: 'Novice', title: 'Marked Strike', details: 'A brief, controlled line of heat follows a weapon swing. The mark glows until it cools, making a hidden wound or trail easier to find.' },
              { id: 'spell-ashcloak', name: 'Ashcloak', rank: 'Adept', title: 'Smoke Veil', details: 'A curling veil of warm ash breaks sight for a heartbeat. Wind scatters it quickly, so the caster must already know where to move.' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'school-verdant-covenant',
    name: 'Verdant Covenant',
    rank: 'First Circle',
    title: 'The Listening Green',
    details: 'A living tradition of root, rain, seed, and patient tending. Its practitioners borrow vitality from healthy places and restore what can still recover; they do not command life as property.',
    classes: [
      {
        id: 'class-greenward',
        name: 'Greenward',
        rank: 'Adept',
        title: 'Voice of the Root',
        details: 'A protector and field healer who learns the names of local plants before asking them for aid.',
        subclasses: [
          {
            id: 'sub-rootwarden',
            name: 'Rootwarden',
            rank: 'Sentinel Path',
            title: 'The Deep Hold',
            details: 'Wardens braid living roots into snares, braces, and shelter. They work best where soil and water remain unspoiled.',
            spells: [
              { id: 'spell-thornsnare', name: 'Thornsnare', rank: 'Novice', title: 'Binding Growth', details: 'A mat of briar rises across a narrow approach, slowing pursuers without deciding who is friend or foe.' },
              { id: 'spell-rootfast', name: 'Rootfast', rank: 'Adept', title: 'Grounding Vow', details: 'Roots clasp boots and shield-rims to the earth, helping a willing group hold position against a sudden rush.' },
            ],
          },
          {
            id: 'sub-bloom-tender',
            name: 'Bloom Tender',
            rank: 'Mender Path',
            title: 'The Gentle Return',
            details: 'Healers who use clean water, herbs, and measured growth to support natural recovery.',
            spells: [
              { id: 'spell-mending-rain', name: 'Mending Rain', rank: 'Novice', title: 'Restorative Mist', details: 'A cool mist cleans dust from wounds and eases strain. It cannot replace a surgeon, a meal, or time.' },
              { id: 'spell-pollen-calm', name: 'Pollen Calm', rank: 'Adept', title: 'Quieting Bloom', details: 'A fragrant cloud helps a willing group slow its breathing and resist fear. It does not control thoughts or erase grief.' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'school-stone-and-sigil',
    name: 'Stone and Sigil',
    rank: 'First Circle',
    title: 'The Measured Mark',
    details: 'The rune craft of the Ironroot halls and their adopted students. A sigil needs a surface, a true line, and a clear purpose; careless marks crack stone and trust alike.',
    classes: [
      {
        id: 'class-rune-binder',
        name: 'Rune Binder',
        rank: 'Adept',
        title: 'Reader of Load and Line',
        details: 'A craft mage who studies how a mark carries force through stone, wood, metal, and warded doors.',
        subclasses: [
          {
            id: 'sub-wardwright',
            name: 'Wardwright',
            rank: 'Keeper Path',
            title: 'The Certain Wall',
            details: 'Wardwrights inscribe protective boundaries into gates, pavises, and the lintels of shared rooms.',
            spells: [
              { id: 'spell-anchor-sigil', name: 'Anchor Sigil', rank: 'Novice', title: 'Steadfast Mark', details: 'A rune fixes a door, rope, or shield in place until its chalk or carved line is broken.' },
              { id: 'spell-hearthwall', name: 'Hearthwall', rank: 'Adept', title: 'Shelter Glyph', details: 'A broad sigil stiffens an existing wall or shield for a short defense. It cannot raise a fortress from bare ground.' },
            ],
          },
          {
            id: 'sub-glasswright',
            name: 'Glasswright',
            rank: 'Seer Path',
            title: 'The Clear Reflection',
            details: 'Artisans who use polished stone, glass, and metal to bend light and read stresses in built things.',
            spells: [
              { id: 'spell-mirror-rune', name: 'Mirror Rune', rank: 'Novice', title: 'Reflected Sign', details: 'A polished surface carries a brief image around a corner, though distance and darkness distort what it shows.' },
              { id: 'spell-faultline-script', name: 'Faultline Script', rank: 'Adept', title: 'Stone Listening', details: 'A finger-traced mark lets the caster feel strain in nearby masonry and find a likely crack or hollow.' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'school-dawnsong',
    name: 'Dawnsong',
    rank: 'First Circle',
    title: 'The Open Hand',
    details: 'A tradition of light, voice, sworn care, and clear witness. Its vows forbid coercion disguised as healing: consent and truth are part of the rite.',
    classes: [
      {
        id: 'class-dawn-cantor',
        name: 'Dawn Cantor',
        rank: 'Adept',
        title: 'Singer of the First Bell',
        details: 'A vow-keeper who uses song and lantern light to protect travelers, tend the weary, and expose what hides in plain sight.',
        subclasses: [
          {
            id: 'sub-sun-votary',
            name: 'Sun Votary',
            rank: 'Oath Path',
            title: 'The Unclouded Promise',
            details: 'Votaries carry the dawn into dangerous places and stand openly between a threat and the people behind them.',
            spells: [
              { id: 'spell-morning-benediction', name: 'Morning Benediction', rank: 'Novice', title: 'Renewed Resolve', details: 'A sung blessing steadies willing companions and gives them courage to continue a hard journey.' },
              { id: 'spell-sunlance', name: 'Sunlance', rank: 'Adept', title: 'Revealing Light', details: 'A narrow beam of clean light drives back natural darkness and outlines concealed tracks without burning what it touches.' },
            ],
          },
          {
            id: 'sub-bell-healer',
            name: 'Bell Healer',
            rank: 'Mender Path',
            title: 'The Measured Chime',
            details: 'Healers whose bells and gentle harmonies mark a safe rhythm for first aid and shared recovery.',
            spells: [
              { id: 'spell-quieting-chime', name: 'Quieting Chime', rank: 'Novice', title: 'Pain-Easing Note', details: 'A soft, repeated tone helps a patient stay calm while ordinary care is given.' },
              { id: 'spell-mercy-thread', name: 'Mercy Thread', rank: 'Adept', title: 'Shared Vigil', details: 'A ribbon of light marks a healer and patient so companions can find them through smoke or a crowded refuge.' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'school-gloam-and-wayfinding',
    name: 'Gloam and Wayfinding',
    rank: 'First Circle',
    title: 'The Lantern Between',
    details: 'The quiet arts of shadow, dreams, landmarks, and roads. Wayfinders reveal paths that already exist; they cannot skip a journey or make an unknown place safe.',
    classes: [
      {
        id: 'class-waywarden',
        name: 'Waywarden',
        rank: 'Adept',
        title: 'Keeper of the Marked Road',
        details: 'A scout-mage who maps honest paths, protects travelers, and treats every safe return as part of the spell.',
        subclasses: [
          {
            id: 'sub-lantern-scout',
            name: 'Lantern Scout',
            rank: 'Pathfinder Path',
            title: 'The Far Glimmer',
            details: 'Scouts learn to read wind, birdflight, old mile-markers, and the small signs that warn a road has changed.',
            spells: [
              { id: 'spell-veilstep', name: 'Veilstep', rank: 'Novice', title: 'Brief Concealment', details: 'A shadow folds around one careful movement. It hides a step, not a person who keeps moving in plain sight.' },
              { id: 'spell-wayfinders-spark', name: "Wayfinder's Spark", rank: 'Adept', title: 'Return Light', details: 'A small floating light hangs above a path already traveled, guiding companions back to a known turning.' },
            ],
          },
          {
            id: 'sub-dream-scribe',
            name: 'Dream Scribe',
            rank: 'Lore Path',
            title: 'The Waking Margin',
            details: 'Scribes preserve dreams as clues and metaphors; they never claim that a dream is a certain prophecy.',
            spells: [
              { id: 'spell-hush-of-moths', name: 'Hush of Moths', rank: 'Novice', title: 'Softened Footfall', details: 'A drifting pattern of dusky motes muffles a few quiet steps before settling harmlessly to the ground.' },
              { id: 'spell-dream-recall', name: 'Dream Recall', rank: 'Adept', title: 'Remembered Image', details: 'With a willing subject, the caster helps bring a recently remembered image into clear words and sketchable detail.' },
            ],
          },
        ],
      },
    ],
  },
];

export const INITIAL_MAGIC_SCHOOLS: MagicSchool[] = [
  ...FOUNDER_MAGIC_SCHOOLS,
  ...ELEMENTAL_MAGIC_SCHOOLS,
];

export function mergeMagicSchoolCatalog(existing: MagicSchool[]): MagicSchool[] {
  const existingIds = new Set(existing.map((school) => school.id));
  return [...existing, ...INITIAL_MAGIC_SCHOOLS.filter((school) => !existingIds.has(school.id))];
}