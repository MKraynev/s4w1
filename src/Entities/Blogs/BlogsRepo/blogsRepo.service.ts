import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from './Schemas/blog.schema';
import { CreateBlogDto } from './Dtos/CreateBlogDto';
import { MongooseRepo } from '../../Repos/MongooseRepo';

@Injectable()
export class BlogsRepoService extends MongooseRepo<Blog,CreateBlogDto ,BlogDocument> {
  constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>) { 
    super(blogModel)
  }
}
