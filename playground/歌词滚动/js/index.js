/**
 * 将事件字符串解析为秒
 * @param {string} time 时间字符串
 * @returns
 */
function parseTime(timeStr) {
  const parts = timeStr.slice(1).split(':')
  return +parts[0] * 60 + +parts[1]
}

/**
 * 将 lrc 歌词解析为歌词对象
 * @param {string} lrcStr lrc 歌词
 * @returns
 */
function parseLRC(lrcStr) {
  const lines = lrcStr.split('\n')
  let result = []
  result = lines.map(x => {
    const parts = x.split(']')
    return {
      time: parseTime(parts[0]),
      words: parts[1]
    }
  })
  return result
}

const lrcData = parseLRC(lrc)

const doms = {
  player: document.querySelector('.player'),
  lrcList: document.querySelector('.lrc-list'),
  container: document.querySelector('.container')
}

/**
 * 找到当前播放器播放到第几句（拿到正在播放歌词的下标）
 * @returns
 */
function findIndex() {
  const currentTime = doms.player.currentTime
  for (let i = 0; i < lrcData.length; i++) {
    if (currentTime < lrcData[i].time) {
      return i - 1
    }
  }
  return lrcData.length - 1
}

/**
 * 创建歌词元素
 */
function createLRCElements() {
  const frag = document.createDocumentFragment()
  lrcData.forEach(x => {
    const li = document.createElement('li')
    li.textContent = x.words
    frag.appendChild(li)
  })
  doms.lrcList.appendChild(frag)
}

createLRCElements()

const containerHeight = doms.container.clientHeight
const liHeight = doms.lrcList.querySelector('li').clientHeight

function setOffset() {
  const index = findIndex()
  const offsetHeight = liHeight * index + liHeight / 2 - containerHeight / 2
  doms.lrcList.style.transform = `translateY(${-offsetHeight}px)`
  let li = doms.lrcList.querySelector('.active')
  li && li.classList.remove('active') // 去掉之前激活歌词的状态
  li = doms.lrcList.children[index] // 重新获取当前播放歌词
  li && li.classList.add('active') // 激活当前歌词
}

doms.player.addEventListener('timeupdate', setOffset)
