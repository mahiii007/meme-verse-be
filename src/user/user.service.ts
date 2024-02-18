import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model, ObjectId } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LogInDto } from './dto/login.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private authSvc: AuthService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    createUserDto.password = hashedPassword;
    const createdUser = await this.userModel.create(createUserDto);
    return await createdUser.save();
  }

  async findAll() {
    return await this.userModel.find().lean();
  }

  async findOne(id: string) {
    return await this.userModel.findOne({ _id: id }).lean();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne({ _id: id }, { $set: updateUserDto });
  }

  async remove(id: string) {
    return await this.userModel.updateOne(
      { _id: id },
      { $set: { isDeleted: true } },
    );
  }

  async findByuserName(username: string) {
    return await this.userModel.findOne({ username: username }).lean();
  }

  public async logIn(logInDto: LogInDto) {
    const { username, password } = logInDto;
    // const user = await this.userSvc.findByuserName(username);
    const user = await this.userModel.findOne({ username: username }).lean();
    if (!user) {
      throw new HttpException(
        'User doesnot exists.',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const isMatched = await this.authSvc.comparePassword(
      password,
      user?.password,
    );
    const payload = {
      _id: user._id,
      email: user.email,
      username: user.username,
    };
    if (isMatched) {
      return {
        token: await this.authSvc.createToken(payload),
      };
    }

    throw new HttpException(
      `Password didn't match !! Please try again.`,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
