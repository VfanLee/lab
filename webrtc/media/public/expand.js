// 截图
document.querySelector('#screenshot').addEventListener('click', e => {
  const screenshotMode = document.querySelector('#screenshot-mode').value

  const screenshotContainer = document.querySelector('#screenshot-container')
  screenshotContainer.innerHTML = ''

  const canvas = document.createElement('canvas')
  canvas.id = 'canvas'
  canvas.width = myVideo.videoWidth
  canvas.height = myVideo.videoHeight
  const ctx = canvas.getContext('2d')
  ctx.filter = screenshotMode
  console.log(screenshotMode)
  ctx.drawImage(myVideo, 0, 0, canvas.width, canvas.height)

  screenshotContainer.appendChild(canvas)
})
