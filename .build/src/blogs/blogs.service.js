"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogsService = void 0;
const common_1 = require("@nestjs/common");
const admin_1 = require("src/firebase/admin");
const constants_1 = require("src/constants");
const typeorm_1 = require("typeorm");
const blog_entity_1 = require("./entities/blog.entity");
let BlogsService = class BlogsService {
    constructor(blogsRepository) {
        this.blogsRepository = blogsRepository;
        this.validBlogInfosKey = ["title", "imageUrl", "content"];
    }
    async create(createBlogDto, req) {
        this.blogInfoValidator(createBlogDto);
        try {
            const updateObj = {
                title: createBlogDto.title,
                content: createBlogDto.content,
                imageUrl: createBlogDto.imageUrl,
                _createBy: "admin",
                _createAt: new Date(),
            };
            const blogID = admin_1.blogCol.doc().id;
            const fbPromise = admin_1.blogCol.doc(blogID).set(updateObj);
            const blogs = Object.assign(new blog_entity_1.Blogs, Object.assign({ blogID }, updateObj));
            const pgPromise = this.blogsRepository.save(blogs);
            const [res, _] = await Promise.all([fbPromise, pgPromise]);
            return {
                data: Object.assign({ blogID }, res)
            };
        }
        catch (e) {
            throw new common_1.HttpException(e, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async update(id, updateBlogDto) {
        this.modifiedBlogInfoValidator(updateBlogDto);
        try {
            const updateObj = Object.assign(Object.assign(Object.assign(Object.assign({}, updateBlogDto.title ? { title: updateBlogDto.title } : null), updateBlogDto.imageUrl ? { imageUrl: updateBlogDto.imageUrl } : null), updateBlogDto.content ? { content: updateBlogDto.content } : null), { _updatedBy: "admin", _updatedAt: new Date() });
            const fbPromise = admin_1.blogCol.doc(id).update(updateObj);
            const pgPromise = this.findOneAndUpdate(id, updateObj);
            const [res, _] = await Promise.all([fbPromise, pgPromise]);
            return {
                data: Object.assign({ blogID: id }, res)
            };
        }
        catch (e) {
            throw new common_1.HttpException(e, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async remove(id) {
        try {
            const fbPromise = admin_1.blogCol.doc(id).delete();
            const pgPromise = this.findOneAndRemove(id);
            const [res, _] = await Promise.all([fbPromise, pgPromise]);
            return {
                data: Object.assign({ blogID: id }, res)
            };
        }
        catch (e) {
            throw new common_1.HttpException(e, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    blogInfoValidator(createBlogDto) {
        if (this.validBlogInfosKey.some(i => !createBlogDto[i])) {
            throw new common_1.HttpException("Invalid request body!", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    modifiedBlogInfoValidator(blogDto) {
        if (Object.keys(blogDto).every(i => !this.validBlogInfosKey.includes(i))) {
            throw new common_1.HttpException("Invalid request body!", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findOneAndUpdate(blogID, updateObj) {
        const mergedUpdateObj = {};
        try {
            const foundBlog = await this.blogsRepository.findOne({ blogID });
            if (foundBlog) {
                Object.assign(mergedUpdateObj, Object.assign(Object.assign({}, foundBlog), updateObj));
            }
        }
        finally {
            if (mergedUpdateObj) {
                await this.blogsRepository.save(mergedUpdateObj);
            }
        }
    }
    async findOneAndRemove(blogID) {
        const foundBlog = await this.blogsRepository.findOne({ blogID });
        if (foundBlog) {
            await this.blogsRepository.remove(foundBlog);
        }
    }
};
BlogsService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(constants_1.BLOGS_REPOSITORY)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], BlogsService);
exports.BlogsService = BlogsService;
//# sourceMappingURL=blogs.service.js.map