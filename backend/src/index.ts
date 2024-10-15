import express from 'express'
import cors from 'cors'
import Razorpay from 'razorpay'

import userRouter from './routes/user'
import courseRouter from './routes/course'
import domainRouter from './routes/domain'
import cartRouter from './routes/cart'
import paymentRouter from './routes/Payment'
import enrollmentRouter from './routes/erollments'
import orders from 'razorpay/dist/types/orders'

const app = express()
const port = 5050

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173', // Your React app URL
  credentials: true, // Allow credentials (cookies, authorization headers)
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/v1/user', userRouter)
app.use('/api/v1/course', courseRouter)
app.use('/api/v1/cart', cartRouter)
app.use('/api/v1/', domainRouter)
app.use('/api/v1/payment', paymentRouter)
app.use('/api/v1/enrollment', enrollmentRouter)

// app.post('/api/create-orderId', async (req, res) => {
//   const { amount, receipt } = req.body

//   if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_SECRET_KEY) {
//     throw new Error('Razorpay key ID or secret key is not defined')
//   }

//   try{
//     var instance = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID as string,
//     key_secret: process.env.RAZORPAY_SECRET_KEY as string,
//   })

//   var options = {
//     amount: amount * 100,
//     currency: "INR",
//     receipt: receipt,
//     payment_capture: 1,
//   }

//   const order = await instance.orders.create(options)
//   return res.status(200).send({message: "Order ID created", order})
//   }catch(error){
//     console.log("Error creating order: ",error)
//     return res.status(500).send({error: "Error creating order"})
//   }
// })


app.get('/', (req, res) => {
  res.send(`<h1>Welcome to backend of EduVoyage</h1>`)
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
