import { CommanderProfileSlot, CareerStats } from './types';

export interface CommanderAvatarOption {
  id: string;
  name: string;
  category: 'tauri' | 'asgard' | 'goauld' | 'replicator' | 'cybernetic' | 'ancient';
  icon: string;
  description: string;
  unlocked: boolean;
}

export const COMMANDER_AVATARS: CommanderAvatarOption[] = [
  { id: 'avatar-1', name: "Valewyn Crown Marshal", category: 'tauri', icon: '👨‍✈️', description: 'Supreme military strategist from Earth.', unlocked: true },
  { id: 'avatar-2', name: "Marchland Shadow Ranger", category: 'tauri', icon: '🪖', description: 'Waystone frontline infiltration specialist.', unlocked: true },
  { id: 'avatar-3', name: 'Sylvan Moon Sage', category: 'asgard', icon: '👽', description: 'Ancient intellectual wielding neutronium shields.', unlocked: true },
  { id: 'avatar-4', name: 'Elderwood Warden', category: 'asgard', icon: '🛸', description: 'Subspace holographic commander projection.', unlocked: true },
  { id: 'avatar-5', name: "Ashen War-Queen", category: 'goauld', icon: '👑', description: 'Golden armored feudal tyrant of the stars.', unlocked: true },
  { id: 'avatar-6', name: "Blackthorn Inquisitor", category: 'goauld', icon: '🐺', description: 'Jackal-masked warrior cloaked in black energy.', unlocked: true },
  { id: 'avatar-7', name: 'Ironroot Rune-Smith', category: 'replicator', icon: '🤖', description: 'Autonomous nanite entity driven by logic.', unlocked: true },
  { id: 'avatar-8', name: 'Deepdelve Forge-Mother', category: 'replicator', icon: '🕷️', description: 'Hive architect converting metal into legion.', unlocked: true },
  { id: 'avatar-9', name: 'Runebound War-Golem', category: 'cybernetic', icon: '🧠', description: 'Organic-synthetic neural matrix calculating paths.', unlocked: true },
  { id: 'avatar-10', name: 'Nightveil Stalker', category: 'cybernetic', icon: '🥷', description: 'Covert assassin moving through hyperspace folds.', unlocked: false },
  { id: 'avatar-11', name: 'Elder Star-Seer', category: 'ancient', icon: '✨', description: 'Pure energy consciousness existing beyond time.', unlocked: true },
  { id: 'avatar-12', name: 'Queen of the Seven Crowns', category: 'tauri', icon: '👸', description: 'Imperial sovereign of 40 unified star systems.', unlocked: true },
];

export const COMMANDER_TITLES: string[] = [
  'High Warden',
  'Grand Marshal',
  'Realm Sovereign',
  'Dawnward Champion',
  'Leyroad Pathfinder',
  'Master of the Old Roads',
  'Waystone Keeper',
  'Grandmaster of the Citadel',
  'Elder Sage',
  'Moonstone Alchemist',
  'High King of the Marches',
  'Conqueror of Keeps',
];

export const INITIAL_PROFILE_SLOTS: CommanderProfileSlot[] = [
  {
    id: 'slot-1',
    slotNumber: 1,
    commanderName: 'Warden Aria Vale',
    title: 'High Warden',
    race: 'tauri',
    governmentId: 'junta',
    level: 18,
    avatarUrl: '👨‍✈️',
    isActive: true,
    lastPlayed: 'Active Now',
    planetsCount: 3,
    fleetScore: 145000,
    darkMatter: 2500,
  },
  {
    id: 'slot-2',
    slotNumber: 2,
    commanderName: 'Lord Ba\'al Reborn',
    title: 'Realm Sovereign',
    race: 'goauld',
    governmentId: 'theocracy',
    level: 12,
    avatarUrl: '👑',
    isActive: false,
    lastPlayed: '2 days ago',
    planetsCount: 2,
    fleetScore: 82000,
    darkMatter: 750,
  },
  {
    id: 'slot-3',
    slotNumber: 3,
    commanderName: 'Thane Brokk Ironroot',
    title: 'Dawnward Champion',
    race: 'replicator',
    governmentId: 'technocracy',
    level: 9,
    avatarUrl: '🤖',
    isActive: false,
    lastPlayed: '5 days ago',
    planetsCount: 1,
    fleetScore: 41000,
    darkMatter: 300,
  },
];

export const INITIAL_CAREER_STATS: CareerStats = {
  totalBattles: 148,
  victories: 124,
  defeats: 24,
  winRate: 83.7,
  totalLootNaquadah: 4850000,
  planetsColonized: 3,
  moonsDiscovered: 2,
  stargatesDialed: 89,
  expeditionsCompleted: 47,
  debrisRecycled: 1820000,
  darkMatterEarned: 8400,
  ascensionsCount: 1,
};
