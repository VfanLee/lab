const lightBtn = document.getElementById('theme__btn--light')
const darkBtn = document.getElementById('theme__btn--dark')

// 切换 light 主题
lightBtn.addEventListener('click', () => {
  document.documentElement.className = 'light'
})

// 切换 dark 主题
darkBtn.addEventListener('click', () => {
  document.documentElement.className = 'dark'
})
