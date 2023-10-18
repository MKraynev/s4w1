import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from './Schemas/blog.schema';
import { CreateBlogDto } from './Dtos/CreateBlogDto';

@Injectable()
export class BlogsRepoService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>) { }

  async save(createCatDto: CreateBlogDto): Promise<BlogDocument> {
    const createdBlog = new this.blogModel(createCatDto);
    return (await createdBlog.save());
  }

  async findById(id: string): Promise<BlogDocument | null> {
    return await this.blogModel.findById(id);
  }

  async find(searchNameTerm?: string, skip: number = 0, limit: number = 10): Promise<BlogDocument[]> {
    let searchPattern = searchNameTerm ? { name: searchNameTerm } : {};
    return await this.blogModel.find(searchPattern).skip(skip).limit(limit);
  }
  async update(blog: BlogDocument){
    return (await blog.save());
  }

  async count(searchNameTerm?: string) {
    let searchPattern = searchNameTerm ? { name: searchNameTerm } : {};
    return await this.blogModel.count(searchPattern);
  }

  async deleteById(id: string){
    let deletedBlog = await this.blogModel.findByIdAndDelete(id);

    return deletedBlog || null;
  }
}
