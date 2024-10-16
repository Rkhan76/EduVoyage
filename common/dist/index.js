"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserId = exports.domainAndSubdomainInput = exports.googleSigninInput = exports.signinInput = exports.signupInput = exports.UserRole = void 0;
const zod_1 = require("zod");
// User roles enum
var UserRole;
(function (UserRole) {
    UserRole["STUDENT"] = "STUDENT";
    UserRole["TEACHER"] = "TEACHER";
    UserRole["BOTH"] = "BOTH";
})(UserRole || (exports.UserRole = UserRole = {}));
// Signup input validation schema
exports.signupInput = zod_1.z.object({
    fullname: zod_1.z.string().min(1, 'Full name is required'),
    email: zod_1.z
        .string()
        .email('Invalid email address')
        .max(100, 'Email must be at most 100 characters long'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters long'),
    role: zod_1.z.nativeEnum(UserRole).optional(),
    avatar: zod_1.z.string().optional(),
});
// Signin input validation schema
exports.signinInput = zod_1.z.object({
    email: zod_1.z
        .string()
        .email('Invalid email address')
        .max(100, 'Email must be at most 100 characters long'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters long'),
});
// Google sign-in validation schema
exports.googleSigninInput = zod_1.z.object({
    email: zod_1.z
        .string()
        .email('Invalid email address')
        .max(100, 'Email must be at most 100 characters long'),
    password: zod_1.z.string().nullable(), // Password can be null for Google sign-in
    googleId: zod_1.z.string().nonempty('Google ID is required'), // Google ID is required
});
// Domain and subdomain input validation schema
exports.domainAndSubdomainInput = zod_1.z.object({
    domainName: zod_1.z.string().min(1, { message: 'Domain name cannot be empty' }),
    subdomains: zod_1.z.array(zod_1.z.string()).default([]),
});
// User ID input validation schema
exports.UserId = zod_1.z.object({
    UserId: zod_1.z.string(),
});
