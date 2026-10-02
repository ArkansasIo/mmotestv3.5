import { PROFESSION_RECIPES, type ProfessionInventory, type ProfessionRecipe } from './professionData';

export type TemperingLevels = Record<string, number>;

export interface TemperingCost {
  metal: number;
  crystal: number;
  deuterium: number;
  naquadah: number;
  materialId: string;
  materialCount: number;
}

export interface EquipmentStats {
  attack: number;
  ward: number;
  vitality: number;
}

export function findCraftedEquipment(itemId: string): ProfessionRecipe['output'] | undefined {
  const output = PROFESSION_RECIPES.find((recipe) => recipe.output.id === itemId)?.output;
  return output?.kind === 'equipment' && output.slot ? output : undefined;
}

export function getTemperingCap(rarity: ProfessionRecipe['output']['rarity']): number {
  switch (rarity) {
    case 'Fine': return 4;
    case 'Rare': return 6;
    case 'Epic': return 8;
    case 'Masterwork': return 10;
    default: return 3;
  }
}

export function getTemperingCost(level: number): TemperingCost {
  const materialId = level >= 9 ? 'oathiron_ore' : level >= 7 ? 'nightglass_ore' : level >= 4 ? 'moonstone_ore' : 'iron_ore';
  const materialCount = 1 + Math.floor((level - 1) / 3);
  return {
    metal: 250 * level,
    crystal: 150 * level,
    deuterium: 50 * level,
    naquadah: 100 * level,
    materialId,
    materialCount,
  };
}

export function getTemperedEquipmentStats(itemId: string, levels: TemperingLevels): EquipmentStats {
  const item = findCraftedEquipment(itemId);
  const temperLevel = Math.max(0, levels[itemId] || 0);
  if (!item || temperLevel === 0) return { attack: 0, ward: 0, vitality: 0 };
  const increase = (value: number) => value > 0 ? Math.max(1, Math.floor(value * temperLevel * 0.05)) : 0;
  return {
    attack: increase(item.stats.attack),
    ward: increase(item.stats.ward),
    vitality: increase(item.stats.vitality),
  };
}

export function getOwnedEquipmentIds(inventory: ProfessionInventory, equippedIds: Array<string | undefined>): string[] {
  const inventoryIds = Object.entries(inventory)
    .filter(([itemId, quantity]) => quantity > 0 && findCraftedEquipment(itemId))
    .map(([itemId]) => itemId);
  return [...new Set([...inventoryIds, ...equippedIds.filter((itemId): itemId is string => itemId !== undefined && Boolean(findCraftedEquipment(itemId)))])];
}