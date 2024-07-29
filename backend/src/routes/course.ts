import express from "express"
import { handleCreateCourse, handleViewCourse } from '../controllers/course'
import { handleAddLesson } from '../controllers/lesson'
import {handleAuthentication} from "../middlewares/auth"
import {handleCheckUserRole} from '../middlewares/checkUserRole'


const router = express.Router()

//lesson routes
router.post('/lesson/add', handleAddLesson)

//course routes
router.get('/view/:id', handleAuthentication, handleViewCourse)
router.post('/add',handleAuthentication,handleCheckUserRole, handleCreateCourse)

export default router