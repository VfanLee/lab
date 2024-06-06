const { Server } = require('socket.io')

const io = new Server(3000, {
  cors: {
    origin: '*',
  },
})

io.on('connect', socket => {
  console.log('[ Client 已连接 ]')

  socket.on('chat message', data => {
    console.log('[ Server 接收消息 ]', data)

    io.emit('chat message', data)
    console.log('[ Server 发送消息 ]', data)
  })

  socket.on('disconnect', () => {
    console.log('[ Client 断开连接 ]')
  })
})
