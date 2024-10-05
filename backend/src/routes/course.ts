import express from "express"
import {
  handleCreateCourse,
  handleViewCourse,
  handleUpdateCourse,
  handleDeleteCourse,
  handleViewCourseByDomainAndSubdomains,
  handleViewCourseByDomainOnly
} from '../controllers/course'
import {
  handleAddLesson,
  handleViewLesson,
  handleUpdateLesson,
  handleDeleteLesson,
} from '../controllers/lesson'
import {handleAuthentication} from "../middlewares/auth"
import {handleCheckUserRole} from '../middlewares/checkUserRole'


const router = express.Router()

//lesson routes
router.post('/lesson/add', handleAuthentication, handleCheckUserRole,  handleAddLesson)
router.get('/lesson/view/:id',handleAuthentication, handleCheckUserRole,  handleViewLesson)
router.put('/lesson/update/:id',handleAuthentication, handleCheckUserRole,  handleUpdateLesson)
router.delete('/lesson/delete/:id',handleAuthentication, handleCheckUserRole,  handleDeleteLesson)


//course routes
router.get('/view/bysubdomain', handleViewCourseByDomainAndSubdomains)
router.get('/view/bydomain', handleViewCourseByDomainOnly)
router.get('/view/:id', handleAuthentication, handleViewCourse)
router.post('/add',handleAuthentication,handleCheckUserRole, handleCreateCourse)
router.put('/update/:id', handleAuthentication, handleCheckUserRole, handleUpdateCourse)
router.delete("/delete/:id", handleAuthentication, handleCheckUserRole, handleDeleteCourse)

export default router