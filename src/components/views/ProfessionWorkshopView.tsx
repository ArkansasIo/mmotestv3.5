import React, { useState } from 'react';
import { Anvil, BookOpen, BriefcaseBusiness, Check, CircleHelp, Gem, Hammer, Leaf, Package, Pickaxe, Shield, Sparkles, Utensils, WandSparkles } from 'lucide-react';
import type { PlayerResources } from '../../types';
import {
  FANTASY_ORE_VEINS,
  PROFESSION_DEFINITIONS,
  PROFESSION_MATERIALS,
  PROFESSION_RECIPES,
  professionRank,
  professionXpToNextLevel,
  type ProfessionEquipment,
  type ProfessionEquipmentSlot,
  type ProfessionId,
  type ProfessionInventory,
  type ProfessionRecipe,
  type ProfessionSkillBook,
} from '../../data/professionData';

interface ProfessionWorkshopViewProps {
  resources: PlayerResources;
  skills: ProfessionSkillBook;
  inventory: ProfessionInventory;
  equipment: ProfessionEquipment;
  onGather: (professionId: ProfessionId, materialId?: string) => void;
  onCraft: (recipeId: string) => void;
  onEquip: (itemId: string) => void;
  onUnequip: (slot: NonNullable<ProfessionRecipe['output']['slot']>) => void;
}

const SLOT_LABELS: Record<NonNullable<ProfessionRecipe['output']['slot']>, string> = {
  weapon: 'Weapon',
  head: 'Head',
  chest: 'Chest',
  hands: 'Hands',
  legs: 'Legs',
  feet: 'Feet',
  offhand: 'Off-hand',
  ring: 'Ring',
  amulet: 'Amulet',
  tool: 'Tool',
  relic: 'Relic',
};

const PROFESSION_ICONS: Record<ProfessionId, React.ElementType> = {
  alchemy: Sparkles,
  blacksmithing: Anvil,
  enchanting: WandSparkles,
  engineering: Hammer,
  herbalism: Leaf,
  inscription: BookOpen,
  jewelcrafting: Gem,
  leatherworking: Shield,
  mining: Pickaxe,
  skinning: Shield,
  tailoring: BriefcaseBusiness,
  archaeology: CircleHelp,
  cooking: Utensils,
  fishing: Package,
};

const RARITY_STYLES = {
  Common: 'text-stone-700 border-stone-300 bg-stone-50',
  Fine: 'text-emerald-800 border-emerald-300 bg-emerald-50',
  Rare: 'text-sky-800 border-sky-300 bg-sky-50',
  Epic: 'text-violet-900 border-violet-300 bg-violet-50',
  Masterwork: 'text-amber-950 border-amber-400 bg-amber-100',
} as const;

function findOutput(itemId: string) {
  return PROFESSION_RECIPES.find((recipe) => recipe.output.id === itemId)?.output;
}

export const ProfessionWorkshopView: React.FC<ProfessionWorkshopViewProps> = ({
  resources,
  skills,
  inventory,
  equipment,
  onGather,
  onCraft,
  onEquip,
  onUnequip,
}) => {
  const [activeProfessionId, setActiveProfessionId] = useState<ProfessionId>('herbalism');
  const [activeTab, setActiveTab] = useState<'workshop' | 'veins' | 'satchel' | 'equipment'>('workshop');
  const [selectedOreId, setSelectedOreId] = useState(FANTASY_ORE_VEINS[0].id);
  const activeProfession = PROFESSION_DEFINITIONS.find((profession) => profession.id === activeProfessionId) || PROFESSION_DEFINITIONS[0];
  const activeSkill = skills[activeProfession.id];
  const activeRecipes = PROFESSION_RECIPES.filter((recipe) => recipe.professionId === activeProfession.id);
  const unlockedRecipes = activeRecipes.filter((recipe) => activeSkill.level >= recipe.requiredLevel);
  const inventoryEntries = Object.entries(inventory).filter(([, quantity]) => quantity > 0);
  const equipmentEntries = Object.entries(equipment) as [ProfessionEquipmentSlot, string][];
  const equippedStats = equipmentEntries.reduce((total, [, itemId]) => {
    const item = findOutput(itemId);
    if (!item) return total;
    return {
      attack: total.attack + item.stats.attack,
      ward: total.ward + item.stats.ward,
      vitality: total.vitality + item.stats.vitality,
    };
  }, { attack: 0, ward: 0, vitality: 0 });
  const xpTarget = professionXpToNextLevel(activeSkill.level);
  const progressPercent = xpTarget > 0 ? Math.min(100, activeSkill.xp / xpTarget * 100) : 100;
  const selectedOre = FANTASY_ORE_VEINS.find((vein) => vein.id === selectedOreId) || FANTASY_ORE_VEINS[0];
  const fieldMaterialId = activeProfession.id === 'mining'
    ? selectedOre.id
    : activeProfession.gatherMaterialIds?.[Math.min(activeProfession.gatherMaterialIds.length - 1, Math.floor((activeSkill.level - 1) * activeProfession.gatherMaterialIds.length / 100))];
  const fieldMaterial = fieldMaterialId ? PROFESSION_MATERIALS[fieldMaterialId] : undefined;
  const selectedOreUnlocked = activeProfession.id !== 'mining' || activeSkill.level >= selectedOre.requiredSkillLevel;

  const canCraft = (recipe: ProfessionRecipe) => {
    const hasMaterials = Object.entries(recipe.ingredients).every(([itemId, quantity]) => (inventory[itemId] || 0) >= quantity);
    return activeSkill.level >= recipe.requiredLevel && hasMaterials && resources.naquadah >= recipe.crownCost;
  };

  return (
    <main id="profession-workshop-view" className="space-y-5 text-[#282a24]">
      <header className="border border-[#3b4939] bg-[#1d2c23] p-5 text-[#f7f1df] sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#d6ad6a]">Guild Ledger · Age of Embers</span>
            <h1 className="mt-1 font-serif text-2xl font-bold sm:text-3xl">Craft & Callings</h1>
            <p className="mt-2 text-sm leading-relaxed text-[#dedbce]">Learn a trade, gather from the Marches, and make tools, provisions, and gear. Each calling advances from apprentice to grandmaster.</p>
          </div>
          <div className="flex gap-5 border-t border-white/15 pt-3 font-mono text-xs md:border-l md:border-t-0 md:pl-5 md:pt-0">
            <div><strong className="block text-xl text-white">{PROFESSION_DEFINITIONS.length}</strong><span className="text-[#c8c6ba]">callings</span></div>
            <div><strong className="block text-xl text-white">{PROFESSION_RECIPES.length}</strong><span className="text-[#c8c6ba]">recipes</span></div>
            <div><strong className="block text-xl text-amber-300">{inventoryEntries.reduce((sum, [, count]) => sum + count, 0)}</strong><span className="text-[#c8c6ba]">satchel items</span></div>
          </div>
        </div>
      </header>

      <nav aria-label="Choose a profession" className="flex gap-2 overflow-x-auto border-b border-[#d9d3c6] pb-3">
        {PROFESSION_DEFINITIONS.map((profession) => {
          const Icon = PROFESSION_ICONS[profession.id];
          const selected = profession.id === activeProfession.id;
          return (
            <button
              key={profession.id}
              type="button"
              aria-pressed={selected}
              onClick={() => {
                setActiveProfessionId(profession.id);
                setActiveTab(profession.id === 'mining' ? 'veins' : activeTab === 'veins' ? 'workshop' : activeTab);
              }}
              className={`flex shrink-0 items-center gap-2 border px-3 py-2 text-left transition-colors ${selected ? 'border-[#304635] bg-[#304635] text-white' : 'border-[#d9d3c6] bg-[#fffdf7] text-[#53544c] hover:border-[#7b765e]'}`}
            >
              <Icon size={15} aria-hidden="true" />
              <span className="text-[10px] font-bold uppercase">{profession.name}</span>
              <span className="font-mono text-[10px] opacity-70">{skills[profession.id].level}</span>
            </button>
          );
        })}
      </nav>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(260px,0.8fr)]">
        <div className="border border-[#d6d0c2] bg-[#fffdf7] p-4 sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8a5738]">{activeProfession.calling} calling · {activeProfession.workbench}</span>
              <h2 className="mt-1 font-serif text-xl font-bold text-[#252820]">{activeProfession.name}</h2>
              <p className="mt-1 max-w-xl text-xs leading-relaxed text-[#666257]">{activeProfession.description}</p>
            </div>
            <div className="min-w-36 border-l-2 border-[#c99a52] pl-3">
              <span className="block text-[9px] font-bold uppercase tracking-wider text-[#81796a]">Calling rank</span>
              <strong className="font-serif text-base text-[#324a36]">{professionRank(activeSkill.level)}</strong>
              <span className="block font-mono text-xs text-[#5d5c53]">Level {activeSkill.level} / 100</span>
            </div>
          </div>
          <div className="mt-4 h-2 overflow-hidden bg-[#e9e3d7]" role="progressbar" aria-label={`${activeProfession.name} experience`} aria-valuenow={activeSkill.level >= 100 ? 100 : Math.floor(progressPercent)} aria-valuemin={0} aria-valuemax={100}>
            <div className="h-full bg-[#64784c] transition-[width]" style={{ width: `${progressPercent}%` }} />
          </div>
          <div className="mt-1 flex justify-between font-mono text-[10px] text-[#797467]">
            <span>{activeSkill.xp.toLocaleString()} XP</span>
            <span>{xpTarget ? `${xpTarget.toLocaleString()} XP to next rank` : 'Grandmaster reached'}</span>
          </div>

          <div className="mt-5 flex gap-1 border-b border-[#ded8ca]" role="tablist" aria-label="Profession records">
            {([
              ['workshop', 'Workshop'],
              ...(activeProfession.id === 'mining' ? [['veins', 'Ore Veins'] as const] : []),
              ['satchel', `Satchel (${inventoryEntries.length})`],
              ['equipment', 'Equipment'],
            ] as const).map(([tab, label]) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={activeTab === tab}
                onClick={() => setActiveTab(tab)}
                className={`border-b-2 px-3 py-2 text-[10px] font-bold uppercase ${activeTab === tab ? 'border-[#354b38] text-[#354b38]' : 'border-transparent text-[#777164] hover:text-[#292b24]'}`}
              >
                {label}
              </button>
            ))}
          </div>

          {activeTab === 'workshop' && (
            <div className="space-y-4 pt-4">
              {activeProfession.gatherMaterialIds && (
                <div className="flex flex-col gap-3 border border-[#ded8ca] bg-[#f7f4eb] p-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#81796a]">Fieldwork</span>
                    <p className="text-xs text-[#514f46]">Gather {fieldMaterial?.name || 'field materials'} from {activeProfession.id === 'mining' ? selectedOre.region : fieldMaterial?.region}. Higher skill opens rarer finds.</p>
                  </div>
                  <button type="button" disabled={!selectedOreUnlocked} onClick={() => onGather(activeProfession.id, fieldMaterialId)} className="shrink-0 border border-[#354b38] bg-[#354b38] px-4 py-2 text-[10px] font-bold uppercase text-white hover:bg-[#26392a] disabled:cursor-not-allowed disabled:opacity-45">
                    {activeProfession.id === 'mining' ? 'Mine Selected Vein' : 'Gather Materials'}
                  </button>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-[#625d51]">Known recipes</h3>
                  <span className="font-mono text-[10px] text-[#81796a]">{unlockedRecipes.length} / {activeRecipes.length} learned</span>
                </div>
                {activeRecipes.map((recipe) => {
                  const available = canCraft(recipe);
                  const unlocked = activeSkill.level >= recipe.requiredLevel;
                  return (
                    <article key={recipe.id} className="border border-[#e0dacd] bg-white p-3">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="font-serif text-sm font-bold text-[#292b24]">{recipe.name}</h4>
                            <span className={`border px-1.5 py-0.5 text-[9px] font-bold uppercase ${RARITY_STYLES[recipe.output.rarity]}`}>{recipe.output.rarity}</span>
                            {!unlocked && <span className="font-mono text-[9px] text-[#777164]">Unlocks at {recipe.requiredLevel}</span>}
                          </div>
                          <p className="mt-1 text-[11px] text-[#6a665c]">{recipe.description}</p>
                          {recipe.output.slot && <p className="mt-1 text-[10px] text-[#526047]">Equipment · {SLOT_LABELS[recipe.output.slot]} · +{recipe.output.stats.attack} might · +{recipe.output.stats.ward} ward · +{recipe.output.stats.vitality} vigor</p>}
                          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] text-[#6d685d]">
                            {Object.entries(recipe.ingredients).map(([itemId, count]) => <span key={itemId}>{PROFESSION_MATERIALS[itemId]?.name || itemId}: {count} <strong className="text-[#393a33]">/ {inventory[itemId] || 0}</strong></span>)}
                            <span>Crowns: {recipe.crownCost}</span>
                          </div>
                        </div>
                        <button type="button" disabled={!available} onClick={() => onCraft(recipe.id)} className="shrink-0 border border-[#354b38] px-3 py-2 text-[10px] font-bold uppercase text-[#354b38] hover:bg-[#354b38] hover:text-white disabled:cursor-not-allowed disabled:border-[#d6d0c2] disabled:text-[#aaa397]">
                          {unlocked ? 'Craft' : 'Locked'}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'veins' && activeProfession.id === 'mining' && (
            <div className="space-y-2 pt-4">
              <div className="grid gap-2 sm:grid-cols-2">
                {FANTASY_ORE_VEINS.map((vein) => {
                  const unlocked = activeSkill.level >= vein.requiredSkillLevel;
                  const selected = selectedOreId === vein.id;
                  return (
                    <article key={vein.id} className={`border p-3 ${selected ? 'border-[#52694a] bg-[#f0f3e9]' : 'border-[#e0dacd] bg-white'}`}>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-serif text-sm font-bold text-[#30352b]">{vein.name}</h3>
                          <p className="mt-0.5 text-[9px] font-bold uppercase tracking-wide text-[#846344]">{vein.mineClass} · {vein.mineSubclass}</p>
                        </div>
                        <span className={`shrink-0 border px-1.5 py-0.5 font-mono text-[9px] ${unlocked ? 'border-[#d7c8a5] bg-[#f7f1e3] text-[#695332]' : 'border-[#ddd8ce] text-[#898478]'}`}>
                          MINING {vein.requiredSkillLevel}
                        </span>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-[10px]">
                        <p><span className="text-[#898478]">Ore type</span><strong className="ml-1 text-[#45483e]">{vein.oreType}</strong></p>
                        <p><span className="text-[#898478]">Subtype</span><strong className="ml-1 text-[#45483e]">{vein.oreSubtype}</strong></p>
                        <p><span className="text-[#898478]">Depth</span><strong className="ml-1 text-[#45483e]">{vein.depth}</strong></p>
                        <p><span className="text-[#898478]">Grade</span><strong className="ml-1 text-[#45483e]">{vein.rarity}</strong></p>
                      </div>
                      <p className="mt-2 text-[10px] leading-relaxed text-[#625f55]">{vein.details}</p>
                      <p className="mt-1 text-[9px] text-[#777164]">Known in {vein.region}. Used for: {vein.uses}</p>
                      <button type="button" disabled={!unlocked} aria-pressed={selected} onClick={() => setSelectedOreId(vein.id)} className="mt-2 border border-[#cfc7b8] px-2 py-1 text-[9px] font-bold uppercase text-[#59564c] hover:border-[#52694a] disabled:cursor-not-allowed disabled:opacity-40">
                        {selected ? 'Selected' : unlocked ? 'Select Vein' : 'Locked'}
                      </button>
                    </article>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'satchel' && (
            <div className="space-y-2 pt-4">
              {inventoryEntries.length ? inventoryEntries.map(([itemId, quantity]) => {
                const output = findOutput(itemId);
                const material = PROFESSION_MATERIALS[itemId];
                const canEquip = output?.kind === 'equipment' && Boolean(output.slot);
                return (
                  <div key={itemId} className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e9e3d7] py-2">
                    <div>
                      <strong className="block text-xs text-[#34352e]">{output?.name || material?.name || itemId}</strong>
                      <span className="text-[10px] text-[#7a7468]">{output ? `${output.rarity}${output.slot ? ` · ${SLOT_LABELS[output.slot]}` : ''}` : `${material?.rarity || 'Common'} · ${material?.region || 'Satchel'}`}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-[#535148]">×{quantity}</span>
                      {canEquip && <button type="button" onClick={() => onEquip(itemId)} className="border border-[#d4c8b0] px-2.5 py-1 text-[9px] font-bold uppercase text-[#544a36] hover:bg-[#f7f1e5]">Equip</button>}
                    </div>
                  </div>
                );
              }) : <p className="border border-dashed border-[#d6d0c2] p-6 text-center text-xs text-[#777164]">Your satchel is empty. Gather materials or craft a recipe.</p>}
            </div>
          )}

          {activeTab === 'equipment' && (
            <div className="grid gap-x-6 pt-4 sm:grid-cols-2">
              {(Object.keys(SLOT_LABELS) as NonNullable<ProfessionRecipe['output']['slot']>[]).map((slot) => {
                const itemId = equipment[slot];
                const item = itemId ? findOutput(itemId) : undefined;
                return (
                  <div key={slot} className="flex min-h-14 items-center justify-between gap-3 border-b border-[#e9e3d7] py-2">
                    <div>
                      <span className="block text-[9px] font-bold uppercase tracking-wider text-[#81796a]">{SLOT_LABELS[slot]}</span>
                      <strong className="text-xs text-[#34352e]">{item?.name || 'Empty'}</strong>
                    </div>
                    {itemId && <button type="button" onClick={() => onUnequip(slot)} className="text-[9px] font-bold uppercase text-[#73533c] underline">Unequip</button>}
                  </div>
                );
              })}
              <div className="col-span-full mt-3 flex flex-wrap gap-4 border border-[#d6d0c2] bg-[#f7f4eb] p-3 font-mono text-[10px] text-[#625d51]">
                <span>Equipped might <strong className="text-[#34352e]">{equippedStats.attack}</strong></span>
                <span>Equipped ward <strong className="text-[#34352e]">{equippedStats.ward}</strong></span>
                <span>Equipped vigor <strong className="text-[#34352e]">{equippedStats.vitality}</strong></span>
              </div>
            </div>
          )}
        </div>

        <aside className="border border-[#d6d0c2] bg-[#f7f4eb] p-4 sm:p-5">
          <h2 className="font-serif text-lg font-bold text-[#344332]">The fourteen callings</h2>
          <p className="mt-1 text-xs leading-relaxed text-[#6b665b]">Five gather from the land and water. Nine turn those finds into useful goods.</p>
          <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-[10px]">
            {PROFESSION_DEFINITIONS.map((profession) => (
              <div key={profession.id} className="flex items-center justify-between border-b border-[#e2dccf] py-1">
                <span className="text-[#5b594f]">{profession.name}</span>
                <span className="font-mono text-[#324a36]">{skills[profession.id].level}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 border-t border-[#ded8ca] pt-3 text-[10px] leading-relaxed text-[#777164]">Might adds to strike power, ward adds to defense, and vigor reduces your warband casualty estimate.</p>
        </aside>
      </section>
    </main>
  );
};
