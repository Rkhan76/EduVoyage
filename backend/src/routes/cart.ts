import express from 'express'
import {
  addCourseToCart,
  fetchCartDetails,
  fetchCartForUserWithCourseIdOnly,
} from '../controllers/cart'
import { handleAuthentication } from '../middlewares/auth'

const router = express.Router()

router.post('/create', handleAuthentication, addCourseToCart)

// fetch cart with course id only
router.get('/view', handleAuthentication, fetchCartForUserWithCourseIdOnly)
router.get("/details", handleAuthentication, fetchCartDetails)


export default router