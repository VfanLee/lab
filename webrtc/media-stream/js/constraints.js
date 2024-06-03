const audioinputSelector = document.querySelector('select#audioinput')
const audiooutptSelector = document.querySelector('select#audiooutput')
const videoinputSelector = document.querySelector('select#videoinput')
const frameRateSelector = document.querySelector('select#frameRate')
const resolutionSelector = document.querySelector('select#resolution')
const playerParams = document.querySelector('#player-params')

const audioConstraints = {
  audioDeviceId: 'default',
  echoCancellation: true
}

const videoConstraints = {
  videoDeviceId: 'default',
  frameRate: '60',
  width: '320',
  height: '180'
}

const constraints = {
  audio: audioConstraints,
  video: videoConstraints
}

updatePlayerParams()

function updatePlayerParams() {
  playerParams.innerHTML = ''
  playerParams.innerHTML = `<strong>音频配置: </strong>

${JSON.stringify(audioConstraints, null, 2)}

<strong>视频配置: </strong>

${JSON.stringify(videoConstraints, null, 2)}
`
}

// 音频输入
audioinputSelector.addEventListener('change', e => {
  audioConstraints.audioDeviceId = e.target.value
  updatePlayerParams()
})

// 视频输入
videoinputSelector.addEventListener('change', e => {
  videoConstraints.videoDeviceId = e.target.value
  updatePlayerParams()
})

// 视频帧率
frameRateSelector.addEventListener('change', e => {
  videoConstraints.frameRate = e.target.value
  updatePlayerParams()
})

// 视频分辨率
resolutionSelector.addEventListener('change', e => {
  videoConstraints.width = e.target.value.split('x')[0]
  videoConstraints.height = e.target.value.split('x')[1]
  updatePlayerParams()
})

export default constraints
