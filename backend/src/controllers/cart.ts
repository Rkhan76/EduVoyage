import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function addCourseToCart(req: Request, res: Response) {
  const { courseId } = req.body
  const { userId } = req.body.userDetails

  console.log(userId, 'user id on cart controller')
  console.log(courseId, 'course id on cart controller')

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
          courses: [courseId],
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

    return res.status(200).json(cart)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Failed to add course to cart' })
  }
}
