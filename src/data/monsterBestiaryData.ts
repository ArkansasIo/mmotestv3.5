export type MonsterThreatRank = 'Common' | 'Uncommon' | 'Veteran' | 'Elite' | 'Mythic' | 'Apex';

export interface MonsterAbility {
  name: string;
  description: string;
}

export interface BestiaryMonster {
  id: string;
  name: string;
  title: string;
  className: string;
  classTitle: string;
  subclassName: string;
  typeName: string;
  subtypeName: string;
  rank: MonsterThreatRank;
  tier: number;
  level: number;
  habitat: string;
  weakness: string;
  resistance: string;
  ability: MonsterAbility;
  lore: string;
  stats: { health: number; attack: number; ward: number; speed: number };
  bounty: { iron: number; moonstone: number; aether: number };
}

type MonsterSeed = readonly [name: string, title: string, subclass: string, subtype: string, weakness: string];

interface MonsterClassSeed {
  id: string;
  className: string;
  classTitle: string;
  typeName: string;
  resistance: string;
  habitats: readonly [string, string, string];
  lore: string;
  abilities: readonly MonsterAbility[];
  monsters: readonly MonsterSeed[];
}

const MONSTER_CLASSES: readonly MonsterClassSeed[] = [
  {
    id: 'ash-drakes', className: 'Ash Drakes', classTitle: 'Cinderscale Brood', typeName: 'Lesser Dragon',
    resistance: 'Heat and smoke', habitats: ['The Cinderfold Ravines', 'Old kiln roads', 'The Emberfall scar'],
    lore: 'Their scales hold the last warmth of the Emberfall. A drake marks its territory by scorching a ring into stone, then watches the road from the highest ledge.',
    abilities: [
      { name: 'Cinder Cone', description: 'Spits a fan of hot ash that blinds and scorches exposed foes.' },
      { name: 'Ravine Pounce', description: 'Drops from a ledge with enough force to stagger a shield line.' },
      { name: 'Searing Wake', description: 'Leaves a ribbon of embers across the ground as it retreats.' },
      { name: 'Scale-Furnace', description: 'Warms its plates until incoming blows glance away in sparks.' },
    ],
    monsters: [
      ['Ashling Skirr', 'The First Coal', 'Cinder Hatchling', 'Ravine Ashling', 'Cold iron'],
      ['Sootwing Prowler', 'The Smoke-Cloaked', 'Sootwing Scout', 'Smoke Drake', 'Gale winds'],
      ['Coalcrest Snapjaw', 'Keeper of the Black Ledge', 'Coalcrest Hunter', 'Basalt Snapjaw', 'Deep water'],
      ['Emberback Lurker', 'The Kiln-Road Ambusher', 'Emberback Stalker', 'Kiln Drake', 'Frost runes'],
      ['Cindermaw Ravager', 'The Furnace Throat', 'Cindermaw Ravager', 'Furnace Drake', 'Moonstone dust'],
      ['Redglass Talon', 'The Shardstorm', 'Redglass Talon', 'Glasswing Drake', 'Soft earth'],
      ['Scoria Crownclaw', 'The Broken Keep-Breaker', 'Scoria Crownclaw', 'Crownscale Drake', 'Rain wards'],
      ['Pyre-Eye Varkesh', 'The Watcher in Flame', 'Pyre-Eye Elder', 'Elder Ash Drake', 'Stillwater'],
      ['Morrowflame Tyrant', 'The Last Furnace King', 'Morrowflame Tyrant', 'Ancient Cinder Drake', 'Runed frost'],
      ['Emberfall Caldera', 'The Mountain That Breathes', 'Caldera Sovereign', 'Apex Ember Drake', 'The First Rain'],
    ],
  },
  {
    id: 'rootwights', className: 'Rootwights', classTitle: 'The Thornbound Dead', typeName: 'Verdant Revenant',
    resistance: 'Thorn, bark, and poison', habitats: ['The Briarwake Groves', 'Flooded orchard ruins', 'Broken waystone circles'],
    lore: 'Rootwights wake where a grove has been cut carelessly or a burial mound opened. They defend the old roots, not a crown, and can be turned aside by restoring what was taken.',
    abilities: [
      { name: 'Grasping Roots', description: 'Calls roots through the soil to bind a target in place.' },
      { name: 'Briar Mantle', description: 'Raises a thorn veil that punishes close attackers.' },
      { name: 'Hollow-Bark Cry', description: 'A wooden moan that unsettles nearby beasts and scouts.' },
      { name: 'Green Return', description: 'Draws strength from living ground unless its roots are severed.' },
    ],
    monsters: [
      ['Mosswake Knocker', 'The Orchard Door-Keeper', 'Mosswake Knocker', 'Moss-Crowned Wight', 'Open flame'],
      ['Briarling Griever', 'The Hedge That Remembers', 'Briarling Griever', 'Hedge Revenant', 'Salted ash'],
      ['Thorn-Mother Vey', 'The Unharvested Widow', 'Thorn-Mother', 'Briar Matron', 'Clean iron'],
      ['Hollowroot Keeper', 'The Orchard Below', 'Hollowroot Keeper', 'Rootbound Guardian', 'Sunfire'],
      ['Wickerhand Stag', 'The Antlered Wake', 'Wickerhand Stag', 'Coppice Stag-Wight', 'Stone dust'],
      ['Gallowsbloom Shade', 'The Flower at the Gallows', 'Gallowsbloom Shade', 'Bloom Revenant', 'Running water'],
      ['Elder Rotsong', 'The Voice Beneath the Leaves', 'Elder Rotsong', 'Elderwood Wight', 'Winter salt'],
      ['Blackbriar Regent', 'The Hedge-Crowned Lord', 'Blackbriar Regent', 'Briar Sovereign', 'Dawn bells'],
      ['Griefroot Colossus', 'The Grove That Walks', 'Griefroot Colossus', 'Walking Grove', 'Axe of rowan'],
      ['The Green Sepulcher', 'The Heart Beneath Briarwake', 'Green Sepulcher', 'Apex Rootwight', 'A living offering'],
    ],
  },
  {
    id: 'stonewights', className: 'Stonewights', classTitle: 'Keepers of the Deep Delves', typeName: 'Earthen Guardian',
    resistance: 'Blunt force and falling stone', habitats: ['Abandoned slate mines', 'The Old Kingsroad tunnels', 'Collapsed hill-forts'],
    lore: 'Stonewights gather in halls where miners broke old boundary marks. Their slow footfalls travel through the mountain long before their lantern-like eyes come into view.',
    abilities: [
      { name: 'Faultline Stomp', description: 'Shakes loose stone beneath a clustered group.' },
      { name: 'Granite Guard', description: 'Locks its plates together to withstand a heavy assault.' },
      { name: 'Delver’s Echo', description: 'Repeats a sound through the tunnels to draw trespassers off course.' },
      { name: 'Shard Volley', description: 'Hurls sharp fragments from its own outer shell.' },
    ],
    monsters: [
      ['Slateknuckle', 'The Quiet Pick-Stopper', 'Slateknuckle', 'Slate Mine Wight', 'Hammer-song'],
      ['Chalkjaw Burrower', 'The White Tunnel Maw', 'Chalkjaw Burrower', 'Chalk Burrower', 'Soft clay'],
      ['Ironvein Sentinel', 'The Unpaid Watch', 'Ironvein Sentinel', 'Iron-Seam Guardian', 'Copper chime'],
      ['Cairnback Ram', 'The Barrow Breaker', 'Cairnback Ram', 'Cairn Ram-Wight', 'Loose gravel'],
      ['Deepdelve Bellower', 'The Warning Below', 'Deepdelve Bellower', 'Echoing Delver', 'Moss water'],
      ['Obsidian Knell', 'The Black-Bell Watcher', 'Obsidian Knell', 'Glassstone Wight', 'Silver script'],
      ['Gravemark Colossus', 'The Tomb That Stands', 'Gravemark Colossus', 'Barrow Colossus', 'Dawnfire'],
      ['Oldwall Breaker', 'The Fallen Gate Reborn', 'Oldwall Breaker', 'Keep-Breaker Wight', 'A true name'],
      ['Mountain-Sleeper Orm', 'The Ridge Beneath the Ridge', 'Mountain-Sleeper', 'Elder Mountain Wight', 'A clear stream'],
      ['The Last Foundation', 'The Deep Delve’s Final Door', 'Last Foundation', 'Apex Stonewight', 'The miners’ oath'],
    ],
  },
  {
    id: 'gloam-moths', className: 'Gloam-Moths', classTitle: 'Lanternless Wayfarers', typeName: 'Ley-haunting Insect',
    resistance: 'Shadow and sleep hexes', habitats: ['Dimmed waystone paths', 'Duskfen lantern bogs', 'Ruined toll houses'],
    lore: 'Gloam-moths drift toward failing waystones and drink the light from neglected lanterns. Their wing-dust carries fragments of voices heard along the old roads.',
    abilities: [
      { name: 'Lantern Veil', description: 'Dims nearby lights and blurs the moth among drifting wings.' },
      { name: 'Gloam Dust', description: 'Sheds a drowsing powder that slows an unmasked pursuer.' },
      { name: 'Waystone Pulse', description: 'Releases a disorienting shimmer learned from broken stones.' },
      { name: 'Night Swarm', description: 'Calls nearby moths into a circling cloud.' },
    ],
    monsters: [
      ['Dusklace Flutter', 'The First Lost Lantern', 'Dusklace Flutter', 'Waystone Moth', 'Bright brass'],
      ['Murkveil Skimmer', 'The Wick-Eater', 'Murkveil Skimmer', 'Bog Gloamer', 'Daylight'],
      ['Silverdust Lurer', 'The False Road Sign', 'Silverdust Lurer', 'Glimmer Moth', 'Scented oil'],
      ['Lantern-Thief Nix', 'The Unlit Guide', 'Lantern-Thief', 'Pathfinder Moth', 'A steady bell'],
      ['Gloamwing Herald', 'The Duskfen Caller', 'Gloamwing Herald', 'Herald Moth', 'Warm iron'],
      ['Moonblind Veiler', 'The Veil Over the Moon', 'Moonblind Veiler', 'Veilwing Moth', 'Clear glass'],
      ['Shiverdust Matriarch', 'The Brood Beneath the Bridge', 'Shiverdust Matriarch', 'Brood Matriarch', 'Fresh rosemary'],
      ['Waylost Oracle', 'The Voice in the Wingbeat', 'Waylost Oracle', 'Oracle Moth', 'A true map'],
      ['Pale Lantern Queen', 'The Last Light in Duskfen', 'Pale Lantern Queen', 'Elder Gloam-Moth', 'Sun-warmed stone'],
      ['The Unlit Constellation', 'The Swarm Between Waystones', 'Unlit Constellation', 'Apex Gloam Swarm', 'A restored waystone'],
    ],
  },
  {
    id: 'fen-horrors', className: 'Fen Horrors', classTitle: 'Duskfen’s Unquiet Brood', typeName: 'Bog-born Aberration',
    resistance: 'Rot, mire, and drowning', habitats: ['The Duskfen reed maze', 'Peat-cutters’ ponds', 'Flooded pilgrim roads'],
    lore: 'These wetland hunters thrive where old channels have been blocked. Their tracks vanish in shallow water, but a sudden silence among the frogs is warning enough.',
    abilities: [
      { name: 'Mire Snare', description: 'Turns soft ground into a clinging trap beneath the target.' },
      { name: 'Bog-Breath', description: 'Exhales a sour mist that clouds sight and judgment.' },
      { name: 'Reed Ambush', description: 'Surges from cover before a sentry can raise the alarm.' },
      { name: 'Silt Mend', description: 'Plasters wounds with cold mud while submerged.' },
    ],
    monsters: [
      ['Peatjaw Grinner', 'The Sinker at Three Reeds', 'Peatjaw Grinner', 'Peat Bog-Crawler', 'Dry salt'],
      ['Reedveil Loper', 'The Step Behind You', 'Reedveil Loper', 'Reed Stalker', 'High ground'],
      ['Mirebell Toad', 'The Bell Beneath the Pool', 'Mirebell Toad', 'Mire-Bell Amphibian', 'Clear chimes'],
      ['Siltback Devourer', 'The Mud That Bites', 'Siltback Devourer', 'Silt-Shell Horror', 'Hot ash'],
      ['Drownlight Eel', 'The Lantern Underwater', 'Drownlight Eel', 'Fen Eel', 'Dry linen'],
      ['Moss-Crowned Maw', 'The Mouth in the Causeway', 'Moss-Crowned Maw', 'Causeway Ambusher', 'Running water'],
      ['Duskfen Widow', 'The Weaver of Still Pools', 'Duskfen Widow', 'Fen Weaver', 'Burnt cedar'],
      ['The Hollow Heron', 'The Long-Legged Omen', 'Hollow Heron', 'Bog Heron-Horror', 'Sunlight'],
      ['Blackwater Grandmother', 'The Fen’s Oldest Hunger', 'Blackwater Grandmother', 'Elder Mire-Beast', 'A clean spring'],
      ['The Sunk Parish', 'The Whole Village Below', 'Sunk Parish', 'Apex Fen Horror', 'A raised floodgate'],
    ],
  },
  {
    id: 'frost-giants', className: 'Frostmarked Giants', classTitle: 'The Rimebound March', typeName: 'Frost-touched Colossus',
    resistance: 'Cold, hail, and winter exposure', habitats: ['Starfall Crags high passes', 'Northglass glaciers', 'The snowed-in watch roads'],
    lore: 'Frostmarked giants follow the oldest mountain paths and rarely descend without cause. A cairn of blue ice outside a pass usually marks a boundary, not a challenge.',
    abilities: [
      { name: 'Rimehammer', description: 'Brings down a frozen strike that numbs armor and shield arms.' },
      { name: 'Whiteout Roar', description: 'Whips loose snow into a blinding curtain.' },
      { name: 'Glacier Step', description: 'Crosses broken ground with a stride that cracks the ice.' },
      { name: 'Winter Heart', description: 'Hardens into frost when pressed close to defeat.' },
    ],
    monsters: [
      ['Rimefoot Pilgrim', 'The Pass-Walker', 'Rimefoot Pilgrim', 'Snowline Giantkin', 'Hearth coal'],
      ['Bluehorn Hauler', 'The Pack-Beast’s Bane', 'Bluehorn Hauler', 'Glacier Hornback', 'Warm spring water'],
      ['Hailmantle Brute', 'The Storm at the Gate', 'Hailmantle Brute', 'Hail Giant', 'Sunsteel'],
      ['Icevein Oathbreaker', 'The Broken Pass Vow', 'Icevein Oathbreaker', 'Rimebound Sentinel', 'Ember oil'],
      ['Northglass Crusher', 'The Shattered Cairn', 'Northglass Crusher', 'Glacier Colossus', 'Deep green wood'],
      ['White Gale Caller', 'The Voice in the Blizzard', 'White Gale Caller', 'Snowstorm Shaman', 'A sheltered flame'],
      ['Frostcrown Matron', 'The Mother of Blue Ice', 'Frostcrown Matron', 'Elder Ice Giant', 'Thawed river stone'],
      ['Starfall Titan', 'The Crag That Walks', 'Starfall Titan', 'Crag Titan', 'A kept oath'],
      ['Winter-King Hroth', 'The Long Night’s Keeper', 'Winter-King', 'Rimebound Monarch', 'Dawn bells'],
      ['The Sleeping Range', 'The Mountain Beneath the Snow', 'Sleeping Range', 'Apex Frost Colossus', 'The first spring thaw'],
    ],
  },
  {
    id: 'hollow-hounds', className: 'Hollow Hounds', classTitle: 'The Moonless Pack', typeName: 'Cursed Pack-Beast',
    resistance: 'Fear, darkness, and pursuit', habitats: ['Gloamwood borders', 'Abandoned sheepfolds', 'The moonless Marches'],
    lore: 'Hollow hounds hunt by listening to a traveler’s pace. They avoid a fire tended by several people, and old drovers leave a shared meal at the edge of their range.',
    abilities: [
      { name: 'Pack’s Measure', description: 'Circles prey and tests the weakest point in its guard.' },
      { name: 'Hollow Bay', description: 'Sends a low call through the trees to coordinate the pack.' },
      { name: 'Shadow Leap', description: 'Crosses a firelit gap in a single silent bound.' },
      { name: 'Red-Trail Scent', description: 'Tracks wounded prey across stone and rain.' },
    ],
    monsters: [
      ['Lanternsnuff Pup', 'The First Footstep', 'Lanternsnuff Pup', 'Gloamwood Hound', 'A shared hearth'],
      ['Briarfang Runner', 'The Thornpath Chaser', 'Briarfang Runner', 'Marchland Wolf', 'Sweet herbs'],
      ['Graveside Loper', 'The Keeper of Empty Pens', 'Graveside Loper', 'Barrow Hound', 'Burial bells'],
      ['Redtrail Alpha', 'The Pack’s First Answer', 'Redtrail Alpha', 'Blood-Scent Wolf', 'Cold river water'],
      ['Moonless Harrier', 'The Long Pursuit', 'Moonless Harrier', 'Night Hound', 'Dawn light'],
      ['Hollowjaw Stalker', 'The Bite Without a Shadow', 'Hollowjaw Stalker', 'Shade Hound', 'Cedar smoke'],
      ['Gloamfang Marshal', 'The Pack-Captain', 'Gloamfang Marshal', 'Pack Marshal', 'A true name'],
      ['Ashen Howl-Mother', 'The Call Across the March', 'Ashen Howl-Mother', 'Elder Pack-Mother', 'Silver bells'],
      ['Black Moon Pursuer', 'The Last Hound on the Road', 'Black Moon Pursuer', 'Elder Hollow Hound', 'A guarded flock'],
      ['The Thirteenth Footfall', 'The Pack That Has No Tracks', 'Thirteenth Footfall', 'Apex Hollow Hound', 'A shared meal'],
    ],
  },
  {
    id: 'emberkin', className: 'Emberkin', classTitle: 'Small Fires, Old Names', typeName: 'Wildfire Spirit',
    resistance: 'Flame, smoke, and cinders', habitats: ['Abandoned hearth circles', 'Lightning-struck orchards', 'The Emberfall scar'],
    lore: 'Emberkin are small fires with long memories. Most gather around a cold hearth or a broken promise; a careful offering can persuade them to guard a camp instead of burning it.',
    abilities: [
      { name: 'Dancing Spark', description: 'Leaps between dry objects before a flame can be contained.' },
      { name: 'Hearthflash', description: 'Flares suddenly to drive intruders from its chosen shelter.' },
      { name: 'Coalheart Pulse', description: 'Sends a wave of warmth through nearby kindling and embers.' },
      { name: 'Wildfire Thread', description: 'Runs fire along roots and old fence lines.' },
    ],
    monsters: [
      ['Tinderling Pip', 'The Unasked Guest', 'Tinderling Pip', 'Hearth Spark', 'Wet clay'],
      ['Sootcap Dancer', 'The Chimney’s Little Shadow', 'Sootcap Dancer', 'Chimney Emberkin', 'Fresh snow'],
      ['Foxfire Knave', 'The Blue Flame Trickster', 'Foxfire Knave', 'Foxfire Spirit', 'Iron snuffer'],
      ['Kindlejack Bramble', 'The Hedgefire Jester', 'Kindlejack Bramble', 'Brushfire Sprite', 'Green wood'],
      ['Kilnheart Page', 'The Apprentice Flame', 'Kilnheart Page', 'Kiln Wisp', 'River stones'],
      ['Redcap Brand', 'The Burning Boundary Mark', 'Redcap Brand', 'Brandfire Spirit', 'A covered well'],
      ['Candlewick Regent', 'The Hall of a Thousand Lights', 'Candlewick Regent', 'Candle Regent', 'Cold iron'],
      ['Wildroot Pyreling', 'The Orchard’s Bright Anger', 'Wildroot Pyreling', 'Orchard Flamekin', 'A living branch'],
      ['Ashen Hearth-King', 'The Last Guest of Winter', 'Ashen Hearth-King', 'Elder Hearthfire', 'A true welcome'],
      ['The Unending Coal', 'The Ember That Will Not Rest', 'Unending Coal', 'Apex Emberkin', 'A mended hearth'],
    ],
  },
  {
    id: 'deepwater-leviathans', className: 'Deepwater Leviathans', classTitle: 'The Old Tides Below', typeName: 'Abyssal Serpent',
    resistance: 'Water pressure and storm surge', habitats: ['The Greywake Coast', 'Flooded quarry lakes', 'The drowned pilgrim road'],
    lore: 'Leviathans rise where a watercourse has been dammed or a spring diverted. Their wake can overturn a boat, but many retreat when the old channels are reopened.',
    abilities: [
      { name: 'Undertow Coil', description: 'Pulls a target toward deep water with a sudden rolling current.' },
      { name: 'Breakwater Surge', description: 'Throws a wall of water across the shoreline.' },
      { name: 'Abyssal Glare', description: 'Fixes a cold light on prey and stills it with fear.' },
      { name: 'Tide-Shed Scales', description: 'Slips free of snares beneath a cloud of bright scales.' },
    ],
    monsters: [
      ['Foamcrest Snapper', 'The Net-Cutter', 'Foamcrest Snapper', 'Coastal Tide-Serpent', 'Dry shore stone'],
      ['Reedwake Eel', 'The Ripple in the Reeds', 'Reedwake Eel', 'Reedwater Serpent', 'Warm sand'],
      ['Greywake Coil', 'The Turning Current', 'Greywake Coil', 'Greywake Leviathan', 'A reopened stream'],
      ['Drowned Bell-Back', 'The Sound Beneath the Lake', 'Drowned Bell-Back', 'Quarry Lake Beast', 'Air-bellows'],
      ['Moonpool Devourer', 'The Pale Shape Below', 'Moonpool Devourer', 'Moonpool Serpent', 'Dry lightning'],
      ['Saltcrown Raker', 'The Shoreline’s Old Judge', 'Saltcrown Raker', 'Saltwater Leviathan', 'Fresh water'],
      ['Stormglass Maw', 'The Wave Before the Storm', 'Stormglass Maw', 'Storm-Coast Serpent', 'Still air'],
      ['Deepwake Grandmother', 'The Keeper of Lost Boats', 'Deepwake Grandmother', 'Elder Deepwater Coil', 'A clear harbor'],
      ['Abyssal Crown-Taker', 'The King Below the Breakers', 'Abyssal Crown-Taker', 'Abyssal Leviathan', 'A restored tidegate'],
      ['The Drowned Horizon', 'The Sea That Rises to Meet You', 'Drowned Horizon', 'Apex Deepwater Leviathan', 'The living coast'],
    ],
  },
];

const THREAT_RANKS: readonly MonsterThreatRank[] = ['Common', 'Common', 'Uncommon', 'Uncommon', 'Veteran', 'Veteran', 'Elite', 'Elite', 'Mythic', 'Apex'];

export const MONSTER_BESTIARY: BestiaryMonster[] = MONSTER_CLASSES.flatMap((monsterClass, classIndex) =>
  monsterClass.monsters.map(([name, title, subclassName, subtypeName, weakness], index) => {
    const tier = index + 1;
    const ability = monsterClass.abilities[(index + classIndex) % monsterClass.abilities.length];

    return {
      id: `${monsterClass.id}-${index + 1}`,
      name,
      title,
      className: monsterClass.className,
      classTitle: monsterClass.classTitle,
      subclassName,
      typeName: monsterClass.typeName,
      subtypeName,
      rank: THREAT_RANKS[index],
      tier,
      level: 4 + classIndex * 2 + tier * 5,
      habitat: monsterClass.habitats[index % monsterClass.habitats.length],
      weakness,
      resistance: monsterClass.resistance,
      ability,
      lore: `${monsterClass.lore} ${name} is known locally as ${title.toLowerCase()}.`,
      stats: {
        health: 420 + tier * 1380 + classIndex * 190,
        attack: 38 + tier * 76 + classIndex * 12,
        ward: 22 + tier * 61 + classIndex * 9,
        speed: Math.max(18, 96 - tier * 5 + (8 - classIndex) * 3),
      },
      bounty: {
        iron: 180 + tier * 260,
        moonstone: 90 + tier * 145,
        aether: 45 + tier * 80,
      },
    };
  }),
);

export const MONSTER_CLASS_NAMES = MONSTER_CLASSES.map(({ className }) => className);
export const MONSTER_THREAT_RANKS = [...new Set(THREAT_RANKS)];