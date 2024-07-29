import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { LessonBody } from '../types/type'
import STATUS_CODE from '../constant/httpStatusCode'

const prisma = new PrismaClient()

export async function handleAddLesson(
  req: Request<any, any, LessonBody>,
  res: Response
) {

    //add zod validation
  const { title, content, videoUrl, videoLength, videoFormat, courseId } = req.body

 
  try {
    // Create a new lesson
    const lesson = await prisma.lesson.create({
      data: {
        title,
        content,
        videoUrl,
        videoLength,
        videoFormat,
        courseId,
      },
    })

    if(!lesson){
        return res.status(400).json({
          success: false,
          message: 'something went wrong while adding lesson to course',
        })
    }

   return res.status(STATUS_CODE.CREATED).json({
     success: true,
     message: 'Lesson created successfully',
     lesson,
   })
  } catch (error) {
    console.error('Error creating lesson:', error)

   
    return res.status(500).json({
      success: false,
      message: 'Failed to create lesson',
    })
  } finally {
    await prisma.$disconnect()
  }
}
