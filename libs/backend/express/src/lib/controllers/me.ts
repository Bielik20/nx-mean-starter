import { UserContext } from '@nx-mean-starter/backend/schemas';
import { User, UserFromToken } from '@nx-mean-starter/models';
import { Request, Response, Router } from 'express';

export const meRouter: Router = Router();

meRouter.get('/', async (req: Request, res: Response) => {
  const userFromToken: UserFromToken = req.user;
  const user: User = await upsertUser(userFromToken);

  res.send(user);
});

meRouter.put('/', async (req: Request, res: Response) => {
  const id: string = req.user._id;
  const user: User = req.body;

  if (id !== user._id) {
    return res.status(400).send(`User id doesn't match resource id`);
  }

  res.send(await UserContext.findByIdAndUpdate(id, user, { new: true }));
});

meRouter.patch('/', async (req: Request, res: Response) => {
  const id: string = req.user._id;
  const user: Partial<User> = req.body;

  res.send(await UserContext.findByIdAndUpdate(id, user, { new: true }));
});

async function upsertUser(userFromToken: UserFromToken): Promise<User> {
  const user: User = await UserContext.findById(userFromToken._id).lean();

  if (!user) {
    userFromToken.pictureUrl =
      userFromToken.pictureUrl || 'http://blog.ubeeqo.co.uk/images/users/default_user.png';
    return await new UserContext(userFromToken).save();
  }

  user.name = user.name || userFromToken.name;
  user.phoneNumber = userFromToken.phoneNumber;
  user.email = userFromToken.email;
  user.emailVerified = userFromToken.emailVerified;

  return UserContext.findByIdAndUpdate(user._id, user, { new: true });
}
