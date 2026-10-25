/**
 * EasyBPLog IT Ad Banner Configuration
 */

export const AD_BANNER_ENABLED = true;

export interface CustomAdItem {
  id: string;
  title: string;
  subtitle: string;
  imageUrl?: string;
  linkUrl: string;
  tag: 'PR' | 'Ad' | 'Sponsored';
  ctaText?: string;
}

export interface AdConfig {
  defaultEnabled: boolean;
  adMode: 'placeholder' | 'custom' | 'script';
  allowDismiss: boolean;
  scriptSettings: {
    client?: string;
    slot?: string;
    adFormat?: string;
  };
  customAds: CustomAdItem[];
}

export const DEFAULT_AD_CONFIG: AdConfig = {
  defaultEnabled: AD_BANNER_ENABLED,
  adMode: 'script',
  allowDismiss: false,
  scriptSettings: {
    client: 'ca-pub-5353304887278086',
    slot: '',
    adFormat: 'horizontal',
  },
  customAds: [
    {
      id: 'ad-bp-monitor-it-1',
      title: 'Misuratori di Pressione da Braccio Validati',
      subtitle: 'Precisione clinica per l’automisurazione domiciliare con ampio display',
      linkUrl: 'https://example.com/blood-pressure-monitors',
      tag: 'PR',
      ctaText: 'Scopri di più',
    },
    {
      id: 'ad-salt-reduction-it-2',
      title: 'Ricette Mediterranee a Basso Contenuto di Sodio',
      subtitle: 'Gusto e salute per aiutare a mantenere la pressione nei valori ottimali',
      linkUrl: 'https://example.com/low-sodium-foods',
      tag: 'Sponsored',
      ctaText: 'Vedi guida',
    },
    {
      id: 'ad-clinic-guide-it-3',
      title: 'Come Prepararsi alla Visita Cardiologica',
      subtitle: 'Consigli pratici per presentare il diario pressorio al proprio medico',
      linkUrl: 'https://example.com/hypertension-guide',
      tag: 'PR',
      ctaText: 'Leggi',
    },
  ],
};

const STORAGE_KEY_CREATOR_OVERRIDE = 'easybplog_it_creator_ad_override_v1';
const STORAGE_KEY_MODE = 'easybplog_it_ad_banner_mode_v1';

export function isAdBannerEnabled(): boolean {
  try {
    const override = localStorage.getItem(STORAGE_KEY_CREATOR_OVERRIDE);
    if (override !== null) {
      return override === 'true';
    }
  } catch (e) {
    console.warn('Failed to read creator ad override:', e);
  }
  return AD_BANNER_ENABLED;
}

export function setCreatorAdOverride(enabled: boolean): void {
  try {
    localStorage.setItem(STORAGE_KEY_CREATOR_OVERRIDE, String(enabled));
  } catch (e) {
    console.warn('Failed to set creator ad override:', e);
  }
}

export function resetCreatorAdOverride(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_CREATOR_OVERRIDE);
  } catch (e) {
    console.warn('Failed to reset creator ad override:', e);
  }
}

export function getAdBannerMode(): 'placeholder' | 'custom' | 'script' {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_MODE);
    if (saved === 'placeholder' || saved === 'custom' || saved === 'script') {
      return saved;
    }
  } catch (e) {
    console.warn('Failed to read ad banner mode:', e);
  }
  return DEFAULT_AD_CONFIG.adMode;
}

export function setAdBannerMode(mode: 'placeholder' | 'custom' | 'script'): void {
  try {
    localStorage.setItem(STORAGE_KEY_MODE, mode);
  } catch (e) {
    console.warn('Failed to write ad banner mode:', e);
  }
}
