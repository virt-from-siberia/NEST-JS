import { CreateUserDto } from './dto/createUser.dto';
import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { userResponseInterface } from './types/userResponse.interface';

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
}
