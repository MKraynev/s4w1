import { Injectable } from '@nestjs/common';
import { BlogsRepoService } from '../Repos/BlogsRepo/blogsRepo.service';
import { CreateBlogDto } from '../Repos/BlogsRepo/Dtos/CreateBlogDto';
import { UpdateBlogDto } from '../Repos/BlogsRepo/Dtos/UpdateBlogDto';
import { ServiceExecutionResultStatus } from 'src/Common/Services/ServiceExecutionStatus';
import { ServiceExecutionResult } from 'src/Common/Services/ServiseExecutionResult';
import { Blog } from '../Repos/BlogsRepo/Schemas/blog.schema';

@Injectable()
export class BlogService {
  //2ой слой
  //Содержит бизнес логику
  //которую вызываем из Controller(router) слоя
  constructor(private blogsRepo: BlogsRepoService) { }

  public async Save(blog: CreateBlogDto): Promise<ServiceExecutionResult<ServiceExecutionResultStatus, Blog>> {
    let savedBlog = await this.blogsRepo.save(blog);

    return new ServiceExecutionResult(ServiceExecutionResultStatus.Success, savedBlog.toObject())
  }

  public async Count(searchNameTerm?: string): Promise<ServiceExecutionResult<ServiceExecutionResultStatus, number>> {
    let countRes = await this.blogsRepo.count(searchNameTerm);

    return new ServiceExecutionResult(ServiceExecutionResultStatus.Success, countRes)
  }


  public async Find(searchNameTerm?: string, skip?: number, limit?: number): Promise<ServiceExecutionResult<ServiceExecutionResultStatus, Blog[]>> {
    let blogs = (await this.blogsRepo.find(searchNameTerm, skip, limit)).map(blog => blog.toObject());

    return new ServiceExecutionResult(ServiceExecutionResultStatus.Success, blogs)
  }

  public async FindById(id: string) {
    let blog = await this.blogsRepo.findById(id);
    if (blog)
      return new ServiceExecutionResult(ServiceExecutionResultStatus.Success, blog.toObject())

    return new ServiceExecutionResult(ServiceExecutionResultStatus.NotFound)
  }

  public async Update(id: string, newBlogData: UpdateBlogDto) {
    let blog = await this.blogsRepo.findById(id);

    if (!blog)
      return new ServiceExecutionResult(ServiceExecutionResultStatus.NotFound);

    Object.assign(blog, newBlogData);

    let savedBlog = await this.blogsRepo.save(blog);
    return new ServiceExecutionResult(ServiceExecutionResultStatus.Success, savedBlog.toObject())
  }

  public async Delete(id: string) {
    let deleteBlog = await this.blogsRepo.deleteById(id)

    if (deleteBlog)
      return new ServiceExecutionResult(ServiceExecutionResultStatus.Success, deleteBlog.toObject());

      return new ServiceExecutionResult(ServiceExecutionResultStatus.NotFound);
  }
}


export class ExecutionResultContainer<ExecutionStatusType, ExecutionResultObjectType> {
  constructor(
    public executionStatus: ExecutionStatusType,
    public executionResultObject: ExecutionResultObjectType | null = null,
    public message: string | null = null) { }

}

export enum ServiseExecutionStatus {
  Unauthorized,
  DataBaseFailed,
  Success,
  NotFound
}
