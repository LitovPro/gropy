import ruTranslations from './ru.json'
import enTranslations from './en.json'

export type Locale = 'ru' | 'en'

export const translations = {
  ru: ruTranslations,
  en: enTranslations,
} as const

export type TranslationKey = keyof typeof ruTranslations

class I18n {
  private locale: Locale = 'ru'

  constructor() {
    this.detectLocale()
  }

  private detectLocale() {
    // Check Telegram WebApp language
    const tgLang = (window as { Telegram?: { WebApp?: { initDataUnsafe?: { user?: { language_code?: string } } } } }).Telegram?.WebApp?.initDataUnsafe?.user?.language_code
    if (tgLang && (tgLang.startsWith('en') || tgLang.startsWith('ru'))) {
      this.locale = tgLang.startsWith('en') ? 'en' : 'ru'
      return
    }

    // Check browser language
    const browserLang = navigator.language
    if (browserLang.startsWith('en')) {
      this.locale = 'en'
    } else {
      this.locale = 'ru'
    }
  }

  setLocale(locale: Locale) {
    this.locale = locale
    localStorage.setItem('gropy-locale', locale)
  }

  getLocale(): Locale {
    return this.locale
  }

  t(key: TranslationKey, params?: Record<string, string | number>): string {
    let translation = translations[this.locale][key] || translations.ru[key] || key

    if (params) {
      Object.entries(params).forEach(([paramKey, value]) => {
        translation = translation.replace(`{${paramKey}}`, String(value))
      })
    }

    return translation
  }
}

export const i18n = new I18n()

// Load saved locale
const savedLocale = localStorage.getItem('gropy-locale') as Locale
if (savedLocale && (savedLocale === 'ru' || savedLocale === 'en')) {
  i18n.setLocale(savedLocale)
}




