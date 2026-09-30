import React, { useState } from 'react';
import { Heart, MapPin, Search, Shield, Sparkles, Swords } from 'lucide-react';
import {
  MONSTER_BESTIARY,
  MONSTER_CLASS_NAMES,
  MONSTER_THREAT_RANKS,
  type BestiaryMonster,
  type MonsterThreatRank,
} from '../../data/monsterBestiaryData';

const RANK_STYLES: Record<MonsterThreatRank, string> = {
  Common: 'border-stone-300 bg-stone-100 text-stone-700',
  Uncommon: 'border-emerald-300 bg-emerald-50 text-emerald-800',
  Veteran: 'border-sky-300 bg-sky-50 text-sky-800',
  Elite: 'border-orange-300 bg-orange-50 text-orange-900',
  Mythic: 'border-rose-300 bg-rose-50 text-rose-800',
  Apex: 'border-amber-400 bg-amber-100 text-amber-950',
};

const MonsterCard: React.FC<{ monster: BestiaryMonster }> = ({ monster }) => (
  <article className="flex min-w-0 flex-col border border-[#d6d0c2] bg-[#fffdf7] shadow-[0_2px_8px_rgba(43,39,28,0.08)]">
    <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
      <header className="min-w-0 border-b border-[#e5dfd1] pb-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#8a5738]">{monster.className} / {monster.subclassName}</span>
          <span className={`border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide ${RANK_STYLES[monster.rank]}`}>{monster.rank} · Tier {monster.tier}</span>
        </div>
        <h3 className="mt-2 break-words font-serif text-xl font-bold leading-tight text-[#20251f]">{monster.name}</h3>
        <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs italic text-[#776b5d]">{monster.title}</p>
          <span className="font-mono text-[10px] text-[#777164]">LEVEL {monster.level}</span>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
        <div><span className="block text-[9px] font-bold uppercase tracking-wider text-[#8b8375]">Type</span><strong className="text-[#343a32]">{monster.typeName}</strong></div>
        <div><span className="block text-[9px] font-bold uppercase tracking-wider text-[#8b8375]">Subtype</span><strong className="text-[#343a32]">{monster.subtypeName}</strong></div>
      </div>

      <div className="grid grid-cols-3 divide-x divide-[#ded8ca] border-y border-[#ded8ca] py-2 text-center font-mono">
        <div className="px-1"><Heart size={13} className="mx-auto mb-1 text-rose-700" aria-hidden="true" /><span className="text-[9px] text-[#80776a]">VITALITY</span><strong className="block text-xs text-[#343a32]">{monster.stats.health.toLocaleString()}</strong></div>
        <div className="px-1"><Swords size={13} className="mx-auto mb-1 text-orange-800" aria-hidden="true" /><span className="text-[9px] text-[#80776a]">ATTACK</span><strong className="block text-xs text-[#343a32]">{monster.stats.attack.toLocaleString()}</strong></div>
        <div className="px-1"><Shield size={13} className="mx-auto mb-1 text-sky-800" aria-hidden="true" /><span className="text-[9px] text-[#80776a]">WARD</span><strong className="block text-xs text-[#343a32]">{monster.stats.ward.toLocaleString()}</strong></div>
      </div>

      <div className="space-y-2 text-xs leading-relaxed text-[#57574e]">
        <p className="flex items-start gap-2"><MapPin size={14} className="mt-0.5 shrink-0 text-[#7b6245]" aria-hidden="true" /><span><strong className="text-[#343a32]">Known in:</strong> {monster.habitat}</span></p>
        <p className="flex items-start gap-2"><Sparkles size={14} className="mt-0.5 shrink-0 text-[#9a6c28]" aria-hidden="true" /><span><strong className="text-[#343a32]">{monster.ability.name}:</strong> {monster.ability.description}</span></p>
      </div>

      <details className="group border-t border-[#e5dfd1] pt-3 text-xs text-[#57574e]">
        <summary className="cursor-pointer font-bold text-[#66533d] marker:text-[#9c7440]">Field notes & reward</summary>
        <div className="space-y-3 pt-3 leading-relaxed">
          <p>{monster.lore}</p>
          <p><strong className="text-[#343a32]">Resists:</strong> {monster.resistance} <span className="px-1 text-[#a49b8d]">/</span> <strong className="text-[#343a32]">Weak to:</strong> {monster.weakness}</p>
          <p><strong className="text-[#343a32]">Bounty:</strong> {monster.bounty.iron.toLocaleString()} iron · {monster.bounty.moonstone.toLocaleString()} moonstone · {monster.bounty.aether.toLocaleString()} aether</p>
          <p><strong className="text-[#343a32]">Field rank:</strong> {monster.rank} — {monster.classTitle}</p>
        </div>
      </details>
    </div>
  </article>
);

export const MonsterBestiaryView: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState('All Classes');
  const [selectedRank, setSelectedRank] = useState('All Ranks');
  const [searchQuery, setSearchQuery] = useState('');
  const searchTerm = searchQuery.trim().toLowerCase();
  const filteredMonsters = MONSTER_BESTIARY.filter((monster) => {
    const matchesClass = selectedClass === 'All Classes' || monster.className === selectedClass;
    const matchesRank = selectedRank === 'All Ranks' || monster.rank === selectedRank;
    const matchesSearch = !searchTerm || [
      monster.name, monster.title, monster.className, monster.classTitle, monster.subclassName,
      monster.typeName, monster.subtypeName, monster.habitat, monster.ability.name,
    ].some((value) => value.toLowerCase().includes(searchTerm));
    return matchesClass && matchesRank && matchesSearch;
  });
  const apexCount = MONSTER_BESTIARY.filter((monster) => monster.rank === 'Apex').length;
  return (
    <main id="monster-bestiary-view" className="space-y-6 text-[#292b24]">
      <section className="border border-[#28372e] bg-[#17241e] p-6 text-[#f8f1df] sm:p-8 lg:p-10">
        <div className="max-w-3xl">
          <span className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#d6aa69]">Field ledger · Age of Embers</span>
          <h1 className="max-w-xl font-serif text-3xl font-bold leading-tight sm:text-4xl">The Marches Bestiary</h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#e0ddcf]">Ninety threats from the damaged groves, old delves, drowned roads, and failing waystones. Know their names before you cross their ground.</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/15 pt-4 font-mono text-xs">
            <span><strong className="mr-2 text-lg text-white">{MONSTER_BESTIARY.length}</strong><span className="text-[#c5c5b6]">creatures</span></span>
            <span><strong className="mr-2 text-lg text-white">{MONSTER_CLASS_NAMES.length}</strong><span className="text-[#c5c5b6]">classes</span></span>
            <span><strong className="mr-2 text-lg text-[#efb65e]">{apexCount}</strong><span className="text-[#c5c5b6]">apex threats</span></span>
          </div>
        </div>
      </section>

      <section aria-label="Bestiary filters" className="space-y-3 border-b border-[#d6d0c2] pb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="relative block w-full sm:max-w-sm">
            <span className="sr-only">Search monsters</span>
            <Search size={15} className="absolute left-3 top-3 text-[#817868]" aria-hidden="true" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Name, class, habitat, ability..."
              className="w-full border border-[#cec7b8] bg-[#fffdf7] py-2.5 pl-9 pr-3 text-sm text-[#292b24] outline-none focus:border-[#52674c] focus:ring-2 focus:ring-[#52674c]/20"
            />
          </label>
          <label className="flex shrink-0 items-center gap-2 text-xs font-bold text-[#5b584e]">
            <span>Threat rank</span>
            <select
              value={selectedRank}
              onChange={(event) => setSelectedRank(event.target.value)}
              className="border border-[#cec7b8] bg-[#fffdf7] px-3 py-2.5 text-xs text-[#292b24] outline-none focus:border-[#52674c]"
            >
              <option>All Ranks</option>
              {MONSTER_THREAT_RANKS.map((rank) => <option key={rank}>{rank}</option>)}
            </select>
          </label>
        </div>

        <div role="tablist" aria-label="Monster class" className="flex gap-2 overflow-x-auto pb-1">
          {['All Classes', ...MONSTER_CLASS_NAMES].map((className) => (
            <button
              key={className}
              type="button"
              role="tab"
              aria-selected={selectedClass === className}
              onClick={() => setSelectedClass(className)}
              className={`shrink-0 border px-3 py-2 text-[10px] font-bold uppercase tracking-wide transition-colors ${selectedClass === className ? 'border-[#304635] bg-[#304635] text-[#fff8e8]' : 'border-[#d6d0c2] bg-[#f7f4eb] text-[#5e5b51] hover:border-[#7b765e]'}`}
            >
              {className}
            </button>
          ))}
        </div>
        <p aria-live="polite" className="font-mono text-[11px] text-[#777164]">Showing {filteredMonsters.length} of {MONSTER_BESTIARY.length} field records</p>
      </section>

      {filteredMonsters.length > 0 ? (
        <section aria-label="Monster records" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredMonsters.map((monster) => <MonsterCard key={monster.id} monster={monster} />)}
        </section>
      ) : (
        <p className="border border-dashed border-[#c9c1b1] bg-[#f7f4eb] p-10 text-center text-sm text-[#6e695e]">No creatures match these field notes.</p>
      )}
    </main>
  );
};