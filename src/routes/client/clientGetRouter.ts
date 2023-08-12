import { Router } from 'express'

const client = Router()

client.get('/find_all', (_req, res) => {
  res.send('Hello World!')
})

export default client
