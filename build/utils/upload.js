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
exports.uploadFile = void 0;
const fs_1 = require("fs");
const paths_1 = require("./paths");
exports.uploadFile = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const filePath = yield paths_1.paths(file);
    const { createReadStream } = yield file;
    return new Promise((reslve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        return createReadStream()
            .pipe(fs_1.createWriteStream(filePath))
            .on('finish', () => reslve(filePath))
            .on('error', (ex) => reject(ex));
    }));
});
//# sourceMappingURL=upload.js.map