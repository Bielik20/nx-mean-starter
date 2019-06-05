// These are important and needed before anything else
// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import { environment } from '@nx-mean-starter/backend/core';
import { Express, static as expressStatic } from 'express';
import * as path from 'path';
import 'reflect-metadata';
import 'zone.js/dist/zone-node';

export function useAngularUniversal(app: Express) {
  if (environment.production === true) {
    const {
      AppServerModuleNgFactory,
      LAZY_MODULE_MAP,
    } = require('../../../../../../dist/apps/web-app-server/main');

    app.engine(
      'html',
      ngExpressEngine({
        bootstrap: AppServerModuleNgFactory,
        providers: [provideModuleMap(LAZY_MODULE_MAP)],
      }),
    );

    app.set('view engine', 'html');
    app.set('views', path.join(__dirname, '/../web-app'));

    // Server static files from /web-app
    app.get('*.*', expressStatic(path.join(__dirname, '/../web-app')));

    // All regular routes use the Universal engine
    app.get('*', (req, res) => {
      res.render('index', { req });
    });
  }
}
