import { Injectable } from "@nestjs/common";
import { MongooseRepo } from "../../Repos/MongooseRepo";
import { Post, PostDocument } from "./Schema/post.schema";
import { CreatePostDto } from "./Dtos/CreatePostDto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";


@Injectable()
export class PostsRepoService extends MongooseRepo<Post,CreatePostDto ,PostDocument> {
  constructor(@InjectModel(Post.name) private blogModel: Model<Post>) { 
    super(blogModel)
  }
}