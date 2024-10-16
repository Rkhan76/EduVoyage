import { Request, Response, NextFunction } from 'express';
import STATUS_CODES from '../constant/httpStatusCode'
import { handleVerifyToken } from '../utils/cred';
import {DecodedToken} from "../types/type"
import axios from 'axios'
import { oauth2Client } from '../utils/googleConfig'




export async function handleAuthentication(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization
let a = 1;
  console.log(`command has reacher handleAuthentication ${++a}`)

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(STATUS_CODES.UNAUTHORIZED).json({
      success: false,
      message: 'You are not authorized to access this route',
    })
  }

  const token = authHeader.split(' ')[1]

  try {
    console.log("token in handleAuthentication function middleware", token)
    const decodedToken = await handleVerifyToken(token);
    console.log('decoded token in handleAuthentication function middleware', token)

    if (!decodedToken) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json({
        success: false,
        message: 'Invalid or expired token',
      })
    }

    req.body.userDetails = decodedToken as DecodedToken
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to authenticate token',
    })
  }
}

export const googleLoginMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log(req.query.role, "role is here")
  const code = req.query.code as string

  try {
    const { tokens } = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens)

    const userRes = await axios.get(
      'https://www.googleapis.com/oauth2/v1/userinfo',
      {
        params: { alt: 'json', access_token: tokens.access_token },
      }
    )

    console.log(userRes.data)
    const { email, name, picture } = userRes.data


    res.locals.userData = { email, name, picture, googleId: tokens.id_token }

    next()
  } catch (err) {
    console.error('Google login error:', err)
    res.status(500).json({
      message: 'Internal Server Error',
    })
  }
}


