import mongoose from 'mongoose'

const uri = 'mongodb://127.0.0.1:27017/whatsappmqtt' // Cambia esto según tu URL de MongoDB

mongoose.connect(uri)
  .then(() => {
    console.log('Conexión a la base de datos exitosa')
  })
  .catch(error => {
    console.error('Error al conectarse a la base de datos:', error)
  })
