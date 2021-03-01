import { Connection } from 'typeorm';
import { Blogs } from './entities/blog.entity';
export declare const blogsProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<Blogs>;
    inject: string[];
}[];
