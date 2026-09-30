import React, { useState, useEffect, useRef } from 'react';
import {
  Globe,
  Boxes,
  Building2,
  FlaskConical,
  Rocket,
  Shield,
  Swords,
  Orbit,
  Crown,
  Scale,
  Users,
  Eye,
  Award,
  GraduationCap,
  Gem,
  Terminal,
  Volume2,
  VolumeX,
  LogOut,
  Cloud,
  ChevronDown,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  PanelLeftClose,
  PanelLeftOpen,
  FolderOpen,
  FolderClosed,
  X,
  Menu,
} from 'lucide-react';
import { sound } from '../sound';
import { PlayerProfile, Race } from '../types';
import { RACES } from '../gameData';
import { getAdminAuthSession } from '../config/adminAuthConfig';
import { auth, loginWithGoogle } from '../firebase';

export interface SidebarProps {
  activeRoute: string;
  onNavigate: (route: string) => void;
  profile: PlayerProfile;
  openGroups: Record<string, boolean>;
  onToggleGroup: (group: string) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onLogout?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export interface NavItem {
  id: string;
  label: string;
  badge?: string;
}

export type NavCategory =
  | 'Command'
  | 'Economy & Development'
  | 'Forces & War'
  | 'World & Holdings'
  | 'Trade & Community'
  | 'Champion'
  | 'Stewardship';

export interface OGameNavSection {
  id: string;
  label: string;
  category: NavCategory;
  ogameName: string;
  icon: React.ElementType;
  defaultRoute: string;
  items: NavItem[];
}

export const OGAME_NAV_SECTIONS: OGameNavSection[] = [
  {
    id: 'overview',
    label: 'Overview',
    category: 'Command',
    ogameName: 'OVERVIEW',
    icon: Globe,
    defaultRoute: 'dashboard',
    items: [
      { id: 'dashboard', label: 'Realm Overview' },
      { id: 'strategic-console', label: 'Strategic Control Console' },
      { id: 'realm-dossier', label: 'Character & Empire Dossier' },
      { id: 'turn-system', label: 'Season Cycle (6 Turns/Min)' },
      { id: 'civilization', label: 'Folk & Settlements' },
      { id: 'government-system', label: '🏛️ 9 Crowns & Councils' },
      { id: 'missions', label: 'Quests & Feats' },
      { id: 'adventurer-handbook', label: 'Adventurer’s Handbook' },
      { id: 'codex-doc', label: 'The Adventurer’s Codex' },
    ],
  },
  {
    id: 'resources',
    label: 'Resources',
    category: 'Economy & Development',
    ogameName: 'RESOURCES',
    icon: Boxes,
    defaultRoute: 'resources',
    items: [
      { id: 'resources', label: 'Treasury & Stores' },
      { id: 'income', label: 'Harvests & Holdings' },
      { id: 'storage-upgrades', label: 'Granaries & Storehouses' },
      { id: 'power-grid', label: 'Leylines & Hearthfires' },
    ],
  },
  {
    id: 'facilities',
    label: 'Infrastructure',
    category: 'Economy & Development',
    ogameName: 'FACILITIES',
    icon: Building2,
    defaultRoute: 'master-upgrades',
    items: [
      { id: 'master-upgrades', label: 'Keep & Holding Upgrades' },
      { id: 'aic-system', label: 'Crownworks & Leylines' },
      { id: 'factories', label: 'Mines & Forgeworks' },
      { id: 'shipyard', label: 'Royal Warforge' },
      { id: 'megastructures', label: 'Wonders of the Realm' },
      { id: 'repair', label: 'Guild Hall & Armorer' },
      { id: 'space-stations', label: 'Border Keeps' },
    ],
  },
  {
    id: 'research',
    label: 'Research',
    category: 'Economy & Development',
    ogameName: 'RESEARCH',
    icon: FlaskConical,
    defaultRoute: 'tech-tree',
    items: [
      { id: 'tech-tree', label: 'Great Tome of Lore' },
      { id: 'tech-library', label: 'Scribes & Arcanists' },
      { id: 'arcane-spellcraft', label: 'Grimoire & Spellcraft' },
      { id: 'eve-blueprints', label: 'Masterwork Blueprints' },
      { id: 'tech-offense', label: 'Arms & Battlecraft' },
      { id: 'tech-defense', label: 'Wards & Armorcraft' },
      { id: 'tech-covert', label: 'Scouting & Guile' },
      { id: 'tech-anti-covert', label: 'Watchers & Countersigns' },
    ],
  },
  {
    id: 'shipyard',
    label: 'Army & Retinue',
    category: 'Forces & War',
    ogameName: 'ROYAL WARFORGE',
    icon: Rocket,
    defaultRoute: 'shipyard',
    items: [
      { id: 'unit-roster-90', label: '90 Arms & Retinues' },
      { id: 'ship-fitting', label: 'Warband Gear & Armor' },
      { id: 'unit-production', label: 'Muster & Crafting Queues' },
      { id: 'units', label: 'Warband Companies' },
      { id: 'super-units', label: 'Mythic Champions' },
      { id: 'miners', label: 'Miners & Caravans' },
      { id: 'hyperspace-systems', label: 'Leyroads & Royal Retinues' },
      { id: 'ship', label: 'War Council Overview' },
      { id: 'modules', label: 'Retinue Upgrades' },
    ],
  },
  {
    id: 'workforce',
    label: 'Workforce & Academy',
    category: 'Forces & War',
    ogameName: 'WORKFORCE',
    icon: GraduationCap,
    defaultRoute: 'workforce-academy',
    items: [
      { id: 'workforce-academy', label: 'Guild Academy' },
      { id: 'academy-enlistment', label: 'Recruiting Hall' },
      { id: 'workforce-roster', label: '90 Adventurer Roles' },
      { id: 'academy-wings', label: 'Six Adventuring Orders' },
      { id: 'academy-drills', label: 'Training & Muster' },
    ],
  },
  {
    id: 'defenses',
    label: 'Wards',
    category: 'Forces & War',
    ogameName: 'DEFENSES',
    icon: Shield,
    defaultRoute: 'defenses',
    items: [
      { id: 'defenses', label: 'Keep Ward Network' },
      { id: 'shields', label: 'Wards & Ramparts' },
      { id: 'weapons', label: 'Bows & Ballistae' },
      { id: 'armors', label: 'Walls & Fortifications' },
    ],
  },
  {
    id: 'fleet',
    label: 'Warband & Battles',
    category: 'Forces & War',
    ogameName: 'FLEET',
    icon: Swords,
    defaultRoute: 'targets',
    items: [
      { id: 'targets', label: 'March Orders & Rivals' },
      { id: 'planetary-invasion', label: 'Sieges & Invasions' },
      { id: 'expeditions', label: 'Far March Expeditions' },
      { id: 'monster-bestiary', label: 'The Marches Bestiary' },
      { id: 'add-worlds-bosses', label: 'Realm & Story Bosses' },
      { id: 'stargate-system-lords', label: 'Warlords & Dungeon Raids' },
      { id: 'nemesis-system', label: '👑 Nemesis Warlord System' },
      { id: 'spy', label: 'Scouts & Reconnaissance' },
      { id: 'sabotage', label: 'Sabotage & Intrigue' },
      { id: 'attack-log', label: 'Battle Chronicle' },
      { id: 'military-stats', label: 'Warband Renown' },
    ],
  },
  {
    id: 'galaxy',
    label: 'Exploration',
    category: 'World & Holdings',
    ogameName: 'GALAXY',
    icon: Orbit,
    defaultRoute: 'universe',
    items: [
      { id: 'universe', label: '30 Realms & 90 Marches' },
      { id: 'nms-universe', label: 'Wildlands Atlas' },
      { id: 'exploration', label: 'Explore the Far Marches' },
      { id: 'stargate-network', label: 'Waystones & Leygates' },
      { id: 'gate-tokens', label: '⚡ Waystone Charms' },
      { id: 'stargate-relics', label: '🏺 Relics & Elder Artifacts' },
      { id: 'stargate-npc-races', label: '27 Peoples of the Realms' },
    ],
  },
  {
    id: 'empire',
    label: 'Holdings',
    category: 'World & Holdings',
    ogameName: 'EMPIRE',
    icon: Crown,
    defaultRoute: 'planet-list',
    items: [
      { id: 'planet-list', label: 'Lands & Holdings' },
      { id: 'planet-bonuses', label: 'Region Almanac' },
      { id: 'planet-power', label: 'Leyline Network' },
      { id: 'planet-defenses', label: 'Keep Ward Ledger' },
      { id: 'moon-bases', label: 'Hillforts & Watchtowers' },
      { id: 'life-support', label: '🌾 Food & Water Life Support' },
      { id: 'population', label: '👥 Population & Rationing' },
      { id: 'hazards', label: '⚠️ Keep Hazards' },
      { id: 'colonial-plunge', label: '📉 Holding Plunge System' },
      { id: 'stellar-encyclopedia', label: 'A–Z Bestiary & Almanac' },
    ],
  },
  {
    id: 'merchant',
    label: 'Trade & Artisans',
    category: 'Trade & Community',
    ogameName: 'MERCHANT',
    icon: Scale,
    defaultRoute: 'resource-exchange',
    items: [
      { id: 'resource-exchange', label: 'Grand Market' },
      { id: 'professions', label: 'Craft Guild & Professions' },
      { id: 'bank-vault', label: 'Royal Treasury' },
      { id: 'weapon-market', label: 'Armory Catalog' },
      { id: 'mercenary-market', label: 'Free Company Hall' },
    ],
  },
  {
    id: 'alliance',
    label: 'Alliance & Social',
    category: 'Trade & Community',
    ogameName: 'ALLIANCE',
    icon: Users,
    defaultRoute: 'alliances',
    items: [
      { id: 'alliances', label: 'Guild Hall' },
      { id: 'mmorpg-ogame', label: 'Guilds & Dungeon Raids' },
      { id: 'diplomacy', label: 'Courts & Treaties' },
      { id: 'messages', label: 'Communications & Messages' },
      { id: 'galactic-news', label: 'Town Criers & Royal News' },
      { id: 'rankings', label: 'Champion Rankings' },
    ],
  },
  {
    id: 'intelligence',
    label: 'Intelligence',
    category: 'Forces & War',
    ogameName: 'INTELLIGENCE',
    icon: Eye,
    defaultRoute: 'spy-log',
    items: [
      { id: 'spy-log', label: 'Scout Reports & Rumors' },
      { id: 'enemy-intelligence', label: 'Rival Dossiers' },
      { id: 'intel-codex', label: 'Secrets & Spymaster’s Ledger' },
    ],
  },
  {
    id: 'officers',
    label: 'Champion & Account',
    category: 'Champion',
    ogameName: 'OFFICERS',
    icon: Award,
    defaultRoute: 'commander-hq',
    items: [
      { id: 'commander-hq', label: 'War Council & Companions' },
      { id: 'commander-gacha', label: '👑 72 Champions' },
      { id: 'player-profile', label: 'Hero’s Chronicle' },
      { id: 'race', label: 'People & Crown' },
      { id: 'vacation', label: 'Sanctuary' },
      { id: 'ascension', label: 'Hall of Legends' },
      { id: 'account-settings', label: '⚙️ Account Settings' },
      { id: 'account-profiles', label: 'Character Sagas' },
    ],
  },
  {
    id: 'store',
    label: 'Season Market',
    category: 'Trade & Community',
    ogameName: 'SHOP',
    icon: Gem,
    defaultRoute: 'store-battlepass',
    items: [
      { id: 'store-battlepass', label: 'Market & Season of Banners' },
    ],
  },
  {
    id: 'admin',
    label: 'Steward’s Council',
    category: 'Stewardship',
    ogameName: 'ADMIN',
    icon: Terminal,
    defaultRoute: 'admin-dashboard',
    items: [
      { id: 'admin-dashboard', label: 'Steward’s Council' },
      { id: 'admin-empire-history', label: '📜 Realm History Chronicle' },
      { id: 'admin-universe', label: 'Realm & Physics Config' },
      { id: 'admin-users', label: 'Player Accounts Inspector' },
      { id: 'admin-crown', label: 'Royal Crown & Decrees' },
      { id: 'admin-bans', label: 'Bans & Sanctions Registry' },
      { id: 'admin-planets', label: 'Holdings & Moon Spawner' },
      { id: 'admin-fleets', label: 'Warband Radar & Interception' },
      { id: 'admin-debris', label: 'Realm Debris & Spatial' },
      { id: 'admin-tickets', label: 'Support Ticket Desk' },
      { id: 'admin-security', label: 'Anti-Cheat & Security Logs' },
      { id: 'admin-events', label: 'Global Events & Happy Hour' },
      { id: 'admin-cheats', label: 'God Mode & Cheats Console' },
      { id: 'admin-operations', label: 'Server Ops & Modifiers' },
      { id: 'cron-jobs', label: 'Cron Scheduler' },
      { id: 'cron-cli', label: 'Server Crontab CLI' },
      { id: 'admin-maintenance', label: 'Database & Season Reset' },
    ],
  },
];

const NAV_CATEGORY_ORDER: NavCategory[] = [
  'Command',
  'Economy & Development',
  'Forces & War',
  'World & Holdings',
  'Trade & Community',
  'Champion',
  'Stewardship',
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeRoute,
  onNavigate,
  profile,
  openGroups,
  onToggleGroup,
  soundEnabled,
  onToggleSound,
  onLogout,
  isCollapsed: propIsCollapsed,
  onToggleCollapse,
  mobileOpen = false,
  onCloseMobile,
}) => {
  const currentRace: Race | undefined = RACES.find((r) => r.id === profile.race);
  const [authUser, setAuthUser] = useState(auth.currentUser);

  // Collapsed rail mode state with localStorage persistence
  const [internalCollapsed, setInternalCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('ogame_sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  const isCollapsed = propIsCollapsed !== undefined ? propIsCollapsed : internalCollapsed;

  // Floating flyout menu state in collapsed mode
  const [activeFlyout, setActiveFlyout] = useState<{ id: string; top: number } | null>(null);
  const flyoutTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setAuthUser(user);
    });
    return () => unsub();
  }, []);

  const handleItemClick = (routeId: string) => {
    sound.play('click');
    onNavigate(routeId);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const handleToggleCollapse = () => {
    sound.play('click');
    if (onToggleCollapse) {
      onToggleCollapse();
    } else {
      setInternalCollapsed((prev) => {
        const next = !prev;
        try {
          localStorage.setItem('ogame_sidebar_collapsed', String(next));
        } catch {}
        return next;
      });
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const handleFlyoutMouseEnter = (secId: string, event: React.MouseEvent<HTMLElement>) => {
    if (!isCollapsed) return;
    if (flyoutTimeoutRef.current) {
      clearTimeout(flyoutTimeoutRef.current);
      flyoutTimeoutRef.current = null;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    setActiveFlyout({ id: secId, top: Math.max(10, Math.min(rect.top, window.innerHeight - 350)) });
  };

  const handleFlyoutMouseLeave = () => {
    if (!isCollapsed) return;
    flyoutTimeoutRef.current = setTimeout(() => {
      setActiveFlyout(null);
    }, 220);
  };

  const handleExpandAll = () => {
    sound.play('click');
    OGAME_NAV_SECTIONS.forEach((sec) => {
      if (!openGroups[sec.id]) {
        onToggleGroup(sec.id);
      }
    });
  };

  const handleCollapseAll = () => {
    sound.play('click');
    OGAME_NAV_SECTIONS.forEach((sec) => {
      if (openGroups[sec.id]) {
        onToggleGroup(sec.id);
      }
    });
  };

  const adminSession = getAdminAuthSession();
  const isAdminUser = profile.role === 'admin' || profile.isAdmin === true || (adminSession && adminSession.isAuthenticated);
  const visibleNavSections = [...OGAME_NAV_SECTIONS]
    .sort((left, right) => NAV_CATEGORY_ORDER.indexOf(left.category) - NAV_CATEGORY_ORDER.indexOf(right.category))
    .filter((section) => section.id !== 'admin' || isAdminUser);

  return (
    <>
      {/* Mobile Drawer Backdrop (iPhone 15, iPad portrait) */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden transition-opacity duration-200 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => {
          sound.play('click');
          if (onCloseMobile) onCloseMobile();
        }}
        aria-hidden="true"
      />

      <aside
        id="app-sidebar"
        className={`fixed inset-y-0 left-0 z-50 lg:static lg:z-auto ${
          isCollapsed ? 'w-16' : 'w-64 sm:w-72 lg:w-64'
        } bg-white border-r border-[#dedede] flex flex-col shrink-0 min-h-screen select-none transition-all duration-200 font-sans transform ${
          mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div
          id="sidebar-brand"
          className={`h-16 border-b border-[#dedede] px-3 flex items-center justify-between cursor-pointer bg-[#fafafa]`}
        >
          <div
            className="flex items-center gap-2.5 overflow-hidden flex-1"
            onClick={() => handleItemClick('dashboard')}
            title="Return to Realm Overview"
          >
            <div className="w-8 h-8 bg-[#111111] text-amber-400 font-black flex items-center justify-center text-xs tracking-wider shrink-0 border border-neutral-700 shadow-2xs">
              ER
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden min-w-0">
                <strong className="block text-xs font-black tracking-wider text-[#111111] uppercase leading-tight truncate">
                  ELDORIA
                </strong>
                <small className="block text-[9px] text-amber-600 font-bold tracking-widest uppercase truncate">
                  Realms at War
                </small>
              </div>
            )}
          </div>

          {/* Action buttons (Close on Mobile, Rail Collapse on Desktop) */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              id="sidebar-mobile-close-btn"
              onClick={() => {
                sound.play('click');
                if (onCloseMobile) onCloseMobile();
              }}
              title="Close navigation menu"
              className="p-1.5 hover:bg-neutral-200 text-[#444444] hover:text-[#111111] transition-colors cursor-pointer border border-transparent hover:border-[#dedede] lg:hidden"
            >
              <X size={18} />
            </button>

            <button
              type="button"
              id="sidebar-collapse-toggle-btn"
              onClick={handleToggleCollapse}
              title={isCollapsed ? 'Expand navigation menu' : 'Collapse navigation menu (Rail View)'}
              className="hidden lg:flex p-1.5 hover:bg-neutral-200 text-[#444444] hover:text-[#111111] transition-colors cursor-pointer border border-transparent hover:border-[#dedede]"
            >
              {isCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
            </button>
          </div>
        </div>

        {/* Commander Profile Chip */}
        <div
          id="sidebar-profile-box"
          className={`m-2 p-2 border border-[#dedede] bg-[#fafafa] flex items-center gap-2.5 cursor-pointer hover:border-[#111111] transition-colors ${
            isCollapsed ? 'justify-center p-1.5' : ''
          }`}
          onClick={() => handleItemClick('account-info')}
          title={`Champion ${profile.displayName || profile.username || 'Stephen'} (${currentRace?.name || "Valewyn"})`}
        >
          <div className="w-8 h-8 bg-[#111111] text-white flex items-center justify-center text-xs font-bold shrink-0 border border-neutral-800">
            {getInitials(profile.displayName || profile.username || 'Aria Vale')}
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-mono uppercase tracking-wider text-[#888888] font-bold">
                  CHAMPION
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" title="Online" />
              </div>
              <strong className="block text-xs font-bold text-[#111111] truncate tracking-wide font-mono hover:text-amber-600 transition-colors">
                {profile.displayName || profile.username || 'Champion Aria Vale'}
              </strong>
              <span className="block text-[10px] text-[#666666] truncate font-mono">
                {currentRace?.name || "Valewyn"} · Rank {profile.rankLevel || 1}
              </span>
            </div>
          )}
        </div>

        {/* Accordion Quick Expand / Collapse All (Expanded mode only) */}
        {!isCollapsed && (
          <div className="px-3 py-1 flex items-center justify-between text-[10px] text-[#777777] font-mono border-b border-[#eee] bg-neutral-50/50">
            <span className="font-bold uppercase tracking-wider text-[#999]">Realm Navigation</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleExpandAll}
                className="hover:text-[#111111] underline cursor-pointer text-[9px]"
                title="Expand all sub-menus"
              >
                Expand All
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={handleCollapseAll}
                className="hover:text-[#111111] underline cursor-pointer text-[9px]"
                title="Collapse all sub-menus"
              >
                Collapse All
              </button>
            </div>
          </div>
        )}

        {/* Main OGame Categorized Navigation List */}
        <nav id="sidebar-nav" className="flex-1 overflow-y-auto px-1.5 py-1.5 space-y-1">
          {visibleNavSections.map((sec, index) => {
            const IconComponent = sec.icon;
            const isOpen = !!openGroups[sec.id];
            const hasActiveChild = sec.items.some((item) => item.id === activeRoute);
            const isDirectActive = activeRoute === sec.defaultRoute;
            const startsCategory = sec.category !== visibleNavSections[index - 1]?.category;

            // =========================================================================
            // COLLAPSED RAIL MODE
            // =========================================================================
            if (isCollapsed) {
              return (
                <div
                  key={sec.id}
                  className="relative flex justify-center py-0.5"
                  onMouseEnter={(e) => handleFlyoutMouseEnter(sec.id, e)}
                  onMouseLeave={handleFlyoutMouseLeave}
                >
                  <button
                    type="button"
                    id={`nav-rail-btn-${sec.id}`}
                    onClick={() => handleItemClick(sec.defaultRoute)}
                    title={`${sec.label} (Click to open, hover for sub-menu)`}
                    className={`w-11 h-11 flex items-center justify-center transition-all cursor-pointer relative border ${
                      hasActiveChild || isDirectActive
                        ? 'bg-[#111111] text-amber-400 border-[#111111] shadow-xs'
                        : 'bg-white text-[#555555] hover:bg-[#f5f5f5] hover:text-[#111111] border-transparent hover:border-[#dedede]'
                    }`}
                  >
                    <IconComponent size={17} />
                    {hasActiveChild && (
                      <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500 animate-pulse ring-1 ring-white" />
                    )}
                  </button>
                </div>
              );
            }

            // =========================================================================
            // EXPANDED OGAME MODE
            // =========================================================================
            return (
              <div key={sec.id} className="border border-transparent hover:border-[#dedede] transition-colors rounded-none mb-0.5">
                {startsCategory && (
                  <div className="px-2.5 pb-1 pt-3 text-[9px] font-bold uppercase tracking-[0.16em] text-[#9a8d73]">
                    {sec.category}
                  </div>
                )}
                {/* Main Section Header Row */}
                <div
                  className={`w-full flex items-center justify-between text-xs transition-colors border-l-2 ${
                    hasActiveChild
                      ? 'border-amber-500 bg-[#fafafa] font-bold text-[#111111]'
                      : isDirectActive
                      ? 'border-[#111111] bg-[#f5f5f5] font-bold text-[#111111]'
                      : 'border-transparent text-[#333333] hover:bg-[#f8f8f8] hover:text-[#111111]'
                  }`}
                >
                  {/* Main Link (Direct click jumps to OGame primary page) */}
                  <button
                    type="button"
                    id={`nav-group-main-${sec.id}`}
                    onClick={() => {
                      handleItemClick(sec.defaultRoute);
                      if (!isOpen) {
                        onToggleGroup(sec.id);
                      }
                    }}
                    className="flex-1 flex items-center gap-2.5 px-2.5 py-2 text-left truncate cursor-pointer"
                    title={`Open ${sec.label}`}
                  >
                    <IconComponent
                      size={15}
                      className={`shrink-0 ${hasActiveChild ? 'text-amber-600' : 'text-[#666666]'}`}
                    />
                    <span className="truncate font-mono text-[11px] font-bold uppercase tracking-wide">
                      {sec.label}
                    </span>
                  </button>

                  {/* Accordion Expand/Collapse Toggle Chevron */}
                  <button
                    type="button"
                    id={`nav-group-toggle-${sec.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      sound.play('click');
                      onToggleGroup(sec.id);
                    }}
                    title={isOpen ? `Collapse ${sec.label} sub-menu` : `Expand ${sec.label} sub-menu`}
                    className="p-2 text-[#888888] hover:text-[#111111] hover:bg-neutral-200 transition-colors cursor-pointer"
                  >
                    {isOpen ? (
                      <ChevronDown size={14} className="text-[#111111]" />
                    ) : (
                      <ChevronRight size={14} />
                    )}
                  </button>
                </div>

                {/* Collapsible Sub-menu Items */}
                {isOpen && (
                  <div className="pl-4 pr-1 py-1 space-y-0.5 border-l-2 border-neutral-200 ml-3.5 my-0.5">
                    {sec.items.map((item) => {
                      const isCurrent = activeRoute === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          id={`subnav-item-${item.id}`}
                          onClick={() => handleItemClick(item.id)}
                          className={`w-full text-left px-2.5 py-1.5 text-[11px] font-mono block truncate transition-colors cursor-pointer border-l-2 ${
                            isCurrent
                              ? 'border-[#111111] text-[#111111] font-bold bg-[#f0f0f0]'
                              : 'border-transparent text-[#666666] hover:text-[#111111] hover:border-neutral-400 hover:bg-[#fafafa]'
                          }`}
                          title={item.label}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Floating Flyout Sub-menu (Rendered outside normal tree during collapsed rail mode) */}
        {isCollapsed && activeFlyout && (() => {
          const activeSection = OGAME_NAV_SECTIONS.find((s) => s.id === activeFlyout.id);
          if (!activeSection) return null;
          if (activeSection.id === 'admin' && !isAdminUser) return null;

          const SectionIcon = activeSection.icon;

          return (
            <div
              id="sidebar-floating-flyout"
              style={{ top: `${activeFlyout.top}px` }}
              className="fixed left-16 z-50 w-64 bg-white border-2 border-[#111111] shadow-2xl p-2.5 space-y-1 font-mono text-xs animate-in fade-in zoom-in-95 duration-100"
              onMouseEnter={() => {
                if (flyoutTimeoutRef.current) {
                  clearTimeout(flyoutTimeoutRef.current);
                  flyoutTimeoutRef.current = null;
                }
              }}
              onMouseLeave={handleFlyoutMouseLeave}
            >
              {/* Flyout Header */}
              <div className="p-2 bg-[#111111] text-white flex items-center justify-between border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <SectionIcon size={14} className="text-amber-400" />
                  <strong className="text-xs font-bold uppercase tracking-wider text-white">
                    {activeSection.label}
                  </strong>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    handleItemClick(activeSection.defaultRoute);
                    setActiveFlyout(null);
                  }}
                  className="text-[10px] text-amber-400 hover:underline cursor-pointer"
                >
                  Go →
                </button>
              </div>

              {/* Sub-menu Item List */}
              <div className="max-h-72 overflow-y-auto space-y-0.5 py-1">
                {activeSection.items.map((item) => {
                  const isCurrent = activeRoute === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        handleItemClick(item.id);
                        setActiveFlyout(null);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 text-[11px] block truncate transition-colors cursor-pointer ${
                        isCurrent
                          ? 'bg-amber-100 text-amber-950 font-bold border-l-2 border-amber-600'
                          : 'text-[#444444] hover:bg-neutral-100 hover:text-[#111111]'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* Sidebar Footer Controls */}
        <div id="sidebar-footer" className="border-t border-[#dedede] p-2.5 bg-[#fafafa] text-xs text-[#444444] space-y-2 pb-safe">
          {/* Sound toggle & System Status */}
          <div className={`flex items-center ${isCollapsed ? 'flex-col gap-2' : 'justify-between'}`}>
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {!isCollapsed && (
                <span className="text-[10px] font-mono font-medium text-[#444444]">
                  6 Turns/Min
                </span>
              )}
            </div>
            <button
              type="button"
              id="sound-toggle-btn"
              onClick={onToggleSound}
              title={soundEnabled ? 'Mute audio' : 'Unmute audio'}
              className="text-[#666666] hover:text-[#111111] p-1.5 hover:bg-neutral-200 transition-colors cursor-pointer border border-transparent hover:border-[#dedede]"
            >
              {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
            </button>
          </div>

          {/* Cloud Sync & Google Auth */}
          {!isCollapsed ? (
            <div className="border border-[#e5e5e5] bg-white p-2 space-y-1 font-mono text-[10px]">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-bold text-[#555555]">
                  <Cloud size={11} className={authUser ? 'text-emerald-600' : 'text-neutral-400'} />
                  <span>CLOUD SYNC</span>
                </span>
                <span className={authUser ? 'text-emerald-600 font-bold' : 'text-neutral-500'}>
                  {authUser ? 'ONLINE' : 'LOCAL'}
                </span>
              </div>
              {!authUser ? (
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      sound.play('confirm');
                      await loginWithGoogle();
                    } catch (e) {
                      sound.play('warning');
                    }
                  }}
                  className="w-full py-1 px-2 bg-[#111111] hover:bg-neutral-800 text-white font-bold text-[10px] tracking-wider uppercase transition-colors cursor-pointer text-center"
                >
                  Sign In (Sync DB)
                </button>
              ) : (
                <div className="text-[9px] text-[#777777] truncate">
                  {authUser.email}
                </div>
              )}
            </div>
          ) : (
            <div className="flex justify-center">
              <span
                title={`Cloud status: ${authUser ? 'Online (' + authUser.email + ')' : 'Local'}`}
                className="p-1 text-[#666]"
              >
                <Cloud size={14} className={authUser ? 'text-emerald-600' : 'text-neutral-400'} />
              </span>
            </div>
          )}

          {/* Logout Button */}
          {onLogout && (
            <button
              type="button"
              id="sidebar-logout-btn"
              onClick={() => {
                sound.play('click');
                onLogout();
              }}
              className={`w-full flex items-center justify-center gap-1.5 px-2 py-1.5 text-xs font-mono font-bold text-[#b91c1c] border border-[#fecaca] bg-[#fef2f2] hover:bg-[#b91c1c] hover:text-white transition-colors cursor-pointer ${
                isCollapsed ? 'p-1.5' : ''
              }`}
              title="Log out of champion realm"
            >
              <LogOut size={13} />
              {!isCollapsed && <span>LOGOUT</span>}
            </button>
          )}
        </div>
      </aside>
    </>
  );
};
