import { z } from 'zod'

export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  BOTH = 'BOTH',
}

export const signupInput = z.object({
  fullname: z.string(),
  username: z.string(),
  password: z.string(),
  role: z.nativeEnum(UserRole).optional(), // Use nativeEnum for TypeScript enums
})

export type SignupParams = z.infer<typeof signupInput>

export const signinInput = z.object({
   username: z.string(),
   password: z.string()
})

export type SinginParams = z.infer<typeof signinInput>

// export const  = z.object({

// })
