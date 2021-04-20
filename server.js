const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT || 8000
const app = express()

app.use(express.json({ extended: true }))
app.use(cors())
app.use('/api/client', require('./routes/client.routes'))
app.use('/api/admin', require('./routes/admin.routes'))

function start() {
  try {
    mongoose
      .connect(process.env.DB_URI, {
        useCreateIndex: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then(() => {
        console.log('DB connect')
        app.listen(PORT, () => {
          console.log('App worked on port ', PORT)
        })
      })
      .catch((err) => {
        console.log('DB ', err)
      })
  } catch (error) {
    console.log(error)
  }
}

start()
