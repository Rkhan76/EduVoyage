import express from "express"
import { handleCreateCourse } from "../controllers/course"
import {handleAuthentication} from "../middlewares/auth"

const router = express.Router()

router.post('/add',handleAuthentication, handleCreateCourse)

export default router