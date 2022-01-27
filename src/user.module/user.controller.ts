import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseInterface } from './types/user.response.interface';
import { AuthorizeUserDto } from './dto/authorize-user.dto';
import { User } from './decorators/user.decorator';
import { UserEntity } from './user.entity';
import { AuthGuard } from './guards/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('/users/login')
  @UsePipes(new ValidationPipe())
  async logInUser(
    @Body('user')
    authorizeUserDto: AuthorizeUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.logInUser(authorizeUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Get('user')
  @UseGuards(AuthGuard)
  async currentUser(@User() user: UserEntity): Promise<UserResponseInterface> {
    return this.userService.buildUserResponse(user);
  }

  @Put('user')
  @UseGuards(AuthGuard)
  async updateCurrentUser(
    @User() user: UserEntity,
    @Body('user')
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseInterface> {
    const updatedUser = await this.userService.updateCurrentUser(
      user,
      updateUserDto,
    );
    return this.userService.buildUserResponse(updatedUser);
  }
}
