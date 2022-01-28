import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthGuard } from '../user.module/guards/auth.guard';
import { User } from '../user.module/decorators/user.decorator';
import { ProfileResponseInterface } from './types/profile.response.interface';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':username')
  async getUserByUsername(
    @Param('username') username: string,
    @User('id') currentUserId: number,
  ): Promise<ProfileResponseInterface> {
    const user = await this.profileService.findByName(username);
    return this.profileService.buildProfileResponse(user, currentUserId);
  }

  @Post(':username/follow')
  @UseGuards(AuthGuard)
  async followUser(
    @User('id') currentUserId: number,
    @Param('username') followingUserName: string,
  ): Promise<ProfileResponseInterface> {
    const followedUser = await this.profileService.followUser(
      currentUserId,
      followingUserName,
    );
    return this.profileService.buildProfileResponse(
      followedUser,
      currentUserId,
    );
  }

  @Delete(':username/unfollow')
  @UseGuards(AuthGuard)
  async unfollowUser(
    @User('id') currentUserId: number,
    @Param('username') unfollowingUserName: string,
  ): Promise<ProfileResponseInterface> {
    const unfollowedUser = await this.profileService.unfollowUser(
      currentUserId,
      unfollowingUserName,
    );
    return this.profileService.buildProfileResponse(
      unfollowedUser,
      currentUserId,
    );
  }
}
