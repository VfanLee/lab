const myVideo = document.querySelector('#my-video')
const otherVideo = document.querySelector('#other-video')

const audioInputEl = document.querySelector('#audio-input')
const audioOutputEl = document.querySelector('#audio-output')
const videoInputEl = document.querySelector('#video-input')

let stream
const constraints = {
  audio: true,
  video: true,
}
// 分享我的麦克风和摄像头
document.querySelector('#share').addEventListener('click', async e => {
  try {
    stream = await navigator.mediaDevices.getUserMedia(constraints)
    console.log(stream)

    const tracks = stream.getTracks()
    console.log(tracks)
  } catch (error) {
    console.log(error)
  }
})

let options = {
  video: true,
  audio: true,
}
// 共享屏幕
document.querySelector('#share-screen').addEventListener('click', async e => {
  try {
    stream = await navigator.mediaDevices.getDisplayMedia(options)
    console.log(screenStream)
  } catch (error) {
    console.log(error)
  }
})

// 显示我的视频
document.querySelector('#show-video').addEventListener('click', e => {
  myVideo.srcObject = stream
})

// 停止我的视频
document.querySelector('#stop-video').addEventListener('click', e => {
  const tracks = stream.getTracks()
  tracks.forEach(track => {
    console.log('关闭轨道', track)
    track.stop()
  })
})

// 更改屏幕尺寸
document.querySelector('#change-size').addEventListener('click', e => {
  console.log('getSupportedConstraints():', navigator.mediaDevices.getSupportedConstraints())

  stream.getTracks().forEach(track => {
    console.log('track', track)
    console.log('getConstraints()', track.getConstraints())
    console.log('getCapabilities()', track.getCapabilities())

    if (track.kind === 'video') {
      const width = +document.querySelector('#vid-width').value
      const height = +document.querySelector('#vid-height').value

      track.applyConstraints({
        width,
        height,
      })
    }
  })
})

let mediaRecorder = null
let recordBlobs = []
// 开始录制
document.querySelector('#start-record').addEventListener('click', e => {
  console.log('开始录制')
  recordBlobs = []
  mediaRecorder = new MediaRecorder(stream)
  mediaRecorder.ondataavailable = e => {
    recordBlobs.push(e.data)
  }
  mediaRecorder.start()
})

// 停止录制
document.querySelector('#stop-record').addEventListener('click', e => {
  console.log('停止录制')
  mediaRecorder.stop()
})

// 播放录制
document.querySelector('#play-record').addEventListener('click', e => {
  console.log('播放录制')
  const buffer = new Blob(recordBlobs)
  otherVideo.src = URL.createObjectURL(buffer)
  otherVideo.controls = true
  otherVideo.play()
})

// 获取输入/输出设备
async function getDevices() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices()
    console.log('devices', devices)

    devices.forEach(device => {
      const option = document.createElement('option')
      option.value = device.deviceId
      option.label = device.label

      if (device.kind === 'audioinput') {
        audioInputEl.appendChild(option)
      } else if (device.kind === 'audiooutput') {
        audioOutputEl.appendChild(option)
      } else if (device.kind === 'videoinput') {
        videoInputEl.appendChild(option)
      }
    })
  } catch (error) {
    console.log(error)
  }
}

// 获取设备
getDevices()

audioInputEl.addEventListener('change', async e => {
  const deviceId = e.target.value
  console.log(deviceId)

  const constraints = {
    audio: { deviceId: { exact: deviceId } },
    video: true,
  }

  try {
    stream = await navigator.mediaDevices.getUserMedia(constraints)
    console.log(stream)
    const tracks = stream.getAudioTracks()
    console.log(tracks)
  } catch (error) {
    console.log(error)
  }
})

audioOutputEl.addEventListener('change', async e => {
  await myVideo.setSinkId(e.target.value)
  console.log('音频输出设备已切换')
})

videoInputEl.addEventListener('change', async e => {
  const deviceId = e.target.value
  console.log(deviceId)

  const constraints = {
    audio: true,
    video: { deviceId: { exact: deviceId } },
  }

  try {
    stream = await navigator.mediaDevices.getUserMedia(constraints)
    console.log(stream)
    const tracks = stream.getVideoTracks()
    console.log(tracks)
  } catch (error) {
    console.log(error)
  }
})
