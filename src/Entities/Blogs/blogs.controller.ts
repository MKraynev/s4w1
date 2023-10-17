import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CreateBlogDto } from '../Repos/BlogsRepo/Dtos/CreateBlogDto';
import { BlogsRepoService } from '../Repos/BlogsRepo/blogsRepo.service';



@Controller("blogs")
export class BlogController {
  //1ый слой
  //выполняющий router функции
  constructor(private blogsRepo: BlogsRepoService) {}

  //Blogs
  // @Get()
  // getBlog(): string {
  //   return "get blogs"
  // }

  @Post()
  async saveBlog(@Body() blog: CreateBlogDto){
    let savedBlog = await this.blogsRepo.create(blog);
    return savedBlog;
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