import { Request, Response } from 'express'
import STATUS_CODE from '../constant/httpStatusCode'
import { PrismaClient } from '@prisma/client'
import { DecodedToken } from "../types/type"

const prisma = new PrismaClient()

interface CourseBody {
  title: string
  description: string
  price: number
  domain: string[] // Change this to string[]
  subDomain: string
  creatorId: string
  userDetails: DecodedToken
}


export async function handleCreateCourse(
  req: Request<any, any, CourseBody>,
  res: Response
) {
  const { title, description, price, domain, subDomain } = req.body;
  const { userId } = req.body.userDetails;

  try {
    const course = await prisma.course.create({
      data: {
        title,
        description,
        price,
        domain, // Ensure this is an array of strings, e.g., ["Development"]
        subDomain,
        creatorId: userId,
      },
    });

    return res.json({
      success: true,
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong with the server',
    });
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

export async function handleUpdateCourse(
  req: Request<any, any, CourseBody>,
  res: Response
) {

  console.log("update page here")

  const id: string = req.params.id
  const { title, description, price } = req.body

  // add zode valiation

  try {
    const updateCourse = await prisma.course.update({
      where: {
        id, 
      },
      data: {
        title,
        description,
        price,
      },
    })

    return res.json({
      success: true,
      message: 'Course updated successfully',
      updateCourse,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: 'Something wrong with server',
    })
  }
}

export async function handleDeleteCourse(req: Request, res: Response) {
  const id: string = req.params.id

  try {
    const course = await prisma.course.findUnique({
      where: { id },
    })

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      })
    }

    const result = await prisma.$transaction(async (prisma) => {
      await prisma.lesson.deleteMany({
        where: {
          courseId: id,
        },
      })

      await prisma.enrollment.deleteMany({
        where: {
          courseId: id,
        },
      })

      await prisma.review.deleteMany({
        where: {
          courseId: id,
        },
      })

      return await prisma.course.delete({
        where: {
          id,
        },
      })
    })

    return res.status(200).json({
      success: true,
      message: 'Course and related records deleted successfully',
      data: result,
    })
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      success: false,
      message: 'Something went wrong with the server',
    })
  }
}
