import express from 'express'
import { checkout, verifyPaymentAndEnroll } from '../controllers/payment'


const router = express.Router()

router.post('/checkout', checkout)
router.post('/verify-payment', verifyPaymentAndEnroll)


export default router