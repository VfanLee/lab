const https = require('https')
const fs = require('fs')
const { resolve } = require('path')

const express = require('express')

const app = express()

app.use(express.static('public'))

const key = fs.readFileSync(resolve(__dirname, './certs/cert.key'))
const cert = fs.readFileSync(resolve(__dirname, './certs/cert.crt'))
const httpServer = https.createServer({ key, cert }, app)

httpServer.listen(443)
