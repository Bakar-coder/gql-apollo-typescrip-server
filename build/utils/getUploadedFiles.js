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
exports.uploadedFiles = void 0;
const upload_1 = require("./upload");
exports.uploadedFiles = (files) => __awaiter(void 0, void 0, void 0, function* () {
    const paths = [];
    for (let instance of files) {
        const file = yield instance;
        const path = yield upload_1.uploadFile(file);
        path && paths.push(path);
    }
    return paths;
});
//# sourceMappingURL=getUploadedFiles.js.map