import { createMockUsers, User } from '@nx-mean-starter/models';
import { UserContext } from '@nx-mean-starter/schemas';
import { Request, Response, Router } from 'express';

export const usersRouter: Router = Router();

usersRouter.get('/', async (req: Request, res: Response) => {
  let users = await UserContext.find().lean();
  users = [...users, ...createMockUsers()];

  res.send(users);
});

usersRouter.get('/:id', async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const user: User = await UserContext.findById(id).lean();

  res.send(user);
});
