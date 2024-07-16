import express from "express"
import { handleSignup, handleSignin } from '../controllers/auth'

const router = express.Router()

router.post('/signup', handleSignup)
router.post('/signin', handleSignin)


export default router