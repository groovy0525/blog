import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async exist(username: string): Promise<User | null> {
    return await this.userModel.findOne({ username });
  }

  async signUp(createUserDto: CreateUserDto): Promise<boolean> {
    const { username, password } = createUserDto;

    const isExist = await this.userModel.exists({ username });

    if (isExist) {
      throw new ConflictException();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.userModel.create({
      username,
      password: hashedPassword,
    });

    return true;
  }
}
