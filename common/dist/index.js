"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserId = exports.domainAndSubdomainInput = exports.signinInput = exports.signupInput = exports.UserRole = void 0;
const zod_1 = require("zod");
var UserRole;
(function (UserRole) {
    UserRole["STUDENT"] = "STUDENT";
    UserRole["TEACHER"] = "TEACHER";
    UserRole["BOTH"] = "BOTH";
})(UserRole || (exports.UserRole = UserRole = {}));
exports.signupInput = zod_1.z.object({
    fullname: zod_1.z.string(),
    username: zod_1.z.string(),
    password: zod_1.z.string(),
    role: zod_1.z.nativeEnum(UserRole).optional(),
});
exports.signinInput = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.domainAndSubdomainInput = zod_1.z.object({
    domainName: zod_1.z.string().min(1, { message: 'Domain name cannot be empty' }),
    subdomains: zod_1.z.array(zod_1.z.string()).default([]),
});
// typecheck of User id input
exports.UserId = zod_1.z.object({
    UserId: zod_1.z.string()
});
