import { Module } from '@nestjs/common';
import { BlogController } from './Entities/Blogs/blogs.controller';
import { BlogService } from './Entities/Blogs/blogs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_URL } from './settings';
import { BlogsModule } from './Entities/Blogs/blogs.module';
import { TestModule } from './Common/Routes/testing-all-Data/testing.module';


@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URL),
    BlogsModule,
    TestModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
