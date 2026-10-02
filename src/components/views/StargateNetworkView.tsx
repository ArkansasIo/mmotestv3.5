import React, { useState } from 'react';
import {
  Disc,
  Radio,
  Shield,
  Zap,
  Sparkles,
  Layers,
  Rocket,
  Compass,
  History,
  CheckCircle2,
  Atom,
  Globe,
} from 'lucide-react';
import { sound } from '../../sound';
import {
  STARGATE_NETWORK,
  StargateAddress,
} from '../../stargateData';
import { PlayerResources, PlayerProfile } from '../../types';
import { StargateDialerPanel } from './stargate/StargateDialerPanel';
import { StargateAddressDirectory } from './stargate/StargateAddressDirectory';
import { SubspaceJumpGatePanel } from './stargate/SubspaceJumpGatePanel';
import { SupergateCrystalsPanel } from './stargate/SupergateCrystalsPanel';
import { StargateNpcRacesView } from './StargateNpcRacesView';
import { GateTokensSystemView } from './stargate/GateTokensSystemView';

interface StargateNetworkViewProps {
  resources: PlayerResources;
  onUpdateResources: (res: Partial<PlayerResources>) => void;
  profile?: PlayerProfile;
  onUpdateProfile?: (updates: Partial<PlayerProfile>) => void;
  onNavigate?: (route: string) => void;
}

type TabType =
  | 'stargate-dhd'
  | 'address-directory'
  | 'jump-gates'
  | 'supergate-crystals'
  | 'alien-races'
  | 'gate-tokens';

export const StargateNetworkView: React.FC<StargateNetworkViewProps> = ({
  resources,
  onUpdateResources,
  profile,
  onUpdateProfile,
  onNavigate,
}) => {
  const [gates, setGates] = useState<StargateAddress[]>(STARGATE_NETWORK);
  const [selectedGateId, setSelectedGateId] = useState<string>('sg_atlantis');
  const [activeWormhole, setActiveWormhole] = useState<string | null>('sg_atlantis');
  const [irisClosed, setIrisClosed] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabType>('stargate-dhd');
  const [feedback, setFeedback] = useState<string | null>(
    'Leyroad network ready: the Moonwell Hall waystone answers from the Silverwood Reach.'
  );
  const [logs, setLogs] = useState<string[]>([
    'The Eastridge Gatehouse and Moonwell Hall waystones share a clear road.',
    'Four Crownroad relays report steady resonance.',
  ]);

  const activeGate = gates.find((g) => g.id === selectedGateId) || gates[0];

  const handleLogDebrief = (message: string) => {
    setFeedback(message);
    setLogs((prev) => [message, ...prev.slice(0, 7)]);
  };

  const handleEstablishWormhole = (target: StargateAddress) => {
    setActiveWormhole(target.id);
    setSelectedGateId(target.id);
    setGates((prev) =>
      prev.map((g) =>
        g.id === target.id
          ? { ...g, status: 'connected' }
          : g.status === 'connected'
          ? { ...g, status: 'offline' }
          : g
      )
    );
    handleLogDebrief(`The Leyroad opens to ${target.name}. Its old marks hold steady.`);
  };

  const handleDisconnectWormhole = () => {
    setActiveWormhole(null);
    setGates((prev) => prev.map((g) => ({ ...g, status: 'offline' })));
    handleLogDebrief('The waystone is warded and the Leyroad is closed safely.');
  };

  const handleToggleIris = () => {
    setIrisClosed((prev) => {
      const next = !prev;
      handleLogDebrief(
        next
          ? 'The wardstone seal is set. Incoming arrows and spellfire will be turned aside.'
          : 'The wardstone seal is lifted. The road is open to travelers and sworn companies.'
      );
      return next;
    });
  };

  return (
    <div id="stargate-network-view" className="space-y-5">
      <header className="relative isolate overflow-hidden border border-[#334155] bg-[#111827] px-5 py-6 text-white shadow-sm sm:px-7 sm:py-8">
        <div className="absolute -right-10 -top-20 -z-10 h-64 w-64 rounded-full border border-[#94a3b8]/20 sm:right-12 sm:top-1/2 sm:-translate-y-1/2">
          <div className="absolute inset-5 rounded-full border border-[#94a3b8]/20" />
          <div className="absolute inset-12 rounded-full border border-[#94a3b8]/20" />
          <div className="absolute inset-[4.5rem] rounded-full bg-emerald-400/10" />
        </div>
        <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="mb-3 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-300">
              <Disc size={14} />
              <span>Network console // Leyroad control</span>
            </div>
            <h2 className="font-mono text-2xl font-semibold tracking-tight sm:text-3xl">
              Waystone & Realm-spanning Jump Gates
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300">
              Read the old road-marks, kindle a safe passage between realms, and guide your company through the veil.
            </p>
            <div className="mt-5 inline-flex max-w-full items-center gap-2 border border-white/15 bg-black/15 px-3 py-2 text-xs font-semibold">
              <span className={`h-2 w-2 shrink-0 rounded-full ${activeWormhole ? 'animate-pulse bg-emerald-300' : 'bg-slate-500'}`} />
              <span className="shrink-0 font-mono text-emerald-200">{activeWormhole ? 'LEYROAD_OPEN' : 'WAYSTONE_IDLE'}</span>
              <span className="text-white/40">/</span>
              <span className="truncate font-mono text-slate-300">{activeGate.name}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:min-w-[19rem]">
            <div className="border border-slate-700 bg-slate-800/70 p-3">
              <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-slate-400">Leyroad status</span>
              <div className="mt-1 flex items-center gap-2">
                <Radio size={14} className={activeWormhole ? 'text-emerald-300' : 'text-slate-500'} />
                <strong className="font-mono text-sm font-semibold">{activeWormhole ? 'OPEN' : 'CLOSED'}</strong>
              </div>
            </div>
            <div className="border border-slate-700 bg-slate-800/70 p-3">
              <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-slate-400">Ward status</span>
              <div className="mt-1 flex items-center gap-2">
                <Shield size={14} className={irisClosed ? 'text-amber-300' : 'text-emerald-300'} />
                <strong className="font-mono text-sm font-semibold">{irisClosed ? 'SEALED' : 'LIFTED'}</strong>
              </div>
            </div>
            <div className="col-span-2 flex items-center justify-between border border-slate-700 bg-slate-800/70 px-3 py-2">
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-slate-400">Known waystones</span>
              <strong className="font-mono text-sm text-emerald-300">{gates.length.toString().padStart(2, '0')}</strong>
            </div>
          </div>
        </div>
      </header>

      {/* Live Feedback & Alert Notification */}
      {feedback && (
        <div
          id="stargate-feedback-banner"
          role="status"
          aria-live="polite"
          className="flex items-center justify-between gap-3 border border-[#cfdbc9] border-l-4 border-l-[#55704e] bg-[#f3f6ef] p-3.5 text-xs font-semibold text-[#304331] shadow-sm"
        >
          <div className="flex items-center gap-2">
            <Radio size={14} className="shrink-0 animate-pulse text-[#55704e]" />
            <span>{feedback}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            aria-label="Dismiss network notice"
            className="ml-3 cursor-pointer p-1 text-[#71806d] hover:text-[#243b2d]"
          >
            ×
          </button>
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <nav aria-label="Waystone network sections" className="flex gap-2 overflow-x-auto border-b border-[#d9dfd5] pb-3">
        {[
          {
            id: 'stargate-dhd',
            label: 'Waystone',
            icon: Disc,
          },
          {
            id: 'address-directory',
            label: 'Realm directory',
            icon: Compass,
          },
          {
            id: 'jump-gates',
            label: 'Paired roads',
            icon: Rocket,
          },
          {
            id: 'supergate-crystals',
            label: 'Crownstones',
            icon: Atom,
          },
          {
            id: 'alien-races',
            label: 'Peoples',
            icon: Globe,
          },
          {
            id: 'gate-tokens',
            label: 'Road charms',
            icon: Sparkles,
          },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              type="button"
              aria-current={isActive ? 'page' : undefined}
              onClick={() => {
                sound.play('click');
                setActiveTab(tab.id as TabType);
              }}
              className={`flex shrink-0 cursor-pointer items-center gap-2 border px-3.5 py-2 text-xs font-bold transition-all ${
                isActive
                  ? 'border-[#294333] bg-[#294333] text-white shadow-sm'
                  : 'border-[#e0e5dc] bg-white text-[#536252] hover:border-[#8d9d85] hover:bg-[#f6f8f3] hover:text-[#294333]'
              }`}
            >
              <Icon size={14} className={isActive ? 'text-[#dfc47c]' : 'text-[#7d8d77]'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Tab 1: Waystone dialer */}
      {activeTab === 'stargate-dhd' && (
        <StargateDialerPanel
          activeGate={activeGate}
          activeWormhole={activeWormhole}
          irisClosed={irisClosed}
          onToggleIris={handleToggleIris}
          onEstablishWormhole={handleEstablishWormhole}
          onDisconnectWormhole={handleDisconnectWormhole}
          resources={resources}
        />
      )}

      {/* Tab 2: Waystone directory and expedition orders */}
      {activeTab === 'address-directory' && (
        <StargateAddressDirectory
          gates={gates}
          selectedGateId={selectedGateId}
          onSelectGate={(gate) => {
            setSelectedGateId(gate.id);
            setActiveTab('stargate-dhd');
          }}
          activeWormhole={activeWormhole}
          resources={resources}
          onUpdateResources={onUpdateResources}
          onLogDebrief={handleLogDebrief}
          onIncrementStargateCount={() => {
            // increment career stats if applicable
            if (profile && onUpdateProfile) {
              onUpdateProfile({});
            }
          }}
        />
      )}

      {/* Tab 3: Subspace Jump Gate Network (Fleet Relays) */}
      {activeTab === 'jump-gates' && (
        <SubspaceJumpGatePanel
          resources={resources}
          onUpdateResources={onUpdateResources}
          onLogDebrief={handleLogDebrief}
        />
      )}

      {/* Tab 4: Crownstones and relic bindings */}
      {activeTab === 'supergate-crystals' && (
        <SupergateCrystalsPanel
          resources={resources}
          onUpdateResources={onUpdateResources}
          onLogDebrief={handleLogDebrief}
        />
      )}

      {/* Tab 5: Peoples and powers of Eldoria */}
      {activeTab === 'alien-races' && (
        <StargateNpcRacesView
          playerProfile={profile || {
            id: 'p1',
            username: 'Commander',
            displayName: 'Champion',
            race: 'tauri',
            governmentId: 'sgc_treaty',
            rankName: 'Major General',
            rankLevel: 5,
            glory: 1000,
            reputation: 1000,
            defconLevel: 2,
            vacationUntil: null,
            ascended: false,
            lastTurnAt: new Date().toISOString(),
          }}
          resources={resources}
          onNavigate={onNavigate}
        />
      )}

      {/* Tab 6: Road charms and trials */}
      {activeTab === 'gate-tokens' && (
        <GateTokensSystemView
          resources={resources}
          onUpdateResources={onUpdateResources}
          profile={profile}
          onUpdateProfile={onUpdateProfile}
          onNavigate={onNavigate}
        />
      )}

      {/* Bottom Subspace Telemetry Transit Logs */}
      <div className="space-y-3 border border-[#d9dfd5] bg-white p-4 sm:p-5">
        <div className="flex items-center justify-between border-b border-[#e8ece5] pb-3">
          <div className="flex items-center gap-2">
            <History size={15} className="text-[#587253]" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#304331]">
              Leyroad journal
            </h4>
          </div>
          <span className="text-[10px] text-[#71806d]">Recent crossings & signals</span>
        </div>

        <div className="space-y-2 text-xs text-[#536252]">
          {logs.map((log, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#a98543]" />
              <span>{log}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
