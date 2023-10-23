import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema({
  timestamps: true,
  toObject: {
    transform(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    }
  }
})
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  shortDescription: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required:true })
  blogId: string;

  @Prop({ required:true })
  blogName: string;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop()
  updatedAt: Date;

}

export const PostSchema = SchemaFactory.createForClass(Post);
