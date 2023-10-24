import { Module } from '@nestjs/common';
import { PostService } from './posts.service';
import { PostController } from './posts.controller';
import { PostsRepoModule } from './PostsRepo/postsRepo.module';


@Module({
    imports: [PostsRepoModule],
    controllers: [PostController],
    providers: [PostService],
})
export class PostsModule { }