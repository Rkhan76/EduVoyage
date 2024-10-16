import express from "express"
import { handleSignup, handleSignin, googleLoginHandler } from '../controllers/auth'
import {googleLoginMiddleware} from "../middlewares/auth"

const router = express.Router()

router.post('/signup', handleSignup)
router.post('/signin', handleSignin)
router.get('/google-login', googleLoginMiddleware, googleLoginHandler)



export default router