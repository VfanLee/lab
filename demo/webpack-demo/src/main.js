import { camelCase } from 'lodash'
import { randomColor } from '@/utils'
import imgUrl from '@/assets/images/logo.png'

import 'normalize.css'
import '@/styles/index.scss'

// 测试
debugger
console.log('main.js 加载成功')
// 测试

const App = function () {
  const container = document.createElement('div')
  container.id = 'app'

  const titleElement = document.createElement('h1')
  titleElement.style.backgroundImage = `linear-gradient(to right, ${randomColor()}, ${randomColor()})`
  titleElement.classList.add('title')
  titleElement.innerText = camelCase('_Webpack_Demo_')
  container.appendChild(titleElement)

  const iconElement = document.createElement('div')
  iconElement.classList.add('example')
  iconElement.classList.add('icon')
  iconElement.innerHTML = `
    <span>字体图标: </span>
    <i class="iconfont icon-github"></i>
  `
  container.appendChild(iconElement)

  const imageElement = document.createElement('div')
  imageElement.classList.add('example')
  imageElement.classList.add('image')
  imageElement.innerHTML = `
    <span>静态图片: </span>
    <img src=${imgUrl} alt="logo" />
  `
  container.appendChild(imageElement)

  return container
}

document.body.appendChild(App())
