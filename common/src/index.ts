import { z } from 'zod'

// User roles enum
export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  BOTH = 'BOTH',
}

// Signup input validation schema
export const signupInput = z.object({
  fullname: z.string().min(1, 'Full name is required'),
  email: z
    .string()
    .email('Invalid email address')
    .max(100, 'Email must be at most 100 characters long'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  role: z.nativeEnum(UserRole).optional(),
  avatar: z.string().optional(),
})

export type SignupParams = z.infer<typeof signupInput>

// Signin input validation schema
export const signinInput = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .max(100, 'Email must be at most 100 characters long'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

export type SigninParams = z.infer<typeof signinInput>

// Google sign-in validation schema
export const googleSigninInput = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .max(100, 'Email must be at most 100 characters long'),
  password: z.string().nullable(), // Password can be null for Google sign-in
  googleId: z.string().nonempty('Google ID is required'), // Google ID is required
})

export type GoogleSigninParams = z.infer<typeof googleSigninInput>

// Domain and subdomain input validation schema
export const domainAndSubdomainInput = z.object({
  domainName: z.string().min(1, { message: 'Domain name cannot be empty' }),
  subdomains: z.array(z.string()).default([]),
})

export type DomainAndSubdomainParams = z.infer<typeof domainAndSubdomainInput>

// Domain name response interface
export interface DomainNameOnly {
  id: string
  name: string
}

// Get domain response interface
export interface GetDomainResponse {
  success: boolean
  message: string
  data?: DomainNameOnly[]
}

// Cart response interface
export interface CartWithCourseIdOnlyProps {
  success: boolean
  cart: string[]
}

// User ID input validation schema
export const UserId = z.object({
  UserId: z.string(),
})

export type UserId = z.infer<typeof UserId>
