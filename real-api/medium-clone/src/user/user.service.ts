import { compare } from 'bcrypt';
import {
  HttpException,
  Injectable,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

import { UserEntity } from './user.entity';
import { UpdateUserDto } from './dto/update.user.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/login.dto';

import { userResponseInterface } from './types/userResponse.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      email: createUserDto.email,
    });
    const userByUserName =
      await this.userRepository.findOne({
        email: createUserDto.username,
      });

    if (userByEmail || userByUserName)
      throw new HttpException(
        'Email or username are taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    return await this.userRepository.save(newUser);
  }

  async login(
    loginUserDto: LoginUserDto,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOne(
      {
        email: loginUserDto.email,
      },
      {
        select: [
          'id',
          'username',
          'email',
          'bio',
          'image',
          'password',
        ],
      },
    );
    if (!user)
      throw new HttpException(
        'Credentials are not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    const isPasswordCorrect: boolean = await compare(
      loginUserDto.password,
      user.password,
    );
    if (!isPasswordCorrect)
      throw new HttpException(
        'Password  incorrect',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    delete user.password;
    return user;
  }

  findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne(id);
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.findById(userId);
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  generateJWT(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      JWT_SECRET,
    );
  }

  buildUserResponse(
    user: UserEntity,
  ): userResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJWT(user),
      },
    };
  }
}
