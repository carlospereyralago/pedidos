const express = require('express')
const router = require('express').Router()
const app = express()
const cors = require('cors')

app.use(cors({ origin: ['localhost:8080'], credentials: true }))


app.listen(8080, () => {
  console.log(`El servidor está corriendo en el puerto 8080.`)
})
