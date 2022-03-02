import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { FindAllPostDto } from './dto/find-all-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './schemas/post.schema';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async create(createPostDto: CreatePostDto, user: User) {
    const { title, content } = createPostDto;

    const post = await this.postModel.create({
      title,
      content,
      user,
    });

    return post;
  }

  async findAll(query: FindAllPostDto) {
    const page = parseInt(query.page);

    if (page < 1) {
      console.log(typeof query.page);
      throw new BadRequestException();
    }

    const posts = await this.postModel
      .find()
      .sort({ updatedAt: -1 })
      .limit(10)
      .skip((page - 1) * 10);
    const lastPage = Math.ceil((await this.postModel.countDocuments()) / 10);

    return {
      posts,
      lastPage,
    };
  }

  async findOne(postId: string) {
    const post = await this.postModel.findById(postId);

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  async remove(postId: string, user: User) {
    const post = await this.postModel.findById(postId);

    if (!post) {
      throw new NotFoundException();
    }

    if (user.id !== post.user.id) {
      throw new ForbiddenException();
    }

    await this.postModel.findByIdAndRemove(postId);
  }

  async update(postId: string, updatePostDto: UpdatePostDto, user: User) {
    const post = await this.postModel.findById(postId);

    if (!post) {
      throw new NotFoundException();
    }

    if (user.id !== post.user.id) {
      throw new ForbiddenException();
    }

    return await this.postModel.findByIdAndUpdate(postId, updatePostDto, {
      new: true,
    });
  }
}
