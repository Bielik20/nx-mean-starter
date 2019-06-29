import { Express } from 'express';
import { authenticate } from '../config/auth';
import { meRouter } from './me';
import { usersRouter } from './users';

export class AppControllers {
  constructor(private app: Express) {}

  make() {
    this.app.use('/api/users', usersRouter);
    this.app.use('/api/me', authenticate(), meRouter);
  }
}
