const fs = require('fs')
const https = require('https')
const express = require('express')
const { Server: SocketServer } = require('socket.io')

const key = fs.readFileSync('./certs/cert.key')
const cert = fs.readFileSync('./certs/cert.crt')

const app = express()
const httpServer = https.createServer({ key, cert }, app)
const io = new SocketServer(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

io.on('connect', socket => {
  console.log(`${socket.id} 已连接`)
})

httpServer.listen('3000')
