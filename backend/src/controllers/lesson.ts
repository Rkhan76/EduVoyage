import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { LessonBody } from '../types/type'
import STATUS_CODE from '../constant/httpStatusCode'
import { stat } from 'fs'

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

export async function handleViewLesson(
  req: Request<any, any, LessonBody>,
  res: Response
) {

  const id: string = req.params.id

   try{
      const lesson = await prisma.lesson.findUnique({
        where:{
          id
        }
      })

      if(!lesson){
        return res.status(404).json({
          success: false,
          message: "Lesson not found"
        })
      }

      return res.status(200).json({
        success: true,
        message: "lesson detail fetch successfully",
        lesson
      })
   }catch (error) {
    console.error(error)

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch the lesson detail',
    })
  } finally {
    await prisma.$disconnect()
  }
}

export async function handleUpdateLesson(
  req: Request<any, any, LessonBody>,
  res: Response
) {
  const id: string = req.params.id

  const { title, content, videoUrl, videoLength, videoFormat } = req.body

  try {
    const updateLesson = await prisma.lesson.update({
      where: {
        id,
      },
      data: {
        title,
        content,
        videoUrl,
        videoLength,
        videoFormat,
      },
    })

    if (!updateLesson) {
      return res.status(400).json({
        success: false,
        message: 'failed to update the lesson',
      })
    }

    return res.status(200).json({
      success: true,
      message: "Lesson data update successfully",
      data: updateLesson,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update the lesson'
    })
  } finally {
    await prisma.$disconnect()
  }
}

export async function handleDeleteLesson(req: Request, res: Response) {
  const id: string = req.params.id

  try {
    // Check if the lesson exists
    const lesson = await prisma.lesson.findUnique({
      where: {
        id,
      },
    })

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found',
      })
    }

    // Delete the lesson
    const deleteLesson = await prisma.lesson.delete({
      where: {
        id,
      },
    })

    return res.status(200).json({
      success: true,
      message: 'Lesson successfully deleted',
      data: deleteLesson,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete the lesson',
    })
  } finally {
    await prisma.$disconnect()
  }
}
