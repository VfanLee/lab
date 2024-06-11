const https = require('https')
const fs = require('fs')
const { resolve } = require('path')

const express = require('express')
const { Server } = require('socket.io')

const app = express()

app.use(express.static(resolve(__dirname, 'public')))

const key = fs.readFileSync(resolve(__dirname, 'certs/cert.key'))
const cert = fs.readFileSync(resolve(__dirname, 'certs/cert.crt'))
const httpServer = https.createServer({ key, cert }, app)
const io = new Server(httpServer)

io.on('connection', socket => {
  socket.on('join', room => {
    socket.join(room)
    console.log(io.sockets.adapter.rooms)
    const myRoom = io.sockets.adapter.rooms.get(room)
    const users = myRoom.size
    console.log('房间用户数：', users)
    io.in(room).emit('joined', room, users)
  })

  socket.on('message', (room, id, data) => {
    io.to(room).emit('message', room, id, data) // 房间内所有人发送消息
  })
})

httpServer.listen(443)
