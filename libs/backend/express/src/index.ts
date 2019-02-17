import * as express from 'express';
import { AppConfig, AppControllers } from './lib';

const app = express();
new AppConfig(app).make();
new AppControllers(app).make();

export { app };
