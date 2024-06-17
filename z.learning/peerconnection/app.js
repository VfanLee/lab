const https = require('https')
const fs = require('fs')
const { resolve } = require('path')

const express = require('express')
const { Server } = require('socket.io')

const app = express()

app.use(express.static('public'))

const key = fs.readFileSync(resolve(__dirname, './certs/cert.key'))
const cert = fs.readFileSync(resolve(__dirname, './certs/cert.crt'))
const httpServer = https.createServer({ key, cert }, app)
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
})

const MAX_USER = 2

io.on('connect', socket => {
  socket.on('join', room => {
    socket.join(room)
    const myRoom = io.sockets.adapter.rooms.get(room)
    const users = myRoom ? myRoom.size : 0
    console.log('房间用户数', users)
    if (users <= MAX_USER) {
      socket.emit('joined', room, socket.id)
      if (users > 1) {
        socket.to(room).emit('other join', room, socket.id)
      }
    } else {
      socket.leave(room)
      socket.emit('full', room, socket.id)
    }
  })

  socket.on('leave', room => {
    const myRoom = io.sockets.adapter.rooms.get(room)
    const users = myRoom ? myRoom.size - 1 : 0
    console.log('房间用户数', users)
    socket.to(room).emit('bye', room, socket.id)
    socket.emit('leaved', room, socket.id)
    socket.leave(room)
  })

  socket.on('message', (room, data) => {
    socket.to(room).emit('message', room, data)
  })

  socket.on('disconnect', () => {
    console.log('用户断开连接', socket.id)
  })
})

httpServer.listen(443)
