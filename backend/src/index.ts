import express from 'express'
import cors from 'cors'
import userRouter from './routes/user'
import courseRouter from './routes/course'




const app = express()
const port = 5050

//middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//routes
app.use('/api/v1/user', userRouter)
app.use('/api/v1/course', courseRouter)


app.get('/', (req, res) => {
  res.send(`<h1>Welcome to backend of EduVoyage</h1>`)
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
