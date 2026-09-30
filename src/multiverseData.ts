export interface MultiverseUniverse {
  id: number;
  name: string;
  tagline: string;
  dimensionCode: string;
  dimensionalFrequency: string;
  cosmicModifier: {
    label: string;
    description: string;
    bonusType: 'naquadah' | 'metal' | 'crystal' | 'deuterium' | 'glory' | 'shield' | 'attack' | 'speed';
    bonusPct: number;
  };
  totalGalaxies: number; // Exactly 90
  dominantFaction: string;
  factionColor: string;
  travelDeuteriumCost: number;
  travelTurnsCost: number;
  atmosphereTheme: string;
  lore: string;
}

export interface UniverseGalaxy {
  galaxyNumber: number; // 1 to 90
  name: string;
  systemCount: number; // 999 systems
  galaxyType: 'Highland Vale' | 'Walled Basin' | 'Crownroad March' | 'Isle Chain' | 'Broken March' | 'Hidden Glen';
  stellarDensity: string;
  primaryResourceAbundance: 'Crowns' | 'Iron' | 'Moonstone' | 'Cryo Aether' | 'Arcane Dust';
  hyperspaceSafetyRating: string;
  stargateSubnetwork: string;
}

// Deterministic PRNG
function getMultiverseHash(seed: number, offset: number = 0): number {
  let h = (seed + offset * 0x9e3779b9) ^ (seed >>> 16);
  h = Math.imul(h, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

const UNIVERSE_TITLES: { name: string; tagline: string; modifier: MultiverseUniverse['cosmicModifier']; faction: string; color: string; lore: string }[] = [
  {
    name: 'Realm 01: Elderglen, Heart of the Crownlands',
    tagline: "The first crownland, where five peoples meet at the old road.",
    modifier: { label: "+15% Waystone March & +10% Renown", description: "Ancient waystones link the crownlands and hasten every safe journey.", bonusType: 'glory', bonusPct: 15 },
    faction: "Elderglen Crown Guard",
    color: '#10b981',
    lore: "Queen Elowen keeps the oldest oath in Elderglen. Its green valleys, river keeps, and guild roads welcome every free folk willing to defend the realm.",
  },
  {
    name: 'Realm 02: The Mirror Marches',
    tagline: "A looking-glass land where moonlight answers every spell.",
    modifier: { label: "+40% Aether Spring Harvest", description: "Silver mirrors in the high keeps draw rare aether from moonlit wells.", bonusType: 'deuterium', bonusPct: 40 },
    faction: "Mirror March Wardens",
    color: '#06b6d4',
    lore: "The Mirror Marches are a maze of still lakes, pale towers, and roads that seem to turn with the stars. Mages read the reflected sky to find hidden paths.",
  },
  {
    name: 'Realm 03: Veil of the Moon-Seers',
    tagline: "A veiled realm of seers, runes, and many possible futures.",
    modifier: { label: "+30% Lore Study & +20% Ward Strength", description: "Moon-seers preserve forgotten runes and teach warding arts to the realm.", bonusType: 'shield', bonusPct: 20 },
    faction: "Order of the Moon-Seers",
    color: '#8b5cf6',
    lore: "Within the silver veil, time moves like a stream through a forest. Seers glimpse branching fates in pools beneath the Moonstone Labyrinth.",
  },
  {
    name: 'Realm 04: Silverwood Court',
    tagline: "A silverwood domain guarded by ancient bows and living trees.",
    modifier: { label: "+35% Moonstone & Sylvan Craft", description: "The deep groves yield moonstone and rare woods for masterwork craft.", bonusType: 'crystal', bonusPct: 35 },
    faction: "Silverwood Court",
    color: '#38bdf8',
    lore: "The elder trees remember every oath. Sylvan rangers guard sacred springs, and their longbows are fletched with leaves that never wither.",
  },
  {
    name: 'Realm 05: Sunspire Sanctum',
    tagline: "A sacred highland lit by dawnfire and the vows of paladins.",
    modifier: { label: "+25% Champion Might & Renown", description: "Sun-priests bless the banners and rally champions before each quest.", bonusType: 'attack', bonusPct: 25 },
    faction: "Sunspire Templars",
    color: '#ec4899',
    lore: "At Sunspire Sanctum, golden bells ring at first light. Pilgrims climb the stair of embers to take vows in the presence of the Dawnfire.",
  },
  {
    name: 'Realm 06: Ironroot Deepdelves',
    tagline: "A deep mountain kingdom of dwarf holds and master smiths.",
    modifier: { label: "+45% Iron & Deepdelve Yield", description: "Ironroot miners and smiths bring greater wealth from every deepdelve.", bonusType: 'metal', bonusPct: 45 },
    faction: "Ironroot Clans",
    color: '#f97316',
    lore: "The Ironroot Deepdelves are carved beneath black peaks. Their forges turn iron, moonstone, and dragonbone into armor that lasts for ages.",
  },
  {
    name: 'Realm 07: The Briarheart Wilds',
    tagline: "A wild briarland where the forest itself defends its people.",
    modifier: { label: "+30% Keep Building & Repair", description: "Living groves speed the raising and mending of keeps across the marches.", bonusType: 'speed', bonusPct: 30 },
    faction: "Briarheart Keepers",
    color: '#a855f7',
    lore: "Thorn walls shift at night and briars open only for the invited. Forest spirits guide lost travelers to hidden hamlets and guard the old trees.",
  },
  {
    name: 'Realm 08: Elderstone Frontier',
    tagline: "An elder frontier strewn with rune-stones and buried keeps.",
    modifier: { label: "+35% Crown Ore & Relic Finds", description: "Rune-veins enrich the treasury and awaken forgotten relics.", bonusType: 'naquadah', bonusPct: 35 },
    faction: "Elderstone Custodians",
    color: '#eab308',
    lore: "Elderstone holds the first runes ever carved. Beneath its cairns lie lost libraries, warded tombs, and relics that still answer their makers.",
  },
  {
    name: 'Realm 09: Stormroad Expanse',
    tagline: "A stormy highroad where swift riders cross the mountain passes.",
    modifier: { label: "-25% Leyroad Travel Turns", description: "The stormroad winds carry messengers quickly between distant keeps.", bonusType: 'speed', bonusPct: 25 },
    faction: "Stormroad Free Company",
    color: '#14b8a6',
    lore: "Across the Stormroad Expanse, thunder rolls over high passes and watchfires guide the night. Mounted couriers can cross a march before dawn.",
  },
  {
    name: 'Realm 10: The High Kingdom',
    tagline: "A mighty human kingdom bound by law, harvest, and shieldwall.",
    modifier: { label: "+20% Crown Tax & Tribute", description: "Stewarded markets and well-kept roads improve the realm treasury.", bonusType: 'naquadah', bonusPct: 20 },
    faction: "High Kingdom Royal Council",
    color: '#dc2626',
    lore: "The High Kingdom brings its many baronies beneath one banner. Fair law, harvest stores, and trained shieldwalls keep the peace.",
  },
  {
    name: 'Realm 11: Dawnfire Vale',
    tagline: "A bright valley blessed by dawn, orchards, and healing springs.",
    modifier: { label: "+35% Hearthfire Mana & +25% Wards", description: "Sunlit springs strengthen the hearthfires and renew protective wards.", bonusType: 'shield', bonusPct: 25 },
    faction: "Dawnfire Wardens",
    color: '#fbbf24',
    lore: "Dawnfire Vale is warm with golden light. Its healers tend orchards and sanctuaries, while pale towers watch over the southern road.",
  },
  {
    name: 'Realm 12: The Timeworn March',
    tagline: "A timeworn march where ruins whisper of yesterday and tomorrow.",
    modifier: { label: "+25% Muster Turns per Season", description: "Hourglass shrines restore a little strength to every warband each season.", bonusType: 'speed', bonusPct: 25 },
    faction: "Keepers of the Hourglass",
    color: '#6366f1',
    lore: "Old ruins stand beside new-built keeps, and their bells sometimes ring before they are cast. The wise seek a guide before entering the timeworn barrows.",
  },
  {
    name: 'Realm 13: Emberfall Crucible',
    tagline: "An ember realm of volcanoes, forges, and red-bannered clans.",
    modifier: { label: "+40% Siege Arms & Iron Harvest", description: "Volcanic forges temper siege arms and enrich the iron harvest.", bonusType: 'metal', bonusPct: 40 },
    faction: "Emberfall Forge Clans",
    color: '#ef4444',
    lore: "Emberfall Crucible is a land of fire mountains and black glass. The forge clans prize courage, craft, and a promise kept under flame.",
  },
  {
    name: 'Realm 14: The Sapphire Coast',
    tagline: "A coastland of sapphire bays, pearl divers, and deep springs.",
    modifier: { label: "+45% Water & Aether Harvest", description: "The tide caves and deep springs supply water and aether to every keep.", bonusType: 'deuterium', bonusPct: 45 },
    faction: "Sapphire Coast Mariners",
    color: '#0284c7',
    lore: "Sapphire Coast is a chain of islands and sheltered ports. Mariners trade pearls and salt while sea-wardens watch for leviathans.",
  },
  {
    name: 'Realm 15: Gloamveil Reach',
    tagline: "A shadowed borderland where scouts and spies vanish in mist.",
    modifier: { label: "+30% Scoutcraft & Hidden Marches", description: "Mists conceal scouts and mask a warband until the hour to strike.", bonusType: 'attack', bonusPct: 30 },
    faction: "Gloamveil Shadow Court",
    color: '#475569',
    lore: "Gloamveil Reach lies beneath a canopy of dark pines. Lanterns mark the safe tracks; beyond them, old ruins stir at twilight.",
  },
  {
    name: 'Realm 16: Moonstone Labyrinth',
    tagline: "A maze of luminous caves, crystal halls, and ancient libraries.",
    modifier: { label: "+40% Spellcraft & Moonstone Yield", description: "Prismatic moonstone strengthens charms and the arms of battle-mages.", bonusType: 'crystal', bonusPct: 40 },
    faction: "Moonstone Arcanists",
    color: '#818cf8',
    lore: "The Moonstone Labyrinth winds beneath the hills. Each crystal chamber keeps a different echo, and some echoes know the names of forgotten kings.",
  },
  {
    name: 'Realm 17: The Crownwall Cities',
    tagline: "A ring of great cities joined by bridges, guilds, and royal roads.",
    modifier: { label: "+35% Market Growth & Population", description: "Guild charters and safe roads draw skilled artisans to the cities.", bonusType: 'naquadah', bonusPct: 35 },
    faction: "Crownwall Guild Council",
    color: '#0ea5e9',
    lore: "The Crownwall Cities are famous for their stone bridges, lively markets, and walled gardens. Every guild keeps a bell to summon help when the walls are threatened.",
  },
  {
    name: 'Realm 18: Frostfang Holds',
    tagline: "A northern realm of frostbound keeps and ancestral barrows.",
    modifier: { label: "+50% Salvage & Renown", description: "Old barrows yield heirlooms, armor, and renown for brave delvers.", bonusType: 'glory', bonusPct: 50 },
    faction: "Frostfang Shieldguard",
    color: '#9333ea',
    lore: "Frostfang Holds crown the frozen north. Their people honor ancestors with carved shields, winter feasts, and songs that carry across the ice.",
  },
  {
    name: 'Realm 19: The Verdant Expanse',
    tagline: "A verdant expanse where spring never leaves the deep forest.",
    modifier: { label: "+35% Herbal Lore & Aether", description: "Druids tend clear springs and gather rare herbs for potions and wards.", bonusType: 'deuterium', bonusPct: 35 },
    faction: "Green March Druids",
    color: '#7dd3fc',
    lore: "The Verdant Expanse is a quilt of meadow, woodland, and clear water. Druids protect its sacred groves and teach the old healing arts.",
  },
  {
    name: 'Realm 20: Dragonspine Dominion',
    tagline: "A dragon-haunted mountain realm of wyrm caves and high keeps.",
    modifier: { label: "+40% Hearthfire Mana & Keep Strength", description: "Dragonfire runes kindle hearths and fortify the realm walls.", bonusType: 'naquadah', bonusPct: 40 },
    faction: "Dragonspine Covenant",
    color: '#eab308',
    lore: "Dragonspine rises above the clouds. Its covenant of riders and sages guards ancient wyrm-roosts and the mountain passes below.",
  },
  {
    name: 'Realm 21: The Sunken Kingdom',
    tagline: "A drowned kingdom of pearl halls and sunken shrines.",
    modifier: { label: "+30% Armorcraft & Tide Ward", description: "Pearl divers recover rare shell, coral, and warding charms from the deep.", bonusType: 'metal', bonusPct: 30 },
    faction: "Sunken Crown Mariners",
    color: '#84cc16',
    lore: "Beneath the Sunken Kingdom lie tiled halls and forgotten bells. Tide-keepers know which waters are calm and which hide an old sea-beast.",
  },
  {
    name: 'Realm 22: Thornmarch Confederacy',
    tagline: "A confederacy of thorn-ringed baronies and free captains.",
    modifier: { label: "+25% Beast Companions & Wards", description: "The thornwardens call forest beasts and renew the living ramparts.", bonusType: 'shield', bonusPct: 25 },
    faction: "Thornmarch Confederacy",
    color: '#22c55e',
    lore: "The barons of Thornmarch gather beneath a thorn crown when danger comes. Between wars, free companies patrol the hedgerows and protect the harvest.",
  },
  {
    name: 'Realm 23: The Hollow Crown',
    tagline: "A hollow realm of deep caverns, gravity wells, and hidden vaults.",
    modifier: { label: "+35% Champion Charge & Siege Might", description: "Cavern winds favor a swift champion charge and powerful siege engines.", bonusType: 'attack', bonusPct: 35 },
    faction: "Hollow Crown Keepers",
    color: '#64748b',
    lore: "The Hollow Crown is a vast cavern beneath a ring of broken peaks. Its silent vaults are said to hold the crown of the first king.",
  },
  {
    name: 'Realm 24: The Golden Road',
    tagline: "A golden trade road joining far markets and welcoming inns.",
    modifier: { label: "+30% Caravan Range & No Toll Loss", description: "Chartered inns and wardstones make long caravan journeys safer.", bonusType: 'speed', bonusPct: 30 },
    faction: "Golden Road Merchant Guild",
    color: '#a855f7',
    lore: "The Golden Road crosses many borders, linking bazaars, abbeys, and mountain passes. Its waystones are tended by a guild sworn to aid every traveler.",
  },
  {
    name: 'Realm 25: The Shattered Barrows',
    tagline: "A barrowland of broken keeps, haunted mounds, and elder relics.",
    modifier: { label: "+40% Elder Relics & Renown", description: "Barrow relics strengthen the realm and earn renown for brave delvers.", bonusType: 'glory', bonusPct: 40 },
    faction: "Shattered Barrow Wardens",
    color: '#0284c7',
    lore: "The Shattered Barrows are steeped in old songs. Their cairns are guarded by ancestral shades who test the courage and honor of every visitor.",
  },
  {
    name: 'Realm 26: The Wyrmking’s Reach',
    tagline: "A wild reach where ancient wyrms rule the high crags.",
    modifier: { label: "+50% Market Spoils & Plunder", description: "Free riders trade rare trophies and claim spoils from dangerous quests.", bonusType: 'naquadah', bonusPct: 50 },
    faction: "Wyrmking Riders",
    color: '#ef4444',
    lore: "The Wyrmking’s Reach has no single crown. Wyrm-riders, merchant princes, and free companies settle disputes by oath, bargain, or trial of arms.",
  },
  {
    name: 'Realm 27: The Whispering Fen',
    tagline: "A misty fen where blue lights mark the path to old shrines.",
    modifier: { label: "+50% Hearthfire & Ward Renewal", description: "Fen shrines renew hearthfire charms and restore the strength of wards.", bonusType: 'shield', bonusPct: 50 },
    faction: "Whispering Fen Circle",
    color: '#38bdf8',
    lore: "The Whispering Fen is full of reed mazes, standing stones, and lights that drift above the pools. The fenwise know which lights guide and which deceive.",
  },
  {
    name: 'Realm 28: The Ashen Frontier',
    tagline: "A dusk frontier stalked by great beasts and guarded by rangers.",
    modifier: { label: "+30% Ranger Companies & Beast Allies", description: "Rangers train swift companies and bond with the wild creatures of the frontier.", bonusType: 'attack', bonusPct: 30 },
    faction: "Ashen Frontier Beastwardens",
    color: '#15803d',
    lore: "The Ashen Frontier is cloaked in dusk. Its wardens track giant beasts, escort pilgrims, and keep the old forest paths from falling into shadow.",
  },
  {
    name: 'Realm 29: The Starlit Isles',
    tagline: "A bright archipelago of starlit cliffs and moonlit harbors.",
    modifier: { label: "+35% Sea Ward & Waystone Lore", description: "Island sages chart the stars and strengthen sea wards around each harbor.", bonusType: 'metal', bonusPct: 40 },
    faction: "Starlit Isles Seafarers",
    color: '#1e1b4b',
    lore: "The Starlit Isles shine beneath clear night skies. Each island keeps a lighthouse of blue flame and a harbor open to honest travelers.",
  },
  {
    name: 'Realm 30: The Far Marches',
    tagline: "The far marches beyond the last map, rich with quests and wonder.",
    modifier: { label: "+45% Quest Renown & Discovery", description: "Adventurers find more renown, hidden keeps, and rare treasures beyond the map edge.", bonusType: 'glory', bonusPct: 50 },
    faction: "Far March Adventurers Guild",
    color: '#f59e0b',
    lore: "Beyond the Far Marches lie uncharted valleys, nameless ruins, and roads no crown has claimed. A wise traveler carries a compass, a spell, and a trusted companion.",
  },
];

// Generate exactly 30 Multiverse Universes
export const MULTIVERSE_UNIVERSES: MultiverseUniverse[] = UNIVERSE_TITLES.map((u, idx) => {
  const uId = idx + 1;
  const freq = (142.8 + uId * 24.3).toFixed(1);
  return {
    id: uId,
    name: u.name,
    tagline: u.tagline,
    dimensionCode: `DIM-Ω${uId.toString().padStart(2, '0')}`,
    dimensionalFrequency: `${freq} THz`,
    cosmicModifier: u.modifier,
    totalGalaxies: 90, // Exactly 90 galaxies per universe
    dominantFaction: u.faction,
    factionColor: u.color,
    travelDeuteriumCost: 2500 + uId * 250,
    travelTurnsCost: 3,
    atmosphereTheme: ['amber', 'cyan', 'emerald', 'purple', 'rose', 'indigo', 'sky', 'slate'][uId % 8],
    lore: u.lore,
  };
});

const GALAXY_PREFIXES = [
  'Elderglen', 'Pegasus', 'Ida', 'Oribis', 'Andromeda', 'Triangulum', 'Cygnus', 'Centaurus',
  'Eridanus', 'Vanguard', 'Omega', 'Destiny', 'Hydra', 'Perseus', 'Virgo', 'Boötes', 'Sagittarius',
  'Aquila', 'Corona', 'Scorpius', 'Draco', 'Ursa', 'Cassiopeia', 'Orion', 'Taurus', 'Centauri',
  'Lyra', 'Aries', 'Vespera', 'Aethel',
];

const GALAXY_SUFFIXES = [
  'Prime Core', 'Majoris Arm', 'Minoris Reach', 'Sector Expanse', 'Highland Vale Nebula', 'Void Halo',
  'Sanctuary Rift', 'Bastion Cluster', 'Crucible Arm', 'Deep Web', 'Ascension Zone', 'Terminus Halo',
];

const GALAXY_TYPES: UniverseGalaxy['galaxyType'][] = [
  'Highland Vale', 'Walled Basin', 'Crownroad March', 'Isle Chain', 'Broken March', 'Hidden Glen',
];

const RESOURCE_ABUNDANCES: UniverseGalaxy['primaryResourceAbundance'][] = [
  'Crowns', 'Iron', 'Moonstone', 'Cryo Aether', 'Arcane Dust',
];

/**
 * Generates the 90 galaxies for a specific universe (1 to 30) deterministically.
 */
export function getGalaxiesForUniverse(universeId: number): UniverseGalaxy[] {
  const safeU = Math.max(1, Math.min(30, Math.floor(universeId || 1)));

  return Array.from({ length: 90 }, (_, idx) => {
    const gNum = idx + 1; // 1 to 90
    const seed = safeU * 1000 + gNum;
    const r1 = getMultiverseHash(seed, 1);
    const r2 = getMultiverseHash(seed, 2);
    const r3 = getMultiverseHash(seed, 3);
    const r4 = getMultiverseHash(seed, 4);

    const prefix = GALAXY_PREFIXES[Math.floor(r1 * GALAXY_PREFIXES.length)];
    const suffix = GALAXY_SUFFIXES[Math.floor(r2 * GALAXY_SUFFIXES.length)];
    const gType = GALAXY_TYPES[Math.floor(r3 * GALAXY_TYPES.length)];
    const res = RESOURCE_ABUNDANCES[Math.floor(r4 * RESOURCE_ABUNDANCES.length)];

    const name = gNum === 1 && safeU === 1
      ? 'Realm 01: Elderglen Prime Core'
      : `Realm ${gNum.toString().padStart(2, '0')}: ${prefix} ${suffix}`;

    return {
      galaxyNumber: gNum,
      name,
      systemCount: 999, // 999 systems per galaxy
      galaxyType: gType,
      stellarDensity: `${Math.round(45 + r1 * 50)} billion stars`,
      primaryResourceAbundance: res,
      hyperspaceSafetyRating: ['Class-A (Stable)', 'Class-B (Moderate)', 'Class-C (Turbulent)', 'Class-S (Hyper-Flow)'][Math.floor(r2 * 4)],
      stargateSubnetwork: `SG-NET-${safeU.toString().padStart(2, '0')}.${gNum.toString().padStart(2, '0')}`,
    };
  });
}

/**
 * Retrieve Universe specification by ID (1 to 30)
 */
export function getUniverseData(universeId: number): MultiverseUniverse {
  const safeId = Math.max(1, Math.min(30, Math.floor(universeId || 1)));
  return MULTIVERSE_UNIVERSES[safeId - 1];
}

/**
 * Coordinate Decoder / Encoder
 * Format: [Universe:Galaxy:System:Slot]
 * Example: [1:1:104:5] -> Universe 1, Galaxy 1, System 104, Planet 5
 */
export interface MultiverseCoordinate {
  universe: number; // 1 to 30
  galaxy: number;   // 1 to 90
  system: number;   // 1 to 999
  slot: number;     // 1 to 15
  formatted: string; // [U:G:S:P]
  globalPlanetId: number; // 1 to 999,999 within current universe
}

export function parseMultiverseCoordinate(
  universeId: number,
  galaxyId: number,
  systemId: number,
  slotId: number
): MultiverseCoordinate {
  const u = Math.max(1, Math.min(30, Math.floor(universeId || 1)));
  const g = Math.max(1, Math.min(90, Math.floor(galaxyId || 1)));
  const s = Math.max(1, Math.min(999, Math.floor(systemId || 1)));
  const p = Math.max(1, Math.min(15, Math.floor(slotId || 1)));

  // Calculate planetary index within universe (1 to 999,999)
  const globalPlanetId = ((g - 1) * 999 * 15) % 999999 + ((s - 1) * 15) + p;
  const safeGlobalId = Math.max(1, Math.min(999999, globalPlanetId));

  return {
    universe: u,
    galaxy: g,
    system: s,
    slot: p,
    formatted: `[U${u}:G${g}:S${s}:P${p}]`,
    globalPlanetId: safeGlobalId,
  };
}
