import React, { useMemo, useState } from 'react';
import { Anvil, Check, Flame, Shield, Sparkles, Swords, TrendingUp } from 'lucide-react';
import type { PlayerResources } from '../../types';
import { PROFESSION_MATERIALS, type ProfessionEquipment, type ProfessionInventory } from '../../data/professionData';
import {
  findCraftedEquipment,
  getOwnedEquipmentIds,
  getTemperedEquipmentStats,
  getTemperingCap,
  getTemperingCost,
  type TemperingLevels,
} from '../../data/temperingData';
import { getProfessionRarityLevel, getRarityDetails } from '../../data/raritySystem';

interface TemperingViewProps {
  resources: PlayerResources;
  inventory: ProfessionInventory;
  equipment: ProfessionEquipment;
  temperingLevels: TemperingLevels;
  onTemper: (itemId: string) => void;
}

export const TemperingView: React.FC<TemperingViewProps> = ({
  resources,
  inventory,
  equipment,
  temperingLevels,
  onTemper,
}) => {
  const ownedItems = useMemo(
    () => getOwnedEquipmentIds(inventory, Object.values(equipment)),
    [inventory, equipment],
  );
  const [selectedItemId, setSelectedItemId] = useState(ownedItems[0] || '');
  const selectedId = ownedItems.includes(selectedItemId) ? selectedItemId : ownedItems[0] || '';
  const item = selectedId ? findCraftedEquipment(selectedId) : undefined;
  const currentLevel = selectedId ? temperingLevels[selectedId] || 0 : 0;
  const cap = item ? getTemperingCap(item.rarity) : 0;
  const nextCost = currentLevel < cap ? getTemperingCost(currentLevel + 1) : null;
  const currentBonus = selectedId ? getTemperedEquipmentStats(selectedId, temperingLevels) : { attack: 0, ward: 0, vitality: 0 };
  const nextBonus = selectedId && currentLevel < cap
    ? getTemperedEquipmentStats(selectedId, { ...temperingLevels, [selectedId]: currentLevel + 1 })
    : currentBonus;
  const costMaterialCount = nextCost
    ? Math.min(inventory[nextCost.materialId] || 0, resources.oreStockpile?.[nextCost.materialId] ?? Number.MAX_SAFE_INTEGER)
    : 0;
  const canAfford = Boolean(nextCost) && resources.metal >= nextCost!.metal && resources.crystal >= nextCost!.crystal && resources.deuterium >= nextCost!.deuterium && resources.naquadah >= nextCost!.naquadah && costMaterialCount >= nextCost!.materialCount;
  const totalLevels = Object.values(temperingLevels).reduce((sum, level) => sum + level, 0);
  const equippedItems = new Set(Object.values(equipment));

  return (
    <main id="tempering-view" className="space-y-5 text-[#282a24]">
      <header className="grid gap-5 border border-[#3b4939] bg-[#1d2c23] p-5 text-[#f7f1df] md:grid-cols-[minmax(0,1fr)_auto] md:items-end sm:p-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#d6ad6a]">Royal Warforge · Tempering Hall</span>
          <h1 className="mt-1 font-serif text-2xl font-bold sm:text-3xl">Temper & Hone</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#dedbce]">Strengthen crafted arms and armor with ore, realm materials, and Crown investment. Tempering is guaranteed, permanent, and capped by each item’s rarity.</p>
        </div>
        <div className="grid grid-cols-3 border-t border-white/15 pt-3 text-center font-mono text-xs md:border-l md:border-t-0 md:pl-5 md:pt-0">
          <div className="px-3"><strong className="block text-lg text-white">{ownedItems.length}</strong><span className="text-[9px] uppercase text-[#c3c0b3]">Owned gear</span></div>
          <div className="border-x border-white/15 px-3"><strong className="block text-lg text-amber-300">{totalLevels}</strong><span className="text-[9px] uppercase text-[#c3c0b3]">Temper ranks</span></div>
          <div className="px-3"><strong className="block text-lg text-white">{Object.values(temperingLevels).filter((level) => level > 0).length}</strong><span className="text-[9px] uppercase text-[#c3c0b3]">Gear honed</span></div>
        </div>
      </header>

      <section className="grid gap-4 lg:grid-cols-[minmax(250px,0.8fr)_minmax(0,1.5fr)]">
        <div className="border border-[#d6d0c2] bg-[#fffdf7]">
          <div className="border-b border-[#ded8ca] bg-[#f7f4eb] p-4">
            <h2 className="font-serif text-lg font-bold text-[#344332]">Owned crafted gear</h2>
            <p className="mt-1 text-[10px] text-[#777164]">Inventory and equipped items are eligible.</p>
          </div>
          <div className="max-h-[620px] overflow-y-auto p-2">
            {ownedItems.length ? ownedItems.map((itemId) => {
              const gear = findCraftedEquipment(itemId)!;
              const rarity = getRarityDetails(getProfessionRarityLevel(gear.rarity));
              const level = temperingLevels[itemId] || 0;
              const selected = selectedId === itemId;
              return (
                <button key={itemId} type="button" aria-pressed={selected} onClick={() => setSelectedItemId(itemId)} className={`flex w-full items-center justify-between gap-3 border-b px-3 py-3 text-left transition-colors ${selected ? 'border-[#344b37] bg-[#e9efe5]' : 'border-[#e9e3d7] hover:bg-[#f7f4eb]'}`}>
                  <span className="min-w-0">
                    <strong className="block truncate text-xs text-[#34352e]">{gear.name}</strong>
                    <span className="mt-1 flex flex-wrap items-center gap-1.5 text-[9px] text-[#7a7468]">
                      <span className={`border px-1.5 py-0.5 ${rarity.className}`}>R{rarity.level} · {gear.rarity}</span>
                      <span>{gear.slot}</span>
                      {equippedItems.has(itemId) && <span className="inline-flex items-center gap-1 text-emerald-800"><Check size={10} /> Equipped</span>}
                    </span>
                  </span>
                  <span className="shrink-0 border border-[#d6d0c2] px-2 py-1 font-mono text-[10px] text-[#344332]">+{level} / {getTemperingCap(gear.rarity)}</span>
                </button>
              );
            }) : <p className="p-6 text-center text-xs text-[#777164]">No crafted gear yet. Make equipment at Craft & Callings to begin tempering.</p>}
          </div>
        </div>

        {item && selectedId ? (
          <article className="border border-[#786342] bg-[#242b23] p-4 text-[#eee4cc] sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#c6a870]">{item.slot} · {equippedItems.has(selectedId) ? 'Equipped item' : 'In inventory'}</span>
                <h2 className="mt-1 font-serif text-xl font-bold text-[#fff8e8]">{item.name}</h2>
              </div>
              <span className={`border px-2 py-1 text-[9px] font-bold uppercase ${getRarityDetails(getProfessionRarityLevel(item.rarity)).className}`}>R{getProfessionRarityLevel(item.rarity)} · {item.rarity}</span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {([
                ['Might', item.stats.attack, currentBonus.attack, nextBonus.attack, <Swords size={14} />],
                ['Ward', item.stats.ward, currentBonus.ward, nextBonus.ward, <Shield size={14} />],
                ['Vigor', item.stats.vitality, currentBonus.vitality, nextBonus.vitality, <Sparkles size={14} />],
              ] as const).map(([label, base, bonus, next, icon]) => (
                <div key={label} className="border border-white/10 bg-[#1a211b] p-3">
                  <span className="flex items-center gap-1 text-[9px] uppercase text-[#aaa99d]">{icon}{label}</span>
                  <strong className="mt-1 block text-sm text-white">{base + bonus}</strong>
                  <span className="text-[9px] text-emerald-300">{bonus ? `+${bonus}` : 'Base'}{next > bonus ? ` → +${next}` : ''} temper</span>
                </div>
              ))}
            </div>

            <div className="mt-5 border border-white/10 bg-[#1a211b] p-4">
              <div className="flex items-center justify-between gap-3">
                <div><span className="text-[9px] font-bold uppercase tracking-wider text-[#c5ad7d]">Temper rank</span><strong className="mt-1 block font-mono text-xl text-white">+{currentLevel} <span className="text-sm text-[#aaa99d]">/ {cap}</span></strong></div>
                <div className="flex items-center gap-1 text-[#d9aa5b]"><Anvil size={19} /><Flame size={17} /></div>
              </div>
              <div className="mt-3 grid grid-cols-5 gap-1" aria-label={`Temper rank ${currentLevel} of ${cap}`}>
                {Array.from({ length: cap }).map((_, index) => <span key={index} className={`h-2 ${index < currentLevel ? 'bg-[#d9aa5b]' : 'bg-[#41483e]'}`} />)}
              </div>
            </div>

            {nextCost ? (
              <div className="mt-4 border border-white/10 bg-[#1a211b] p-4">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#d5b879]"><TrendingUp size={14} /> Next rank costs</div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] sm:grid-cols-3">
                  <span className={resources.metal < nextCost.metal ? 'text-rose-300' : 'text-[#d6d2c3]'}>Iron {nextCost.metal.toLocaleString()}</span>
                  <span className={resources.crystal < nextCost.crystal ? 'text-rose-300' : 'text-[#d6d2c3]'}>Moonstone {nextCost.crystal.toLocaleString()}</span>
                  <span className={resources.deuterium < nextCost.deuterium ? 'text-rose-300' : 'text-[#d6d2c3]'}>Deuterium {nextCost.deuterium.toLocaleString()}</span>
                  <span className={resources.naquadah < nextCost.naquadah ? 'text-rose-300' : 'text-[#d6d2c3]'}>Crowns {nextCost.naquadah.toLocaleString()}</span>
                  <span className={costMaterialCount < nextCost.materialCount ? 'text-rose-300' : 'text-[#d6d2c3]'}>{PROFESSION_MATERIALS[nextCost.materialId]?.name || nextCost.materialId} ×{nextCost.materialCount}</span>
                </div>
                <button type="button" disabled={!canAfford} onClick={() => onTemper(selectedId)} className="mt-4 flex w-full items-center justify-center gap-2 border border-[#bd8d48] bg-[#826038] px-4 py-3 text-[10px] font-bold uppercase text-white hover:bg-[#9a7542] disabled:cursor-not-allowed disabled:opacity-45"><Anvil size={14} />{canAfford ? `Temper to rank +${currentLevel + 1}` : 'Insufficient materials'}</button>
              </div>
            ) : (
              <div className="mt-4 border border-emerald-800 bg-emerald-950/40 p-4 text-center text-xs text-emerald-100">This item has reached its {item.rarity} tempering limit.</div>
            )}
            <p className="mt-3 text-[9px] leading-relaxed text-[#aaa99d]">Each temper rank permanently increases the item’s nonzero stats by 5% of its base value. Tempering never fails and has no chance to damage or destroy gear.</p>
          </article>
        ) : (
          <div className="grid min-h-64 place-items-center border border-dashed border-[#d6d0c2] bg-[#fffdf7] p-8 text-center text-xs text-[#777164]">Craft or acquire equipment to see its tempering options.</div>
        )}
      </section>
    </main>
  );
};