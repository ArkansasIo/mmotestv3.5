import React, { useEffect, useState } from 'react';
import { BookOpen, CircleDollarSign, Compass, Flame, HeartPulse, RotateCcw, ScrollText, Shield, Sparkles, WandSparkles } from 'lucide-react';
import type { PlayerResources } from '../../types';
import {
  ARCANE_CODEX_SEED_VERSION_KEY,
  ARCANE_CODEX_STORAGE_KEY,
  INITIAL_MAGIC_SCHOOLS,
  type MagicSchool,
} from '../../data/arcaneCodexData';
import {
  castMagicSpell,
  createInitialMagicProgress,
  getPlayableSpells,
  learnMagicSpell,
  MAGIC_CAST_LOG_LIMIT,
  MAGIC_PROGRESS_STORAGE_KEY,
  parseMagicProgress,
  parseMagicSchools,
  sellMagicSpell,
  type PlayableSpell,
  type PlayerMagicProgress,
} from '../../data/magicSystemData';
import { sound } from '../../sound';

interface MagicSystemViewProps {
  resources: PlayerResources;
  onUpdateResources: (updates: Partial<PlayerResources>) => void;
}

type MagicTab = 'grimoire' | 'market' | 'casting';

function loadSchools(): MagicSchool[] {
  try {
    return parseMagicSchools(
      window.localStorage.getItem(ARCANE_CODEX_STORAGE_KEY),
      window.localStorage.getItem(ARCANE_CODEX_SEED_VERSION_KEY),
    );
  } catch {
    return INITIAL_MAGIC_SCHOOLS;
  }
}

function loadProgress(spells: PlayableSpell[]): PlayerMagicProgress {
  try {
    return parseMagicProgress(window.localStorage.getItem(MAGIC_PROGRESS_STORAGE_KEY), spells);
  } catch {
    return createInitialMagicProgress(spells);
  }
}

function uniqueValues(values: string[]): string[] {
  return [...new Set(values)].sort((left, right) => left.localeCompare(right));
}

const EFFECT_ICONS = {
  strike: Flame,
  ward: Shield,
  mend: HeartPulse,
  control: Sparkles,
  reveal: Compass,
  journey: Compass,
  insight: BookOpen,
} as const;

const formatCrowns = (amount: number) => `${amount.toLocaleString()} Crowns`;

export const MagicSystemView: React.FC<MagicSystemViewProps> = ({ resources, onUpdateResources }) => {
  const [schools] = useState<MagicSchool[]>(loadSchools);
  const spells = getPlayableSpells(schools);
  const [progress, setProgress] = useState<PlayerMagicProgress>(() => loadProgress(spells));
  const [activeTab, setActiveTab] = useState<MagicTab>('grimoire');
  const [search, setSearch] = useState('');
  const [schoolFilter, setSchoolFilter] = useState('all');
  const [classFilter, setClassFilter] = useState('all');
  const [subclassFilter, setSubclassFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [notice, setNotice] = useState<{ kind: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(MAGIC_PROGRESS_STORAGE_KEY, JSON.stringify(progress));
    } catch {
      setNotice({ kind: 'error', text: 'This browser could not save spellbook progress.' });
    }
  }, [progress]);

  const knownSpellIds = new Set(progress.learnedSpellIds);
  const schoolOptions = uniqueValues(spells.map((spell) => `${spell.schoolId}|${spell.schoolName}`));
  const selectedSchoolId = schoolFilter === 'all' ? 'all' : schoolFilter.split('|')[0];
  const schoolSpells = spells.filter((spell) => selectedSchoolId === 'all' || spell.schoolId === selectedSchoolId);
  const classOptions = uniqueValues(schoolSpells.map((spell) => spell.magicClass));
  const classSpells = schoolSpells.filter((spell) => classFilter === 'all' || spell.magicClass === classFilter);
  const subclassOptions = uniqueValues(classSpells.map((spell) => spell.subclass));
  const typeOptions = uniqueValues(spells.map((spell) => spell.type));
  const normalizedSearch = search.trim().toLowerCase();
  const visibleSpells = spells.filter((spell) => {
    if (activeTab === 'grimoire' && !knownSpellIds.has(spell.id)) return false;
    if (activeTab === 'market' && knownSpellIds.has(spell.id)) return false;
    if (activeTab === 'casting' && !knownSpellIds.has(spell.id)) return false;
    if (selectedSchoolId !== 'all' && spell.schoolId !== selectedSchoolId) return false;
    if (classFilter !== 'all' && spell.magicClass !== classFilter) return false;
    if (subclassFilter !== 'all' && spell.subclass !== subclassFilter) return false;
    if (typeFilter !== 'all' && spell.type !== typeFilter) return false;
    if (normalizedSearch) {
      const searchable = [spell.name, spell.title, spell.details, spell.schoolName, spell.magicClass, spell.subclass, spell.type, spell.subtype]
        .join(' ')
        .toLowerCase();
      if (!searchable.includes(normalizedSearch)) return false;
    }
    return true;
  });

  const showFeedback = (kind: 'success' | 'error', text: string) => setNotice({ kind, text });

  const handleLearn = (spell: PlayableSpell) => {
    if (resources.naquadah < spell.crownCost) {
      sound.play('warning');
      showFeedback('error', `You need ${formatCrowns(spell.crownCost)} to learn ${spell.name}.`);
      return;
    }
    const nextProgress = learnMagicSpell(progress, spell.id);
    if (!nextProgress) return;
    setProgress(nextProgress);
    onUpdateResources({ naquadah: resources.naquadah - spell.crownCost });
    sound.play('confirm');
    showFeedback('success', `${spell.name} has been copied into your grimoire.`);
  };

  const handleSell = (spell: PlayableSpell) => {
    const nextProgress = sellMagicSpell(progress, spell.id);
    if (!nextProgress) return;
    setProgress(nextProgress);
    onUpdateResources({ naquadah: resources.naquadah + spell.sellValue });
    sound.play('trade');
    showFeedback('success', `You sold the ${spell.name} scroll for ${formatCrowns(spell.sellValue)}.`);
  };

  const handleCast = (spell: PlayableSpell) => {
    if (resources.energy < spell.manaCost) {
      sound.play('warning');
      showFeedback('error', `${spell.name} requires ${spell.manaCost} Aether. The Leyline reserve has ${resources.energy}.`);
      return;
    }
    const nextProgress = castMagicSpell(progress, spell);
    if (!nextProgress) {
      showFeedback('error', 'Learn this spell before casting it.');
      return;
    }
    setProgress(nextProgress);
    onUpdateResources({ energy: resources.energy - spell.manaCost });
    sound.play('success');
    showFeedback('success', nextProgress.castLog[0].outcome);
  };

  const resetPracticeWisp = () => {
    setProgress((current) => ({ ...current, practiceTargetHealth: 100 }));
    sound.play('confirm');
  };

  const tabs: Array<{ id: MagicTab; label: string; icon: React.ElementType }> = [
    { id: 'grimoire', label: `Grimoire (${progress.learnedSpellIds.length})`, icon: BookOpen },
    { id: 'market', label: `Spell Market (${spells.length - progress.learnedSpellIds.length})`, icon: CircleDollarSign },
    { id: 'casting', label: 'Casting Circle', icon: WandSparkles },
  ];

  return (
    <main id="magic-system-view" className="space-y-5 text-[#272b25]">
      <header className="grid gap-5 border border-[#405143] bg-[#202b23] p-5 text-[#f6f1df] md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:p-7">
        <div>
          <span className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#d4b66d]"><Sparkles size={13} /> Age of Embers · Living spellcraft</span>
          <h1 className="mt-1 font-serif text-2xl font-bold sm:text-3xl">The Living Grimoire</h1>
          <p className="mt-2 max-w-2xl text-xs leading-relaxed text-[#d5d4c7]">Study ten elemental schools and five founder traditions, learn a working, and practice its effects before the March.</p>
        </div>
        <div className="grid grid-cols-3 border-t border-white/15 pt-3 text-center font-mono text-[9px] uppercase text-[#d1c9b3] md:border-l md:border-t-0 md:pl-5 md:pt-0">
          <div className="px-3"><strong className="block text-lg text-white">{schools.length}</strong>Schools</div>
          <div className="border-x border-white/15 px-3"><strong className="block text-lg text-white">{spells.length}</strong>Spells</div>
          <div className="px-3"><strong className="block text-lg text-emerald-200">{resources.energy.toLocaleString()}</strong>Aether</div>
        </div>
      </header>

      <section className="grid gap-3 border-b border-[#d8d4c7] pb-4 sm:grid-cols-3">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button key={id} type="button" role="tab" aria-selected={activeTab === id} onClick={() => setActiveTab(id)} className={`flex items-center justify-center gap-2 border px-3 py-2.5 text-[10px] font-bold uppercase tracking-wide ${activeTab === id ? 'border-[#273b2d] bg-[#273b2d] text-white' : 'border-[#d7d2c5] bg-white text-[#57594f] hover:border-[#87917b]'}`}>
            <Icon size={14} /> {label}
          </button>
        ))}
      </section>

      {notice && (
        <div role="status" className={`flex items-start justify-between gap-3 border px-4 py-3 text-xs ${notice.kind === 'success' ? 'border-emerald-300 bg-emerald-50 text-emerald-950' : 'border-rose-300 bg-rose-50 text-rose-900'}`}>
          <span>{notice.text}</span>
          <button type="button" aria-label="Dismiss spellcraft message" onClick={() => setNotice(null)} className="shrink-0 font-bold">×</button>
        </div>
      )}

      <div className="grid gap-2 border border-[#d8d4c7] bg-[#f8f6ee] p-3 sm:grid-cols-2 xl:grid-cols-5">
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search school, class, spell, type..." className="border border-[#d5d0c1] bg-white px-3 py-2 text-xs outline-none focus:border-emerald-700" />
        <select aria-label="Filter by magic school" value={schoolFilter} onChange={(event) => { setSchoolFilter(event.target.value); setClassFilter('all'); setSubclassFilter('all'); }} className="border border-[#d5d0c1] bg-white px-3 py-2 text-xs">
          <option value="all">All schools</option>
          {schoolOptions.map((entry) => { const [id, name] = entry.split('|'); return <option key={id} value={entry}>{name}</option>; })}
        </select>
        <select aria-label="Filter by magic class" value={classFilter} onChange={(event) => { setClassFilter(event.target.value); setSubclassFilter('all'); }} className="border border-[#d5d0c1] bg-white px-3 py-2 text-xs">
          <option value="all">All classes</option>
          {classOptions.map((name) => <option key={name} value={name}>{name}</option>)}
        </select>
        <select aria-label="Filter by subclass" value={subclassFilter} onChange={(event) => setSubclassFilter(event.target.value)} className="border border-[#d5d0c1] bg-white px-3 py-2 text-xs">
          <option value="all">All subclasses</option>
          {subclassOptions.map((name) => <option key={name} value={name}>{name}</option>)}
        </select>
        <select aria-label="Filter by spell type" value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} className="border border-[#d5d0c1] bg-white px-3 py-2 text-xs">
          <option value="all">All spell types</option>
          {typeOptions.map((name) => <option key={name} value={name}>{name}</option>)}
        </select>
      </div>

      {activeTab === 'casting' && (
        <section aria-label="Casting practice" className="grid gap-4 border border-[#657251] bg-[#e9edde] p-4 sm:grid-cols-4 sm:items-center">
          <div className="sm:col-span-2"><span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#69734c]">Practice familiar</span><h2 className="mt-1 font-serif text-lg font-bold text-[#283428]">Aegis Training Wisp</h2><p className="mt-1 text-xs text-[#63695d]">A warded target for testing force, control, and recovery. Practice effects are local to this grimoire.</p></div>
          <div className="border border-[#d5dcc9] bg-white p-3 text-center font-mono"><strong className="block text-xl text-[#273b2d]">{progress.practiceTargetHealth}/100</strong><span className="text-[9px] uppercase text-[#777777]">Wisp vitality</span><div className="mt-2 h-1.5 bg-[#e5e5e0]"><div className="h-full bg-[#718b59]" style={{ width: `${progress.practiceTargetHealth}%` }} /></div></div>
          <button type="button" onClick={resetPracticeWisp} className="flex items-center justify-center gap-2 border border-[#566849] bg-white px-3 py-2 text-[10px] font-bold uppercase text-[#33432d] hover:bg-[#f5f6ef]"><RotateCcw size={13} /> Reset practice</button>
          <div className="grid grid-cols-3 border-t border-[#d5dcc9] pt-3 text-center font-mono text-[9px] uppercase text-[#727466] sm:col-span-4">
            <span>Vitality<strong className="block text-sm text-[#2d382b]">{progress.vitality}/100</strong></span>
            <span className="border-x border-[#d5dcc9]">Ward<strong className="block text-sm text-[#2d382b]">{progress.wardStrength}</strong></span>
            <span>Insight<strong className="block text-sm text-[#2d382b]">{progress.arcaneInsight}</strong></span>
          </div>
        </section>
      )}

      <section aria-label="Spell catalog" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {visibleSpells.map((spell) => {
          const mastery = progress.masteryXp[spell.id] || 0;
          const EffectIcon = EFFECT_ICONS[spell.effect];
          const affordable = resources.naquadah >= spell.crownCost;
          const hasMana = resources.energy >= spell.manaCost;
          return (
            <article key={spell.id} className="flex min-w-0 flex-col border border-[#d9d4c7] bg-white p-4 shadow-[0_1px_0_rgba(30,35,25,0.04)]">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0"><span className="text-[9px] font-bold uppercase tracking-[0.13em] text-[#7a725e]">{spell.schoolName} · {spell.schoolType} · {spell.schoolSubtype} · {spell.rank}</span><h2 className="mt-1 font-serif text-lg font-bold text-[#272b25]">{spell.name}</h2><p className="text-[10px] font-semibold text-emerald-800">{spell.title}</p></div>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#d8d0b8] bg-[#f8f5eb] text-[#7a6741]" title={spell.type}><EffectIcon size={16} /></span>
              </div>
              <p className="mt-3 min-h-12 text-xs leading-relaxed text-[#65665d]">{spell.details}</p>
              <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 border-y border-[#eeeae1] py-3 text-[10px]">
                <div><dt className="uppercase text-[#8a877d]">Class</dt><dd className="font-semibold text-[#373b32]">{spell.magicClass}</dd><dd className="text-[9px] text-[#777367]">{spell.classType} · {spell.classSubtype}</dd></div>
                <div><dt className="uppercase text-[#8a877d]">Subclass</dt><dd className="font-semibold text-[#373b32]">{spell.subclass}</dd><dd className="text-[9px] text-[#777367]">{spell.subclassType} · {spell.subclassSubtype}</dd></div>
                <div><dt className="uppercase text-[#8a877d]">Spell type · subtype</dt><dd className="font-semibold text-[#373b32]">{spell.type} · {spell.subtype}</dd></div>
                <div><dt className="uppercase text-[#8a877d]">Target</dt><dd className="font-semibold text-[#373b32]">{spell.target}</dd></div>
                <div><dt className="uppercase text-[#8a877d]">Aether Cost</dt><dd className="font-mono font-semibold text-[#373b32]">{spell.manaCost}</dd></div>
                <div><dt className="uppercase text-[#8a877d]">Stats · Potency / Range / Duration / Precision</dt><dd className="font-mono font-semibold text-[#373b32]">{spell.stats.potency} / {spell.stats.range} / {spell.stats.durationTurns} turns / {spell.stats.precision}%</dd></div>
                <div className="col-span-2"><dt className="uppercase text-[#8a877d]">Substats · Damage / Ward / Healing / Control / Utility</dt><dd className="font-mono font-semibold text-[#373b32]">{spell.subStats.damage} / {spell.subStats.ward} / {spell.subStats.healing} / {spell.subStats.control} / {spell.subStats.utility}</dd></div>
                {activeTab === 'grimoire' && <div><dt className="uppercase text-[#8a877d]">Mastery</dt><dd className="font-mono font-semibold text-[#373b32]">{mastery} XP</dd></div>}
              </dl>
              <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                {activeTab === 'market' && <><span className="font-mono text-[10px] text-[#726443]">Learn · {formatCrowns(spell.crownCost)}</span><button type="button" disabled={!affordable} onClick={() => handleLearn(spell)} className="border border-[#526148] bg-[#344632] px-3 py-2 text-[10px] font-bold uppercase text-white hover:bg-[#435940] disabled:cursor-not-allowed disabled:opacity-40">Learn spell</button></>}
                {activeTab === 'grimoire' && <><span className="font-mono text-[10px] text-[#777367]">Sell · {formatCrowns(spell.sellValue)}</span><button type="button" onClick={() => handleSell(spell)} className="border border-[#d4c8aa] bg-[#fbf7e9] px-3 py-2 text-[10px] font-bold uppercase text-[#655536] hover:bg-[#f3ebd3]">Sell scroll</button></>}
                {activeTab === 'casting' && <><span className="font-mono text-[10px] text-[#777367]">Cost · {spell.manaCost} Aether</span><button type="button" disabled={!hasMana} onClick={() => handleCast(spell)} className="flex items-center gap-1.5 border border-[#526148] bg-[#344632] px-3 py-2 text-[10px] font-bold uppercase text-white hover:bg-[#435940] disabled:cursor-not-allowed disabled:opacity-40"><WandSparkles size={13} /> Cast</button></>}
              </div>
            </article>
          );
        })}
        {visibleSpells.length === 0 && <div className="border border-dashed border-[#cfcabf] bg-white p-8 text-center text-xs text-[#6b6b61] sm:col-span-2 xl:col-span-3">No spells match this view. Adjust the filters or visit the Spell Market.</div>}
      </section>

      {activeTab === 'casting' && progress.castLog.length > 0 && (
        <section className="border border-[#d9d4c7] bg-white">
          <div className="flex items-center gap-2 border-b border-[#eeeae1] px-4 py-3"><ScrollText size={15} className="text-[#88744b]" /><h2 className="text-xs font-bold uppercase tracking-wider">Casting Chronicle</h2></div>
          <ol className="divide-y divide-[#eeeae1]">
            {progress.castLog.slice(0, MAGIC_CAST_LOG_LIMIT).map((record) => <li key={record.id} className="flex flex-wrap items-start justify-between gap-2 px-4 py-3 text-xs"><div><strong className="text-[#33382d]">{record.spellName}</strong><p className="mt-1 text-[#6c6b61]">{record.outcome}</p></div><time className="font-mono text-[9px] text-[#89867b]">{new Date(record.createdAt).toLocaleString()}</time></li>)}
          </ol>
        </section>
      )}
    </main>
  );
};
