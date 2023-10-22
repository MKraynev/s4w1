import { Injectable } from '@nestjs/common';
import { BlogsRepoService } from '../Repos/BlogsRepo/blogsRepo.service';
import { CreateBlogDto } from '../Repos/BlogsRepo/Dtos/CreateBlogDto';
import { UpdateBlogDto } from '../Repos/BlogsRepo/Dtos/UpdateBlogDto';
import { Blog } from '../Repos/BlogsRepo/Schemas/blog.schema';
import { ServiceExecutionResult } from '../../Common/Services/ServiseExecutionResult';
import { ServiceExecutionResultStatus } from '../../Common/Services/ServiceExecutionStatus';
import { ServiceBlogDto } from './Entities/blogs.serviceDto';

@Injectable()
export class BlogService {
  constructor(private blogsRepo: BlogsRepoService) { }

  public async Save(blog: CreateBlogDto): Promise<ServiceExecutionResult<ServiceExecutionResultStatus, ServiceBlogDto>> {
    let savedBlog = await this.blogsRepo.save(blog);

    return new ServiceExecutionResult(ServiceExecutionResultStatus.Success, savedBlog.toObject())
  }

  public async Count(searchNameTerm?: string): Promise<ServiceExecutionResult<ServiceExecutionResultStatus, number>> {
    let countRes = await this.blogsRepo.count(searchNameTerm);

    return new ServiceExecutionResult(ServiceExecutionResultStatus.Success, countRes)
  }


  public async Find(searchNameTerm?: string, skip?: number, limit?: number): Promise<ServiceExecutionResult<ServiceExecutionResultStatus, ServiceBlogDto[]>> {
    let blogs = (await this.blogsRepo.find(searchNameTerm, skip, limit)).map(blog => blog.toObject()) as ServiceBlogDto[];

    return new ServiceExecutionResult(ServiceExecutionResultStatus.Success, blogs)
  }

  public async FindById(id: string): Promise<ServiceExecutionResult<ServiceExecutionResultStatus, ServiceBlogDto>> {
    let blog = await this.blogsRepo.findById(id);
    if (blog)
      return new ServiceExecutionResult(ServiceExecutionResultStatus.Success, blog.toObject())

    return new ServiceExecutionResult(ServiceExecutionResultStatus.NotFound)
  }

  public async Update(id: string, newBlogData: UpdateBlogDto): Promise<ServiceExecutionResult<ServiceExecutionResultStatus, ServiceBlogDto>> {
    let blog = await this.blogsRepo.findById(id);

    if (!blog)
      return new ServiceExecutionResult(ServiceExecutionResultStatus.NotFound);

    Object.assign(blog, newBlogData);

    let savedBlog = await this.blogsRepo.save(blog);
    return new ServiceExecutionResult(ServiceExecutionResultStatus.Success, savedBlog.toObject())
  }

  public async Delete(id: string): Promise<ServiceExecutionResult<ServiceExecutionResultStatus, ServiceBlogDto>> {
    let deleteBlog = await this.blogsRepo.deleteById(id)

    if (deleteBlog)
      return new ServiceExecutionResult(ServiceExecutionResultStatus.Success, deleteBlog.toObject());

    return new ServiceExecutionResult(ServiceExecutionResultStatus.NotFound);
  }
}
