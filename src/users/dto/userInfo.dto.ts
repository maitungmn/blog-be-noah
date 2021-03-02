import {
  ApiProperty,
} from '@nestjs/swagger';

type TUserRoles = "admin" | "default"

export class IUserInfo {
  @ApiProperty()
  name: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  dob: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ required: false })
  role?: TUserRoles;
}