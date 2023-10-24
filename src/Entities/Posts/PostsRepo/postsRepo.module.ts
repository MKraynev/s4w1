import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './Schema/post.schema';
import { PostsRepoService } from './postsRepo.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }])],
  providers: [PostsRepoService],
  exports: [PostsRepoService]
})
export class PostsRepoModule { }