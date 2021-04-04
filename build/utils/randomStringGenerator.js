"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randStr = void 0;
const crypto_1 = require("crypto");
exports.randStr = crypto_1.randomBytes(12).toString('hex');
//# sourceMappingURL=randomStringGenerator.js.map