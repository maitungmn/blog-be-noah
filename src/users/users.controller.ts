import { Controller, Post, Req } from '@nestjs/common';
import { Request } from "express";

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  @Post('auth/verify')
  verifyToken(@Req() req: Request) {
    const token = req.headers.authorization;
    return this.usersService.verifyToken(token);
  }
}
