import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { CreateBlogDto } from './BlogsRepo/Dtos/CreateBlogDto';
import { BlogService } from './blogs.service';
import { UpdateBlogDto } from './BlogsRepo/Dtos/UpdateBlogDto';
import { ServiceExecutionResultStatus } from '../../Common/Services/Types/ServiceExecutionStatus';
import { ControllerBlogDto } from './Entities/blogs.controllerDto';



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
        //TODO можно ли объявить единый фильтр для Controller?
        let blogs = findBlogs.executionResultObject.map(serviceBlog => new ControllerBlogDto(serviceBlog));
        return blogs;
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
        let blog = new ControllerBlogDto(savedBlog.executionResultObject);
        return blog;
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
        let blog = new ControllerBlogDto(findBlog.executionResultObject);
        return blog;
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
}