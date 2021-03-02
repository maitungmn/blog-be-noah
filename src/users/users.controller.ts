import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from "express";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiBodyOptions,
} from '@nestjs/swagger';

import { IUserInfo } from './dto/userInfo.dto';
import { UsersService } from './users.service';
import { USERS } from './../constants';

@ApiBearerAuth()
@ApiTags(USERS)
@Controller(USERS)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiOperation({ summary: 'Register' })
  // @ApiBody({
  //   name: "Tung",
  //   phone: "11234567895",
  //   dob: "24/12/1994",
  //   email: "tung3.admin@test.com",
  //   password: "123456",
  //   role: "admin"
  // } as ApiBodyOptions)
  // @ApiResponse({
  //   status: 200,
  //   description: 'The found record',
  // })
  @Post('register')
  createUser(@Body() userInfo: IUserInfo) {
    return this.usersService.createUser(userInfo)
  }

  @Post('verify')
  verifyToken(@Req() req: Request) {
    const token = req.headers.authorization;
    return this.usersService.verifyToken(token);
  }
}
