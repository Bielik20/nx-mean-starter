import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as mongo from 'connect-mongo';
import * as errorHandler from 'errorhandler';
import { Express, static as expressStatic } from 'express';
import * as session from 'express-session';
import * as expressValidator from 'express-validator';
import * as lusca from 'lusca';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import * as path from 'path';

import { environment } from '../../environments/environment';

export class AppConfig {
  constructor(private app: Express) {}

  make() {
    // this.mongo();
    // this.session();
    this.app.use(compression());
    this.bodyParser();
    this.app.use(expressValidator());
    this.passport();
    this.lusca();
    this.app.use(expressStatic(path.join(__dirname, 'assets'), { maxAge: 31557600000 }));
    this.errorHandler();
  }

  private async mongo() {
    try {
      await mongoose.connect(environment.mongoUrl);
      console.log('MongoDB Connected');
    } catch (err) {
      console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
    }
  }

  private session() {
    const MongoStore = mongo(session);
    this.app.use(
      session({
        resave: true,
        saveUninitialized: true,
        secret: environment.sessionSecret,
        store: new MongoStore({
          url: environment.mongoUrl,
          autoReconnect: true,
        }),
      }),
    );
  }

  private bodyParser() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private passport() {
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

  private lusca() {
    this.app.use(lusca.xframe('SAMEORIGIN'));
    this.app.use(lusca.xssProtection(true));
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
