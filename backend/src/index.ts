import express from 'express'
import cors from 'cors'
import userRouter from './routes/user'
import courseRouter from './routes/course'
import domainRouter from './routes/domain'
import cartRouter from './routes/cart'

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

app.get('/', (req, res) => {
  res.send(`<h1>Welcome to backend of EduVoyage</h1>`)
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
