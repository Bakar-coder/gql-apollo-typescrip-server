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
Object.defineProperty(exports, "__esModule", { value: true });
exports.paths = void 0;
const fs_1 = require("fs");
const logger_1 = require("./logger");
const randomStringGenerator_1 = require("./randomStringGenerator");
exports.paths = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const { mimetype, filename } = yield file;
    const [fileType] = mimetype.split('/');
    fs_1.mkdir(`${fileType === 'image'
        ? 'media/images'
        : fileType === 'video'
            ? 'media/videos'
            : fileType === 'application'
                ? 'media/docs'
                : null}`, { recursive: true }, (err) => {
        if (err)
            logger_1.logger.error(err.message, err);
    });
    const mediaPath = fileType === 'image'
        ? `media/images/${randomStringGenerator_1.randStr}_${filename}`
        : fileType === 'video'
            ? `media/videos/${randomStringGenerator_1.randStr}_${filename}`
            : fileType === 'application'
                ? `media/${randomStringGenerator_1.randStr}_${filename}`
                : null;
    return new Promise(resolve => mediaPath ? resolve(mediaPath) : resolve(null));
});
//# sourceMappingURL=paths.js.map