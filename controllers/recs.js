import mongoose from 'mongoose'
import axios from 'axios'
import { JSDOM } from 'jsdom'
import Rec from '../models/rec.js'
import User from '../models.user.js'

// ! index routes
// * show all
// get /recs
// This fetches all the songs in the Users current list (accepted and not accepted)
export const getPendingRecs = async (req, res) => {
  try {
    const { id } = req.params
    const recs = await Rec.find({ recommendedTo: id })
    const pendingRecs = recs.filter(rec => {
      return rec.accepted === false
    })
    return res.json(pendingRecs)
  } catch (error) {
    sendErrors(error, res)
  }
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
    const { link } = req.body
    const response = await axios.get(link)

    const { id } = req.params
    const recommendedTo = id
    const recipient = await User.findById(id)

    const regex = /tracks\/(\d+)&/
    const match = regex.exec(req.body)

    if (recipient.id == req.user._id) {
      return res.status(403).json({ error: 'Cannot add recommendation to own playlist' })
    }
    const recipientRecs = recipient.userRecs.map(rec => {
      return rec.recUrl
    })
    const recDuplicationCheck = recipientRecs.some(rec => {
      return rec === req.body.recUrl
    })
    if (recDuplicationCheck === true) {
      return res.status(409).json({ error: 'Recommendation already added to playlist' })
    }

    if (response.status === 200) {
      const html = response.data

      // create dom environment and parse html
      const dom = new JSDOM(html)
      const document = dom.window.document

      // extract title and artist
      const spanElement = document.querySelector('span')
      if (spanElement) {
        const title = spanElement.textContent.trim()

        // get current date
        const currentDate = new Date()
        const recommendedDay = currentDate.getDate()
        const recommendedMonth = currentDate.getMonth() + 1 // months are zero based, so add 1

        // assuming req.user contains the sender's info
        const recCreated = await Rec.create({
          title,
          recommendedDay,
          recommendedMonth,
          recommendedTo,
          addedBy: req.user._id,
          soundCloudId: match[1],
          accepted,
        })
        dom.window.close()
        return res.status(201).json(recCreated)
      } else {
        return res.status(400).json({ error: 'Span element not found' })
      }
    } else {
      return res.status(400).json({ error: 'Failed to fetch the link' })
    }
    // can also associate the rec with the receiver here if needed
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
// put /api/recs/:id/accept
export const acceptRec = async (req, res) => {
  try {
    const { userId, recId } = req.params._id
    const accepted = req.body.accepted
    
    const updatedRec = await Rec.findByIdAndUpdate(
      recId,
      { accepted },
      { new: true }
    )
    await Rec.save()
    const user = await User.findById(userId)
    user.userRecs.push(updatedRec)
    await user.save()
    updateLikes(updatedRec.addedBy)
    if (!updatedRec) {
      return res.status(404).json({ error: 'Recommendation not found'})
    }
    return res.status(200).json(updatedRec)
  } catch (error) {
    return res.status(500).json(error)
  }
}


export const updateLikes = async (addedBy) => {
  const allRecs = await Rec.find()
  const user = await User.findById(addedBy)
  console.log(user)
  const recs = allRecs.filter(rec => {
    if (rec.addedBy.equals(addedBy) && rec.accepted === true)
      return rec
  })
  user.likes = recs.length
  console.log(user)
  await user.save()
}

export const getRecsByGivenUser = async (req, res) => {
  const { id } = req.params
  const allRecs = await Rec.find()
  const recs = allRecs.filter(rec => {
    return rec.addedBy == id && rec.accepted === true
  })

  return res.json(recs)
}