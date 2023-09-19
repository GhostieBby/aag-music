import User from '../models/user.js'
import jwt from 'jsonwebtoken'



export const registerUser = async (req, res) => {
  try {
    const user = await User.create(req.body)
    return res.status(201).json({ message: `Welcome ${user.username}` })
  } catch (error) {
    return res.status(400).json({ error: 'Bad request' })
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const userToLogin = await User.findOne({ email: email })
    if (!userToLogin) throw new Error('User not found')
    if (!userToLogin.validatePassword(password)) throw new Error('Password invalid')
    const token = jwt.sign({ sub: userToLogin._id }, process.env.SECRET, { expiresIn: '7d' })
    console.log('TOKEN', jwt)
    return res.json({ message: `Welcome back, ${userToLogin.username}!`, token: token })
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
}

export const getAllUsers = async (req, res) => {
  const users = await User.find()
  return res.json(users)
}

export const getUserProfile = async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id)
  return res.json(user)
}

export const updateProfile = async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id)
  let stringifiedReqUser = JSON.stringify(req.user._id)
  stringifiedReqUser = stringifiedReqUser.slice(1, stringifiedReqUser.length - 1)
  if (stringifiedReqUser !== id) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  Object.assign(user, req.body)
  await user.save()
  return res.json(user)
}
