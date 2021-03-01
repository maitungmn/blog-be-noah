import { BlogsService } from './blogs.service';
import { IBlogMainInfos } from './dto/blog.dto';
import { Request } from "express";
export declare class BlogsController {
    private readonly blogsService;
    constructor(blogsService: BlogsService);
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
}
