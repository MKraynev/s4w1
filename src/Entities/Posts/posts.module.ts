import { Module } from '@nestjs/common';
import { PostService } from './posts.service';
import { PostController } from './posts.controller';
import { PostsRepoModule } from './PostsRepo/postsRepo.module';
import { BlogsModule } from '../Blogs/blogs.module';


@Module({
    imports: [PostsRepoModule, BlogsModule],
    controllers: [PostController],
    providers: [PostService],
})
export class PostsModule { }