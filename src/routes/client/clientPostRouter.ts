import { Router, Request, Response } from 'express'
import createClient from '../../controllers/createClient'

const clientPostRouter = Router()

clientPostRouter.post('/create', (req: Request, res: Response) => {
  const { phoneNumber, deviceId } = req.body

  createClient(phoneNumber, deviceId)
    .then(newClient => {
      return res.status(200).send(newClient)
    })
    .catch(error => {
      console.log(error)
      return res.status(500).send('Error al crear el cliente')
    })
})

export default clientPostRouter
