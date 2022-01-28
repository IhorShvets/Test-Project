import { UserEntity } from '../../user.module/user.entity';

export interface ProfileResponseInterface {
  profile: UserEntity;
  following: boolean;
}
