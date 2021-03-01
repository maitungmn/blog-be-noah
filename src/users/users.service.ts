import { adminAuth, usersCol } from 'src/firebase/admin';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUserInfo } from './dto/userInfo.dto';

@Injectable()
export class UsersService {
  private validUserInfosKey = ["name", "phone", "dob", "email", "password"]
  private validAdminRoles = ["admin", "default"]

  constructor() {
  }

  async createUser(userInfo: IUserInfo) {
    this.userInfoValidator(userInfo)
    try {
      const userRecord = await adminAuth.createUser({
        email: userInfo.email,
        emailVerified: false,
        phoneNumber: "+" + userInfo.phone,
        password: userInfo.password,
        displayName: userInfo.name,
        disabled: false,
      })
      await usersCol(userRecord.uid).set({
        email: userInfo.email,
        username: userInfo.name,
        phone: userInfo.phone,
        dob: userInfo.dob,
        role: userInfo.role || "default",
      })
      return {
        data: userRecord
      }
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST)
    }
  }

  async verifyToken(token: string) {
    if (token != null && token != "") {
      try {
        const decodedToken = await adminAuth.verifyIdToken(token.replace("Bearer ", ""))
        return decodedToken
      } catch (error) {
        console.error(error);
        throw new HttpException(error, HttpStatus.BAD_REQUEST)
      }
    } else {
      throw new HttpException("Token was missing!", HttpStatus.BAD_REQUEST)
    }
  }

  userInfoValidator(userInfo: IUserInfo) {
    if (this.validUserInfosKey.some(i => !userInfo[i])) {
      throw new HttpException("Invalid request body!", HttpStatus.BAD_REQUEST)
    }

    if (userInfo.role && !this.validAdminRoles.includes(userInfo.role)) {
      throw new HttpException(`Invalid request user role (${this.validAdminRoles.join(", ")})!`, HttpStatus.BAD_REQUEST)
    }
  }
}
