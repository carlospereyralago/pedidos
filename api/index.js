// estas lineas siempre tienes qe estar---------------------------

const express = require('express')
const app = express()
const https = require('https')
const cors = require('cors')
const fs = require('fs')

const IORedis = require('ioredis')
const RedisStore = require('connect-redis').default

const redisClient = new IORedis(process.env.REDIS_URL)
const subscriberClient = new IORedis(process.env.REDIS_URL)

const eventsPath = './src/events/'

fs.readdirSync(eventsPath).forEach(function (file) {
  require(eventsPath + file).handleEvent(redisClient, subscriberClient)
})

app.use((req, res, next) => {
  req.redisClient = redisClient
  next()
})

app.use(cors({ origin: ['localhost:8080'], credentials: true }))
app.use(express.json({ limit: '10mb', extended: true }))

const key = fs.readFileSync('../certs/key_decrypted.pem')
const cert = fs.readFileSync('../certs/certificate.pem')

https.createServer({ key, cert }, app).listen(8080, () => {
  console.log('Servidor HTTPS corriendo en https://localhost:8080')
})

fs.readdirSync('./src/routes/').forEach(file => {
  require(`./src/routes/${file}`)(app)
})

app.listen(8080, () => {
  console.log('El servidor está corriendo en el puerto 8080.')
})

// ---------------------------------------------------------------
