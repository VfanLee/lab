import constraints from './constraints.js'
import { startRecord, stopRecord } from './recording.js'

const videoPlayer = document.querySelector('#video')
const audioinputSelector = document.querySelector('select#audioinput')
const audiooutptSelector = document.querySelector('select#audiooutput')
const videoinputSelector = document.querySelector('select#videoinput')
const frameRateSelector = document.querySelector('select#frameRate')
const resolutionSelector = document.querySelector('select#resolution')
const mediaCaptureBtn = document.querySelector('#media-capture-btn')
const screenCaptureBtn = document.querySelector('#screen-capture-btn')
const stopCaptureBtn = document.querySelector('#stop-capture-btn')
const screenshotBtn = document.querySelector('#screenshot-btn')
const screenshotModeSelector = document.querySelector('select#screenshot-mode')
const screenshotContainer = document.querySelector('.screenshot-container')

let mediaStream = null

updateDevices()

// 监听设备更改
navigator.mediaDevices.addEventListener('devicechange', e => {
  updateDevices()
})

// 媒体采集
mediaCaptureBtn.addEventListener('click', async () => {
  loadMedia()
})

// 屏幕采集
screenCaptureBtn.addEventListener('click', async () => {
  mediaStream = await navigator.mediaDevices.getDisplayMedia(constraints)
  videoPlayer.srcObject = mediaStream
})

// 停止采集
stopCaptureBtn.addEventListener('click', async () => {
  mediaStream.getTracks().forEach(track => {
    track.stop()
  })
  mediaStream = null
  videoPlayer.srcObject = null
})

let screenshotMode = ''
screenshotModeSelector.addEventListener('change', e => {
  screenshotMode = e.target.value
})
// 截图
screenshotBtn.addEventListener('click', async () => {
  if (!mediaStream) {
    return
  }
  screenshotContainer.innerHTML = ''
  const canvas = document.createElement('canvas')
  canvas.id = 'canvas'
  canvas.width = videoPlayer.videoWidth
  canvas.height = videoPlayer.videoHeight
  const ctx = canvas.getContext('2d')
  ctx.filter = screenshotMode
  console.log(screenshotMode)
  ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height)
  screenshotContainer.appendChild(canvas)
})

// 加载媒体
async function loadMedia() {
  try {
    mediaStream = await navigator.mediaDevices.getUserMedia(constraints)
    videoPlayer.srcObject = mediaStream
  } catch (error) {
    console.error(error)
  }
}

async function updateDevices() {
  videoinputSelector.innerHTML = ''
  audioinputSelector.innerHTML = ''
  audiooutptSelector.innerHTML = ''

  const { videoinputDevices, audioinputDevices, audiooutputDevices } = await getConnectedDevices()
  videoinputDevices.forEach(d => {
    const option = document.createElement('option')
    option.value = d.deviceId
    option.label = d.label
    videoinputSelector.appendChild(option)
  })
  audioinputDevices.forEach(d => {
    const option = document.createElement('option')
    option.value = d.deviceId
    option.label = d.label
    audioinputSelector.appendChild(option)
  })
  audiooutputDevices.forEach(d => {
    const option = document.createElement('option')
    option.value = d.deviceId
    option.label = d.label
    audiooutptSelector.appendChild(option)
  })
}

// 查询媒体设备
async function getConnectedDevices() {
  const devices = await navigator.mediaDevices.enumerateDevices()
  const videoinputDevices = devices.filter(device => device.kind === 'videoinput')
  const audioinputDevices = devices.filter(device => device.kind === 'audioinput')
  const audiooutputDevices = devices.filter(device => device.kind === 'audiooutput')
  return {
    videoinputDevices,
    audioinputDevices,
    audiooutputDevices
  }
}

const startRecordBtn = document.querySelector('#start-record-btn')
const stopRecordBtn = document.querySelector('#stop-record-btn')

startRecordBtn.addEventListener('click', () => {
  if (!mediaStream) {
    return
  }
  startRecord(mediaStream)
})

stopRecordBtn.addEventListener('click', () => {
  if (!mediaStream) {
    return
  }
  stopRecord()
})
