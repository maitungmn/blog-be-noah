import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { IBlogMainInfos } from './dto/blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  create(@Body() createBlogDto: IBlogMainInfos) {
    return this.blogsService.create(createBlogDto);
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
  //   return this.blogsService.update(+id, updateBlogDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.blogsService.remove(+id);
  // }
}
