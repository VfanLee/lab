const form = document.querySelector('#form')
const message = document.querySelector('#message')

const ws = new WebSocket('ws://localhost:3000')

ws.onopen = e => {
  console.log('[ 连接成功 ]', e)
}

ws.onerror = e => {
  console.log('[ 连接失败 ]', e)
}

ws.onmessage = e => {
  console.log('[ 接收消息 ]', e.data)
  const li = document.createElement('li')
  li.innerText = e.data
  message.appendChild(li)
}

ws.onclose = e => {
  console.log('[ 关闭连接 ]', e)
}

form.addEventListener('submit', e => {
  e.preventDefault()

  ws.send(form.message.value)
  console.log('[ 发送消息 ]', form.message.value)

  form.message.value = ''
})
