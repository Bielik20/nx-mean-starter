import { environment } from '@env/backend';
import { hostWebApp } from '@nx-mean-starter/backend/hosting';
import * as express from 'express';
import { AppConfig, AppControllers } from './lib';

export const app = express();

new AppConfig(app).make();
new AppControllers(app).make();

if (environment.production === true) {
  hostWebApp(app);
}

export function bootstrap() {
  return app.listen(environment.port, () => {
    console.log(
      `\n  App is running at http://localhost:%d in %s mode`,
      environment.port,
      environment.production ? 'production' : 'development',
    );
    console.log('  Press CTRL-C to stop\n');
  });
}
