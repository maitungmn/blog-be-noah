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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blogs = void 0;
const typeorm_1 = require("typeorm");
let Blogs = class Blogs {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Blogs.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 500 }),
    __metadata("design:type", String)
], Blogs.prototype, "blogID", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 1000 }),
    __metadata("design:type", String)
], Blogs.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar' }),
    __metadata("design:type", String)
], Blogs.prototype, "imageUrl", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar' }),
    __metadata("design:type", String)
], Blogs.prototype, "content", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', nullable: true }),
    __metadata("design:type", Date)
], Blogs.prototype, "createAt", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 300, default: "default", nullable: true }),
    __metadata("design:type", String)
], Blogs.prototype, "createBy", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', nullable: true }),
    __metadata("design:type", Date)
], Blogs.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 300, default: "default", nullable: true }),
    __metadata("design:type", String)
], Blogs.prototype, "updatedBy", void 0);
Blogs = __decorate([
    typeorm_1.Entity()
], Blogs);
exports.Blogs = Blogs;
//# sourceMappingURL=blog.entity.js.map