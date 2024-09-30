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
