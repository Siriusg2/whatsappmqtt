import { Router } from 'express'

const msgGetRouter = Router()

msgGetRouter.get('/', (_req, res) => {
  res.send('Hello gibson!')
})

export default msgGetRouter
