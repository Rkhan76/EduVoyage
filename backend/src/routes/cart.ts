import express from 'express'
import {addCourseToCart, fetchCartForUser} from "../controllers/cart"
import { handleAuthentication } from '../middlewares/auth'

const router = express.Router()

router.post('/create', handleAuthentication, addCourseToCart)
router.get("/view", handleAuthentication, fetchCartForUser)


export default router