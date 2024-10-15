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
  role: z.nativeEnum(UserRole).optional(),
})

export type SignupParams = z.infer<typeof signupInput>

export const signinInput = z.object({
  username: z.string(),
  password: z.string(),
})

export type SigninParams = z.infer<typeof signinInput>

export const domainAndSubdomainInput = z.object({
  domainName: z.string().min(1, { message: 'Domain name cannot be empty' }),
  subdomains: z.array(z.string()).default([]),
})

export type DomainAndSubdomainParams = z.infer<typeof domainAndSubdomainInput>

////
export interface DomainNameOnly {
  id: string
  name: string
}

export interface GetDomainResponse {
  success: boolean
  message: string
  data?: DomainNameOnly[]
}

export interface CartWithCourseIdOnlyProps {
  success: boolean
  cart: string[]
}

// typecheck of User id input
export const UserId = z.object({
  UserId: z.string()
})

export type UserId = z.infer<typeof UserId>
