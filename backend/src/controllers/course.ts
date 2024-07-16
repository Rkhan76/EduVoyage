import { Request, Response } from 'express'
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
