import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HeroesController } from './heroes/heroes.controller';
import { BusinessLogicModule } from '@root/business-logic/business-logic.module';
import { UtilsModule } from '@root/utils/utils.module';
import * as Filters from './middlewares/exception-filters';

/**
 * 定義所有的 API \
 * 負責接收 request 和回傳 response \
 * 負責外部輸入的 validation
 */
@Module({
  imports: [BusinessLogicModule, UtilsModule],
  // Global Exception Filter
  // 注意，filter 只會 catch 在 request-response 途中之間所發生的錯誤，如果錯誤在 response 已經結束後才發生，就不會被抓到
  // 注意，filter 的執行順序是"先註冊的後執行"，且只有第一個符合條件的 filter 會被執行
  // https://docs.nestjs.com/exception-filters#binding-filters
  providers: [
    {
      provide: APP_FILTER,
      useClass: Filters.UnexceptionalErrorFilter,
    },
    {
      provide: APP_FILTER,
      useClass: Filters.HttpExceptionFilter,
    },
  ],
  controllers: [HeroesController],
})
export class ControllersModule {}
