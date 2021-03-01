"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersProviders = void 0;
const constants_1 = require("src/constants");
const user_entity_1 = require("./entities/user.entity");
exports.usersProviders = [
    {
        provide: constants_1.USERS_REPOSITORY,
        useFactory: (connection) => connection.getRepository(user_entity_1.User),
        inject: [constants_1.DATABASE_CONNECTION],
    },
];
//# sourceMappingURL=users.providers.js.map