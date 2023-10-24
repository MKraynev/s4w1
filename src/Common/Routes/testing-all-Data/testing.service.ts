import { Injectable } from "@nestjs/common";
import { MongooseRepo } from "../../../Entities/Repos/MongooseRepo";
import { BlogsRepoService } from "../../../Entities/Blogs/BlogsRepo/blogsRepo.service";
import { PostsRepoService } from "../../../Entities/Posts/PostsRepo/postsRepo.service";

@Injectable()
export class TestService {
    constructor(
        private blogsRepo: BlogsRepoService,
        private postsRepo: PostsRepoService
    ) {

    }
    public async DeleteAll() {
        this.blogsRepo.DeleteAll();
        this.postsRepo.DeleteAll();
        return true;
    }
}