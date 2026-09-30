import React, { useMemo, useState } from 'react';
import { Crown, Globe2, Landmark, Shield, Sparkles, Swords, Users } from 'lucide-react';
import type { PlanetColony, PlayerProfile, PlayerResources } from '../../types';
import { GOVERNMENTS, RACES } from '../../gameData';
import { sound } from '../../sound';

type DossierTab = 'character' | 'empire' | 'kingdoms' | 'systems';

interface RealmDossierViewProps {
  profile: PlayerProfile;
  resources: PlayerResources;
  planets: PlanetColony[];
  onNavigate: (route: string) => void;
}

const formatNumber = (value: number) => value.toLocaleString();

export const RealmDossierView: React.FC<RealmDossierViewProps> = ({ profile, resources, planets, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<DossierTab>('character');
  const currentRace = RACES.find((race) => race.id === profile.race) || RACES[0];
  const currentGovernment = GOVERNMENTS.find((government) => government.id === profile.governmentId) || GOVERNMENTS[0];
  const [selectedKingdomId, setSelectedKingdomId] = useState(currentRace.id);
  const selectedKingdom = RACES.find((race) => race.id === selectedKingdomId) || currentRace;
  const empirePower = resources.attackUnits * 5 + resources.defenseUnits * 4 + resources.superUnits * 25;
  const totalPopulation = resources.totalPopulation || planets.reduce((sum, planet) => sum + (planet.population?.total || 0), 0);
  const activeHoldings = planets.filter((planet) => planet.isHomeworld || planet.level > 0).length;
  const activeSystems = useMemo(() => [
    { name: 'Crownworks Network', route: 'factories', status: 'Operational', detail: 'Mines, forges, and leyline industry' },
    { name: 'Royal Warforge', route: 'shipyard', status: 'Mustered', detail: 'Ships, formations, and fleet construction' },
    { name: 'Lore Scriptorium', route: 'tech-library', status: 'Studying', detail: 'Research, prerequisites, and archive progress' },
    { name: 'Waystone Network', route: 'stargate-network', status: 'Linked', detail: 'Gate relays, travel, and far-march access' },
    { name: 'Workforce Academy', route: 'workforce-academy', status: 'Training', detail: 'Ninety specialized roles and promotion cadres' },
    { name: 'Realm Defense Grid', route: 'defenses', status: `DefCon ${profile.defconLevel}`, detail: 'Holding wards, weapons, and border security' },
  ], [profile.defconLevel]);

  return (
    <main id="realm-dossier-view" className="space-y-5 text-[#26313a]">
      <header className="border border-[#cfd7d2] border-t-4 border-t-[#526b4c] bg-white p-5 shadow-[0_5px_18px_rgba(38,49,58,0.06)] sm:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#66755d]"><Globe2 size={14} /> ELDORIA · REALM DOSSIER</span>
            <h1 className="mt-1 font-serif text-2xl font-bold text-[#26352f] sm:text-3xl">Character, Empire & Kingdoms</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#69746d]">A living record of the sovereign, the Crown Marches, the kingdom traditions, and the systems that keep the realm in motion.</p>
          </div>
          <div className="grid grid-cols-3 border-t border-[#e1e5df] pt-3 text-center font-mono text-[10px] uppercase lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
            <div className="px-3"><strong className="block text-xl text-[#526b4c]">{profile.rankLevel}</strong>Rank</div>
            <div className="border-x border-[#e1e5df] px-3"><strong className="block text-xl text-[#a8752b]">{activeHoldings}</strong>Holdings</div>
            <div className="px-3"><strong className="block text-xl text-[#a14f45]">{formatNumber(empirePower)}</strong>Power</div>
          </div>
        </div>
      </header>

      <nav className="flex flex-wrap gap-2 border-b border-[#d8ded9] pb-2" role="tablist" aria-label="Realm dossier sections">
        {(['character', 'empire', 'kingdoms', 'systems'] as DossierTab[]).map((tab) => (
          <button key={tab} type="button" role="tab" aria-selected={activeTab === tab} onClick={() => { setActiveTab(tab); sound.play('click'); }} className={`border px-3 py-2 text-[10px] font-bold uppercase tracking-wide ${activeTab === tab ? 'border-[#526b4c] bg-[#526b4c] text-white' : 'border-[#d8ded9] bg-white text-[#687681] hover:border-[#9aaa9d]'}`}>
            {tab === 'character' ? 'Character Record' : tab === 'empire' ? 'Empire Ledger' : tab === 'kingdoms' ? 'Kingdom Registry' : 'Systems Directory'}
          </button>
        ))}
      </nav>

      {activeTab === 'character' && (
        <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.8fr)]">
          <article className="border border-[#d8ded9] bg-white p-5">
            <div className="flex items-start gap-4 border-b border-[#e5e9e4] pb-4"><div className="flex h-16 w-16 items-center justify-center border border-[#e1d2b6] bg-[#fff8ed] text-3xl">{profile.avatarUrl ? <img src={profile.avatarUrl} alt="" className="h-full w-full object-cover" /> : '👑'}</div><div><span className="text-[10px] font-bold uppercase tracking-wider text-[#a8752b]">Sovereign character record</span><h2 className="mt-1 font-serif text-2xl font-bold">{profile.displayName || profile.username}</h2><p className="text-xs text-[#687681]">{profile.leaderTitle || profile.rankName} · {profile.empireName || 'The Crown Marches'}</p></div></div>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2"><div className="border border-[#e5e9e4] bg-[#f7f9f6] p-3"><dt className="text-[9px] uppercase text-[#687681]">Origin kingdom</dt><dd className="mt-1 font-semibold">{currentRace.name}</dd></div><div className="border border-[#e5e9e4] bg-[#f7f9f6] p-3"><dt className="text-[9px] uppercase text-[#687681]">Capital holding</dt><dd className="mt-1 font-semibold">{profile.capitalName || profile.planetName || planets.find((planet) => planet.isHomeworld)?.name || 'Unrecorded'}</dd></div><div className="border border-[#e5e9e4] bg-[#f7f9f6] p-3"><dt className="text-[9px] uppercase text-[#687681]">Government</dt><dd className="mt-1 font-semibold">{currentGovernment.name}</dd></div><div className="border border-[#e5e9e4] bg-[#f7f9f6] p-3"><dt className="text-[9px] uppercase text-[#687681]">Reputation / glory</dt><dd className="mt-1 font-mono font-semibold">{formatNumber(profile.reputation)} / {formatNumber(profile.glory)}</dd></div></dl>
          </article>
          <aside className="space-y-3 border border-[#d8ded9] bg-[#f7f9f6] p-5"><span className="text-[10px] font-bold uppercase tracking-wider text-[#66755d]">Character capabilities</span><div className="space-y-2 text-xs"><div className="flex justify-between border-b border-[#d8ded9] pb-2"><span>Race doctrine</span><strong>{currentRace.bonusLabel}</strong></div><div className="flex justify-between border-b border-[#d8ded9] pb-2"><span>Rank</span><strong>{profile.rankName} {profile.rankLevel}</strong></div><div className="flex justify-between border-b border-[#d8ded9] pb-2"><span>DefCon</span><strong>Level {profile.defconLevel}</strong></div><div className="flex justify-between"><span>Ascended</span><strong>{profile.ascended ? 'Yes' : 'No'}</strong></div></div><button type="button" onClick={() => onNavigate('player-profile')} className="mt-2 w-full border border-[#526b4c] bg-white px-3 py-2 text-[10px] font-bold uppercase text-[#526b4c]">Open full profile</button></aside>
        </section>
      )}

      {activeTab === 'empire' && (
        <section className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)]"><article className="border border-[#d8ded9] bg-white p-5"><div className="flex items-center gap-3 border-b border-[#e5e9e4] pb-3"><Crown className="text-[#a8752b]" /><div><span className="text-[10px] uppercase tracking-wider text-[#687681]">Empire ledger</span><h2 className="font-serif text-xl font-bold">{profile.empireName || 'The Crown Marches'}</h2></div></div><div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">{[['Crowns', resources.naquadah], ['Iron', resources.metal], ['Moonstone', resources.crystal], ['Aether', resources.energy]].map(([label, value]) => <div key={label} className="border border-[#e5e9e4] bg-[#f7f9f6] p-3"><span className="block text-[9px] uppercase text-[#687681]">{label}</span><strong className="mt-1 block font-mono text-lg">{formatNumber(Number(value))}</strong></div>)}</div></article><aside className="space-y-3 border border-[#d8ded9] bg-[#f7f9f6] p-5"><span className="text-[10px] font-bold uppercase tracking-wider text-[#66755d]">Empire composition</span><div className="space-y-2 text-xs"><div className="flex justify-between"><span>Population</span><strong>{formatNumber(totalPopulation)}</strong></div><div className="flex justify-between"><span>Active holdings</span><strong>{activeHoldings}</strong></div><div className="flex justify-between"><span>Attack units</span><strong>{formatNumber(resources.attackUnits)}</strong></div><div className="flex justify-between"><span>Defense units</span><strong>{formatNumber(resources.defenseUnits)}</strong></div><div className="flex justify-between"><span>Super units</span><strong>{formatNumber(resources.superUnits)}</strong></div></div></aside></section>
      )}

      {activeTab === 'kingdoms' && <section className="grid gap-3 md:grid-cols-2">{RACES.map((race) => <button key={race.id} type="button" onClick={() => { setSelectedKingdomId(race.id); sound.play('click'); }} className={`border p-4 text-left ${selectedKingdomId === race.id ? 'border-[#526b4c] bg-[#f1f6ef]' : 'border-[#d8ded9] bg-white hover:border-[#9aaa9d]'}`}><div className="flex items-start justify-between gap-3"><div><span className="text-[10px] font-bold uppercase tracking-wider text-[#687681]">{race.id} · kingdom dossier</span><h2 className="mt-1 font-serif text-xl font-bold">{race.name}</h2></div><Shield size={20} className="text-[#526b4c]" /></div><p className="mt-2 text-xs leading-relaxed text-[#687681]">{race.description}</p><div className="mt-3 grid grid-cols-2 gap-2 font-mono text-[10px]"><span>Attack ×{race.attackModifier.toFixed(2)}</span><span>Defense ×{race.defenseModifier.toFixed(2)}</span><span>Income ×{race.incomeModifier.toFixed(2)}</span><span>Covert ×{race.covertModifier.toFixed(2)}</span></div><strong className="mt-3 block text-[10px] uppercase text-[#a8752b]">{race.bonusLabel}</strong></button>)}</section>}

      {activeTab === 'systems' && <section className="grid gap-3 md:grid-cols-2">{activeSystems.map((system) => <button key={system.name} type="button" onClick={() => { onNavigate(system.route); sound.play('click'); }} className="flex items-start gap-3 border border-[#d8ded9] bg-white p-4 text-left hover:border-[#526b4c]"><span className="flex h-9 w-9 items-center justify-center border border-[#e1d2b6] bg-[#fff8ed] text-[#a8752b]"><Landmark size={17} /></span><span><span className="text-[9px] font-bold uppercase tracking-wider text-[#27734a]">{system.status}</span><strong className="mt-1 block font-serif text-lg">{system.name}</strong><span className="mt-1 block text-xs text-[#687681]">{system.detail}</span></span></button>)}</section>}
    </main>
  );
};
