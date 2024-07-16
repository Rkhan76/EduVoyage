import { Request, Response } from 'express';
import { PrismaClient, UserRole  } from '@prisma/client';
import STATUS_CODE from '../constant/httpStatusCode'
import { AuthBody } from '../types/type';
import { handleHashedPassword, handleComparePassword, handleGenerateToken } from '../utils/cred';


const prisma = new PrismaClient();

export async function handleSignup(
  req: Request<any, any, AuthBody>,
  res: Response
) {
  const { username, password, role } = req.body

  console.log(username, password) /// add zod validation

  try {

    const userexit = await prisma.user.findFirst({
      where:{
        username
      }
    })

    if(userexit){
      return res.status(STATUS_CODE.CONFLICT).json({
        success: false,
        message: 'User already exits',
      })
    }

    const hashedPassword = await handleHashedPassword(password)

    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        roles: role ? [role] : [UserRole.STUDENT],
      },
    })

if(!newUser){
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      success: false,
      error: 'Unable to process the request',
    })
}


    return res
      .status(200)
      .json({ message: 'User created successfully', user: newUser })
  } catch (error) {
    console.error('Error creating user:', error)
    return res.status(500).json({ error: 'Failed to create user' })
  } finally {
    await prisma.$disconnect() 
  }
}

export async function handleSignin(
  req: Request<any, any, AuthBody>,
  res: Response
) {
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
 
    
    const token = await handleGenerateToken({ userId: user.id, username, roles: user.roles})

    // Continue with your login logic, e.g., generating a token
    return res.status(STATUS_CODE.OK).json({
      success: true,
      message: 'Signed in successfully',
       user:{
        username,
        token
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
