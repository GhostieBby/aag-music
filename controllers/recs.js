import mongoose from 'mongoose'
import Rec from '../models/rec.js'

// index
// get /recs
export const getAllRecs = async (req, res) => {
  const recs = await Rec.find()
  return res.json(recs)
}

// show
// get /recs/:id
export const getSingleRec = async (req, res) => {
  const { id } = req.params
  if (!mongoose.isValidObjectId(id)) {
    return res.status(422).json({ error: 'Invalid ObjectId' })
  }
  try {
    const rec = await Rec.findById(id).populate('AddedBy').populate('recs.addedBy')
    if (!rec) {
      throw new Error('Rec not found')
    }
    return res.json(rec)
  } catch (error) {
    console.log('ERROR ->', error)
    return res.status(404).json({ message: error.message})
  }
}

// create
// post /recs
export const createRec = async (req, res) => {
  try {
    const recCreated = await Rec.create({ ...req.body. addedBy: req.user._id })
    return res.status(201).json(recCreated)
  } catch (error) {
    console.log(error.code)
    if (error.code === 11000) {
      return res.status(422).json({
        error: {
          name: 'Duplicate key',
          field: error.keyValue,
        }
      })
    }
    return res.status(422).json(error)
  }
}

// don't need update recommendation route

// delete
// delete /recs/:id
export const deleteRec = async (req, res) => {
  const { id } = req.params
  if (!mongoose.isValidObjectId(id)){
    return res.status(422).json({ error: 'Invalid ObjectID' })
  }
  try {
    const foundRec = await Rec.findById(id)
    if (!foundRec.addedBy.equals(req.user._id)){
      return res.status(401).json({ error: 'Unauthorized' })
    }
    const recDeleted = await Rec.findByIdAndDelete(id)
    if (!recDeleted) throw new Error('Rec not found')
    return res.sendStatus(204)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ error: err.message})
  }
}

// like
// /recs/:id/like
export const likeRec = async (req, res) => {
  const { id } = req.params
  const rec = await Rec.findById(id)
  if (!rec.likes.includes(req.user._id)){
    rec.likes.push(req.user._id)
    await rec.save()
  }
  return res.json(rec)
}