import { Request, Response } from 'express'
import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export async function handleFetchEnrolledCourse(req: Request, res: Response) {
  const { userId } = req.body.userDetails

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required.' })
  }

  try {
    const enrolledCourses = await prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: true, // Fetch the associated course details
      },
    })

    console.log(enrolledCourses)
    // Extract the course details from the enrollments
    const courseDetails = enrolledCourses.map((enrollment) => enrollment.course)

    return res.status(200).json({
      success: true,
      message: 'succesfully fetch the enrolled courses',
      enrolledCourses: courseDetails,
    })
  } catch (error) {
    console.error('Error fetching enrolled courses:', error)
    return res.status(500).json({ error: 'Failed to fetch enrolled courses.' })
  }
}

