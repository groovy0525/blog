import { PickType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Post } from '../schemas/post.schema';

export class CreatePostDto extends PickType(Post, [
  'title',
  'content',
] as const) {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;
}
