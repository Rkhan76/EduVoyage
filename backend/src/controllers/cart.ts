import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function addCourseToCart(req: Request, res: Response) {
  const { courseId } = req.body
  const { userId } = req.body.userDetails

  console.log(courseId, " courseId")
  console.log(userId, " userId")

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
          courses: { set: [courseId] }, // Initialize with courseId
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

    return res.status(200).json({success: true,message: "Course has successfully to cart", cartData: cart})
  } catch (error) {
    console.error(error)
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

    console.log(user)

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // If user has no cart, return empty array
    if (!user.cart) {
      return res.status(200).json({ cart: [] })
    }

    // Return cart data, only course IDs
    return res.status(200).json({
      success: true,
      cart: user.cart.courses || [], // Return empty array if no courses
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Failed to fetch cart' })
  }
}

