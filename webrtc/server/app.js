const http = require('http')
// const https = require('https')
// const fs = require('fs')
const express = require('express')

const app = express()
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const httpServer = http.createServer(app)
httpServer.listen(80, '0.0.0.0', () => {
  console.log('http://localhost')
})

// const httpsSver = https.createServer(
//   {
//     key: fs.readFileSync('./server.key'),
//     cert: fs.readFileSync('./server.crt')
//   },
//   app
// )
// httpsSver.listen(443, '0.0.0.0', () => {
//   console.log('https://localhost')
// })
