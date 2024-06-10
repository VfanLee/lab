const myVideo = document.querySelector('#my-video')
const otherVideo = document.querySelector('#other-video')

let localStream
let remoteStream
let peerConnection

let peerConfiguration = {
  iceServers: [
    {
      urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302'],
    },
  ],
}

document.querySelector('#share').addEventListener('click', async e => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  })
  myVideo.srcObject = stream
  localStream = stream

  await createPeerConnection()

  // offer
  try {
    console.log('create offer ...')
    const offer = await peerConnection.createOffer()
    console.log(offer)
  } catch (error) {
    console.log(error)
  }
})

function createPeerConnection() {
  return new Promise((resolve, reject) => {
    peerConnection = new RTCPeerConnection(peerConfiguration)

    localStream.getTracks().forEach(track => {
      peerConnection.addTrack(track, localStream)
    })

    peerConnection.addEventListener('icecandidate', e => {
      console.log('ICE candidate', e)
    })
    resolve()
  })
}
