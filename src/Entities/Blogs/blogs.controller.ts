import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { CreateBlogDto } from '../Repos/BlogsRepo/Dtos/CreateBlogDto';
import { BlogService } from './blogs.service';
import { UpdateBlogDto } from '../Repos/BlogsRepo/Dtos/UpdateBlogDto';
import { ServiceExecutionResultStatus } from '../../Common/Services/ServiceExecutionStatus';



@Controller("blogs")
export class BlogController {
  //1ый слой
  //выполняющий router функции
  constructor(private blogService: BlogService) { }

  Blogs
  @Get()
  async getBlog() {
    let findBlogs = await this.blogService.Find();

    switch (findBlogs.executionStatus) {
      case ServiceExecutionResultStatus.Success:
        return findBlogs.executionResultObject;
        break;

      default:
        throw new NotFoundException();
        break;
    }


  }

  @Post()
  async saveBlog(@Body() blog: CreateBlogDto) {
    let savedBlog = await this.blogService.Save(blog);

    switch (savedBlog.executionStatus) {
      case ServiceExecutionResultStatus.Success:
        return savedBlog.executionResultObject;
        break;

      default:
        throw new BadRequestException();
        break;
    }
  }

  @Get(":id")
  async GetBlogById(@Param('id') id: string) {
    let findBlog = await this.blogService.FindById(id);
    switch (findBlog.executionStatus) {
      case ServiceExecutionResultStatus.Success:
        return findBlog.executionResultObject;
        break;

      default:
      case ServiceExecutionResultStatus.NotFound:
        throw new NotFoundException();
        break;
    }
  }

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

  // //Blog posts
  // @Get(":id/posts")
  // GetBlogsPosts(){
  //   return "blogs post"
  // }

  // @Post(":id/posts")
  // SavePost(){
  //   return "post for blog saved"
  // }
}