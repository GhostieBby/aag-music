import User from '../models/user.js'

// * Add Review
// post /users/:id --> id of the user whose profile is being reviewed
export const addReview = async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findById(id)
    let stringifiedReqUser = JSON.stringify(req.user._id)
    stringifiedReqUser = stringifiedReqUser.slice(1, stringifiedReqUser.length - 1)
    if (stringifiedReqUser === id) {
      return res.status(403).json({ error: 'Cannot review your own profile' })
    }
    user.reviews.push({ ...req.body, addedBy: req.user._id })
    await user.save()
    return res.status(201).json(user)
  } catch (error) {
    console.log(error)
  }
}

// Delete review
// delete /users/:id --> id of the user whose profile has been reviewed
// the person who made the review is allowed to delete the review
export const deleteReview = async (req, res) => {
  try {
    const { userId, reviewId } = req.params
    const user = await User.findById(userId)
    const reviewToDelete = user.reviews.id(reviewId)
    if (reviewToDelete.addedBy.equals(req.user._id)) {
      reviewToDelete.deleteOne()
    }
    await user.save()
    return res.sendStatus(204)
  } catch (error) {
    console.log(error)
  }
}

// 

// // * Create Review
// // post /recs/:id/reviews
// export const createReview = async (req, res) => {
//   const { id } = req.params
//   if (!mongoose.isValidObjectId(id)) {
//     return res.status(422).json({ error: 'Invalid ObjectID' })
//   }
//   try {
//     const rec = await Rec.findById(id)
//     if (!rec) {
//       throw new Error('Rec not found')
//     }
//     rec.reviews.push({ ...req.body, addedBy: req.user._id })
//     await rec.save()
//     return res.status(201).json(rec)
//   } catch (error) {
//     console.log(error)
//     return res.status(404).json({ error: error.message })
//   }
// }

