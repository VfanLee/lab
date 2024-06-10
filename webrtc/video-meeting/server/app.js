const { createServer } = require('http')
const { Server } = require('socket.io')

const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
})

io.on('connection', socket => {
  console.log('a user connected')

  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)

    // console.log(roomId, userId)
  })
})

httpServer.listen(3000)
