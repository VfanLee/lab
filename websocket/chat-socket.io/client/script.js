import { io } from 'https://cdn.jsdelivr.net/npm/socket.io-client@4.7.5/+esm'

const form = document.querySelector('#form')
const message = document.querySelector('#message')

const socket = io('http://localhost:3000')

socket.on('connect', () => {
  console.log(`[ ${socket.id} 连接成功 ]`)
})

socket.on('connect_error', () => {
  console.log('[ 断开连接 ]', reason)
})

socket.on('disconnect', reason => {
  console.log('[ 断开连接 ]', reason)
})

socket.on('chat message', data => {
  console.log('[ 接收消息 ]', data)

  const li = document.createElement('li')
  li.textContent = data
  message.appendChild(li)
})

form.addEventListener('submit', e => {
  e.preventDefault()

  socket.emit('chat message', e.target.message.value)
  console.log('[ 发送消息 ]', e.target.message.value)

  e.target.message.value = ''
})
