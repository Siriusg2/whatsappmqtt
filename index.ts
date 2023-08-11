import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'

const app = express()
app.use(morgan('dev'))

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(morgan('dev'))
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*') // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true')
  // eslint-disable-next-line max-len
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})
const PORT = 3001

// app.use('/api/diaries', diaryRouter)

app.listen(PORT, () => {
  console.log(`app listening on ${PORT}`)
})
