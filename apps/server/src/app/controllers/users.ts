import { createMockUsers } from '@nx-mean-starter/models';
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
  const user = req.user;
  res.send(user);
});
