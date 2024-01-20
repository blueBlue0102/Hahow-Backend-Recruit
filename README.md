# Hahow Backend Recruit

Hahow 的 Node.js 工程師的面試解題  
需求在 `backend.md` 中

## 環境建置

```bash
$ pnpm install
```

## 啟動服務

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## 測試

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Commit Message Rule

參考 Nest 的作法
<https://github.com/nestjs/nest/blob/master/CONTRIBUTING.md#type>

- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **chore**: Updating tasks etc; no production code change
- **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests
- **sample**: A change to the samples

Samples:

```
docs(changelog): update change log to beta.5
fix(core): need to depend on latest rxjs and zone.js
```

## 專案架構

## 第三方 Library 簡介

### Dependencies

### DevDependencies

## 註解的原則

## 遇到的困難及解法
