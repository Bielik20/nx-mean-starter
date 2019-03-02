import { UserContext } from '@nx-mean-starter/backend/schemas';
import { generateUsers, User } from '@nx-mean-starter/models';
import { Request, Response, Router } from 'express';

export const usersRouter: Router = Router();

usersRouter.get('/', async (req: Request, res: Response) => {
  let users = await UserContext.find().lean();
  users = [...users, ...generateUsers(5)];

  res.send(users);
});

usersRouter.get('/:id', async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const user: User = await UserContext.findById(id).lean();

  res.send(user);
});

usersRouter.get('/generate/:count', async (req: Request, res: Response) => {
  const count: number = req.params.count;
  const users = await UserContext.create(generateUsers(count));

  res.send(users);
});
