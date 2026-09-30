import { MONSTER_BESTIARY } from './monsterBestiaryData';

export interface EldoriaWarlord {
  id: string;
  name: string;
  title: string;
  stronghold: string;
  marchCoordinate: string;
  guardOrder: string;
  champion: string;
  threatPower: number;
  shrineState: 'Kept' | 'Dimmed' | 'Broken' | 'Overburdened';
  temperament: string;
  challenge: string;
  ability: string;
  bountyCrowns: number;
  bountyIron: number;
  sigil: string;
  color: string;
}

export const ELDORIA_WARLORDS: EldoriaWarlord[] = [
  {
    id: 'warlord-kael',
    name: 'Kael Veyr',
    title: 'The Ash-Crowned Marshal',
    stronghold: 'Cinderfold Gate',
    marchCoordinate: '1:18:7',
    guardOrder: 'Black Ash Company',
    champion: 'The Cinder Standard',
    threatPower: 145000,
    shrineState: 'Kept',
    temperament: 'Patient, severe, and unwilling to yield ground',
    challenge: 'A measured advance behind a wall of smoke and pikes.',
    ability: 'Ashen Muster: calls reserve outriders into the fray.',
    bountyCrowns: 72000,
    bountyIron: 46000,
    sigil: '🔥',
    color: '#a94f32',
  },
  {
    id: 'warlord-vey',
    name: 'Matriarch Vey',
    title: 'Keeper of the Briar Oath',
    stronghold: 'Briarwake Hall',
    marchCoordinate: '1:42:3',
    guardOrder: 'Thornbound Wardens',
    champion: 'The Walking Hedge',
    threatPower: 178000,
    shrineState: 'Dimmed',
    temperament: 'Quiet, watchful, and fiercely protective of the old groves',
    challenge: 'A winding approach through living thorn walls.',
    ability: 'Rootbound Snare: binds the vanguard and breaks its formation.',
    bountyCrowns: 86000,
    bountyIron: 51000,
    sigil: '🌿',
    color: '#56734b',
  },
  {
    id: 'warlord-orm',
    name: 'Thane Orm Stonewake',
    title: 'The Delve-King',
    stronghold: 'Underhall of Nine Bells',
    marchCoordinate: '1:76:11',
    guardOrder: 'Deepdelve Shields',
    champion: 'Gravemark Colossus',
    threatPower: 212000,
    shrineState: 'Kept',
    temperament: 'Stubborn, formal, and bound to an older law',
    challenge: 'A shieldwall defense through narrow tunnels.',
    ability: 'Faultline Stomp: sends a tremor through the lower hall.',
    bountyCrowns: 99000,
    bountyIron: 68000,
    sigil: '⛰️',
    color: '#65716b',
  },
  {
    id: 'warlord-isolde',
    name: 'Isolde Greywake',
    title: 'Mist Admiral of the Fen',
    stronghold: 'The Drowned Tollhouse',
    marchCoordinate: '2:14:5',
    guardOrder: 'Reedveil Company',
    champion: 'Blackwater Grandmother',
    threatPower: 236000,
    shrineState: 'Dimmed',
    temperament: 'Clever, patient, and hard to find twice',
    challenge: 'A false retreat across flooded causeways.',
    ability: 'Fenmist Feint: obscures the true strength of her line.',
    bountyCrowns: 112000,
    bountyIron: 72000,
    sigil: '🌫️',
    color: '#557c79',
  },
  {
    id: 'warlord-hroth',
    name: 'Hroth Northglass',
    title: 'Warden of the Rime Pass',
    stronghold: 'Bluehorn Watch',
    marchCoordinate: '2:38:9',
    guardOrder: 'Frostmarked Thanes',
    champion: 'The Sleeping Range',
    threatPower: 264000,
    shrineState: 'Kept',
    temperament: 'Honorable, watchful, and slow to anger',
    challenge: 'A high pass held against the winter wind.',
    ability: 'Whiteout Call: buries the field beneath a wall of snow.',
    bountyCrowns: 128000,
    bountyIron: 84000,
    sigil: '❄️',
    color: '#648397',
  },
  {
    id: 'warlord-morcant',
    name: 'Morcant of the Black Road',
    title: 'The Lanternless Reeve',
    stronghold: 'Gloamwood Milepost',
    marchCoordinate: '2:63:2',
    guardOrder: 'Moonless Riders',
    champion: 'The Thirteenth Footfall',
    threatPower: 291000,
    shrineState: 'Broken',
    temperament: 'Wary, resourceful, and followed by rumors',
    challenge: 'A night march through woods without trail markers.',
    ability: 'Hollow Bay: calls the scattered pack into a single strike.',
    bountyCrowns: 143000,
    bountyIron: 93000,
    sigil: '🐺',
    color: '#6c657b',
  },
  {
    id: 'warlord-maelin',
    name: 'Maelin Goldmere',
    title: 'Mistress of the Amber Toll',
    stronghold: 'Amberdeep Exchange',
    marchCoordinate: '3:21:6',
    guardOrder: 'Gilt Road Factors',
    champion: 'The Crownfire Torque',
    threatPower: 318000,
    shrineState: 'Kept',
    temperament: 'Courteous, exacting, and never without a second bargain',
    challenge: 'A fortified market ward with paid blades at every gate.',
    ability: 'Closed Account: turns a failed bargain into a costly blockade.',
    bountyCrowns: 166000,
    bountyIron: 104000,
    sigil: '🪙',
    color: '#b38a45',
  },
  {
    id: 'warlord-emberfall',
    name: 'The Hollow King',
    title: 'Last Claimant of Emberfall',
    stronghold: 'The Sealed Oathbarrow',
    marchCoordinate: '3:90:15',
    guardOrder: 'The Unsworn Host',
    champion: 'Oathbarrow Oath-Iron',
    threatPower: 382000,
    shrineState: 'Overburdened',
    temperament: 'A name spoken only at the edge of a failed waystone',
    challenge: 'An old oath made flesh behind the final sealed door.',
    ability: 'Unbroken Claim: draws strength from every unkept vow nearby.',
    bountyCrowns: 210000,
    bountyIron: 150000,
    sigil: '👑',
    color: '#795951',
  },
];

export const DUNGEON_RAID_BOSSES = MONSTER_BESTIARY.filter((monster) => monster.rank === 'Apex');
