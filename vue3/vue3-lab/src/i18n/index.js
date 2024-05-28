import { createI18n } from 'vue-i18n'
import { getCacheLang, setCacheLang } from '@/utils/lang'
import zh from './lang/zh.json'
import en from './lang/en.json'
import ar from './lang/ar.json'

const messages = {
  zh,
  en,
  ar
}

function getDefaultLang() {
  const cacheLang = getCacheLang()
  if (cacheLang) {
    return cacheLang
  }

  const browserLang = navigator.language.toLowerCase()
  const supportLangs = Object.keys(messages)
  for (const lang of supportLangs) {
    if (browserLang.includes(lang)) {
      setCacheLang(lang)
      return lang
    }
  }

  setCacheLang('en')
  return 'en'
}

const i18n = createI18n({
  legacy: false,
  locale: getDefaultLang(),
  fallbackLocale: 'zh',
  messages
})

export default i18n
