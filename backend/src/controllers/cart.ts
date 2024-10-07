import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function addCourseToCart(req: Request, res: Response) {
  const { courseId } = req.body
  const { userId } = req.body.userDetails

  if (!courseId) {
    return res.status(400).json({ error: 'Course ID is required' })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { cart: true },
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    let cart
    if (!user.cart) {
      cart = await prisma.cart.create({
        data: {
          user: { connect: { id: userId } },
          courses: { set: [courseId] },
        },
      })
    } else {
      cart = user.cart

      if (cart.courses.includes(courseId)) {
        return res.status(400).json({ error: 'Course is already in the cart' })
      }

      cart = await prisma.cart.update({
        where: { id: cart.id },
        data: {
          courses: { push: courseId },
        },
      })
    }

    return res
      .status(200)
      .json({
        success: true,
        message: 'Course has been successfully added to cart',
        cartData: cart,
      })
  } catch (error) {
    return res.status(500).json({ error: 'Failed to add course to cart' })
  }
}

export async function fetchCartForUser(req: Request, res: Response) {
  const { userId } = req.body.userDetails

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { cart: true },
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    if (!user.cart) {
      return res.status(200).json({ cart: [] })
    }

    return res.status(200).json({
      success: true,
      cart: user.cart.courses || [],
    })
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch cart' })
  }
}

export async function fetchCartDetails(req: Request, res: Response) {
  const { userId } = req.body.userDetails

  try {
    const userCart = await prisma.user.findUnique({
      where: { id: userId },
      include: { cart: true },
    })

    if (!userCart) {
      return res.status(404).json({ error: 'User not found' })
    }

    const courseIds = userCart.cart?.courses
    const courses = await prisma.course.findMany({
      where: {
        id: { in: courseIds },
      },
    })

    return res.status(200).json({
      success: true,
      cart: courses,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Failed to fetch cart details' })
  }
}

