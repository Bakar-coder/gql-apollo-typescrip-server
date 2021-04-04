"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const user_1 = require("../validation/user");
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const Cart_1 = require("../entities/Cart");
const getCart_1 = require("../utils/getCart");
const argon2_1 = __importDefault(require("argon2"));
const gravatar_1 = __importDefault(require("gravatar"));
const User_1 = require("../entities/User");
const _constants_1 = require("../_constants");
const type_graphql_1 = require("type-graphql");
const user_2 = require("../types/user");
const sendMail_1 = __importDefault(require("../utils/sendMail"));
const auth_1 = require("../middleware/auth");
let UserResolver = class UserResolver {
    user({ req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne(req.session.userId);
            const cart = yield Cart_1.Cart.findOne({ where: { userId: req.session.userId } });
            const cartItems = yield getCart_1.getCart(cart.id);
            console.log(cartItems);
            return user ? { user, cart: cartItems } : null;
        });
    }
    users() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield typeorm_1.getConnection()
                .getRepository(User_1.User)
                .createQueryBuilder()
                .getMany();
            return users;
        });
    }
    register(opts, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, username, email, password, password2, seller, admin, } = opts;
            const { error } = user_1.validateRegister(opts);
            const errorField = error === null || error === void 0 ? void 0 : error.details[0].message.split(' ')[0].split('').slice(1, -1).join('');
            const ex = user_1.validatePassword(password);
            if (error)
                return { errors: [{ msg: error.details[0].message, field: errorField }] };
            if (ex.error)
                return {
                    errors: [{ msg: ex.error.details[0].message, field: 'password' }],
                };
            let user = yield User_1.User.findOne({ where: { username } });
            if (user)
                return {
                    errors: [
                        {
                            field: 'username',
                            msg: `Username  ${username} is taken.`,
                        },
                    ],
                };
            if (password !== password2)
                return {
                    errors: [
                        {
                            field: 'password2',
                            msg: `Passwords don't match. try again.`,
                        },
                    ],
                };
            user = yield User_1.User.findOne({ where: { email } });
            if (user)
                return {
                    errors: [
                        {
                            field: 'email',
                            msg: `Email address  ${email} is taken.`,
                        },
                    ],
                };
            const hash = yield argon2_1.default.hash(password);
            const avatar = gravatar_1.default.url(email, { s: '200', r: 'pg', d: 'mm' });
            user = yield User_1.User.create({
                firstName,
                lastName,
                username,
                email,
                avatar,
                password: hash,
                seller,
                admin,
            }).save();
            yield Cart_1.Cart.create({ user }).save();
            req.session.userId = user.id;
            return { user, cart: [] };
        });
    }
    login(usernameOrEmail, password, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne(usernameOrEmail.includes('@' && '.')
                ? { where: { email: usernameOrEmail } }
                : { where: { username: usernameOrEmail } });
            if (!user)
                return {
                    errors: [
                        { field: 'usernameOrEmail', msg: 'Invalid username or email.' },
                    ],
                };
            const ps = yield argon2_1.default.verify(user.password, password);
            if (!ps)
                return { errors: [{ field: 'password', msg: `Invalid password.` }] };
            req.session.userId = user.id;
            const userCart = yield typeorm_1.getConnection().manager.findOne(Cart_1.Cart, {
                where: { userId: user.id },
            });
            const cart = yield getCart_1.getCart(userCart.id);
            return { user, cart };
        });
    }
    logout({ req, res }) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => req.session.destroy((err) => {
                res.clearCookie('sid');
                return err ? resolve(false) : resolve(true);
            }));
        });
    }
    forgotPassword(email, { redis }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { email } });
            if (!user)
                return false;
            const token = uuid_1.v4();
            yield redis.set(_constants_1.RESET_PASSWORD_PREFIX + token, user.id, 'ex', 1000 * 60 * 60 * 72);
            yield sendMail_1.default(_constants_1.CORS_ORIGIN, email, 'Password Reset', `<a href="${_constants_1.CORS_ORIGIN}/forgot-password/${token}"></a>`);
            return true;
        });
    }
    changePassword(newPassword, token, { redis, req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = _constants_1.RESET_PASSWORD_PREFIX + token;
            const userId = yield redis.get(key);
            if (!userId)
                return false;
            const user = yield User_1.User.findOne(parseInt(userId));
            if (!user)
                return false;
            user.password = yield argon2_1.default.hash(newPassword);
            yield user.save();
            req.session.userId = user.id;
            return true;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => user_2.UserType, { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "user", null);
__decorate([
    type_graphql_1.Query(() => [User_1.User]),
    type_graphql_1.UseMiddleware(auth_1.isAdmin),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "users", null);
__decorate([
    type_graphql_1.Mutation(() => user_2.UserType),
    __param(0, type_graphql_1.Arg('opts')),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_2.UserRegisterInputType, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    type_graphql_1.Mutation(() => user_2.UserType),
    __param(0, type_graphql_1.Arg('usernameOrEmail')),
    __param(1, type_graphql_1.Arg('password')),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "logout", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg('email')),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "forgotPassword", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg('newPassword')),
    __param(1, type_graphql_1.Arg('token')),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "changePassword", null);
UserResolver = __decorate([
    type_graphql_1.Resolver()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.js.map