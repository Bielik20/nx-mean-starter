import { createMockUsers } from '@nx-mean-starter/models';
import { UserContext } from '@nx-mean-starter/schemas';
import { Request, Response, Router } from 'express';

export const usersRouter: Router = Router();

usersRouter.get('/', async (req: Request, res: Response) => {
  let users = await UserContext.find().lean();
  users = [...users, ...createMockUsers()];

  res.send(JSON.stringify(users));
});
