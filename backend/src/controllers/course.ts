import { Request, Response } from 'express'
import STATUS_CODE from '../constant/httpStatusCode'
import { PrismaClient } from '@prisma/client'
import { DecodedToken } from "../types/type"

const prisma = new PrismaClient()

interface CourseBody {
  title: string
  description: string
  price: number
  creatorId: string
  userDetails: DecodedToken
}


// interface CourseQuery {
//   courseId: string
// }

export async function handleCreateCourse(
  req: Request<any, any, CourseBody>,
  res: Response
) {

  const { title, description, price} = req.body
  const { userId } = req.body.userDetails

  // add zode valiation
  try {
    const course = await prisma.course.create({
      data: {
        title,
        description,
        price,
        creatorId: userId,
      },
    })

    return res.json({
      success: true,
      message: "Course created successfully",
      course
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: 'Something wrong with server',
    })
  }
}

export async function handleViewCourse(req: Request, res: Response) {
  const courseId: string = req.params.id

  console.log('courseId : ', courseId)

  if (!courseId) {
    return res.status(400).json({
      success: false,
      message: 'courseId parameter is required',
    })
  }

  try {
    const courseDetail = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
    })

    if (!courseDetail) {
      return res.status(404).json({
        success: false,
        message: 'There is no course with this Id',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Course detail fetched successfully',
      courseDetail,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      error: 'Something went wrong with the server',
    })
  } finally {
    await prisma.$disconnect()
  }
}
