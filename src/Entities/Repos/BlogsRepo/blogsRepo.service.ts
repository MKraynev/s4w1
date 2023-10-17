import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from './Schemas/blog.schema';
import { CreateBlogDto } from './Dtos/CreateBlogDto';

@Injectable()
export class BlogsRepoService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>) {}

  async create(createCatDto: CreateBlogDto): Promise<Blog> {
    const createdBlog = new this.blogModel(createCatDto);
    return (await createdBlog.save()).toObject();
  }

  async findAll(): Promise<Blog[]> {
    return this.blogModel.find().exec();
  }
}
