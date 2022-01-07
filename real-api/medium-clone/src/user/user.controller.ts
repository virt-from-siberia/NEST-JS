import {
  Body,
  Controller,
  Post,
  Req,
  Get,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login.dto';
import { CreateUserDto } from './dto/createUser.dto';

import { userResponseInterface } from './types/userResponse.interface';
import { ExpressRequestInterface } from '../types/expressRequest.interface';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<userResponseInterface> {
    const user = await this.userService.createUser(
      createUserDto,
    );
    return this.userService.buildUserResponse(user);
  }

  @Post('users/login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body('user') loginUserDto: LoginUserDto,
  ): Promise<userResponseInterface> {
    const user = await this.userService.login(loginUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Get('user')
  async currentUser(
    @Req() request: ExpressRequestInterface,
  ): Promise<userResponseInterface> {
    return this.userService.buildUserResponse(request.user);
  }
}
