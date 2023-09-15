import Rec from '../models/rec.js'
import User from '../models/user.js'

export const updateLikes = async (req, res) => {
  try {
    const { recId } = req.params
    const rec = await Rec.findById(recId)
    if (!rec) {
      return res.status(404).json({ error: 'Recommendation not found' })
    }
    if (rec.accepted === true) {
      const user = await User.findById(rec.addedBy)
      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }
      user.likes += 1
      await user.save()
    }
    res.status(200).json({ message: 'Likes updated successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'An error occurred' })
  }
}