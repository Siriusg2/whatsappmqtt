import { Router } from 'express'
import client from './client/clientGetRouter'
import clientPostRouter from './client/clientPostRouter'
import msgGetRouter from './msg/msgGet'
const indexRouter = Router()

indexRouter.use('/client', client)
indexRouter.use('/client', clientPostRouter)
indexRouter.use('/msg', msgGetRouter)
export default indexRouter
