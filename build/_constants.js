"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BRAINTREE_PRIVATE_KEY = exports.BRAINTREE_PUBLIC_KEY = exports.BRAINTREE_MERCHANT_ID = exports.RESET_PASSWORD_PREFIX = exports.PORT = exports.APP_DOMAIN = exports.PRIVATE_KEY = exports.__prod__ = exports.REDIS_URL = exports.CORS_ORIGIN = void 0;
exports.CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';
exports.REDIS_URL = process.env.REDIS_URL;
exports.__prod__ = process.env.NODE_ENV === 'production';
exports.PRIVATE_KEY = process.env.PRIVATE_KEY;
exports.APP_DOMAIN = process.env.APP_DOMAIN;
exports.PORT = process.env.PORT || 8080;
exports.RESET_PASSWORD_PREFIX = 'reset-password';
exports.BRAINTREE_MERCHANT_ID = process.env.BRAINTREE_MERCHANT_ID;
exports.BRAINTREE_PUBLIC_KEY = process.env.BRAINTREE_PUBLIC_KEY;
exports.BRAINTREE_PRIVATE_KEY = process.env.BRAINTREE_PRIVATE_KEY;
//# sourceMappingURL=_constants.js.map