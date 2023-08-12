import express from 'express'
import diaryRouter from './routes/diaries'
import bodyParser from 'body-parser'

const app = express()
app.use(express.json())
const PORT = 3001

app.use('/api/diaries', diaryRouter)

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*') // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true')
  // eslint-disable-next-line max-len
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})

app.listen(PORT, () => {
  console.log(`app listening on ${PORT}`)
})
