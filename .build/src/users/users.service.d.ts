import { IUserInfo } from './dto/userInfo.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UsersService {
    private usersRepository;
    private validUserInfosKey;
    private validAdminRoles;
    constructor(usersRepository: Repository<User>);
    createUser(userInfo: IUserInfo): Promise<{
        data: import("firebase-admin").auth.UserRecord;
    }>;
    verifyToken(token: string): Promise<import("firebase-admin").auth.DecodedIdToken>;
    userInfoValidator(userInfo: IUserInfo): void;
}
