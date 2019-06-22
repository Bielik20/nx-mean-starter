import { environment } from '@env/backend';
import { Express, static as expressStatic } from 'express';
import * as path from 'path';

export function hostApplication(app: Express) {
  if (environment.production === true) {
    // in production mode run application from dist folder
    app.use(expressStatic(path.join(__dirname, '/../web-app'), { index: false }));
    app.use(expressStatic(path.join(__dirname, '/../ionic-app'), { index: false }));

    app.get('*', function(req, res) {
      if (isMobile(req)) {
        res.sendFile(path.join(__dirname, '/../ionic-app/index.html'));
      } else {
        res.sendFile(path.join(__dirname, '/../web-app/index.html'));
      }
    });
  }
}

function isMobile(req) {
  return req.headers['user-agent'].match(/\bmob/i);
}
