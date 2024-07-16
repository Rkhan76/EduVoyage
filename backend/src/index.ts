import express from 'express'
import cors from 'cors'
import userRouter from './routes/user'
import courseRouter from './routes/course'



const app = express()
const port = 5050

//middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

//routes
app.use('/api/v1/user', userRouter)
app.use('/api/v1/course', courseRouter)

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
