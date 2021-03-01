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
exports.UsersService = void 0;
const admin_1 = require("src/firebase/admin");
const common_1 = require("@nestjs/common");
const constants_1 = require("src/constants");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
        this.validUserInfosKey = ["name", "phone", "dob", "email", "password"];
        this.validAdminRoles = ["admin", "default"];
    }
    async createUser(userInfo) {
        this.userInfoValidator(userInfo);
        try {
            const userRecord = await admin_1.adminAuth.createUser({
                email: userInfo.email,
                emailVerified: false,
                phoneNumber: "+" + userInfo.phone,
                password: userInfo.password,
                displayName: userInfo.name,
                disabled: false,
            });
            const updateObj = {
                email: userInfo.email,
                username: userInfo.name,
                phone: userInfo.phone,
                dob: userInfo.dob,
                role: userInfo.role || "default",
            };
            const fbPromise = admin_1.usersCol(userRecord.uid).set(updateObj);
            const users = new user_entity_1.User();
            Object.assign(users, Object.assign(Object.assign({}, updateObj), { userID: userRecord.uid }));
            const pgPromise = this.usersRepository.save(users);
            await Promise.all([fbPromise, pgPromise]);
            return {
                data: userRecord
            };
        }
        catch (e) {
            throw new common_1.HttpException(e, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async verifyToken(token) {
        if (token != null && token != "") {
            try {
                const decodedToken = await admin_1.adminAuth.verifyIdToken(token.replace("Bearer ", ""));
                return decodedToken;
            }
            catch (error) {
                console.error(error);
                throw new common_1.HttpException(error, common_1.HttpStatus.BAD_REQUEST);
            }
        }
        else {
            throw new common_1.HttpException("Token was missing!", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    userInfoValidator(userInfo) {
        if (this.validUserInfosKey.some(i => !userInfo[i])) {
            throw new common_1.HttpException("Invalid request body!", common_1.HttpStatus.BAD_REQUEST);
        }
        if (userInfo.role && !this.validAdminRoles.includes(userInfo.role)) {
            throw new common_1.HttpException(`Invalid request user role (${this.validAdminRoles.join(", ")})!`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(constants_1.USERS_REPOSITORY)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map