const localVideo = document.querySelector('#local-video')
const remoteVideo = document.querySelector('#remote-video')

const startBtn = document.querySelector('#start')
const callBtn = document.querySelector('#call')
const hangUpBtn = document.querySelector('#hang-up')

const offerPre = document.querySelector('#offer')
const answerPre = document.querySelector('#answer')

let localStream
let pc1
let pc2

// start
startBtn.addEventListener('click', async e => {
  const constraints = {
    audio: false,
    video: true,
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints)
    getMediaStream(stream)
  } catch (error) {
    console.log(error)
  }
})

function getMediaStream(stream) {
  localVideo.srcObject = stream
  localStream = stream
}

// call
callBtn.addEventListener('click', async e => {
  pc1 = new RTCPeerConnection()
  pc2 = new RTCPeerConnection()

  pc1.addEventListener('icecandidate', e => {
    pc2.addIceCandidate(e.candidate)
  })

  pc2.addEventListener('icecandidate', e => {
    pc1.addIceCandidate(e.candidate)
  })

  pc2.addEventListener('track', getRemoteStream)

  localStream.getTracks().forEach(track => {
    pc1.addTrack(track, localStream)
  })

  // 媒体协商
  try {
    const offerOptions = {
      offerToRecieveAudio: 0,
      offerToRecieveVideo: 1,
    }

    const desc = await pc1.createOffer(offerOptions)
    getOffer(desc)
  } catch (error) {
    console.log(error)
  }
})

async function getOffer(desc) {
  console.log('getOffer', desc)
  offerPre.innerText = desc.sdp

  pc1.setLocalDescription(desc)

  // send desc to signal
  // receive desc from signal

  pc2.setRemoteDescription(desc)

  try {
    const answerDesc = await pc2.createAnswer()
    getAnswer(answerDesc)
  } catch (error) {
    console.log(error)
  }
}

function getAnswer(desc) {
  console.log('getAnswer', desc)
  answerPre.innerText = desc.sdp

  pc2.setLocalDescription(desc)

  // send desc to signal
  // receive desc from signal

  pc1.setRemoteDescription(desc)
}

function getRemoteStream(e) {
  remoteVideo.srcObject = e.streams[0]
}

// hang up
hangUpBtn.addEventListener('click', e => {
  pc1.close()
  pc2.close()
  pc1 = null
  pc2 = null
})
