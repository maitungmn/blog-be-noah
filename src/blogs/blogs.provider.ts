import { BLOGS_REPOSITORY, DATABASE_CONNECTION } from '../constants';
import { Connection } from 'typeorm';
import { Blogs } from './entities/blog.entity';

export const blogsProviders = [
  {
    provide: BLOGS_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Blogs),
    inject: [DATABASE_CONNECTION],
  },
];