"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersSeed = void 0;
const bcrypt = require("bcrypt");
exports.usersSeed = [
    {
        name: 'Admin',
        email: 'admin@example.com',
        password: bcrypt.hashSync('password', 10),
        role: 'admin',
    },
    {
        name: 'User',
        email: 'user@example.com',
        password: bcrypt.hashSync('password', 10),
        role: 'user',
    },
    {
        name: 'Manager',
        email: 'manager@example.com',
        password: bcrypt.hashSync('password', 10),
        role: 'manager',
    },
];
//# sourceMappingURL=user.seed.js.map