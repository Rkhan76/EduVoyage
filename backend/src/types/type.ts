import {UserRole} from "@prisma/client"

export interface AuthBody {
  fullname: string
  username: string
  password: string
  role?: UserRole
}

export interface DecodedToken {
  userId: string
  email: string
  fullname: string
  roles: string[]
}

export interface LessonBody {
  title: string
  content: string
  videoUrl: string
  videoLength: number
  videoFormat: string
  courseId: string
}

