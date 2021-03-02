import {
  ApiProperty,
} from '@nestjs/swagger';

type TUserRoles = "admin" | "default"

export class IUserInfo {
  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  phone: string;

  @ApiProperty({ type: String })
  dob: string;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  password: string;

  @ApiProperty({ type: String, required: false, default: "default" })
  role?: TUserRoles;
}