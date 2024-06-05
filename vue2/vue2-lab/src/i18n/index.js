import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { getCacheLang, setCacheLang } from '@/utils/lang'
import zh from './lang/zh.json'
import en from './lang/en.json'
import ar from './lang/ar.json'
import elementZh from 'element-ui/lib/locale/lang/zh-CN'
import elementEn from 'element-ui/lib/locale/lang/en'
import elementAr from 'element-ui/lib/locale/lang/ar'

Vue.use(VueI18n)

const messages = {
  zh: {
    ...zh,
    ...elementZh
  },
  en: {
    ...en,
    ...elementEn
  },
  ar: {
    ...ar,
    ...elementAr
  }
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

const i18n = new VueI18n({
  locale: getDefaultLang(),
  fallbackLocale: 'zh',
  messages
})

export default i18n
