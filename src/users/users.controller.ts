import { Body, Controller, HttpStatus, Post, Req } from '@nestjs/common';
import { Request } from "express";
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
} from '@nestjs/swagger';

import { IUserInfo } from './dto/userInfo.dto';
import { UsersService } from './users.service';
import { USERS } from './../constants';
import { sampleRegisterSuccessResult } from './docs';

@ApiTags(USERS)
@Controller(USERS)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiOperation({ summary: 'Register' })
  @ApiBody({ type: IUserInfo })
  @ApiResponse({
    status: HttpStatus.OK,
    description: JSON.stringify(sampleRegisterSuccessResult),
  })
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
