import mongoose from 'mongoose'
import Rec from '../models/rec.js'

// * Create Review
// post /recs/:id/reviews
export const createReview = async (req, res) => {
  const { id } = req.params
  if (!mongoose.isValidObjectId(id)) {
    return res.status(422).json({ error: 'Invalid ObjectID' })
  }
  try {
    const rec = await Rec.findById(id)
    if (!rec) {
      throw new Error('Rec not found')
    }
    rec.reviews.push({ ...req.body, addedBy: req.user._id })
    await rec.save()
    return res.status(201).json(rec)
  } catch (error) {
    console.log(error)
    return res.status(404).json({ error: error.message })
  }
}

export const deleteReview = async (req, res) => {
  const { recId, reviewId }
}