const roomEl = document.querySelector('#room')
const connectBtn = document.querySelector('#connect')
const disconnectBtn = document.querySelector('#disconnect')

const localVideo = document.querySelector('#local-video')
const remoteVideo = document.querySelector('#remote-video')

const CONNECT_URL = 'https://192.168.8.153'

let localStream
let socket
let state
let pc

let joinedRoomId = '001'

function updateRoom(e) {
  joinedRoomId = e.target.value
}

async function connSignalServer(e) {
  const constraints = {
    audio: false,
    video: true,
  }
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(getMediaStream)
    .catch(error => console.log(error))
}

function getMediaStream(stream) {
  localVideo.srcObject = stream

  localStream = stream
  conn()
}

function conn() {
  socket = io.connect(CONNECT_URL)

  socket.on('joined', (roomId, id) => {
    console.log('[joined]', roomId, id)

    state = 'joined'

    createPeerConnection()

    roomEl.disabled = true
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
    call()

    console.log('[other join - state]', state)
  })

  socket.on('full', (roomId, id) => {
    console.log('[full]', roomId, id)

    state = 'leaved'
    socket.disconnect()
    closeLocalMedia()

    alert('房间已满')

    roomEl.disabled = false
    connectBtn.disabled = false
    disconnectBtn.disabled = true

    console.log('[full - state]', state)
  })

  socket.on('leaved', (roomId, id) => {
    console.log('[leaved]', roomId, id)

    state = 'leaved'
    socket.disconnect()

    roomEl.disabled = false
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

  socket.on('message', (room, data) => {
    console.log('[message]', room, data)

    // 媒体协商
    if (data) {
      if (data.type === 'offer') {
        pc.setRemoteDescription(new RTCSessionDescription(data))
          .then(() => pc.createAnswer())
          .then(getAnswer)
          .catch(err => console.log('getAnswer() Error', err))
      } else if (data.type === 'answer') {
        pc.setRemoteDescription(new RTCSessionDescription(data)).catch(err => console.log('setRemoteDescription() Error', err))
      } else if (data.type === 'candidate') {
        const candidate = new RTCIceCandidate(data.candidate)
        pc.addIceCandidate(candidate).catch(err => console.log('addIceCandidate() Error', err))
      } else {
        console.log('message 数据错误', data)
      }
    }
  })

  socket.emit('join', joinedRoomId)
}

function getAnswer(desc) {
  pc.setLocalDescription(desc)
    .then(() => sendMessage(joinedRoomId, desc))
    .catch(err => console.log('setLocalDescription() Error', err))
}

function disconnSignalServer() {
  if (socket) {
    socket.emit('leave', joinedRoomId)
  }

  // 释放资源
  closePeerConnection()
  closeLocalMedia()

  roomEl.disabled = false
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
  console.log('创建 RTCPeerConnection')

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

        sendMessage(joinedRoomId, {
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
  console.log('关闭 RTCPeerConnection')

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
        .catch(err => console.log('createOffer() Error', err))
    }
  }
}

function getOffer(desc) {
  pc.setLocalDescription(desc)
    .then(() => sendMessage(joinedRoomId, desc))
    .catch(err => console.log('setLocalDescription() Error', err))
}

function sendMessage(roomId, data) {
  console.log('发送 p2p 消息', roomId, data)

  if (socket) {
    socket.emit('message', roomId, data)
  }
}

// 更新房间号
roomEl.addEventListener('input', updateRoom)
// 连接
connectBtn.addEventListener('click', connSignalServer)
// 断开连接
disconnectBtn.addEventListener('click', disconnSignalServer)
