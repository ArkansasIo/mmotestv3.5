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
  Key,
  Terminal,
  Link,
} from 'lucide-react';
import { sound } from '../../sound';
import { PlayerProfile, RaceId, AdminAuthSession, AdminCredentialAccount } from '../../types';
import { RACES, GOVERNMENTS } from '../../gameData';
import { DevelopmentCreditsView } from '../views/DevelopmentCreditsView';
import { PatchNotesModal } from '../modals/PatchNotesModal';
import { RootAdminUrlLoginModal } from '../modals/RootAdminUrlLoginModal';

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
  onRootAdminLogin?: (session: AdminAuthSession, account: AdminCredentialAccount) => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  profile,
  onLogin,
  onRegister,
  onQuickStart,
  onRootAdminLogin,
}) => {
  const [authMode, setAuthMode] = useState<'splash' | 'login' | 'register' | 'servers'>('splash');
  const [regStep, setRegStep] = useState<1 | 2 | 3 | 4>(1);
  const [showCreditsModal, setShowCreditsModal] = useState<boolean>(false);
  const [showPatchModal, setShowPatchModal] = useState<boolean>(false);
  const [showRootAdminModal, setShowRootAdminModal] = useState<boolean>(false);
  const [patchModalTab, setPatchModalTab] = useState<'update' | 'patch'>('patch');

  // Login Form States
  const [usernameInput, setUsernameInput] = useState<string>(profile.username || 'Aria_Vale');
  const [passwordInput, setPasswordInput] = useState<string>('••••••••••••');
  const [selectedServer, setSelectedServer] = useState<string>('Elderglen (Crownlands) - 12ms');

  // Detailed Registration Form States
  const [regUsername, setRegUsername] = useState<string>('Aria_Vale');
  const [regEmail, setRegEmail] = useState<string>('aria@valewyn.realm');
  const [regPassword, setRegPassword] = useState<string>('PassCode9982!');
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
    <div className="min-h-screen bg-[#17140f] text-white flex flex-col justify-between relative overflow-x-hidden font-sans select-none">
      {/* Background Grid & Radial Flare */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,53,15,0.22)_0%,transparent_72%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      {/* Top Navigation Bar */}
      <header className="relative z-10 border-b border-white/10 px-6 py-4 flex items-center justify-between backdrop-blur-md bg-black/60">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white text-black font-extrabold flex items-center justify-center text-lg tracking-tighter shadow-sm">
            ER
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-widest text-white uppercase">ELDORIA: REALMS AT WAR</h1>
            <span className="text-[10px] text-white/50 font-mono">MEDIEVAL FANTASY MMORPG · AGE OF EMBERS</span>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 text-xs font-mono">
          <div className="hidden sm:flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-3 py-1 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>THE REALM HALL IS OPEN · AGE OF EMBERS</span>
          </div>
          <button
            type="button"
            onClick={() => {
              sound.play('click');
              setShowCreditsModal(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer text-xs"
            title="View Development Team Credits"
          >
            <Award size={13} className="text-amber-400" />
            <span>Royal Chronicler: <strong className="text-amber-300">Stephen</strong></span>
            <span className="text-[9px] font-black uppercase px-1.5 py-0.2 bg-amber-400 text-black ml-1">Credits</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.play('click');
              setShowRootAdminModal(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1 bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/50 transition-all cursor-pointer text-xs font-mono font-bold"
            title="Root Admin URL Login Terminal"
          >
            <Key size={13} className="text-amber-400" />
            <span>Root Admin URL Access</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 my-4">
        <div className="w-full max-w-5xl">

          {/* 1. SPLASH / HERO MODE */}
          {authMode === 'splash' && (
            <div className="text-center space-y-8 animate-fade-in max-w-2xl mx-auto py-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 text-xs font-mono text-white/90">
                <Sparkles size={14} className="text-amber-400" />
                <span>MEDIEVAL FANTASY MMORPG · AGE OF EMBERS</span>
              </div>

              <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase leading-none">
                Eldoria: Realms at War
              </h2>

              <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                Choose your people and swear an oath to a crown. Explore enchanted biomes, master blade and spell, gather a guild, brave ancient dungeons, and shape the fate of nine great realms.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    sound.play('click');
                    setAuthMode('login');
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  Hero Login →
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.play('click');
                    setAuthMode('register');
                    setRegStep(1);
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 bg-amber-400 text-black font-bold text-xs uppercase tracking-widest hover:bg-amber-300 transition-colors cursor-pointer"
                >
                  Begin Your Saga
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.play('click');
                    setShowRootAdminModal(true);
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 bg-neutral-900 border border-amber-400/50 text-amber-300 font-bold text-xs uppercase tracking-widest hover:bg-neutral-800 transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Key size={14} className="text-amber-400" />
                  <span>Root Admin URL</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.play('success');
                    onQuickStart();
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-emerald-500 transition-colors cursor-pointer"
                >
                  Enter as a Wanderer
                </button>
              </div>

              {/* Development Team Credits Link Button */}
              <div className="flex justify-center pt-1">
                <button
                  type="button"
                  onClick={() => {
                    sound.play('click');
                    setShowCreditsModal(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-black/40 hover:bg-black/70 border border-white/20 text-xs text-amber-300 font-mono transition-all cursor-pointer uppercase tracking-wider"
                >
                  <Award size={13} className="text-amber-400" />
                  <span>Read the Keepers’ Chronicle</span>
                </button>
              </div>

              <div className="pt-8 grid grid-cols-3 gap-4 border-t border-white/10 text-xs font-mono text-white/60">
                <div className="p-3 bg-white/5 border border-white/10">
                  <span className="block text-white font-bold text-sm">90+</span>
                  Lands & Keeps
                </div>
                <div className="p-3 bg-white/5 border border-white/10">
                  <span className="block text-white font-bold text-sm">5 PEOPLES & 9 CROWNS</span>
                  Peoples & Crowns
                </div>
                <div className="p-3 bg-white/5 border border-white/10">
                  <span className="block text-white font-bold text-sm">100% REAL-TIME</span>
                  Living Realms & Warbands
                </div>
              </div>
            </div>
          )}

          {/* 2. COMMANDER LOGIN MODE */}
          {authMode === 'login' && (
            <div className="bg-black/90 border border-white/20 p-8 space-y-6 backdrop-blur-xl animate-fade-in max-w-md mx-auto">
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
                  className="w-full py-3.5 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors cursor-pointer mt-2"
                >
                  Enter the Keep →
                </button>
              </form>
            </div>
          )}

          {/* 3. DETAILED EMPIRE REGISTRATION SYSTEM */}
          {authMode === 'register' && (
            <div className="bg-black/95 border border-white/20 p-6 sm:p-8 space-y-6 backdrop-blur-2xl animate-fade-in shadow-2xl">
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

      {/* Root Admin URL Login & Creation Modal */}
      <RootAdminUrlLoginModal
        isOpen={showRootAdminModal}
        onClose={() => setShowRootAdminModal(false)}
        onAuthSuccess={(session, account) => {
          setShowRootAdminModal(false);
          if (onRootAdminLogin) {
            onRootAdminLogin(session, account);
          } else {
            onLogin(account.username, 'tauri');
          }
        }}
      />
    </div>
  );
};
