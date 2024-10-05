import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { DecodedToken } from '../types/type'

const prisma = new PrismaClient()

interface CourseBody {
  title: string
  description: string
  price: number
  domain: string // Domain name
  subDomains: string[] // Array of Subdomain names
  userDetails: DecodedToken // Ensure this is defined correctly
}

interface CourseQuery {
  selectedDomainName?: string
  selectedSubdomainName?: string
}

export async function handleCreateCourse(
  req: Request<any, any, CourseBody>,
  res: Response
) {
  const { title, description, price, domain, subDomains } = req.body
  console.log(req.body.userDetails, " user details is here")
  const { userId }: { userId: string } = req.body.userDetails

  // Ensure subDomains is an array
  if (!Array.isArray(subDomains)) {
    return res.status(400).json({
      success: false,
      message: 'subDomains must be an array.',
    })
  }

  try {
    const result = await prisma.$transaction(async (prisma) => {
      // Check if the domain exists
      const foundDomain = await prisma.domain.findUnique({
        where: { name: domain },
      })

      if (!foundDomain) {
        return res.status(404).json({
          success: false,
          message: 'Domain not found. Please enter a valid domain.',
        })
      }

      // Check for valid subdomains
      const invalidSubdomains = []
      const validSubdomainIds = []

      for (const subDomain of subDomains) {
        const foundSubDomain = await prisma.subdomain.findUnique({
          where: { name: subDomain },
        })

        if (!foundSubDomain) {
          invalidSubdomains.push(subDomain)
        } else {
          validSubdomainIds.push(foundSubDomain.id)
        }
      }

      // If there are invalid subdomains, return an error
      if (invalidSubdomains.length > 0) {
        return res.status(400).json({
          success: false,
          message: `Invalid subdomains: ${invalidSubdomains.join(', ')}`,
        })
      }

      // Create the course and associate with the domain and subdomains
      const course = await prisma.course.create({
        data: {
          title,
          description,
          price,
          domainName: domain,
          subdomainName: subDomains, // Store subdomain names as an array
          creatorId: userId,
        },
      })

      // Add the course ID to the domain's courses array
      await prisma.domain.update({
        where: { name: domain },
        data: {
          courses: {
            push: course.id,
          },
        },
      })

      // Add the course ID to each subdomain's courses array
      for (const subDomain of subDomains) {
        await prisma.subdomain.update({
          where: { name: subDomain },
          data: {
            courses: {
              push: course.id,
            },
          },
        })
      }

      return course
    })

    return res.json({
      success: true,
      message: 'Course created successfully',
      course: result,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: 'Something went wrong with the server',
    })
  } finally {
    await prisma.$disconnect()
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
  console.log('update page here')

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

export async function handleViewCourseByDomainAndSubdomains(
  req: Request<any, any, any, CourseQuery>,
  res: Response
) {
  const { selectedDomainName, selectedSubdomainName } = req.query

  if (!selectedDomainName || !selectedSubdomainName) {
    return res.status(400).json({
      success: false,
      message: 'Domain name and subdomain name are required',
    })
  }

  try {
    const courses = await prisma.course.findMany({
      where: {
        domainName: selectedDomainName,
        subdomainName: {
          has: selectedSubdomainName,
        },
      },
      take: 8,
      include: {
        creator: {
          select: {
            fullname: true,
          },
        },
      },
    })

    return res.status(200).json({ success: true, courses })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: 'Something went wrong with the server',
    })
  }
}




