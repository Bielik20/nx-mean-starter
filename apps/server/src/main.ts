import { environment } from '@nx-mean-starter/backend/core';
import { app } from '@nx-mean-starter/backend/express';

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
