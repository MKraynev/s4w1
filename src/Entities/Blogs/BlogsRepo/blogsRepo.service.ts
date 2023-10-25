import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BlogDto, BlogDocument } from './Schemas/blog.schema';
import { CreateBlogDto } from './Dtos/CreateBlogDto';
import { MongooseRepo } from '../../Repos/MongooseRepo';

@Injectable()
export class BlogsRepoService extends MongooseRepo<BlogDto,CreateBlogDto ,BlogDocument> {
  constructor(@InjectModel(BlogDto.name) private blogModel: Model<BlogDto>) { 
    super(blogModel)
  }
}
