import mqtt from 'mqtt'

const connectMqtt = (ipBroker: string, topic: string): void => {
  const mqttClient = mqtt.connect(ipBroker) // Cambia la URL por tu broker MQTT

  mqttClient.on('connect', () => {
    console.log('Conectado al broker MQTT')
    mqttClient.subscribe(topic) // Cambia el nombre del tópico
  })

  mqttClient.on('message', (topic, message) => {
    console.log(`Mensaje recibido en el tópico ${topic}: ${message.toString()}`)
  })
}

export default connectMqtt
