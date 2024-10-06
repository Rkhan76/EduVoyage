import express from 'express'
import {addCourseToCart} from "../controllers/cart"
import { handleAuthentication } from '../middlewares/auth'

const router = express.Router()

router.post('/create', handleAuthentication, addCourseToCart)


export default router