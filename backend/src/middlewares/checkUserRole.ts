import { Request, Response, NextFunction } from 'express';
import { DecodedToken } from '../types/type';
import { UserRole } from '@prisma/client';
import STATUS_CODES from '../constant/httpStatusCode';

export async function handleCheckUserRole(req: Request, res: Response, next: NextFunction) {
  const userDetails = req.body.userDetails as DecodedToken;
  const { roles } = userDetails;

  

  if (roles && (roles[0] === UserRole.TEACHER || roles[0] === UserRole.BOTH)) {
    return next(); // Use return to prevent further execution
  }

  return res.status(STATUS_CODES.UNAUTHORIZED).json({
    success: false,
    message: "Please register yourself as a Teacher"
  });
}

export const IsTeacher = (req: Request, res: Response, next: NextFunction) => {
  const userDetails = req.body.userDetails as DecodedToken
  const { roles } = userDetails

  if (roles && (roles[0] === UserRole.TEACHER || roles[0] === UserRole.BOTH)) {
    return next()
  }

  return res.status(STATUS_CODES.UNAUTHORIZED).json({
    success: false,
    message: 'Please register yourself as a Teacher',
  })
}