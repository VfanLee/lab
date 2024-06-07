const http = require('http')
const express = require('express')
const { WebSocketServer } = require('ws')

const app = express()
const httpServer = http.createServer(app)
const wss = new WebSocketServer({ server: httpServer })

wss.on('headers', (headers, req) => {
  console.log(headers)
})

wss.on('connection', (ws, req) => {
  console.log('[ Client 已连接 ]')

  ws.on('message', (data, isBinary) => {
    console.log('[ 接收消息 ]', data.toString())

    wss.clients.forEach(client => {
      if (client.readyState === ws.OPEN) {
        console.log('[ 发送消息 ]')
        client.send(data, { binary: isBinary })
      }
    })
  })

  ws.on('close', (code, reason) => {
    console.log('[ 关闭连接 ]')
  })

  ws.on('error', error => console.log(error))
})

httpServer.listen(3000)
