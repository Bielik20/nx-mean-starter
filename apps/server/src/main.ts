import * as express from 'express';
import { AppConfig, AppControllers } from './app';
import { environment } from './environments/environment';

const app = express();
new AppConfig(app).make();
new AppControllers(app).make();

/**
 * Start Express server.
 */
const server = app.listen(environment.port, () => {
  console.log(
    `\n  App is running at http://localhost:%d in %s mode`,
    environment.port,
    environment.production ? 'production' : 'development',
  );
  console.log('  Press CTRL-C to stop\n');
});

export default server;
