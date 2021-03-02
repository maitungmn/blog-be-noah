import {
  ApiProperty,
} from '@nestjs/swagger';

export class IBlogMainInfos {
  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  imageUrl: string;

  @ApiProperty({ type: String })
  content: string;
}


export class IBlog extends IBlogMainInfos {
  @ApiProperty({ type: String })
  _createBy: string;

  @ApiProperty({ type: Date })
  _createAt: Date;
}

export class IUpdateBlogMainInfos extends IBlogMainInfos {
  @ApiProperty({ type: String })
  _updatedBy: string;

  @ApiProperty({ type: Date })
  _updatedAt: Date;
}

