import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogController } from './blogs.controller';
import { BlogService } from './blogs.service';
import { BlogsRepoModule } from '../Repos/BlogsRepo/blogsRepo.module';

@Module({
  imports: [BlogsRepoModule],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogsModule {}