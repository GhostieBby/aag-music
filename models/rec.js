import mongoose, { model } from 'mongoose'

// * Recommendation Schema
const recSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  recommendedDay: { type: Number, required: true },
  recommendedMonth: { type: Number, required: true },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  accepted: { type: Boolean },
})
const Rec = mongoose.model('Rec', recSchema)

model.exports = Rec