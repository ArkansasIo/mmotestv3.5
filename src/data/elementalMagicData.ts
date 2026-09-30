import type { MagicEffectType, MagicSchool } from './arcaneCodexData';

interface ElementSchoolSeed {
  id: string;
  name: string;
  tradition: string;
  details: string;
  classes: [string, string, string];
  subclasses: [string, string, string, string, string, string, string, string, string];
  spells: [string, string, string, string, string, string, string, string, string];
}

const SCHOOL_SEEDS: ElementSchoolSeed[] = [
  {
    id: 'aether', name: 'Aether', tradition: 'Leyline and celestial current',
    details: 'Aether is the living current between stars, stone, and breath. Practitioners borrow from the ley without claiming ownership of it.',
    classes: ['Aether Channeler', 'Leyline Warden', 'Star Scribe'],
    subclasses: ['First Conduit', 'Leyline Keeper', 'Aether Mender', 'Binding Current', 'Far Sight', 'Star Path', 'Formula Keeper', 'Resonant Duelist', 'Deep Bastion'],
    spells: ['Aether Lance', 'Leyline Mantle', 'Aether Spring', 'Conduit Snare', 'Far-Sight Prism', 'Starpath Step', 'Resonant Formula', 'Skycurrent Bolt', 'Leyline Bastion'],
  },
  {
    id: 'nether-ether', name: 'Nether Ether', tradition: 'Underworld and shadow current',
    details: 'Nether Ether studies the deep places beneath the world. Its rites favor boundaries, honest bargains, and safe passage through darkness.',
    classes: ['Nether Cantor', 'Dusk Warden', 'Veil Scholar'],
    subclasses: ['Coal Below', 'Grave Lantern', 'Quiet Return', 'Hollow Bind', 'Under-Eye', 'Duskwalk', 'Pact Reader', 'Blackglass Edge', 'Deep Gate'],
    spells: ['Nether Ember', 'Grave Lantern Ward', 'Quiet Return', 'Hollow Bind', 'Under-Eye Reading', 'Duskwalk Passage', 'Pact of the Deep', 'Blackglass Edge', 'Deep Gate Seal'],
  },
  {
    id: 'ethereal', name: 'Ethereal', tradition: 'Spirit, dream, and memory',
    details: 'Ethereal practice listens to echoes, memory, and spirits. It cannot command the dead or turn a dream into certain prophecy.',
    classes: ['Spirit Medium', 'Veil Shepherd', 'Echo Scribe'],
    subclasses: ['Quiet Medium', 'Kind Veil', 'Memory Tender', 'Echo Binder', 'Dream Lantern', 'Threshold Walker', 'Name Keeper', 'Waking Voice', 'Ancestor Guide'],
    spells: ['Spirit Bell', 'Gentle Veil', 'Memory Thread', 'Echo Snare', 'Dream Lantern', 'Threshold Step', 'Name Remembered', 'Waking Voice', 'Ancestor Beacon'],
  },
  {
    id: 'light', name: 'Light', tradition: 'Radiance, witness, and renewal',
    details: 'Light magic reveals, shelters, and restores. Its vows forbid using healing as leverage or disguising coercion as a blessing.',
    classes: ['Dawn Cantor', 'Solar Sentinel', 'Beacon Theurge'],
    subclasses: ['First Light', 'Sunward Guard', 'Mercy Bell', 'Radiant Brand', 'Clear Witness', 'Dawn Passage', 'Truth Reader', 'Solar Lance', 'Bright Bastion'],
    spells: ['Dawn Spark', 'Sunward Mantle', 'Mercy Bell', 'Radiant Brand', 'Clear Witness', 'Dawn Passage', 'Truth in Glass', 'Solar Lance', 'Bright Bastion'],
  },
  {
    id: 'dark', name: 'Dark', tradition: 'Gloam, concealment, and quiet',
    details: 'Dark magic shapes shade and silence without binding another person’s will. Its safest work always leaves a clear way home.',
    classes: ['Gloam Binder', 'Night Warden', 'Shade Seer'],
    subclasses: ['Ashen Veil', 'Night Watch', 'Soft Mending', 'Shadow Knot', 'Moth-Sight', 'Gloamstep', 'Quiet Archive', 'Midnight Edge', 'Nightfold Wall'],
    spells: ['Ashen Veil', 'Night Watch Ward', 'Soft Mending', 'Shadow Knot', 'Moth-Sight', 'Gloamstep', 'Quiet Archive', 'Midnight Edge', 'Nightfold Wall'],
  },
  {
    id: 'earth', name: 'Earth', tradition: 'Stone, root, and deep foundation',
    details: 'Earth workings draw on soil, root, and the patience of stone. They reinforce places and people already willing to stand together.',
    classes: ['Stonecarver', 'Root Bastion', 'Deep Listener'],
    subclasses: ['Flint Hand', 'Root Shield', 'Green Mender', 'Quarry Snare', 'Fault Reader', 'Burrow Path', 'Old Strata', 'Basalt Fist', 'Mountain Hold'],
    spells: ['Flint Dart', 'Root Shield', 'Green Mender', 'Quarry Snare', 'Fault Reader', 'Burrow Path', 'Old Strata Memory', 'Basalt Fist', 'Mountain Hold'],
  },
  {
    id: 'fire', name: 'Fire', tradition: 'Hearth, forge, and measured flame',
    details: 'Fire magic governs heat, hearth, and forge. A practitioner learns restraint first: flame may protect a home or consume it.',
    classes: ['Emberweaver', 'Ash Sentinel', 'Cinder Duelist'],
    subclasses: ['Cinder Needle', 'Hearth Guard', 'Warmhand', 'Ashen Snare', 'Smoke Signal', 'Forge Step', 'Ember Lore', 'Suncoal Strike', 'Kiln Wall'],
    spells: ['Cinder Needle', 'Hearth Guard', 'Warmhand', 'Ashen Snare', 'Smoke Signal', 'Forge Step', 'Ember Lore', 'Suncoal Strike', 'Kiln Wall'],
  },
  {
    id: 'water', name: 'Water', tradition: 'Tide, rain, and still pool',
    details: 'Water magic follows flow, rain, and reflection. It favors adaptation and recovery while respecting the limits of body and watershed.',
    classes: ['Tide Cantor', 'Mist Warden', 'Well Seer'],
    subclasses: ['Rill Singer', 'Tide Shield', 'Rain Tender', 'Undertow Knot', 'Pool Mirror', 'Current Road', 'Deepwell Memory', 'Wave Palm', 'Stillwater Dome'],
    spells: ['Rill Needle', 'Tide Shield', 'Rain Tender', 'Undertow Knot', 'Pool Mirror', 'Current Road', 'Deepwell Memory', 'Wave Palm', 'Stillwater Dome'],
  },
  {
    id: 'wind', name: 'Wind', tradition: 'Gale, breath, and open sky',
    details: 'Wind magic guides breath and moving air. It carries warnings and softens falls but never promises a safe road through a storm.',
    classes: ['Gale Dancer', 'Sky Sentinel', 'Storm Scribe'],
    subclasses: ['Whistling Edge', 'Updraft Guard', 'Breath Mender', 'Crosswind Bind', 'Far Call', 'Highroad Step', 'Storm Almanac', 'Thunderclap', 'Cloudbreak Ward'],
    spells: ['Whistling Edge', 'Updraft Guard', 'Breath Mender', 'Crosswind Bind', 'Far Call', 'Highroad Step', 'Storm Almanac', 'Thunderclap', 'Cloudbreak Ward'],
  },
  {
    id: 'null', name: 'Null', tradition: 'Silence, stillness, and spellbreaking',
    details: 'Null magic creates brief spaces where hostile workings cannot easily take hold. Silence is shelter, never a tool for erasing a voice.',
    classes: ['Stillpoint Adept', 'Silence Warden', 'Void Scribe'],
    subclasses: ['Empty Palm', 'Quiet Circle', 'Stillwater Mend', 'Unbinding Knot', 'Blank Mirror', 'Silent Step', 'The Unwritten', 'Hollow Pulse', 'Nullwall'],
    spells: ['Empty Palm', 'Quiet Circle', 'Stillwater Mend', 'Unbinding Knot', 'Blank Mirror', 'Silent Step', 'The Unwritten', 'Hollow Pulse', 'Nullwall'],
  },
];

const EFFECTS: MagicEffectType[] = ['strike', 'ward', 'mend', 'control', 'reveal', 'journey', 'insight', 'strike', 'ward'];
const EFFECT_LABELS: Record<MagicEffectType, string> = {
  strike: 'Arcane Strike', ward: 'Protective Ward', mend: 'Restoration', control: 'Binding',
  reveal: 'Divination', journey: 'Wayfinding', insight: 'Lore Working',
};
const TARGETS: Record<MagicEffectType, string> = {
  strike: 'One practice target', ward: 'Self and nearby allies', mend: 'Self or one willing ally',
  control: 'One practice target', reveal: 'A nearby place or sign', journey: 'Self or a known path',
  insight: 'A willing subject or arcane question',
};
const LIMITS: Record<MagicEffectType, string> = {
  strike: 'It focuses force into a precise, controlled blow.',
  ward: 'It lays a temporary guard that steadies a willing defender.',
  mend: 'It supports recovery without replacing ordinary care.',
  control: 'It briefly restrains a practice target without overriding a living will.',
  reveal: 'It clarifies a hidden mark, nearby movement, or uncertain detail.',
  journey: 'It makes a known route easier to follow and return from.',
  insight: 'It sharpens attention and records one point of arcane insight.',
};
const RANKS = ['Novice', 'Adept', 'Master'];
const CLASS_TYPES = ['Channeling discipline', 'Guarding discipline', 'Lore discipline'];
const CLASS_FOCUSES = ['Focused workings', 'Protective workings', 'Study and support'];

function createElementalSchool(seed: ElementSchoolSeed, schoolIndex: number): MagicSchool {
  const classes = seed.classes.map((className, classIndex) => ({
    id: `class-${seed.id}-${classIndex + 1}`,
    name: className,
    rank: classIndex === 2 ? 'Lorekeeper' : 'Adept',
    title: `${className} of ${seed.name}`,
    type: CLASS_TYPES[classIndex],
    subtype: `${seed.name} ${CLASS_FOCUSES[classIndex]}`,
    details: `${className} studies ${seed.name.toLowerCase()} through ${CLASS_FOCUSES[classIndex].toLowerCase()}, balancing practice with restraint.`,
    subclasses: Array.from({ length: 3 }, (_, localIndex) => {
      const spellIndex = classIndex * 3 + localIndex;
      const effect = EFFECTS[spellIndex];
      const subclassName = seed.subclasses[spellIndex];
      const rank = RANKS[localIndex];
      const power = 14 + schoolIndex * 3 + spellIndex * 4;
      const manaCost = 12 + schoolIndex * 2 + spellIndex * 3;
      const crownCost = 500 + schoolIndex * 50 + spellIndex * 225;
      const range = ['strike', 'control', 'reveal'].includes(effect) ? 1 + ((schoolIndex + spellIndex) % 4) : 0;
      const durationTurns = 1 + ((schoolIndex * 2 + spellIndex) % 5);
      const subStats = {
        damage: effect === 'strike' ? power : 0,
        ward: effect === 'ward' ? power : 0,
        healing: effect === 'mend' ? power : 0,
        control: effect === 'control' ? power : 0,
        utility: ['reveal', 'journey', 'insight'].includes(effect) ? power : 0,
      };

      return {
        id: `sub-${seed.id}-${String(spellIndex + 1).padStart(2, '0')}`,
        name: subclassName,
        rank: `${rank} Path`,
        title: `${subclassName} Specialization`,
        type: EFFECT_LABELS[effect],
        subtype: `${seed.name} ${effect} path`,
        details: `${subclassName} focuses the ${seed.name} school on ${effect}. The path teaches one signature working and its limits.`,
        spells: [{
          id: `spell-${seed.id}-${String(spellIndex + 1).padStart(2, '0')}`,
          name: seed.spells[spellIndex],
          rank,
          title: `${subclassName}: ${rank} Measure`,
          details: `${seed.spells[spellIndex]} is a ${seed.name.toLowerCase()} ${subclassName.toLowerCase()} working. ${LIMITS[effect]} ${seed.details}`,
          type: `${seed.name} ${EFFECT_LABELS[effect]}`,
          subtype: subclassName,
          target: TARGETS[effect],
          effect,
          manaCost,
          power,
          crownCost,
          stats: { potency: power, range, durationTurns, precision: 60 + ((schoolIndex * 7 + spellIndex * 3) % 41) },
          subStats,
        }],
      };
    }),
  }));

  return {
    id: `school-${seed.id}`,
    name: seed.name,
    rank: 'First Circle',
    title: `${seed.name}: ${seed.tradition}`,
    type: 'Elemental and arcane school',
    subtype: seed.tradition,
    details: seed.details,
    classes,
  };
}

export const ELEMENTAL_MAGIC_SCHOOLS: MagicSchool[] = SCHOOL_SEEDS.map(createElementalSchool);
export const ELEMENTAL_MAGIC_SPELL_COUNT = ELEMENTAL_MAGIC_SCHOOLS.reduce(
  (total, school) => total + school.classes.reduce(
    (classTotal, magicClass) => classTotal + magicClass.subclasses.reduce((subclassTotal, subclass) => subclassTotal + subclass.spells.length, 0),
    0,
  ),
  0,
);
