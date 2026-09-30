export interface TeamMember {
  id: string;
  name: string;
  role: string;
  title: string;
  division: string;
  avatar: string;
  bio: string;
  contributions: string[];
  signatureWork?: string;
  socialBadge?: string;
}

export interface CreditCategory {
  id: string;
  categoryName: string;
  description: string;
  icon: string;
  members: TeamMember[];
}

export interface DevelopmentMilestone {
  version: string;
  date: string;
  codename: string;
  highlights: string[];
}

export const DEVELOPMENT_TEAM_CREDITS: CreditCategory[] = [
  {
    id: 'leadership',
    categoryName: 'Realm Stewardship & Direction',
    description: 'Guiding Eldoria’s world, its systems, and the ongoing browser-game prototype.',
    icon: '👑',
    members: [
      {
        id: 'stephen',
        name: 'Stephen',
        role: 'Lead Architect & Game Director',
        title: 'Founder & Principal Systems Architect',
        division: 'The Realm’s Founding Hand',
        avatar: '📜',
        bio: 'Lead creator of Eldoria: Realms at War, a browser-based fantasy strategy prototype. Shaped its world, core game systems, nine crowns and councils, realm atlas, and field catalogues.',
        contributions: [
          'Application Architecture & Realm Systems',
          'Nine Crowns, Councils & Edicts',
          'Realm Atlas & Holding Records',
          'Waystone Routes & Expedition Travel',
          'Resource, Research & Production Systems',
          'Arcane Codex & Marches Bestiary',
        ],
        signatureWork: 'The Age of Embers setting',
        socialBadge: 'Founder · Lead Creator',
      },
    ],
  },
  {
    id: 'systems',
    categoryName: 'War College & Realm Systems',
    description: 'The rules, calculations, and records behind conflict, trade, travel, and stewardship.',
    icon: '⚙️',
    members: [
      {
        id: 'systems-combat',
        name: 'War College of the Marches',
        role: 'Combat Systems Design',
        title: 'Battle Rules & Wardcraft',
        division: 'The Marshal’s Hall',
        avatar: '⚔️',
        bio: 'Shapes the game’s battle records, defensive holdings, rival encounters, and the rules used to resolve conflict.',
        contributions: [
          'Battle Records & Tactical Encounters',
          'Nemesis Rivals & Bounty Tables',
          'Holding Invasions & Ward Networks',
          'Warband Equipment & Formation Systems',
        ],
        signatureWork: 'The Marches Bestiary',
      },
      {
        id: 'systems-econ',
        name: 'Stewards of Coin & Craft',
        role: 'Economy & Production Design',
        title: 'Treasury, Harvest & Workshop Systems',
        division: 'The Royal Counting House',
        avatar: '💎',
        bio: 'Maintains the realm’s resource, treasury, production, storage, and progression calculations.',
        contributions: [
          'Metal, Moonstone, Aether & Crown Yields',
          'Royal Treasury & Vault Calculations',
          'Storehouse Capacity & Overflow Rules',
          'Food, Water & Holding Life Support',
        ],
        signatureWork: 'The Royal Treasury ledger',
      },
      {
        id: 'systems-waystones',
        name: 'Waystone & Leyline Wardens',
        role: 'Travel Systems Design',
        title: 'Routes, Relays & Expedition Rules',
        division: 'The Old Roads Office',
        avatar: '🌀',
        bio: 'Tends the realm’s waystone network, coordinate routes, and expedition travel calculations.',
        contributions: [
          'Waystone Network & Coordinate Records',
          'Travel Relay and Cooldown Rules',
          'Expedition Distance & Flight-Time Formulae',
          'Route Fuel Estimates & Dispatch Checks',
        ],
        signatureWork: 'The Waystone Almanac',
      },
    ],
  },
  {
    id: 'art-ui',
    categoryName: 'The Royal Scriptorium',
    description: 'Shaping the interface, sounds, and tools used to navigate the realm.',
    icon: '🎨',
    members: [
      {
        id: 'tactical-ui',
        name: 'Mapmakers & Interface Scribes',
        role: 'Interface Design',
        title: 'Navigation, Readability & Responsive Layout',
        division: 'The Royal Scriptorium',
        avatar: '🖥️',
        bio: 'Organizes dense game information into readable ledgers, maps, menus, and responsive controls.',
        contributions: [
          'Realm Status & Resource Ledgers',
          'Readable System and Field Records',
          'Maps, Catalogues & Navigation',
          'Responsive Controls for Small Screens',
        ],
        signatureWork: 'The Realm Command Ledger',
      },
      {
        id: 'audio-fx',
        name: 'Bell, Signal & Soundworks',
        role: 'Interface Sound Design',
        title: 'Browser Audio & Feedback',
        division: 'The Bell Tower',
        avatar: '🔊',
        bio: 'Built the browser-based sound cues that mark selections, confirmations, warnings, and encounters.',
        contributions: [
          'Procedural Browser Audio',
          'Waystone and Travel Cues',
          'Battle and Warning Sounds',
          'Selection and Confirmation Chimes',
        ],
        signatureWork: 'The Bell Tower soundbook',
      },
    ],
  },
  {
    id: 'lore-narrative',
    categoryName: 'Lorekeepers & Worldbuilders',
    description: 'Recording the peoples, places, creatures, histories, and tales of Eldoria.',
    icon: '📜',
    members: [
      {
        id: 'lore-master',
        name: 'Keepers of the Realm Chronicle',
        role: 'Lore & Narrative Design',
        title: 'Chronicler of the Marches',
        division: 'The Royal Archives',
        avatar: '🌌',
        bio: 'Collects setting notes and player-facing records for the peoples, crowns, regions, magic, and creatures of Eldoria.',
        contributions: [
          'World Bible & Realm Histories',
          'Campaign, Quest & Decree Text',
          'Champion and Creature Dossiers',
          'Arcane Codex & Player Guides',
        ],
        signatureWork: 'The World Bible',
      },
    ],
  },
  {
    id: 'qa-community',
    categoryName: 'Field Trials & Quality Review',
    description: 'Checking catalogues, calculations, and player journeys against the living build.',
    icon: '🛡️',
    members: [
      {
        id: 'qa-vanguard',
        name: 'March Wardens Test Guild',
        role: 'Testing & Balance Review',
        title: 'Quality Assurance',
        division: 'The Field Review Office',
        avatar: '🎯',
        bio: 'Exercises automated checks and practical workflows to catch broken records, calculations, and interactions.',
        contributions: [
          'Automated Data-Integrity Checks',
          'Resource and Progression Formula Review',
          'Fleet, Expedition & Queue Checks',
          'Save and Profile Workflow Testing',
        ],
        signatureWork: 'The Field-Test Ledger',
      },
    ],
  },
];

export const SPECIAL_INSPIRATIONS_THANKS = [
  {
    title: 'OGame Open Source v0.84 · ogamespec',
    description: 'For documenting classic fleet-distance, travel-time, and deuterium rules that informed Eldoria’s expedition planner.',
  },
  {
    title: 'Early Realm-Strategy Prototypes',
    description: 'For experiments in browser strategy, resource stewardship, diplomacy, and long-running player worlds that preceded Eldoria’s fantasy setting.',
  },
  {
    title: 'Stargate SG-1, Atlantis & Universe (MGM / Brad Wright & Robert C. Cooper)',
    description: 'Acknowledge earlier technical inspiration for coordinate travel and networked-world experiments; these works are not part of Eldoria’s setting.',
  },
  {
    title: 'EVE Online (CCP Games)',
    description: 'Acknowledge earlier inspiration for detailed crafting, resource trade, and equipment-fitting experiments; not part of Eldoria’s setting.',
  },
  {
    title: 'No Man\'s Sky (Hello Games)',
    description: 'Acknowledge earlier inspiration for procedural exploration and environmental-survival experiments; not part of Eldoria’s setting.',
  },
  {
    title: 'The Adventuring Community',
    description: 'To every player who explores the Marches, tends a holding, shares a tale, and helps Eldoria grow.',
  },
];

export const DEVELOPMENT_TECH_STACK = [
  { tech: 'React 19 & TypeScript', detail: 'The component and typed-model foundations of the browser game.' },
  { tech: 'Vite', detail: 'Development server and production build for the realm interface.' },
  { tech: 'Tailwind CSS', detail: 'Utility-class styling for consistent ledgers, menus, and views.' },
  { tech: 'Web Audio API', detail: 'Procedural browser sounds for selections, confirmations, and warnings.' },
  { tech: 'Firebase Auth & Firestore', detail: 'Authentication and limited profile/resource synchronization.' },
  { tech: 'Lucide Icons', detail: 'Interface symbols for navigation, records, and actions.' },
];

export const DEVELOPMENT_HISTORY_LOG: DevelopmentMilestone[] = [
  {
    version: 'Unreleased',
    date: 'September 2026',
    codename: 'Age of Embers',
    highlights: [
      'Fantasy setting, peoples, crowns, holdings, and realm records',
      'Arcane Codex and 90-entry Marches Bestiary',
      'Expedition route preview with OGame 0.84 travel and fuel formulas',
      'Browser-first prototype with local game-state persistence',
    ],
  },
  {
    version: 'Project Record',
    date: 'Ongoing',
    codename: 'Crown & Country',
    highlights: [
      'Resource, research, facility, and production systems',
      'Warbands, defenses, expeditions, and battle records',
      'Guild, diplomacy, market, and realm-management views',
    ],
  },
  {
    version: 'Project Record',
    date: 'Ongoing',
    codename: 'Lore & Fieldcraft',
    highlights: [
      'World Bible, Arcane Codex, and creature dossiers',
      'Nine monster classes with ten named entries apiece',
      'Practical integrity checks for major game catalogues',
    ],
  },
];
