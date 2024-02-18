import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument, Schema as mSchema } from 'mongoose';
export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  address: string;

  @Prop({ type: [{ type: mSchema.Types.ObjectId, ref: 'User' }] })
  followers: User[];

  @Prop({ type: [{ type: mSchema.Types.ObjectId, ref: 'User' }] })
  followings: User[];

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  bio: string;

  @Prop({ type: Date })
  dob;

  @Prop()
  profile_pic: string;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
