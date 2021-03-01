import { DATABASE_CONNECTION, USERS_REPOSITORY } from 'src/constants';
import { Connection, Repository } from 'typeorm';
import { User } from './entities/user.entity';

export const usersProviders = [
  {
    provide: USERS_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: [DATABASE_CONNECTION],
  },
];