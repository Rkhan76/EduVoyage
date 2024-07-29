import { z } from 'zod'

// Define TypeScript Enum
enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  BOTH = 'BOTH',
}

// Define Zod Enum Schema
const UserRoleSchema = z.enum([
  UserRole.STUDENT,
  UserRole.TEACHER,
])


export const SignupZodCheck = z.object({
  username: z.string(),
  password: z.string(),
  role: UserRoleSchema.optional()
})
