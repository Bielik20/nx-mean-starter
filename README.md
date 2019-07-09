# NxMeanStarter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) using [Nrwl Nx](https://nrwl.io/nx).

Based on:

- [mean-starter-tutorial](https://github.com/Bielik20/mean-starter-tutorial)
- [workshop-nx-starter](https://github.com/nrwl/workshop-nx-starter)
- [Allow development of node applications](https://github.com/nrwl/nx/issues/763)
- [nx-fullstack](https://blog.nrwl.io/building-full-stack-applications-using-angular-cli-and-nx-5eff205248f1)
- [angular cli proxy](https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/proxy.md)

# Steps to transform into project

1. Rename `nx-mean-starter` to `<your-app-name>`
2. Keeping in mind first step, go through [Configuration Section](#-configuration).

# Cheatsheet

## Generators

web app: `ng g app web-app --style=scss --unit-test-runner=jest --e2e-test-runner=cypress --routing --prefix=app`

web lib:

- `ng g lib testing --unit-test-runner=none --prefix=app`
- `ng g lib models --unit-test-runner=jest --no-module --prefix=app`
- `ng g lib auth --unit-test-runner=jest --directory=feature --prefix=app`
- `ng g lib router --unit-test-runner=jest --directory=state --prefix=app`
- `ng g lib users --unit-test-runner=jest --directory=navigation --routing --lazy --parent-module=apps/web-app/src/app/app.module.ts --prefix=app`

node: `ng g @nrwl/node:application server`

node lib: `ng g @nrwl/node:library core --unit-test-runner=jest --directory=backend`

## Build optimization

```
ng build <app-name> --prod --stats-json
npx webpack-bundle-analyzer dist/apps/<app-name>/stats.json
```

# Configuration

## Add Heroku Deploy

Install Heroku CLI and login

```
brew install heroku
heroku login
```

Create new app on Heroku:

```
heroku apps:create nx-mean-starter --region eu
```

Add Heroku remote

```
heroku git:remote -a nx-mean-starter
```

Deploy

```
git push heroku master
```

## Add mLab (MongoDB)

1. Goto https://mlab.com/home and create new "MongoDB Deployment"
2. To to your database -> users https://mlab.com/databases/nx-mean-starter#users
3. Add database user
   - Remember username and password
4. Go to https://dashboard.heroku.com/apps/nx-mean-starter/settings -> Config Vars
   - Add
     - Key: MONGO_URI
     - Value: _connection string with username and password_
5. Add the same to `.env`

## Add Firebase Server Admin SDK

1. Create firebase project at https://console.firebase.google.com
2. Go to authentication tab and configure authentication.
3. (optional) Go to database tab and configure cloud firestore.
4. Download firebase-adminsdk private service key

   1. Navigate to the Service Accounts tab.
   2. Generate new private key
   3. Copy content of the key
   4. Modify (make it one line) and paste it to `.env` -> `FIREBASE_ADMIN`

When running production build locally use: `node -r dotenv/config dist/apps/server/main.js`

## Add Firebase Storage

1. Go to https://console.firebase.google.com -> storage tab
2. Activate
3. Change rules so that image pipe works (you may change directory name):

```
service firebase.storage {
  match /b/{bucket}/o {
  	match /test/{allPaths=**} {
    	allow read;
      allow write: if request.auth != null;
    }
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Add Firebase Client SDK

1. Create firebase project at https://console.firebase.google.com
2. Copy firebase config to `frontend` environment.

## Add Firebase Auth

Add your domain (heroku etc.) to the OAuth redirect domains list in the Firebase console -> Auth section -> Sign in method tab.

# Guides

firebase functions: https://medium.com/mean-fire/nx-nrwl-firebase-functions-98f96f514055

firebase hosting: https://medium.com/mean-fire/express-application-on-firebase-hosting-5baa8914835f

ionic: https://medium.com/mean-fire/nx-nrwl-ionic-1baf3a43db74

## Server Dependencies

- dependencies: `compression body-parser connect-mongo mongoose errorhandler express-session express-validator lodash lusca path passport passport-http-bearer request request-promise-native winston firebase firebase-admin api-query-params`
- dev dependencies: `@types/compression @types/body-parser @types/mongoose @types/errorhandler @types/express-session @types/lodash @types/lusca @types/passport @types/passport-http-bearer @types/request @types/request-promise-native @types/winston`

## Setup Project

```
npm i -g @angular/cli@latest @nrwl/schematics@latest
```

Create workspace:

```
create-nx-workspace myworkspacename
// or
create-nx-workspace myworkspacename --yarn
```

## Configure Prettier etc.

```
yarn add husky lint-staged -D
```

Modify `.prettierrc`:

```json
{
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100
}
```

Modify `tslint.json`:

```json
"rules": {
  "no-unused-variable": true,
  "max-line-length": [true, { "limit": 100, "ignore-pattern": "^import |^export {(.*?)} |http" }],
  "ordered-imports": [
    true,
    {
      "named-imports-order": "case-insensitive",
      "import-sources-order": "case-insensitive"
    }
  ],
}
```

Modify `package.json`:

```json
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
},
"lint-staged": {
  "linters": {
    "*.ts": [
      "prettier --write",
      "tslint --fix",
      "git add"
    ],
    "*.{json,css,scss,md}": [
      "prettier --write",
      "git add"
    ]
  },
  "ignore": [
    "**/dist/**/*"
  ]
}
```

## Add Jest

```
ng g jest
```

```
yarn add jest-marbles -D
```

```
yarn remove jasmine-core jasmine-spec-reporter karma karma-chrome-launcher karma-coverage-istanbul-reporter karma-jasmine karma-jasmine-html-reporter @types/jasminewd2 @types/jasmine
```

Delete `karma.conf.js`.

### Testing

- `yarn affected:test --all` - run tests with report coverage for whole workspace
- `ng test app-name` - run tests fo specified app/lib
- `ng test app-name --watch` - run tests listening for changes.

Omitting app-name will result in running command for the default app.

## Add Proxy

Create `apps/web-app/proxy.conf.json`:

```json
{
  "/api": {
    "target": "http://localhost:3333",
    "secure": false
  }
}
```

In `angular.json` in `web-app` section add `proxyConfig`:

```json
"serve": {
  "builder": "@angular-devkit/build-angular:dev-server",
  "options": {
    "browserTarget": "web-app:build",
    "proxyConfig": "apps/web-app/proxy.conf.json"
  },
```

## Add PWA

```
ng add @angular/pwa --project <project-name>
```

When changing theme, also change:

- `manifest.webmanifest`
- `index.html` -> `<meta name="theme-color" content="{{color}}" />`

When adding new script tag dependencies include them inside `ngsw-config.json`.

To generate icons

1. Create folder with icon inside called `icon.png`
2. Run `npx ngx-pwa-icons`
3. Copy generated icons to respective directories

## Environment

Setup environment following [this](https://github.com/nrwl/nx/issues/208#issuecomment-503165673).

## Styles

```
ng add @angular/material
yarn add bootstrap
yarn add sass-rem -D
```

In `apps/web-app/src/main.ts` add:

```ts
import 'hammerjs';
```

In AppModule add to imports:

```ts
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
```

In `apps/web-app/src/index.html`:

```html
<head>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet" />
</head>
...
<body class="mat-typography"></body>
```

# Deleting

At the root directory, delete mentions of the library in following files:

- `angular.json`
- `nx.json`
- `tsconfig.json`
