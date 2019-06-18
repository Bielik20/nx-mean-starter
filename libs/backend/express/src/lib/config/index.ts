import { environment } from '@env/backend';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as mongo from 'connect-mongo';
import * as errorHandler from 'errorhandler';
import { Express, static as expressStatic } from 'express';
import * as session from 'express-session';
import * as expressValidator from 'express-validator';
import * as lusca from 'lusca';
import * as mongoose from 'mongoose';
import * as path from 'path';
import { initializeAuth } from './auth';

export class AppConfig {
  constructor(private app: Express) {}

  make() {
    this.mongo();
    this.session();
    this.compression();
    this.bodyParser();
    this.validation();
    this.auth();
    this.lusca();
    this.assets();
    this.errorHandler();
  }

  private async mongo() {
    try {
      // https://github.com/Automattic/mongoose/issues/6890#issuecomment-416218953
      await mongoose.connect(environment.mongoUri, { useNewUrlParser: true, useCreateIndex: true });
      console.log('MongoDB Connected');
    } catch (err) {
      console.error('MongoDB connection error. Please make sure MongoDB is running. ' + err);
    }
  }

  private session() {
    try {
      const MongoStore = mongo(session);
      this.app.use(
        session({
          resave: true,
          saveUninitialized: true,
          secret: environment.sessionSecret,
          store: new MongoStore({
            url: environment.mongoUri,
            autoReconnect: true,
          }),
        }),
      );
    } catch (err) {
      console.error('Session connection error. Probably mongo fault.' + err);
    }
  }

  private compression() {
    this.app.use(compression());
  }

  private bodyParser() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private validation() {
    this.app.use(expressValidator());
  }

  private auth() {
    initializeAuth(this.app);
  }

  private lusca() {
    this.app.use(lusca.xframe('SAMEORIGIN'));
    this.app.use(lusca.xssProtection(true));
  }

  private assets() {
    this.app.use(expressStatic(path.join(__dirname, 'assets'), { maxAge: 31557600000 }));
  }

  /**
   * Error Handler. Provides full stack - disabled for production
   */
  private errorHandler() {
    if (environment.production === false) {
      this.app.use(errorHandler());
    }
  }
}
