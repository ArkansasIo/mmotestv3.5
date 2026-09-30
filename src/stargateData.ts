export interface StargateAddress {
  id: string;
  name: string;
  designation: string;
  galaxy: string;
  chevrons: string[]; // 7, 8, or 9 symbols
  pointOfOrigin: string;
  status: 'offline' | 'dialing' | 'connected' | 'locked' | 'incoming';
  connectedTo?: string;
  securityLevel: 'Safe' | 'Restricted' | 'Hostile' | 'Hazardous' | 'Classified';
  classification:
    | 'Homeworld Bastion'
    | 'Ancient Temple Ruin'
    | 'Military Stronghold'
    | 'Nanite Citadel'
    | 'Destiny Seed Vessel'
    | 'Superweapon Sanctuary'
    | 'Homehold Bastion'
    | 'Living Grove Sanctuary'
    | 'Sealed Shrine'
    | 'Warded Archive'
    | 'Marcher Keep'
    | 'Deepdelve Hall'
    | 'Fen Refuge'
    | 'Waystone Shrine'
    | 'Market Stronghold';
  powerReqMw: number;
  distanceLy: number;
  description: string;
  loreDetails: string;
  malpTelemetry: {
    atmosphere: string;
    radiation: 'Negligible' | 'Low' | 'Moderate' | 'High' | 'Deadly';
    gravity: string;
    lifeSigns: string;
    threatRating: string;
    resourcesAvailable: string;
  };
  lootEstimates: {
    naquadah: number;
    crystal: number;
    darkMatter?: number;
    rareArtifact?: string;
  };
}

export interface StargateGlyph {
  id: string;
  symbol: string;
  name: string;
  phonetic: string;
  constellation: string;
}

export interface SGTeamUnit {
  id: string;
  code: string;
  name: string;
  specialization: string;
  leader: string;
  successBonus: string;
  turnCost: number;
  perkDescription: string;
  missionsCount: number;
}

export interface JumpGateFleetComposition {
  lightFighters: number;
  heavyCruisers: number;
  battleships: number;
  battlecruisers: number;
  deathstars: number;
  largeCargos: number;
  recyclers: number;
}

export interface JumpGateRelay {
  id: string;
  name: string;
  hubType: 'Lunar Orbital' | 'Phalanx Bastion' | 'Deep Space Starbase' | 'Asteroid Perimeter' | 'Planetary Ring';
  sectorCoordinates: string;
  level: number;
  maxFleetDisplacement: number; // max ships per transit
  capacitorCharge: number; // 0-100%
  cooldownSeconds: number;
  maxCooldownSeconds: number;
  quantumCoolantLevel: number; // level 1-5
  tachyonStabilizerLevel: number; // level 1-5
  status: 'online' | 'recharging' | 'overheating';
  stationedFleet: JumpGateFleetComposition;
}

export interface AncientControlCrystal {
  id: string;
  name: string;
  rarity: string;
  effect: string;
  installed: boolean;
  socket: 'dhd_core' | 'jump_capacitor' | 'shield_harmonics';
  boostValue: string;
}

export interface SupergateSingularity {
  id: string;
  name: string;
  segmentsAssembled: number; // max 90
  microSingularityMass: number; // micro-solar units
  status: 'dormant' | 'charging' | 'singularity_active';
  crossGalaxyEnergy: number;
  darkMatterHarvestRate: number;
}

// -------------------------------------------------------------
// The 39 Ancient Glyphs (Milky Way & Pegasus)
// -------------------------------------------------------------
export const STARGATE_GLYPHS: StargateGlyph[] = [
  { id: 'glyph-origin', symbol: 'ᐰ', name: 'Tau\'ri Point of Origin', phonetic: 'At', constellation: 'Sol / Earth' },
  { id: 'glyph-crater', symbol: '𐎠', name: 'Crater', phonetic: 'Al', constellation: 'Crater' },
  { id: 'glyph-virgo', symbol: '♍', name: 'Virgo', phonetic: 'Dan', constellation: 'Virgo' },
  { id: 'glyph-bootes', symbol: '𐎡', name: 'Bootes', phonetic: 'Boh', constellation: 'Bootes' },
  { id: 'glyph-centaurus', symbol: '𐎢', name: 'Centaurus', phonetic: 'Cen', constellation: 'Centaurus' },
  { id: 'glyph-libra', symbol: '♎', name: 'Libra', phonetic: 'Lib', constellation: 'Libra' },
  { id: 'glyph-serpens', symbol: '𐎣', name: 'Serpens Caput', phonetic: 'Ser', constellation: 'Serpens' },
  { id: 'glyph-norma', symbol: '𐎤', name: 'Norma', phonetic: 'Nor', constellation: 'Norma' },
  { id: 'glyph-scorpius', symbol: '♏', name: 'Scorpius', phonetic: 'Sco', constellation: 'Scorpius' },
  { id: 'glyph-corona', symbol: '𐎥', name: 'Corona Australis', phonetic: 'Cor', constellation: 'Corona Australis' },
  { id: 'glyph-scutum', symbol: '𐎦', name: 'Scutum', phonetic: 'Scu', constellation: 'Scutum' },
  { id: 'glyph-sagittarius', symbol: '♐', name: 'Sagittarius', phonetic: 'Sag', constellation: 'Sagittarius' },
  { id: 'glyph-aquila', symbol: '𐎧', name: 'Aquila', phonetic: 'Aqu', constellation: 'Aquila' },
  { id: 'glyph-microscopium', symbol: '𐎨', name: 'Microscopium', phonetic: 'Mic', constellation: 'Microscopium' },
  { id: 'glyph-capricornus', symbol: '♑', name: 'Capricornus', phonetic: 'Cap', constellation: 'Capricornus' },
  { id: 'glyph-piscis', symbol: '𐎩', name: 'Piscis Austrinus', phonetic: 'Pis', constellation: 'Piscis Austrinus' },
  { id: 'glyph-pegasus', symbol: '𐎪', name: 'Pegasus Constellation', phonetic: 'Peg', constellation: 'Pegasus' },
  { id: 'glyph-sculptor', symbol: '𐎫', name: 'Sculptor', phonetic: 'Scu', constellation: 'Sculptor' },
  { id: 'glyph-pisces', symbol: '♓', name: 'Pisces Twin Stars', phonetic: 'Tah', constellation: 'Pisces' },
  { id: 'glyph-andromeda', symbol: '𐎬', name: 'Andromeda', phonetic: 'And', constellation: 'Andromeda' },
  { id: 'glyph-triangulum', symbol: '△', name: 'Triangulum', phonetic: 'Tri', constellation: 'Triangulum' },
  { id: 'glyph-aries', symbol: '♈', name: 'Aries', phonetic: 'Ari', constellation: 'Aries' },
  { id: 'glyph-perseus', symbol: '𐎭', name: 'Perseus', phonetic: 'Per', constellation: 'Perseus' },
  { id: 'glyph-taurus', symbol: '♉', name: 'Taurus', phonetic: 'Tau', constellation: 'Taurus' },
  { id: 'glyph-gemini', symbol: '♊', name: 'Gemini', phonetic: 'Gem', constellation: 'Gemini' },
  { id: 'glyph-canis-minor', symbol: '𐎮', name: 'Canis Minor', phonetic: 'Cmi', constellation: 'Canis Minor' },
  { id: 'glyph-monoceros', symbol: '𐎯', name: 'Monoceros', phonetic: 'Mon', constellation: 'Monoceros' },
  { id: 'glyph-orion', symbol: '𐎰', name: 'Orion Hunter', phonetic: 'Ori', constellation: 'Orion' },
];

// -------------------------------------------------------------
// Expanded Stargate Addresses Across 4 Galaxies
// -------------------------------------------------------------
const PRECURSOR_STARGATE_ADDRESSES: StargateAddress[] = [
  {
    id: 'sg_earth',
    name: "Earth / SGC Alpha Site (Tau'ri)",
    designation: 'P2X-3YZ · Cheyenne Mountain Complex',
    galaxy: 'Milky Way',
    chevrons: ['ᐰ', '𐎠', '♍', '𐎡', '𐎢', '♎', 'ᐰ'],
    pointOfOrigin: 'ᐰ',
    status: 'connected',
    connectedTo: 'sg_atlantis',
    securityLevel: 'Safe',
    classification: 'Homeworld Bastion',
    powerReqMw: 120,
    distanceLy: 0,
    description: 'Primary Stargate Command deep inside Cheyenne Mountain Level 28. Fitted with heavy titanium-trinium iris and automated iris deactivation transponders.',
    loreDetails: 'The cradle of human resistance against the Goa\'uld System Lords. Features dedicated dialer computers, MALP deployment ramps, and emergency naquadah power buffers.',
    malpTelemetry: {
      atmosphere: 'Standard Nitrogen-Oxygen (1.00 atm)',
      radiation: 'Negligible',
      gravity: '1.00 G',
      lifeSigns: 'Overwhelming friendly military & scientific garrison',
      threatRating: 'None',
      resourcesAvailable: 'Refined Titanium, High-Grade Trinium, SGC Supply Hub',
    },
    lootEstimates: {
      naquadah: 20000,
      crystal: 12000,
      rareArtifact: 'SGC GDO Transmitter Chip',
    },
  },
  {
    id: 'sg_atlantis',
    name: 'Atlantis City-Ship (Lantea)',
    designation: 'Pegasus Hub · Ocean Spire',
    galaxy: 'Pegasus',
    chevrons: ['𐎪', '𐎫', '♓', '𐎬', '△', '♈', '𐎭', 'ᐰ'],
    pointOfOrigin: '𐎪',
    status: 'connected',
    connectedTo: 'sg_earth',
    securityLevel: 'Safe',
    classification: 'Ancient Temple Ruin',
    powerReqMw: 850,
    distanceLy: 3000000,
    description: 'Magnificent Ancient city-ship floating upon the azure oceans of planet Lantea. Protected by a crystalline energy shield and powered by ZPM conduits.',
    loreDetails: 'Constructed millions of years ago by the Ancients (Lanteans) before fleeing the Wraith. Houses the central Stargate gantry room with digital DHD consoles and drone weapon chairs.',
    malpTelemetry: {
      atmosphere: 'Pristine Oceanic Air (1.02 atm)',
      radiation: 'Negligible',
      gravity: '1.04 G',
      lifeSigns: 'Friendly expeditionary garrison & Ancient holographic archives',
      threatRating: 'None',
      resourcesAvailable: 'ZPM Depleted Cores, Lantean Control Crystals, Sub-space Nanites',
    },
    lootEstimates: {
      naquadah: 55000,
      crystal: 38000,
      darkMatter: 250,
      rareArtifact: 'Potentia Zero-Point Depleted Core',
    },
  },
  {
    id: 'sg_dakara',
    name: 'Dakara / Ancient Weapon Temple',
    designation: 'P5C-353 · Holy World of Jaffa',
    galaxy: 'Milky Way',
    chevrons: ['𐎦', '♐', '𐎧', '𐎨', '♑', '𐎩', 'ᐰ'],
    pointOfOrigin: '𐎦',
    status: 'offline',
    securityLevel: 'Restricted',
    classification: 'Superweapon Sanctuary',
    powerReqMw: 340,
    distanceLy: 18400,
    description: 'Holy site of the Free Jaffa Nation where Anubis constructed the temple housing the Ancient molecular disintegration superweapon.',
    loreDetails: 'The site where the Replicator scourge was wiped out across the galaxy by dialing every Stargate simultaneously with the weapon wave.',
    malpTelemetry: {
      atmosphere: 'Arid Mountain Air (0.92 atm)',
      radiation: 'Low',
      gravity: '0.98 G',
      lifeSigns: 'Free Jaffa High Council honor guards & monk guardians',
      threatRating: 'None',
      resourcesAvailable: 'Massive Pure Naquadah Monoliths, Ancient Dialing Relay Rings',
    },
    lootEstimates: {
      naquadah: 68000,
      crystal: 24000,
      darkMatter: 180,
      rareArtifact: 'Dakara Molecular Wave Fragment',
    },
  },
  {
    id: 'sg_chulak',
    name: 'Chulak / Jaffa Stronghold',
    designation: 'P3X-435 · Forest Citadel',
    galaxy: 'Milky Way',
    chevrons: ['𐎠', '𐎡', '𐎢', '♎', '𐎣', '𐎤', 'ᐰ'],
    pointOfOrigin: '𐎠',
    status: 'offline',
    securityLevel: 'Safe',
    classification: 'Homeworld Bastion',
    powerReqMw: 160,
    distanceLy: 8200,
    description: 'Lush forested cradle world of the Jaffa warriors, formerly ruled by Apophis. Now a vital center for the Free Jaffa military coalition.',
    loreDetails: 'Teal\'c\'s homeworld where Jaffa larvae symbionts were cultivated. Ancient stone architecture surrounded by dense conifer canopies.',
    malpTelemetry: {
      atmosphere: 'Temperate Forest Air (1.00 atm)',
      radiation: 'Negligible',
      gravity: '1.00 G',
      lifeSigns: 'Friendly Jaffa warrior regiments & staff weapon drills',
      threatRating: 'None',
      resourcesAvailable: 'Staff Weapon Energy Cells, Heavy Liquid Naquadah',
    },
    lootEstimates: {
      naquadah: 32000,
      crystal: 16000,
      rareArtifact: 'Master Bra\'tac Honor Dagger',
    },
  },
  {
    id: 'sg_tollana',
    name: 'Tollana / Curia Planetary Grid',
    designation: 'P4X-377 · Advanced World',
    galaxy: 'Milky Way',
    chevrons: ['♎', '𐎣', '𐎤', '♏', '𐎥', '𐎦', 'ᐰ'],
    pointOfOrigin: '♎',
    status: 'offline',
    securityLevel: 'Safe',
    classification: 'Homeworld Bastion',
    powerReqMw: 290,
    distanceLy: 14500,
    description: 'High-tech world colonized by the Tollan with custom-built white Stargate, ion defense cannons, and matter-disruptor phasing technology.',
    loreDetails: 'The Tollan built their own functional Stargate from scratch using advanced metallurgy without Ancient machinery.',
    malpTelemetry: {
      atmosphere: 'Filtered Urban Air (1.00 atm)',
      radiation: 'Negligible',
      gravity: '0.99 G',
      lifeSigns: 'Automated defense drones & scientific archives',
      threatRating: 'None',
      resourcesAvailable: 'Trinium Alloy Plates, Phase-Shift Crystal Matrices',
    },
    lootEstimates: {
      naquadah: 42000,
      crystal: 48000,
      darkMatter: 120,
      rareArtifact: 'Tollan Phase-Shift Pocket Module',
    },
  },
  {
    id: 'sg_delmak',
    name: 'Delmak / Sokar\'s Volcanic Hell',
    designation: 'P2A-018 · Netherworld Core',
    galaxy: 'Milky Way',
    chevrons: ['♏', '𐎥', '𐎦', '♐', '𐎧', '𐎨', 'ᐰ'],
    pointOfOrigin: '♏',
    status: 'offline',
    securityLevel: 'Hostile',
    classification: 'Military Stronghold',
    powerReqMw: 410,
    distanceLy: 29000,
    description: 'Hellish volcanic planet with super-heated magma oceans, orbital prison moon Netu, and heavily armed subterranean Goa\'uld arsenals.',
    loreDetails: 'The dreaded throne world of Sokar, later usurped by Apophis. Subsurface vaults house prototypes for stealth-cloaked Ha\'tak warships.',
    malpTelemetry: {
      atmosphere: 'Sulfurous Volcanic Gases (1.45 atm) - Filter Required',
      radiation: 'Moderate',
      gravity: '1.25 G',
      lifeSigns: 'Sokar zealot legions & serpentine terror beasts',
      threatRating: "Goa'uld Jaffa Patrols",
      resourcesAvailable: 'High-Thermal Geothermal Plasma, Molten Naquadah Slag',
    },
    lootEstimates: {
      naquadah: 82000,
      crystal: 21000,
      rareArtifact: 'Sokar Shadow Death Mask',
    },
  },
  {
    id: 'sg_tartarus',
    name: 'Tartarus / Kull Super-Soldier Base',
    designation: 'P3X-584 · Black Fortress',
    galaxy: 'Milky Way',
    chevrons: ['♑', '𐎩', '𐎪', '𐎫', '♓', '𐎬', 'ᐰ'],
    pointOfOrigin: '♑',
    status: 'offline',
    securityLevel: 'Hazardous',
    classification: 'Military Stronghold',
    powerReqMw: 520,
    distanceLy: 38000,
    description: 'Anubis\' heavily fortified stronghold protected by an impenetrable energy forcefield covering the Stargate and housing thousands of Kull synthetic warriors.',
    loreDetails: 'Genetic incubation chambers where Anubis reanimated mindless drone shock troopers impervious to standard energy and kinetic weapons.',
    malpTelemetry: {
      atmosphere: 'Dry Barren Cavern Air (0.85 atm)',
      radiation: 'Moderate',
      gravity: '1.10 G',
      lifeSigns: 'Dormant Kull synthetic biomechanical pods',
      threatRating: "Goa'uld Jaffa Patrols",
      resourcesAvailable: 'Kull Energy Absorbing Fiber, Anubis Genetic Serum',
    },
    lootEstimates: {
      naquadah: 95000,
      crystal: 34000,
      darkMatter: 310,
      rareArtifact: 'Kull Warrior Regenerative Plating',
    },
  },
  {
    id: 'sg_asuras',
    name: 'Asuras / Replicator Homeworld',
    designation: 'M7G-677 · Nanite Metropolis',
    galaxy: 'Pegasus',
    chevrons: ['△', '♈', '𐎭', '♉', '♊', '𐎮', '𐎯', 'ᐰ'],
    pointOfOrigin: '△',
    status: 'offline',
    securityLevel: 'Hazardous',
    classification: 'Nanite Citadel',
    powerReqMw: 920,
    distanceLy: 3200000,
    description: 'Gargantuan crystalline planet entirely covered in nanite metropolis structures, built by human-form Replicators created by the Lanteans.',
    loreDetails: 'The Asuran Replicators possessed entire fleets of Aurora-class battleships and city-ships with infinite self-replication capabilities.',
    malpTelemetry: {
      atmosphere: 'Synthetic Sterile Atmosphere (1.00 atm)',
      radiation: 'Negligible',
      gravity: '1.00 G',
      lifeSigns: 'Billions of human-form nanite consensus units',
      threatRating: 'Replicator Nanites',
      resourcesAvailable: 'Pure Molecular Neutronium, Cohesive Nanite Blocks',
    },
    lootEstimates: {
      naquadah: 110000,
      crystal: 90000,
      darkMatter: 650,
      rareArtifact: 'Asuran Base Code Nanite Core',
    },
  },
  {
    id: 'sg_wraith_hive',
    name: 'M7R-227 / Wraith Nursery Hive',
    designation: 'Wraith Feeding Sector Zeta',
    galaxy: 'Pegasus',
    chevrons: ['♈', '𐎭', '♉', '♊', '𐎮', '𐎯', '𐎰', 'ᐰ'],
    pointOfOrigin: '♈',
    status: 'offline',
    securityLevel: 'Hostile',
    classification: 'Military Stronghold',
    powerReqMw: 780,
    distanceLy: 3150000,
    description: 'Swamp world shrouded in thick psychic mist where a supermassive Wraith hive ship has rooted itself into the planetary crust to harvest organic matter.',
    loreDetails: 'Cloning chambers powered by stolen ZPMs, guarded by thousands of faceless drone warriors and telepathic Wraith Queens.',
    malpTelemetry: {
      atmosphere: 'Dense Organic Mists (1.15 atm)',
      radiation: 'Low',
      gravity: '1.08 G',
      lifeSigns: 'Thousands of dormant bio-telepathic life signatures',
      threatRating: 'Wraith Drone Swarm',
      resourcesAvailable: 'Organic Hull Chitin, Stolen ZPM Power Capacitors',
    },
    lootEstimates: {
      naquadah: 76000,
      crystal: 45000,
      darkMatter: 280,
      rareArtifact: 'Wraith Queen Stunner Rifle & Bio-Key',
    },
  },
  {
    id: 'sg_othala',
    name: 'Othala / Hall of Thor',
    designation: 'Ida Core · Asgard Sovereign World',
    galaxy: 'Ida',
    chevrons: ['𐎠', '♍', '𐎡', '𐎢', '♎', '𐎣', '𐎤', 'ᐰ'],
    pointOfOrigin: '𐎠',
    status: 'offline',
    securityLevel: 'Safe',
    classification: 'Homeworld Bastion',
    powerReqMw: 1200,
    distanceLy: 4000000,
    description: 'Homeworld of the Asgard High Council. Features neutrino-ion generators, time dilation vaults, and holographic archives of the Great Alliance.',
    loreDetails: 'Requires an eight-chevron dial sequence with boosted power from a Naquadah booster generator or Asgard hyper-core.',
    malpTelemetry: {
      atmosphere: 'Nitrogen-Argon Balanced (0.95 atm)',
      radiation: 'Negligible',
      gravity: '0.90 G',
      lifeSigns: 'Asgard Council Clones & Automated O\'Neill Battleships',
      threatRating: 'None',
      resourcesAvailable: 'Neutrino-Ion Generator Relics, Asgard Computer Crystals',
    },
    lootEstimates: {
      naquadah: 130000,
      crystal: 115000,
      darkMatter: 800,
      rareArtifact: 'Asgard Holographic Datapad of Thor',
    },
  },
  {
    id: 'sg_destiny',
    name: 'Ancient Vessel Destiny',
    designation: 'Automated Deep Space Explorer',
    galaxy: 'Universe',
    chevrons: ['ᐰ', '𐎠', '♍', '𐎡', '𐎢', '♎', '𐎣', '𐎤', 'ᐰ'],
    pointOfOrigin: 'ᐰ',
    status: 'offline',
    securityLevel: 'Classified',
    classification: 'Destiny Seed Vessel',
    powerReqMw: 2500,
    distanceLy: 8500000000,
    description: 'Legendary automated ship launched by the Ancients tens of millions of years ago to investigate cosmic microwave background radiation at the edge of the universe.',
    loreDetails: 'Requires a 9-chevron code utilizing immense raw geothermal or solar power directly tapped from a planetary naquadria core.',
    malpTelemetry: {
      atmosphere: 'Thin Pressurized Compartments (0.80 atm)',
      radiation: 'High',
      gravity: '0.85 G',
      lifeSigns: 'Automated neural interface chair & repair robots',
      threatRating: 'Ancient Automated Drones',
      resourcesAvailable: 'Cosmic Microwave Telemetry, Destiny FTL Fuel Slurry',
    },
    lootEstimates: {
      naquadah: 250000,
      crystal: 180000,
      darkMatter: 1500,
      rareArtifact: 'Destiny Master Bridge Command Code',
    },
  },
  {
    id: 'sg_novus',
    name: 'Novus / Iron Citadel of Man',
    designation: 'Colonial Descendant Hub',
    galaxy: 'Universe',
    chevrons: ['𐎯', '𐎰', '𐎠', '♍', '𐎡', '𐎢', '♎', 'ᐰ'],
    pointOfOrigin: '𐎯',
    status: 'offline',
    securityLevel: 'Safe',
    classification: 'Homeworld Bastion',
    powerReqMw: 1800,
    distanceLy: 8200000000,
    description: 'World founded by alternate Destiny crew sent back through time. Built massive geothermal cities and deep space archives of Earth-Destiny civilization.',
    loreDetails: 'Features colossal archive bunkers preserving 2,000 years of scientific advancement prior to tectonic cataclysm.',
    malpTelemetry: {
      atmosphere: 'Dense Ash-Filtered Atmosphere (1.10 atm)',
      radiation: 'Moderate',
      gravity: '1.02 G',
      lifeSigns: 'Novus Historical Archive AI Mainframe',
      threatRating: 'None',
      resourcesAvailable: 'Novus Subterranean Archive Cores, Geothermal Cells',
    },
    lootEstimates: {
      naquadah: 160000,
      crystal: 120000,
      darkMatter: 950,
      rareArtifact: 'Novus Historical Library Archive Crystal',
    },
  },
];

const ELDORIA_WAYSTONE_LORE: Record<string, Pick<StargateAddress,
  'name' | 'designation' | 'galaxy' | 'classification' | 'description' | 'loreDetails' | 'malpTelemetry'
>> = {
  sg_earth: {
    name: 'Eastridge Gatehouse', designation: 'Crownroad Waystone · Eastridge Marches', galaxy: 'Eastridge Marches',
    classification: 'Homehold Bastion',
    description: 'A guarded standing stone beside the royal road, kept lit for envoys, travelers, and the border watch.',
    loreDetails: 'The gatehouse is held by the Crownroad Wardens. Its marks lead to the oldest safe roads in Valewyn.',
    malpTelemetry: { atmosphere: 'Cool river air', radiation: 'Negligible', gravity: 'Steady ground', lifeSigns: 'Friendly wardens and market folk', threatRating: 'None', resourcesAvailable: 'Iron, Moonstone, Crown stores' },
  },
  sg_atlantis: {
    name: 'Moonwell Hall', designation: 'Elder Waystone · Silverwood Reach', galaxy: 'Silverwood Reach',
    classification: 'Living Grove Sanctuary',
    description: 'A pale stone arch stands above a spring beneath the elder trees. Its roots shelter healers and map-keepers.',
    loreDetails: 'The Greenveil Kin tend this crossing. The waystone answers only when the traveler names a road they truly know.',
    malpTelemetry: { atmosphere: 'Silverwood rain and cedar', radiation: 'Negligible', gravity: 'Steady ground', lifeSigns: 'Greenveil wardens and grove keepers', threatRating: 'None', resourcesAvailable: 'Moonstone, healing herbs, clear Aether' },
  },
  sg_dakara: {
    name: 'Nine Bells Oathbarrow', designation: 'Deepdelve Waystone · Nine Bells Hall', galaxy: 'Deepdelve Holds',
    classification: 'Sealed Shrine',
    description: 'A rune-marked door rests beneath nine bronze bells in a hall closed since the first crown-war.',
    loreDetails: 'The Grotto Clans keep the outer passage. Each bell answers a different vow; the innermost door remains sealed.',
    malpTelemetry: { atmosphere: 'Cold mountain air', radiation: 'Low', gravity: 'Steady ground', lifeSigns: 'Delvers at the outer watch', threatRating: 'Stoneward guardians', resourcesAvailable: 'Oath-iron, old maps, barrow relics' },
  },
  sg_chulak: {
    name: 'Red Banner Ford', designation: 'Ashen March Waystone · Cinder March', galaxy: 'Cinder March',
    classification: 'Marcher Keep',
    description: 'A black-stone ford guarded by a red-bannered shieldwall where two old roads meet.',
    loreDetails: 'The Ashen Dominion and Free Clans dispute its tolls, but both have sworn to keep the ford open during flood season.',
    malpTelemetry: { atmosphere: 'Warm ash winds', radiation: 'Low', gravity: 'Steady ground', lifeSigns: 'Mixed clan sentries', threatRating: 'Contested border patrols', resourcesAvailable: 'Iron, charcoal, forgeglass' },
  },
  sg_tollana: {
    name: 'Glasswright Enclave', designation: 'Elderstone Waystone · The Mirrorvault', galaxy: 'Elderstone Frontier',
    classification: 'Warded Archive',
    description: 'A quiet archive carved into clear stone, where rune-scribes study a sealed mirror door.',
    loreDetails: 'The Glassroot Assembly lends wardwrights to guard the archive. No relic leaves without a copy of its finding entered in the ledger.',
    malpTelemetry: { atmosphere: 'Dry, cool archive air', radiation: 'Negligible', gravity: 'Steady ground', lifeSigns: 'Scribes and construct wardens', threatRating: 'Mirrorvault sentinels', resourcesAvailable: 'Clear quartz, rune plates, old lore' },
  },
  sg_delmak: {
    name: 'Amberdeep Exchange', designation: 'Amber Road Waystone · Merchant Houses', galaxy: 'Amber Road',
    classification: 'Market Stronghold',
    description: 'A busy caravan yard surrounds a waystone whose marks are copied into every guild safe-conduct.',
    loreDetails: 'The Amber Road Syndics maintain the crossing. Their factors negotiate access before any company passes through.',
    malpTelemetry: { atmosphere: 'Dusty market air', radiation: 'Negligible', gravity: 'Steady ground', lifeSigns: 'Caravan crews and guild factors', threatRating: 'Paid road guards', resourcesAvailable: 'Crowns, food stores, trade goods' },
  },
  sg_tartarus: {
    name: 'Cinderfold Deep Hold', designation: 'Ashen Waystone · Beneath the Red Ridge', galaxy: 'Cinder March',
    classification: 'Deepdelve Hall',
    description: 'A basalt hall descends into a warm ravine where dragon-glass glows behind iron grates.',
    loreDetails: 'The forges are tended by oath-sworn smiths. The lower passage is closed whenever the mountain begins to sing.',
    malpTelemetry: { atmosphere: 'Hot forge air', radiation: 'Moderate', gravity: 'Steady ground', lifeSigns: 'Smiths and shielded forge crews', threatRating: 'Ash drakes in lower tunnels', resourcesAvailable: 'Oath-iron, dragon-glass, Aether salts' },
  },
  sg_asuras: {
    name: 'Glassroot Hall', designation: 'Runewright Waystone · Ironroot Clans', galaxy: 'Deepdelve Holds',
    classification: 'Warded Archive',
    description: 'A broad stone chamber built around a cracked rune pillar and the oldest workshop of the Assembly.',
    loreDetails: 'The hall is shared by Ironroot smiths and named golems. Both keep a place at the bench for a new apprentice.',
    malpTelemetry: { atmosphere: 'Cool stone and forge smoke', radiation: 'Low', gravity: 'Steady ground', lifeSigns: 'Smiths, scribes, and golem apprentices', threatRating: 'Dormant rune guardians', resourcesAvailable: 'Iron, moonstone, rune patterns' },
  },
  sg_wraith_hive: {
    name: 'Hollowfen Pools', designation: 'Fenway Stone · Whispering Fen', galaxy: 'Whispering Fen',
    classification: 'Fen Refuge',
    description: 'Blue lanterns drift above a maze of reeds, marking a narrow path to a half-sunken waystone.',
    loreDetails: 'The Hollowfen Broods gather here during the dry turn. Visitors must leave weapons peace-bound at the reed gate.',
    malpTelemetry: { atmosphere: 'Wet reedland mist', radiation: 'Moderate', gravity: 'Soft marsh ground', lifeSigns: 'Fen families and reed scouts', threatRating: 'Hollowfen warbands', resourcesAvailable: 'Medicinal reeds, Aether pools, peat' },
  },
  sg_othala: {
    name: 'Frostfang Hearth', designation: 'Northroad Waystone · Frostfang Holds', galaxy: 'Frostfang Holds',
    classification: 'Marcher Keep',
    description: 'A high watch keep shelters a blue waystone from snow, wind, and the long northern dark.',
    loreDetails: 'The Frostfang Wayfarers share its fires with every traveler. Their map room is rebuilt after each hard winter.',
    malpTelemetry: { atmosphere: 'Bitter clear mountain air', radiation: 'Low', gravity: 'Steady ground', lifeSigns: 'Wayfarers and watch-keepers', threatRating: 'Whiteout and rime beasts', resourcesAvailable: 'Iron, fur, winter herbs' },
  },
  sg_destiny: {
    name: 'The Endless Barrow Road', designation: 'Old Oathway · Beyond the Shattered Barrows', galaxy: 'Shattered Barrows',
    classification: 'Waystone Shrine',
    description: 'A mile of standing stones disappears into a gray moor. Each bears a different name scratched out by weather.',
    loreDetails: 'The Lantern Cartographers mark the road but do not claim to know where it ends. A returning traveler must carry a new story.',
    malpTelemetry: { atmosphere: 'Thin moorland fog', radiation: 'High', gravity: 'Uneven barrow ground', lifeSigns: 'Uncertain lights beyond the cairns', threatRating: 'The Unsworn Host', resourcesAvailable: 'Elder relics, dawnshards, lost charters' },
  },
  sg_novus: {
    name: 'New Crownwall', designation: 'Reeve’s Waystone · Crownwall Cities', galaxy: 'Crownwall Cities',
    classification: 'Homehold Bastion',
    description: 'A newly raised gatehouse joins rebuilt bridges, public wells, and a growing guild market.',
    loreDetails: 'The Crownwall Compact settled this crossing after the Emberfall. Every household may add a mark to the town’s shared map.',
    malpTelemetry: { atmosphere: 'Clear river-valley air', radiation: 'Negligible', gravity: 'Steady ground', lifeSigns: 'Builders, reeves, and market families', threatRating: 'None', resourcesAvailable: 'Crowns, timber, clean water' },
  },
};

export const STARGATE_NETWORK: StargateAddress[] = PRECURSOR_STARGATE_ADDRESSES.map((address) => ({
  ...address,
  ...ELDORIA_WAYSTONE_LORE[address.id],
}));

// -------------------------------------------------------------
// Waystone expedition orders
// -------------------------------------------------------------
export const SG_TEAMS: SGTeamUnit[] = [
  {
    id: 'team-sg1',
    code: 'CW-1',
    name: 'Crownroad Lantern Wardens',
    specialization: 'Waystone Survey & Relic Lore',
    leader: 'Warden Aria Vale & Scribe Rowan',
    successBonus: '+45% Elder Relic Finds & +25% Moonstone Yield',
    turnCost: 1,
    perkDescription: 'They read old road-marks, copy rune inscriptions, and spot a warded threshold before the company crosses it.',
    missionsCount: 142,
  },
  {
    id: 'team-sg3',
    code: 'BV-3',
    name: 'Blacksteel Vanguard',
    specialization: 'Shieldwall & Siege Assault',
    leader: 'High Marshal Darius Blackthorn',
    successBonus: '+60% Victory Chance against Hostile Garrisons & +40% Crowns Recovered',
    turnCost: 1,
    perkDescription: 'Veteran shield-bearers, pike captains, and engine crews can break a gate without abandoning the wounded.',
    missionsCount: 98,
  },
  {
    id: 'team-sg11',
    code: 'ID-11',
    name: 'Ironroot Delvers',
    specialization: 'Ore Survey & Forge Engineering',
    leader: 'Thane Brokk Ironroot',
    successBonus: '+100% Iron & Specialty Vein Yield',
    turnCost: 1,
    perkDescription: 'Delvers brace unstable shafts, test deep seams, and bring the recovered ore home in guarded carts.',
    missionsCount: 76,
  },
  {
    id: 'team-sg22',
    code: 'GP-22',
    name: 'Gloamveil Pathfinders',
    specialization: 'Scoutcraft & Counter-Signs',
    leader: 'Warden Elira Shade',
    successBonus: '100% Safe Evacuation Rate & Zero Casualties Guarantee',
    turnCost: 1,
    perkDescription: 'Pathfinders read tracks, hide lanterns, and guide a company past sentries without drawing steel.',
    missionsCount: 64,
  },
];

// -------------------------------------------------------------
// Subspace Jump Gate Relay Network (Game Fleets)
// -------------------------------------------------------------
export const INITIAL_JUMP_GATE_RELAYS: JumpGateRelay[] = [
  {
    id: 'relay-lunar-alpha',
    name: 'Lunar Alpha Jump Gate [Earth Moon]',
    hubType: 'Lunar Orbital',
    sectorCoordinates: '[1:234:4]',
    level: 4,
    maxFleetDisplacement: 25000,
    capacitorCharge: 100,
    cooldownSeconds: 0,
    maxCooldownSeconds: 90,
    quantumCoolantLevel: 4,
    tachyonStabilizerLevel: 3,
    status: 'online',
    stationedFleet: {
      lightFighters: 450,
      heavyCruisers: 85,
      battleships: 32,
      battlecruisers: 14,
      deathstars: 1,
      largeCargos: 180,
      recyclers: 75,
    },
  },
  {
    id: 'relay-phalanx-beta',
    name: 'Phalanx Beta Relay [Mars Orbital Moon]',
    hubType: 'Phalanx Bastion',
    sectorCoordinates: '[2:112:8]',
    level: 3,
    maxFleetDisplacement: 18000,
    capacitorCharge: 82,
    cooldownSeconds: 35,
    maxCooldownSeconds: 120,
    quantumCoolantLevel: 3,
    tachyonStabilizerLevel: 2,
    status: 'recharging',
    stationedFleet: {
      lightFighters: 220,
      heavyCruisers: 40,
      battleships: 12,
      battlecruisers: 6,
      deathstars: 0,
      largeCargos: 95,
      recyclers: 30,
    },
  },
  {
    id: 'relay-orion-deep',
    name: 'Orion Deep Terminal [Sector 3 Starbase]',
    hubType: 'Deep Space Starbase',
    sectorCoordinates: '[3:400:15]',
    level: 5,
    maxFleetDisplacement: 40000,
    capacitorCharge: 100,
    cooldownSeconds: 0,
    maxCooldownSeconds: 60,
    quantumCoolantLevel: 5,
    tachyonStabilizerLevel: 5,
    status: 'online',
    stationedFleet: {
      lightFighters: 800,
      heavyCruisers: 150,
      battleships: 65,
      battlecruisers: 28,
      deathstars: 3,
      largeCargos: 320,
      recyclers: 120,
    },
  },
  {
    id: 'relay-pegasus-sanctuary',
    name: 'Pegasus Sanctuary Hub [Colony Moon Theta]',
    hubType: 'Planetary Ring',
    sectorCoordinates: '[5:50:3]',
    level: 2,
    maxFleetDisplacement: 12000,
    capacitorCharge: 100,
    cooldownSeconds: 0,
    maxCooldownSeconds: 150,
    quantumCoolantLevel: 2,
    tachyonStabilizerLevel: 2,
    status: 'online',
    stationedFleet: {
      lightFighters: 110,
      heavyCruisers: 18,
      battleships: 5,
      battlecruisers: 2,
      deathstars: 0,
      largeCargos: 60,
      recyclers: 15,
    },
  },
];

// -------------------------------------------------------------
// Ancient Control Crystals
// -------------------------------------------------------------
export const ANCIENT_CRYSTALS: AncientControlCrystal[] = [
  {
    id: 'cryst-dhd-master',
    name: 'First-Road Caller Stone',
    rarity: 'Elder Relic',
    effect: 'Sets road-marks 60% faster and removes the Crown offering for a known path.',
    installed: true,
    socket: 'dhd_core',
    boostValue: '-60% Marking Time',
  },
  {
    id: 'cryst-zpm-fragment',
    name: 'Emberheart Aether Shard',
    rarity: 'Dawnshard',
    effect: 'Opens the longest old roads between the far marches and distant great realms.',
    installed: true,
    socket: 'dhd_core',
    boostValue: '+Far Roads Unlocked',
  },
  {
    id: 'cryst-tachyon-flux',
    name: 'Leyroad Resonance Prism',
    rarity: 'Elder Relic',
    effect: 'Cuts the reawakening time of paired waystones in half across the realm.',
    installed: true,
    socket: 'jump_capacitor',
    boostValue: '-50% Reawakening Time',
  },
  {
    id: 'cryst-harmonics',
    name: 'Oathward Glass Seal',
    rarity: 'Elder Relic',
    effect: 'Strengthens a waystone’s oathward against hostile engines and spellfire.',
    installed: false,
    socket: 'shield_harmonics',
    boostValue: '+100% Oathward Strength',
  },
];

// -------------------------------------------------------------
// Supergate Singularity
// -------------------------------------------------------------
export const INITIAL_SUPERGATE: SupergateSingularity = {
  id: 'supergate-ori-prime',
  name: 'Crownstone of First Light',
  segmentsAssembled: 90,
  microSingularityMass: 1.4, // solar masses
  status: 'singularity_active',
  crossGalaxyEnergy: 100000,
  darkMatterHarvestRate: 45, // per turn
};
