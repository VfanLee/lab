const recordVideo = document.querySelector('#record-video')

let mediaRecorder = null
let chunks = []

export function startRecord(mediaStream) {
  mediaRecorder = new MediaRecorder(mediaStream)

  mediaRecorder.start()

  mediaRecorder.addEventListener('start', e => {
    console.log('开始录制', e)
  })

  mediaRecorder.addEventListener('stop', e => {
    console.log('结束录制', e)
    const blob = new Blob(chunks)
    chunks = []
    recordVideo.src = URL.createObjectURL(blob)
  })

  mediaRecorder.addEventListener('dataavailable', e => {
    console.log('录制数据', e)
    chunks.push(e.data)
  })
}

export function stopRecord() {
  mediaRecorder.stop()
}
