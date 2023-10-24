import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { PostService } from "./posts.service";
import { ServiceExecutionResultStatus } from "../../Common/Services/Types/ServiceExecutionStatus";
import { CreatePostDto } from "./PostsRepo/Dtos/CreatePostDto";

@Controller("posts")
export class PostController {
    constructor(private postService: PostService) { }

    @Get()
    async GetPosts() {
        let findPost = await this.postService.Find();

        switch (findPost.executionStatus) {
            case ServiceExecutionResultStatus.Success:
                return findPost.executionResultObject;
                break;

            default:
                return;
        }
    }

    //get -> /hometask_13/api/posts/{id}
    @Get(":id")
    async GetPostById(@Param('id') id: string) {
        let findPost = await this.postService.FindById(id);

        switch (findPost.executionStatus) {
            case ServiceExecutionResultStatus.Success:
                return findPost.executionResultObject;
                break;

            default:
            case ServiceExecutionResultStatus.NotFound:
                throw new NotFoundException();
                break;
        }
    }

    //get -> hometask_13/api/posts/{postId}/comments
    @Get(":id/comments")
    async GetPostComments() {
        return ["some comment 1", "some comment 2"];
    }

    //post -> /hometask_13/api/posts
    @Post()
    async SavePost(@Body() post: CreatePostDto) {
        let savePost = await this.postService.Save(post);

        switch (savePost.executionStatus) {
            case ServiceExecutionResultStatus.Success:
                return savePost.executionResultObject;
                break;

            default:
                throw new BadRequestException();
                break;
        }
    }

    //put -> /hometask_13/api/posts/{id}
    @Put(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    async UpdatePost(
        @Param("id") id: string,
        @Body() postData: CreatePostDto
    ) {
        let updatePost = await this.postService.Update(id, postData);

        switch (updatePost.executionStatus) {
            case ServiceExecutionResultStatus.Success:
                return;
                break;

            default:
            case ServiceExecutionResultStatus.NotFound:
                throw new NotFoundException();
                break;
        }
    }

    //delete -> /hometask_13/api/posts/{id}
    @Delete("id")
    @HttpCode(HttpStatus.NO_CONTENT)
    async DeletePost(@Param('id') id: string) {
        let deletePost = await this.postService.Delete(id);

        switch (deletePost.executionStatus) {
            case ServiceExecutionResultStatus.Success:
                return;
                break;

            default:
            case ServiceExecutionResultStatus.NotFound:
                throw new NotFoundException();
                break;
        }
    }
}