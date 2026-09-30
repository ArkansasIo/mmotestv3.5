export interface MothershipTheme {
  id: string;
  name: string;
  category: 'Imperial' | 'Alien' | 'High-Tech' | 'Tactical' | 'Ancient' | 'Cybernetic';
  tagline: string;
  accentBadge: string;
  primaryColor: string;
  secondaryColor: string;
  accentGlow: string;
  conduitColor: string;
  cardBg: string;
  borderColor: string;
  hullPatternName: string;
  statBonus: {
    label: string;
    description: string;
    hullBonusPct: number;
    shieldBonusPct: number;
    alphaBonusPct: number;
    turnDiscountPct: number;
    gloryBonusPct: number;
  };
  unlockCostGlory: number;
  unlockCostNaquadah: number;
  unlockedByDefault: boolean;
  flavorText: string;
  visualPreview: {
    shipSilhouetteBg: string;
    shieldAuraClass: string;
    glowStyle: string;
  };
}

export const MOTHERSHIP_THEMES: MothershipTheme[] = [
  {
    id: 'theme_imperial_obsidian',
    name: 'Crownroad Blackstone & Gilt',
    category: 'Imperial',
    tagline: 'Blackstone ribs and gilded oathwork mark a vessel in service to the High Crown.',
    accentBadge: '👑 CROWNWARD BANNER',
    primaryColor: '#111111',
    secondaryColor: '#f59e0b',
    accentGlow: '#fbbf24',
    conduitColor: '#f59e0b',
    cardBg: '#18181b',
    borderColor: '#d97706',
    hullPatternName: 'Blackstone Ribs & Gilded Oathwork',
    statBonus: {
      label: '+10% Command Aura & +5% Opening Strike',
      description: 'The High Crown’s colors steady sworn companies and sharpen their first volley.',
      hullBonusPct: 5,
      shieldBonusPct: 5,
      alphaBonusPct: 5,
      turnDiscountPct: 0,
      gloryBonusPct: 15,
    },
    unlockCostGlory: 0,
    unlockCostNaquadah: 0,
    unlockedByDefault: true,
    flavorText: 'The Crownward livery pairs polished blackstone with gold leaf and the names of every oath the vessel has kept.',
    visualPreview: {
      shipSilhouetteBg: 'linear-gradient(135deg, #18181b 0%, #09090b 100%)',
      shieldAuraClass: 'ring-2 ring-amber-500/50 shadow-[0_0_25px_rgba(245,158,11,0.3)]',
      glowStyle: 'rgba(245, 158, 11, 0.4)',
    },
  },
  {
    id: 'theme_neon_cyberpunk',
    name: 'Aurora Lanterns & Starlit Glass',
    category: 'Cybernetic',
    tagline: 'Colored glass lanterns and pale runes brighten a roadwise vessel.',
    accentBadge: '⚡ AURORA WARD',
    primaryColor: '#090d16',
    secondaryColor: '#06b6d4',
    accentGlow: '#ec4899',
    conduitColor: '#06b6d4',
    cardBg: '#0f172a',
    borderColor: '#06b6d4',
    hullPatternName: 'Lantern Glass & Moonlit Rune Lines',
    statBonus: {
      label: '+12% Leyroad Pace & +8% Ward Renewal',
      description: 'Lanternwrights tune the vessel’s road-marks to answer more quickly and renew its wards.',
      hullBonusPct: 0,
      shieldBonusPct: 8,
      alphaBonusPct: 6,
      turnDiscountPct: 10,
      gloryBonusPct: 5,
    },
    unlockCostGlory: 120,
    unlockCostNaquadah: 150000,
    unlockedByDefault: false,
    flavorText: 'Made for night crossings: glass lanterns shift color when a safe road is near and dim when a path is broken.',
    visualPreview: {
      shipSilhouetteBg: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
      shieldAuraClass: 'ring-2 ring-cyan-400/60 shadow-[0_0_30px_rgba(6,182,212,0.4)]',
      glowStyle: 'rgba(6, 182, 212, 0.5)',
    },
  },
  {
    id: 'theme_precursor_bio',
    name: 'Greenroot Bark & Living Runes',
    category: 'Alien',
    tagline: 'A living bark shell mended by rootwardens and quiet green runes.',
    accentBadge: '🌿 GREENVEIL WARD',
    primaryColor: '#052e16',
    secondaryColor: '#10b981',
    accentGlow: '#34d399',
    conduitColor: '#10b981',
    cardBg: '#064e3b',
    borderColor: '#10b981',
    hullPatternName: 'Living Bark Panels & Glowcap Sigils',
    statBonus: {
      label: '+15% Keel Strength & +10% Passive Mending',
      description: 'Root-bound repair crews close small fractures during a long voyage.',
      hullBonusPct: 15,
      shieldBonusPct: 5,
      alphaBonusPct: 0,
      turnDiscountPct: 5,
      gloryBonusPct: 10,
    },
    unlockCostGlory: 250,
    unlockCostNaquadah: 320000,
    unlockedByDefault: false,
    flavorText: 'Harvested with permission from a living grove, the bark grows stronger where wardens tend it and weaker where it is neglected.',
    visualPreview: {
      shipSilhouetteBg: 'linear-gradient(135deg, #022c22 0%, #064e3b 100%)',
      shieldAuraClass: 'ring-2 ring-emerald-400/60 shadow-[0_0_30px_rgba(16,185,129,0.4)]',
      glowStyle: 'rgba(16, 185, 129, 0.5)',
    },
  },
  {
    id: 'theme_stealth_matte',
    name: 'Gloamveil Black & Lantern Red',
    category: 'Tactical',
    tagline: 'A lightless hull marked by a single crimson lantern for hidden marches.',
    accentBadge: '🕯 GLOAMVEIL PATH',
    primaryColor: '#09090b',
    secondaryColor: '#ef4444',
    accentGlow: '#f87171',
    conduitColor: '#ef4444',
    cardBg: '#18181b',
    borderColor: '#ef4444',
    hullPatternName: 'Shadowfelt Plates & Hooded Lantern Glass',
    statBonus: {
      label: '+14% First Strike & +10% Scoutcraft',
      description: 'Matte shadowfelt hides the vessel from distant lookouts until its banner is raised.',
      hullBonusPct: 0,
      shieldBonusPct: 5,
      alphaBonusPct: 14,
      turnDiscountPct: 5,
      gloryBonusPct: 10,
    },
    unlockCostGlory: 180,
    unlockCostNaquadah: 220000,
    unlockedByDefault: false,
    flavorText: 'Pathfinders use this livery on night roads where a bright hull could draw raiders toward a sleeping village.',
    visualPreview: {
      shipSilhouetteBg: 'linear-gradient(135deg, #09090b 0%, #1c1917 100%)',
      shieldAuraClass: 'ring-2 ring-red-600/50 shadow-[0_0_25px_rgba(239,68,68,0.35)]',
      glowStyle: 'rgba(239, 68, 68, 0.45)',
    },
  },
  {
    id: 'theme_solar_paladin',
    name: 'Dawnfire Enamel & Sunward Copper',
    category: 'Imperial',
    tagline: 'Bright enamel and copper wards reflect the first light of day.',
    accentBadge: '☀️ DAWNFIRE WARD',
    primaryColor: '#fafafa',
    secondaryColor: '#f97316',
    accentGlow: '#fb923c',
    conduitColor: '#f97316',
    cardBg: '#f4f4f5',
    borderColor: '#ea580c',
    hullPatternName: 'Dawnfire Enamel & Copper Sunmarks',
    statBonus: {
      label: '+12% Armor Resistance & +8% Company Might',
      description: 'Layered enamel and copper work turn aside heat, arrows, and glancing siege blows.',
      hullBonusPct: 8,
      shieldBonusPct: 8,
      alphaBonusPct: 6,
      turnDiscountPct: 0,
      gloryBonusPct: 8,
    },
    unlockCostGlory: 140,
    unlockCostNaquadah: 180000,
    unlockedByDefault: false,
    flavorText: 'Sunward Hospitallers favor these bright marks because allies can find their refuge ship through smoke and rain.',
    visualPreview: {
      shipSilhouetteBg: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      shieldAuraClass: 'ring-2 ring-orange-500/60 shadow-[0_0_25px_rgba(249,115,22,0.35)]',
      glowStyle: 'rgba(249, 115, 22, 0.4)',
    },
  },
  {
    id: 'theme_asgard_crystal',
    name: 'Ironroot Moonstone & Silversteel',
    category: 'Ancient',
    tagline: 'A deepdelve shell cut with moonstone and silversteel rune bands.',
    accentBadge: '❄ IRONROOT MASTERWORK',
    primaryColor: '#0f172a',
    secondaryColor: '#38bdf8',
    accentGlow: '#7dd3fc',
    conduitColor: '#38bdf8',
    cardBg: '#1e293b',
    borderColor: '#38bdf8',
    hullPatternName: 'Moonstone Lattice & Silversteel Oathmarks',
    statBonus: {
      label: '+15% Ward Strength & -20% Leyroad Aether Cost',
      description: 'Moonstone channels steady warding power and helps the Caller Stone find a known road.',
      hullBonusPct: 6,
      shieldBonusPct: 15,
      alphaBonusPct: 6,
      turnDiscountPct: 15,
      gloryBonusPct: 12,
    },
    unlockCostGlory: 300,
    unlockCostNaquadah: 450000,
    unlockedByDefault: false,
    flavorText: 'Ironroot smiths cut each stone to fit its socket by hand. No two silversteel bands share the same rune pattern.',
    visualPreview: {
      shipSilhouetteBg: 'linear-gradient(135deg, #0f172a 0%, #0369a1 100%)',
      shieldAuraClass: 'ring-2 ring-sky-400/60 shadow-[0_0_35px_rgba(56,189,248,0.5)]',
      glowStyle: 'rgba(56, 189, 248, 0.5)',
    },
  },
  {
    id: 'theme_chrono_singularity',
    name: 'Emberfall Gilt & Hourglass Rune',
    category: 'High-Tech',
    tagline: 'An hourglass sigil surrounds a warm ember sealed beneath gilt glass.',
    accentBadge: '⏳ TIMEWORN OATH',
    primaryColor: '#1c1917',
    secondaryColor: '#eab308',
    accentGlow: '#fde047',
    conduitColor: '#eab308',
    cardBg: '#292524',
    borderColor: '#ca8a04',
    hullPatternName: 'Hourglass Marks & Amber Wardglass',
    statBonus: {
      label: '+20% Siege Lance Charge & +10% Expedition Pace',
      description: 'Hourglass runes preserve the crew’s strength and hasten the next siege-lance charge.',
      hullBonusPct: 10,
      shieldBonusPct: 10,
      alphaBonusPct: 12,
      turnDiscountPct: 15,
      gloryBonusPct: 20,
    },
    unlockCostGlory: 400,
    unlockCostNaquadah: 650000,
    unlockedByDefault: false,
    flavorText: 'The ember is said to remember a road before it was broken; the keepers do not claim to know how.',
    visualPreview: {
      shipSilhouetteBg: 'linear-gradient(135deg, #292524 0%, #451a03 100%)',
      shieldAuraClass: 'ring-2 ring-yellow-400/70 shadow-[0_0_35px_rgba(234,179,8,0.5)]',
      glowStyle: 'rgba(234, 179, 8, 0.55)',
    },
  },
];

export interface MothershipChassisClass {
  id: string;
  name: string;
  tier: number;
  hullType: 'dreadnought' | 'fortress' | 'titan' | 'carrier' | 'world_breaker' | 'sovereign';
  hullHp: number;
  shieldHp: number;
  powergridMw: number;
  commandPoints: number;
  hangarCapacity: number;
  alphaStrike: number;
  warpFactor: number;
  unlockRequirement: string;
  costNaquadah: number;
  costDeuterium: number;
  description: string;
  badge: string;
  specialAbility: string;
}

export interface BridgeOfficer {
  id: string;
  station: string;
  name: string;
  title: string;
  rank: string;
  level: number;
  maxLevel: number;
  avatar: string;
  specialty: string;
  primaryStat: string;
  bonusSummary: string;
  promotionCostCp: number;
}

export interface HangarWing {
  id: string;
  name: string;
  role: 'interceptor' | 'bomber' | 'torpedo' | 'drone';
  count: number;
  maxCount: number;
  hullPerUnit: number;
  dpsPerUnit: number;
  restockCostMetal: number;
  restockCostCrystal: number;
  restockCostDeut: number;
  description: string;
  doctrine: 'balanced' | 'aggressive' | 'defensive' | 'salvage';
}

export interface DeepSpaceSector {
  id: string;
  name: string;
  coordinate: string;
  hazardLevel: 'low' | 'moderate' | 'high' | 'catastrophic' | 'extreme';
  type: string;
  description: string;
  fuelCostTurns: number;
  potentialRewards: string[];
  anomaliesDetected: number;
}

export interface DeepSpaceAnomalyEvent {
  id: string;
  title: string;
  sectorName: string;
  briefing: string;
  hazard: string;
  options: {
    label: string;
    description: string;
    requirement?: string;
    outcomeType: 'resource' | 'technology' | 'artifact' | 'damage';
    successChance: number;
    rewards: {
      naquadah?: number;
      metal?: number;
      crystal?: number;
      deuterium?: number;
      glory?: number;
      turns?: number;
      text: string;
    };
  }[];
}

export const MOTHERSHIP_CHASSIS_CLASSES: MothershipChassisClass[] = [
  {
    id: 'chassis_vanguard',
    name: 'Crownroad Warden Galley',
    tier: 1,
    hullType: 'dreadnought',
    hullHp: 185000,
    shieldHp: 95000,
    powergridMw: 14500,
    commandPoints: 120,
    hangarCapacity: 24,
    alphaStrike: 18500,
    warpFactor: 7.2,
    unlockRequirement: 'A Royal Warforge Commission',
    costNaquadah: 50000,
    costDeuterium: 15000,
    description: 'A tried-and-true command galley with a reinforced keel, four great ballistae, and berths for escort companies.',
    badge: '⚓ CROWNROAD WARDEN',
    specialAbility: 'First Volley: +15% opening strike power',
  },
  {
    id: 'chassis_leviathan',
    name: 'Oldroot Citadel Barge',
    tier: 2,
    hullType: 'fortress',
    hullHp: 340000,
    shieldHp: 210000,
    powergridMw: 26000,
    commandPoints: 180,
    hangarCapacity: 48,
    alphaStrike: 32000,
    warpFactor: 6.8,
    unlockRequirement: 'Warforge Level 8 + Oathmail Craft 6',
    costNaquadah: 180000,
    costDeuterium: 45000,
    description: 'A moving keep with paired dragonfire engines and layered oathwards, built to shelter a host through a long siege.',
    badge: '🛡 OLDROOT CITADEL',
    specialAbility: 'Hearthward Aegis: Converts 20% incoming harm into renewed wards',
  },
  {
    id: 'chassis_chronos',
    name: 'Waystone Crownship',
    tier: 3,
    hullType: 'titan',
    hullHp: 580000,
    shieldHp: 390000,
    powergridMw: 44000,
    commandPoints: 260,
    hangarCapacity: 72,
    alphaStrike: 56000,
    warpFactor: 9.4,
    unlockRequirement: 'Leyroad Wayfinding 8 + 500 Renown',
    costNaquadah: 380000,
    costDeuterium: 95000,
    description: 'A crownstone at the vessel’s heart binds known waystones and carries a sworn company along an old road.',
    badge: '⚡ WAYSTONE CROWNSHIP',
    specialAbility: 'Old Road Passage: Reduces march-order and Aether costs by 35%',
  },
  {
    id: 'chassis_eclipse',
    name: 'Eclipse Banner Barge',
    tier: 4,
    hullType: 'carrier',
    hullHp: 890000,
    shieldHp: 620000,
    powergridMw: 68000,
    commandPoints: 350,
    hangarCapacity: 144,
    alphaStrike: 88000,
    warpFactor: 8.6,
    unlockRequirement: 'Mothership Modules Total Lv 25 + Glory 1,200',
    costNaquadah: 750000,
    costDeuterium: 210000,
    description: 'A vast sky-barge carrying several retinue companies and a crownfire siege lance behind a warded deck.',
    badge: '🌘 ECLIPSE BANNER BARGE',
    specialAbility: 'Bannerfall Charge: Deploys 4 companies with a guaranteed critical opening',
  },
  {
    id: 'chassis_ragnarok',
    name: 'Emberfall Siege Fortress',
    tier: 5,
    hullType: 'world_breaker',
    hullHp: 1450000,
    shieldHp: 1100000,
    powergridMw: 115000,
    commandPoints: 500,
    hangarCapacity: 216,
    alphaStrike: 154000,
    warpFactor: 8.2,
    unlockRequirement: 'Crown Rank 8 + Great Warforge Arsenal',
    costNaquadah: 1500000,
    costDeuterium: 480000,
    description: 'A legendary moving fortress whose engines can break a keep’s outer wards and open a path for the host.',
    badge: '☄ EMBERFALL SIEGE FORTRESS',
    specialAbility: 'Gatebreaker: Siege strikes ignore 75% of keep wards',
  },
  {
    id: 'chassis_sovereign',
    name: 'First-Hearth Sovereign',
    tier: 6,
    hullType: 'sovereign',
    hullHp: 2600000,
    shieldHp: 2100000,
    powergridMw: 240000,
    commandPoints: 800,
    hangarCapacity: 360,
    alphaStrike: 290000,
    warpFactor: 12.0,
    unlockRequirement: 'First Hearth Barrow Opened + 2,500 Renown',
    costNaquadah: 3500000,
    costDeuterium: 1200000,
    description: 'A vessel of elder craft, raised from living timber, oath-iron, and moonstone wards shared by the nine crowns.',
    badge: '👑 FIRST-HEARTH SOVEREIGN',
    specialAbility: 'First Light: Restores 5% keel and ward strength each battle round',
  },
];

export const INITIAL_BRIDGE_OFFICERS: BridgeOfficer[] = [
  {
    id: 'off_admiral',
    station: 'War Council',
    name: 'High Marshal Darius Blackthorn',
    title: 'Commander of the Nine-Crown Host',
    rank: 'High Marshal (Rank 5)',
    level: 4,
    maxLevel: 10,
    avatar: '👨‍✈️',
    specialty: 'Retinue Command & Battle Formations',
    primaryStat: 'Command Aura +24%',
    bonusSummary: '+20% Retinue Volley & +150 Command Points',
    promotionCostCp: 85,
  },
  {
    id: 'off_tactical',
    station: 'Arms & Battlecraft',
    name: 'Captain Elira Sunlance',
    title: 'Master of Bows and Siege Engines',
    rank: 'Master Bowyer (Rank 4)',
    level: 3,
    maxLevel: 10,
    avatar: '👩‍✈️',
    specialty: 'Siege Lances & Precise Targeting',
    primaryStat: 'Weapon Alpha +18%',
    bonusSummary: '+25% Siege Lance Might & +12% Critical Strike Chance',
    promotionCostCp: 65,
  },
  {
    id: 'off_engineer',
    station: 'Hearth & Wardcraft',
    name: 'Rune-Master Nara Ironroot',
    title: 'Keeper of the Hearthstone',
    rank: 'Master Wardwright (Rank 4)',
    level: 4,
    maxLevel: 10,
    avatar: '🧑‍🔧',
    specialty: 'Leyline Power & Runeglyph Mending',
    primaryStat: 'Capacitor Output +28%',
    bonusSummary: '+30% Ward Renewal & Automatic 500 Keel Mending per second',
    promotionCostCp: 75,
  },
  {
    id: 'off_helm',
    station: 'Wayfinding & Roads',
    name: 'Wayfinder Tessa Vale',
    title: 'Keeper of the Old Roads',
    rank: 'Senior Wayfinder (Rank 3)',
    level: 3,
    maxLevel: 10,
    avatar: '🧑‍🚀',
    specialty: 'Leyroad and Waystone Navigation',
    primaryStat: 'Warp Speed +22%',
    bonusSummary: '-20% Aether cost on long-road crossings',
    promotionCostCp: 55,
  },
  {
    id: 'off_science',
    station: 'Lore & Reconnaissance',
    name: 'Scribe Lethiel Moonwell',
    title: 'Keeper of the March Almanac',
    rank: 'Royal Loremaster (Rank 4)',
    level: 4,
    maxLevel: 10,
    avatar: '👩‍🔬',
    specialty: 'Far-March Relics & Broken Leyroads',
    primaryStat: 'Recon Scanners +35%',
    bonusSummary: '+45% Resource and Relic Finds on Expeditions',
    promotionCostCp: 70,
  },
  {
    id: 'off_hangar',
    station: 'Retinue Muster',
    name: 'Captain Jorren Ashhand',
    title: 'Master of the Vanguard',
    rank: 'Warband Captain (Rank 3)',
    level: 3,
    maxLevel: 10,
    avatar: '🦅',
    specialty: 'Sky-Barge Tactics & Scout Companies',
    primaryStat: 'Sortie Velocity +20%',
    bonusSummary: '+25% Vanguard Might & Swift Warforge Muster',
    promotionCostCp: 60,
  },
];

export const INITIAL_HANGAR_WINGS: HangarWing[] = [
  {
    id: 'wing_valkyrie',
    name: 'Silverwood Sky-Riders',
    role: 'interceptor',
    count: 36,
    maxCount: 60,
    hullPerUnit: 1200,
    dpsPerUnit: 180,
    restockCostMetal: 12000,
    restockCostCrystal: 8000,
    restockCostDeut: 3000,
    description: 'Swift gliders steered by Sylvan outriders and fitted with paired sunlances for escort duty.',
    doctrine: 'balanced',
  },
  {
    id: 'wing_shadow_bombers',
    name: 'Ashen Dragonfire Barges',
    role: 'bomber',
    count: 24,
    maxCount: 40,
    hullPerUnit: 3400,
    dpsPerUnit: 480,
    restockCostMetal: 24000,
    restockCostCrystal: 18000,
    restockCostDeut: 8500,
    description: 'Armored siege skiffs carry dragonfire jars and gate-breaking charges to a besieged keep.',
    doctrine: 'aggressive',
  },
  {
    id: 'wing_torpedo_skiffs',
    name: 'Gloamveil Lantern Skiffs',
    role: 'torpedo',
    count: 18,
    maxCount: 30,
    hullPerUnit: 2800,
    dpsPerUnit: 360,
    restockCostMetal: 18000,
    restockCostCrystal: 14000,
    restockCostDeut: 6000,
    description: 'Shadowed river skiffs slip past the watch and deliver oathbound outriders to an unguarded crossing.',
    doctrine: 'aggressive',
  },
  {
    id: 'wing_salvage_drones',
    name: 'Ironroot Salvage Golems',
    role: 'drone',
    count: 48,
    maxCount: 80,
    hullPerUnit: 800,
    dpsPerUnit: 60,
    restockCostMetal: 8000,
    restockCostCrystal: 5000,
    restockCostDeut: 2000,
    description: 'Rune-bound crews recover sound timber and iron after battle, then mend the retinue’s damaged gear.',
    doctrine: 'salvage',
  },
];

export const DEEP_SPACE_SECTORS: DeepSpaceSector[] = [
  {
    id: 'sec_graveyard',
    name: 'Shattered Barrows: Field of Broken Oaths',
    coordinate: '0:00:1:0',
    hazardLevel: 'moderate',
    type: 'Oathbarrow Fields',
    description: 'A quiet moor strewn with ruined standards and oath-iron from old crown wars. Delvers often recover sound tools beneath the cairns.',
    fuelCostTurns: 1,
    potentialRewards: ['Old Warforge Patterns', '45,000 - 120,000 Crowns', 'Elder Relic Cores'],
    anomaliesDetected: 3,
  },
  {
    id: 'sec_pulsar',
    name: 'Emberfall Ridge: The Singing Storm',
    coordinate: '3:88:9:4',
    hazardLevel: 'high',
    type: 'Leyline Tempest',
    description: 'A storm rolls through a broken leyline and rattles every ward. Prepared wayfinders can gather Aether and moonstone from the charged rain.',
    fuelCostTurns: 1,
    potentialRewards: ['Relic Dust', '60,000 Aether', 'Runeward Patterns'],
    anomaliesDetected: 4,
  },
  {
    id: 'sec_precursor',
    name: 'Elderstone Frontier: The Sealed Archive',
    coordinate: '7:14:2:8',
    hazardLevel: 'catastrophic',
    type: 'Warded Elder Archive',
    description: 'A ring of ruined keeps circles a quiet valley. Rune-guardians protect the archive within and test every visitor’s purpose.',
    fuelCostTurns: 2,
    potentialRewards: ['First-Hearth Relics', '150,000 Crowns', '150 Renown'],
    anomaliesDetected: 5,
  },
  {
    id: 'sec_leviathan',
    name: 'Whispering Fen: The Deepfen Wyrm Nest',
    coordinate: '9:99:9:9',
    hazardLevel: 'extreme',
    type: 'Deepfen Wyrm Warren',
    description: 'Ancient marsh wyrms gather near a warm spring beneath the reeds. The hunt is perilous, but shed scales and rare herbs can be recovered.',
    fuelCostTurns: 2,
    potentialRewards: ['Wyrm-Scale Harness', '250,000 in Stores', 'Wyrm-Crown Trophy'],
    anomaliesDetected: 2,
  },
];

export const DEEP_SPACE_ANOMALIES: DeepSpaceAnomalyEvent[] = [
  {
    id: 'anom_derelict_titan',
    title: 'Forgotten Crownward Barge Discovered',
    sectorName: 'Shattered Barrows: Field of Broken Oaths',
    briefing: 'A great barge lies beneath a broken cairn. Its hearth has gone cold, but sealed vaults and old muster rolls may remain inside.',
    hazard: 'Sleeping Ward Engines & Unstable Barrows',
    options: [
      {
        label: 'Send a Shieldwall through the Gate',
        description: 'A veteran company secures the hall and returns its old muster rolls to the Crownroad archive.',
        requirement: 'War Captain Level 2+',
        outcomeType: 'resource',
        successChance: 0.85,
        rewards: {
          naquadah: 85000,
          metal: 120000,
          glory: 45,
          text: 'Wardens disarmed the sleeping engines and recovered 85,000 Crowns, 120,000 Iron, and a battle ledger.',
        },
      },
      {
        label: 'Recover the Hearthstone with Delver Crews',
        description: 'Rune-smiths brace the old hearth and carry its remaining Aether salts to safety.',
        requirement: 'Master Delver Level 3+',
        outcomeType: 'technology',
        successChance: 0.9,
        rewards: {
          deuterium: 65000,
          crystal: 95000,
          glory: 35,
          text: 'Delvers recovered sealed Aether flasks and moonstone lenses: 65,000 Aether and 95,000 Moonstone.',
        },
      },
      {
        label: 'Read the Old Rune-Marks',
        description: 'Scribes copy the ward lines and add their findings to the realm’s shared lore.',
        outcomeType: 'technology',
        successChance: 1.0,
        rewards: {
          glory: 60,
          turns: 2,
          text: 'Scribes deciphered the old road ledger, earning 60 Renown and 2 March Orders.',
        },
      },
    ],
  },
  {
    id: 'anom_dark_matter_rift',
    title: 'Broken Leyroad in the Singing Storm',
    sectorName: 'Emberfall Ridge: The Singing Storm',
    briefing: 'A broken road spits sparks of raw Aether into a storm of glassy rain. The waystone marks change each time the thunder rolls.',
    hazard: 'Ward Failure & Shifting Road-Marks',
    options: [
      {
        label: 'Raise a Veilward to Gather Moonstone',
        description: 'Wardwrights tune the vessel’s oathmarks to catch the charged rain without breaking the road.',
        outcomeType: 'resource',
        successChance: 0.8,
        rewards: {
          crystal: 140000,
          deuterium: 75000,
          naquadah: 50000,
          text: 'The ward caught a rich fall of moonstone and Aether salts: 140,000 Moonstone and 75,000 Aether.',
        },
      },
      {
        label: 'Send Lantern Scouts to Chart the Storm',
        description: 'Scouts map the safe path between thunderclaps and mark it for later companies.',
        outcomeType: 'technology',
        successChance: 0.95,
        rewards: {
          turns: 4,
          glory: 50,
          text: 'The scout map reveals a safer road: gained 4 March Orders and 50 Renown.',
        },
      },
    ],
  },
  {
    id: 'anom_precursor_sentinel',
    title: 'Elderstone Ward Guardian Awakes',
    sectorName: 'Elderstone Frontier: The Sealed Archive',
    briefing: 'A tall stone guardian wakes as the company approaches the sealed archive. Its rune-lance turns toward the Crownward banner.',
    hazard: 'Runelance Volley',
    options: [
      {
        label: 'Raise the Banner and Strike',
        description: 'The vanguard breaks the guardian’s outer ward before it can bar the archive door.',
        outcomeType: 'resource',
        successChance: 0.75,
        rewards: {
          naquadah: 180000,
          metal: 200000,
          glory: 120,
          text: 'The guardian fell beneath the vanguard. Recovered 180,000 Crowns, 200,000 Iron, and 120 Renown.',
        },
      },
      {
        label: 'Offer the Warden’s Seal',
        description: 'Present the First-Road seal and seek safe entry instead of opening a fight.',
        outcomeType: 'artifact',
        successChance: 0.85,
        rewards: {
          naquadah: 110000,
          glory: 90,
          turns: 3,
          text: 'Cipher accepted! Sentinel stood down, granting access to the Precursor Data Core (+110k Naquadah, 90 Glory, +3 Turns)!',
        },
      },
    ],
  },
];

// ============================================================================
// FLAGSHIP HARDPOINTS, WEAPONS FITTING & CARRIER SORTIES
// ============================================================================

export type HardpointSlotType = 'spinal' | 'dorsal' | 'point_defense' | 'auxiliary';

export interface FlagshipWeaponItem {
  id: string;
  name: string;
  slotType: HardpointSlotType;
  tier: number;
  icon: string;
  damageType: string;
  dps: number;
  alphaStrike: number;
  shieldBonusPct: number;
  armorPenetrationPct: number;
  powerDrawMW: number;
  upgradeCost: {
    credits: number;
    metal: number;
    crystal: number;
    deuterium: number;
    naquadah: number;
  };
  description: string;
}

export interface FlagshipHardpointSlot {
  slotId: string;
  slotName: string;
  slotType: HardpointSlotType;
  equippedWeaponId: string | null;
  level: number;
  powerAllocatedPct: number;
}

export interface CarrierSortieMission {
  id: string;
  name: string;
  targetSector: string;
  threatLevel: 'low' | 'medium' | 'high' | 'deadly';
  requiredWingRole: 'interceptor' | 'bomber' | 'torpedo' | 'drone' | 'any';
  minCraftCount: number;
  durationSec: number;
  rewards: {
    credits: number;
    naquadah: number;
    metal: number;
    crystal: number;
    deuterium: number;
    darkMatter?: number;
    glory: number;
  };
  description: string;
  flavor: string;
}

export interface FlagshipMilestoneAchievement {
  id: string;
  title: string;
  description: string;
  tier: number;
  progressCurrent: number;
  progressTarget: number;
  unit: string;
  isUnlocked: boolean;
  rewardGlory: number;
  rewardCredits: number;
  rewardBonusText: string;
}

export const FLAGSHIP_WEAPON_CATALOG: FlagshipWeaponItem[] = [
  // 1. SPINAL MOUNT SUPERWEAPONS
  {
    id: 'wpn_chrono_lance',
    name: 'Crownfire Siege Lance',
    slotType: 'spinal',
    tier: 4,
    icon: '⚡',
    damageType: 'Dragonfire',
    dps: 18500,
    alphaStrike: 120000,
    shieldBonusPct: 35,
    armorPenetrationPct: 85,
    powerDrawMW: 450,
    upgradeCost: { credits: 150000, metal: 120000, crystal: 90000, deuterium: 60000, naquadah: 25000 },
    description: 'Focuses a crownstone’s stored flame into a ward-piercing lance against a distant keep or war-engine.',
  },
  {
    id: 'wpn_singularity_devastator',
    name: 'Hearthstone Devastator',
    slotType: 'spinal',
    tier: 5,
    icon: '🌀',
    damageType: 'Voidflame',
    dps: 26000,
    alphaStrike: 180000,
    shieldBonusPct: 50,
    armorPenetrationPct: 95,
    powerDrawMW: 650,
    upgradeCost: { credits: 280000, metal: 220000, crystal: 180000, deuterium: 110000, naquadah: 50000 },
    description: 'Sends a contained voidflame charge through the weakest point in an enemy citadel’s outer ward.',
  },
  {
    id: 'wpn_antimatter_accelerator',
    name: 'Oath-Iron Gatebreaker',
    slotType: 'spinal',
    tier: 3,
    icon: '💥',
    damageType: 'Siege',
    dps: 14000,
    alphaStrike: 90000,
    shieldBonusPct: 20,
    armorPenetrationPct: 70,
    powerDrawMW: 320,
    upgradeCost: { credits: 90000, metal: 75000, crystal: 55000, deuterium: 35000, naquadah: 15000 },
    description: 'Hurls a heavy oath-iron bolt built to crack the gate of a fortified keep.',
  },

  // 2. DORSAL HEAVY BATTERIES
  {
    id: 'wpn_heavy_ion_turret',
    name: 'Twin Sunlance Battery',
    slotType: 'dorsal',
    tier: 3,
    icon: '💠',
    damageType: 'Energy',
    dps: 6800,
    alphaStrike: 32000,
    shieldBonusPct: 80,
    armorPenetrationPct: 30,
    powerDrawMW: 180,
    upgradeCost: { credits: 45000, metal: 40000, crystal: 30000, deuterium: 15000, naquadah: 8000 },
    description: 'Paired crystal lenses cast bright strikes that weaken a hostile company’s ward line.',
  },
  {
    id: 'wpn_plasma_accelerator',
    name: 'Dragonfire Engine',
    slotType: 'dorsal',
    tier: 3,
    icon: '🔥',
    damageType: 'Energy',
    dps: 8200,
    alphaStrike: 45000,
    shieldBonusPct: 25,
    armorPenetrationPct: 75,
    powerDrawMW: 210,
    upgradeCost: { credits: 60000, metal: 50000, crystal: 38000, deuterium: 20000, naquadah: 10000 },
    description: 'A sealed dragon-glass hearth launches contained fire against the hulls and harness of a siege host.',
  },
  {
    id: 'wpn_proton_torpedo_silo',
    name: 'Amberfire Jar Rack',
    slotType: 'dorsal',
    tier: 4,
    icon: '🚀',
    damageType: 'Kinetic',
    dps: 9500,
    alphaStrike: 58000,
    shieldBonusPct: 15,
    armorPenetrationPct: 90,
    powerDrawMW: 140,
    upgradeCost: { credits: 85000, metal: 70000, crystal: 45000, deuterium: 28000, naquadah: 12000 },
    description: 'Hurls guided fire-jars over a wall or onto a siege engine before the enemy can close the range.',
  },

  // 3. POINT DEFENSE GRIDS
  {
    id: 'wpn_nanite_flak',
    name: 'Ironroot Stoneguard Array',
    slotType: 'point_defense',
    tier: 2,
    icon: '🛡️',
    damageType: 'Kinetic',
    dps: 3400,
    alphaStrike: 12000,
    shieldBonusPct: 10,
    armorPenetrationPct: 40,
    powerDrawMW: 80,
    upgradeCost: { credits: 25000, metal: 20000, crystal: 15000, deuterium: 5000, naquadah: 3000 },
    description: 'A rapid stone-and-bolt screen turns aside incoming arrows, hooks, and fire-jars.',
  },
  {
    id: 'wpn_phase_laser_pdc',
    name: 'Silverglass Ward-Lights',
    slotType: 'point_defense',
    tier: 3,
    icon: '✨',
    damageType: 'Energy',
    dps: 4800,
    alphaStrike: 18000,
    shieldBonusPct: 45,
    armorPenetrationPct: 50,
    powerDrawMW: 110,
    upgradeCost: { credits: 40000, metal: 32000, crystal: 24000, deuterium: 10000, naquadah: 5000 },
    description: 'Ward-lights pick out fast threats and break their approach with precise flashes of focused light.',
  },
  {
    id: 'wpn_emp_scatter_mesh',
    name: 'Stormbell Disruption Mesh',
    slotType: 'point_defense',
    tier: 4,
    icon: '🌐',
    damageType: 'Stormcraft',
    dps: 6200,
    alphaStrike: 24000,
    shieldBonusPct: 70,
    armorPenetrationPct: 20,
    powerDrawMW: 160,
    upgradeCost: { credits: 65000, metal: 48000, crystal: 36000, deuterium: 18000, naquadah: 9000 },
    description: 'A ring of storm-bells scrambles nearby signals and disrupts the timing of an enemy charge.',
  },

  // 4. AUXILIARY RACKS & INTERNAL SYSTEMS
  {
    id: 'wpn_nanite_auto_weaver',
    name: 'Runeglyph Keel-Menders',
    slotType: 'auxiliary',
    tier: 3,
    icon: '🧬',
    damageType: 'Runecraft',
    dps: 1500,
    alphaStrike: 0,
    shieldBonusPct: 20,
    armorPenetrationPct: 0,
    powerDrawMW: 95,
    upgradeCost: { credits: 35000, metal: 30000, crystal: 25000, deuterium: 12000, naquadah: 6000 },
    description: 'Bound repair runes knit small cracks in the keel throughout a battle.',
  },
  {
    id: 'wpn_zero_point_capacitor',
    name: 'First-Light Hearthstones',
    slotType: 'auxiliary',
    tier: 4,
    icon: '🔋',
    damageType: 'Energy',
    dps: 0,
    alphaStrike: 0,
    shieldBonusPct: 50,
    armorPenetrationPct: 0,
    powerDrawMW: -250, // Generates extra MW
    upgradeCost: { credits: 75000, metal: 55000, crystal: 45000, deuterium: 25000, naquadah: 10000 },
    description: 'Stores a calm dawnfire and feeds the great vessel’s war-engines when their wards are strained.',
  },
];

export const INITIAL_FLAGSHIP_HARDPOINTS: FlagshipHardpointSlot[] = [
  { slotId: 'hp_spinal_1', slotName: 'Crownfire Lance Mount Alpha', slotType: 'spinal', equippedWeaponId: 'wpn_chrono_lance', level: 1, powerAllocatedPct: 100 },
  { slotId: 'hp_spinal_2', slotName: 'Gatebreaker Mount Beta', slotType: 'spinal', equippedWeaponId: 'wpn_antimatter_accelerator', level: 1, powerAllocatedPct: 100 },
  { slotId: 'hp_dorsal_1', slotName: 'Sunlance Battery Port', slotType: 'dorsal', equippedWeaponId: 'wpn_heavy_ion_turret', level: 2, powerAllocatedPct: 100 },
  { slotId: 'hp_dorsal_2', slotName: 'Dragonfire Engine Starboard', slotType: 'dorsal', equippedWeaponId: 'wpn_plasma_accelerator', level: 2, powerAllocatedPct: 100 },
  { slotId: 'hp_pdc_1', slotName: 'Stoneguard Array Forward', slotType: 'point_defense', equippedWeaponId: 'wpn_nanite_flak', level: 1, powerAllocatedPct: 100 },
  { slotId: 'hp_pdc_2', slotName: 'Silverglass Ward-Lights Aft', slotType: 'point_defense', equippedWeaponId: 'wpn_phase_laser_pdc', level: 1, powerAllocatedPct: 100 },
  { slotId: 'hp_aux_1', slotName: 'Runeglyph Mender Rack', slotType: 'auxiliary', equippedWeaponId: 'wpn_nanite_auto_weaver', level: 1, powerAllocatedPct: 100 },
  { slotId: 'hp_aux_2', slotName: 'First-Light Hearthstone Rack', slotType: 'auxiliary', equippedWeaponId: 'wpn_zero_point_capacitor', level: 1, powerAllocatedPct: 100 },
];

export const INITIAL_SORTIE_MISSIONS: CarrierSortieMission[] = [
  {
    id: 'sortie_asteroid_raiders',
    name: 'Operation Amberroad Escort',
    targetSector: 'Three Wells Moor',
    threatLevel: 'low',
    requiredWingRole: 'interceptor',
    minCraftCount: 12,
    durationSec: 15,
    rewards: { credits: 25000, naquadah: 35000, metal: 50000, crystal: 30000, deuterium: 10000, glory: 25 },
    description: 'Send swift sky-riders to scatter raiders lying in wait along the caravan road.',
    flavor: 'Six hostile outriders have been sighted near the Amber Road supply train.',
  },
  {
    id: 'sortie_dreadnought_strike',
    name: 'Operation Blackglass Gatebreaker',
    targetSector: 'Red Banner Ford',
    threatLevel: 'high',
    requiredWingRole: 'bomber',
    minCraftCount: 16,
    durationSec: 30,
    rewards: { credits: 80000, naquadah: 110000, metal: 140000, crystal: 95000, deuterium: 45000, darkMatter: 50, glory: 75 },
    description: 'Send dragonfire barges to break the enemy ward and silence its command banner.',
    flavor: 'A rival warlord is fortifying the ford. The Crownroad Wardens need a path through before nightfall.',
  },
  {
    id: 'sortie_precursor_salvage',
    name: 'Operation Oldroot Archive',
    targetSector: 'Elderstone Frontier',
    threatLevel: 'medium',
    requiredWingRole: 'drone',
    minCraftCount: 24,
    durationSec: 20,
    rewards: { credits: 45000, naquadah: 65000, metal: 90000, crystal: 70000, deuterium: 35000, glory: 40 },
    description: 'Send Ironroot salvage golems into a sealed archive to recover rune plates and sound stonework.',
    flavor: 'The archive wards are fading, but the old patterns may yet be saved.',
  },
  {
    id: 'sortie_abyssal_strike',
    name: 'Operation Deepfen Wyrm Hunt',
    targetSector: 'Whispering Fen',
    threatLevel: 'deadly',
    requiredWingRole: 'torpedo',
    minCraftCount: 18,
    durationSec: 45,
    rewards: { credits: 150000, naquadah: 220000, metal: 280000, crystal: 190000, deuterium: 90000, darkMatter: 120, glory: 150 },
    description: 'Send Gloamveil skiffs to drive a marsh wyrm away from the fenward ferry crossing.',
    flavor: 'The beast sheds rare scales near an Aether spring, but the reed maze is treacherous.',
  },
];

export const FLAGSHIP_MILESTONES: FlagshipMilestoneAchievement[] = [
  {
    id: 'ms_battles_10',
    title: 'Crownward Vanguard Veteran',
    description: 'Survive 10 major battles with your great vessel and sworn company.',
    tier: 1,
    progressCurrent: 6,
    progressTarget: 10,
    unit: 'Battles',
    isUnlocked: false,
    rewardGlory: 100,
    rewardCredits: 50000,
    rewardBonusText: '+5% Keel Strength across all vessel fits',
  },
  {
    id: 'ms_sectors_5',
    title: 'Lantern Cartographer',
    description: 'Chart five broken roads or dangerous far marches.',
    tier: 1,
    progressCurrent: 3,
    progressTarget: 5,
    unit: 'Sectors',
    isUnlocked: false,
    rewardGlory: 120,
    rewardCredits: 60000,
    rewardBonusText: '-1 March Order on future expeditions',
  },
  {
    id: 'ms_lance_overcharge',
    title: 'Crownfire Keeper',
    description: 'Fire the Crownfire Siege Lance five times at full Hearthstone charge.',
    tier: 2,
    progressCurrent: 2,
    progressTarget: 5,
    unit: 'Discharges',
    isUnlocked: false,
    rewardGlory: 200,
    rewardCredits: 120000,
    rewardBonusText: '+20% Crownfire critical strike power',
  },
  {
    id: 'ms_hangar_wings_100',
    title: 'Master of the Crownward Host',
    description: 'Keep one hundred or more sworn companies ready aboard the great vessel.',
    tier: 2,
    progressCurrent: 126,
    progressTarget: 100,
    unit: 'Companies',
    isUnlocked: true,
    rewardGlory: 150,
    rewardCredits: 80000,
    rewardBonusText: '+15% Vanguard might and swift warforge muster',
  },
];

