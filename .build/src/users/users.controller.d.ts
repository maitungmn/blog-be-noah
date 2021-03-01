import { Request } from "express";
import { IUserInfo } from './dto/userInfo.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(userInfo: IUserInfo): Promise<{
        data: import("firebase-admin").auth.UserRecord;
    }>;
    verifyToken(req: Request): Promise<import("firebase-admin").auth.DecodedIdToken>;
}
