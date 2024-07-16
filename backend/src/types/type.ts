import {UserRole} from "@prisma/client"

export interface AuthBody {
  username: string
  password: string
  role?: UserRole 
}

export interface DecodedToken {
  userId: string
  username: string
  roles: string[]
}
