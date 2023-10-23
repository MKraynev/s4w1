import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './Schemas/blog.schema';
import { BlogsRepoService } from './blogsRepo.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }])],
  providers: [BlogsRepoService],
  exports: [BlogsRepoService]
})
export class BlogsRepoModule {}