import { Request, Response, NextFunction } from 'express';
import STATUS_CODES from '../constant/httpStatusCode'
import { handleVerifyToken } from '../utils/cred';
import {DecodedToken} from "../types/type"




export async function handleAuthentication(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  console.log("handle authentication : ", token)

  if (!token) {
    return res.status(STATUS_CODES.UNAUTHORIZED).json({
      success: false,
      message: 'You are not authorized to access this route',
    })    
  }

  try {
    const decodedToken = await handleVerifyToken(token);

    if (!decodedToken) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json({
        success: false,
        message: 'Invalid or expired token',
      })
    }

    console.log("token : ", decodedToken)

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

