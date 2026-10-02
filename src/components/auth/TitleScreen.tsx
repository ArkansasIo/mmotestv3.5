import React, { useState } from 'react';
import {
  Shield,
  Sparkles,
  Swords,
  Globe,
  User,
  Lock,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Crown,
  Building2,
  Compass,
  Mail,
  Sliders,
  Zap,
  Info,
  ChevronRight,
  ShieldAlert,
  BarChart3,
  Rocket,
  Award,
  Terminal,
  Link,
} from 'lucide-react';
import { sound } from '../../sound';
import { PlayerProfile, RaceId } from '../../types';
import { RACES, GOVERNMENTS } from '../../gameData';
import { DevelopmentCreditsView } from '../views/DevelopmentCreditsView';
import { PatchNotesModal } from '../modals/PatchNotesModal';

interface TitleScreenProps {
  profile: PlayerProfile;
  onLogin: (username: string, race: string) => void;
  onRegister: (
    username: string,
    race: string,
    gov: string,
    details?: {
      empireName?: string;
      capitalName?: string;
      leaderTitle?: string;
      originSector?: string;
      email?: string;
    }
  ) => void;
  onQuickStart: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  profile,
  onLogin,
  onRegister,
  onQuickStart,
}) => {
  const [authMode, setAuthMode] = useState<'splash' | 'login' | 'register' | 'servers'>('splash');
  const [regStep, setRegStep] = useState<1 | 2 | 3 | 4>(1);
  const [showCreditsModal, setShowCreditsModal] = useState<boolean>(false);
  const [showPatchModal, setShowPatchModal] = useState<boolean>(false);
  const [patchModalTab, setPatchModalTab] = useState<'update' | 'patch'>('patch');

  // Login Form States
  const [usernameInput, setUsernameInput] = useState<string>(profile.username || 'Aria_Vale');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [selectedServer, setSelectedServer] = useState<string>('Elderglen (Crownlands) - 12ms');

  // Detailed Registration Form States
  const [regUsername, setRegUsername] = useState<string>('Aria_Vale');
  const [regEmail, setRegEmail] = useState<string>('aria@valewyn.realm');
  const [regPassword, setRegPassword] = useState<string>('');
  const [regEmpireName, setRegEmpireName] = useState<string>('The Crownlands of Valewyn');
  const [regCapitalName, setRegCapitalName] = useState<string>('Valewyn Crownlands');
  const [regLeaderTitle, setRegLeaderTitle] = useState<string>('Realm Warden');
  const [regOriginSector, setRegOriginSector] = useState<string>('Elderglen: Crownlands March (01:104:04)');
  const [selectedRace, setSelectedRace] = useState<RaceId>('tauri');
  const [selectedGov, setSelectedGov] = useState<string>('junta');

  // Canonical 9 Governments System
  const extendedGovernments = GOVERNMENTS;

  const currentRaceObj = RACES.find((r) => r.id === selectedRace) || RACES[0];
  const currentGovObj = extendedGovernments.find((g) => g.id === selectedGov) || extendedGovernments[0];

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.play('success');
    onLogin(usernameInput, selectedRace);
  };

  const handleRegisterFinalize = (e: React.FormEvent) => {
    e.preventDefault();
    sound.play('success');
    onRegister(regUsername, selectedRace, selectedGov, {
      empireName: regEmpireName,
      capitalName: regCapitalName,
      leaderTitle: regLeaderTitle,
      originSector: regOriginSector,
      email: regEmail,
    });
  };

  return (
    <div className="relative flex min-h-[100svh] flex-col justify-between overflow-x-hidden bg-[#111912] font-sans text-[#f3edda] selection:bg-[#d7b875] selection:text-[#172018]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_22%,rgba(95,119,76,0.22)_0%,transparent_45%),radial-gradient(ellipse_at_86%_78%,rgba(159,116,57,0.13)_0%,transparent_38%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(135deg,transparent_48%,rgba(226,208,162,0.12)_49%,transparent_50%),linear-gradient(45deg,transparent_48%,rgba(226,208,162,0.08)_49%,transparent_50%)] [background-size:36px_36px]" />

      {/* Top Navigation Bar */}
      <header className="relative z-10 flex items-center justify-between gap-4 border-b border-[#d8c69b]/20 bg-[#101610]/85 px-4 py-3 backdrop-blur-md sm:px-7 sm:py-4">
        <div className="flex items-center gap-3">
          <div className="grid size-10 shrink-0 place-items-center border border-[#c9a861]/70 bg-[#263326] text-[#e4c57e] shadow-[inset_0_0_0_3px_rgba(17,25,18,0.8)]">
            <Crown size={20} strokeWidth={1.6} />
          </div>
          <div className="min-w-0">
            <h1 className="whitespace-nowrap font-serif text-[10px] font-bold uppercase tracking-[0.11em] text-[#f2e8cb] sm:text-sm sm:tracking-[0.16em]">Eldoria: Realms at War</h1>
            <span className="hidden text-[9px] font-mono uppercase tracking-[0.13em] text-[#b8b19e] sm:block">Chronicles of the Marches · Age of Embers</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono sm:gap-3">
          <div className="hidden items-center gap-2 border border-emerald-700/70 bg-emerald-950/45 px-3 py-1.5 text-emerald-200 sm:flex">
            <span className="size-1.5 animate-pulse bg-emerald-400" />
            <span className="text-[9px] uppercase tracking-wider">Realm gates open</span>
          </div>
          <button
            type="button"
            onClick={() => {
              sound.play('click');
              setShowCreditsModal(true);
            }}
            className="flex items-center gap-1.5 border border-[#b99b5d]/40 bg-[#283226] px-2.5 py-1.5 text-[#e7d8b2] transition-colors hover:bg-[#34412e] sm:px-3"
            title="View Development Team Credits"
          >
            <Award size={13} className="text-amber-400" />
            <span className="hidden sm:inline">Realm Chroniclers</span>
            <span className="text-[9px] font-black uppercase text-[#e2c47d]">Credits</span>
          </button>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 my-4">
        <div className="w-full max-w-6xl">

          {/* 1. SPLASH / HERO MODE */}
          {authMode === 'splash' && (
            <div className="grid items-stretch gap-6 animate-fade-in lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.75fr)] lg:gap-10">
              <section className="flex flex-col justify-center py-3 sm:py-8 lg:py-12">
                <figure className="relative mb-7 aspect-[16/7] w-full overflow-hidden border border-[#c5a867]/55 bg-[#263326] shadow-[0_18px_45px_rgba(0,0,0,0.28)]">
                  <img src="/images/eldoria-crownlands.svg" alt="The Crownlands of Eldoria, with a hilltop citadel above the Marches river" className="h-full w-full object-cover object-[center_57%]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111912]/80 via-transparent to-[#111912]/5" />
                  <figcaption className="absolute bottom-3 left-3 border-l-2 border-[#dfc477] pl-2 text-[9px] font-mono uppercase tracking-[0.17em] text-[#f0dfb4] sm:bottom-4 sm:left-4">Elderglen · Crownlands March</figcaption>
                </figure>
                <div className="mb-6 inline-flex w-fit items-center gap-2 border border-[#bea260]/50 bg-[#202b20]/85 px-3 py-1.5 text-[9px] font-mono uppercase tracking-[0.18em] text-[#dfca97]">
                  <Sparkles size={13} className="text-[#e0bd6b]" />
                  <span>Age of Embers · The Crownlands await</span>
                </div>

                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#b2a477]">A living realm of oaths and old magic</p>
                <h2 className="max-w-3xl font-serif text-5xl font-semibold leading-[0.98] text-[#f4ecd7] sm:text-6xl lg:text-7xl">
                  Eldoria
                  <span className="mt-2 block text-2xl font-normal italic text-[#d3b976] sm:text-3xl">Realms at War</span>
                </h2>

                <p className="mt-6 max-w-xl text-sm leading-7 text-[#c9c7b8] sm:text-base">
                  Choose your people. Swear an oath to a crown. Then shape the Marches through warbands, wonder, and hard-won alliances.
                </p>

                <div className="mt-8 grid max-w-xl grid-cols-3 border-y border-[#d8c69b]/20 py-4 text-[9px] font-mono uppercase tracking-wider text-[#aaa58f] sm:text-[10px]">
                  <div className="pr-2"><strong className="mb-1 block font-serif text-lg text-[#e8d6a7] sm:text-xl">90+</strong>lands & keeps</div>
                  <div className="border-x border-[#d8c69b]/20 px-3"><strong className="mb-1 block font-serif text-lg text-[#e8d6a7] sm:text-xl">5 peoples</strong>nine crowns</div>
                  <div className="pl-3"><strong className="mb-1 block font-serif text-lg text-[#e8d6a7] sm:text-xl">One saga</strong>your command</div>
                </div>

                <div className="mt-7 flex flex-wrap gap-2 text-[9px] font-mono uppercase tracking-wider text-[#9da38d]">
                  <span className="border border-white/10 bg-white/[0.03] px-2.5 py-1.5">Blade & spell</span>
                  <span className="border border-white/10 bg-white/[0.03] px-2.5 py-1.5">Ancient lairs</span>
                  <span className="border border-white/10 bg-white/[0.03] px-2.5 py-1.5">A realm to rule</span>
                </div>
              </section>

              <aside className="relative flex flex-col justify-center border border-[#b99b5d]/55 bg-[#e7e0cc] p-5 text-[#1e291f] shadow-[0_24px_70px_rgba(0,0,0,0.28)] sm:p-7 lg:my-8">
                <div className="pointer-events-none absolute inset-1 border border-[#7f795f]/25" />
                <div className="relative">
                  <div className="mb-5 flex items-center justify-between border-b border-[#283528]/20 pb-4">
                    <div>
                      <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-[#68715d]">The gatehouse</span>
                      <h3 className="mt-1 font-serif text-2xl font-semibold">Enter the realm</h3>
                    </div>
                    <div className="grid size-11 place-items-center border border-[#8c7541]/50 bg-[#d8cfb5] text-[#6d5b34]"><Crown size={22} /></div>
                  </div>

                  <p className="mb-5 text-xs leading-relaxed text-[#5f6254]">Return to your holding, begin a new saga, or step inside as a wandering adventurer.</p>

                  <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => {
                    sound.play('click');
                    setAuthMode('login');
                  }}
                  className="flex w-full items-center justify-between border border-[#243124] bg-[#243124] px-4 py-3.5 text-left text-xs font-bold uppercase tracking-[0.14em] text-[#f2ead5] transition-colors hover:bg-[#344531]"
                >
                  <span>Enter your keep</span><ArrowRight size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.play('click');
                    setAuthMode('register');
                    setRegStep(1);
                  }}
                  className="flex w-full items-center justify-between border border-[#a88b50] bg-[#d8bd7b] px-4 py-3.5 text-left text-xs font-bold uppercase tracking-[0.14em] text-[#282819] transition-colors hover:bg-[#e2ca91]"
                >
                  <span>Found a new realm</span><ChevronRight size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.play('success');
                    onQuickStart();
                  }}
                  className="w-full border border-[#b5bba6] bg-[#dce2d2] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.13em] text-[#354532] transition-colors hover:bg-[#e7ebdf]"
                >
                  Continue as a wanderer
                </button>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-[#283528]/15 pt-4 text-[9px] font-mono uppercase tracking-wider text-[#77796b]">
                <span>Five peoples · Nine crowns</span>
                <button
                  type="button"
                  onClick={() => {
                    sound.play('click');
                    setShowCreditsModal(true);
                  }}
                  className="inline-flex items-center gap-1.5 text-[#75633b] transition-colors hover:text-[#263326]"
                >
                  <Award size={12} />
                  <span>Keepers’ chronicle</span>
                </button>
              </div>
              </div>
              </aside>
            </div>
          )}

          {/* 2. COMMANDER LOGIN MODE */}
          {authMode === 'login' && (
            <div className="mx-auto grid w-full max-w-5xl overflow-hidden border border-[#b99b5d]/60 bg-[#1b261d] shadow-[0_28px_90px_rgba(0,0,0,0.42)] animate-fade-in md:grid-cols-[minmax(0,1fr)_minmax(370px,0.9fr)]">
              <section className="relative hidden flex-col justify-between overflow-hidden border-r border-[#d8c69b]/15 bg-[#233126] p-8 md:flex lg:p-10">
                <img src="/images/eldoria-oath-hall.svg" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-35" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#17231d]/45 via-[#17231d]/75 to-[#17231d]/90" />
                <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(135deg,transparent_49%,rgba(226,208,162,0.12)_50%,transparent_51%)] [background-size:24px_24px]" />
                <div className="relative">
                  <span className="inline-flex items-center gap-2 text-[9px] font-mono uppercase tracking-[0.2em] text-[#c9b77f]"><Shield size={13} /> Oaths bind the Marches</span>
                  <h2 className="mt-7 font-serif text-4xl leading-tight text-[#f2ead5]">Your hall-fire<br /><em className="text-[#d2b875]">still burns.</em></h2>
                  <p className="mt-4 max-w-sm text-sm leading-6 text-[#c2c8b6]">Take up your banner again. Your people, holdings, and unfinished stories await beyond the gate.</p>
                </div>
                <div className="relative mt-10 border-t border-[#d8c69b]/20 pt-4 text-[9px] font-mono uppercase tracking-[0.15em] text-[#a9ad99]">Elderglen · Crownlands March</div>
              </section>
              <div className="space-y-6 p-5 sm:p-8">
              <figure className="relative -mx-5 -mt-5 h-28 overflow-hidden border-b border-[#c4a765]/50 md:hidden sm:-mx-8 sm:-mt-8 sm:h-36">
                <img src="/images/eldoria-oath-hall.svg" alt="The oath hall where Eldoria's banners gather beneath the rafters" className="h-full w-full object-cover object-[center_58%]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#142019]/75 via-[#142019]/20 to-transparent" />
                <figcaption className="absolute bottom-3 left-4 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#f0dfb4]">Oath Hall · Elderglen Keep</figcaption>
              </figure>
              <div className="border-b border-white/10 pb-4 flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest">GUILD GATE</span>
                  <h3 className="text-xl font-bold text-white uppercase tracking-wide">Hero Login</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setAuthMode('splash')}
                  className="text-xs font-mono text-white/60 hover:text-white cursor-pointer"
                >
                  ← Back
                </button>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-white/80 uppercase tracking-wider mb-2">
                    Hero Name / Username
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-3 text-white/40" />
                    <input
                      type="text"
                      value={usernameInput}
                      onChange={(e) => setUsernameInput(e.target.value)}
                      required
                      className="w-full bg-white/5 border border-white/20 px-10 py-2.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white"
                      placeholder="Hero Name..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-white/80 uppercase tracking-wider mb-2">
                    Passphrase
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-3 text-white/40" />
                    <input
                      type="password"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      required
                      className="w-full bg-white/5 border border-white/20 px-10 py-2.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white"
                      placeholder="••••••••••••"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-white/80 uppercase tracking-wider mb-2">
                    Choose a Realm
                  </label>
                  <select
                    value={selectedServer}
                    onChange={(e) => setSelectedServer(e.target.value)}
                    className="w-full bg-[#111111] border border-white/20 px-3 py-2.5 text-white text-xs focus:outline-none focus:border-white"
                  >
                    <option>Alpha-Prime (US-East) - 12ms</option>
                    <option>Beta-Centauri (EU-Central) - 45ms</option>
                    <option>Gamma-Orionis (Asia-Pacific) - 110ms</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="mt-2 flex w-full items-center justify-between border border-[#c3a662] bg-[#d8bd7b] px-4 py-3.5 text-left text-xs font-bold uppercase tracking-[0.14em] text-[#282819] transition-colors hover:bg-[#e2ca91]"
                >
                  <span>Enter the keep</span><ArrowRight size={16} />
                </button>
              </form>
              </div>
            </div>
          )}

          {/* 3. DETAILED EMPIRE REGISTRATION SYSTEM */}
          {authMode === 'register' && (
            <div className="space-y-6 border border-[#b99b5d]/60 bg-[#172119]/95 p-5 shadow-[0_28px_90px_rgba(0,0,0,0.42)] backdrop-blur-2xl animate-fade-in sm:p-8">
              <figure className="relative -mx-5 -mt-5 h-28 overflow-hidden border-b border-[#c4a765]/50 sm:-mx-8 sm:-mt-8 sm:h-40">
                <img src="/images/eldoria-founding-map.svg" alt="An illuminated map of Eldoria's Marches, with rivers, keeps, forests, and mountain passes" className="h-full w-full object-cover object-[center_51%]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#142019]/90 via-[#142019]/35 to-transparent" />
                <figcaption className="absolute bottom-3 left-4 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#f0dfb4] sm:bottom-4 sm:left-6">A new oath takes root in the Marches</figcaption>
              </figure>
              {/* Header */}
              <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-amber-400 text-black font-bold text-[10px] tracking-widest uppercase">
                      STEP {regStep} OF 4
                    </span>
                    <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest">
                      REALM FOUNDING & HERO REGISTRATION
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-wide mt-1">
                    {regStep === 1 && '1. Hero & Realm Dossier'}
                    {regStep === 2 && '2. People & Heritage'}
                    {regStep === 3 && '3. Crown & Council'}
                    {regStep === 4 && '4. Realm Founding Chronicle'}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (regStep > 1) setRegStep((prev) => (prev - 1) as any);
                      else setAuthMode('splash');
                    }}
                    className="px-3 py-1.5 border border-white/20 text-xs font-mono text-white/70 hover:text-white hover:border-white cursor-pointer"
                  >
                    ← {regStep === 1 ? 'Cancel' : 'Previous Step'}
                  </button>
                </div>
              </div>

              {/* Progress Steps Bar */}
              <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono border-b border-white/10 pb-4">
                {[
                  { step: 1, label: '1. Hero' },
                  { step: 2, label: '2. People' },
                  { step: 3, label: '3. Crown' },
                  { step: 4, label: '4. Chronicle' },
                ].map((s) => (
                  <button
                    key={s.step}
                    type="button"
                    onClick={() => setRegStep(s.step as any)}
                    className={`py-2 px-1 border transition-all cursor-pointer ${
                      regStep === s.step
                        ? 'bg-amber-400 text-black border-amber-400 font-bold'
                        : regStep > s.step
                        ? 'bg-white/10 text-emerald-400 border-emerald-500/30'
                        : 'bg-white/5 text-white/40 border-white/10'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* STEP 1: USER & EMPIRE PROFILE INPUTS */}
              {regStep === 1 && (
                <div className="space-y-5 text-xs animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-white/80 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <User size={14} className="text-amber-400" /> Hero Name / Username *
                      </label>
                      <input
                        type="text"
                        value={regUsername}
                        onChange={(e) => setRegUsername(e.target.value)}
                        required
                        className="w-full bg-white/5 border border-white/20 px-3 py-2.5 text-white text-sm focus:outline-none focus:border-amber-400"
                        placeholder="e.g. Aria_Vale"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-white/80 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Mail size={14} className="text-amber-400" /> Raven Post / Email *
                      </label>
                      <input
                        type="email"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        required
                        className="w-full bg-white/5 border border-white/20 px-3 py-2.5 text-white text-sm focus:outline-none focus:border-amber-400"
                        placeholder="scribe@valewyn.realm"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-white/80 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Lock size={14} className="text-amber-400" /> Oathword *
                      </label>
                      <input
                        type="password"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        required
                        className="w-full bg-white/5 border border-white/20 px-3 py-2.5 text-white text-sm focus:outline-none focus:border-amber-400"
                        placeholder="••••••••••••"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-white/80 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Crown size={14} className="text-amber-400" /> Leader Title / Honorific *
                      </label>
                      <select
                        value={regLeaderTitle}
                        onChange={(e) => setRegLeaderTitle(e.target.value)}
                        className="w-full bg-[#111111] border border-white/20 px-3 py-2.5 text-white text-xs focus:outline-none focus:border-amber-400"
                      >
                        <option>Realm Warden</option>
                        <option>High King</option>
                        <option>Wyrm Sovereign</option>
                        <option>Grand Archmage</option>
                        <option>High Regent</option>
                        <option>High Chancellor</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-white/80 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Building2 size={14} className="text-amber-400" /> Realm Name *
                      </label>
                      <input
                        type="text"
                        value={regEmpireName}
                        onChange={(e) => setRegEmpireName(e.target.value)}
                        required
                        className="w-full bg-white/5 border border-white/20 px-3 py-2.5 text-white text-sm focus:outline-none focus:border-amber-400"
                        placeholder="e.g. The Crownlands of Valewyn"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-white/80 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Globe size={14} className="text-amber-400" /> Capital Holding Name *
                      </label>
                      <input
                        type="text"
                        value={regCapitalName}
                        onChange={(e) => setRegCapitalName(e.target.value)}
                        required
                        className="w-full bg-white/5 border border-white/20 px-3 py-2.5 text-white text-sm focus:outline-none focus:border-amber-400"
                        placeholder="e.g. Valewyn Crownlands"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-white/80 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Compass size={14} className="text-amber-400" /> March Origin & Starting Hold *
                    </label>
                    <select
                      value={regOriginSector}
                      onChange={(e) => setRegOriginSector(e.target.value)}
                      className="w-full bg-[#111111] border border-white/20 px-3 py-2.5 text-white text-xs focus:outline-none focus:border-amber-400"
                    >
                      <option>Realm 1: Elderglen Crownlands (01:104:04)</option>
                      <option>Realm 2: Silverwood Reach (02:042:08)</option>
                      <option>Realm 3: Ironroot Depths (03:012:01)</option>
                      <option>Realm 4: Thornmarch (04:088:02)</option>
                      <option>Realm 5: Gloamveil Frontier (05:001:15)</option>
                    </select>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => {
                        sound.play('click');
                        setRegStep(2);
                      }}
                      className="px-6 py-3 bg-amber-400 text-black font-bold text-xs uppercase tracking-widest hover:bg-amber-300 transition-colors cursor-pointer flex items-center gap-2"
                    >
                      <span>Choose Your People</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: RACE SELECTION SYSTEM */}
              {regStep === 2 && (
                <div className="space-y-5 text-xs animate-fade-in">
                  <p className="text-white/70 text-xs">
                    Choose your people. Each folk has distinct strengths, a storied homeland, and a special craft or battle tradition.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                    {RACES.map((rc) => {
                      const isSelected = selectedRace === rc.id;
                      return (
                        <div
                          key={rc.id}
                          onClick={() => {
                            sound.play('click');
                            setSelectedRace(rc.id);
                          }}
                          className={`p-4 border text-left cursor-pointer transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'bg-amber-400 text-black border-amber-400 font-bold shadow-lg scale-[1.02]'
                              : 'bg-white/5 text-white/90 border-white/20 hover:border-white/40 hover:bg-white/10'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className={`text-xs font-extrabold uppercase ${isSelected ? 'text-black' : 'text-white'}`}>
                                {rc.name}
                              </span>
                              {isSelected && <CheckCircle2 size={16} className="text-black" />}
                            </div>
                            <span className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase mb-2 ${
                              isSelected ? 'bg-black text-amber-400' : 'bg-white/10 text-amber-400'
                            }`}>
                              {rc.bonusLabel}
                            </span>
                            <p className={`text-[11px] leading-relaxed line-clamp-3 ${isSelected ? 'text-neutral-800 font-normal' : 'text-white/60'}`}>
                              {rc.description}
                            </p>
                          </div>

                          <div className={`mt-3 pt-2 border-t text-[10px] font-mono ${isSelected ? 'border-black/20 text-black/80' : 'border-white/10 text-white/50'}`}>
                            Vault: <strong>{rc.bankName}</strong>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Detailed Selected Race Breakdown Card */}
                  <div className="p-4 bg-white/5 border border-white/20 space-y-3">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="font-bold text-amber-400 uppercase tracking-widest text-xs flex items-center gap-1.5">
                        <Zap size={14} /> PEOPLE & HERITAGE: {currentRaceObj.name}
                      </span>
                      <span className="text-white/60 font-mono text-[11px]">Vault Structure: {currentRaceObj.bankName}</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
                      <div className="p-2 bg-black/40 border border-white/10">
                        <span className="block text-white/50 text-[10px]">ATTACK MODIFIER</span>
                        <span className="font-bold text-emerald-400 text-sm">+{Math.round((currentRaceObj.attackModifier - 1) * 100)}%</span>
                      </div>
                      <div className="p-2 bg-black/40 border border-white/10">
                        <span className="block text-white/50 text-[10px]">WARD MODIFIER</span>
                        <span className="font-bold text-blue-400 text-sm">+{Math.round((currentRaceObj.defenseModifier - 1) * 100)}%</span>
                      </div>
                      <div className="p-2 bg-black/40 border border-white/10">
                        <span className="block text-white/50 text-[10px]">INCOME MODIFIER</span>
                        <span className="font-bold text-amber-400 text-sm">+{Math.round((currentRaceObj.incomeModifier - 1) * 100)}%</span>
                      </div>
                      <div className="p-2 bg-black/40 border border-white/10">
                        <span className="block text-white/50 text-[10px]">COVERT MODIFIER</span>
                        <span className="font-bold text-purple-400 text-sm">+{Math.round((currentRaceObj.covertModifier - 1) * 100)}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setRegStep(1)}
                      className="px-5 py-2.5 border border-white/20 text-white hover:border-white font-bold text-xs uppercase cursor-pointer"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        sound.play('click');
                        setRegStep(3);
                      }}
                      className="px-6 py-3 bg-amber-400 text-black font-bold text-xs uppercase tracking-widest hover:bg-amber-300 transition-colors cursor-pointer flex items-center gap-2"
                    >
                      <span>Choose Your Crown</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: CROWN & COUNCIL */}
              {regStep === 3 && (
                <div className="space-y-5 text-xs animate-fade-in">
                  <p className="text-white/70 text-xs">
                    Choose your realm’s governing order. Its customs shape trade, lore, warbands, and the growth of your holdings.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {extendedGovernments.map((gov) => {
                      const isSelected = selectedGov === gov.id;
                      return (
                        <div
                          key={gov.id}
                          onClick={() => {
                            sound.play('click');
                            setSelectedGov(gov.id);
                          }}
                          className={`p-4 border text-left cursor-pointer transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'bg-amber-400 text-black border-amber-400 font-bold shadow-lg scale-[1.02]'
                              : 'bg-white/5 text-white/90 border-white/20 hover:border-white/40 hover:bg-white/10'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className={`text-xs font-extrabold uppercase ${isSelected ? 'text-black' : 'text-white'}`}>
                                {gov.name}
                              </span>
                              {isSelected && <CheckCircle2 size={16} className="text-black" />}
                            </div>
                            <p className={`text-[11px] leading-relaxed mb-3 ${isSelected ? 'text-neutral-800 font-normal' : 'text-white/60'}`}>
                              {gov.description}
                            </p>
                          </div>

                          <div className={`grid grid-cols-2 gap-1.5 text-[10px] font-mono pt-2 border-t ${
                            isSelected ? 'border-black/20 text-black/90' : 'border-white/10 text-white/70'
                          }`}>
                            <div>Economy: <strong>{Math.round(gov.economyModifier * 100)}%</strong></div>
                            <div>Research: <strong>{Math.round(gov.researchModifier * 100)}%</strong></div>
                            <div>Military: <strong>{Math.round(gov.militaryModifier * 100)}%</strong></div>
                            <div>Holdings: <strong>{Math.round(gov.colonyModifier * 100)}%</strong></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Detailed Selected Government Breakdown */}
                  <div className="p-4 bg-white/5 border border-white/20 space-y-3">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="font-bold text-amber-400 uppercase tracking-widest text-xs flex items-center gap-1.5">
                        <Sliders size={14} /> CROWN & COUNCIL: {currentGovObj.name}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center font-mono">
                      <div className="p-2 bg-black/40 border border-white/10">
                        <span className="block text-white/50 text-[9px]">ECONOMY</span>
                        <span className="font-bold text-emerald-400 text-xs">{Math.round(currentGovObj.economyModifier * 100)}%</span>
                      </div>
                      <div className="p-2 bg-black/40 border border-white/10">
                        <span className="block text-white/50 text-[9px]">RESEARCH</span>
                        <span className="font-bold text-blue-400 text-xs">{Math.round(currentGovObj.researchModifier * 100)}%</span>
                      </div>
                      <div className="p-2 bg-black/40 border border-white/10">
                        <span className="block text-white/50 text-[9px]">MILITARY</span>
                        <span className="font-bold text-red-400 text-xs">{Math.round(currentGovObj.militaryModifier * 100)}%</span>
                      </div>
                      <div className="p-2 bg-black/40 border border-white/10">
                        <span className="block text-white/50 text-[9px]">WARD</span>
                        <span className="font-bold text-indigo-400 text-xs">{Math.round(currentGovObj.defenseModifier * 100)}%</span>
                      </div>
                      <div className="p-2 bg-black/40 border border-white/10">
                        <span className="block text-white/50 text-[9px]">HOLDING</span>
                        <span className="font-bold text-amber-400 text-xs">{Math.round(currentGovObj.colonyModifier * 100)}%</span>
                      </div>
                      <div className="p-2 bg-black/40 border border-white/10">
                        <span className="block text-white/50 text-[9px]">WARBAND COST</span>
                        <span className="font-bold text-purple-400 text-xs">{Math.round(currentGovObj.fleetModifier * 100)}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setRegStep(2)}
                      className="px-5 py-2.5 border border-white/20 text-white hover:border-white font-bold text-xs uppercase cursor-pointer"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        sound.play('click');
                        setRegStep(4);
                      }}
                      className="px-6 py-3 bg-amber-400 text-black font-bold text-xs uppercase tracking-widest hover:bg-amber-300 transition-colors cursor-pointer flex items-center gap-2"
                    >
                      <span>Review Final Founding Dossier</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: FINAL IMPERIAL DOSSIER REVIEW */}
              {regStep === 4 && (
                <form onSubmit={handleRegisterFinalize} className="space-y-5 text-xs animate-fade-in">
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                    <span>Your Royal Dossier is complete. Review your sovereign configuration below before commissioning your Realm.</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
                    {/* User & Sovereign Details */}
                    <div className="p-4 bg-white/5 border border-white/20 space-y-2">
                      <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block border-b border-white/10 pb-1">
                        👑 CHAMPION DOSSIER
                      </span>
                      <div className="flex justify-between text-white/80">
                        <span>Hero Name:</span>
                        <strong className="text-white">{regUsername}</strong>
                      </div>
                      <div className="flex justify-between text-white/80">
                        <span>Leader Title:</span>
                        <strong className="text-amber-300">{regLeaderTitle}</strong>
                      </div>
                      <div className="flex justify-between text-white/80">
                        <span>Realm Designation:</span>
                        <strong className="text-white">{regEmpireName}</strong>
                      </div>
                      <div className="flex justify-between text-white/80">
                        <span>Capital World:</span>
                        <strong className="text-emerald-400">{regCapitalName}</strong>
                      </div>
                      <div className="flex justify-between text-white/80">
                        <span>Leyroad Frequency:</span>
                        <strong className="text-white/60">{regEmail}</strong>
                      </div>
                      <div className="flex justify-between text-white/80">
                        <span>Origin Sector:</span>
                        <strong className="text-white">{regOriginSector}</strong>
                      </div>
                    </div>

                    {/* Combined Trait Modifiers */}
                    <div className="p-4 bg-white/5 border border-white/20 space-y-2">
                      <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block border-b border-white/10 pb-1">
                        ⚡ COMBINED SOVEREIGN MULTIPLIERS
                      </span>
                      <div className="flex justify-between text-white/80">
                        <span>Selected Race:</span>
                        <strong className="text-amber-300 uppercase">{currentRaceObj.name}</strong>
                      </div>
                      <div className="flex justify-between text-white/80">
                        <span>Government Structure:</span>
                        <strong className="text-amber-300 uppercase">{currentGovObj.name}</strong>
                      </div>
                      <div className="flex justify-between text-white/80">
                        <span>Starting Vault:</span>
                        <strong className="text-white">{currentRaceObj.bankName}</strong>
                      </div>
                      <div className="flex justify-between text-white/80">
                        <span>Net Attack Rating:</span>
                        <strong className="text-emerald-400">
                          {Math.round(currentRaceObj.attackModifier * currentGovObj.militaryModifier * 100)}%
                        </strong>
                      </div>
                      <div className="flex justify-between text-white/80">
                        <span>Net Ward Rating:</span>
                        <strong className="text-blue-400">
                          {Math.round(currentRaceObj.defenseModifier * currentGovObj.defenseModifier * 100)}%
                        </strong>
                      </div>
                      <div className="flex justify-between text-white/80">
                        <span>Net Economic Yield:</span>
                        <strong className="text-amber-400">
                          {Math.round(currentRaceObj.incomeModifier * currentGovObj.economyModifier * 100)}%
                        </strong>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setRegStep(3)}
                      className="px-5 py-2.5 border border-white/20 text-white hover:border-white font-bold text-xs uppercase cursor-pointer"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3.5 bg-emerald-500 text-black font-extrabold text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all cursor-pointer flex items-center gap-2 shadow-lg"
                    >
                      <Rocket size={16} />
                      <span>FOUND REALM & LAUNCH WARBAND →</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

        </div>
      </main>

      {/* Footer Info */}
      <footer className="relative z-10 border-t border-white/10 px-6 sm:px-8 py-3.5 flex flex-col lg:flex-row items-center justify-between text-xs text-white/50 font-mono bg-black/85 backdrop-blur-md gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-white/80 font-bold">ELDORIA: REALMS AT WAR</span>
          <span className="text-white/30 hidden sm:inline">|</span>
          <span className="hidden sm:inline">UNRELEASED CHRONICLE</span>
          <span className="text-white/30 hidden md:inline">|</span>
          <span className="hidden md:inline">BROWSER EDITION</span>
        </div>

        {/* Bottom Right Side Header: Development Team Credit beside Update Info and Patch Info */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-end">
          {/* 1. Development Team Credit */}
          <button
            type="button"
            id="titlescreen-dev-credits-btn"
            onClick={() => {
              sound.play('click');
              setShowCreditsModal(true);
            }}
            className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-300 hover:text-amber-200 transition-colors cursor-pointer flex items-center gap-1.5 text-[11px] font-bold shadow-2xs"
            title="Read the Keepers of the Realm credits"
          >
            <Award size={13} className="text-amber-400" />
            <span>Realm Keepers</span>
          </button>

          {/* 2. Update Info */}
          <button
            type="button"
            id="titlescreen-update-info-btn"
            onClick={() => {
              sound.play('click');
              setPatchModalTab('update');
              setShowPatchModal(true);
            }}
            className="px-2.5 py-1 bg-white/10 hover:bg-white/20 border border-white/20 text-white/80 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-[11px]"
            title="Read the current realm update"
          >
            <Info size={12} className="text-cyan-400" />
            <span>Realm Update</span>
          </button>

          {/* 3. Patch Info */}
          <button
            type="button"
            id="titlescreen-patch-info-btn"
            onClick={() => {
              sound.play('click');
              setPatchModalTab('patch');
              setShowPatchModal(true);
            }}
            className="px-2.5 py-1 bg-white/10 hover:bg-white/20 border border-white/20 text-white/80 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-[11px]"
            title="Read the patch chronicle"
          >
            <Sparkles size={12} className="text-amber-400" />
            <span>Patch Chronicle</span>
          </button>
        </div>
      </footer>

      {/* Development Team Credits Modal */}
      {showCreditsModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="max-w-5xl w-full my-auto">
            <DevelopmentCreditsView
              isModal={true}
              onCloseModal={() => setShowCreditsModal(false)}
            />
          </div>
        </div>
      )}

      {/* Patch & Update Notes Modal */}
      <PatchNotesModal
        isOpen={showPatchModal}
        onClose={() => setShowPatchModal(false)}
        initialTab={patchModalTab}
        onOpenCredits={() => {
          setShowPatchModal(false);
          setShowCreditsModal(true);
        }}
      />

    </div>
  );
};
