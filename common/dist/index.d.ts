import { z } from 'zod';
export declare enum UserRole {
    STUDENT = "STUDENT",
    TEACHER = "TEACHER",
    BOTH = "BOTH"
}
export declare const signupInput: z.ZodObject<{
    fullname: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    role: z.ZodOptional<z.ZodNativeEnum<typeof UserRole>>;
    avatar: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    fullname: string;
    email: string;
    password: string;
    role?: UserRole | undefined;
    avatar?: string | undefined;
}, {
    fullname: string;
    email: string;
    password: string;
    role?: UserRole | undefined;
    avatar?: string | undefined;
}>;
export type SignupParams = z.infer<typeof signupInput>;
export declare const signinInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type SigninParams = z.infer<typeof signinInput>;
export declare const googleSigninInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodNullable<z.ZodString>;
    googleId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string | null;
    googleId: string;
}, {
    email: string;
    password: string | null;
    googleId: string;
}>;
export type GoogleSigninParams = z.infer<typeof googleSigninInput>;
export declare const domainAndSubdomainInput: z.ZodObject<{
    domainName: z.ZodString;
    subdomains: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    domainName: string;
    subdomains: string[];
}, {
    domainName: string;
    subdomains?: string[] | undefined;
}>;
export type DomainAndSubdomainParams = z.infer<typeof domainAndSubdomainInput>;
export interface DomainNameOnly {
    id: string;
    name: string;
}
export interface GetDomainResponse {
    success: boolean;
    message: string;
    data?: DomainNameOnly[];
}
export interface CartWithCourseIdOnlyProps {
    success: boolean;
    cart: string[];
}
export declare const UserId: z.ZodObject<{
    UserId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    UserId: string;
}, {
    UserId: string;
}>;
export type UserId = z.infer<typeof UserId>;
