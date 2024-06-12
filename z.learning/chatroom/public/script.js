const usernameEl = document.querySelector('#username')
const roomEl = document.querySelector('#room')
const connectBtn = document.querySelector('#connect')
const contentEl = document.querySelector('#content')
const inputEl = document.querySelector('#input')
const sendBtn = document.querySelector('#send')
const formEl = document.querySelector('#form')

let socket
let room

usernameEl.value = 'Lee-' + Math.floor(Math.random() * 1000000)
roomEl.value = '0112'

connectBtn.addEventListener('click', e => {
  socket = io.connect('https://localhost')

  socket.on('joined', (room, users) => {
    console.log(usernameEl.value, '加入房间', room)
    console.log('当前用户数', users)
    usernameEl.disabled = true
    roomEl.disabled = true
    connectBtn.disabled = true
    inputEl.disabled = false
    sendBtn.disabled = false
  })

  socket.on('message', (room, id, data) => {
    const li = document.createElement('li')
    li.innerText = data
    contentEl.appendChild(li)
  })

  room = roomEl.value
  socket.emit('join', room)
})

formEl.addEventListener('submit', e => {
  e.preventDefault()

  let data = usernameEl.value + ': ' + inputEl.value
  socket.emit('message', room, socket.id, data)
  inputEl.value = ''
})
