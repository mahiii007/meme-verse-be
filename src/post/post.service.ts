import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './schema/post.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  async loadAll() {
    return await this.postModel.find({}).lean();
  }

  async findOne(id: string) {
    return await this.postModel.findOne({ _id: id }).lean();
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    return await this.postModel
      .updateOne({ _id: id }, { $set: updatePostDto })
      .lean();
  }

  async remove(id: string) {
    return await this.postModel
      .updateOne({ _id: id }, { $set: { isDeleted: true } })
      .lean();
  }
}
