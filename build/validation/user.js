"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = exports.validatePassword = void 0;
const joi_1 = __importDefault(require("joi"));
const joi_password_complexity_1 = __importDefault(require("joi-password-complexity"));
const complexityOptions = {
    min: 8,
    max: 24,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    requirementCount: 5,
};
exports.validatePassword = (pass) => joi_password_complexity_1.default(complexityOptions, 'Password').validate(pass);
exports.validateRegister = (opts) => {
    return joi_1.default.object({
        firstName: joi_1.default.string().required(),
        lastName: joi_1.default.string().required(),
        username: joi_1.default.string().required().min(3),
        email: joi_1.default.string().email({ minDomainSegments: 2 }).required(),
        password: joi_1.default.string().required().min(8).max(25),
        password2: joi_1.default.string().required().min(8).max(25),
        seller: joi_1.default.boolean(),
        admin: joi_1.default.boolean(),
    }).validate(opts);
};
//# sourceMappingURL=user.js.map