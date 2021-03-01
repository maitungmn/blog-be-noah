"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const firebaseConfig = {
    databaseURL: process.env.FIREBASE_DATABASE_URL,
};
exports.default = firebaseConfig;
//# sourceMappingURL=configs.js.map