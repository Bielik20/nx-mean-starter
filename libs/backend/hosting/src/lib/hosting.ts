import { environment } from '@env/backend';
import { Express, static as expressStatic } from 'express';
import * as path from 'path';

/**
 * In production mode run application from dist folder
 */
export function hostApplication(app: Express) {
  if (environment.production === true) {
    app.get('*.*', (req, res, next) => {
      if (isMobile(req)) {
        expressStatic(path.join(__dirname, '/../ionic-app'), { index: false })(req, res, next);
      } else {
        expressStatic(path.join(__dirname, '/../web-app'), { index: false })(req, res, next);
      }
    });

    app.get('*', (req, res) => {
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
