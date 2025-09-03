/**
 * Telegram Web App интеграция для Gropy
 */

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
        expand: () => void;
        close: () => void;
        MainButton: {
          text: string;
          color: string;
          textColor: string;
          isVisible: boolean;
          isActive: boolean;
          show: () => void;
          hide: () => void;
          enable: () => void;
          disable: () => void;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
        };
        BackButton: {
          isVisible: boolean;
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
        };
        HapticFeedback: {
          impactOccurred: (style: 'light' | 'medium' | 'heavy') => void;
          notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
          selectionChanged: () => void;
        };
        themeParams: {
          bg_color?: string;
          text_color?: string;
          hint_color?: string;
          link_color?: string;
          button_color?: string;
          button_text_color?: string;
          secondary_bg_color?: string;
        };
        colorScheme: 'light' | 'dark';
        isExpanded: boolean;
        viewportHeight: number;
        viewportStableHeight: number;
        initData: string;
        initDataUnsafe: any;
      };
    };
  }
}

export class TelegramWebApp {
  private static instance: TelegramWebApp;
  private webApp: any;
  
  private constructor() {
    this.webApp = window.Telegram?.WebApp;
  }
  
  public static getInstance(): TelegramWebApp {
    if (!TelegramWebApp.instance) {
      TelegramWebApp.instance = new TelegramWebApp();
    }
    return TelegramWebApp.instance;
  }
  
  public isAvailable(): boolean {
    return !!this.webApp;
  }
  
  public init(): void {
    if (this.webApp) {
      this.webApp.ready();
      this.webApp.expand();
      
      // Настраиваем главную кнопку
      this.webApp.MainButton.hide();
      
      // Настраиваем кнопку назад
      this.webApp.BackButton.hide();
    }
  }
  
  public getTheme(): 'light' | 'dark' {
    return this.webApp?.colorScheme || 'light';
  }
  
  public getThemeParams() {
    return this.webApp?.themeParams || {};
  }
  
  public hapticFeedback(type: 'light' | 'medium' | 'heavy' | 'success' | 'error' | 'warning' | 'selection') {
    if (!this.webApp?.HapticFeedback) return;
    
    switch (type) {
      case 'light':
      case 'medium': 
      case 'heavy':
        this.webApp.HapticFeedback.impactOccurred(type);
        break;
      case 'success':
      case 'error':
      case 'warning':
        this.webApp.HapticFeedback.notificationOccurred(type);
        break;
      case 'selection':
        this.webApp.HapticFeedback.selectionChanged();
        break;
    }
  }
  
  public showMainButton(text: string, callback: () => void): void {
    if (this.webApp?.MainButton) {
      this.webApp.MainButton.text = text;
      this.webApp.MainButton.show();
      this.webApp.MainButton.enable();
      this.webApp.MainButton.onClick(callback);
    }
  }
  
  public hideMainButton(): void {
    if (this.webApp?.MainButton) {
      this.webApp.MainButton.hide();
    }
  }
  
  public showBackButton(callback: () => void): void {
    if (this.webApp?.BackButton) {
      this.webApp.BackButton.show();
      this.webApp.BackButton.onClick(callback);
    }
  }
  
  public hideBackButton(): void {
    if (this.webApp?.BackButton) {
      this.webApp.BackButton.hide();
    }
  }
  
  public close(): void {
    if (this.webApp) {
      this.webApp.close();
    }
  }
}

// Хук для использования Telegram Web App
export const useTelegramWebApp = () => {
  const twa = TelegramWebApp.getInstance();
  
  React.useEffect(() => {
    if (twa.isAvailable()) {
      twa.init();
      
      // Применяем тему из Telegram
      const telegramTheme = twa.getTheme();
      // Здесь можно автоматически переключить тему приложения
    }
  }, []);
  
  return {
    isAvailable: twa.isAvailable(),
    hapticFeedback: twa.hapticFeedback.bind(twa),
    showMainButton: twa.showMainButton.bind(twa),
    hideMainButton: twa.hideMainButton.bind(twa),
    showBackButton: twa.showBackButton.bind(twa),
    hideBackButton: twa.hideBackButton.bind(twa),
    getTheme: twa.getTheme.bind(twa),
    close: twa.close.bind(twa),
  };
};
