import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import {z} from "zod"
import {CartWithCourseIdOnlyProps, UserId} from "@rkhan76/common"

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




// Zod schema for validating the request body
const fetchCartSchema = z.object({
  userDetails: z.object({
    userId: z.string().nonempty('User ID is required'),
  }),
});

export async function fetchCartForUserWithCourseIdOnly(
  req: Request,
  res: Response
): Promise<Response> {
  // Validate the request body using Zod
  const parseResult = fetchCartSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({
      success: false,
      message: parseResult.error.errors.map((err) => err.message).join(', '),
    });
  }

  const { userId } = parseResult.data.userDetails;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        cart: true, // No need to select nested courses since it's a String[]
      },
    });

    if (!user || !user.cart) {
      return res.status(404).json({ success: false, cart: [] });
    }

    const courseIds = user.cart.courses; // Directly use the courses array

    return res.status(200).json({
      success: true,
      cart: courseIds,
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return res.status(500).json({ success: false, cart: [] });
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

