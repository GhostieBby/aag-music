import User from '../models/user.js'
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
  console.log('TOKEN', jwt)
    return res.json({ message: `Welcome back, ${userToLogin.username}!`, token: token })
  } catch (error) {
    console.log(error)
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
