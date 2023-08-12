import mongoose, { Document, Schema, Model } from 'mongoose'

export interface ICliente extends Document {
  phone_number: number
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

const clienteSchema: Schema<ICliente> = new mongoose.Schema({
  phone_number: {
    type: Number,
    required: true
  },
  device_id: {
    type: Number,
    required: true
  }
})

clienteSchema.pre<ICliente>('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!this.id) {
    const nextId = await Sequence.getNextSequence('Cliente', 'id')
    this.id = nextId
  }
  next()
})

const Cliente: Model<ICliente> = mongoose.model<ICliente>('Cliente', clienteSchema)

export default Cliente
