import { Request } from 'express';
import { UserEntity } from '../user.module/user.entity';

export interface ExpressRequestInterface extends Request {
  user?: UserEntity;
}
