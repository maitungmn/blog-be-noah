import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { blogCol } from 'src/firebase/admin';
import { IBlog, IBlogMainInfos, IUpdateBlogMainInfos } from './dto/blog.dto';
import { Request } from "express";
import { BLOGS_REPOSITORY } from 'src/constants';
import { Repository } from 'typeorm';
import { Blogs } from './entities/blog.entity';

@Injectable()
export class BlogsService {
  private validBlogInfosKey = ["title", "imageUrl", "content"]

  constructor(
    @Inject(BLOGS_REPOSITORY)
    private blogsRepository: Repository<Blogs>,
  ) { }

  async create(createBlogDto: IBlogMainInfos, req: Request) {
    this.blogInfoValidator(createBlogDto)

    try {
      const updateObj = {
        title: createBlogDto.title,
        content: createBlogDto.content,
        imageUrl: createBlogDto.imageUrl,
        _createBy: "admin",
        _createAt: new Date(),
      } as IBlog
      const blogID = blogCol.doc().id
      const fbPromise = blogCol.doc(blogID).set(updateObj)

      const blogs = Object.assign(new Blogs, {
        blogID,
        ...updateObj,
      })
      const pgPromise = this.blogsRepository.save(blogs)

      const [res, _] = await Promise.all([fbPromise, pgPromise])

      return {
        data: { blogID, ...res }
      }
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST)
    }
  }

  async update(id: string, updateBlogDto: Partial<IBlogMainInfos>) {
    this.modifiedBlogInfoValidator(updateBlogDto)
    try {
      const updateObj = {
        ...updateBlogDto.title ? { title: updateBlogDto.title } : null,
        ...updateBlogDto.imageUrl ? { imageUrl: updateBlogDto.imageUrl } : null,
        ...updateBlogDto.content ? { content: updateBlogDto.content } : null,
        _updatedBy: "admin",
        _updatedAt: new Date(),
      } as Partial<IUpdateBlogMainInfos>

      const fbPromise = blogCol.doc(id).update(updateObj)

      const pgPromise = this.findOneAndUpdate(id, updateObj)

      const [res, _] = await Promise.all([fbPromise, pgPromise])

      return {
        data: { blogID: id, ...res }
      }
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: string) {
    try {
      const fbPromise = blogCol.doc(id).delete()
      const pgPromise = this.findOneAndRemove(id)

      const [res, _] = await Promise.all([fbPromise, pgPromise])
      return {
        data: { blogID: id, ...res }
      }
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST)
    }
  }

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

  async findOneAndUpdate(blogID, updateObj) {
    const mergedUpdateObj: Partial<IUpdateBlogMainInfos> = {}
    try {
      const foundBlog = await this.blogsRepository.findOne({ blogID })
      if (foundBlog) {
        Object.assign(mergedUpdateObj, {
          ...foundBlog,
          ...updateObj,
        })
      }
    } finally {
      if (mergedUpdateObj) {
        await this.blogsRepository.save(mergedUpdateObj)
      }
    }
  }

  async findOneAndRemove(blogID) {
    const foundBlog = await this.blogsRepository.findOne({ blogID })
    if (foundBlog) {
      await this.blogsRepository.remove(foundBlog)
    }
  }
}
