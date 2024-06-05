import { Locale } from 'vant'
import vantZhCN from 'vant/es/locale/lang/zh-CN'
import vantEnUS from 'vant/es/locale/lang/en-US'

export const getCacheLang = () => {
  const lang = localStorage.getItem('lang')
  return lang
}

export const setCacheLang = lang => {
  localStorage.setItem('lang', lang)
}

// lang 参考：https://www.w3schools.com/tags/ref_language_codes.asp
const PAGE_LANG = {
  zh: 'zh',
  en: 'en',
  ar: 'ar'
}

export const setPageProperty = lang => {
  if (lang === 'ar') {
    document.documentElement.dir = 'rtl'
  } else {
    document.documentElement.dir = 'ltr'
  }

  document.documentElement.lang = PAGE_LANG[lang]
}

// vant 国际化：https://vant-contrib.gitee.io/vant/v2/#/zh-CN/locale
const VANT_LOCALE = {
  zh: vantZhCN,
  en: vantEnUS,
  ar: vantEnUS // 语言不支持：https://github.com/youzan/vant/pull/7245
}

export const setVantLang = lang => {
  Locale.use(lang, VANT_LOCALE[lang])
}
