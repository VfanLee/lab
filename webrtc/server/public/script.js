const videoPlayer = document.querySelector('#video')
const audioinputSelector = document.querySelector('select#audioinput')
const audiooutptSelector = document.querySelector('select#audiooutput')
const videoinputSelector = document.querySelector('select#videoinput')
const frameRateSelector = document.querySelector('select#frameRate')
const resolutionSelector = document.querySelector('select#resolution')
const shareScreenBtn = document.querySelector('#share-screen-btn')

init()

function init() {
  updateDevices()
  loadMedia()

  audioinputSelector.addEventListener('change', e => {
    loadMedia({ audioDeviceId: e.target.value })
  })

  videoinputSelector.addEventListener('change', e => {
    loadMedia({ videoDeviceId: e.target.value })
  })

  frameRateSelector.addEventListener('change', e => {
    loadMedia({ frameRate: e.target.value })
  })
  resolutionSelector.addEventListener('change', e => {
    const [width, height] = e.target.value.split('x')
    loadMedia({ width, height })
  })

  // 监听设备更改
  navigator.mediaDevices.addEventListener('devicechange', e => {
    updateDevices()
  })

  // 共享屏幕
  shareScreenBtn.addEventListener('click', async () => {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia({ audio: true, video: true })
    videoPlayer.srcObject = mediaStream

    mediaStream.addEventListener('inactive', e => {
      loadMedia()
    })
  })
}

// 本地播放
async function loadMedia(settings) {
  const defaultOptions = {
    audioDeviceId: 'default',
    videoDeviceId: 'default',
    frameRate: '60',
    width: '1280',
    height: '720'
  }
  const options = {
    ...defaultOptions,
    ...settings
  }
  const constraints = {
    // 输入音频设备
    audio: {
      deviceId: {
        exact: options.audioDeviceId
      },
      echoCancellation: true
    },
    // 输入视频设备
    video: {
      exact: options.videoDeviceId,
      frameRate: options.frameRate,
      width: {
        exact: options.width
      },
      height: {
        exact: options.height
      }
    }
  }
  try {
    const mediaStream = await navigator.mediaDevices.getUserMedia(constraints)
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
