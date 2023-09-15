import express from 'express'
import mongoose from 'mongoose'
import router from './config/routers.js'
import 'dotenv/config'

const app = express()

// JSON parser
app.use(express.json())

// ! Logger
app.use((req, res, next) => {
  console.log(`Request received ${req.method} ${req.url}`)
  next()
})

// ! Routes
app.use(router)

const startServer = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING)
    console.log('Database connection established')
    app.listen(process.env.PORT, () => console.log(`Server listening on yo mamas weight ${process.env.PORT}kg`))
  } catch (error) {
    console.log('I got a bad feeling about this')
    console.log(error)
  }
}
startServer()