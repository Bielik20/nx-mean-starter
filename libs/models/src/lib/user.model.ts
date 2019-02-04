import { UserFromToken } from '@nx-mean-starter/models';

export interface User extends UserFromToken {
  createdAt: Date;
  updatedAt: Date;
}

export function createMockUsers(): Partial<User>[] {
  return [
    {
      _id: '1',
      email: 'one@mail.com',
    },
    {
      _id: '2',
      email: 'two@mail.com',
    },
  ];
}
