import user from '../models/user.js'
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {
  try {
    const user = await User.create(req.body)
    return res.status(201).json({ message: `Welcome ${user.username}` })
  } catch (error) {
    console.log(error)
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const userToLogin = await User.findOne({ email: email })
    if(!userToLogin) throw new Error ('User not found')
    if (!userToLogin.validatePassword(password)) throw new Error ('Password invalid')
    const token = jwt.sign({ sub: userToLogin._id }, process.env.SECRET, { expiresIn: '7d' })
  } catch (error) {
    console.log(error)
  }
}

