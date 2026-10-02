export interface ThemeDefinition {
  id: string;
  name: string;
  description: string;
  bodyFont: string;
  displayFont: string;
  cssClass: string;
  badgeColor: string;
  previewColors: {
    background: string;
    surface: string;
    border: string;
    accent: string;
    text: string;
  };
}

export const THEMES: ThemeDefinition[] = [
  {
    id: 'theme_classic',
    name: 'Classic',
    description: 'Bootstrap-inspired neutral surfaces with a crisp blue accent.',
    bodyFont: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    displayFont: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    cssClass: 'theme-classic',
    badgeColor: '#0d6efd',
    previewColors: {
      background: '#ffffff',
      surface: '#ffffff',
      border: '#ced4da',
      accent: '#0d6efd',
      text: '#212529',
    },
  },
  {
    id: 'theme_dusk',
    name: 'Dusk',
    description: 'A low-light command room with warm brass highlights.',
    bodyFont: '"DM Sans", sans-serif',
    displayFont: '"Space Grotesk", sans-serif',
    cssClass: 'theme-dusk',
    badgeColor: '#d69b67',
    previewColors: {
      background: '#171b20',
      surface: '#252c32',
      border: '#3e474d',
      accent: '#d69b67',
      text: '#f0eee8',
    },
  },
  {
    id: 'theme_grimoire',
    name: 'Grimoire',
    description: 'A shadowed spellbook in evergreen ink and old gold.',
    bodyFont: '"Crimson Pro", serif',
    displayFont: '"Cinzel", serif',
    cssClass: 'theme-grimoire',
    badgeColor: '#d5b66b',
    previewColors: {
      background: '#171d18',
      surface: '#252d24',
      border: '#46513e',
      accent: '#d5b66b',
      text: '#f0ead9',
    },
  },
  {
    id: 'theme_frost',
    name: 'Frost',
    description: 'An airy icebound atlas with clear blue-green accents.',
    bodyFont: '"DM Sans", sans-serif',
    displayFont: '"Space Grotesk", sans-serif',
    cssClass: 'theme-frost',
    badgeColor: '#398ca2',
    previewColors: {
      background: '#e9f1f4',
      surface: '#fbfdff',
      border: '#c7d8de',
      accent: '#398ca2',
      text: '#20343b',
    },
  },
  {
    id: 'theme_parchment',
    name: 'Parchment',
    description: 'A sunlit chronicle in vellum, walnut ink, and forest green.',
    bodyFont: '"Crimson Pro", serif',
    displayFont: '"Cinzel", serif',
    cssClass: 'theme-parchment',
    badgeColor: '#805a31',
    previewColors: {
      background: '#eee4ce',
      surface: '#fff8e8',
      border: '#d3c3a4',
      accent: '#805a31',
      text: '#30291e',
    },
  },
];

export const STORAGE_KEY_THEME = 'uc_active_app_theme';

const LEGACY_THEME_IDS: Record<string, string> = {
  theme_white_default: 'theme_classic',
  theme_navy_dark: 'theme_dusk',
  theme_imperial_obsidian: 'theme_grimoire',
};

function normalizeThemeId(themeId: string): string {
  const normalizedId = LEGACY_THEME_IDS[themeId] || themeId;
  return THEMES.some((theme) => theme.id === normalizedId) ? normalizedId : 'theme_classic';
}

export function getActiveThemeId(): string {
  if (typeof window === 'undefined') return 'theme_classic';
  return normalizeThemeId(localStorage.getItem(STORAGE_KEY_THEME) || 'theme_classic');
}

export function setActiveThemeId(themeId: string): void {
  if (typeof window === 'undefined') return;
  const normalizedId = normalizeThemeId(themeId);
  localStorage.setItem(STORAGE_KEY_THEME, normalizedId);
  applyThemeToDOM(normalizedId);
}

export function applyThemeToDOM(themeId: string): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  THEMES.forEach((theme) => root.classList.remove(theme.cssClass));
  const active = THEMES.find((theme) => theme.id === normalizeThemeId(themeId)) || THEMES[0];
  root.classList.add(active.cssClass);
}
