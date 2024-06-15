const localVideo = document.querySelector('#local-video')
const remoteVideo = document.querySelector('#remote-video')

const connectBtn = document.querySelector('#connect')
const disconnectBtn = document.querySelector('#disconnect')

const offerPre = document.querySelector('#offer')
const answerPre = document.querySelector('#answer')

let localStream

let roomId
let socket

let state

let pc

// tpm
const MOCK_ROOM_ID = '111111'

// 连接
connectBtn.addEventListener('click', connSignalServer)

async function connSignalServer(e) {
  // 开启本地视频
  await start()
}

async function start() {
  try {
    const constraints = {
      audio: false,
      video: true,
    }
    const stream = await navigator.mediaDevices.getUserMedia(constraints)
    getMediaStream(stream)
  } catch (error) {
    console.log(error)
  }
}

function getMediaStream(stream) {
  localVideo.srcObject = stream
  localStream = stream

  conn()
}

function conn() {
  socket = io.connect('https://localhost')

  socket.on('joined', (roomId, id) => {
    console.log('[joined]', roomId, id)

    state = 'joined'

    createPeerConnection()

    connectBtn.disabled = true
    disconnectBtn.disabled = false

    console.log('[joined - state]', state)
  })

  socket.on('other join', (roomId, id) => {
    console.log('[other join]', roomId, id)

    if (state === 'joined_unbind') {
      createPeerConnection()
    }

    state = 'join_conn'
    // 媒体协商

    console.log('[other join - state]', state)
  })

  socket.on('full', (roomId, id) => {
    console.log('[full]', roomId, id)

    state = 'leaved'
    socket.disconnect()

    alert('房间已满')

    connectBtn.disabled = false
    disconnectBtn.disabled = true

    console.log('[full - state]', state)
  })

  socket.on('leaved', (roomId, id) => {
    console.log('[leaved]', roomId, id)

    state = 'leaved'
    socket.disconnect()

    connectBtn.disabled = false
    disconnectBtn.disabled = true

    console.log('[leaved - state]', state)
  })

  // 对端离开的时候
  socket.on('bye', (roomId, id) => {
    console.log('[bye]', roomId, id)

    state = 'joined_unbind'
    closePeerConnection()

    console.log('[bye - state]', state)
  })

  socket.on('message', (roomId, data) => {
    console.log('[message]', roomId, data)

    // 媒体协商
  })

  socket.emit('join', MOCK_ROOM_ID)
}

// 断开连接
disconnectBtn.addEventListener('click', disconnSignalServer)

function disconnSignalServer() {
  if (socket) {
    socket.emit('leave', MOCK_ROOM_ID)
  }

  // 释放资源
  closePeerConnection()
  closeLocalMedia()

  // connectBtn.disabled = false
  // disconnectBtn.disabled = true
}

function closeLocalMedia() {
  if (localStream && localStream.getTracks()) {
    localStream.getTracks().forEach(track => {
      track.stop()
    })
  }
  localStream = null
}

function createPeerConnection() {
  console.log('create RTCPeerConnection')

  if (!pc) {
    pcConfig = {
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
      ],
    }

    pc = new RTCPeerConnection(pcConfig)

    pc.onicecandidate = e => {
      if (e.candidate) {
        console.log('发现一个新的 candidate：', e.candidate)
      }
    }

    pc.ontrack = e => {
      remoteVideo.srcObject = e.streams[0]
    }
  }

  if (localStream) {
    localStream.getTracks().forEach(track => {
      pc.addTrack(track)
    })
  }
}

function closePeerConnection() {
  console.log('close RTCPeerConnection')

  if (pc) {
    pc.close()
    pc = null
  }
}
