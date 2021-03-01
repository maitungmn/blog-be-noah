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
exports.PreauthMiddleware = void 0;
const admin_1 = require("./../firebase/admin");
const common_1 = require("@nestjs/common");
let PreauthMiddleware = class PreauthMiddleware {
    constructor() {
    }
    async use(req, res, next) {
        var _a, _b;
        const token = req.headers.authorization;
        if (token != null && token != "") {
            try {
                const decodedToken = await admin_1.adminAuth.verifyIdToken(token.replace("Bearer ", ""));
                req["user"] = decodedToken;
                const userSnapshot = await admin_1.usersCol(decodedToken.uid).get();
                if (!userSnapshot.exists() || ((_a = userSnapshot.val()) === null || _a === void 0 ? void 0 : _a.role) !== "admin") {
                    this.accessDenied(res, "Invalid admin token!");
                }
                else {
                    next();
                }
            }
            catch (error) {
                console.error(error);
                this.accessDenied(res, (_b = error.errorInfo) === null || _b === void 0 ? void 0 : _b.message);
            }
        }
        else {
            this.accessDenied(res);
        }
    }
    accessDenied(res, msg = "") {
        res.status(403).json({
            statusCode: 403,
            timestamp: new Date().toISOString(),
            message: msg || "Access Denied"
        });
    }
};
PreauthMiddleware = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], PreauthMiddleware);
exports.PreauthMiddleware = PreauthMiddleware;
//# sourceMappingURL=preauth.middlewate.js.map