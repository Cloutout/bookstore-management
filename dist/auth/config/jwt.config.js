"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConfig = void 0;
exports.jwtConfig = {
    secret: process.env.JWT_SECRET || 'defaultSecret',
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
};
//# sourceMappingURL=jwt.config.js.map