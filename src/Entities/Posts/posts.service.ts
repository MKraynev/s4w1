import { Injectable } from "@nestjs/common";
import { PostsRepoService } from "./PostsRepo/postsRepo.service";
import { CrudService } from "../../Common/Services/crudService";
import { CreatePostDto } from "./PostsRepo/Dtos/CreatePostDto";
import { Post, PostDocument } from "./PostsRepo/Schema/post.schema";
import { BlogService } from "../Blogs/blogs.service";
import { ServiceExecutionResultStatus } from "../../Common/Services/Types/ServiceExecutionStatus";
import { ServiceExecutionResult } from "../../Common/Services/Types/ServiseExecutionResult";
import { ServiceDto } from "../../Common/Services/Types/ServiceDto";

@Injectable()
export class PostService extends CrudService<CreatePostDto, Post, PostDocument, PostsRepoService>{
    constructor(private postRepo: PostsRepoService, private blogService: BlogService) {
        super(postRepo)
    }

    async Create(blogId: string, postData: CreatePostDto): Promise<ServiceExecutionResult<ServiceExecutionResultStatus, ServiceDto<Post>>>{
        let findBlog = await this.blogService.FindById(blogId);

        if(findBlog.executionStatus !== ServiceExecutionResultStatus.Success)
            return new ServiceExecutionResult(ServiceExecutionResultStatus.NotFound);

        let post = new Post(postData.title, postData.shortDescription, postData.content, blogId, findBlog.executionResultObject.name);
        let savePost = await this.postRepo.Save(post);

        return new ServiceExecutionResult(ServiceExecutionResultStatus.Success, savePost.toObject());
    }
}