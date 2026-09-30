import React, { useEffect, useState } from 'react';
import { BookOpen, HeartPulse, ScrollText, Shield, Swords, TrendingUp, Wind } from 'lucide-react';
import { sound } from '../../sound';
import {
  ABILITY_KEYS,
  ABILITY_POINT_BUY_BUDGET,
  ADVENTURER_CLASSES,
  ADVENTURER_SHEET_STORAGE_KEY,
  DEFAULT_ADVENTURER_SHEET,
  PRACTICE_ENCOUNTER,
  SKILL_RULES,
  abilityModifier,
  abilityPointBuySpent,
  applyPracticeDamage,
  canSpendAbilityPointBuy,
  calculateAdventurerStats,
  describePracticePathFeature,
  experienceForNextLevel,
  normalizeAdventurerSheet,
  proficiencyBonus,
  practiceRollMode,
  resolveD20Check,
  resolvePracticeAttack,
  usePracticePathFeature,
  type AbilityKey,
  type AdventurerSheet,
  type D20CheckResult,
  type PracticeCondition,
  type RollMode,
} from '../../data/adventurerRulesData';

type HandbookTab = 'sheet' | 'tests' | 'encounter' | 'ledger';

const ABILITY_LABELS: Record<AbilityKey, string> = {
  strength: 'Strength',
  dexterity: 'Dexterity',
  constitution: 'Constitution',
  intelligence: 'Intelligence',
  wisdom: 'Wisdom',
  charisma: 'Charisma',
};

const ABILITY_SHORT: Record<AbilityKey, string> = {
  strength: 'STR',
  dexterity: 'DEX',
  constitution: 'CON',
  intelligence: 'INT',
  wisdom: 'WIS',
  charisma: 'CHA',
};

const CONDITIONS = [
  ['Blinded', 'Cannot rely on sight; sight-based checks become harder.'],
  ['Charmed', 'A social influence clouds judgment without removing agency.'],
  ['Frightened', 'Fear makes approach and focused action more difficult.'],
  ['Grappled', 'Movement is held until the restraint is escaped.'],
  ['Incapacitated', 'Cannot take a deliberate action while incapacitated.'],
  ['Invisible', 'Cannot be seen without a special sense or revealing effect.'],
  ['Poisoned', 'Sickness or venom hinders checks and attacks.'],
  ['Prone', 'On the ground; standing costs movement.'],
  ['Restrained', 'Held in place; attacks and movement are hindered.'],
  ['Stunned', 'Briefly unable to act or react.'],
  ['Unconscious', 'Helpless and unaware until restored or roused.'],
] as const;

const PRACTICE_CONDITION_RULES: Record<PracticeCondition, string> = {
  steady: 'Advantage on your next d20 check, save, or practice attack.',
  guarded: '+2 Guard against the training wisp’s next retaliation.',
  slowed: 'Disadvantage on your next Dexterity check, saving throw, or practice attack.',
  marked: 'Advantage on your next practice attack.',
};

function readSheet(): AdventurerSheet {
  try {
    return normalizeAdventurerSheet(window.localStorage.getItem(ADVENTURER_SHEET_STORAGE_KEY)
      ? JSON.parse(window.localStorage.getItem(ADVENTURER_SHEET_STORAGE_KEY) as string)
      : null);
  } catch {
    return DEFAULT_ADVENTURER_SHEET;
  }
}

function formatModifier(value: number): string {
  return value >= 0 ? `+${value}` : String(value);
}

function rollSummary(result: D20CheckResult): string {
  const rolled = result.rolls.length > 1 ? `[${result.rolls.join(', ')}] → ${result.die}` : String(result.die);
  const natural = result.naturalTwenty ? ' · Natural 20' : result.naturalOne ? ' · Natural 1' : '';
  return `d20 ${rolled} ${formatModifier(result.modifier)} = ${result.total} vs DC ${result.targetNumber}${natural}. ${result.success ? 'Success.' : 'Failure.'}`;
}

export const AdventurerHandbookView: React.FC = () => {
  const [sheet, setSheet] = useState<AdventurerSheet>(readSheet);
  const [activeTab, setActiveTab] = useState<HandbookTab>('sheet');
  const [rollMode, setRollMode] = useState<RollMode>('normal');
  const [selectedSkill, setSelectedSkill] = useState(SKILL_RULES[0].name);
  const [difficulty, setDifficulty] = useState(13);
  const [lastCheck, setLastCheck] = useState<D20CheckResult | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [chronicle, setChronicle] = useState<string[]>([]);

  const stats = calculateAdventurerStats(sheet);
  const adventurerClass = ADVENTURER_CLASSES.find((entry) => entry.id === sheet.classId) || ADVENTURER_CLASSES[0];
  const path = adventurerClass.paths.find((entry) => entry.id === sheet.pathId) || adventurerClass.paths[0];
  const currentSkill = SKILL_RULES.find((skill) => skill.name === selectedSkill) || SKILL_RULES[0];
  const nextLevelXp = experienceForNextLevel(sheet.level);
  const xpRemaining = nextLevelXp === 0 ? 0 : Math.max(0, nextLevelXp - sheet.experience);

  useEffect(() => {
    try {
      window.localStorage.setItem(ADVENTURER_SHEET_STORAGE_KEY, JSON.stringify(sheet));
    } catch {
      setNotice('This browser could not save your adventurer sheet.');
    }
  }, [sheet]);

  const addChronicle = (entry: string) => setChronicle((previous) => [entry, ...previous].slice(0, 16));

  const handleAbilityChange = (ability: AbilityKey, value: number) => {
    const score = Math.max(8, Math.min(15, Math.floor(value)));
    const abilities = { ...sheet.abilities, [ability]: score };
    if (!canSpendAbilityPointBuy(abilities)) {
      setNotice(`Ability scores use a ${ABILITY_POINT_BUY_BUDGET}-point budget. Lower another score before increasing this one.`);
      sound.play('warning');
      return;
    }
    setSheet((previous) => {
      const next = { ...previous, abilities };
      return { ...next, currentHp: Math.min(next.currentHp, calculateAdventurerStats(next).maxHp) };
    });
  };

  const handleClassChange = (classId: string) => {
    const nextClass = ADVENTURER_CLASSES.find((entry) => entry.id === classId) || ADVENTURER_CLASSES[0];
    setSheet((previous) => {
      const next = { ...previous, classId: nextClass.id, pathId: nextClass.paths[0].id, pathFeatureUsed: false };
      next.proficientSkills = nextClass.skillChoices.slice(0, 2);
      return { ...next, currentHp: calculateAdventurerStats(next).maxHp };
    });
    setNotice(`${nextClass.name} selected. Choose a path to shape your calling.`);
  };

  const handleRollCheck = () => {
    const skill = SKILL_RULES.find((entry) => entry.name === selectedSkill) || SKILL_RULES[0];
    const result = resolveD20Check({
      abilityScore: sheet.abilities[skill.ability],
      level: sheet.level,
      proficient: sheet.proficientSkills.includes(skill.name),
      dc: difficulty,
      mode: practiceRollMode(rollMode, sheet.conditions, skill.ability, 'check'),
    });
    setLastCheck(result);
    addChronicle(`${skill.name}: ${rollSummary(result)}`);
    setSheet((previous) => ({
      ...previous,
      experience: previous.experience + (result.success ? 10 : 0),
      conditions: previous.conditions.filter((condition) => condition !== 'steady' && !(condition === 'slowed' && skill.ability === 'dexterity')),
    }));
    sound.play(result.success ? 'confirm' : 'warning');
  };

  const handleSavingThrow = (ability: AbilityKey) => {
    const result = resolveD20Check({
      abilityScore: sheet.abilities[ability],
      level: sheet.level,
      proficient: adventurerClass.savingThrows.includes(ability),
      dc: difficulty,
      mode: practiceRollMode(rollMode, sheet.conditions, ability, 'save'),
    });
    setLastCheck(result);
    addChronicle(`${ABILITY_LABELS[ability]} save: ${rollSummary(result)}`);
    setSheet((previous) => ({
      ...previous,
      experience: previous.experience + (result.success ? 10 : 0),
      conditions: previous.conditions.filter((condition) => condition !== 'steady' && !(condition === 'slowed' && ability === 'dexterity')),
    }));
    sound.play(result.success ? 'confirm' : 'warning');
  };

  const handleAttack = () => {
    if (sheet.currentHp <= 0) {
      setNotice('Rest before entering another practice bout.');
      sound.play('warning');
      return;
    }
    if (sheet.practiceTargetHp <= 0) {
      setNotice('The training wisp has dispersed. Reset the encounter to continue.');
      sound.play('warning');
      return;
    }
    const result = resolvePracticeAttack({ sheet, targetHp: sheet.practiceTargetHp, mode: practiceRollMode(rollMode, sheet.conditions, 'strength', 'attack') });
    setLastCheck(result.check);
    let nextSheet = { ...sheet, practiceTargetHp: result.targetHp };
    let enemyOutcome = '';
    if (result.targetHp <= 0) {
      nextSheet.experience += 25;
      enemyOutcome = 'The practice wisp disperses; you gain 25 experience.';
    } else {
      const enemyCheck = resolveD20Check({ abilityScore: 10, level: 1, proficient: false, bonus: PRACTICE_ENCOUNTER.attackBonus, dc: stats.armorClass + (sheet.conditions.includes('guarded') ? 2 : 0) });
      const enemyDamage = enemyCheck.naturalTwenty || (!enemyCheck.naturalOne && enemyCheck.success)
        ? 1 + Math.floor(Math.random() * PRACTICE_ENCOUNTER.damageDie) + PRACTICE_ENCOUNTER.damageBonus
        : 0;
      nextSheet = applyPracticeDamage(nextSheet, enemyDamage);
      enemyOutcome = `Training wisp ${enemyCheck.success ? `strikes for ${enemyDamage}.` : 'misses.'}`;
    }
    const spentConditions = result.targetHp <= 0
      ? ['steady', 'marked', 'slowed']
      : ['steady', 'marked', 'slowed', 'guarded'];
    nextSheet = { ...nextSheet, conditions: nextSheet.conditions.filter((condition) => !spentConditions.includes(condition)) };
    setSheet(nextSheet);
    const encounterResult = `${result.outcome} ${enemyOutcome}`.trim();
    addChronicle(encounterResult);
    setNotice(encounterResult);
    sound.play(result.check.success ? 'combat' : 'warning');
  };

  const handleRest = () => {
    setSheet((previous) => ({
      ...previous,
      currentHp: stats.maxHp,
      practiceTargetHp: PRACTICE_ENCOUNTER.maxHp,
      conditions: [],
      pathFeatureUsed: false,
    }));
    setNotice('A safe rest restores vitality, clears practice conditions, and resets the training wisp.');
    sound.play('confirm');
  };

  const handleUsePathFeature = () => {
    const result = usePracticePathFeature(sheet);
    if (!result) {
      setNotice('This path feature is spent. Take a Short Rest to ready it again.');
      sound.play('warning');
      return;
    }
    setSheet(result.sheet);
    addChronicle(`${path.name}: ${result.result}`);
    setNotice(result.result);
    sound.play('confirm');
  };

  const handleGainLevel = () => {
    if (sheet.level >= 20 || sheet.experience < nextLevelXp) return;
    setSheet((previous) => {
      const next = { ...previous, level: Math.min(20, previous.level + 1) };
      const nextMaxHp = calculateAdventurerStats(next).maxHp;
      return { ...next, currentHp: Math.min(nextMaxHp, previous.currentHp + Math.max(1, Math.floor(adventurerClass.hitDie / 2) + 1 + abilityModifier(previous.abilities.constitution))) };
    });
    setNotice(`You reached level ${sheet.level + 1}. Proficiency bonus is now +${proficiencyBonus(Math.min(20, sheet.level + 1))}.`);
    sound.play('success');
  };

  const toggleSkillProficiency = (skillName: string) => {
    setSheet((previous) => {
      const isProficient = previous.proficientSkills.includes(skillName);
      if (!isProficient && previous.proficientSkills.length >= 2) return previous;
      return {
        ...previous,
        proficientSkills: isProficient
          ? previous.proficientSkills.filter((skill) => skill !== skillName)
          : [...previous.proficientSkills, skillName],
      };
    });
  };

  const tabs: Array<{ id: HandbookTab; label: string; icon: React.ElementType }> = [
    { id: 'sheet', label: 'Adventurer Sheet', icon: ScrollText },
    { id: 'tests', label: 'Checks & Saves', icon: TrendingUp },
    { id: 'encounter', label: 'Practice Encounter', icon: Swords },
    { id: 'ledger', label: 'Rules Ledger', icon: BookOpen },
  ];

  return (
    <main id="adventurer-handbook-view" className="space-y-5 text-[#292d27]">
      <header className="grid gap-5 border border-[#594c37] bg-[#262b25] p-5 text-[#f4efdf] md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:p-7">
        <div>
          <span className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.16em] text-[#d1b577]"><BookOpen size={13} /> Age of Embers · Adventurer’s Handbook</span>
          <h1 className="mt-1 font-serif text-2xl font-bold sm:text-3xl">The Marcher’s Handbook</h1>
          <p className="mt-2 max-w-2xl text-xs leading-relaxed text-[#d3d2c8]">A fifth-edition-compatible d20 rules toolkit with original Eldoria classes, paths, encounters, and field lore.</p>
        </div>
        <div className="grid grid-cols-4 border-t border-white/15 pt-3 text-center font-mono text-[9px] uppercase text-[#d1c9b3] md:border-l md:border-t-0 md:pl-5 md:pt-0">
          <span className="px-2"><strong className="block text-lg text-white">{sheet.level}</strong>Level</span>
          <span className="border-x border-white/15 px-2"><strong className="block text-lg text-white">{stats.proficiency >= 0 ? `+${stats.proficiency}` : stats.proficiency}</strong>Prof.</span>
          <span className="border-r border-white/15 px-2"><strong className="block text-lg text-white">{stats.armorClass}</strong>Guard</span>
          <span className="px-2"><strong className="block text-lg text-rose-200">{sheet.currentHp}/{stats.maxHp}</strong>Vitality</span>
        </div>
      </header>

      <div className="flex flex-wrap gap-2 border-b border-[#ddd7c9] pb-3" role="tablist" aria-label="Adventurer handbook">
        {tabs.map(({ id, label, icon: Icon }) => <button key={id} type="button" role="tab" aria-selected={activeTab === id} onClick={() => setActiveTab(id)} className={`flex items-center gap-2 border px-3 py-2 text-[10px] font-bold uppercase ${activeTab === id ? 'border-[#3e5039] bg-[#344532] text-white' : 'border-[#d7d1c3] bg-white text-[#55574e] hover:border-[#75806c]'}`}><Icon size={14} />{label}</button>)}
      </div>

      {notice && <div role="status" className="flex items-center justify-between gap-3 border border-[#d9ca9e] bg-[#fbf6e7] px-4 py-3 text-xs text-[#53482f]"><span>{notice}</span><button type="button" aria-label="Dismiss handbook notice" onClick={() => setNotice(null)} className="font-bold">×</button></div>}

      {activeTab === 'sheet' && (
        <section className="grid gap-5 xl:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)]">
          <div className="space-y-4 border border-[#d8d2c5] bg-white p-4 sm:p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="space-y-1 text-[10px] font-bold uppercase text-[#777367]">Adventurer name<input value={sheet.name} maxLength={32} onChange={(event) => setSheet((previous) => ({ ...previous, name: event.target.value }))} className="w-full border border-[#d8d2c5] px-3 py-2 text-sm normal-case text-[#272d25]" /></label>
              <label className="space-y-1 text-[10px] font-bold uppercase text-[#777367]">Calling<select value={sheet.classId} onChange={(event) => handleClassChange(event.target.value)} className="w-full border border-[#d8d2c5] bg-white px-3 py-2 text-sm normal-case text-[#272d25]">{ADVENTURER_CLASSES.map((entry) => <option key={entry.id} value={entry.id}>{entry.name}</option>)}</select></label>
              <label className="space-y-1 text-[10px] font-bold uppercase text-[#777367]">Path<select value={path.id} onChange={(event) => setSheet((previous) => ({ ...previous, pathId: event.target.value, pathFeatureUsed: false }))} className="w-full border border-[#d8d2c5] bg-white px-3 py-2 text-sm normal-case text-[#272d25]">{adventurerClass.paths.map((entry) => <option key={entry.id} value={entry.id}>{entry.name}</option>)}</select></label>
              <div className="border border-[#e6e0d2] bg-[#faf8f2] px-3 py-2"><span className="text-[9px] font-bold uppercase text-[#8a806c]">Path feature · {sheet.pathFeatureUsed ? 'Spent' : 'Ready'}</span><p className="mt-1 text-xs text-[#4a4c43]">{describePracticePathFeature(path.id, sheet.level)}</p><button type="button" onClick={handleUsePathFeature} disabled={sheet.pathFeatureUsed} className="mt-2 border border-[#57684d] bg-[#3d5038] px-3 py-1.5 text-[9px] font-bold uppercase text-white hover:bg-[#4f6547] disabled:cursor-not-allowed disabled:opacity-40">{sheet.pathFeatureUsed ? 'Used · Short Rest to Ready' : 'Use Path Feature'}</button></div>
            </div>

            <div className="flex items-center justify-between gap-3 border-b border-[#e5e0d4] pb-2"><h3 className="text-[10px] font-bold uppercase tracking-wider text-[#55574e]">Ability Scores · Point Buy</h3><span className="font-mono text-[10px] text-[#726342]">{ABILITY_POINT_BUY_BUDGET - abilityPointBuySpent(sheet.abilities)} / {ABILITY_POINT_BUY_BUDGET} points remaining</span></div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {ABILITY_KEYS.map((ability) => <label key={ability} className="border border-[#e4dfd3] bg-[#faf9f5] p-3"><span className="block text-[9px] font-bold uppercase text-[#7b776b]">{ABILITY_LABELS[ability]} · {ABILITY_SHORT[ability]}</span><div className="mt-1 flex items-center justify-between gap-2"><input aria-label={`${ABILITY_LABELS[ability]} score`} type="number" min="8" max="15" value={sheet.abilities[ability]} onChange={(event) => handleAbilityChange(ability, Number(event.target.value))} className="w-16 border border-[#d8d2c5] bg-white px-2 py-1 text-lg font-bold text-[#2b3429]" /><strong className="font-mono text-[#71844f]">{formatModifier(abilityModifier(sheet.abilities[ability]))}</strong></div></label>)}
            </div>

            <div className="grid gap-2 sm:grid-cols-4">
              <div className="border border-[#e3ddd0] p-3"><span className="text-[9px] uppercase text-[#777367]">Hit Die</span><strong className="mt-1 block font-serif text-lg">d{stats.hitDie}</strong></div>
              <div className="border border-[#e3ddd0] p-3"><span className="text-[9px] uppercase text-[#777367]">Spell Save DC</span><strong className="mt-1 block font-serif text-lg">{stats.spellSaveDc}</strong></div>
              <div className="border border-[#e3ddd0] p-3"><span className="text-[9px] uppercase text-[#777367]">Initiative</span><strong className="mt-1 block font-serif text-lg">{formatModifier(stats.initiative)}</strong></div>
              <div className="border border-[#e3ddd0] p-3"><span className="text-[9px] uppercase text-[#777367]">XP to next level</span><strong className="mt-1 block font-serif text-lg">{xpRemaining || 'MAX'}</strong></div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#e3ddd0] pt-4">
              <span className="text-xs text-[#727166]">{sheet.experience.toLocaleString()} experience · next level at {nextLevelXp || 'level cap'}</span>
              <button type="button" disabled={sheet.level >= 20 || sheet.experience < nextLevelXp} onClick={handleGainLevel} className="border border-[#53654a] bg-[#374833] px-4 py-2 text-[10px] font-bold uppercase text-white hover:bg-[#4a6142] disabled:cursor-not-allowed disabled:opacity-40"><TrendingUp size={13} className="mr-1 inline" />Advance Level</button>
            </div>
          </div>

          <aside className="space-y-4">
            <article className="border border-[#cfc8b8] bg-[#f6f3e9] p-4"><span className="text-[9px] font-bold uppercase tracking-wider text-[#897b5b]">Calling · d{adventurerClass.hitDie}</span><h2 className="mt-1 font-serif text-xl font-bold">{adventurerClass.name}</h2><p className="mt-1 text-[10px] font-semibold text-[#6b704f]">{adventurerClass.title}</p><p className="mt-3 text-xs leading-relaxed text-[#606156]">{adventurerClass.description}</p><div className="mt-3 border-t border-[#ddd7c8] pt-3"><span className="text-[9px] font-bold uppercase text-[#827a67]">Path · {path.title}</span><p className="mt-1 text-xs leading-relaxed text-[#56594f]">{path.description}</p></div></article>
            <article className="border border-[#d8d2c5] bg-white p-4"><h3 className="text-[10px] font-bold uppercase tracking-wider text-[#55574e]">Saving Throws</h3><div className="mt-2 flex gap-2">{adventurerClass.savingThrows.map((ability) => <span key={ability} className="border border-[#d8d2c5] bg-[#faf8f1] px-2 py-1 text-[10px] font-mono uppercase">{ABILITY_SHORT[ability]} {formatModifier(abilityModifier(sheet.abilities[ability]) + stats.proficiency)}</span>)}</div></article>
          </aside>
        </section>
      )}

      {activeTab === 'tests' && (
        <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(290px,0.8fr)]">
          <div className="space-y-4 border border-[#d8d2c5] bg-white p-4 sm:p-5">
            <div><span className="text-[9px] font-bold uppercase tracking-wider text-[#8a7d60]">Ability check</span><h2 className="mt-1 font-serif text-xl font-bold">Test a skill against the March</h2></div>
            <div className="grid gap-3 sm:grid-cols-3">
              <label className="space-y-1 text-[10px] font-bold uppercase text-[#777367]">Skill<select value={selectedSkill} onChange={(event) => setSelectedSkill(event.target.value)} className="w-full border border-[#d8d2c5] bg-white px-3 py-2 text-xs normal-case">{SKILL_RULES.map((skill) => <option key={skill.name} value={skill.name}>{skill.name} · {ABILITY_SHORT[skill.ability]}</option>)}</select></label>
              <label className="space-y-1 text-[10px] font-bold uppercase text-[#777367]">Difficulty<input type="number" min="1" max="40" value={difficulty} onChange={(event) => setDifficulty(Math.max(1, Math.min(40, Number(event.target.value) || 1)))} className="w-full border border-[#d8d2c5] px-3 py-2 text-xs" /></label>
              <label className="space-y-1 text-[10px] font-bold uppercase text-[#777367]">Roll mode<select value={rollMode} onChange={(event) => setRollMode(event.target.value as RollMode)} className="w-full border border-[#d8d2c5] bg-white px-3 py-2 text-xs normal-case"><option value="normal">Normal</option><option value="advantage">Advantage · roll twice, keep higher</option><option value="disadvantage">Disadvantage · roll twice, keep lower</option></select></label>
            </div>
            <p className="text-xs leading-relaxed text-[#68675e]">{currentSkill.detail}. Roll a d20, add {ABILITY_SHORT[currentSkill.ability]} {formatModifier(abilityModifier(sheet.abilities[currentSkill.ability]))}{sheet.proficientSkills.includes(currentSkill.name) ? ` and proficiency +${stats.proficiency}` : ''}, then compare to the target difficulty.</p>
            <button type="button" onClick={handleRollCheck} className="border border-[#4b5b43] bg-[#374833] px-4 py-2.5 text-[10px] font-bold uppercase text-white hover:bg-[#4b6146]">Roll {currentSkill.name}</button>
            <div className="border-t border-[#e5e0d4] pt-3"><h3 className="text-[9px] font-bold uppercase tracking-wide text-[#7b7567]">Class saving throws</h3><div className="mt-2 flex flex-wrap gap-2">{adventurerClass.savingThrows.map((ability) => <button key={ability} type="button" onClick={() => handleSavingThrow(ability)} className="border border-[#d6cfbf] bg-[#faf8f2] px-3 py-2 text-[10px] font-bold uppercase hover:border-[#637454]">{ABILITY_LABELS[ability]} save · DC {difficulty}</button>)}</div></div>
            {lastCheck && <div role="status" className={`border p-3 font-mono text-xs ${lastCheck.success ? 'border-emerald-300 bg-emerald-50 text-emerald-950' : 'border-amber-300 bg-amber-50 text-amber-950'}`}>{rollSummary(lastCheck)}</div>}
          </div>

          <div className="border border-[#d8d2c5] bg-white p-4"><div className="flex items-center justify-between gap-3"><div><h2 className="font-serif text-lg font-bold">Skill Proficiencies</h2><p className="mt-1 text-[10px] text-[#757268]">Choose up to two practiced skills.</p></div><span className="font-mono text-[10px]">{sheet.proficientSkills.length}/2</span></div><div className="mt-3 space-y-1.5">{adventurerClass.skillChoices.map((skillName) => <label key={skillName} className="flex cursor-pointer items-center justify-between border border-[#e8e3d7] px-3 py-2 text-xs hover:bg-[#faf8f1]"><span>{skillName}</span><input type="checkbox" checked={sheet.proficientSkills.includes(skillName)} disabled={!sheet.proficientSkills.includes(skillName) && sheet.proficientSkills.length >= 2} onChange={() => toggleSkillProficiency(skillName)} /></label>)}</div></div>
        </section>
      )}

      {activeTab === 'encounter' && (
        <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(300px,0.75fr)]">
          <article className="border border-[#735b3e] bg-[#272d26] p-4 text-[#eee8d8] sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/15 pb-3"><div><span className="text-[9px] font-bold uppercase tracking-wider text-[#d5b973]">Practice encounter · harmless training</span><h2 className="mt-1 font-serif text-xl font-bold">{PRACTICE_ENCOUNTER.name}</h2><p className="mt-1 text-xs text-[#c6c6b8]">AC {PRACTICE_ENCOUNTER.armorClass} · Strike +{PRACTICE_ENCOUNTER.attackBonus} · {PRACTICE_ENCOUNTER.damageDie} sided die</p></div><button type="button" onClick={handleRest} className="flex items-center gap-1.5 border border-white/20 bg-white/5 px-3 py-2 text-[10px] font-bold uppercase hover:bg-white/10"><HeartPulse size={13} /> Short Rest</button></div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-center font-mono"><div className="border border-white/15 bg-white/5 p-3"><span className="text-[9px] uppercase text-[#c6c6b8]">{sheet.name}</span><strong className="mt-1 block text-xl text-rose-100">{sheet.currentHp}/{stats.maxHp}</strong><span className="text-[9px] uppercase">HP</span></div><div className="border border-white/15 bg-white/5 p-3"><span className="text-[9px] uppercase text-[#c6c6b8]">Training Wisp</span><strong className="mt-1 block text-xl text-amber-100">{sheet.practiceTargetHp}/{PRACTICE_ENCOUNTER.maxHp}</strong><span className="text-[9px] uppercase">HP</span></div></div>
            <button type="button" onClick={handleAttack} disabled={sheet.currentHp <= 0 || sheet.practiceTargetHp <= 0} className="mt-4 flex w-full items-center justify-center gap-2 border border-[#a28955] bg-[#826c43] px-4 py-3 text-xs font-bold uppercase text-white hover:bg-[#977d4c] disabled:cursor-not-allowed disabled:opacity-40"><Swords size={15} /> Make a practice attack</button>
            <div className="mt-3 grid grid-cols-2 gap-2 font-mono text-[10px]"><span>Initiative {formatModifier(stats.initiative)}</span><span className="text-right">Guard {stats.armorClass}</span><span>Attack {formatModifier(abilityModifier(sheet.abilities.strength) + stats.proficiency)}</span><span className="text-right">Proficiency +{stats.proficiency}</span></div>
          </article>
          <aside className="space-y-4">
            <div className="border border-[#d8d2c5] bg-white p-4"><h3 className="text-[10px] font-bold uppercase tracking-wider">Practice conditions</h3><div className="mt-2 space-y-1.5">{(['steady', 'guarded', 'slowed', 'marked'] as const).map((condition) => <div key={condition} className="flex items-start gap-2 border border-[#eee9dd] px-2.5 py-2"><input type="checkbox" aria-label={`Prepare ${condition}`} checked={sheet.conditions.includes(condition)} onChange={() => setSheet((previous) => ({ ...previous, conditions: previous.conditions.includes(condition) ? previous.conditions.filter((entry) => entry !== condition) : [...previous.conditions, condition] }))} /><label className="cursor-pointer" onClick={() => setSheet((previous) => ({ ...previous, conditions: previous.conditions.includes(condition) ? previous.conditions.filter((entry) => entry !== condition) : [...previous.conditions, condition] }))}><span className="block text-[9px] font-bold uppercase text-[#45473e]">{condition}</span><span className="block text-[10px] leading-relaxed text-[#777367]">{PRACTICE_CONDITION_RULES[condition]}</span></label></div>)}</div><p className="mt-2 text-[10px] leading-relaxed text-[#777367]">These local practice effects never modify the strategic warband engine.</p></div>
            {chronicle.length > 0 && <div className="border border-[#d8d2c5] bg-white p-4"><h3 className="text-[10px] font-bold uppercase tracking-wider">Session Chronicle</h3><ol className="mt-2 space-y-2">{chronicle.map((entry, index) => <li key={`${index}-${entry}`} className="border-t border-[#eee9dd] pt-2 text-[10px] leading-relaxed text-[#65645b]">{entry}</li>)}</ol></div>}
          </aside>
        </section>
      )}

      {activeTab === 'ledger' && (
        <section className="space-y-4">
          <header className="border border-[#cfc7b5] bg-[#f5f2e9] p-4"><span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#837551]">Marcher’s Rules Ledger · Original Eldoria reference</span><h2 className="mt-1 font-serif text-xl font-bold">Core d20 procedures</h2><p className="mt-1 text-xs leading-relaxed text-[#66645b]">This quick reference describes the implemented 5e-compatible procedure. Class and setting lore below is original to Eldoria; consult licensed books for full rules text.</p></header>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {[
              ['Ability checks', 'Roll d20 + ability modifier. Add proficiency when the chosen skill is practiced. Meet or beat the difficulty to succeed.'],
              ['Advantage', 'Roll two d20s and keep the higher result. Disadvantage keeps the lower. They cancel when both apply.'],
              ['Proficiency', 'The bonus begins at +2 and increases at levels 5, 9, 13, and 17. It applies only when trained.'],
              ['Saving throws', 'Roll d20 + the relevant ability modifier, adding proficiency for a class saving-throw ability.'],
              ['Attacks and criticals', 'Meet the target’s Guard to hit. A natural 20 is critical and doubles the practice weapon dice; a natural 1 misses.'],
              ['Level and vitality', 'Proficiency scales to level 20. Hit points grow from the class die and Constitution modifier; advancement uses local milestone experience.'],
            ].map(([title, detail]) => <article key={title} className="border border-[#d9d3c5] bg-white p-4"><h3 className="font-serif text-base font-bold text-[#34392f]">{title}</h3><p className="mt-2 text-xs leading-relaxed text-[#65645b]">{detail}</p></article>)}
          </div>
          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">{CONDITIONS.map(([name, detail]) => <article key={name} className="border border-[#ddd7ca] bg-white p-3"><h3 className="text-xs font-bold text-[#45473e]">{name}</h3><p className="mt-1 text-[10px] leading-relaxed text-[#737167]">{detail}</p></article>)}</div>
        </section>
      )}
    </main>
  );
};
