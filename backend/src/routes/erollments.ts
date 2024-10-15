import express from 'express'
import { handleFetchEnrolledCourse } from '../controllers/enrollment'
import { handleAuthentication } from '../middlewares/auth'


const router = express.Router()

router.get('/enrolled-courses', handleAuthentication, handleFetchEnrolledCourse)
// router.post('/verify-payment', verifyPaymentAndEnroll)

export default router
