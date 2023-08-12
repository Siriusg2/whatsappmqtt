import express from 'express'
import indexRouter from './routes/index'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import './db'
export const domainBroker = 'prueba.blipconnection.com:18084'
export const receiveTopic = 'iotab/trackergps/+/sdata'
const app = express()

const PORT = 3001

app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(express.json({ limit: '50mb' }))
app.use(cookieParser())
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*') // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true')
  // eslint-disable-next-line max-len
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})
app.use(morgan('dev'))
app.use('/', indexRouter)
app.listen(PORT, () => {
  console.log(`app listening on ${PORT}`)
})
