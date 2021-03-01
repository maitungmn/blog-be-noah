import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { DatabaseModule } from 'src/database/database.module';
import { blogsProviders } from './blogs.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [BlogsController],
  providers: [...blogsProviders, BlogsService]
})
export class BlogsModule { }
