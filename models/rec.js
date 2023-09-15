import mongoose from 'mongoose'

// * Recommendation Schema
const recSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  recommendedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  recommendedDay: { type: Number, required: true },
  recommendedMonth: { type: Number, required: true },
  accepted: { type: Boolean, default: false },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})
const Rec = mongoose.model('Rec', recSchema)

export default mongoose.model('Rec', recSchema)