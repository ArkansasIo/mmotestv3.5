import React, { useState } from 'react';
import { Award, Check, ChevronRight, Coins, Flame, Lock, RotateCcw, ScrollText, Skull, Sparkles, Star, Swords, Users } from 'lucide-react';
import { sound } from '../../sound';
import { DUNGEON_RAID_BOSSES, ELDORIA_WARLORDS, type EldoriaWarlord } from '../../data/eldoriaRaidData';
import type { BestiaryMonster } from '../../data/monsterBestiaryData';
import type { PlayerProfile, PlayerResources } from '../../types';
import { parseRaidHistory, RAID_HISTORY_LIMIT, resolveRaid, type RaidReport, type RaidResolution } from '../../utils/raidCombat';

const RAID_HISTORY_KEY = 'uc_state_raid_history';
const SOLO_PROGRESS_KEY = 'uc_state_solo_trial_progress';

interface SoloLevelRecord {
  attempts: number;
  stars: number;
  bestPowerRatio: number;
  bestRounds: number | null;
}

interface SoloProgress {
  highestCleared: number;
  totalAttempts: number;
  totalVictories: number;
  levels: Record<number, SoloLevelRecord>;
}

const EMPTY_SOLO_PROGRESS: SoloProgress = {
  highestCleared: 0,
  totalAttempts: 0,
  totalVictories: 0,
  levels: {},
};

const soloProgressKey = (profileId: string) => `${SOLO_PROGRESS_KEY}_${profileId}`;

function loadRaidHistory(): RaidReport[] {
  try {
    return parseRaidHistory(window.localStorage.getItem(RAID_HISTORY_KEY));
  } catch {
    return [];
  }
}

function saveRaidHistory(history: RaidReport[]) {
  try {
    window.localStorage.setItem(RAID_HISTORY_KEY, JSON.stringify(history.slice(0, RAID_HISTORY_LIMIT)));
  } catch {
    // Keep the encounter playable when browser storage is unavailable.
  }
}

function loadSoloProgress(profileId: string): SoloProgress {
  try {
    const raw = window.localStorage.getItem(soloProgressKey(profileId));
    if (raw) {
      const parsed: unknown = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return EMPTY_SOLO_PROGRESS;

      const data = parsed as Partial<SoloProgress>;
      const levels: Record<number, SoloLevelRecord> = {};
      if (data.levels && typeof data.levels === 'object') {
        for (const [key, value] of Object.entries(data.levels)) {
          const level = Number(key);
          if (!Number.isInteger(level) || level < 1 || level > DUNGEON_RAID_BOSSES.length || !value) continue;
          levels[level] = {
            attempts: Number.isInteger(value.attempts) ? Math.max(0, value.attempts) : 0,
            stars: Number.isInteger(value.stars) ? Math.min(3, Math.max(0, value.stars)) : 0,
            bestPowerRatio: Number.isFinite(value.bestPowerRatio) ? Math.max(0, value.bestPowerRatio) : 0,
            bestRounds: typeof value.bestRounds === 'number' && Number.isInteger(value.bestRounds) && value.bestRounds > 0 ? value.bestRounds : null,
          };
        }
      }

      return {
        highestCleared: typeof data.highestCleared === 'number' && Number.isInteger(data.highestCleared)
          ? Math.min(DUNGEON_RAID_BOSSES.length, Math.max(0, data.highestCleared))
          : 0,
        totalAttempts: typeof data.totalAttempts === 'number' && Number.isInteger(data.totalAttempts) ? Math.max(0, data.totalAttempts) : 0,
        totalVictories: typeof data.totalVictories === 'number' && Number.isInteger(data.totalVictories) ? Math.max(0, data.totalVictories) : 0,
        levels,
      };
    }

    const legacyProgress = Number(window.localStorage.getItem(SOLO_PROGRESS_KEY));
    if (Number.isInteger(legacyProgress) && legacyProgress > 0) {
      const migrated = { ...EMPTY_SOLO_PROGRESS, highestCleared: Math.min(legacyProgress, DUNGEON_RAID_BOSSES.length) };
      window.localStorage.setItem(soloProgressKey(profileId), JSON.stringify(migrated));
      window.localStorage.removeItem(SOLO_PROGRESS_KEY);
      return migrated;
    }
  } catch {
    return EMPTY_SOLO_PROGRESS;
  }
  return EMPTY_SOLO_PROGRESS;
}

function saveSoloProgress(profileId: string, progress: SoloProgress) {
  try {
    window.localStorage.setItem(soloProgressKey(profileId), JSON.stringify(progress));
  } catch {
    // Keep level progression available for the current session when storage is unavailable.
  }
}

interface WarlordsDungeonRaidsViewProps {
  profile: PlayerProfile;
  resources: PlayerResources;
  onUpdateResources: (updates: Partial<PlayerResources>) => void;
  onNavigate?: (route: string) => void;
}

type RaidTab = 'warlords' | 'dungeons' | 'solo' | 'shrine' | 'rebellion';

const formatReward = (amount: number) => amount.toLocaleString();

export const WarlordsDungeonRaidsView: React.FC<WarlordsDungeonRaidsViewProps> = ({
  profile,
  resources,
  onUpdateResources,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<RaidTab>('warlords');
  const [selectedWarlord, setSelectedWarlord] = useState<EldoriaWarlord>(ELDORIA_WARLORDS[0]);
  const [isResolving, setIsResolving] = useState(false);
  const [raidHistory, setRaidHistory] = useState<RaidReport[]>(loadRaidHistory);
  const [report, setReport] = useState<RaidReport | null>(() => loadRaidHistory()[0] || null);
  const [soloProgress, setSoloProgress] = useState(() => loadSoloProgress(profile.id));
  const [selectedSoloLevel, setSelectedSoloLevel] = useState(1);
  const [notice, setNotice] = useState<string | null>(null);
  const [shrineCharge, setShrineCharge] = useState(100);
  const [championVigor, setChampionVigor] = useState(65);
  const [marcherLoyalty, setMarcherLoyalty] = useState(85);
  const [sabotageReady, setSabotageReady] = useState(false);

  const getWarbandPower = () =>
    (profile.level || 1) * 10000 + resources.attackUnits * 5 + resources.superUnits * 25 +
    (resources.naquadah > 100000 ? 300000 : 150000);

  const settleRewards = (crowns: number, iron: number, moonstone: number) => {
    onUpdateResources({
      naquadah: resources.naquadah + crowns,
      metal: resources.metal + iron,
      crystal: resources.crystal + moonstone,
    });
  };

  const startEncounter = (
    name: string,
    title: string,
    encounterType: RaidReport['encounterType'],
    threatPower: number,
    bounty: { crowns: number; iron: number; moonstone: number },
    opening: string,
    ability: string,
    useSabotage: boolean,
    onComplete?: (resolution: RaidResolution) => void,
  ) => {
    if (isResolving) return;
    setIsResolving(true);
    setNotice(`The warband is marching toward ${name}. The encounter is being resolved.`);
    sound.play('combat');

    window.setTimeout(() => {
      const resolution = resolveRaid({
        warbandPower: getWarbandPower(),
        threatPower,
        bounty,
        sabotageUsed: useSabotage,
      });

      if (resolution.victory) {
        settleRewards(resolution.crowns, resolution.iron, resolution.moonstone);
        sound.play('success');
      } else {
        sound.play('warning');
      }
      onComplete?.(resolution);

      const nextReport: RaidReport = {
        id: `raid-${Date.now()}`,
        createdAt: new Date().toISOString(),
        encounterType,
        name,
        title,
        victory: resolution.victory,
        rounds: resolution.rounds,
        warbandPower: resolution.warbandPower,
        threatPower: resolution.threatPower,
        sabotageUsed: useSabotage,
        crowns: resolution.crowns,
        iron: resolution.iron,
        moonstone: resolution.moonstone,
        log: [
          `[The March] ${opening}`,
          `[The Muster] ${ability}`,
          `[The Measure] Warband strength ${resolution.warbandPower.toLocaleString()} against threat ${resolution.threatPower.toLocaleString()}${useSabotage ? ' after sabotage' : ''}.`,
          useSabotage ? '[The Free March] Loyal scouts broke the enemy ward-line before the first clash.' : `[The Battle] The encounter resolved in ${resolution.rounds} rounds.`,
          resolution.victory ? `[Victory] The enemy withdrew. The warband recovered ${resolution.crowns.toLocaleString()} Crowns, ${resolution.iron.toLocaleString()} Iron, and ${resolution.moonstone.toLocaleString()} Moonstone.` : '[Retreat] The enemy held its ground. The warband returned to the nearest keep.',
        ],
      };
      const nextHistory = [nextReport, ...loadRaidHistory()].slice(0, RAID_HISTORY_LIMIT);
      saveRaidHistory(nextHistory);
      setRaidHistory(nextHistory);
      setReport(nextReport);
      setNotice(resolution.victory ? `${name} has been defeated. The bounty is in your stores.` : `${name} held the field. Regroup before another challenge.`);
      setIsResolving(false);
      if (useSabotage) setSabotageReady(false);
    }, 900);
  };

  const challengeWarlord = (warlord: EldoriaWarlord) => {
    startEncounter(
      warlord.name,
      warlord.title,
      'warlord',
      warlord.threatPower,
      { crowns: warlord.bountyCrowns, iron: warlord.bountyIron, moonstone: Math.round(warlord.bountyIron * 0.55) },
      `The gates of ${warlord.stronghold} opened at ${warlord.marchCoordinate}. ${warlord.guardOrder} formed ranks.`,
      warlord.ability,
      sabotageReady,
    );
  };

  const challengeDungeon = (monster: BestiaryMonster) => {
    startEncounter(
      monster.name,
      monster.title,
      'dungeon',
      monster.stats.health + monster.stats.attack * 120 + monster.stats.ward * 80,
      { crowns: monster.bounty.aether, iron: monster.bounty.iron, moonstone: monster.bounty.moonstone },
      `The dungeon trail led to ${monster.habitat}. The final chamber stirred.`,
      `${monster.ability.name}: ${monster.ability.description}`,
      false,
    );
  };

  const challengeSoloLevel = (level: number) => {
    const monster = DUNGEON_RAID_BOSSES[level - 1];
    if (!monster || level > soloProgress.highestCleared + 1) return;

    const isReplay = level <= soloProgress.highestCleared;
    const difficultyMultiplier = 1 + (level - 1) * 0.06;
    const rewardMultiplier = isReplay ? 0.4 : 1;
    const threatPower = Math.ceil(
      (monster.stats.health + monster.stats.attack * 120 + monster.stats.ward * 80) * difficultyMultiplier,
    );

    startEncounter(
      `Solo ${level}: ${monster.name}`,
      monster.title,
      'dungeon',
      threatPower,
      {
        crowns: Math.round(monster.bounty.aether * rewardMultiplier),
        iron: Math.round(monster.bounty.iron * rewardMultiplier),
        moonstone: Math.round(monster.bounty.moonstone * rewardMultiplier),
      },
      `Solo Trial ${level} begins at ${monster.habitat}. No allied warband will reinforce the champion.`,
      `${monster.ability.name}: ${monster.ability.description}`,
      false,
      (resolution) => {
        const previous = soloProgress.levels[level] ?? {
          attempts: 0,
          stars: 0,
          bestPowerRatio: 0,
          bestRounds: null,
        };
        const powerRatio = resolution.warbandPower / Math.max(1, resolution.threatPower);
        const earnedStars = resolution.victory
          ? powerRatio >= 1.6 ? 3 : powerRatio >= 1.25 ? 2 : 1
          : 0;
        const nextProgress: SoloProgress = {
          highestCleared: resolution.victory
            ? Math.max(soloProgress.highestCleared, level)
            : soloProgress.highestCleared,
          totalAttempts: soloProgress.totalAttempts + 1,
          totalVictories: soloProgress.totalVictories + (resolution.victory ? 1 : 0),
          levels: {
            ...soloProgress.levels,
            [level]: {
              attempts: previous.attempts + 1,
              stars: Math.max(previous.stars, earnedStars),
              bestPowerRatio: Math.max(previous.bestPowerRatio, resolution.victory ? powerRatio : 0),
              bestRounds: resolution.victory
                ? previous.bestRounds === null ? resolution.rounds : Math.min(previous.bestRounds, resolution.rounds)
                : previous.bestRounds,
            },
          },
        };
        setSoloProgress(nextProgress);
        saveSoloProgress(profile.id, nextProgress);
      },
    );
  };

  const demandTribute = (warlord: EldoriaWarlord) => {
    if (resources.naquadah < 50000) {
      setNotice(`${warlord.name} refused the demand. The realm’s treasury must stand behind its envoys.`);
      sound.play('warning');
      return;
    }
    const tribute = Math.round(warlord.bountyCrowns * 0.25);
    onUpdateResources({ naquadah: resources.naquadah + tribute });
    setNotice(`${warlord.name} yielded ${formatReward(tribute)} Crowns to avert a siege.`);
    sound.play('confirm');
  };

  const useShrine = () => {
    if (championVigor >= 100) {
      setNotice('The champion is already restored.');
      return;
    }
    if (shrineCharge < 25) {
      setNotice('The shrine has too little ember-charge. Let its wardstones recover.');
      sound.play('warning');
      return;
    }
    setShrineCharge((charge) => charge - 25);
    setChampionVigor(100);
    setNotice('The Dawnsong shrine restored the champion’s vigor.');
    sound.play('confirm');
  };

  const callMarcherCells = () => {
    if (marcherLoyalty < 30) {
      setNotice('The Marcher cells need time to rebuild trust before risking another mission.');
      sound.play('warning');
      return;
    }
    setMarcherLoyalty((loyalty) => loyalty - 30);
    setSabotageReady(true);
    setNotice('Free March scouts are ready to weaken one warlord’s ward-line.');
    sound.play('confirm');
  };

  const resetSoloProgress = () => {
    if (!window.confirm('Reset Solo Trials clears and mastery? Earned resources and raid history will remain.')) return;
    setSoloProgress(EMPTY_SOLO_PROGRESS);
    saveSoloProgress(profile.id, EMPTY_SOLO_PROGRESS);
    setSelectedSoloLevel(1);
    setReport(null);
    setNotice('Solo Trials progression has been reset. Earned resources and raid history were kept.');
  };

  return (
    <main id="warlords-dungeon-raids-view" className="rival-system warlord-raid-system space-y-5 text-[#26313a]">
      <header className="grid gap-5 border border-[#465240] bg-[#202a22] p-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:p-7">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d0ac70]">Age of Embers · War Council ledger</span>
          <h1 className="mt-1 font-serif text-2xl font-bold text-[#fff8e8] sm:text-3xl">Warlords & Dungeon Raids</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#d2d0c3]">Challenge the Marches’ rival warlords or descend into lairs where the oldest creatures keep their hoards.</p>
          {onNavigate && <button type="button" onClick={() => onNavigate('monster-bestiary')} className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase text-[#e6c88f] underline underline-offset-2 hover:text-white"><ScrollText size={13} /> Consult the bestiary</button>}
        </div>
        <div className="grid grid-cols-3 border-t border-white/15 pt-3 text-center font-mono text-xs md:border-l md:border-t-0 md:pl-5 md:pt-0">
          <div className="px-3"><strong className="block text-lg text-white">{ELDORIA_WARLORDS.length}</strong><span className="text-[9px] uppercase text-[#c3c0b3]">Warlords</span></div>
          <div className="border-x border-white/15 px-3"><strong className="block text-lg text-white">{DUNGEON_RAID_BOSSES.length}</strong><span className="text-[9px] uppercase text-[#c3c0b3]">Lairs</span></div>
          <div className="px-3"><strong className="block text-lg text-amber-300">{resources.naquadah.toLocaleString()}</strong><span className="text-[9px] uppercase text-[#c3c0b3]">Crowns</span></div>
        </div>
      </header>

      <div role="tablist" aria-label="War council records" className="flex gap-2 overflow-x-auto border-b border-[#485043] pb-2">
        {([
          ['warlords', 'Warlord Council'],
          ['dungeons', 'Dungeon Lairs'],
          ['solo', 'Solo Trials'],
          ['shrine', 'Dawnsong Shrine'],
          ['rebellion', 'Free March Cells'],
        ] as const).map(([tab, label]) => (
          <button key={tab} type="button" role="tab" aria-selected={activeTab === tab} onClick={() => setActiveTab(tab)} className={`shrink-0 border px-3 py-2 text-[10px] font-bold uppercase tracking-wide ${activeTab === tab ? 'border-[#b58a4d] bg-[#394432] text-[#fff4d6]' : 'border-[#465044] bg-[#19221c] text-[#c5c0b1] hover:border-[#879078]'}`}>
            {label}
          </button>
        ))}
      </div>

      {notice && <div role="status" className="flex items-start justify-between gap-3 border border-[#67764f] bg-[#253224] px-4 py-3 text-xs text-[#e2e7d6]"><span>{notice}</span><button type="button" onClick={() => setNotice(null)} aria-label="Dismiss notice" className="text-[#b8b9ac] hover:text-white">×</button></div>}

      {activeTab === 'warlords' && (
        <section className="grid gap-4 lg:grid-cols-[minmax(240px,0.85fr)_minmax(0,1.65fr)]">
          <div className="space-y-2">
            <h2 className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#c5ad7d]">Claims against the crowns</h2>
            {ELDORIA_WARLORDS.map((warlord) => (
              <button key={warlord.id} type="button" aria-pressed={selectedWarlord.id === warlord.id} onClick={() => { setSelectedWarlord(warlord); setReport(null); }} className={`flex w-full items-center justify-between gap-3 border p-3 text-left ${selectedWarlord.id === warlord.id ? 'border-[#c69e5c] bg-[#303b2e]' : 'border-[#414a40] bg-[#1d251f] hover:border-[#7c826d]'}`}>
                <span className="flex min-w-0 items-center gap-3"><span className="text-xl">{warlord.sigil}</span><span className="min-w-0"><strong className="block truncate text-xs text-[#faf4e3]">{warlord.name}</strong><span className="block truncate text-[10px] text-[#b9b6a9]">{warlord.title}</span></span></span>
                <ChevronRight size={15} className="shrink-0 text-[#b9a071]" aria-hidden="true" />
              </button>
            ))}
          </div>

          <article className="border border-[#786342] bg-[#242b23] p-4 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex gap-3"><span className="text-3xl">{selectedWarlord.sigil}</span><div><span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#c6a870]">{selectedWarlord.title}</span><h2 className="font-serif text-xl font-bold text-[#fff8e8]">{selectedWarlord.name}</h2><p className="mt-1 text-xs text-[#c8c6b8]">{selectedWarlord.temperament}</p></div></div>
              <span className="border border-[#736247] bg-[#171e18] px-2.5 py-1 font-mono text-[10px] text-[#e3c88f]">March {selectedWarlord.marchCoordinate}</span>
            </div>
            <blockquote className="my-4 border-l-2 border-[#b2864d] bg-[#1c241e] px-3 py-2 font-serif text-sm italic text-[#e3dac2]">{selectedWarlord.challenge}</blockquote>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
              {[
                ['Stronghold', selectedWarlord.stronghold],
                ['Guard order', selectedWarlord.guardOrder],
                ['Champion', selectedWarlord.champion],
                ['Threat', selectedWarlord.threatPower.toLocaleString()],
                ['Shrine ward', selectedWarlord.shrineState],
              ].map(([label, value]) => <div key={label} className="min-w-0 border border-white/10 bg-[#1a211b] p-2"><span className="block text-[9px] uppercase text-[#aaa99d]">{label}</span><strong className="mt-1 block truncate text-[10px] text-[#eee4cc]">{value}</strong></div>)}
            </div>
            <div className="mt-3 border border-white/10 bg-[#1a211b] p-3"><span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-[#d5b879]"><Sparkles size={12} /> Warlord’s stratagem</span><p className="mt-1 text-xs text-[#d6d2c3]">{selectedWarlord.ability}</p></div>
            {sabotageReady && <p className="mt-3 border border-emerald-800 bg-emerald-950/40 p-2 text-[10px] text-emerald-200">Free March scouts are ready to weaken this warlord’s defenses.</p>}
            <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4 sm:flex-row">
              <button type="button" disabled={isResolving} onClick={() => challengeWarlord(selectedWarlord)} className="flex-1 border border-[#bd8d48] bg-[#826038] px-4 py-2.5 text-[10px] font-bold uppercase text-white hover:bg-[#9a7542] disabled:opacity-50"><Swords size={14} className="mr-2 inline" />{isResolving ? 'March in progress…' : 'Challenge Warlord'}</button>
              <button type="button" onClick={() => demandTribute(selectedWarlord)} className="border border-[#69604c] bg-[#33372d] px-4 py-2.5 text-[10px] font-bold uppercase text-[#efddae] hover:bg-[#414638]"><Coins size={14} className="mr-2 inline" />Demand Tribute</button>
            </div>
          </article>
        </section>
      )}

      {activeTab === 'dungeons' && (
        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {DUNGEON_RAID_BOSSES.map((monster) => (
            <article key={monster.id} className="flex flex-col border border-[#57443a] bg-[#24231f] p-4">
              <div className="flex items-start justify-between gap-2"><div><span className="text-[9px] font-bold uppercase tracking-[0.13em] text-[#c08a63]">{monster.className} · Apex</span><h2 className="mt-1 font-serif text-base font-bold text-[#fff4e3]">{monster.name}</h2><p className="text-[10px] italic text-[#c4b8a7]">{monster.title}</p></div><Skull size={18} className="shrink-0 text-[#b56f57]" aria-hidden="true" /></div>
              <p className="mt-3 text-[11px] leading-relaxed text-[#d0c9bb]">{monster.lore}</p>
              <p className="mt-2 text-[10px] text-[#b8ae9f]">Lair: {monster.habitat}</p>
              <p className="mt-1 text-[10px] text-[#b8ae9f]">{monster.ability.name}: {monster.ability.description}</p>
              <div className="mt-auto pt-4"><div className="mb-2 flex flex-wrap gap-x-3 text-[9px] font-mono text-[#dbc798]"><span>VIG {monster.stats.health.toLocaleString()}</span><span>MIGHT {monster.stats.attack}</span><span>WARD {monster.stats.ward}</span></div><button type="button" disabled={isResolving} onClick={() => challengeDungeon(monster)} className="w-full border border-[#8e5946] bg-[#683f35] py-2 text-[10px] font-bold uppercase text-white hover:bg-[#805044] disabled:opacity-50">{isResolving ? 'Raid in progress…' : 'Enter the Lair'}</button></div>
            </article>
          ))}
        </section>
      )}

      {activeTab === 'solo' && (
        <section className="space-y-4">
          <header className="flex flex-wrap items-end justify-between gap-3 border border-[#786342] bg-[#242b23] p-4 sm:p-5">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#c6a870]">A champion’s road · solo progression</span>
              <h2 className="mt-1 font-serif text-xl font-bold text-[#fff8e8]">The Emberdeep Trials</h2>
              <p className="mt-1 max-w-2xl text-xs leading-relaxed text-[#d0c9bb]">Defeat each apex guardian alone to unlock the next level. Threat rises by 6% per level; cleared trials can be replayed for a smaller bounty.</p>
            </div>
            <div className="border border-white/15 bg-[#171e18] px-3 py-2 text-right font-mono">
              <strong className="block text-lg text-white">{soloProgress.highestCleared} / {DUNGEON_RAID_BOSSES.length}</strong>
              <span className="text-[9px] uppercase text-[#c3c0b3]">Levels cleared</span>
            </div>
            <button type="button" onClick={resetSoloProgress} disabled={soloProgress.totalAttempts === 0} className="inline-flex items-center gap-1.5 border border-[#746040] px-3 py-2 text-[9px] font-bold uppercase text-[#e2d2b2] hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"><RotateCcw size={12} /> Reset progress</button>
          </header>

          <div className="grid gap-2 border border-white/10 bg-[#1a211b] p-3 text-center sm:grid-cols-3">
            <div><strong className="block text-sm text-white">{soloProgress.totalAttempts}</strong><span className="text-[9px] uppercase text-[#aaa99d]">Attempts</span></div>
            <div><strong className="block text-sm text-emerald-200">{soloProgress.totalVictories}</strong><span className="text-[9px] uppercase text-[#aaa99d]">Victories</span></div>
            <div><strong className="block text-sm text-amber-200">{Object.values(soloProgress.levels).reduce((total, level) => total + level.stars, 0)} / {DUNGEON_RAID_BOSSES.length * 3}</strong><span className="text-[9px] uppercase text-[#aaa99d]">Mastery stars</span></div>
          </div>

          <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {DUNGEON_RAID_BOSSES.map((monster, index) => {
              const level = index + 1;
              const isLocked = level > soloProgress.highestCleared + 1;
              const record = soloProgress.levels[level];
              const isCleared = level <= soloProgress.highestCleared;
              return (
                <button
                  key={monster.id}
                  type="button"
                  disabled={isLocked || isResolving}
                  aria-pressed={selectedSoloLevel === level}
                  onClick={() => setSelectedSoloLevel(level)}
                  className={`flex min-h-20 items-center justify-between gap-2 border p-3 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-45 ${
                    selectedSoloLevel === level
                      ? 'border-[#c69e5c] bg-[#303b2e]'
                      : 'border-[#414a40] bg-[#1d251f] hover:border-[#7c826d]'
                  }`}
                >
                  <span className="min-w-0">
                    <span className="block text-[9px] font-bold uppercase tracking-wider text-[#c6a870]">Level {level}</span>
                    <strong className="mt-1 block truncate text-xs text-[#faf4e3]">{monster.name}</strong>
                  </span>
                  <span className="flex shrink-0 items-center gap-1">
                    {record && <span className="flex items-center text-amber-300" aria-label={`${record.stars} mastery stars`}>{Array.from({ length: record.stars }).map((_, starIndex) => <Star key={starIndex} size={9} fill="currentColor" />)}</span>}
                    {isLocked ? <Lock size={14} className="text-[#85877b]" /> : isCleared ? <Check size={15} className="text-emerald-300" /> : <ChevronRight size={15} className="text-[#b9a071]" />}
                  </span>
                </button>
              );
            })}
          </div>

          {DUNGEON_RAID_BOSSES[selectedSoloLevel - 1] && (() => {
            const monster = DUNGEON_RAID_BOSSES[selectedSoloLevel - 1];
            const isReplay = selectedSoloLevel <= soloProgress.highestCleared;
            const record = soloProgress.levels[selectedSoloLevel];
            const difficultyMultiplier = 1 + (selectedSoloLevel - 1) * 0.06;
            const threatPower = Math.ceil(
              (monster.stats.health + monster.stats.attack * 120 + monster.stats.ward * 80) * difficultyMultiplier,
            );
            const rewardMultiplier = isReplay ? 0.4 : 1;
            return (
              <article className="grid gap-5 border border-[#786342] bg-[#242b23] p-4 sm:p-6 lg:grid-cols-[minmax(0,1fr)_300px]">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#c6a870]">Level {selectedSoloLevel} · {isReplay ? 'Cleared · Replay' : selectedSoloLevel === soloProgress.highestCleared + 1 ? 'Unlocked' : 'Locked'}</span>
                  <h3 className="mt-1 font-serif text-xl font-bold text-[#fff8e8]">{monster.name}</h3>
                  <p className="text-xs italic text-[#c4b8a7]">{monster.title} · {monster.className}</p>
                  <p className="mt-3 text-xs leading-relaxed text-[#d0c9bb]">{monster.lore}</p>
                  <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {[
                      ['Habitat', monster.habitat],
                      ['Vitality', monster.stats.health.toLocaleString()],
                      ['Might', monster.stats.attack.toLocaleString()],
                      ['Ward', monster.stats.ward.toLocaleString()],
                    ].map(([label, value]) => <div key={label} className="border border-white/10 bg-[#1a211b] p-2"><span className="block text-[9px] uppercase text-[#aaa99d]">{label}</span><strong className="mt-1 block text-[10px] text-[#eee4cc]">{value}</strong></div>)}
                  </div>
                  <div className="mt-3 border border-white/10 bg-[#1a211b] p-3"><span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-[#d5b879]"><Sparkles size={12} /> Trial ability: {monster.ability.name}</span><p className="mt-1 text-xs text-[#d6d2c3]">{monster.ability.description}</p></div>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-[#d6d2c3]">
                    <span>Mastery: <strong className="text-amber-300">{record ? `${record.stars} / 3 stars` : 'Unranked'}</strong></span>
                    {record && <span>Best clear: <strong>{record.bestRounds ?? '-'} rounds</strong></span>}
                    {record && <span>Attempts: <strong>{record.attempts}</strong></span>}
                  </div>
                  <p className="mt-2 text-[9px] text-[#aaa99d]">Clear with 1.25x power for 2 stars or 1.6x for 3. Mastery stars never decrease.</p>
                </div>
                <aside className="flex flex-col border border-white/10 bg-[#171e18] p-4">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#c5ad7d]">Trial conditions</span>
                  <div className="mt-3 flex justify-between text-xs text-[#d7d1c1]"><span>Required power</span><strong>{threatPower.toLocaleString()}</strong></div>
                  <div className="mt-1 flex justify-between text-xs text-[#d7d1c1]"><span>Your power</span><strong>{getWarbandPower().toLocaleString()}</strong></div>
                  <div className="mt-1 flex justify-between text-xs text-[#d7d1c1]"><span>Difficulty</span><strong>+{Math.round((difficultyMultiplier - 1) * 100)}%</strong></div>
                  <div className="my-3 border-t border-white/10" />
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#c5ad7d]">Victory bounty{isReplay ? ' · replay rate' : ' · first clear'}</span>
                  <div className="mt-2 flex justify-between text-xs text-[#d7d1c1]"><span>Crowns</span><strong>{Math.round(monster.bounty.aether * rewardMultiplier).toLocaleString()}</strong></div>
                  <div className="mt-1 flex justify-between text-xs text-[#d7d1c1]"><span>Iron</span><strong>{Math.round(monster.bounty.iron * rewardMultiplier).toLocaleString()}</strong></div>
                  <div className="mt-1 flex justify-between text-xs text-[#d7d1c1]"><span>Moonstone</span><strong>{Math.round(monster.bounty.moonstone * rewardMultiplier).toLocaleString()}</strong></div>
                  <button type="button" disabled={isResolving || selectedSoloLevel > soloProgress.highestCleared + 1} onClick={() => challengeSoloLevel(selectedSoloLevel)} className="mt-auto border border-[#bd8d48] bg-[#826038] px-4 py-2.5 text-[10px] font-bold uppercase text-white hover:bg-[#9a7542] disabled:cursor-not-allowed disabled:opacity-50">
                    <Swords size={14} className="mr-2 inline" />{isResolving ? 'Trial in progress…' : isReplay ? 'Replay Trial' : 'Enter Solo Trial'}
                  </button>
                </aside>
              </article>
            );
          })()}
        </section>
      )}

      {activeTab === 'shrine' && (
        <section className="grid gap-5 border border-[#60744e] bg-[#232c23] p-5 md:grid-cols-[minmax(0,1fr)_280px] md:items-center md:p-7">
          <div className="flex items-start gap-4"><div className="border border-[#839566] bg-[#354432] p-3 text-[#e8d59f]"><Flame size={28} /></div><div><span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#cfb87f]">Dawnsong sanctuary</span><h2 className="mt-1 font-serif text-xl font-bold text-[#fff7e6]">Shrine of the Hearthward Bell</h2><p className="mt-2 max-w-xl text-xs leading-relaxed text-[#d0d0c2]">A quiet place to restore a wounded champion between marches. Each rite draws on the shrine’s stored warmth.</p></div></div>
          <div className="border border-white/10 bg-[#171e18] p-4"><div className="mb-2 flex justify-between text-[10px] text-[#d7d1c1]"><span>Shrine charge</span><strong>{shrineCharge}%</strong></div><div className="mb-3 h-2 bg-[#30392e]"><div className="h-full bg-[#839966]" style={{ width: `${shrineCharge}%` }} /></div><div className="mb-3 flex justify-between text-[10px] text-[#d7d1c1]"><span>Champion vigor</span><strong>{championVigor}%</strong></div><button type="button" onClick={useShrine} className="w-full border border-[#819465] bg-[#4a603d] py-2 text-[10px] font-bold uppercase text-white hover:bg-[#5d754d]">Restore at Shrine</button></div>
        </section>
      )}

      {activeTab === 'rebellion' && (
        <section className="grid gap-5 border border-[#65705a] bg-[#232923] p-5 md:grid-cols-[minmax(0,1fr)_280px] md:items-center md:p-7">
          <div className="flex items-start gap-4"><div className="border border-[#899078] bg-[#384438] p-3 text-[#d5d9bd]"><Users size={28} /></div><div><span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#c6c89e]">Free March network</span><h2 className="mt-1 font-serif text-xl font-bold text-[#fff7e6]">Scouts Beyond the Crownroad</h2><p className="mt-2 max-w-xl text-xs leading-relaxed text-[#d0d0c2]">Trusted scouts can weaken a rival’s ward-line before one warlord challenge. Calling them costs loyalty and readies one sabotage.</p></div></div>
          <div className="border border-white/10 bg-[#171e18] p-4"><div className="mb-2 flex justify-between text-[10px] text-[#d7d1c1]"><span>Marcher trust</span><strong>{marcherLoyalty}%</strong></div><div className="mb-3 h-2 bg-[#30392e]"><div className="h-full bg-[#8c9b69]" style={{ width: `${marcherLoyalty}%` }} /></div><p className="mb-3 text-[10px] text-[#c5c2b4]">{sabotageReady ? 'One ward-line sabotage is prepared.' : 'No sabotage prepared.'}</p><button type="button" onClick={callMarcherCells} disabled={sabotageReady} className="w-full border border-[#73805f] bg-[#46543e] py-2 text-[10px] font-bold uppercase text-white hover:bg-[#59694b] disabled:opacity-50">Prepare Sabotage</button></div>
        </section>
      )}

      {report && (
        <section aria-live="polite" className="border border-[#746040] bg-[#242a23] p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3"><div className="flex items-center gap-2"><Award size={18} className="text-[#d2b46f]" /><div><span className="block text-[9px] font-bold uppercase tracking-wider text-[#c5ad7d]">Encounter chronicle</span><h2 className="font-serif text-base font-bold text-[#fff5df]">{report.name} · {report.title}</h2></div></div><span className={`border px-2 py-1 text-[9px] font-bold uppercase ${report.victory ? 'border-emerald-700 bg-emerald-950/50 text-emerald-200' : 'border-[#8e5946] bg-[#462d29] text-[#f2c4af]'}`}>{report.victory ? 'Victory' : 'Retreat'} · {report.rounds} rounds</span></div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center font-mono text-[10px] text-[#d6c89e]"><div>Crowns<strong className="block text-sm text-white">+{report.crowns.toLocaleString()}</strong></div><div>Iron<strong className="block text-sm text-white">+{report.iron.toLocaleString()}</strong></div><div>Moonstone<strong className="block text-sm text-white">+{report.moonstone.toLocaleString()}</strong></div></div>
          <div className="mt-3 space-y-1 border-t border-white/10 pt-3 text-[10px] leading-relaxed text-[#c9c8bb]">{report.log.map((line, index) => <p key={index}>{line}</p>)}</div>
        </section>
      )}

      {raidHistory.length > 0 && (
        <section aria-label="Recent raid history" className="border-t border-[#485043] pt-4">
          <h2 className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#c5ad7d]">Recent Marches</h2>
          <ul className="divide-y divide-white/10">
            {raidHistory.map((entry) => (
              <li key={entry.id}>
                <button type="button" onClick={() => setReport(entry)} className="flex w-full flex-wrap items-center justify-between gap-2 py-3 text-left hover:bg-white/5">
                  <span><strong className="block text-xs text-[#f5ecd8]">{entry.name}</strong><span className="text-[10px] text-[#aaa99d]">{new Date(entry.createdAt).toLocaleString()}</span></span>
                  <span className="flex items-center gap-3 font-mono text-[10px]"><span className={entry.victory ? 'text-emerald-300' : 'text-[#e5a88e]'}>{entry.victory ? 'Victory' : 'Retreat'}</span><span className="text-[#d6c89e]">{entry.rounds} rounds</span><span className="text-[#f1d28c">+{entry.crowns.toLocaleString()} Crowns</span></span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
};
