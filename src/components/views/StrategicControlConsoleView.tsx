import React, { useMemo, useState } from 'react';
import { Activity, AlertTriangle, ArrowRight, CheckCircle2, Compass, Crown, Gauge, Shield, Swords, Target, Zap } from 'lucide-react';
import type { PlayerProfile, PlayerResources } from '../../types';
import { sound } from '../../sound';

interface StrategicControlConsoleViewProps {
  profile: PlayerProfile;
  resources: PlayerResources;
  onUpdateResources: (updates: Partial<PlayerResources>) => void;
  onProcessTurn: (count?: number) => void;
  onNavigate: (route: string) => void;
}

type ConsoleTab = 'overview' | 'directives' | 'telemetry';
type DirectiveStatus = 'ready' | 'active' | 'complete';
type DirectiveDomain = 'war' | 'economy' | 'research' | 'exploration';

interface StrategicDirective {
  id: string;
  name: string;
  domain: DirectiveDomain;
  description: string;
  requiredTurns: number;
  reward: { resource: 'naquadah' | 'metal' | 'crystal' | 'energy'; amount: number };
  icon: React.ElementType;
}

interface ConsoleState {
  progress: Record<string, number>;
  statuses: Record<string, DirectiveStatus>;
  activeDirectiveId: string | null;
  log: string[];
  threatLevel: number;
}

const STORAGE_KEY = 'uc_strategic_control_console_v1';

const DIRECTIVES: StrategicDirective[] = [
  { id: 'border-watch', name: 'Raise the Border Watch', domain: 'war', description: 'Reinforce frontier wardens and chart hostile movement along the nearest march.', requiredTurns: 4, reward: { resource: 'energy', amount: 120 }, icon: Shield },
  { id: 'treasury-census', name: 'Conduct a Treasury Census', domain: 'economy', description: 'Audit stores, reroute waste, and recover neglected Crownroad revenue.', requiredTurns: 3, reward: { resource: 'naquadah', amount: 18000 }, icon: Crown },
  { id: 'rune-symposium', name: 'Convene a Rune Symposium', domain: 'research', description: 'Bring the realm’s lorekeepers together to accelerate the next technological breakthrough.', requiredTurns: 5, reward: { resource: 'crystal', amount: 1400 }, icon: Zap },
  { id: 'far-march-survey', name: 'Survey the Far March', domain: 'exploration', description: 'Send pathfinders beyond the known waystones to return with maps and workable ore.', requiredTurns: 6, reward: { resource: 'metal', amount: 2200 }, icon: Compass },
];

const defaultState: ConsoleState = {
  progress: {},
  statuses: {},
  activeDirectiveId: null,
  log: ['Console initialized. No strategic directive is currently in command.'],
  threatLevel: 35,
};

function loadConsoleState(): ConsoleState {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultState;
    const parsed = JSON.parse(saved) as Partial<ConsoleState>;
    return {
      ...defaultState,
      ...parsed,
      progress: parsed.progress || {},
      statuses: parsed.statuses || {},
      log: Array.isArray(parsed.log) ? parsed.log.slice(0, 20) : defaultState.log,
    };
  } catch {
    return defaultState;
  }
}

function saveConsoleState(state: ConsoleState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // The console remains playable when browser storage is unavailable.
  }
}

const formatReward = (resource: StrategicDirective['reward']['resource'], amount: number) => `+${amount.toLocaleString()} ${resource === 'naquadah' ? 'Crowns' : resource === 'energy' ? 'Aether' : resource}`;

export const StrategicControlConsoleView: React.FC<StrategicControlConsoleViewProps> = ({
  profile,
  resources,
  onUpdateResources,
  onProcessTurn,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<ConsoleTab>('overview');
  const [state, setState] = useState<ConsoleState>(() => loadConsoleState());
  const activeDirective = DIRECTIVES.find((directive) => directive.id === state.activeDirectiveId) || null;

  const readiness = useMemo(() => {
    const force = resources.attackUnits * 5 + resources.defenseUnits * 4 + resources.superUnits * 25;
    const treasury = Math.min(100, Math.round((resources.naquadah / 250000) * 100));
    return Math.min(100, Math.round(force / 2500 + treasury / 2));
  }, [resources.attackUnits, resources.defenseUnits, resources.superUnits, resources.naquadah]);

  const commitState = (next: ConsoleState) => {
    setState(next);
    saveConsoleState(next);
  };

  const launchDirective = (directive: StrategicDirective) => {
    if (state.activeDirectiveId || state.statuses[directive.id] === 'complete') return;
    const next: ConsoleState = {
      ...state,
      activeDirectiveId: directive.id,
      statuses: { ...state.statuses, [directive.id]: 'active' },
      log: [`Directive launched: ${directive.name}.`, ...state.log].slice(0, 20),
    };
    commitState(next);
    sound.play('confirm');
  };

  const advanceDirective = () => {
    if (!activeDirective || resources.attackTurns < 1) {
      sound.play('warning');
      return;
    }

    onUpdateResources({ attackTurns: Math.max(0, resources.attackTurns - 1) });
    const nextProgress = Math.min(activeDirective.requiredTurns, (state.progress[activeDirective.id] || 0) + 1);
    const completed = nextProgress >= activeDirective.requiredTurns;
    const next: ConsoleState = {
      ...state,
      progress: { ...state.progress, [activeDirective.id]: nextProgress },
      statuses: { ...state.statuses, [activeDirective.id]: completed ? 'complete' : 'active' },
      activeDirectiveId: completed ? null : activeDirective.id,
      log: [completed ? `Directive complete: ${activeDirective.name}. ${formatReward(activeDirective.reward.resource, activeDirective.reward.amount)} secured.` : `Strategic turn advanced: ${activeDirective.name} at ${nextProgress}/${activeDirective.requiredTurns}.`, ...state.log].slice(0, 20),
      threatLevel: completed ? Math.max(0, state.threatLevel - (activeDirective.domain === 'war' ? 8 : 3)) : state.threatLevel,
    };
    if (completed) {
      onUpdateResources({ [activeDirective.reward.resource]: (resources[activeDirective.reward.resource] || 0) + activeDirective.reward.amount });
      sound.play('success');
    } else {
      sound.play('click');
    }
    commitState(next);
  };

  const resetDirective = (directive: StrategicDirective) => {
    if (state.activeDirectiveId === directive.id) return;
    const next: ConsoleState = {
      ...state,
      progress: { ...state.progress, [directive.id]: 0 },
      statuses: { ...state.statuses, [directive.id]: 'ready' },
      log: [`Directive reset: ${directive.name}.`, ...state.log].slice(0, 20),
    };
    commitState(next);
    sound.play('click');
  };

  return (
    <main id="strategic-control-console" className="space-y-5 text-[#26313a]">
      <header className="border border-[#cfd7d2] border-t-4 border-t-[#a8752b] bg-white p-5 shadow-[0_5px_18px_rgba(38,49,58,0.06)] sm:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#66755d]"><Activity size={14} /> ELDORIA · STRATEGIC CONTROL CONSOLE</span>
            <h1 className="mt-1 font-serif text-2xl font-bold text-[#26352f] sm:text-3xl">The Sovereign Operations Table</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#69746d]">Coordinate the realm’s warbands, treasury, lore halls, and far-march surveys from one persistent command layer.</p>
          </div>
          <div className="grid grid-cols-3 border-t border-[#e1e5df] pt-3 text-center font-mono text-[10px] uppercase lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
            <div className="px-3"><strong className="block text-xl text-[#a14f45]">{state.threatLevel}%</strong>Threat</div>
            <div className="border-x border-[#e1e5df] px-3"><strong className="block text-xl text-[#526b4c]">{readiness}%</strong>Ready</div>
            <div className="px-3"><strong className="block text-xl text-[#a8752b]">{resources.attackTurns}</strong>Turns</div>
          </div>
        </div>
      </header>

      <nav className="flex flex-wrap gap-2 border-b border-[#d8ded9] pb-2" role="tablist" aria-label="Strategic console sections">
        {(['overview', 'directives', 'telemetry'] as ConsoleTab[]).map((tab) => (
          <button key={tab} type="button" role="tab" aria-selected={activeTab === tab} onClick={() => setActiveTab(tab)} className={`border px-3 py-2 text-[10px] font-bold uppercase tracking-wide ${activeTab === tab ? 'border-[#526b4c] bg-[#526b4c] text-white' : 'border-[#d8ded9] bg-white text-[#687681] hover:border-[#9aaa9d]'}`}>
            {tab === 'overview' ? 'Command Overview' : tab === 'directives' ? 'Strategic Directives' : 'Realm Telemetry'}
          </button>
        ))}
      </nav>

      {activeTab === 'overview' && (
        <section className="grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)]">
          <div className="space-y-4 border border-[#d8ded9] bg-white p-5">
            <div className="flex items-start justify-between gap-4 border-b border-[#e5e9e4] pb-3"><div><span className="text-[10px] font-bold uppercase tracking-wider text-[#a8752b]">Current command</span><h2 className="mt-1 font-serif text-xl font-bold">{activeDirective ? activeDirective.name : 'No directive selected'}</h2></div><Target className="text-[#a8752b]" size={22} /></div>
            {activeDirective ? <><p className="text-sm leading-relaxed text-[#687681]">{activeDirective.description}</p><div className="grid grid-cols-3 border border-[#e5e9e4] bg-[#f7f9f6] p-3 text-center font-mono text-[10px] uppercase"><span>Progress<strong className="block text-lg text-[#26352f]">{state.progress[activeDirective.id] || 0}/{activeDirective.requiredTurns}</strong></span><span className="border-x border-[#d8ded9]">Domain<strong className="block text-lg text-[#526b4c]">{activeDirective.domain}</strong></span><span>Reward<strong className="block text-lg text-[#a8752b]">{formatReward(activeDirective.reward.resource, activeDirective.reward.amount)}</strong></span></div><button type="button" onClick={advanceDirective} disabled={resources.attackTurns < 1} className="flex w-full items-center justify-center gap-2 border border-[#526b4c] bg-[#526b4c] px-4 py-3 text-[10px] font-bold uppercase text-white disabled:cursor-not-allowed disabled:opacity-40"><Zap size={14} /> Advance one strategic turn</button></> : <p className="text-sm text-[#687681]">Choose a directive to establish the next command priority for the realm.</p>}
          </div>
          <aside className="space-y-3 border border-[#d8ded9] bg-[#f7f9f6] p-5"><span className="text-[10px] font-bold uppercase tracking-wider text-[#66755d]">Command shortcuts</span><button type="button" onClick={() => onProcessTurn(1)} className="flex w-full items-center justify-between border border-[#cfd7d2] bg-white px-3 py-2 text-left text-xs font-bold hover:border-[#526b4c]">Process realm turn <ArrowRight size={14} /></button><button type="button" onClick={() => onNavigate('military-stats')} className="flex w-full items-center justify-between border border-[#cfd7d2] bg-white px-3 py-2 text-left text-xs font-bold hover:border-[#526b4c]">Open military strength <Swords size={14} /></button><button type="button" onClick={() => onNavigate('tech-library')} className="flex w-full items-center justify-between border border-[#cfd7d2] bg-white px-3 py-2 text-left text-xs font-bold hover:border-[#526b4c]">Open lore archive <Compass size={14} /></button><div className="border-t border-[#d8ded9] pt-3 text-[11px] leading-relaxed text-[#687681]"><strong className="text-[#26352f]">Commander:</strong> {profile.displayName || profile.username}<br /><strong className="text-[#26352f]">Government:</strong> {profile.governmentId}</div></aside>
        </section>
      )}

      {activeTab === 'directives' && <section className="grid gap-3 md:grid-cols-2">{DIRECTIVES.map((directive) => { const Icon = directive.icon; const status = state.statuses[directive.id] || 'ready'; const progress = state.progress[directive.id] || 0; return <article key={directive.id} className="border border-[#d8ded9] bg-white p-4 shadow-[0_3px_12px_rgba(38,49,58,0.04)]"><div className="flex items-start justify-between gap-3"><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center border border-[#e1d2b6] bg-[#fff8ed] text-[#a8752b]"><Icon size={17} /></span><div><span className="text-[9px] font-bold uppercase tracking-wider text-[#687681]">{directive.domain} · {status}</span><h2 className="font-serif text-lg font-bold">{directive.name}</h2></div></div>{status === 'complete' ? <CheckCircle2 className="text-[#27734a]" size={18} /> : <Gauge className="text-[#a8752b]" size={18} />}</div><p className="mt-3 text-xs leading-relaxed text-[#687681]">{directive.description}</p><div className="mt-3 h-2 bg-[#e9eee8]"><div className="h-full bg-[#526b4c]" style={{ width: `${Math.round((progress / directive.requiredTurns) * 100)}%` }} /></div><div className="mt-2 flex items-center justify-between font-mono text-[10px] text-[#687681]"><span>{progress}/{directive.requiredTurns} turns</span><span>{formatReward(directive.reward.resource, directive.reward.amount)}</span></div><div className="mt-3 flex gap-2">{status === 'ready' && <button type="button" disabled={Boolean(state.activeDirectiveId)} onClick={() => launchDirective(directive)} className="flex-1 border border-[#526b4c] bg-[#526b4c] px-3 py-2 text-[10px] font-bold uppercase text-white disabled:opacity-40">Launch directive</button>}{status === 'complete' && <button type="button" onClick={() => resetDirective(directive)} className="flex-1 border border-[#cfd7d2] bg-white px-3 py-2 text-[10px] font-bold uppercase text-[#526b4c]">Reopen directive</button>}{status === 'active' && <span className="flex-1 border border-[#e1d2b6] bg-[#fff8ed] px-3 py-2 text-center text-[10px] font-bold uppercase text-[#a8752b]">Active command</span>}</div></article>; })}</section>}

      {activeTab === 'telemetry' && <section className="grid gap-5 lg:grid-cols-2"><div className="border border-[#d8ded9] bg-white p-5"><h2 className="flex items-center gap-2 font-serif text-xl font-bold"><Activity size={18} className="text-[#526b4c]" /> Realm telemetry</h2><div className="mt-4 space-y-3 font-mono text-xs"><div className="flex justify-between border-b border-[#edf0ec] pb-2"><span>Attack strength</span><strong>{resources.attackUnits.toLocaleString()}</strong></div><div className="flex justify-between border-b border-[#edf0ec] pb-2"><span>Defense strength</span><strong>{resources.defenseUnits.toLocaleString()}</strong></div><div className="flex justify-between border-b border-[#edf0ec] pb-2"><span>Super units</span><strong>{resources.superUnits.toLocaleString()}</strong></div><div className="flex justify-between border-b border-[#edf0ec] pb-2"><span>Crown reserve</span><strong>{resources.naquadah.toLocaleString()}</strong></div><div className="flex justify-between"><span>Aether reserve</span><strong>{resources.energy.toLocaleString()}</strong></div></div></div><div className="border border-[#d8ded9] bg-[#f7f9f6] p-5"><h2 className="flex items-center gap-2 font-serif text-xl font-bold"><AlertTriangle size={18} className="text-[#a14f45]" /> Operations log</h2><div className="mt-4 space-y-2 text-xs text-[#687681]">{state.log.map((entry, index) => <div key={`${entry}-${index}`} className="border-l-2 border-[#d8ded9] pl-3">{entry}</div>)}</div></div></section>}
    </main>
  );
};
