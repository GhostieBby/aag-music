import express from 'express'
import { secureRoute } from './secureRoute.js'
import { } from '../controllers/users.js'
import { } from '../controllers/recs.js'
import { } from '../controllers/reviews.js'




const router = express.Router()

//Index Route
router.route('/users')
  .get(getAllUsers)
  .post(secureRoute, createUser)