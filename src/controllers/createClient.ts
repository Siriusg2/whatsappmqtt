import Cliente, { ICliente } from '../models/client' // Asegúrate de importar la interfaz ICliente si la tienes definida en el modelo

const createClient = async (phoneNumber: number, deviceId: number): Promise<ICliente> => {
  try {
    const newClient = await Cliente.create({ phone_number: phoneNumber, device_id: deviceId })
    return newClient // Devuelve el nuevo cliente creado
  } catch (error) {
    console.log(error)
    throw error // Lanza el error para que pueda ser manejado en el contexto que llama a esta función
  }
}

export default createClient
