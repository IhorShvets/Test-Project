import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { UserResponseInterface } from './types/user.response.interface';
import { AuthorizeUserDto } from './dto/authorize-user.dto';
import { compare } from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);

    const user = await this.userRepository.findOne({
      where: [
        { email: createUserDto.email },
        { username: createUserDto.username },
      ],
      select: ['id'],
    });

    if (user) {
      throw new HttpException(
        `Email or UserName are taken`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return await this.userRepository.save(newUser);
  }

  public async updateCurrentUser(
    user: UserEntity,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    if (updateUserDto.password != updateUserDto.repeatPassword) {
      throw new HttpException(`Passwords doesn't contain`, HttpStatus.CONFLICT);
    }

    if (updateUserDto.username) user.username = updateUserDto.username;
    if (updateUserDto.email) user.email = updateUserDto.email;
    if (updateUserDto.image) user.image = updateUserDto.image;
    if (updateUserDto.bio) user.bio = updateUserDto.bio;

    if (updateUserDto.password) {
      user.password = updateUserDto.password;
    }

    const updatedUser = await this.userRepository.save(user);
    delete updatedUser.password;
    return updatedUser;
  }

  public async logInUser(userData: AuthorizeUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne(
      {
        email: userData.email,
      },
      { select: ['id', 'username', 'email', 'bio', 'image', 'password'] },
    );

    let isAuthorized: boolean;
    if (user) {
      const isCorrectPass = await compare(userData.password, user.password);
      isAuthorized = !!isCorrectPass;
    }

    if (!isAuthorized)
      throw new HttpException(
        `Credential are not valid`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    delete user.password;
    return user;
  }

  public findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne(id);
  }

  public buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: {
        ...user,
        token: UserService.generateJwt(user),
      },
    };
  }

  private static generateJwt(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      JWT_SECRET,
    );
  }
}
