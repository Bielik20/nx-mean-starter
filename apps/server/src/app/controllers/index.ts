import { Express, static as expressStatic } from 'express';
import * as path from 'path';
import { environment } from '../../environments/environment';
import { authenticate } from '../config/auth';
import { usersRouter } from './users';

export class AppControllers {
  constructor(private app: Express) {}

  make() {
    this.app.use('/api/users', authenticate(), usersRouter);

    if (environment.production === true) {
      // in production mode run application from dist folder
      this.app.use(expressStatic(path.join(__dirname, '/../web-app')));
      this.app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname, '/../web-app/index.html'));
      });
    }
  }
}
