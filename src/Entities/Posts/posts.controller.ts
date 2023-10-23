import { Controller } from "@nestjs/common";
import { PostService } from "./posts.service";

@Controller("posts")
export class PostController{
    constructor(private postService: PostService) {
        
    }
}