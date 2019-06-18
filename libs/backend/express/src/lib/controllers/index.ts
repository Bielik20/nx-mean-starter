import { environment } from '@env/backend';
import { Express, static as expressStatic } from 'express';
import * as path from 'path';
import { authenticate } from '../config/auth';
import { meRouter } from './me';
import { usersRouter } from './users';

export class AppControllers {
  constructor(private app: Express) {}

  make() {
    this.app.use('/api/users', usersRouter);
    this.app.use('/api/me', authenticate(), meRouter);

    if (environment.production === true) {
      // in production mode run application from dist folder
      this.app.use(expressStatic(path.join(__dirname, '/../web-app')));
      this.app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname, '/../web-app/index.html'));
      });
    }
  }
}
