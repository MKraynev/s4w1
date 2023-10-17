import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CreateBlogDto } from '../Repos/BlogsRepo/Dtos/CreateBlogDto';
import { BlogsRepoService } from '../Repos/BlogsRepo/blogsRepo.service';
import { BlogService } from './blogs.service';



@Controller("blogs")
export class BlogController {
  //1ый слой
  //выполняющий router функции
  constructor(private blogService: BlogService) {}

  Blogs
  @Get()
  async getBlog() {
    let blogs = await this.blogService.Find();

    return blogs.executionResultObject;
  }

  @Post()
  async saveBlog(@Body() blog: CreateBlogDto){
    let savedBlog = await this.blogService.Save(blog);
    return savedBlog.executionResultObject;
  }

  // @Get(":id")
  // GetBlogById(){
  //   return "get by id"
  // }

  // @Put(":id")
  // UpdateBlog(){
  //   return "blog updated"
  // }

  // @Delete(":id")
  // DeleteBlog(){
  //   return "blog deleted"
  // }

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