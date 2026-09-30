import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  Shield,
  Layers,
  Radio,
  CheckCircle2,
  Atom,
  Flame,
  Award,
} from 'lucide-react';
import { sound } from '../../../sound';
import {
  SupergateSingularity,
  INITIAL_SUPERGATE,
  AncientControlCrystal,
  ANCIENT_CRYSTALS,
} from '../../../stargateData';
import { PlayerResources } from '../../../types';

interface SupergateCrystalsPanelProps {
  resources: PlayerResources;
  onUpdateResources: (res: Partial<PlayerResources>) => void;
  onLogDebrief: (log: string) => void;
}

export const SupergateCrystalsPanel: React.FC<SupergateCrystalsPanelProps> = ({
  resources,
  onUpdateResources,
  onLogDebrief,
}) => {
  const [supergate, setSupergate] = useState<SupergateSingularity>(INITIAL_SUPERGATE);
  const [crystals, setCrystals] = useState<AncientControlCrystal[]>(ANCIENT_CRYSTALS);
  const [isHarvesting, setIsHarvesting] = useState<boolean>(false);

  const handleHarvestDarkMatter = () => {
    setIsHarvesting(true);
    sound.play('confirm');

    setTimeout(() => {
      setIsHarvesting(false);
      const dmGained = supergate.darkMatterHarvestRate * 4;
      onUpdateResources({
        darkMatter: (resources.darkMatter ?? 0) + dmGained,
      });
      sound.play('success');
      onLogDebrief(
        `The Crownstone released ${dmGained} Relic Dust from the old roads.`
      );
    }, 1200);
  };

  const handleToggleCrystal = (crystalId: string) => {
    sound.play('click');
    setCrystals((prev) =>
      prev.map((c) => {
        if (c.id === crystalId) {
          const nextState = !c.installed;
          onLogDebrief(
            nextState
              ? `Bound [${c.name}] into the greatwork: ${c.effect}`
              : `Unbound [${c.name}]. Its blessing has faded.`
          );
          return { ...c, installed: nextState };
        }
        return c;
      })
    );
  };

  return (
    <div id="supergate-crystals-panel" className="space-y-6">
      {/* Crownstone greatwork */}
      <div className="bg-[#0b101b] border border-[#1e293b] p-6 text-white space-y-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10 border-b border-[#1e293b] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-ping" />
              <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest font-bold">
                CROWNSTONE OF FIRST LIGHT · GREATWORK
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mt-1">{supergate.name}</h3>
            <p className="text-xs text-[#94a3b8] mt-0.5 leading-relaxed max-w-2xl font-mono">
              Ninety oath-marked stones anchor a shared road between distant realms. The greatwork draws on an old ember and opens only for a prepared company.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="p-3 bg-[#0f172a] border border-[#334155] text-right">
              <span className="text-[9px] text-[#94a3b8] uppercase block font-bold">Waystones Joined</span>
              <strong className="text-base text-white">{supergate.segmentsAssembled}/90 Stones</strong>
            </div>
            <div className="p-3 bg-[#0f172a] border border-[#334155] text-right">
              <span className="text-[9px] text-[#94a3b8] uppercase block font-bold">Hearthfire Reserve</span>
              <strong className="text-base text-purple-400">{supergate.microSingularityMass} Embers</strong>
            </div>
          </div>
        </div>

        {/* Crownstone resonance and relic dust */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
          <div className="md:col-span-8 bg-[#0f172a] border border-[#1e293b] p-4 space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center text-[#94a3b8]">
              <span>Crownstone Oathward</span>
              <span className="text-emerald-400 font-bold">STEADY (99.8%)</span>
            </div>
            <div className="w-full h-2.5 bg-[#1e293b] overflow-hidden">
              <div className="w-[99.8%] h-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2 text-[11px]">
              <div>
                <span className="text-[9px] text-[#64748b] uppercase block">Aether Flow</span>
                <span className="text-white font-bold">14.8 / turn</span>
              </div>
              <div>
                <span className="text-[9px] text-[#64748b] uppercase block">Road Resonance</span>
                <span className="text-purple-300 font-bold">94.2%</span>
              </div>
              <div>
                <span className="text-[9px] text-[#64748b] uppercase block">Cross-Realm Reach</span>
                <span className="text-sky-300 font-bold">Eastridge ↔ Silverwood ↔ Deepdelve</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col justify-center space-y-2">
            <button
              type="button"
              id="harvest-dark-matter-btn"
              disabled={isHarvesting}
              onClick={handleHarvestDarkMatter}
              className="w-full py-3 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs uppercase tracking-wider font-mono transition-colors disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 border border-purple-600 shadow-md"
            >
              <Atom size={15} />
              <span>{isHarvesting ? 'Gathering Relic Dust...' : 'Gather Relic Dust'}</span>
            </button>
            <span className="text-[10px] text-[#94a3b8] font-mono text-center block">
              Yield: +{supergate.darkMatterHarvestRate * 4} Relic Dust per rite
            </span>
          </div>
        </div>
      </div>

      {/* Relic bindings */}
      <div className="bg-white border border-[#dedede] p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#eeeeee] pb-3">
          <div>
            <h4 className="text-sm font-bold text-[#111111] uppercase tracking-wider font-mono">
              Relic Binding Circle
            </h4>
            <span className="text-xs text-[#777777]">
              Bind rare stones into Caller Stones and paired waystones to strengthen their shared roads.
            </span>
          </div>
          <span className="text-xs font-mono text-[#555555]">
            Active Sockets: <strong>{crystals.filter((c) => c.installed).length}/{crystals.length}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {crystals.map((crystal) => {
            return (
              <div
                key={crystal.id}
                id={`crystal-card-${crystal.id}`}
                className={`p-4 border transition-all flex flex-col justify-between space-y-3 ${
                  crystal.installed
                    ? 'bg-[#111111] text-white border-[#111111]'
                    : 'bg-[#fafafa] text-[#333333] border-[#dedede]'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <Sparkles
                          size={14}
                          className={crystal.installed ? 'text-amber-400' : 'text-[#777777]'}
                        />
                        <strong className="text-xs font-bold font-mono">{crystal.name}</strong>
                      </div>
                      <span
                        className={`text-[10px] font-mono block mt-0.5 ${
                          crystal.installed ? 'text-neutral-300' : 'text-[#777777]'
                        }`}
                      >
                        Rarity: {crystal.rarity} · Socket: {crystal.socket.toUpperCase()}
                      </span>
                    </div>

                    <span
                      className={`px-2 py-0.5 text-[9px] font-bold uppercase font-mono border ${
                        crystal.installed
                          ? 'bg-amber-500/20 text-amber-300 border-amber-400'
                          : 'bg-white text-[#777777] border-[#dedede]'
                      }`}
                    >
                      {crystal.boostValue}
                    </span>
                  </div>

                  <p
                    className={`text-xs mt-2 leading-relaxed ${
                      crystal.installed ? 'text-neutral-300' : 'text-[#666666]'
                    }`}
                  >
                    {crystal.effect}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#333333]/20 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold">
                        Status: {crystal.installed ? 'BOUND & ACTIVE' : 'UNBOUND'}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleToggleCrystal(crystal.id)}
                    className={`px-3 py-1 text-[10px] font-bold uppercase font-mono border cursor-pointer transition-colors ${
                      crystal.installed
                        ? 'bg-rose-600 text-white border-rose-500 hover:bg-rose-700'
                        : 'bg-[#111111] text-white border-[#111111] hover:bg-[#333333]'
                    }`}
                  >
                    {crystal.installed ? 'Unbind Relic' : 'Bind Relic'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recovered Eldorian relics */}
      <div className="bg-white border border-[#dedede] p-6 space-y-3">
        <div className="border-b border-[#eeeeee] pb-2">
          <h4 className="text-sm font-bold text-[#111111] uppercase tracking-wider font-mono">
            Recovered Relics of the Old Roads
          </h4>
          <span className="text-xs text-[#777777]">
            Finds recorded by wardens, delvers, and lantern cartographers in the far marches.
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              title: 'Seven-Bell Oath Shard',
              origin: 'Nine Bells Oathbarrow',
              effect: 'Lets paired waystones answer one another across a wider march.',
            },
            {
              title: 'Moon-Glass Waykeeper Chart',
              origin: 'Silverwood Underhall',
              effect: 'Maps a safe path through the oldest groves and their living wards.',
            },
            {
              title: 'Lantern Warden’s Road Ledger',
              origin: 'The Endless Barrow Road',
              effect: 'Records the names of travelers who found their way home from the far marches.',
            },
          ].map((item, idx) => (
            <div key={idx} className="p-3 bg-[#fafafa] border border-[#dedede] space-y-1">
              <span className="text-[10px] font-bold text-amber-700 uppercase block font-mono">
                {item.origin}
              </span>
              <strong className="text-xs text-[#111111] block font-mono">{item.title}</strong>
              <p className="text-[11px] text-[#666666] leading-relaxed">{item.effect}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
