import React, { useEffect, useState } from 'react';
import { BookOpen, Plus, Sparkles, Trash2 } from 'lucide-react';
import { ARCANE_CODEX_SEED_VERSION, ARCANE_CODEX_SEED_VERSION_KEY, ARCANE_CODEX_STORAGE_KEY, INITIAL_MAGIC_SCHOOLS, mergeMagicSchoolCatalog, type CodexEntry, type MagicClass, type MagicEffectType, type MagicSchool, type MagicSubclass } from '../../../data/arcaneCodexData';
type EntryType = 'school' | 'class' | 'subclass' | 'spell';

type EntryForm = {
  name: string;
  rank: string;
  title: string;
  details: string;
  type: string;
  subtype: string;
  target: string;
  effect: MagicEffectType | '';
  manaCost: string;
  power: string;
  crownCost: string;
  range: string;
  durationTurns: string;
  precision: string;
};

const EMPTY_FORM: EntryForm = { name: '', rank: '', title: '', details: '', type: '', subtype: '', target: '', effect: 'strike', manaCost: '', power: '', crownCost: '', range: '', durationTurns: '', precision: '' };

const readCodex = (): MagicSchool[] => {
  if (typeof window === 'undefined') return INITIAL_MAGIC_SCHOOLS;
  try {
    const stored = window.localStorage.getItem(ARCANE_CODEX_STORAGE_KEY);
    if (!stored) return INITIAL_MAGIC_SCHOOLS;
    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) return INITIAL_MAGIC_SCHOOLS;
    const seedVersion = window.localStorage.getItem(ARCANE_CODEX_SEED_VERSION_KEY);
    if (parsed.length === 0) return seedVersion === ARCANE_CODEX_SEED_VERSION ? [] : INITIAL_MAGIC_SCHOOLS;
    return mergeMagicSchoolCatalog(parsed as MagicSchool[]);
  } catch {
    return INITIAL_MAGIC_SCHOOLS;
  }
};

const createId = () => `arcane-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const EntrySummary: React.FC<{ entry: CodexEntry; onDelete: () => void }> = ({ entry, onDelete }) => (
  <div className="flex items-start justify-between gap-3">
    <div className="min-w-0">
      <div className="flex flex-wrap items-center gap-2">
        <h4 className="font-bold text-[#111111]">{entry.name}</h4>
        {entry.rank && <span className="border border-amber-300 bg-amber-50 px-2 py-0.5 text-[10px] font-mono font-bold uppercase text-amber-900">{entry.rank}</span>}
      </div>
      {entry.title && <p className="mt-1 text-xs font-semibold text-emerald-800">{entry.title}</p>}
      {(entry.type || entry.subtype) && <p className="mt-1 text-[10px] font-mono text-[#777367]">{entry.type}{entry.type && entry.subtype ? ' · ' : ''}{entry.subtype}</p>}
      {entry.details && <p className="mt-2 whitespace-pre-wrap text-xs leading-relaxed text-[#666666]">{entry.details}</p>}
    </div>
    <button type="button" onClick={onDelete} title={`Delete ${entry.name}`} aria-label={`Delete ${entry.name}`} className="shrink-0 border border-red-200 p-2 text-red-700 hover:bg-red-50 cursor-pointer">
      <Trash2 size={14} />
    </button>
  </div>
);

export const AdminArcaneCodexTab: React.FC = () => {
  const [schools, setSchools] = useState<MagicSchool[]>(readCodex);
  const [entryType, setEntryType] = useState<EntryType>('school');
  const [selectedSchoolId, setSelectedSchoolId] = useState('');
  const [selectedClassId, setSelectedClassId] = useState('');
  const [selectedSubclassId, setSelectedSubclassId] = useState('');
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    window.localStorage.setItem(ARCANE_CODEX_STORAGE_KEY, JSON.stringify(schools));
    window.localStorage.setItem(ARCANE_CODEX_SEED_VERSION_KEY, ARCANE_CODEX_SEED_VERSION);
  }, [schools]);

  const activeSchool = schools.find((school) => school.id === selectedSchoolId) || schools[0];
  const activeClass = activeSchool?.classes.find((magicClass) => magicClass.id === selectedClassId) || activeSchool?.classes[0];
  const activeSubclass = activeClass?.subclasses.find((subclass) => subclass.id === selectedSubclassId) || activeClass?.subclasses[0];
  const classCount = schools.reduce((total, school) => total + school.classes.length, 0);
  const subclassCount = schools.reduce((total, school) => total + school.classes.reduce((classTotal, magicClass) => classTotal + magicClass.subclasses.length, 0), 0);
  const spellCount = schools.reduce((total, school) => total + school.classes.reduce((classTotal, magicClass) => classTotal + magicClass.subclasses.reduce((subclassTotal, subclass) => subclassTotal + subclass.spells.length, 0), 0), 0);

  const canCreate = Boolean(form.name.trim() && form.type.trim() && form.subtype.trim()) && (
    entryType === 'school' ||
    (entryType === 'class' && activeSchool) ||
    (entryType === 'subclass' && activeSchool && activeClass) ||
    (entryType === 'spell' && activeSchool && activeClass && activeSubclass && form.target.trim() && Number(form.manaCost) > 0 && Number(form.power) > 0 && Number(form.crownCost) >= 0)
  );

  const removeEntry = (type: EntryType, schoolId: string, classId?: string, subclassId?: string, entryId?: string) => {
    setSchools((current) => current.flatMap((school) => {
      if (type === 'school') return school.id === schoolId ? [] : [school];
      if (school.id !== schoolId) return [school];
      if (type === 'class') return [{ ...school, classes: school.classes.filter((magicClass) => magicClass.id !== classId) }];
      return [{
        ...school,
        classes: school.classes.map((magicClass) => {
          if (magicClass.id !== classId) return magicClass;
          if (type === 'subclass') return { ...magicClass, subclasses: magicClass.subclasses.filter((subclass) => subclass.id !== subclassId) };
          return {
            ...magicClass,
            subclasses: magicClass.subclasses.map((subclass) => subclass.id === subclassId
              ? { ...subclass, spells: subclass.spells.filter((spell) => spell.id !== entryId) }
              : subclass),
          };
        }),
      }];
    }));
  };

  const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canCreate) return;
    const entry: CodexEntry = {
      id: createId(),
      name: form.name.trim(),
      rank: form.rank.trim(),
      title: form.title.trim(),
      details: form.details.trim(),
      type: form.type.trim(),
      subtype: form.subtype.trim(),
      target: entryType === 'spell' ? form.target.trim() : undefined,
      effect: entryType === 'spell' ? form.effect || 'insight' : undefined,
      manaCost: entryType === 'spell' ? Number(form.manaCost) : undefined,
      power: entryType === 'spell' ? Number(form.power) : undefined,
      crownCost: entryType === 'spell' ? Number(form.crownCost) : undefined,
      stats: entryType === 'spell' ? {
        potency: Number(form.power),
        range: Number(form.range || 0),
        durationTurns: Number(form.durationTurns || 1),
        precision: Number(form.precision || 75),
      } : undefined,
      subStats: entryType === 'spell' ? {
        damage: form.effect === 'strike' ? Number(form.power) : 0,
        ward: form.effect === 'ward' ? Number(form.power) : 0,
        healing: form.effect === 'mend' ? Number(form.power) : 0,
        control: form.effect === 'control' ? Number(form.power) : 0,
        utility: ['reveal', 'journey', 'insight'].includes(form.effect || '') ? Number(form.power) : 0,
      } : undefined,
    };

    if (entryType === 'school') {
      const school: MagicSchool = { ...entry, classes: [] };
      setSchools((current) => [...current, school]);
      setSelectedSchoolId(school.id);
      setSelectedClassId('');
      setSelectedSubclassId('');
    } else if (entryType === 'class' && activeSchool) {
      const magicClass: MagicClass = { ...entry, subclasses: [] };
      setSchools((current) => current.map((school) => school.id === activeSchool.id ? { ...school, classes: [...school.classes, magicClass] } : school));
      setSelectedClassId(magicClass.id);
      setSelectedSubclassId('');
    } else if (entryType === 'subclass' && activeSchool && activeClass) {
      const subclass: MagicSubclass = { ...entry, spells: [] };
      setSchools((current) => current.map((school) => school.id === activeSchool.id ? {
        ...school,
        classes: school.classes.map((magicClass) => magicClass.id === activeClass.id ? { ...magicClass, subclasses: [...magicClass.subclasses, subclass] } : magicClass),
      } : school));
      setSelectedSubclassId(subclass.id);
    } else if (entryType === 'spell' && activeSchool && activeClass && activeSubclass) {
      setSchools((current) => current.map((school) => school.id === activeSchool.id ? {
        ...school,
        classes: school.classes.map((magicClass) => magicClass.id === activeClass.id ? {
          ...magicClass,
          subclasses: magicClass.subclasses.map((subclass) => subclass.id === activeSubclass.id ? { ...subclass, spells: [...subclass.spells, entry] } : subclass),
        } : magicClass),
      } : school));
    }

    setForm(EMPTY_FORM);
  };

  return (
    <div id="admin-arcane-codex-tab" className="space-y-6">
      <header className="border border-[#111111] bg-[#111111] p-5 text-white">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2 text-[10px] font-mono font-bold uppercase text-emerald-300">
              <Sparkles size={13} /> Arcane Content Registry
            </div>
            <h2 className="text-xl font-bold">Magic Schools & Spellcraft</h2>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-white/65">Build a connected codex of schools, classes, subclasses, and spells. Each entry carries a rank, title, and details.</p>
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-2 border-l border-white/15 pl-4 text-[10px] font-mono uppercase text-white/60 sm:grid-cols-4">
            <span><strong className="block text-lg text-white">{schools.length}</strong>Schools</span>
            <span><strong className="block text-lg text-white">{classCount}</strong>Classes</span>
            <span><strong className="block text-lg text-white">{subclassCount}</strong>Subclasses</span>
            <span><strong className="block text-lg text-white">{spellCount}</strong>Spells</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[340px_minmax(0,1fr)]">
        <form onSubmit={handleCreate} className="space-y-4 border border-[#dedede] bg-white p-5">
          <div className="flex items-center gap-2 border-b border-[#eeeeee] pb-3">
            <Plus size={16} className="text-emerald-700" />
            <h3 className="text-sm font-bold text-[#111111]">Create Codex Entry</h3>
          </div>

          <label className="block space-y-1 text-[10px] font-mono font-bold uppercase text-[#555555]">
            Entry type
            <select value={entryType} onChange={(event) => setEntryType(event.target.value as EntryType)} className="w-full border border-[#cccccc] bg-white px-3 py-2 text-xs normal-case text-[#111111] outline-none focus:border-emerald-700">
              <option value="school">Magic school</option>
              <option value="class">Class</option>
              <option value="subclass">Subclass</option>
              <option value="spell">Spell</option>
            </select>
          </label>

          {entryType !== 'school' && (
            <label className="block space-y-1 text-[10px] font-mono font-bold uppercase text-[#555555]">
              School
              <select value={activeSchool?.id || ''} onChange={(event) => setSelectedSchoolId(event.target.value)} className="w-full border border-[#cccccc] bg-white px-3 py-2 text-xs normal-case text-[#111111] outline-none focus:border-emerald-700">
                {schools.length === 0 && <option value="">Create a school first</option>}
                {schools.map((school) => <option key={school.id} value={school.id}>{school.name}</option>)}
              </select>
            </label>
          )}

          {(entryType === 'subclass' || entryType === 'spell') && (
            <label className="block space-y-1 text-[10px] font-mono font-bold uppercase text-[#555555]">
              Class
              <select value={activeClass?.id || ''} onChange={(event) => setSelectedClassId(event.target.value)} disabled={!activeSchool?.classes.length} className="w-full border border-[#cccccc] bg-white px-3 py-2 text-xs normal-case text-[#111111] outline-none focus:border-emerald-700 disabled:bg-[#f5f5f5]">
                {!activeSchool?.classes.length && <option value="">Create a class first</option>}
                {activeSchool?.classes.map((magicClass) => <option key={magicClass.id} value={magicClass.id}>{magicClass.name}</option>)}
              </select>
            </label>
          )}

          {entryType === 'spell' && (
            <label className="block space-y-1 text-[10px] font-mono font-bold uppercase text-[#555555]">
              Subclass
              <select value={activeSubclass?.id || ''} onChange={(event) => setSelectedSubclassId(event.target.value)} disabled={!activeClass?.subclasses.length} className="w-full border border-[#cccccc] bg-white px-3 py-2 text-xs normal-case text-[#111111] outline-none focus:border-emerald-700 disabled:bg-[#f5f5f5]">
                {!activeClass?.subclasses.length && <option value="">Create a subclass first</option>}
                {activeClass?.subclasses.map((subclass) => <option key={subclass.id} value={subclass.id}>{subclass.name}</option>)}
              </select>
            </label>
          )}

          <label className="block space-y-1 text-[10px] font-mono font-bold uppercase text-[#555555]">
            Name
            <input autoComplete="off" required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="e.g. Emberweaving" className="w-full border border-[#cccccc] px-3 py-2 text-xs normal-case text-[#111111] outline-none focus:border-emerald-700" />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block space-y-1 text-[10px] font-mono font-bold uppercase text-[#555555]">
              {entryType === 'school' ? 'Tradition type' : `${entryType} type`}
              <input required value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })} placeholder="e.g. Warding" className="w-full border border-[#cccccc] px-3 py-2 text-xs normal-case text-[#111111] outline-none focus:border-emerald-700" />
            </label>
            <label className="block space-y-1 text-[10px] font-mono font-bold uppercase text-[#555555]">
              {entryType === 'school' ? 'Tradition subtype' : `${entryType} subtype`}
              <input required value={form.subtype} onChange={(event) => setForm({ ...form, subtype: event.target.value })} placeholder="e.g. Hearthguard" className="w-full border border-[#cccccc] px-3 py-2 text-xs normal-case text-[#111111] outline-none focus:border-emerald-700" />
            </label>
          </div>
          {entryType === 'spell' && (
            <>
              <label className="block space-y-1 text-[10px] font-mono font-bold uppercase text-[#555555]">
                Target
                <input required value={form.target} onChange={(event) => setForm({ ...form, target: event.target.value })} placeholder="Self, ally, enemy, or area" className="w-full border border-[#cccccc] px-3 py-2 text-xs normal-case text-[#111111] outline-none focus:border-emerald-700" />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block space-y-1 text-[10px] font-mono font-bold uppercase text-[#555555]">
                  Effect
                  <select value={form.effect} onChange={(event) => setForm({ ...form, effect: event.target.value as MagicEffectType })} className="w-full border border-[#cccccc] bg-white px-3 py-2 text-xs normal-case text-[#111111] outline-none focus:border-emerald-700">
                    <option value="strike">Strike</option><option value="ward">Ward</option><option value="mend">Mend</option><option value="control">Control</option><option value="reveal">Reveal</option><option value="journey">Journey</option><option value="insight">Insight</option>
                  </select>
                </label>
                <label className="block space-y-1 text-[10px] font-mono font-bold uppercase text-[#555555]">
                  Aether cost
                  <input required type="number" min="1" value={form.manaCost} onChange={(event) => setForm({ ...form, manaCost: event.target.value })} className="w-full border border-[#cccccc] px-3 py-2 text-xs normal-case text-[#111111] outline-none focus:border-emerald-700" />
                </label>
                <label className="block space-y-1 text-[10px] font-mono font-bold uppercase text-[#555555]">
                  Potency
                  <input required type="number" min="1" value={form.power} onChange={(event) => setForm({ ...form, power: event.target.value })} className="w-full border border-[#cccccc] px-3 py-2 text-xs normal-case text-[#111111] outline-none focus:border-emerald-700" />
                </label>
                <label className="block space-y-1 text-[10px] font-mono font-bold uppercase text-[#555555]">
                  Learning cost · Crowns
                  <input required type="number" min="0" value={form.crownCost} onChange={(event) => setForm({ ...form, crownCost: event.target.value })} className="w-full border border-[#cccccc] px-3 py-2 text-xs normal-case text-[#111111] outline-none focus:border-emerald-700" />
                </label>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <label className="block space-y-1 text-[10px] font-mono font-bold uppercase text-[#555555]">
                  Range
                  <input type="number" min="0" value={form.range} onChange={(event) => setForm({ ...form, range: event.target.value })} placeholder="0" className="w-full border border-[#cccccc] px-3 py-2 text-xs normal-case text-[#111111] outline-none focus:border-emerald-700" />
                </label>
                <label className="block space-y-1 text-[10px] font-mono font-bold uppercase text-[#555555]">
                  Duration · turns
                  <input type="number" min="1" value={form.durationTurns} onChange={(event) => setForm({ ...form, durationTurns: event.target.value })} placeholder="1" className="w-full border border-[#cccccc] px-3 py-2 text-xs normal-case text-[#111111] outline-none focus:border-emerald-700" />
                </label>
                <label className="block space-y-1 text-[10px] font-mono font-bold uppercase text-[#555555]">
                  Precision %
                  <input type="number" min="0" max="100" value={form.precision} onChange={(event) => setForm({ ...form, precision: event.target.value })} placeholder="75" className="w-full border border-[#cccccc] px-3 py-2 text-xs normal-case text-[#111111] outline-none focus:border-emerald-700" />
                </label>
              </div>
            </>
          )}
          <div className="grid grid-cols-2 gap-3">
            <label className="block space-y-1 text-[10px] font-mono font-bold uppercase text-[#555555]">
              Rank
              <input value={form.rank} onChange={(event) => setForm({ ...form, rank: event.target.value })} placeholder="Adept / II" className="w-full border border-[#cccccc] px-3 py-2 text-xs normal-case text-[#111111] outline-none focus:border-emerald-700" />
            </label>
            <label className="block space-y-1 text-[10px] font-mono font-bold uppercase text-[#555555]">
              Title
              <input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="Keeper of Embers" className="w-full border border-[#cccccc] px-3 py-2 text-xs normal-case text-[#111111] outline-none focus:border-emerald-700" />
            </label>
          </div>
          <label className="block space-y-1 text-[10px] font-mono font-bold uppercase text-[#555555]">
            Details
            <textarea rows={4} value={form.details} onChange={(event) => setForm({ ...form, details: event.target.value })} placeholder="Lore, purpose, or gameplay effect..." className="w-full resize-y border border-[#cccccc] px-3 py-2 text-xs normal-case leading-relaxed text-[#111111] outline-none focus:border-emerald-700" />
          </label>
          <button type="submit" disabled={!canCreate} className="flex w-full items-center justify-center gap-2 bg-[#111111] px-4 py-2.5 text-xs font-bold uppercase text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-[#bbbbbb]">
            <Plus size={14} /> Add {entryType}
          </button>
          <p className="text-[10px] leading-relaxed text-[#777777]">Entries save in this browser and stay available when you return to the codex.</p>
        </form>

        <section className="space-y-4 border-t-2 border-emerald-800 pt-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <label className="min-w-0 flex-1 space-y-1 text-[10px] font-mono font-bold uppercase text-[#555555]">
              Magic school
              <select value={activeSchool?.id || ''} onChange={(event) => { setSelectedSchoolId(event.target.value); setSelectedClassId(''); setSelectedSubclassId(''); }} disabled={!schools.length} className="w-full border border-[#cccccc] bg-white px-3 py-2 text-xs normal-case text-[#111111] outline-none focus:border-emerald-700 disabled:bg-[#f5f5f5]">
                {!schools.length && <option value="">No schools created</option>}
                {schools.map((school) => <option key={school.id} value={school.id}>{school.name}</option>)}
              </select>
            </label>
            <label className="min-w-0 flex-1 space-y-1 text-[10px] font-mono font-bold uppercase text-[#555555]">
              Class
              <select value={activeClass?.id || ''} onChange={(event) => { setSelectedClassId(event.target.value); setSelectedSubclassId(''); }} disabled={!activeSchool?.classes.length} className="w-full border border-[#cccccc] bg-white px-3 py-2 text-xs normal-case text-[#111111] outline-none focus:border-emerald-700 disabled:bg-[#f5f5f5]">
                {!activeSchool?.classes.length && <option value="">No classes created</option>}
                {activeSchool?.classes.map((magicClass) => <option key={magicClass.id} value={magicClass.id}>{magicClass.name}</option>)}
              </select>
            </label>
            <label className="min-w-0 flex-1 space-y-1 text-[10px] font-mono font-bold uppercase text-[#555555]">
              Subclass
              <select value={activeSubclass?.id || ''} onChange={(event) => setSelectedSubclassId(event.target.value)} disabled={!activeClass?.subclasses.length} className="w-full border border-[#cccccc] bg-white px-3 py-2 text-xs normal-case text-[#111111] outline-none focus:border-emerald-700 disabled:bg-[#f5f5f5]">
                {!activeClass?.subclasses.length && <option value="">No subclasses created</option>}
                {activeClass?.subclasses.map((subclass) => <option key={subclass.id} value={subclass.id}>{subclass.name}</option>)}
              </select>
            </label>
          </div>

          {!activeSchool ? (
            <div className="border border-dashed border-[#cccccc] bg-white px-6 py-12 text-center">
              <BookOpen size={26} className="mx-auto mb-3 text-emerald-700" />
              <h3 className="text-sm font-bold text-[#111111]">The codex is empty</h3>
              <p className="mt-1 text-xs text-[#666666]">Create a magic school to begin its class and spell hierarchy.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <article className="border border-emerald-300 bg-white p-4">
                <div className="mb-2 text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-800">Magic School</div>
                <EntrySummary entry={activeSchool} onDelete={() => removeEntry('school', activeSchool.id)} />
              </article>

              {activeClass && (
                <article className="border border-[#dedede] bg-white p-4">
                  <div className="mb-2 text-[9px] font-mono font-bold uppercase tracking-wider text-[#777777]">Class</div>
                  <EntrySummary entry={activeClass} onDelete={() => removeEntry('class', activeSchool.id, activeClass.id)} />
                </article>
              )}

              {activeSubclass && (
                <article className="border border-[#dedede] bg-white p-4">
                  <div className="mb-2 text-[9px] font-mono font-bold uppercase tracking-wider text-[#777777]">Subclass</div>
                  <EntrySummary entry={activeSubclass} onDelete={() => removeEntry('subclass', activeSchool.id, activeClass!.id, activeSubclass.id)} />
                </article>
              )}

              <section className="border border-[#dedede] bg-white">
                <div className="flex items-center justify-between gap-3 border-b border-[#eeeeee] px-4 py-3">
                  <div className="flex items-center gap-2"><Sparkles size={14} className="text-amber-700" /><h3 className="text-xs font-bold uppercase text-[#111111]">Spells</h3></div>
                  <span className="text-[10px] font-mono text-[#777777]">{activeSubclass?.spells.length || 0} in subclass</span>
                </div>
                {!activeSubclass?.spells.length ? (
                  <p className="px-4 py-5 text-xs text-[#777777]">Select or create a subclass to add its first spell.</p>
                ) : (
                  <div className="divide-y divide-[#eeeeee]">
                    {activeSubclass.spells.map((spell) => (
                      <div key={spell.id} className="px-4 py-3">
                        <EntrySummary entry={spell} onDelete={() => removeEntry('spell', activeSchool.id, activeClass!.id, activeSubclass.id, spell.id)} />
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};