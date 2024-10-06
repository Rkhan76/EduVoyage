import { Request, Response, NextFunction } from 'express';
import STATUS_CODES from '../constant/httpStatusCode'
import { handleVerifyToken } from '../utils/cred';
import {DecodedToken} from "../types/type"




export async function handleAuthentication(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  console.log('command has reacher handleAuthentication')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(STATUS_CODES.UNAUTHORIZED).json({
      success: false,
      message: 'You are not authorized to access this route',
    })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decodedToken = await handleVerifyToken(token);

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

