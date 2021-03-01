import { IBlogMainInfos } from './dto/blog.dto';
import { Request } from "express";
import { Repository } from 'typeorm';
import { Blogs } from './entities/blog.entity';
export declare class BlogsService {
    private blogsRepository;
    private validBlogInfosKey;
    constructor(blogsRepository: Repository<Blogs>);
    create(createBlogDto: IBlogMainInfos, req: Request): Promise<{
        data: {
            writeTime: FirebaseFirestore.Timestamp;
            blogID: string;
        };
    }>;
    update(id: string, updateBlogDto: Partial<IBlogMainInfos>): Promise<{
        data: {
            writeTime: FirebaseFirestore.Timestamp;
            blogID: string;
        };
    }>;
    remove(id: string): Promise<{
        data: {
            writeTime: FirebaseFirestore.Timestamp;
            blogID: string;
        };
    }>;
    blogInfoValidator(createBlogDto: IBlogMainInfos): void;
    modifiedBlogInfoValidator(blogDto: Partial<IBlogMainInfos>): void;
    findOneAndUpdate(blogID: any, updateObj: any): Promise<void>;
    findOneAndRemove(blogID: any): Promise<void>;
}
