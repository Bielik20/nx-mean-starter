import { Express, static as expressStatic } from 'express';
import * as path from 'path';

/**
 * In production mode run application from dist folder
 */
export function hostWebApp(app: Express) {
  app.use(expressStatic(path.join(__dirname, '/../web-app'), { index: false }));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../web-app/index.html'));
  });
}

export function hostWebAppAndIonicApp(app: Express): void {
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

function isMobile(req) {
  return req.headers['user-agent'].match(/\bmob/i);
}
