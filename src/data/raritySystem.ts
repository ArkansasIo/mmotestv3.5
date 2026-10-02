import type { WeaponType } from '../types';
import type { ProfessionRarity } from './professionData';

export const ITEM_RARITIES = [
  { level: 1, name: 'Worn', className: 'border-stone-400 bg-stone-100 text-stone-700' },
  { level: 2, name: 'Common', className: 'border-neutral-400 bg-neutral-100 text-neutral-800' },
  { level: 3, name: 'Fine', className: 'border-emerald-500 bg-emerald-50 text-emerald-900' },
  { level: 4, name: 'Uncommon', className: 'border-teal-500 bg-teal-50 text-teal-900' },
  { level: 5, name: 'Rare', className: 'border-sky-500 bg-sky-50 text-sky-900' },
  { level: 6, name: 'Superior', className: 'border-blue-600 bg-blue-50 text-blue-950' },
  { level: 7, name: 'Epic', className: 'border-violet-500 bg-violet-50 text-violet-900' },
  { level: 8, name: 'Legendary', className: 'border-orange-500 bg-orange-50 text-orange-950' },
  { level: 9, name: 'Masterwork', className: 'border-amber-500 bg-amber-50 text-amber-950' },
] as const;

const PROFESSION_RARITY_LEVEL: Record<ProfessionRarity, number> = {
  Common: 2,
  Fine: 3,
  Rare: 5,
  Epic: 7,
  Masterwork: 9,
};

export function getRarityDetails(level: number) {
  const safeLevel = Math.min(9, Math.max(1, Math.round(level)));
  return ITEM_RARITIES[safeLevel - 1];
}

export function getProfessionRarityLevel(rarity: ProfessionRarity): number {
  return PROFESSION_RARITY_LEVEL[rarity];
}

export function getWeaponRarityLevel(item: WeaponType, catalog: WeaponType[]): number {
  return getWeaponRarityMap(catalog).get(item.id) || 1;
}

export function getWeaponRarityMap(catalog: WeaponType[]): Map<string, number> {
  const sorted = [...catalog].sort((left, right) =>
    left.tier - right.tier ||
    left.power - right.power ||
    left.price - right.price ||
    left.id.localeCompare(right.id),
  );
  return new Map(sorted.map((item, index) => [
    item.id,
    sorted.length < 2 ? 1 : Math.min(9, Math.max(1, Math.ceil(((index + 1) / sorted.length) * 9))),
  ]));
}