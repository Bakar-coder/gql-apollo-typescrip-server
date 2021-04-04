"use strict";
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
require("reflect-metadata");
require("dotenv-safe/config");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const graphql_upload_1 = require("graphql-upload");
const cors_1 = __importDefault(require("cors"));
const type_graphql_1 = require("type-graphql");
const db_config_1 = require("./db-config");
const path_1 = require("path");
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const helmet_1 = __importDefault(require("helmet"));
const ioredis_1 = __importDefault(require("ioredis"));
const _constants_1 = require("./_constants");
const typeorm_1 = require("typeorm");
const logger_1 = require("./utils/logger");
const braintree_1 = require("./resolvers/braintree");
const compression_1 = __importDefault(require("compression"));
const User_1 = require("./entities/User");
const userLoader_1 = require("./utils/userLoader");
const products_1 = require("./resolvers/admin/products");
const cart_1 = require("./resolvers/shop/cart");
const product_1 = require("./resolvers/shop/product");
const user_1 = require("./resolvers/user");
const port = process.env.PORT || 8080;
const app = express_1.default();
const redis = new ioredis_1.default(_constants_1.REDIS_URL);
const redisStore = connect_redis_1.default(express_session_1.default);
const server = () => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield typeorm_1.createConnection(Object.assign(Object.assign({}, db_config_1.dbConfig), { entities: ['build/entities/*.js'], migrations: ['build/migrations/*.js'] }));
    app
        .disable('x-powered-by')
        .set('trust proxy', 1)
        .use(express_1.default.urlencoded({ extended: false }))
        .use('/media', express_1.default.static(path_1.resolve('media')))
        .use(cors_1.default({ credentials: true, origin: _constants_1.CORS_ORIGIN }))
        .use(graphql_upload_1.graphqlUploadExpress({ maxFileSize: 100000000, maxFiles: 10 }))
        .use(express_session_1.default({
        name: 'sid',
        secret: _constants_1.PRIVATE_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: {
            sameSite: 'lax',
            httpOnly: _constants_1.__prod__,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            secure: _constants_1.__prod__,
        },
        store: new redisStore({ client: redis, disableTouch: true }),
    }))
        .use((req, _, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.session.userId)
            return next();
        const user = yield User_1.User.findOne(req.session.userId);
        req.user = user;
        return next();
    }))
        .use((req, res, next) => {
        if (req.user) {
            res.locals.user = req.user;
            res.locals.isAuth = true;
            res.locals.userLoader = userLoader_1.userLoader();
        }
        next();
    })
        .use(helmet_1.default())
        .use(compression_1.default());
    const apollo = new apollo_server_express_1.ApolloServer({
        uploads: false,
        schema: yield type_graphql_1.buildSchema({
            validate: false,
            resolvers: [
                user_1.UserResolver,
                cart_1.CartResolver,
                product_1.ProductResolver,
                products_1.AdminProductResolver,
                braintree_1.BraintreeResolver,
            ],
        }),
        context: ({ req, res }) => ({ req, res, redis }),
    });
    apollo.applyMiddleware({ app, cors: false });
    conn && logger_1.logger.info('🚀 connected to postgresql database.');
    conn && (yield conn.runMigrations());
    conn &&
        app.listen(port, () => logger_1.logger.info(`🚀 server running on port :${port}`));
});
process.on('uncaughtException', (ex) => logger_1.logger.error(ex.message, ex));
process.on('unhandledRejection', (ex) => logger_1.logger.error(ex));
server().catch((ex) => logger_1.logger.error(ex.message, ex));
//# sourceMappingURL=server.js.map