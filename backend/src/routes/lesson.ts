import express from 'express'
import { handleCreateCourse } from '../controllers/course'
import { handleAuthentication } from '../middlewares/auth'
import { handleCheckUserRole } from '../middlewares/checkUserRole'

const router = express.Router()

router.post(
  '/add',
  handleAuthentication,
  handleCheckUserRole,
  handleCreateCourse
)

export default router
