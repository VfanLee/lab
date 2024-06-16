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
    console.error(error)
  }
}

function getMediaStream(stream) {
  localVideo.srcObject = stream
  localStream = stream

  conn()
}

function conn() {
  socket = io.connect('https://192.168.1.10')

  socket.on('joined', (room, id) => {
    console.log('[joined]', room, id)
    roomId = room

    state = 'joined'

    createPeerConnection()

    connectBtn.disabled = true
    disconnectBtn.disabled = false

    console.log('[joined - state]', state)
  })

  socket.on('other join', (room, id) => {
    console.log('[other join]', room, id)

    if (state === 'joined_unbind') {
      createPeerConnection()
    }

    state = 'join_conn'
    call()

    console.log('[other join - state]', state)
  })

  socket.on('full', (room, id) => {
    console.log('[full]', room, id)

    state = 'leaved'
    socket.disconnect()

    alert('房间已满')

    connectBtn.disabled = false
    disconnectBtn.disabled = true

    console.log('[full - state]', state)
  })

  socket.on('leaved', (room, id) => {
    console.log('[leaved]', room, id)

    state = 'leaved'
    socket.disconnect()

    connectBtn.disabled = false
    disconnectBtn.disabled = true

    console.log('[leaved - state]', state)
  })

  // 对端离开的时候
  socket.on('bye', (room, id) => {
    console.log('[bye]', room, id)

    state = 'joined_unbind'
    closePeerConnection()

    console.log('[bye - state]', state)
  })

  socket.on('message', (room, data) => {
    console.log('[message]', room, data)

    // 媒体协商
    if (data) {
      if (data.type === 'offer') {
        pc.setRemoteDescription(new RTCSessionDescription(data))
          .then(() => pc.createAnswer())
          .then(getAnswer)
          .catch(err => console.error('getAnswer() error', err))
      } else if (data.type === 'answer') {
        pc.setRemoteDescription(new RTCSessionDescription(data)).catch(err => console.error('setRemoteDescription() error', err))
      } else if (data.type === 'candidate') {
        const candidate = new RTCIceCandidate(data.candidate)
        pc.addIceCandidate(candidate).catch(err => console.error('addIceCandidate() error', err))
      } else {
        console.error('message 数据错误', data)
      }
    }
  })

  socket.emit('join', MOCK_ROOM_ID)
}

function getAnswer(desc) {
  pc.setLocalDescription(desc)
    .then(() => sendMessage(roomId, desc))
    .catch(err => console.error('setLocalDescription() error', err))
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

  connectBtn.disabled = false
  disconnectBtn.disabled = true
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
    const pcConfig = {
      iceServers: [
        {
          urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302'],
        },
      ],
    }

    pc = new RTCPeerConnection(pcConfig)

    pc.onicecandidate = e => {
      if (e.candidate) {
        console.log('发现一个新的 candidate：', e.candidate)

        sendMessage(roomId, {
          type: 'candidate',
          candidate: e.candidate,
        })
      }
    }

    pc.ontrack = e => {
      remoteVideo.srcObject = e.streams[0]
    }
  }

  if (localStream) {
    localStream.getTracks().forEach(track => {
      pc.addTrack(track, localStream)
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

// 媒体协商
function call() {
  if (state === 'join_conn') {
    if (pc) {
      pc.createOffer({
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1,
      })
        .then(getOffer)
        .catch(err => console.error('createOffer() error', err))
    }
  }
}

function getOffer(desc) {
  pc.setLocalDescription(desc)
    .then(() => sendMessage(roomId, desc))
    .catch(err => console.error('setLocalDescription() error', err))
}

function sendMessage(roomId, data) {
  console.log('发送 p2p 消息', roomId, data)

  if (socket) {
    socket.emit('message', roomId, data)
  }
}
