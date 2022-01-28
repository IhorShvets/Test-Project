import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from '../user.module/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileResponseInterface } from './types/profile.response.interface';
import { FollowEntity } from './follow.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(FollowEntity)
    private readonly followRepository: Repository<FollowEntity>,
  ) {}

  async findByName(username: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ username });
  }

  async followUser(
    currentUserId: number,
    followingUserName: string,
  ): Promise<UserEntity> {
    const followingUser = await this.userRepository.findOne({
      username: followingUserName,
    });

    if (!followingUser) {
      throw new HttpException(
        `User ${followingUserName} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (!(await this.isFollow(currentUserId, followingUser.id))) {
      await this.followRepository.save({
        followedId: currentUserId,
        followingId: followingUser.id,
      });
    }

    return followingUser;
  }

  async unfollowUser(
    currentUserId: number,
    unfollowingUserName: string,
  ): Promise<UserEntity> {
    const unfollowingUser = await this.userRepository.findOne({
      username: unfollowingUserName,
    });

    if (!unfollowingUser) {
      throw new HttpException(
        `User ${unfollowingUserName} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (await this.isFollow(currentUserId, unfollowingUser.id)) {
      await this.followRepository.delete({
        followedId: currentUserId,
        followingId: unfollowingUser.id,
      });
    }

    return unfollowingUser;
  }

  async buildProfileResponse(
    user: UserEntity,
    currentUserId?: number,
  ): Promise<ProfileResponseInterface> {
    let isFollow = false;
    if (currentUserId) {
      isFollow = await this.isFollow(currentUserId, user.id);
    }

    delete user.email;
    return { profile: user, following: isFollow };
  }

  private async isFollow(
    currentUserId: number,
    targetUserId: number,
  ): Promise<boolean> {
    const follow = await this.followRepository.findOne({
      where: { followedId: currentUserId, followingId: targetUserId },
    });

    return !!follow;
  }
}
