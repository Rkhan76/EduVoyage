import { z } from 'zod';
export declare enum UserRole {
    STUDENT = "STUDENT",
    TEACHER = "TEACHER",
    BOTH = "BOTH"
}
export declare const signupInput: z.ZodObject<{
    fullname: z.ZodString;
    username: z.ZodString;
    password: z.ZodString;
    role: z.ZodOptional<z.ZodNativeEnum<typeof UserRole>>;
}, "strip", z.ZodTypeAny, {
    fullname: string;
    username: string;
    password: string;
    role?: UserRole | undefined;
}, {
    fullname: string;
    username: string;
    password: string;
    role?: UserRole | undefined;
}>;
export type SignupParams = z.infer<typeof signupInput>;
export declare const signinInput: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export type SigninParams = z.infer<typeof signinInput>;
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
