export interface Unit90Definition {
  id: string;
  name: string;
  category: string;
  subClass: string;
  tier: number;
  attack: number;
  defense: number;
  shield: number;
  speed: number;
  cargo: number;
  cost: { metal: number; crystal: number; deuterium: number };
  description: string;
}

const UNIT_ORDERS = [
  { key: 'interceptor', category: 'Light Infantry', sub: 'Scout Company', names: ['Foxglove Runner','Ashwood Archer','Hillpath Scout','Silvercloak Skirmisher','Rookery Bowhand','Mistvale Ranger','Swiftwater Reeve','Thornfield Stalker','Dawntrail Pathfinder','Windward Longbow'], desc: 'A swift scout trained to patrol old roads, loose arrows from cover, and warn the keep of danger.' },
  { key: 'frigate', category: 'Heavy Infantry', sub: 'Shieldwall Company', names: ['Gateward Spearman','Ironroot Shieldbearer','Dawnwatch Halberdier','Blackbriar Swordsman','Stonehall Pikeman','Red Banner Man-at-Arms','Kingsroad Defender','Stormpeak Templar','Lionguard Veteran','Crownwall Captain'], desc: 'A disciplined foot soldier drilled to hold the shieldwall and defend the realm’s narrow passes.' },
  { key: 'destroyer', category: 'Beast Riders', sub: 'Monster-Hunter Company', names: ['Manticore Lancer','Chimera Breaker','Hydra Bane','Kraken Harpooner','Leviathan Stalker','Gorgon Seeker','Typhon Rider','Behemoth Tamer','Cerberus Warden','Wyvern Spear'], desc: 'A daring monster-hunter whose company specializes in breaking enemy formations and taming wild beasts.' },
  { key: 'battleship', category: 'Knights & Champions', sub: 'Royal Champion Order', names: ['Oathbound Knight','Sovereign Paladin','Blackthorn Castellan','Dawnfire Champion','Crownblade Conqueror','Griffon Banneret','Dragonbane Marshal','Aegis Justiciar','Lionheart Warden','High King’s Champion'], desc: 'An elite champion in masterwork armor, sworn to the crown and entrusted with the realm’s hardest battles.' },
  { key: 'carrier', category: 'War Beasts', sub: 'Mounted Retinue', names: ['Royal Griffon Rider','Moonhart Stag Guard','Thunder Roc Lancer','Frostwyrm Keeper','Sunmane Lion Cavalier','Ember Drake Rider','Skyhorn Hippogriff','Elder Treant Vanguard','Stormwing Harrier','Titan Bear Champion'], desc: 'A mounted retinue that carries brave champions into battle atop the great beasts of the old tales.' },
  { key: 'stealth', category: 'Scouts & Rogues', sub: 'Shadow Company', names: ['Nightveil Cutpurse','Whispering Shade','Gloamwood Wraith','Lanternless Runner','Silent Dagger','Mistcloak Infiltrator','Eclipse Pathfinder','Ravenstep Agent','Shadewood Spy','Banshee Listener'], desc: 'A secretive scout skilled at slipping past watchfires and returning with an enemy’s plans.' },
  { key: 'hauler', category: 'Caravans & Artisans', sub: 'Supply Train', names: ['Crownroad Provisioner','Ironcart Prospector','Moonstone Packer','Grainmaster Wagon','Deepdelve Muletrain','Royal Supply Carriage','Gryphon-Haul Drover','Titan Ox Wagon','Longroad Merchant','Abyssal Mine Cart'], desc: 'A sturdy supply train that carries food, ore, medicine, and tools to the keeps beyond the Marches.' },
  { key: 'satellite', category: 'Keep Defenses', sub: 'Wall & Gate Company', names: ['Argus Watchtower','Cyclops Stoneguard','Panoptic Lookout','Gatewarden Ballista','Sunspire Archer Post','Runic Wardstone','Ironbark Palisade','Gorgon-Eye Watch','Aegis Gatehouse','Solar Bastion'], desc: 'A fixed defensive work that protects a keep with watchful sentries, stout walls, and well-aimed bolts.' },
  { key: 'precursor', category: 'Mythic Champions', sub: 'Legendary Order', names: ['Ancient Oathblade','Singularity Sage','Eventide Dragon Knight','Cosmic Titan Golem','Omega Archmage','Genesis Phoenix','Eternity Paladin','Voidmaster Warlock','Celestial High Warden','Architect of the Worldforge'], desc: 'A legendary champion of the elder age, wielding ancient craft and extraordinary power in defense of the realm.' },
];

export const UNITS_90_ROSTER: Unit90Definition[] = UNIT_ORDERS.flatMap((order, group) =>
  Array.from({ length: 10 }, (_, i) => ({
    id: `${['interceptor','frigate','destroyer','battleship','carrier','stealth','hauler','satellite','precursor'][group]}_${i + 1}`,
    name: order.names[i],
    category: order.category,
    subClass: `${order.sub} ${i + 1}`,
    tier: Math.floor(i / 2) + 1,
    attack: [80,250,750,2200,1200,400,50,300,10000][group] + i * [25,60,150,450,300,100,10,90,2500][group],
    defense: [40,300,900,3000,4500,200,1000,500,15000][group] + i * [15,80,200,600,900,50,250,120,3500][group],
    shield: [20,150,500,1800,2500,300,400,600,12000][group] + i * [10,40,120,350,500,80,100,150,3000][group],
    speed: [15000,9000,6000,4000,3500,22000,3000,0,2500][group] + i * [1200,800,500,300,250,1800,200,0,200][group],
    cargo: [50,400,1200,4000,15000,200,50000,0,100000][group] + i * [10,100,300,1000,3500,50,15000,0,25000][group],
    cost: {
      metal: [3000,12000,35000,110000,150000,20000,15000,5000,500000][group] + i * [800,2500,7000,22000,30000,4000,3000,1200,100000][group],
      crystal: [1500,6000,18000,55000,80000,15000,10000,4000,400000][group] + i * [400,1200,3500,11000,16000,3000,2000,1000,80000][group],
      deuterium: [500,2000,8000,25000,40000,12000,5000,1000,300000][group] + i * [200,500,1800,5000,8000,2500,1000,300,60000][group],
    },
    description: order.desc,
  }))
);
