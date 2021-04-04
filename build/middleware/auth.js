"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.isMerchant = exports.isAuth = void 0;
exports.isAuth = ({ context }, next) => {
    const { res } = context;
    if (!res.locals.isAuth)
        throw new Error('Unauthenticated');
    return next();
};
exports.isMerchant = ({ context }, next) => {
    const { res } = context;
    if (!res.locals.user.admin && !res.locals.user.seller)
        throw new Error('Unauthorized. Upgrade to a pro account.');
    return next();
};
exports.isAdmin = ({ context }, next) => {
    const { res } = context;
    if (!res.locals.user.admin)
        throw new Error('Unauthorized, Admin access only.');
    return next();
};
//# sourceMappingURL=auth.js.map