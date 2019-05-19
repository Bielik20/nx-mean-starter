import { UserFromToken } from '@nx-mean-starter/models';

export interface User extends UserFromToken {
  createdAt: Date;
  updatedAt: Date;
}
