import { Request, Response} from 'express'
import { PrismaClient, UserRole } from '@prisma/client'
import {
  signinInput,
  SignupParams,
  SigninParams,
  signupInput,
  googleSigninInput,
} from '@rkhan76/common'
import {
  handleHashedPassword,
  handleComparePassword,
  handleGenerateToken,
} from '../utils/cred'
import STATUS_CODE from '../constant/httpStatusCode'

// Initialize Prisma client
const prisma = new PrismaClient()

export async function handleSignup(
  req: Request<any, any, SignupParams>,
  res: Response
) {
  console.log(req.body)

  // const validZodResult = signupInput.safeParse(req.body)

  // if (!validZodResult.success) {
  //   const validationErrors = validZodResult.error.errors.map((error) => ({
  //     path: error.path,
  //     message: error.message,
  //   }))

  //   return res.status(STATUS_CODE.BAD_REQUEST).json({
  //     success: false,
  //     errors: validationErrors,
  //   })
  // }

  const { email, password, role, fullname } = req.body

  try {
    const existingUser = await prisma.user.findFirst({
      where: { email },
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
        where: { email },
        data: { roles: [UserRole.BOTH] },
      })

      if (!updatedUser) {
        return res.status(STATUS_CODE.CONFLICT).json({
          success: false,
          message: `Something went wrong while registering as a ${role}.`,
        })
      }

      console.log('command has reached to status ', updatedUser)

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
        email,
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
  // const validZodResult = signinInput.safeParse(req.body)

  // if (!validZodResult.success) {
  //   const validationErrors = validZodResult.error.errors.map((error) => ({
  //     path: error.path,
  //     message: error.message,
  //   }))
  //   return res.status(STATUS_CODE.BAD_REQUEST).json({
  //     success: false,
  //     errors: validationErrors,
  //   })
  // }

  const { email, password } = req.body
  console.log("emial : ", email, " password : ", password)

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user || !user.password) {
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

    console.log('password is correct')

    const token = await handleGenerateToken({
      userId: user.id,
      email: user.email,
      fullname: user.fullname,
      roles: user.roles,
    })

    console.log("token : ", token)

    return res.status(STATUS_CODE.OK).json({
      success: true,
      message: 'Signed in successfully',
      userData: {
        email,
        token,
      },
    })
  } catch (error) {
    console.error('Error signing in:', error)
    return res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ error: 'Failed to sign in due to an internal error' })
  } finally {
    await prisma.$disconnect()
  }
}

export const googleLoginHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, name, picture, googleId } = res.locals.userData
  console.log(name)

  try {
    const role = req.query.role as string
    let enumRole: UserRole

    if (role === '0') {
      enumRole = UserRole.STUDENT
    } else if (role === '1') {
      enumRole = UserRole.TEACHER
    } else {
      throw new Error('Invalid role provided')
    }

    console.log(enumRole, 'enumRole')

    let user = await prisma.user.findUnique({
      where: { email },
    })

    if (user) {
      if (!user.roles.includes(enumRole)) {
        const updatedRoles =
          user.roles.includes(UserRole.STUDENT) ||
          user.roles.includes(UserRole.TEACHER)
            ? [UserRole.BOTH]
            : [enumRole]

        user = await prisma.user.update({
          where: { email },
          data: { roles: updatedRoles },
        })
      }
    } else {
      user = await prisma.user.create({
        data: {
          fullname: name,
          email,
          password: null,
          googleId,
          avatar: picture,
          roles: [enumRole],
        },
      })
    }

    const { id } = user

    const token = await handleGenerateToken({
      userId: user.id,
      email: user.email,
      fullname: user.fullname,
      roles: user.roles,
    })

    console.log('token came in auth controller:', token)

    res.status(200).json({
      success: true,
      message: 'Successfully signed in using Google authentication',
      token,
      user: {
        id,
        email: user.email,
        fullname: user.fullname,
        image: user.avatar,
      },
    })
  } catch (err) {
    console.error('Error handling Google login:', err)
    res.status(500).json({
      message: 'Internal Server Error',
    })
  }
}

