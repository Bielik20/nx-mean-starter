import { UserFromToken } from '@nx-mean-starter/models';
import * as faker from 'faker';

export interface User extends UserFromToken {
  createdAt: Date;
  updatedAt: Date;
}

export function generateUsers(count: number): Partial<User>[] {
  return Array.from({ length: count }).map(() => generateUser());
}

export function generateUser(): Partial<User> {
  return {
    _id: faker.random.uuid(),
    email: faker.internet.email(),
    emailVerified: faker.random.boolean(),
    name: faker.name.findName(),
    pictureUrl: faker.image.avatar(),
  };
}
