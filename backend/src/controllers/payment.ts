import Razorpay from 'razorpay'
import { Request, Response } from 'express'
import { PrismaClient, Prisma } from '@prisma/client'
import crypto from 'crypto'
// import dotenv from 'dotenv'

// dotenv.config()
type CourseItem = {
  courseId: string
  price: number
  qty: number
}

type PaymentRequestBody = {
  orderId: string
  paymentId: string
  signature: string
  userId: string
  courseItems: CourseItem[]
}


const prisma = new PrismaClient()

const razorpayKeyId = process.env.RAZORPAY_KEY_ID
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET

if (!razorpayKeyId || !razorpayKeySecret) {
  throw new Error(
    'Razorpay key ID and secret must be defined in the environment variables.'
  )
}

const razorpay = new Razorpay({
  key_id: razorpayKeyId,
  key_secret: razorpayKeySecret,
})

// Custom interface for the request body
interface CheckoutRequest extends Request {
  body: {
    amount: number
    cartItems: {
      courseId: string
      courseName: string
      price: number
      quantity: number
    }[]
    userId: string
  }
}

export const checkout = async (req: CheckoutRequest, res: Response) => {
  const { amount, cartItems, userId } = req.body

  const options = {
    amount: amount * 100, // Amount in paise (smallest currency unit)
    currency: 'INR',
    receipt: `receipt_${Date.now()}`,
    notes: {
      userId,
      cartItems: JSON.stringify(cartItems),
    },
  }

  try {
    const order = await razorpay.orders.create(options)

    return res.status(200).json({
      orderId: order.id,
      amount,
      cartItems,
      userId,
      payStatus: 'created',
    })
  } catch (error) {
    console.error('Error creating Razorpay order:', error)
    return res.status(500).json({
      message: 'Error creating order. Please try again.',
    })
  }
}

// Interface for the request body in the `verify` handler
interface VerifyRequest extends Request {
  body: {
    orderId: string
    paymentId: string
    signature: string
    amount: number
    orderItems: {
      courseId: string
      courseName: string
      price: number
      quantity: number
    }[]
    userId: string
  }
}


export const verifyPaymentAndEnroll = async (
  req: Request<{}, {}, PaymentRequestBody>,
  res: Response
): Promise<Response<any>> => {
  const { orderId, paymentId, signature, userId, courseItems } = req.body
  console.log('courseItems', courseItems)

  // Step 1: Verify the payment signature
  const generatedSignature = crypto
    .createHmac('sha256', razorpayKeySecret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex')

  if (generatedSignature !== signature) {
    return res.status(400).json({ error: 'Payment verification failed.' })
  }

  try {
    await prisma.$transaction(async (prisma) => {
      // Step 2: Calculate the total amount from course items
      const totalAmount = courseItems.reduce((sum, item) => sum + item.price, 0)

      // Extract only the course IDs from the course items
      const courseIds = courseItems.map((item) => item.id)

      // Create a payment record with only course IDs in courseItems
      await prisma.payment.create({
        data: {
          orderId,
          paymentId,
          signature,
          userId,
          amount: totalAmount,
          courseItems: courseIds as unknown as Prisma.JsonObject, // Save only course IDs
          status: 'SUCCESS',
        },
      })

      console.log('Payment recorded successfully.')

      // Step 3: Create enrollments for each course
      const enrollmentData = courseIds.map((courseId) => ({
        userId,
        courseId,
        paymentId
      }))

      await prisma.enrollment.createMany({ data: enrollmentData })

      console.log('Enrollments created successfully.')
    })

    return res.status(200).json({
      message: 'Payment verified and enrollment created.',
    })
  } catch (error) {
    console.error('Transaction failed:', error)
    return res.status(500).json({
      error: 'Payment verification and enrollment failed.',
    })
  }
}


