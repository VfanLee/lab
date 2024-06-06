const form = document.querySelector('#form')
const message = document.querySelector('#message')

const ws = new WebSocket('ws://localhost:3000')

ws.addEventListener('open', e => {
  console.log('[ 连接成功 ]', e)
})

ws.addEventListener('error', e => {
  console.log('[ 连接失败 ]', e)
})

ws.addEventListener('message', e => {
  console.log('[ Client 接收 Server 消息 ]', e.data)
  const li = document.createElement('li')
  li.innerText = e.data
  message.appendChild(li)
})

ws.addEventListener('close', e => {
  console.log('[ 关闭连接 ]', e)
})

form.addEventListener('submit', e => {
  e.preventDefault()

  ws.send(form.message.value)
  console.log('[ Client 向 Server 发送消息 ]', form.message.value)

  form.message.value = ''
})
