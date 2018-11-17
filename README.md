# NxMeanStarter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) using [Nrwl Nx](https://nrwl.io/nx).

Based on:

- [mean-starter-tutorial](https://github.com/Bielik20/mean-starter-tutorial)
- [workshop-nx-starter](https://github.com/nrwl/workshop-nx-starter)
- [Allow development of node applications](https://github.com/nrwl/nx/issues/763)
- [nx-fullstack](https://blog.nrwl.io/building-full-stack-applications-using-angular-cli-and-nx-5eff205248f1)
- [angular cli proxy](https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/proxy.md)

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

- `ng test` - run tests with report coverage for whole workspace
- `ng test app-name` - run tests fo specified app/lib
- `ng test --watch` - run tests listening for changes. Can be used with app-name.

## Add App

```
ng g app web-app --style=scss --unit-test-runner=jest --e2e-test-runner=cypress --routing --prefix=app
```

## Add Server

```
ng g node-app server
yarn add bcryptjs compression body-parser connect-mongo mongoose errorhandler express-session express-validator lodash lusca path passport passport-jwt jsonwebtoken request request-promise-native winston
yarn add @types/bcryptjs @types/compression @types/body-parser @types/connect-mongo @types/mongoose @types/errorhandler @types/express-session @types/lodash @types/lusca @types/passport @types/passport-jwt @types/jsonwebtoken @types/request @types/request-promise-native @types/winston -D
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

TODO:

- Add types
- Add wrappers (for now only bcrypt from UserModel)
- Make UserEntity an interface and inherit from user model
- Review Authentication

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

...

### Add Angular Universal

- https://medium.com/@cyrilletuzi/angular-server-side-rendering-in-node-with-express-universal-engine-dce21933ddce
- https://angular.io/guide/universal

## Add Services Lib

```
ng g lib services --unit-test-runner=jest --no-module --prefix=app
```

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
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">
</head>
...
<body class='mat-typography'>
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
ng g lib posts --unit-test-runner=jest --directory=navigation --routing --lazy --parent-module=apps/web-app/src/app/app.module.ts --prefix=app
```

### Optional (rename module)

Rename `NavigationPostsModule` to `PostsModule`:

- `navigation-posts.module.ts` -> `posts.module.ts`
- `navigation-posts.module.spec.ts` -> `posts.module.spec.ts`
- in `index.ts`

In `apps/web-app/src/app/app.module.ts` change:

```ts
{
  path: 'posts',
  loadChildren: '@nx-mean-starter/navigation/posts#PostsModule',
},
```

## Add Feature Module

```
ng g lib banner --unit-test-runner=jest --directory=feature --prefix=app
```

### Optional (rename module)

Rename `FeatureBannerModule` to `BannerModule`:

- `feature-banner.module.ts` -> `banner.module.ts`
- `feature-banner.module.spec.ts` -> `banner.module.spec.ts`
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
ng g lib posts --directory=state --unit-test-runner=jest --prefix=app
```
