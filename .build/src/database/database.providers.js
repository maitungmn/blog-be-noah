"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const constants_1 = require("src/constants");
const typeorm_1 = require("typeorm");
require('dotenv').config();
const configs = {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT || 0,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
};
exports.databaseProviders = [
    {
        provide: constants_1.DATABASE_CONNECTION,
        useFactory: async () => await typeorm_1.createConnection(Object.assign(Object.assign({ type: 'postgres' }, configs), { database: 'blogs', entities: [
                __dirname + '/../**/*.entity{.ts,.js}',
            ], synchronize: true })),
    },
];
//# sourceMappingURL=database.providers.js.map