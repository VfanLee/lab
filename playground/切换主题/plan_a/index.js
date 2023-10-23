const lightBtn = document.getElementById('theme__btn--light')
const darkBtn = document.getElementById('theme__btn--dark')

// 切换 light 主题
lightBtn.addEventListener('click', () => {
  document.querySelector('link#theme').setAttribute('href', './theme/light.css')
})

// 切换 dark 主题
darkBtn.addEventListener('click', () => {
  document.querySelector('link#theme').setAttribute('href', './theme/dark.css')
})
