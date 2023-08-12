/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import mongoose, { Document, Schema, Model } from 'mongoose'

interface IMensaje extends Document {
  mensaje: string
  fecha_recepcion: Date
  device_id: number
}

interface ISequence extends Document {
  model: string
  field: string
  sequence: number
}

const sequenceSchema: Schema<ISequence> = new mongoose.Schema({
  model: {
    type: String,
    required: true
  },
  field: {
    type: String,
    required: true
  },
  sequence: {
    type: Number,
    default: 1
  }
})

sequenceSchema.index({ model: 1, field: 1 }, { unique: true })

interface ISequenceModel extends Model<ISequence> {
  getNextSequence: (model: string, field: string) => Promise<number>
}

sequenceSchema.statics.getNextSequence = async function (model: string, field: string): Promise<number> {
  const sequenceDoc = await this.findOneAndUpdate(
    { model, field },
    { $inc: { sequence: 1 } },
    { new: true, upsert: true }
  )

  return sequenceDoc.sequence
}

const Sequence: ISequenceModel = mongoose.model<ISequence, ISequenceModel>('Sequence', sequenceSchema)

const mensajeSchema: Schema<IMensaje> = new mongoose.Schema({
  mensaje: {
    type: String,
    required: true
  },
  fecha_recepcion: {
    type: Date,
    default: Date.now
  },
  device_id: {
    type: Number,
    required: true
  }
})

mensajeSchema.pre<IMensaje>('save', async function (next) {
  if (!this.id) {
    const nextId = await Sequence.getNextSequence('Mensaje', 'id')
    this.id = nextId
  }
  next()
})

const Mensaje: Model<IMensaje> = mongoose.model<IMensaje>('Mensaje', mensajeSchema)

export default Mensaje
