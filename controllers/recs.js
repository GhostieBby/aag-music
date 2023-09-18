import mongoose from 'mongoose'
import Rec from '../models/rec.js'

// ! index routes
// * show all
// get /recs
export const getAllRecs = async (req, res) => {
  const recs = await Rec.find()
  return res.json(recs)
}

// * delete all
// delete /recs
export const deleteAllRecs = async (req, res) => {
  const recs = await Rec.deleteMany()
  return res.json(recs)
}

// ! single routes
// * show single
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

// * create single
// post /recs/:id
export const createRec = async (req, res) => {
  try {
    const { title, artist } = req.body
    // get current date
    const currentDate = new Date()
    const recommendedDay = currentDate.getDate()
    const recommendedMonth = currentDate.getMonth() + 1 // months are zero based, so add 1
    // assuming req.user contains the sender's info
    const recCreated = await Rec.create({
      title,
      artist,
      recommendedDay,
      recommendedMonth,
      addedBy: req.user._id,
    })
    // can also associate the rec with the receiver here if needed
    return res.status(201).json(recCreated)
  } catch (error) {
    console.lof(error.code)
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

// * delete single
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

// * like single
// put /recs/:id
export const likeRec = async (req, res) => {
  const { id } = req.params
  const rec = await Rec.findById(id)
  if (!rec.likes.includes(req.user._id)){
    rec.likes.push(req.user._id)
    await rec.save()
  }
  return res.json(rec)
}