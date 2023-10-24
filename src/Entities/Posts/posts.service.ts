import { Injectable } from "@nestjs/common";
import { PostsRepoService } from "./PostsRepo/postsRepo.service";
import { CrudService } from "../../Common/Services/crudService";
import { CreatePostDto } from "./PostsRepo/Dtos/CreatePostDto";
import { Post, PostDocument } from "./PostsRepo/Schema/post.schema";

@Injectable()
export class PostService extends CrudService<CreatePostDto, Post, PostDocument, PostsRepoService>{
    constructor(private postRepo: PostsRepoService) {
        super(postRepo)
    }
}