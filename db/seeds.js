import mongoose from 'mongoose' // gives us the mongoose.connect method for establishing a db connection
import 'dotenv/config' // adds our .env variables to process.env

// Model
import Rec from '../models/rec.js'
import User from '../models/user.js'

// Data
import userData from './data/users.js' // data to input into the db



const seedDatabase = async () => {
  try {
    // We want to connect to the database
    await mongoose.connect(process.env.CONNECTION_STRING)
    console.log('🚀 Database connection established')

    // Delete all the documents from all of our collections
    const { deletedCount: usersDeleted } = await User.deleteMany()
    console.log(`❌ Deleted ${usersDeleted} documents from the users collection`)

    const usersAdded = await User.create(userData)
    console.log(`🌱 Seeded ${usersAdded.length} documents into the users collection`)

    // Close our connection to the database
    await mongoose.connection.close()
    console.log('👋 Database connection closed')
  } catch (error) {
    console.log(error)
    // Close our connection to the database
    await mongoose.connection.close()
    console.log('👋 Database connection closed')
  }
}
seedDatabase()