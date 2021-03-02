import { DATABASE_CONNECTION } from '../constants';
import { ConnectionOptions, createConnection } from 'typeorm';
import { Blogs } from '../blogs/entities/blog.entity';
import { User } from '../users/entities/user.entity';
require('dotenv').config();

const configs = {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT || 0,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
}

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async () => await createConnection({
      type: 'postgres',
      ...configs,
      database: 'blogs',
      entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
        Blogs,
        User,
      ],
      synchronize: true,
    } as ConnectionOptions),
  },
];