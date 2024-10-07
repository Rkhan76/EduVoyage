import express from 'express'
import {addCourseToCart, fetchCartDetails, fetchCartForUser} from "../controllers/cart"
import { handleAuthentication } from '../middlewares/auth'

const router = express.Router()

router.post('/create', handleAuthentication, addCourseToCart)
router.get("/view", handleAuthentication, fetchCartForUser)
router.get("/details", handleAuthentication, fetchCartDetails)


export default router