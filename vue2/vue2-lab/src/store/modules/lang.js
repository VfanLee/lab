import i18n from '@/i18n'
import router from '@/router'
import { setCacheLang, setPageProperty, setVantLang } from '@/utils/lang'

// --- init ---
const i18nLocale = i18n.locale
setPageProperty(i18nLocale)
setVantLang(i18nLocale)
// --- init ---

const state = {
  currentLang: i18nLocale
}

const mutations = {
  SET_LANG(state, lang) {
    state = lang
  }
}

const actions = {
  setLang({ commit }, lang) {
    i18n.locale = lang
    setPageProperty(lang)
    setVantLang(lang)
    commit('SET_LANG', lang)
    setCacheLang(lang)
    document.title = i18n.t(router.currentRoute.meta.title)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
