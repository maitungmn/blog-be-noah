import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { blogCol } from 'src/firebase/admin';
import { IBlog, IBlogMainInfos } from './dto/blog.dto';
import { Request } from "express";

@Injectable()
export class BlogsService {
  private validBlogInfosKey = ["title", "imageUrl", "content"]

  constructor() {
  }

  async create(createBlogDto: IBlogMainInfos, req: Request) {
    this.blogInfoValidator(createBlogDto)

    try {
      const res = await blogCol.doc().set({
        title: createBlogDto.title,
        content: createBlogDto.content,
        imageUrl: createBlogDto.imageUrl,
        _createBy: "admin",
        _createAt: new Date(),
      } as IBlog)
      return {
        data: res
      }
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST)
    }
  }

  async update(id: string, updateBlogDto: Partial<IBlogMainInfos>) {
    this.modifiedBlogInfoValidator(updateBlogDto)
    try {
      const res = await blogCol.doc(id).update({
        ...updateBlogDto.title ? { title: updateBlogDto.title } : null,
        ...updateBlogDto.imageUrl ? { imageUrl: updateBlogDto.imageUrl } : null,
        ...updateBlogDto.content ? { content: updateBlogDto.content } : null,
      } as Partial<IBlogMainInfos>)
      return {
        data: res
      }
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST)
    }
  }

  // remove(id: number) {
  //   return `This action removes a #${id} blog`;
  // }

  blogInfoValidator(createBlogDto: IBlogMainInfos) {
    if (this.validBlogInfosKey.some(i => !createBlogDto[i])) {
      throw new HttpException("Invalid request body!", HttpStatus.BAD_REQUEST)
    }
  }

  modifiedBlogInfoValidator(blogDto: Partial<IBlogMainInfos>) {
    if (Object.keys(blogDto).every(i => !this.validBlogInfosKey.includes(i))) {
      throw new HttpException("Invalid request body!", HttpStatus.BAD_REQUEST)
    }
  }
}
