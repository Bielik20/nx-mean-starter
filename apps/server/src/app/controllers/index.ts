import { createMockUsers, User } from '@nx-mean-starter/models';
import { Express, static as expressStatic } from 'express';
import * as path from 'path';
import { environment } from '../../environments/environment';
import { authenticate } from '../config/auth';
import { authRouter } from './auth';

export class AppControllers {
  constructor(private app: Express) {}

  make() {
    const users: User[] = createMockUsers();

    this.app.get('/api/users', authenticate(), (req, res) => {
      res.send(JSON.stringify(users));
    });

    this.app.use('/api/auth/', authRouter);

    if (environment.production === true) {
      // in production mode run application from dist folder
      this.app.use(expressStatic(path.join(__dirname, '/../web-app')));
      this.app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname, '/../web-app/index.html'));
      });
    }
  }
}
