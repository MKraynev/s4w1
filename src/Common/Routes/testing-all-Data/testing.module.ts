import { Module } from '@nestjs/common';
import { TestController } from './testing.controller';
import { TestService } from './testing.service';
import { BlogsRepoModule } from '../../../Entities/Blogs/BlogsRepo/blogsRepo.module';
import { PostsRepoModule } from '../../../Entities/Posts/PostsRepo/postsRepo.module';


@Module({
  imports: [BlogsRepoModule, PostsRepoModule],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule { }