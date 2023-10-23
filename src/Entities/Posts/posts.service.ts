import { Injectable } from "@nestjs/common";
import { PostsRepoService } from "./PostsRepo/postsRepo.service";

@Injectable()
export class PostService{
    constructor(private postRepo: PostsRepoService) {}
}