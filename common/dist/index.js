"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinInput = exports.signupInput = exports.UserRole = void 0;
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
    role: zod_1.z.nativeEnum(UserRole).optional(), // Use nativeEnum for TypeScript enums
});
exports.signinInput = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string()
});
