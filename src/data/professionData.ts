export type ProfessionId =
  | 'alchemy'
  | 'blacksmithing'
  | 'enchanting'
  | 'engineering'
  | 'herbalism'
  | 'inscription'
  | 'jewelcrafting'
  | 'leatherworking'
  | 'mining'
  | 'skinning'
  | 'tailoring'
  | 'archaeology'
  | 'cooking'
  | 'fishing';

export type ProfessionItemKind = 'material' | 'consumable' | 'equipment';
export type ProfessionRarity = 'Common' | 'Fine' | 'Rare' | 'Epic' | 'Masterwork';
export type ProfessionEquipmentSlot =
  | 'weapon'
  | 'head'
  | 'chest'
  | 'hands'
  | 'legs'
  | 'feet'
  | 'offhand'
  | 'ring'
  | 'amulet'
  | 'tool'
  | 'relic';

export interface ProfessionMaterial {
  id: string;
  name: string;
  gatheredBy: ProfessionId;
  region: string;
  rarity: ProfessionRarity;
}

export interface FantasyOreVein {
  id: string;
  name: string;
  mineClass: string;
  mineSubclass: string;
  oreType: string;
  oreSubtype: string;
  requiredSkillLevel: number;
  region: string;
  depth: string;
  rarity: ProfessionRarity;
  details: string;
  uses: string;
}

export interface ProfessionDefinition {
  id: ProfessionId;
  name: string;
  calling: 'Gathering' | 'Crafting';
  description: string;
  workbench: string;
  gatherMaterialIds?: readonly string[];
  recipeNames: readonly [string, string, string, string, string];
  recipeMaterials: readonly [string, string];
  recipeMaterialsByTier?: readonly [readonly [string, string], readonly [string, string], readonly [string, string], readonly [string, string], readonly [string, string]];
  outputKind: ProfessionItemKind;
  equipmentSlots?: readonly ProfessionEquipmentSlot[];
}

export interface ProfessionRecipe {
  id: string;
  professionId: ProfessionId;
  name: string;
  requiredLevel: number;
  description: string;
  ingredients: Record<string, number>;
  crownCost: number;
  output: {
    id: string;
    name: string;
    kind: ProfessionItemKind;
    quantity: number;
    rarity: ProfessionRarity;
    slot?: ProfessionEquipmentSlot;
    stats: { attack: number; ward: number; vitality: number };
  };
  xpReward: number;
}

export interface ProfessionSkill {
  level: number;
  xp: number;
}

export type ProfessionSkillBook = Record<ProfessionId, ProfessionSkill>;
export type ProfessionInventory = Record<string, number>;
export type ProfessionEquipment = Partial<Record<ProfessionEquipmentSlot, string>>;

export const PROFESSION_MATERIALS: Record<string, ProfessionMaterial> = {
  yarrow: { id: 'yarrow', name: 'Roadside Yarrow', gatheredBy: 'herbalism', region: 'Greenheart verges', rarity: 'Common' },
  mooncap: { id: 'mooncap', name: 'Mooncap', gatheredBy: 'herbalism', region: 'Gloamwood hollows', rarity: 'Common' },
  frostleaf: { id: 'frostleaf', name: 'Frostleaf', gatheredBy: 'herbalism', region: 'Northglass slopes', rarity: 'Fine' },
  emberroot: { id: 'emberroot', name: 'Emberroot', gatheredBy: 'herbalism', region: 'Cinderfold ravines', rarity: 'Rare' },
  flax_fiber: { id: 'flax_fiber', name: 'Flax Fiber', gatheredBy: 'herbalism', region: 'Amber Road fields', rarity: 'Fine' },
  copper_ore: { id: 'copper_ore', name: 'Copper Ore', gatheredBy: 'mining', region: 'Kingsroad cuts', rarity: 'Common' },
  tin_ore: { id: 'tin_ore', name: 'Tin Ore', gatheredBy: 'mining', region: 'Amber Road quarries', rarity: 'Common' },
  iron_ore: { id: 'iron_ore', name: 'Iron Ore', gatheredBy: 'mining', region: 'Old Kingsroad tunnels', rarity: 'Common' },
  silver_ore: { id: 'silver_ore', name: 'Silver Ore', gatheredBy: 'mining', region: 'Starfall Crags', rarity: 'Fine' },
  gold_ore: { id: 'gold_ore', name: 'Gold Ore', gatheredBy: 'mining', region: 'Amberdeep lodes', rarity: 'Rare' },
  moonstone_ore: { id: 'moonstone_ore', name: 'Moonstone Ore', gatheredBy: 'mining', region: 'Moonstone Labyrinth', rarity: 'Rare' },
  nightglass_ore: { id: 'nightglass_ore', name: 'Nightglass Ore', gatheredBy: 'mining', region: 'Cinderfold ravines', rarity: 'Epic' },
  sunsteel_ore: { id: 'sunsteel_ore', name: 'Sunsteel Ore', gatheredBy: 'mining', region: 'Emberfall seams', rarity: 'Epic' },
  oathiron_ore: { id: 'oathiron_ore', name: 'Oath-Iron Ore', gatheredBy: 'mining', region: 'Sealed oath barrows', rarity: 'Masterwork' },
  hare_pelt: { id: 'hare_pelt', name: 'Hare Pelt', gatheredBy: 'skinning', region: 'Greenheart meadows', rarity: 'Common' },
  boar_hide: { id: 'boar_hide', name: 'Boar Hide', gatheredBy: 'skinning', region: 'Briarwake thickets', rarity: 'Common' },
  stag_hide: { id: 'stag_hide', name: 'Stag Hide', gatheredBy: 'skinning', region: 'Dawnwood trails', rarity: 'Fine' },
  drake_scale: { id: 'drake_scale', name: 'Ash Drake Scale', gatheredBy: 'skinning', region: 'Cinderfold ravines', rarity: 'Rare' },
  wool: { id: 'wool', name: 'Hill-Sheep Wool', gatheredBy: 'skinning', region: 'Amber Road folds', rarity: 'Fine' },
  relic_fragment: { id: 'relic_fragment', name: 'Relic Fragment', gatheredBy: 'archaeology', region: 'Buried waystone sites', rarity: 'Common' },
  old_coin: { id: 'old_coin', name: 'Crown of the First March', gatheredBy: 'archaeology', region: 'Ruined toll houses', rarity: 'Common' },
  rune_shard: { id: 'rune_shard', name: 'Rune-Shard', gatheredBy: 'archaeology', region: 'Broken oath circles', rarity: 'Fine' },
  elder_tablet: { id: 'elder_tablet', name: 'Elder Tablet', gatheredBy: 'archaeology', region: 'Sealed archive barrows', rarity: 'Rare' },
  amber_resin: { id: 'amber_resin', name: 'Amber Resin', gatheredBy: 'archaeology', region: 'Petrified groves', rarity: 'Epic' },
  river_fish: { id: 'river_fish', name: 'Silverbrook Trout', gatheredBy: 'fishing', region: 'Valewyn streams', rarity: 'Common' },
  silver_carp: { id: 'silver_carp', name: 'Silver Carp', gatheredBy: 'fishing', region: 'Old Mill pools', rarity: 'Common' },
  deepwater_eel: { id: 'deepwater_eel', name: 'Duskfen Eel', gatheredBy: 'fishing', region: 'Duskfen channels', rarity: 'Fine' },
  moon_pearl: { id: 'moon_pearl', name: 'Moonpool Pearl', gatheredBy: 'fishing', region: 'Moonpool caverns', rarity: 'Rare' },
  moon_koi: { id: 'moon_koi', name: 'Moon-Koi', gatheredBy: 'fishing', region: 'Stillwater sanctuaries', rarity: 'Epic' },
};

export const FANTASY_ORE_VEINS: readonly FantasyOreVein[] = [
  { id: 'copper_ore', name: 'Greenheart Copper', mineClass: 'Native Metals', mineSubclass: 'Weathered Veins', oreType: 'Base Metal', oreSubtype: 'Malachite Copper', requiredSkillLevel: 1, region: 'Greenheart foothills', depth: 'Shallow shelf', rarity: 'Common', details: 'A soft, green-veined ore close to the surface. Most village smithies begin their work here.', uses: 'Copper fittings, buckles, nails, and apprentice blades.' },
  { id: 'tin_ore', name: 'Amberdeep Tin', mineClass: 'Native Metals', mineSubclass: 'Shallow Lodes', oreType: 'Alloy Metal', oreSubtype: 'Cassiterite Tin', requiredSkillLevel: 12, region: 'Amber Road quarries', depth: 'Upper seam', rarity: 'Common', details: 'Pale, dull stone found in the old road cuts. Mixed with copper, it makes reliable bronze.', uses: 'Bronze tools, cookware, hinges, and trail gear.' },
  { id: 'iron_ore', name: 'Kingsroad Iron', mineClass: 'Ferrous Ores', mineSubclass: 'Deep Seams', oreType: 'Structural Metal', oreSubtype: 'Magnetite Iron', requiredSkillLevel: 25, region: 'Old Kingsroad tunnels', depth: 'Lower gallery', rarity: 'Fine', details: 'Dense black ore beneath abandoned road forts. Its steady grain takes a clean edge after proper smelting.', uses: 'Weapons, mail links, tools, and keep hardware.' },
  { id: 'silver_ore', name: 'Starfall Silver', mineClass: 'Precious Metals', mineSubclass: 'High-Crag Lodes', oreType: 'Noble Metal', oreSubtype: 'Moon-bright Silver', requiredSkillLevel: 38, region: 'Starfall Crags', depth: 'Wind-carved ledge', rarity: 'Fine', details: 'Bright seams exposed by mountain frost. Miners mark unstable shelves before bringing out the ore.', uses: 'Signets, fine buckles, ward inlays, and small ceremonial arms.' },
  { id: 'gold_ore', name: 'Amberdeep Gold', mineClass: 'Precious Metals', mineSubclass: 'Sealed Lodes', oreType: 'Noble Metal', oreSubtype: 'First-Crown Gold', requiredSkillLevel: 50, region: 'Amberdeep lodes', depth: 'Flooded lower shaft', rarity: 'Rare', details: 'A warm-colored seam below the merchant road. Its shafts require careful drainage and guarded ledgers.', uses: 'Crown seals, guild marks, fine settings, and trade reserve.' },
  { id: 'moonstone_ore', name: 'Moonstone Ore', mineClass: 'Ley-Bearing Stone', mineSubclass: 'Stillwater Veins', oreType: 'Arcane Mineral', oreSubtype: 'Lunar Feldspar', requiredSkillLevel: 63, region: 'Moonstone Labyrinth', depth: 'Quiet-water cavern', rarity: 'Rare', details: 'Pale crystal threaded through blue-grey rock. The vein dims when struck too quickly, so careful cuts matter.', uses: 'Rune-binding, waystone fittings, amulets, and lamp lenses.' },
  { id: 'nightglass_ore', name: 'Cinderfold Nightglass', mineClass: 'Volcanic Ores', mineSubclass: 'Obsidian Pipes', oreType: 'Volcanic Glass Ore', oreSubtype: 'Nightglass', requiredSkillLevel: 75, region: 'Cinderfold ravines', depth: 'Cooling lava tube', rarity: 'Epic', details: 'Black glassstone formed where old lava met cold groundwater. It fractures sharply and must be handled in padded wraps.', uses: 'Edge inserts, dark lenses, ward mirrors, and delicate tools.' },
  { id: 'sunsteel_ore', name: 'Emberfall Sunsteel', mineClass: 'Starfallen Metals', mineSubclass: 'Meteoric Seams', oreType: 'Runic Alloy Ore', oreSubtype: 'Sunsteel', requiredSkillLevel: 88, region: 'Emberfall scar', depth: 'Ash-buried impact seam', rarity: 'Epic', details: 'Rare metallic stone fused with the Emberfall’s glassy crust. Smiths prize its warmth-holding grain.', uses: 'Masterwork arms, forge tools, oathplate, and heat-resistant fittings.' },
  { id: 'oathiron_ore', name: 'Oathbarrow Oath-Iron', mineClass: 'Relic Metals', mineSubclass: 'Vowbound Seams', oreType: 'Memory-Bearing Ore', oreSubtype: 'Oath-Iron', requiredSkillLevel: 100, region: 'Sealed oath barrows', depth: 'Buried foundation chamber', rarity: 'Masterwork', details: 'A scarce, dark ore found only below sealed vow halls. Its old marks are recorded before a single piece is removed.', uses: 'Grandmaster relic fittings, oath rings, and heirloom ward anchors.' },
];

export function normalizeOreStockpile(
  stockpile: Record<string, number> | undefined,
  legacyInventory: Record<string, number> = {},
): Record<string, number> {
  return Object.fromEntries(
    FANTASY_ORE_VEINS.map((vein) => {
      const currentAmount = stockpile?.[vein.id];
      const legacyAmount = legacyInventory[vein.id];
      const amount = typeof currentAmount === 'number' && Number.isFinite(currentAmount)
        ? currentAmount
        : typeof legacyAmount === 'number' && Number.isFinite(legacyAmount)
          ? legacyAmount
          : 0;
      return [vein.id, Math.max(0, Math.floor(amount))];
    }),
  );
}

export const PROFESSION_DEFINITIONS: ProfessionDefinition[] = [
  {
    id: 'alchemy', name: 'Apothecary', calling: 'Crafting', description: 'Blend field herbs, salts, and extracts into useful draughts and salves.', workbench: 'Apothecary table', recipeNames: ['Yarrow Restorative', 'Mooncap Clear-Eye Tonic', 'Frostleaf Balm', 'Emberroot Courage Draught', 'Marchwarden Elixir'], recipeMaterials: ['yarrow', 'mooncap'], outputKind: 'consumable',
  },
  {
    id: 'blacksmithing', name: 'Smithing', calling: 'Crafting', description: 'Forge serviceable arms, armor, and shields for long roads and hard winters.', workbench: 'Village forge', recipeNames: ['Copperedge Knife', 'Kingsroad Buckler', 'Ironbark Hauberk', 'Silverline Longblade', 'Sunsteel Oathplate'], recipeMaterials: ['copper_ore', 'iron_ore'], recipeMaterialsByTier: [['copper_ore', 'iron_ore'], ['tin_ore', 'iron_ore'], ['iron_ore', 'silver_ore'], ['silver_ore', 'gold_ore'], ['sunsteel_ore', 'oathiron_ore']], outputKind: 'equipment', equipmentSlots: ['weapon', 'offhand', 'chest', 'weapon', 'chest'],
  },
  {
    id: 'enchanting', name: 'Rune-binding', calling: 'Crafting', description: 'Set careful runes into gear to lend it steadiness, warmth, or warding.', workbench: 'Runescribe’s bench', recipeNames: ['Hearthward Thread', 'Wayfinder’s Mark', 'Briarveil Sigil', 'Dawnward Inscription', 'Oathkeeper’s Binding'], recipeMaterials: ['relic_fragment', 'old_coin'], outputKind: 'equipment', equipmentSlots: ['amulet', 'ring', 'offhand', 'amulet', 'relic'],
  },
  {
    id: 'engineering', name: 'Tinkerwork', calling: 'Crafting', description: 'Build reliable tools and clever field devices from metal, wood, and resin.', workbench: 'Tinker’s bench', recipeNames: ['Trailwarden’s Grapnel', 'Pocket Wayfinder', 'Springlock Snare', 'Surveyor’s Lens', 'Marchlight Compass'], recipeMaterials: ['copper_ore', 'iron_ore'], recipeMaterialsByTier: [['copper_ore', 'iron_ore'], ['tin_ore', 'silver_ore'], ['gold_ore', 'nightglass_ore'], ['moonstone_ore', 'sunsteel_ore'], ['oathiron_ore', 'amber_resin']], outputKind: 'equipment', equipmentSlots: ['tool', 'offhand', 'tool', 'head', 'tool'],
  },
  {
    id: 'herbalism', name: 'Herbalism', calling: 'Gathering', description: 'Find useful plants along hedgerows, woodland paths, and high passes.', workbench: 'Field satchel', gatherMaterialIds: ['yarrow', 'mooncap', 'frostleaf', 'emberroot', 'flax_fiber'], recipeNames: ['Dried Yarrow Bundles', 'Mooncap Poultice', 'Frostleaf Compress', 'Emberroot Infusion', 'Wayfarer’s Field Kit'], recipeMaterials: ['yarrow', 'mooncap'], outputKind: 'consumable',
  },
  {
    id: 'inscription', name: 'Inscription', calling: 'Crafting', description: 'Copy maps, charms, and records onto vellum, bark-paper, and tablets.', workbench: 'Scribe’s desk', recipeNames: ['Marches Pocket Map', 'Warding Verse', 'Waystone Rubbing', 'Crownland Survey', 'Atlas of the Old Roads'], recipeMaterials: ['yarrow', 'old_coin'], outputKind: 'consumable',
  },
  {
    id: 'jewelcrafting', name: 'Gemcutting', calling: 'Crafting', description: 'Cut river gems and mountain stones into keepsakes and fitting ornaments.', workbench: 'Lapidary wheel', recipeNames: ['Brookglass Bead', 'Silverbrook Ring', 'Moonpool Pendant', 'Starfall Signet', 'Crownfire Torque'], recipeMaterials: ['copper_ore', 'old_coin'], recipeMaterialsByTier: [['copper_ore', 'old_coin'], ['silver_ore', 'moon_pearl'], ['gold_ore', 'moonstone_ore'], ['moonstone_ore', 'nightglass_ore'], ['oathiron_ore', 'sunsteel_ore']], outputKind: 'equipment', equipmentSlots: ['ring', 'ring', 'amulet', 'ring', 'amulet'],
  },
  {
    id: 'leatherworking', name: 'Leatherworking', calling: 'Crafting', description: 'Turn hides and scales into flexible travel gear and protective layers.', workbench: 'Tanner’s frame', recipeNames: ['Harehide Gloves', 'Boarhide Jerkin', 'Stagtrail Boots', 'Drakescale Mantle', 'Wyrmguard Cuirass'], recipeMaterials: ['hare_pelt', 'boar_hide'], outputKind: 'equipment', equipmentSlots: ['hands', 'chest', 'feet', 'chest', 'chest'],
  },
  {
    id: 'mining', name: 'Mining', calling: 'Gathering', description: 'Read the stone and work safe seams for ore and forgeable minerals.', workbench: 'Prospector’s tools', gatherMaterialIds: FANTASY_ORE_VEINS.map((vein) => vein.id), recipeNames: ['Copper Ingot', 'Tin Alloy', 'Iron Ingot', 'Silver-Gold Fillet', 'Sunsteel Bloom'], recipeMaterials: ['copper_ore', 'tin_ore'], recipeMaterialsByTier: [['copper_ore', 'tin_ore'], ['tin_ore', 'iron_ore'], ['iron_ore', 'silver_ore'], ['gold_ore', 'moonstone_ore'], ['nightglass_ore', 'sunsteel_ore']], outputKind: 'material',
  },
  {
    id: 'skinning', name: 'Skinning', calling: 'Gathering', description: 'Recover usable hides, wool, and scales from beasts found on the Marches.', workbench: 'Field dressing kit', gatherMaterialIds: ['hare_pelt', 'boar_hide', 'stag_hide', 'drake_scale', 'wool'], recipeNames: ['Cured Harehide', 'Oiled Boarhide', 'Staghide Panels', 'Ash Drake Scale Sheet', 'Wyrmhide Laminate'], recipeMaterials: ['hare_pelt', 'boar_hide'], outputKind: 'material',
  },
  {
    id: 'tailoring', name: 'Tailoring', calling: 'Crafting', description: 'Cut wool, flax, and fine thread into warm clothing and light armor.', workbench: 'Tailor’s frame', recipeNames: ['Hearthkeeper Hood', 'Marchcloak', 'Wayfarer’s Gloves', 'Frostpass Leggings', 'Emberweave Mantle'], recipeMaterials: ['wool', 'flax_fiber'], outputKind: 'equipment', equipmentSlots: ['head', 'chest', 'hands', 'legs', 'chest'],
  },
  {
    id: 'archaeology', name: 'Relic Studies', calling: 'Gathering', description: 'Excavate forgotten places and document finds without disturbing their stories.', workbench: 'Excavator’s kit', gatherMaterialIds: ['relic_fragment', 'old_coin', 'rune_shard', 'elder_tablet', 'amber_resin'], recipeNames: ['Catalogued Road Token', 'Restored Vow Tablet', 'Waystone Rubbing', 'Sealed Chronicle Leaf', 'Elder March Relic'], recipeMaterials: ['relic_fragment', 'old_coin'], outputKind: 'equipment', equipmentSlots: ['relic', 'ring', 'offhand', 'relic', 'amulet'],
  },
  {
    id: 'cooking', name: 'Cookery', calling: 'Crafting', description: 'Prepare filling trail meals from fish, herbs, and provisions.', workbench: 'Hearth or camp pot', recipeNames: ['Yarrow Broth', 'Silverbrook Fishcake', 'Mooncap Stew', 'Duskfen Smoked Eel', 'Wayfarer’s Feast'], recipeMaterials: ['river_fish', 'yarrow'], outputKind: 'consumable',
  },
  {
    id: 'fishing', name: 'Fishing', calling: 'Gathering', description: 'Fish clear streams, reed-choked fens, and deep pools at a patient pace.', workbench: 'Fishing rod', gatherMaterialIds: ['river_fish', 'silver_carp', 'deepwater_eel', 'moon_pearl', 'moon_koi'], recipeNames: ['Salted Brook Trout', 'Smoke-Cured Carp', 'Duskfen Eel Skewer', 'Moonpool Pearl Lure', 'Stillwater Koi Supper'], recipeMaterials: ['river_fish', 'silver_carp'], outputKind: 'consumable',
  },
];

const RECIPE_LEVELS = [1, 25, 50, 75, 100] as const;
const RARITIES: ProfessionRarity[] = ['Common', 'Fine', 'Rare', 'Epic', 'Masterwork'];

export const PROFESSION_RECIPES: ProfessionRecipe[] = PROFESSION_DEFINITIONS.flatMap((profession) =>
  profession.recipeNames.map((name, index) => {
    const tier = index + 1;
    const slot = profession.equipmentSlots?.[index];
    const outputId = `${profession.id}-${tier}`;
    const materialQuantity = 1 + Math.floor(tier / 2);
    const [firstMaterial, secondMaterial] = profession.recipeMaterialsByTier?.[index] || profession.recipeMaterials;
    const ingredients: Record<string, number> = {
      [firstMaterial]: materialQuantity,
      [secondMaterial]: Math.max(1, tier - 1),
    };
    if (firstMaterial === secondMaterial) ingredients[firstMaterial] += Math.max(1, tier - 1);

    return {
      id: `recipe-${outputId}`,
      professionId: profession.id,
      name,
      requiredLevel: RECIPE_LEVELS[index],
      description: `${name}, prepared at the ${profession.workbench.toLowerCase()} with careful fieldcraft.`,
      ingredients,
      crownCost: 8 + tier * 12,
      output: {
        id: outputId,
        name,
        kind: profession.outputKind,
        quantity: profession.outputKind === 'equipment' ? 1 : 2 + tier,
        rarity: RARITIES[index],
        slot,
        stats: slot
          ? { attack: tier * (slot === 'weapon' ? 4 : 1), ward: tier * (slot === 'chest' || slot === 'offhand' ? 5 : 2), vitality: tier * 8 }
          : { attack: 0, ward: 0, vitality: 0 },
      },
      xpReward: 35 + tier * 20,
    };
  }),
);

export const INITIAL_PROFESSION_SKILLS: ProfessionSkillBook = Object.fromEntries(
  PROFESSION_DEFINITIONS.map((profession) => [profession.id, { level: 1, xp: 0 }]),
) as ProfessionSkillBook;

export const INITIAL_PROFESSION_INVENTORY: ProfessionInventory = {
  yarrow: 3,
  mooncap: 2,
  flax_fiber: 2,
  copper_ore: 3,
  tin_ore: 2,
  iron_ore: 2,
  silver_ore: 2,
  hare_pelt: 2,
  boar_hide: 1,
  wool: 2,
  relic_fragment: 2,
  old_coin: 1,
  river_fish: 3,
  silver_carp: 1,
  moon_pearl: 1,
};

export const INITIAL_PROFESSION_EQUIPMENT: ProfessionEquipment = {};

export const PROFESSION_LEVEL_CAP = 100;

export function professionXpToNextLevel(level: number): number {
  if (level >= PROFESSION_LEVEL_CAP) return 0;
  return 20 + level * 3;
}

export function awardProfessionXp(skill: ProfessionSkill, amount: number): ProfessionSkill {
  let level = Math.min(PROFESSION_LEVEL_CAP, Math.max(1, skill.level));
  let xp = Math.max(0, skill.xp + amount);

  while (level < PROFESSION_LEVEL_CAP) {
    const required = professionXpToNextLevel(level);
    if (xp < required) break;
    xp -= required;
    level += 1;
  }

  return { level, xp: level === PROFESSION_LEVEL_CAP ? 0 : xp };
}

export function professionRank(level: number): string {
  if (level >= 100) return 'Grandmaster';
  if (level >= 75) return 'Master';
  if (level >= 50) return 'Expert';
  if (level >= 25) return 'Journeyman';
  return 'Apprentice';
}
