const usernameEl = document.querySelector('#username')
const roomEl = document.querySelector('#room')
const connectBtn = document.querySelector('#connect')
const disconnectBtn = document.querySelector('#disconnect')
const contentEl = document.querySelector('#content')
const inputEl = document.querySelector('#input')
const sendBtn = document.querySelector('#send')
const messageForm = document.querySelector('#message-form')

let socket
let room

usernameEl.value = 'user-' + Math.floor(Math.random() * 1000000)
roomEl.value = 'room-001'

connectBtn.addEventListener('click', e => {
  socket = io.connect('https://localhost')

  socket.on('joined', (room, id) => {
    console.log(usernameEl.value, '加入房间', room)
    usernameEl.disabled = true
    roomEl.disabled = true
    connectBtn.disabled = true
    disconnectBtn.disabled = false
    inputEl.disabled = false
    sendBtn.disabled = false
  })

  socket.on('other join', (room, id) => {
    console.log(usernameEl.value, '加入房间', room)
  })

  socket.on('full', (room, id) => {
    console.log(room, '已满，加入房间失败')
  })

  socket.on('leaved', (room, id) => {
    console.log(usernameEl.value, '离开房间', room)

    usernameEl.disabled = false
    roomEl.disabled = false
    connectBtn.disabled = false
    disconnectBtn.disabled = true
    inputEl.disabled = true
    sendBtn.disabled = true
  })

  socket.on('message', (room, data) => {
    sendMessage(data)
  })

  room = roomEl.value

  socket.emit('join', room)
})

disconnectBtn.addEventListener('click', e => {
  socket.emit('leave', room)
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  let data = usernameEl.value + ': ' + inputEl.value
  sendMessage(data)
  socket.emit('message', room, data)
  inputEl.value = ''
})

function sendMessage(data) {
  const li = document.createElement('li')
  li.innerText = data
  contentEl.appendChild(li)
}
