import { io } from './lib/socket.io.esm.min.js'

const form = document.getElementById('form')
const input = document.getElementById('input')
const messages = document.getElementById('messages')
const online = document.getElementById('online')

const socket = io('ws://192.168.8.153:3000')

socket.on('connect', () => {
  console.log('开启连接', socket)
  document.title = socket.id
})

socket.on('connect_error', () => {
  console.log('连接失败', socket)
})

socket.on('disconnect', () => {
  console.log('断开连接', socket)
})

socket.on('online users', users => {
  online.textContent = users.length
})

form.addEventListener('submit', e => {
  e.preventDefault()
  if (input.value) {
    socket.emit('chat message', input.value)
    input.value = ''
  }
})

socket.on('chat message', msg => {
  const item = document.createElement('li')
  item.textContent = msg
  messages.appendChild(item)
  window.scrollTo(0, document.body.scrollHeight)
})
