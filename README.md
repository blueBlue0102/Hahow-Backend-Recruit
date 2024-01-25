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
```

隨後至 <http://localhost:3000> 即可閱覽 Swagger 文件

## 測試

```bash
# unit tests
$ pnpm run test

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
fix(utils): need to depend on latest rxjs and zone.js
```

## 自己想像的 User Story

| 身為...(As a...) | 我需要一個方法來...(I want to...)  | 因為...(so that...)                                                                                                          |
| :--------------: | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
|    系統使用者    | 取得 Hero 資訊                     | 用於在瀏覽器頁面顯示                                                                                                         |
|    系統使用者    | 取得帶有 profile 的 Hero 資訊      | 用於在瀏覽器頁面顯示                                                                                                         |
|    前端開發者    | 辨別 API 呼叫失敗的原因            | 根據不同錯誤原因，於前端邏輯會有不同處理機制。例如收到 status 401 則導向使用者重新登入；收到 status 500 則請使用者稍後再重試 |
|   系統維運人員   | 當系統出現任何問題時，可以查找 log | 具可監控性，要有 log 才能方便排查錯誤原因，否則將如同大海撈針                                                                |

## 專案架構

此專案架構是以一個要長期維護的專案為前提進行設計  
預期未來要新增的功能會越來越多

因此：

- 部分評估未來可能會替換的套件會進行包裝，而非直接引用  
  例如 `utils/http` 中，其底層所使用的是 `axios` 套件  
  對於 `utils/http` 的使用者來說，無需知道 `axios` 的存在  
  都是透過 `utils/http` 所提供的介面呼叫使用 `axios`  
  好處在於若未來 `axios` deprecated 了，若當初是整份專案都直接引用 `axios` 的話  
  就需要調整非常多地方，改動的成本很高  
  缺點是，需要思考設計如何對 `axios` 進行適當的包裝
- 各層之間的分工明確  
  由於預期未來的程式碼數量會越來越多  
  因此如何整理擺放各個邏輯於何處會是一個重要的問題

```
.
└── src
    ├── business-logic
    ├── controllers
    ├── helpers
    └── utils
```

從全局來看，分為 business-logic, controllers, helpers, utils

而若未來有串接資料庫的需求  
可能就會再多一個 models 層，專門負責與資料庫溝通

其他層不需要知道實際所使用的資料庫為何  
而是都透過 models 層提供的介面，進行資料的存取

若未來需要替換掉資料來源，例如從 PostgreSQL 換成 MongoDB  
若 models 層的介面有設計好的話，理想上就只需要改 models 層的邏輯  
對於其他層來說毫無影響，減少遷移成本

### business-logic

```
.
└── business-logic
    ├── commons
    │   └── hahow-app
    └── heroes
```

放置商業邏輯的地方

`commons` 中放置可能會重複共用的邏輯  
例如其中 `hahow-app` 將與 heroku app 的溝通進行抽象化  
預期整個專案中，只透過 `hahow-app` 來與 heroku app 進行溝通

好處在於，若未來 heroku app 的 API 介面或內容有所變更  
則就只需要修改 `hahow-app` 的邏輯即可

`heroes` 中放置了此次作業所需要提供的 API 的商業邏輯  
由 controller 進行呼叫

### controllers

```
.
└── controllers
    ├── heroes
    └── middlewares
        └── exception-filters
```

定義這個 API Server 提供給外部的 API  
包含 API 的輸入輸出 interface  
並且若未來有會傳入 request body 的情況  
也需要負責對傳入內容進行驗證及限制

`heroes` 中放置了此次作業的 API 介面  
裡面會呼叫 business-logic 提供的功能，以達成該 API 的功能

`exception-filters` 中放置了專案中若 throw 出 exception 後該如何統一處理的邏輯

### helpers

```
.
└── helpers
```

放置了評估在所有層當中都可能使用到的邏輯  
但又不宜包裝成 nest 的 module  
通常這個邏輯只能做簡單的事情  
例如是簡短的 javascript code

### utils

```
.
└── utils
    ├── http
    └── logger
```

放置可能於 controllers 和 business-logic 層中會頻繁被呼叫的邏輯

例如 `logger`  
需要進行 log 時，都統一呼叫 `utils/logger`  
這樣的好處是，假設出現需要將 log 寫入檔案的需求時，而且決定引入 `winston` 來達成  
若當初進行 log 的方式是各處 `console.log` 四散的話  
則引入 `winston` 的成本將會很高，要改的地方可能會很多

## 第三方 Library 簡介

### Dependencies

- `@nestjs/axios`  
  NestJS 預設安裝的套件  
  NestJS 對 `axios` 套件的 wrapper  
  提供使用者以 NestJS 的設計思維下去使用 `axios` 套件
- `@nestjs/common`  
  NestJS 預設安裝的套件  
  使用 NestJS 時會用到的常用元件
- `@nestjs/core`  
  NestJS 預設安裝的套件  
  使用 NestJS 時會用到的核心元件
- `@nestjs/platform-express`  
  NestJS 預設安裝的套件  
  NestJS 對 `express` 套件的 wrapper  
  提供使用者以 NestJS 的設計思維下去使用 `express` 套件
- `@nestjs/swagger`  
  NestJS 官方文件中推薦的套件  
  用於自動產生 Swagger 文件所用
- `axios`  
  NestJS 官方文件中推薦的套件  
  一個知名用於進行 http request 呼叫的套件
- `class-transformer`  
  NestJS 官方文件中推薦的套件  
  主要提供將 plain object 轉換成 class instance 的功能  
  安裝動機是為了與 `class-validator` 進行搭配  
  進行物件格式的驗證
- `class-validator`  
  NestJS 官方文件中推薦的套件  
  用於驗證 object 內的各 property  
  例如型別、數值範圍是否符合預期等等
- `reflect-metadata`  
  NestJS 預設安裝的套件  
  用於使 Typescript 更好的支援 Decorator 的使用
- `rxjs`  
  NestJS 預設安裝的套件  
  一個 Javascript 的函式庫，用於處理非同步或串流的情境

### DevDependencies

- `@golevelup/ts-jest`  
  NestJS 官方文件中推薦的套件  
  撰寫單元測試時使用  
  用於方便對特定 service 進行 mock
- `@nestjs/cli`  
  NestJS 預設安裝的套件  
  提供進行例如 `nest build` 等等指令
- `@nestjs/schematics`  
  NestJS 預設安裝的套件  
  用於輔助 `@nestjs/cli`
- `@nestjs/testing`  
  NestJS 預設安裝的套件  
  提供在 NestJS 中撰寫單元測試的基本元件
- `@types/express`  
  NestJS 預設安裝的套件  
  `express` 套件內容的 interface  
  使開發者於 IDE 介面上即可得知該套件提供的 api
- `@types/jest`  
  NestJS 預設安裝的套件  
  `jest` 套件內容的 interface  
  使開發者於 IDE 介面上即可得知該套件提供的 api
- `@types/node`  
  NestJS 預設安裝的套件  
  NodeJS 的 interface  
  使開發者於 IDE 介面上即可得知該版本 NodeJS 提供的 api
- `@typescript-eslint/eslint-plugin`  
  NestJS 預設安裝的套件  
  `eslint` 的 plugin
- `@typescript-eslint/parser`  
  NestJS 預設安裝的套件  
  `eslint` 的 plugin
- `eslint`  
  NestJS 預設安裝的套件  
  用於檢查、規範程式碼語法的套件  
  使整份專案的程式碼風格趨於一致  
  例如可否允許宣告未使用的變數
- `eslint-config-prettier`  
  NestJS 預設安裝的套件  
  `eslint` 的 plugin  
  用於將可能與 `prettier` 產生衝突的設定關閉
- `jest`  
  NestJS 預設安裝的套件  
  知名的測試框架  
  提供撰寫自動化測試時的工具
- `prettier`  
  NestJS 預設安裝的套件  
  用於定義程式碼的編排所用  
  例如單雙引號、tab 的長度等等
- `source-map-support`  
  NestJS 預設安裝的套件  
  用於在 stack trace 中得以追蹤程式碼的錯誤源頭
- `ts-jest`  
  NestJS 預設安裝的套件  
  使 `jest` 可以用 Typescript 來進行程式碼開發
- `typescript`  
  NestJS 預設安裝的套件  
  讓專案可以使用 typescript 進行開發

## 註解的原則

- Service Class 中的各 method 都需要加上 JSDoc，簡單說明用途，及各項傳入參數的介紹  
  範例：

  ```typescript
  /**
   * Authenticate 特定的 name 及 password
   * status 200 時回傳 true；status 401 時回傳 false；其餘情況 throw exception
   * @param data name 和 password
   */
  async authenticate(data: Dtos.AuthenticateReqBodyDto): Promise<boolean> {
    const url = `${this.APP_DOMAIN_BASE}/auth`;
    const httpResponse = await this.httpService.post(url, data, {
      validateStatus: (status) => {
        return status === 200 || status === 401;
      },
    });
    return httpResponse.status === 200;
  }
  ```

- 當一個動作超過一定行數或複雜性，讓人很難一眼就馬上了解在做什麼時，便會撰寫該段程式碼在做什麼的註解  
  範例：

  ```typescript
  async getListHeroesWithProfile(name: string, password: string): Promise<HeroDtos.Hero[]> {
    // 權限驗證
    await this.authenticate(name, password);

    // 組出帶有 profile 的 hero list
    const heroList = await this.hahowAppService.getListHeroes();
    const heroWithProfileList: HeroDtos.Hero[] = [];
    for (const hero of heroList) {
      const profile = await this.hahowAppService.getProfileOfHero(hero.id);
      heroWithProfileList.push({ ...hero, profile });
    }
    return heroWithProfileList;
  }
  ```

  這樣第一眼就可以快速得知 `getListHeroesWithProfile()` 主要做了兩件事：「**權限驗證**」、「**組出帶有 profile 的 hero list**」

## 遇到的困難及解法

### Hahow heroku app 的 API 有機率會出錯

#### 描述

`https://hahow-recruit.herokuapp.com/heroes/{id}` API 有機率會回傳 status 200 的 `{"code":1000,"message":"Backend error"}`  
由於原先的設計只根據 status code 進行判斷來 throw exception  
所以當收到的是 200 回應但是內容錯誤時，系統無從得知

#### 思考

理想情況下，當外部服務的 API 發生錯誤時，不應回傳 status 200 的資訊  
而在外部服務的行為並不是我方能控制的情況下  
就只能假設他可能出錯，並進行驗證

#### 行動

設計一個檢查機制  
從外部服務接收到的資料，對其驗證是否如同 API spec 上所描述的樣子  
由於已經將外部 API 的回傳資料格式定義出 interface  
因此要做的是，確認真實收到的資料，是否如 interface 中所描述的那樣子
