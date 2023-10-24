import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { CreateBlogDto } from './BlogsRepo/Dtos/CreateBlogDto';
import { BlogService } from './blogs.service';
import { UpdateBlogDto } from './BlogsRepo/Dtos/UpdateBlogDto';
import { ServiceExecutionResultStatus } from '../../Common/Services/Types/ServiceExecutionStatus';
import { ControllerBlogDto } from './Entities/blogs.controllerDto';
import { PostService } from '../Posts/posts.service';
import { CreatePostDto } from '../Posts/PostsRepo/Dtos/CreatePostDto';



@Controller("blogs")
export class BlogController {
  constructor(private blogService: BlogService, private postService: PostService) { }

  //get -> hometask_13/api/blogs
  @Get()
  async getBlog() {
    let findBlogs = await this.blogService.Find();

    switch (findBlogs.executionStatus) {
      case ServiceExecutionResultStatus.Success:
        //TODO можно ли объявить единый фильтр для Controller?
        let blogs = findBlogs.executionResultObject.map(serviceBlog => new ControllerBlogDto(serviceBlog));
        return blogs;
        break;

      default:
        throw new NotFoundException();
        break;
    }
  }

  //post -> hometask_13/api/blogs
  @Post()
  async saveBlog(@Body() blog: CreateBlogDto) {
    let savedBlog = await this.blogService.Save(blog);

    switch (savedBlog.executionStatus) {
      case ServiceExecutionResultStatus.Success:
        let blog = new ControllerBlogDto(savedBlog.executionResultObject);
        return blog;
        break;

      default:
        throw new BadRequestException();
        break;
    }
  }

  //get -> hometask_13/api/blogs/{blogId}/posts
  @Get(':id/posts')
  async GetBlogsPosts(@Param('id') id: string) {
    let findPosts = await this.postService.Find("blogId", id);

    switch (findPosts.executionStatus) {
      case ServiceExecutionResultStatus.Success:
        return findPosts.executionResultObject;
        break;

      default:
      case ServiceExecutionResultStatus.NotFound:
        throw new NotFoundException();
        break;
    }
  }

  //post -> hometask_13/api/blogs/{blogId}/posts
  @Post(':id/posts')
  @HttpCode(HttpStatus.CREATED)
  async SaveBlogsPosts(@Param('id') id: string, @Body() postData: CreatePostDto) {
    let createPost = await this.postService.Create(id, postData);

    switch (createPost.executionStatus) {
      case ServiceExecutionResultStatus.Success:
        return;
        break;

      default:
      case ServiceExecutionResultStatus.NotFound:
        throw new NotFoundException();
        break;
    }
  }

  //get -> hometask_13/api/blogs/{id}
  @Get(":id")
  async GetBlogById(@Param('id') id: string) {
    let findBlog = await this.blogService.FindById(id);
    switch (findBlog.executionStatus) {
      case ServiceExecutionResultStatus.Success:
        let blog = new ControllerBlogDto(findBlog.executionResultObject);
        return blog;
        break;

      default:
      case ServiceExecutionResultStatus.NotFound:
        throw new NotFoundException();
        break;
    }
  }

  //put -> /hometask_13/api/blogs/{id}
  @Put(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async UpdateBlog(
    @Param('id') id: string,
    @Body() blogData: UpdateBlogDto) {
    let updateBlog = await this.blogService.Update(id, blogData);

    switch (updateBlog.executionStatus) {
      case ServiceExecutionResultStatus.Success:
        return;
        break;

      default:
      case ServiceExecutionResultStatus.NotFound:
        throw new NotFoundException();
        break;
    }
  }

  //delete -> /hometask_13/api/blogs/{id}
  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async DeleteBlog(@Param('id') id: string) {
    let deleteBlog = await this.blogService.Delete(id);

    switch (deleteBlog.executionStatus) {
      case ServiceExecutionResultStatus.Success:
        return;
        break;

      default:
      case ServiceExecutionResultStatus.NotFound:
        throw new NotFoundException();
    }
  }  
}