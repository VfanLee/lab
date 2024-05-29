import { ref } from 'vue'
import { defineStore } from 'pinia'

function switchTheme(theme) {
  const themeList = ['light', 'dark', 'lred', 'dred']
  themeList.forEach(x => {
    document.documentElement.classList.remove(x)
  })
  document.documentElement.classList.add(theme)
  sessionStorage.setItem('theme', theme)
}

const useThemeStore = defineStore('theme', () => {
  const cacheTheme = sessionStorage.getItem('theme') || 'light'
  const theme = ref(cacheTheme)
  switchTheme(cacheTheme)

  const setTheme = value => {
    theme.value = value
    switchTheme(value)
  }

  return { theme, setTheme }
})

export default useThemeStore
