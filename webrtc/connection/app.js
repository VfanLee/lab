const https = require('https')
const fs = require('fs')

const express = require('express')

const app = express()

app.use(express.static('public'))

const key = fs.readFileSync('./certs/cert.key')
const cert = fs.readFileSync('./certs/cert.crt')
const httpServer = https.createServer({ key, cert }, app)

httpServer.listen(3000)
