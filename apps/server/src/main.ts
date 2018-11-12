/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
import { createMockPosts, Post } from '@nx-mean-starter/models';
import * as express from 'express';
import * as path from 'path';

import { environment } from './environments/environment';

const app = express();

const posts: Post[] = createMockPosts();

app.get('/api/posts', (req, res) => {
  res.send(JSON.stringify(posts));
});

if (environment.production === true) {
  // in production mode run application from dist folder
  app.use(express.static(path.join(__dirname, '/../web-app')));
}

const port = 3333;
app.listen(port, err => {
  if (err) {
    console.error(err);
  }
  console.log(`Listening at http://localhost:${port}`);
});
