import { Module } from '@nestjs/common';
import { BlogController } from './Entities/Blogs/blogs.controller';
import { BlogService } from './Entities/Blogs/blogs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_URL } from './settings';
import { BlogsRepoModule } from './Entities/Repos/BlogsRepo/blogsRepo.module';


@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URL),
    BlogsRepoModule],
  controllers: [BlogController],
  providers: [BlogService],
})
export class AppModule { }
