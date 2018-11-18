import { Login, Register } from '@nx-mean-starter/models';
import { UserContext } from '@nx-mean-starter/schemas';
import { Request, Response, Router } from 'express';
import * as jwt from 'jsonwebtoken';
import { environment } from '../../environments/environment';

export const authRouter: Router = Router();

authRouter.post('/login', async (req: Request, res: Response) => {
  const model: Login = req.body;
  const user = await UserContext.findOne({ email: model.email });

  if (!user) {
    return res.status(401).send({ message: 'Authentication failed - Invalid email' });
  }

  if (await user.comparePassword(model.password)) {
    return res.json({ token: generateToken(user) });
  } else {
    return res.status(401).send({ message: 'Authentication failed - Invalid password' });
  }
});

authRouter.post('/register', async (req: Request, res: Response) => {
  const model: Register = req.body;
  try {
    const user = await new UserContext(model).save();
    return res.json({ success: true, token: generateToken(user) });
  } catch {
    return res.status(401).send({ message: 'Register failed' });
  }
});

function generateToken(user: any): string {
  const model = { sub: user._id };
  return jwt.sign(model, environment.jwt.secret);
}
