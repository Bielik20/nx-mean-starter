import { createMockUsers, User, UserFromToken } from '@nx-mean-starter/models';
import { UserContext } from '@nx-mean-starter/schemas';
import { Request, Response, Router } from 'express';
import { authenticate } from '../config/auth';

export const usersRouter: Router = Router();

usersRouter.get('/', async (req: Request, res: Response) => {
  let users = await UserContext.find().lean();
  users = [...users, ...createMockUsers()];

  res.send(JSON.stringify(users));
});

usersRouter.get('/me', authenticate(), async (req: Request, res: Response) => {
  const userFromToken: UserFromToken = req.user;
  const user: User = await upsertUser(userFromToken);

  res.send(user);
});

async function upsertUser(userFromToken: UserFromToken): Promise<User> {
  const user: User = await UserContext.findById(userFromToken._id).lean();

  if (!user) {
    return await new UserContext(userFromToken).save();
  }

  user._id = user._id || userFromToken._id;
  user.name = user.name || userFromToken.name;
  user.pictureUrl = user.pictureUrl || userFromToken.pictureUrl;
  user.phoneNumber = userFromToken.phoneNumber;
  user.email = userFromToken.email;
  user.emailVerified = userFromToken.emailVerified;

  return await UserContext.findByIdAndUpdate(user._id, user).lean();
}
