"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsProviders = void 0;
const constants_1 = require("src/constants");
const blog_entity_1 = require("./entities/blog.entity");
exports.blogsProviders = [
    {
        provide: constants_1.BLOGS_REPOSITORY,
        useFactory: (connection) => connection.getRepository(blog_entity_1.Blogs),
        inject: [constants_1.DATABASE_CONNECTION],
    },
];
//# sourceMappingURL=blogs.provider.js.map