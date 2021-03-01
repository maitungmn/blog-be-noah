import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { firebaseAdmin } from 'src/firebase/admin';
import { IBlog, IBlogMainInfos } from './dto/blog.dto';

@Injectable()
export class BlogsService {
  private validBlogInfosKey = ["title", "imageUrl", "content"]
  private firestore: FirebaseFirestore.Firestore;
  private blogCol: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

  constructor() {
    this.firestore = firebaseAdmin.firestore()
    this.blogCol = this.firestore.collection("blogs")
  }

  async create(createBlogDto: IBlogMainInfos) {
    this.blogInfoValidator(createBlogDto)

    try {
      const res = await this.blogCol.doc().set({
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

  // update(id: number, updateBlogDto) {
  //   return `This action updates a #${id} blog`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} blog`;
  // }

  blogInfoValidator(createBlogDto: IBlogMainInfos) {
    if (this.validBlogInfosKey.some(i => !createBlogDto[i])) {
      throw new HttpException("Invalid request body!", HttpStatus.BAD_REQUEST)
    }
  }
}
