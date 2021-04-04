"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = void 0;
const fs_1 = require("fs");
exports.deleteFile = (filePath) => fs_1.unlink(filePath, (ex) => {
    if (ex)
        throw ex;
});
//# sourceMappingURL=deleteFile.js.map