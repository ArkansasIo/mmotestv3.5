export type RarityId =
  | 'common'
  | 'fine'
  | 'uncommon'
  | 'rare'
  | 'superior'
  | 'epic'
  | 'legendary'
  | 'mythic'
  | 'relic';

export interface RarityDefinition {
  id: RarityId;
  name: string;
  shortLabel: string;
  tier: number;
  color: string;
  background: string;
  border: string;
  statMultiplier: number;
  archiveWeight: string;
}

export const RARITY_TIERS: readonly RarityDefinition[] = [
  { id: 'common', name: 'Common', shortLabel: 'I', tier: 1, color: '#64748b', background: '#f1f5f9', border: '#cbd5e1', statMultiplier: 1, archiveWeight: 'Frequent' },
  { id: 'fine', name: 'Fine', shortLabel: 'II', tier: 2, color: '#4f6f52', background: '#eef6ee', border: '#b9d3bb', statMultiplier: 1.05, archiveWeight: 'Frequent' },
  { id: 'uncommon', name: 'Uncommon', shortLabel: 'III', tier: 3, color: '#0f766e', background: '#ecfdf5', border: '#99d5c9', statMultiplier: 1.1, archiveWeight: 'Regular' },
  { id: 'rare', name: 'Rare', shortLabel: 'IV', tier: 4, color: '#2563eb', background: '#eff6ff', border: '#b7cdf5', statMultiplier: 1.2, archiveWeight: 'Occasional' },
  { id: 'superior', name: 'Superior', shortLabel: 'V', tier: 5, color: '#7c3aed', background: '#f5f3ff', border: '#d2c4f5', statMultiplier: 1.3, archiveWeight: 'Limited' },
  { id: 'epic', name: 'Epic', shortLabel: 'VI', tier: 6, color: '#b45309', background: '#fffbeb', border: '#f1cf8b', statMultiplier: 1.45, archiveWeight: 'Scarce' },
  { id: 'legendary', name: 'Legendary', shortLabel: 'VII', tier: 7, color: '#c2410c', background: '#fff7ed', border: '#f3b58b', statMultiplier: 1.65, archiveWeight: 'Very scarce' },
  { id: 'mythic', name: 'Mythic', shortLabel: 'VIII', tier: 8, color: '#be185d', background: '#fff1f2', border: '#efb1c2', statMultiplier: 1.9, archiveWeight: 'Exceptional' },
  { id: 'relic', name: 'Relic', shortLabel: 'IX', tier: 9, color: '#854d0e', background: '#fefce8', border: '#e7d58b', statMultiplier: 2.25, archiveWeight: 'Unique' },
] as const;

export function getRarityByTier(tier: number): RarityDefinition {
  const clampedTier = Math.max(1, Math.min(RARITY_TIERS.length, Math.round(tier)));
  return RARITY_TIERS[clampedTier - 1];
}

export function getRarityForTier(tier: number, maximumTier = 5): RarityDefinition {
  const normalizedTier = maximumTier <= 1 ? 1 : ((Math.max(1, tier) - 1) / (maximumTier - 1)) * 8 + 1;
  return getRarityByTier(normalizedTier);
}

export function getRarityForProgress(level: number, maximumLevel: number): RarityDefinition {
  if (maximumLevel <= 0) return getRarityByTier(1);
  return getRarityForTier(Math.max(1, level + 1), Math.max(1, maximumLevel + 1));
}

export function formatRarityMultiplier(multiplier: number): string {
  return `${Math.round((multiplier - 1) * 100)}% archive bonus`;
}
