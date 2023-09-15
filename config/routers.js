import express from 'express'
import { secureRoute } from './secureRoute.js'
import { getAllUsers, registerUser, loginUser, getUserProfile } from '../controllers/users.js'
import { getAllRecs, deleteAllRecs, getSingleRec, createRec, deleteRec, likeRec } from '../controllers/recs.js'
import { addReview, deleteReview } from '../controllers/reviews.js'
import { updateLikes } from '../controllers/likes.js'




const router = express.Router()
// index routes
router.route('/recs')
  .get(getAllRecs)
  .delete(deleteAllRecs)

// single routes
router.route('/recs/:id')
  .get(getSingleRec)
  .delete(secureRoute, deleteRec)
  .put(secureRoute, likeRec)
  .post(secureRoute, createRec)

// index Route
router.route('/users')
  .get(getAllUsers)
  .post(secureRoute) // createUser
  .put(updateLikes)

router.route('/users/:id')
  .post(secureRoute, addReview)

router.route('/users/:userId/reviews/:reviewId')
  .delete(secureRoute, deleteReview)

// single route

router.route('/register')
  .post(registerUser)

router.route('/login')
  .post(loginUser)

router.route('/profile')
  .get(secureRoute, getUserProfile)


export default router