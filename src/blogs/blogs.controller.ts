import { Controller, Get, Post, Body, Put, Param, Delete, Req, HttpStatus } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { IBlogMainInfos } from './dto/blog.dto';
import { Request } from "express";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { BLOGS } from '../constants';
import { sampleCreateBlogSuccessResult } from './docs';

@ApiBearerAuth()
@ApiTags(BLOGS)
@Controller(BLOGS)
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) { }

  @ApiOperation({ summary: 'Create Blog' })
  @ApiBody({ type: IBlogMainInfos })
  @ApiResponse({
    status: HttpStatus.OK,
    description: JSON.stringify(sampleCreateBlogSuccessResult),
  })
  @Post()
  create(@Body() createBlogDto: IBlogMainInfos, @Req() req: Request) {
    return this.blogsService.create(createBlogDto, req);
  }

  @ApiOperation({ summary: 'Update Blog' })
  @ApiParam({
    name: 'id',
    type: 'string'
  })
  @ApiBody({ type: IBlogMainInfos })
  @ApiResponse({
    status: HttpStatus.OK,
    description: JSON.stringify(sampleCreateBlogSuccessResult),
  })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: Partial<IBlogMainInfos>) {
    return this.blogsService.update(id, updateBlogDto);
  }

  @ApiOperation({ summary: 'Update Blog' })
  @ApiParam({
    name: 'id',
    type: 'string'
  })
  @ApiBody({ type: IBlogMainInfos })
  @ApiResponse({
    status: HttpStatus.OK,
    description: JSON.stringify(sampleCreateBlogSuccessResult),
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogsService.remove(id);
  }
}
