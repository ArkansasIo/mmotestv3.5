import React, { useState, useEffect } from 'react';
import { X, Sparkles, ShieldCheck, Info, Award, CheckCircle2, ScrollText } from 'lucide-react';
import { sound } from '../../sound';

interface PatchNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'update' | 'patch';
  onOpenCredits?: () => void;
}

export const PatchNotesModal: React.FC<PatchNotesModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'patch',
  onOpenCredits,
}) => {
  const [activeTab, setActiveTab] = useState<'update' | 'patch'>(initialTab);

  useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4" id="patch-notes-modal">
      <div className="bg-white border border-[#dedede] w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl font-mono">
        {/* Header */}
        <div className="p-4 border-b border-[#dedede] flex items-center justify-between bg-[#fafafa]">
          <div className="flex items-center gap-2.5">
            <span className="p-1 bg-[#111111] text-amber-400">
              <Sparkles size={16} />
            </span>
            <div>
              <h2 className="text-sm font-black text-[#111111] uppercase tracking-wider">
                Eldoria · Realm Ledger
              </h2>
              <p className="text-[10px] text-[#777777]">
                Age of Embers · Browser Prototype · Unreleased
              </p>
            </div>
          </div>
          <button
            onClick={() => { sound.play('click'); onClose(); }}
            className="p-1 hover:bg-[#eee] cursor-pointer text-[#666]"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#dedede] bg-neutral-100 px-4 pt-2 gap-2 text-xs">
          <button
            type="button"
            onClick={() => {
              sound.play('click');
              setActiveTab('update');
            }}
            className={`px-4 py-2 font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer border-b-2 transition-colors ${
              activeTab === 'update'
                ? 'border-[#111111] text-[#111111] bg-white'
                : 'border-transparent text-[#666666] hover:text-[#111111]'
            }`}
          >
            <Info size={13} className="text-cyan-600" />
            <span>Realm Update</span>
            <span className="text-[9px] bg-cyan-100 text-cyan-900 px-1 py-0.2 font-bold">Current</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.play('click');
              setActiveTab('patch');
            }}
            className={`px-4 py-2 font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer border-b-2 transition-colors ${
              activeTab === 'patch'
                ? 'border-[#111111] text-[#111111] bg-white'
                : 'border-transparent text-[#666666] hover:text-[#111111]'
            }`}
          >
            <Sparkles size={13} className="text-amber-500" />
            <span>Patch Chronicle</span>
            <span className="text-[9px] bg-amber-100 text-amber-900 px-1 py-0.2 font-bold">Unreleased</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-[#444] leading-relaxed">
          {activeTab === 'update' ? (
            <div className="space-y-4">
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1">
                <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
                  <ShieldCheck size={16} className="text-emerald-700 shrink-0" />
                  <span>The Age of Embers is taking shape</span>
                </div>
                <p className="text-[11px] text-emerald-800">
                  Eldoria: Realms at War is an active browser-based fantasy strategy prototype. The entries below describe the current client, not a finished or server-authoritative MMO.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-neutral-50 border border-[#dedede] space-y-1">
                  <span className="text-[10px] text-[#777777] uppercase font-bold block">Chronicle</span>
                  <div className="text-sm font-black text-[#111111]">Unreleased</div>
                  <span className="text-[10px] text-[#555555]">Age of Embers · Browser edition</span>
                </div>

                <div className="p-3 bg-neutral-50 border border-[#dedede] space-y-1">
                  <span className="text-[10px] text-[#777777] uppercase font-bold block">The Scriptorium</span>
                  <div className="text-sm font-black text-[#111111]">React · TypeScript · Vite</div>
                  <span className="text-[10px] text-[#555555]">Browser-based client application</span>
                </div>

                <div className="p-3 bg-neutral-50 border border-[#dedede] space-y-1">
                  <span className="text-[10px] text-[#777777] uppercase font-bold block">The Setting</span>
                  <div className="text-sm font-black text-[#111111]">Crowns · Holdings · Marches</div>
                  <span className="text-[10px] text-[#555555]">A realm rebuilding through the Age of Embers</span>
                </div>

                <div className="p-3 bg-neutral-50 border border-[#dedede] space-y-1">
                  <span className="text-[10px] text-[#777777] uppercase font-bold block">Save & Sync</span>
                  <div className="text-sm font-black text-[#111111]">Browser-led state</div>
                  <span className="text-[10px] text-[#555555]">Most game state is local; cloud sync is limited</span>
                </div>
              </div>

              <div className="border border-[#dedede] p-4 bg-white space-y-2.5">
                <h3 className="text-xs font-bold uppercase text-[#111111] flex items-center gap-1.5">
                  <ScrollText size={14} className="text-amber-700" />
                  <span>What the realm holds</span>
                </h3>
                <ul className="space-y-1.5 text-[11px] text-[#555555]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>Choose a people and crown, then manage holdings, resources, production, and research.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>Explore realms through expeditions, waystones, relics, and regional records.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>Consult the Arcane Codex and the 90-entry Marches Bestiary.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>Plan expedition routes with OGame 0.84-inspired distance, travel-time, and fuel calculations.</span>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 shrink-0 text-amber-600" />
                <span>Unreleased · Recent work in the realm</span>
              </div>

              <div>
                <h3 className="text-xs font-bold text-[#111111] uppercase tracking-wider mb-2.5">
                  Additions & refinements
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-[11px]">
                  <li><strong>Magic & Spellcraft:</strong> Fifteen schools, thirty-five classes, one hundred subclasses, and one hundred ten spells, with a player Grimoire, Crown market, Aether casting, and practice circle.</li>
                  <li><strong>The Marches Bestiary:</strong> Ninety named creatures across nine classes, with ranks, titles, habitats, abilities, weaknesses, and field notes.</li>
                  <li><strong>Mine Vein Ledger:</strong> Nine classified ores now have shared resource balances and feed profession recipes.</li>
                  <li><strong>Expedition flight planning:</strong> Coordinate distance, one-way travel time, and deuterium previews use the documented OGame 0.84 formulas. Dispatch spends fuel and returns ships after the local mission timer.</li>
                  <li><strong>Realm documentation:</strong> World lore and implementation boundaries now distinguish field dossiers from live encounters and browser saves from server-authoritative play.</li>
                </ul>
              </div>

              <div className="border-t border-[#dedede] pt-4 text-[11px] text-[#555555]">
                <h3 className="mb-1 text-xs font-bold uppercase text-[#111111]">Known boundaries</h3>
                <p>Expedition encounters still use Eldoria’s local simulated outcomes. General OGame fleet missions, the six-round combat engine, and authoritative multiplayer are not yet implemented.</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Cross-Links */}
        <div className="p-3.5 border-t border-[#dedede] bg-[#fafafa] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            {onOpenCredits && (
              <button
                type="button"
                onClick={() => {
                  sound.play('click');
                  onClose();
                  onOpenCredits();
                }}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Award size={13} />
                <span>Keepers of the Realm</span>
              </button>
            )}
          </div>

          <button
            onClick={() => { sound.play('confirm'); onClose(); }}
            className="px-5 py-2 bg-[#111111] text-white font-bold uppercase tracking-wider hover:bg-[#333] cursor-pointer"
          >
            Return to the Realm
          </button>
        </div>
      </div>
    </div>
  );
};
