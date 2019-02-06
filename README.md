# NxMeanStarter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) using [Nrwl Nx](https://nrwl.io/nx).

Based on:

- [mean-starter-tutorial](https://github.com/Bielik20/mean-starter-tutorial)
- [workshop-nx-starter](https://github.com/nrwl/workshop-nx-starter)
- [Allow development of node applications](https://github.com/nrwl/nx/issues/763)
- [nx-fullstack](https://blog.nrwl.io/building-full-stack-applications-using-angular-cli-and-nx-5eff205248f1)
- [angular cli proxy](https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/proxy.md)

# Step to transform into project

1. Rename nx-mean-starter to <your-app-name>
2. Go through "Add Heroku Deploy" and "Add mLab (MongoDB)" keeping in mind first step.

# Steps to reproduce

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
  "max-line-length": [true, {"limit": 100, "ignore-pattern": "^import |^export {(.*?)}"}],
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

## Add App

```
ng g app web-app --style=scss --unit-test-runner=jest --e2e-test-runner=cypress --routing --prefix=app
```

## Add Server

```
ng g node-app server
yarn add compression body-parser connect-mongo mongoose errorhandler express-session express-validator lodash lusca path passport passport-http-bearer request request-promise-native winston firebase firebase-admin
yarn add @types/compression @types/body-parser @types/connect-mongo @types/mongoose @types/errorhandler @types/express-session @types/lodash @types/lusca @types/passport @types/passport-http-bearer @types/request @types/request-promise-native @types/winston -D
```

> As far as @types/mongoose is concerned, it may not be needed (comes with mongoose). Sometimes mongoose comes with outdated version so that new types must be installed manually. Should it happen conflicts may occur, [fix](https://github.com/szokodiakos/typegoose/issues/123).

It will create `express` application with `jest` as a test runner.

If there is a need it could be further specified:

```
ng g node-app server --unit-test-runner=jest --framework=express
```

### Schemas

```
ng g lib schemas --unit-test-runner=jest --no-module --prefix=app
```

### Add Proxy

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

In `apps/server/src/main.ts` replace default path:

```ts
app.get('/', ...);
```

with

```ts
app.get('/api/', ...);
```

### Add Production build

In `apps/server/src/main.ts` add:

```ts
import * as path from 'path';

...

if (environment.production === true) {
  // in production mode run application from dist folder
  app.use(express.static(path.join(__dirname, '/../web-app')));
}
```

### Add Heroku Deploy

Install Heroku CLI and login

```
brew install heroku/brew/heroku
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

### Add mLab (MongoDB)

1. Goto https://mlab.com/home and create new "MongoDB Deployment"
2. To to your database -> users https://mlab.com/databases/nx-mean-starter#users
3. Add database user
   - Remember username and password
4. Go to https://dashboard.heroku.com/apps/nx-mean-starter/settings -> Config Vars
   - Add
     - Key: MONGO_URI
     - Value: _connection string with username and password_

## Firebase

```
npm install -g firebase-tools
firebase login
```

### Add Firebase Functions

```
ng g node-app functions
```

### Add Firebase Server Admin SDK

Run `git update-index --skip-worktree apps/server/src/environments/firebase-adminsdk.ts` to stop tracking changes to that file.

1. Create firebase project at https://console.firebase.google.com
2. Copy firebase config to `web-app` environment.
3. Go to authentication tab and configure authentication.
4. (optional) Go to database tab and configure cloud firestore.
5. Download firebase-adminsdk private service key

   1. Navigate to the Service Accounts tab.
   2. Generate new private key
   3. Save as `firebase-admindsk.json`
   4. Copy content of `firebase-admindsk.json`
   5. Modify `aps/server/src/environment/firebase-admindsk.ts`

### Add Firebase Auth

Add your domain (heroku etc.) to the OAuth redirect domains list in the Firebase console -> Auth section -> Sign in method tab.

### Add Firebase Auth UI

```
yarn add ngx-auth-firebaseui
```

### Add Angular Universal

- https://medium.com/@cyrilletuzi/angular-server-side-rendering-in-node-with-express-universal-engine-dce21933ddce
- https://angular.io/guide/universal

## Add Testing helpers

```
ng g lib testing --unit-test-runner=none --prefix=app
```

Do not export module.

## Add Core Module

```
ng g lib core --unit-test-runner=jest --prefix=app
```

Add to web-app module.

## Add Shared Module

```
ng g lib shared --unit-test-runner=jest --prefix=app
```

Create `forRoot(): ModuleWithProviders` static method, and use it in web-app module.
Import normally to _almost_ every module.

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

Create `libs/shared/src/lib/angular-material/angular-material.module.ts` and export it in `libs/shared/src/lib/shared.module.ts`.

In `apps/web-app/src/index.html`:

```html
<head>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet" />
</head>
...
<body class="mat-typography"></body>
```

In `apps/web-app/src/styles.scss`:

```scss
@import 'libs/core/src/styles';
@import './app-theme';

@include app-theme($theme, $config);
```

Create `apps/web-app/src/_app-theme.scss` add:

```scss
@import 'libs/shared/src/styles';

@mixin app-theme($theme, $config) {
  $primary: map-get($theme, primary);
  $accent: map-get($theme, accent);
  $warn: map-get($theme, warn);
  $background: map-get($theme, background);
  $foreground: map-get($theme, foreground);

  @include shared-theme($theme, $config);
}
```

### Core

Styles that are loaded only once in `apps/web-app/src/styles.scss`. Responsible for loading Angular Material and Bootstrap.

- `libs/core/src/styles.scss`
- `libs/core/src/styles/...`

### Shared

Styles that are not connected to any particular application. They are consumed in `apps/web-app/src/_app-theme.scss`. They do not include any styles on their own, one needs to call `shared-theme` mixin for styles to render.

- `libs/shared/src/styles.scss`
- `libs/shared/src/styles/...`

## Add Models

```
ng g lib models --unit-test-runner=jest --no-module --prefix=app
```

## Add Navigation Module

```
ng g lib users --unit-test-runner=jest --directory=navigation --routing --lazy --parent-module=apps/web-app/src/app/app.module.ts --prefix=app
```

### Optional (rename module)

Rename `NavigationUsersModule` to `UsersModule`:

- `navigation-users.module.ts` -> `users.module.ts`
- `navigation-users.module.spec.ts` -> `users.module.spec.ts`
- in `index.ts`

In `apps/web-app/src/app/app.module.ts` change:

```ts
{
  path: 'users',
  loadChildren: '@nx-mean-starter/navigation/users#UsersModule',
},
```

## Add Feature Module

```
ng g lib auth --unit-test-runner=jest --directory=feature --prefix=app
```

### Optional (rename module)

Rename `FeatureAuthModule` to `AuthModule`:

- `feature-auth.module.ts` -> `auth.module.ts`
- `feature-auth.module.spec.ts` -> `auth.module.spec.ts`
- in `index.ts`

## Add State

```
yarn add @ngrx/entity ngrx-actions
yarn add @ngrx/store-devtools -D
```

### Root

```
ng g lib root --directory=state --unit-test-runner=jest --prefix=app
```

In `apps/web-app/src/app/app.module.ts` add:

```ts
imports: [
  ...,
  StateRootModule,
  StoreDevtoolsModule.instrument({
    name: 'web-app',
    logOnly: environment.production,
  }),
],
```

In `libs/state/root/src/index.ts` add:

```ts
import * as RootState from './lib/+state';

export * from './lib/state-root.module';
export { RootState };
```

### Auth and Router

```
ng g lib router --directory=state --unit-test-runner=jest --prefix=app
```

```
ng g lib auth --directory=state --unit-test-runner=jest --prefix=app
```

```
ng g lib users --directory=state --unit-test-runner=jest --prefix=app
```

# Deleting

At the root directory, delete mentions of the library in following files:

- `angular.json`
- `nx.json`
- `tsconfig.json`
