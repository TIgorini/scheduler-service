import config from './config'
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import scheduler from './services/scheduler'

mongoose
  .connect(config.mongo.uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((err) => {
    console.error(`MongoDB connection error. Please make sure MongoDB is running. ${err}`)
    process.exit(1)
  })

scheduler.start()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/', (req, res, next) => {
  const { time, message } = req.body
  scheduler
    .add(time, message)
    .then((jobId) => res.json({ jobId }))
    .catch((err) => next(err))
})

app.listen(config.port, () => {
  console.log(`Service running on http://localhost:${config.port}.`)
})
