import express from 'express'
import {
  handleCreateCourse,
  handleViewCourse,
  handleUpdateCourse,
  handleDeleteCourse,
  handleViewCourseByDomainAndSubdomains,
  handleViewCourseByDomainOnly,
  handleViewCourseByTeacher,
} from '../controllers/course'
import {
  handleAddLesson,
  handleViewLesson,
  handleUpdateLesson,
  handleDeleteLesson,
} from '../controllers/lesson'
import { handleAuthentication } from '../middlewares/auth'
import { handleCheckUserRole, IsTeacher } from '../middlewares/checkUserRole'
import multer from "multer"

const router = express.Router()

// Setup multer for file uploads
const upload = multer({ dest: 'uploads/' }) // Set the destination for uploaded files

// Lesson Routes
router.post(
  '/lessons/withvideo',
  upload.single('video'), // Handle single video file upload
  handleAddLesson // Controller to handle adding a lesson
)
router.post(
  '/lesson/add',
  handleAuthentication,
  handleCheckUserRole,
  handleAddLesson
)
router.get(
  '/lesson/view/:id',
  handleAuthentication,
  handleCheckUserRole,
  handleViewLesson
)
router.put(
  '/lesson/update/:id',
  handleAuthentication,
  handleCheckUserRole,
  handleUpdateLesson
)
router.delete(
  '/lesson/delete/:id',
  handleAuthentication,
  handleCheckUserRole,
  handleDeleteLesson
)

// Course Routes
router.get('/view/bysubdomain', handleViewCourseByDomainAndSubdomains) // View courses by subdomain
router.get('/view/bydomain', handleViewCourseByDomainOnly) // View courses by domain only
router.get('/view/:id', handleViewCourse) // View a specific course by ID
router.post(
  '/add',
  handleAuthentication,
  handleCheckUserRole,
  handleCreateCourse
) // Add a new course
router.put(
  '/update/:id',
  handleAuthentication,
  handleCheckUserRole,
  handleUpdateCourse
) // Update an existing course
router.delete(
  '/delete/:id',
  handleAuthentication,
  handleCheckUserRole,
  handleDeleteCourse
) // Delete a course by ID

// Teacher-Specific Course Routes
router.get(
  '/teacher/view',
  handleAuthentication,
  IsTeacher,
  handleViewCourseByTeacher
) // View courses for a specific teacher

export default router // Export the router for use in the main application
