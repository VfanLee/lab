const localVideo = document.querySelector('#local-video')
const remoteVideo = document.querySelector('#remote-video')

let localStream
let remoteStream
let peerConnection

// const peerConfiguration = {
//   iceServers: [
//     {
//       urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302'],
//     },
//   ],
// }

document.querySelector('#call').addEventListener('click', async e => {
  await getUserMedia()
  await createPeerConnection()

  // create offer
  try {
    console.log('Creating offer...')
    const offer = await peerConnection.createOffer()
    console.log(offer)
  } catch (error) {
    console.log(error)
  }
})

function createPeerConnection() {
  return new Promise((resolve, reject) => {
    peerConnection = new RTCPeerConnection()
    remoteStream = new MediaStream()
    remoteStream.srcObject = remoteStream

    localStream.getTracks().forEach(track => {
      peerConnection.addTrack(track, localStream)
    })

    peerConnection.addEventListener('icecandidate', e => {
      console.log('........Ice candidate found!......', e)
    })

    peerConnection.addEventListener('track', e => {
      console.log('........Track event......', e)

      e.streams[0].getTracks.forEach(track => {
        remoteStream.addTrack(track)
      })
    })

    resolve()
  })
}

function getUserMedia() {
  return new Promise(async (resolve, reject) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true,
      })
      localVideo.srcObject = stream
      localStream = stream
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}
