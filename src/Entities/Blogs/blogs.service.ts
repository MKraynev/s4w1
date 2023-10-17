import { Injectable } from '@nestjs/common';
import { BlogsRepoService } from '../Repos/BlogsRepo/blogsRepo.service';

@Injectable()
export class BlogService {
  //2ой слой
  //Содержит бизнес логику
  //которую вызываем из Controller(router) слоя
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
