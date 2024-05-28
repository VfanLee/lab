import { ref } from 'vue'
import { defineStore } from 'pinia'
import i18n from '@/i18n'
import router from '@/router'
import { setCacheLang, setPageProperty, setVantLang } from '@/utils/lang'

const useLangStore = defineStore('lang', () => {
  // --- init ---
  const i18nLocale = i18n.global.locale.value
  setPageProperty(i18nLocale)
  setVantLang(i18nLocale)
  const currentLang = ref(i18nLocale)
  // --- init ---

  const setLang = lang => {
    i18n.global.locale.value = lang
    currentLang.value = lang
    setPageProperty(lang)
    setVantLang(lang)
    setCacheLang(lang)
    document.title = i18n.global.t(router.currentRoute.value.meta.title)
  }

  return { currentLang, setLang }
})

export default useLangStore
