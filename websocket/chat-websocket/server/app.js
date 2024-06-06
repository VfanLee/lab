const { WebSocketServer } = require('ws')

const io = new WebSocketServer({ port: 3000 })

io.on('connection', function connection(socket) {
  console.log('[ Client 已连接 ]')

  socket.on('error', error => console.log(error))

  socket.on('message', function message(data, isBinary) {
    console.log('[ Server 接收 Client 消息 ]', data)

    io.clients.forEach(client => {
      if (client.readyState === socket.OPEN) {
        console.log('[ Server 向 Client 发送消息 ]')
        client.send(data, { binary: isBinary })
      }
    })
  })

  socket.on('close', (code, reason) => {
    console.log('[ Client 关闭连接 ]')
  })
})
