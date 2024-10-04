import { Request, Response } from 'express'
import { PrismaClient, UserRole } from '@prisma/client'
import STATUS_CODE from '../constant/httpStatusCode'
import {
  signinInput,
  SignupParams,
  SigninParams,
  signupInput,
} from '@rkhan76/common'

import {
  handleHashedPassword,
  handleComparePassword,
  handleGenerateToken,
} from '../utils/cred'

const prisma = new PrismaClient()

export async function handleSignup(
  req: Request<any, any, SignupParams>,
  res: Response
) {

  console.log(req.body)

  const validZodResult = signupInput.safeParse(req.body)

  if (!validZodResult.success) {
    const validationErrors = validZodResult.error.errors.map((error) => ({
      path: error.path,
      message: error.message,
    }))

    return res.status(STATUS_CODE.BAD_REQUEST).json({
      success: false,
      errors: validationErrors,
    })
  }


  const { username, password, role, fullname } = validZodResult.data

  try {
    const existingUser = await prisma.user.findFirst({
      where: { username },
    })

    if (existingUser) {
      if (existingUser.roles.includes(UserRole.BOTH)) {
        return res.status(STATUS_CODE.CONFLICT).json({
          success: false,
          message: 'User already exists. Please sign in.',
          existingUser,
        })
      }

      if (
        role === UserRole.STUDENT &&
        existingUser.roles.includes(UserRole.STUDENT)
      ) {
        return res.status(STATUS_CODE.CONFLICT).json({
          success: false,
          message: 'User already exists as a Student.',
          existingUser,
        })
      }

      if (
        role === UserRole.TEACHER &&
        existingUser.roles.includes(UserRole.TEACHER)
      ) {
        return res.status(STATUS_CODE.CONFLICT).json({
          success: false,
          message: 'User already exists as a Teacher.',
          existingUser,
        })
      }

      const updatedUser = await prisma.user.update({
        where: { username },
        data: { roles: [UserRole.BOTH] },
      })

      if (!updatedUser) {
        return res.status(STATUS_CODE.CONFLICT).json({
          success: false,
          message: `Something went wrong while registering as a ${role}.`,
        })
      }

      console.log("command has reached to staus ", updatedUser)

      return res.status(STATUS_CODE.ACCEPTED).json({
        success: true,
        message: `Successfully registered as a ${role ? role : 'STUDENT'}.`,
        updatedUser,
      })
    }

    const hashedPassword = await handleHashedPassword(password)

    const newUser = await prisma.user.create({
      data: {
        fullname,
        username,
        password: hashedPassword,
        roles: role ? [role] : [UserRole.STUDENT],
      },
    })

    if (!newUser) {
      return res.status(STATUS_CODE.BAD_REQUEST).json({
        success: false,
        error: 'Unable to process the request.',
      })
    }

    return res.status(200).json({
      success: true,
      message: `User created successfully as ${
        role === undefined ? 'student' : role
      }`,
      user: newUser,
    })
  } catch (error) {
    console.error('Error creating user:', error)
    return res.status(500).json({
      success: false,
      error: 'Failed to create user.',
    })
  } finally {
    await prisma.$disconnect()
  }
}

export async function handleSignin(
  req: Request<any, any, SigninParams>,
  res: Response
) {
  //zod validation

  const validZodResult = signinInput.safeParse(req.body)

  if (!validZodResult.success) {
    const validationErrors = validZodResult.error.errors.map((error) => ({
      path: error.path,
      message: error.message,
    }))
  }

  const { username, password } = req.body

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    })

    if (!user) {
      return res.status(STATUS_CODE.UNAUTHORIZED).json({
        success: false,
        message: 'You are not registered. Please register.',
      })
    }

    const isPasswordValid = await handleComparePassword(password, user.password)

    if (!isPasswordValid) {
      return res.status(STATUS_CODE.UNAUTHORIZED).json({
        success: false,
        message: 'Invalid email/password. Please try again.',
      })
    }

    const token = await handleGenerateToken({
      userId: user.id,
      username: user.username,
      fullname: user.fullname,
      roles: user.roles,
    })

    // Continue with your login logic, e.g., generating a token
    return res.status(STATUS_CODE.OK).json({
      success: true,
      message: 'Signed in successfully',
      userData: {
        username,
        token,
      },
    })
  } catch (error) {
    console.error('Error signing in:', error)
    return res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ error: 'Failed to sign in due to an internal error' })
  } finally {
    await prisma.$disconnect() // Disconnect Prisma client
  }
}
