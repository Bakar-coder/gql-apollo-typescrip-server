"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
const _constants_1 = require("../_constants");
const { combine, timestamp, label, prettyPrint, colorize } = winston_1.format;
exports.logger = winston_1.createLogger({
    format: combine(label({ label: 'logs' }), timestamp(), prettyPrint(), colorize()),
    transports: _constants_1.__prod__
        ? [
            new winston_1.transports.File({ filename: 'errors.log', level: 'error' }),
            new winston_1.transports.File({ filename: 'info.log' }),
        ]
        : [
            new winston_1.transports.File({ filename: 'errors.log', level: 'error' }),
            new winston_1.transports.Console({ format: winston_1.format.simple() }),
        ],
});
//# sourceMappingURL=logger.js.map