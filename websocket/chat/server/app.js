const { createServer } = require('node:http')
const { Server } = require('socket.io')

const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
})

let users = []

io.on('connection', socket => {
  users.push(socket.id)
  io.emit('online users', users)

  socket.on('chat message', msg => {
    io.emit('chat message', msg)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
    users = users.filter(user => user !== socket.id)
    io.emit('online users', users)
  })
})

httpServer.listen(3000)
