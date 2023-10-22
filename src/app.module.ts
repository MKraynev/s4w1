import { Module } from '@nestjs/common';
import { BlogController } from './Entities/Blogs/blogs.controller';
import { BlogService } from './Entities/Blogs/blogs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_URL } from './settings';
import { BlogsModule } from './Entities/Blogs/blogs.module';


@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URL),
    BlogsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
