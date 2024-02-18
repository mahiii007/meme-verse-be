import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/user/schema/user.schema';

export type PostDocument = HydratedDocument<Post>;

@Schema({ timestamps: true })
export class Post {
  @Prop()
  description: string;

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'User' }] })
  likes: User[];

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'User' }] })
  dislikes: User[];

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'User' }] })
  hearts: User[];

  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop()
  comments: [];

  @Prop({ type: Object })
  location;

  @Prop()
  media: string;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;
}

export const PostSchema = SchemaFactory.createForClass(Post);
