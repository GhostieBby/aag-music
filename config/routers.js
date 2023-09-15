import express from 'express'
import { secureRoute } from './secureRoute.js'
import { getAllUsers, registerUser, loginUser, getUserProfile } from '../controllers/users.js'
import { getAllRecs, deleteAllRecs, getSingleRec, createRec, deleteRec, likeRec } from '../controllers/recs.js'
import { addReview, deleteReview } from '../controllers/reviews.js'




const router = express.Router()
// index routes
router.route('/recs')
  .get(getAllRecs)
  .delete(deleteAllRecs)


// single routes
router.route('/recs/:id')
  .get(getSingleRec)
  .delete(deleteRec)
  .put(likeRec)
  .post(createRec)

// index Route
router.route('/users')
  .get(getAllUsers)
  .post(secureRoute) // createUser

router.route('/users/:id')
  .post(addReview)
  .delete(deleteReview)

// single route

router.route('/register')
  .post(registerUser)

router.route('/login')
  .post(loginUser)

router.route('/profile')
  .get(secureRoute, getUserProfile)


export default router