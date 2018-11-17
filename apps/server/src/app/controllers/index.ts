import { createMockPosts, Post } from '@nx-mean-starter/models';
import { Express, static as expressStatic } from 'express';
import * as path from 'path';
import { environment } from '../../environments/environment';
import { authenticate } from '../config/auth';
import { authRouter } from './auth';

export class AppControllers {
  constructor(private app: Express) {}

  make() {
    const posts: Post[] = createMockPosts();

    this.app.get('/api/posts', authenticate(), (req, res) => {
      res.send(JSON.stringify(posts));
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
